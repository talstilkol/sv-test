-- supabase/migrations/009_community_moderation.sql
-- Run: supabase db push

create table if not exists public.community_moderators (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.concept_discussion_reports (
  id          uuid primary key default gen_random_uuid(),
  thread_id   uuid references public.concept_discussion_threads(id) on delete cascade,
  post_id     uuid references public.concept_discussion_posts(id) on delete cascade,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reason      text not null,
  status      text not null default 'open',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint concept_discussion_reports_target_check check (
    (thread_id is not null and post_id is null)
    or (thread_id is null and post_id is not null)
  ),
  constraint concept_discussion_reports_reason_not_blank check (length(btrim(reason)) > 0),
  constraint concept_discussion_reports_status_check check (status in ('open', 'reviewed', 'dismissed'))
);

create table if not exists public.concept_discussion_moderation_actions (
  id           uuid primary key default gen_random_uuid(),
  thread_id    uuid references public.concept_discussion_threads(id) on delete cascade,
  post_id      uuid references public.concept_discussion_posts(id) on delete cascade,
  moderator_id uuid not null references auth.users(id) on delete cascade,
  action       text not null,
  reason       text not null,
  created_at   timestamptz not null default now(),
  constraint concept_discussion_moderation_actions_target_check check (
    (thread_id is not null and post_id is null)
    or (thread_id is null and post_id is not null)
  ),
  constraint concept_discussion_moderation_actions_reason_not_blank check (length(btrim(reason)) > 0),
  constraint concept_discussion_moderation_actions_action_check check (
    action in ('lock_thread', 'unlock_thread', 'hide_thread', 'restore_thread', 'hide_post', 'restore_post')
  )
);

create index if not exists idx_concept_discussion_reports_status_created
  on public.concept_discussion_reports (status, created_at desc);

create index if not exists idx_concept_discussion_reports_thread
  on public.concept_discussion_reports (thread_id);

create index if not exists idx_concept_discussion_moderation_actions_thread
  on public.concept_discussion_moderation_actions (thread_id, created_at desc);

drop trigger if exists set_concept_discussion_reports_updated_at on public.concept_discussion_reports;
create trigger set_concept_discussion_reports_updated_at
  before update on public.concept_discussion_reports
  for each row
  execute function public.set_updated_at();

alter table public.community_moderators enable row level security;
alter table public.concept_discussion_reports enable row level security;
alter table public.concept_discussion_moderation_actions enable row level security;

drop policy if exists "Community moderators read own role" on public.community_moderators;
create policy "Community moderators read own role"
  on public.community_moderators for select
  using (auth.uid() = user_id);

drop policy if exists "Authenticated users create discussion reports" on public.concept_discussion_reports;
create policy "Authenticated users create discussion reports"
  on public.concept_discussion_reports for insert
  with check (
    auth.uid() = reporter_id
    and (
      (
        thread_id is not null
        and exists (
          select 1
          from public.concept_discussion_threads t
          where t.id = concept_discussion_reports.thread_id
            and t.status <> 'hidden'
        )
      )
      or (
        post_id is not null
        and exists (
          select 1
          from public.concept_discussion_posts p
          join public.concept_discussion_threads t on t.id = p.thread_id
          where p.id = concept_discussion_reports.post_id
            and p.status = 'visible'
            and t.status <> 'hidden'
        )
      )
    )
  );

drop policy if exists "Reporters and moderators read discussion reports" on public.concept_discussion_reports;
create policy "Reporters and moderators read discussion reports"
  on public.concept_discussion_reports for select
  using (
    auth.uid() = reporter_id
    or exists (
      select 1
      from public.community_moderators m
      where m.user_id = auth.uid()
    )
  );

drop policy if exists "Moderators update discussion reports" on public.concept_discussion_reports;
create policy "Moderators update discussion reports"
  on public.concept_discussion_reports for update
  using (
    exists (
      select 1
      from public.community_moderators m
      where m.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.community_moderators m
      where m.user_id = auth.uid()
    )
  );

drop policy if exists "Moderators insert moderation actions" on public.concept_discussion_moderation_actions;
create policy "Moderators insert moderation actions"
  on public.concept_discussion_moderation_actions for insert
  with check (
    auth.uid() = moderator_id
    and exists (
      select 1
      from public.community_moderators m
      where m.user_id = auth.uid()
    )
  );

drop policy if exists "Moderators read moderation actions" on public.concept_discussion_moderation_actions;
create policy "Moderators read moderation actions"
  on public.concept_discussion_moderation_actions for select
  using (
    auth.uid() = moderator_id
    or exists (
      select 1
      from public.community_moderators m
      where m.user_id = auth.uid()
    )
  );

drop policy if exists "Authors update own concept threads" on public.concept_discussion_threads;
drop policy if exists "Authors and moderators update concept threads" on public.concept_discussion_threads;
create policy "Authors and moderators update concept threads"
  on public.concept_discussion_threads for update
  using (
    auth.uid() = author_id
    or exists (
      select 1
      from public.community_moderators m
      where m.user_id = auth.uid()
    )
  )
  with check (
    auth.uid() = author_id
    or exists (
      select 1
      from public.community_moderators m
      where m.user_id = auth.uid()
    )
  );

drop policy if exists "Authors update own concept posts" on public.concept_discussion_posts;
drop policy if exists "Authors and moderators update concept posts" on public.concept_discussion_posts;
create policy "Authors and moderators update concept posts"
  on public.concept_discussion_posts for update
  using (
    auth.uid() = author_id
    or exists (
      select 1
      from public.community_moderators m
      where m.user_id = auth.uid()
    )
  )
  with check (
    auth.uid() = author_id
    or exists (
      select 1
      from public.community_moderators m
      where m.user_id = auth.uid()
    )
  );

create or replace function public.apply_concept_discussion_moderation(
  target_thread_id uuid default null,
  target_post_id uuid default null,
  moderation_action text default '',
  moderation_reason text default ''
)
returns table (
  action_id uuid,
  thread_id uuid,
  post_id uuid,
  action text,
  new_status text,
  created_at timestamptz
)
language plpgsql
security invoker
set search_path = public
as $$
declare
  current_moderator uuid := auth.uid();
  applied_status text;
  inserted_action_id uuid;
  inserted_created_at timestamptz;
begin
  if current_moderator is null then
    raise exception 'moderation requires authenticated user';
  end if;

  if not exists (
    select 1
    from public.community_moderators m
    where m.user_id = current_moderator
  ) then
    raise exception 'moderation requires community moderator role';
  end if;

  if (target_thread_id is null and target_post_id is null)
    or (target_thread_id is not null and target_post_id is not null) then
    raise exception 'moderation requires exactly one discussion target';
  end if;

  if length(btrim(coalesce(moderation_reason, ''))) = 0 then
    raise exception 'moderation requires reason';
  end if;

  if target_thread_id is not null then
    applied_status := case moderation_action
      when 'lock_thread' then 'locked'
      when 'unlock_thread' then 'open'
      when 'hide_thread' then 'hidden'
      when 'restore_thread' then 'open'
      else null
    end;
    if applied_status is null then
      raise exception 'invalid thread moderation action';
    end if;
    update public.concept_discussion_threads
      set status = applied_status
      where id = target_thread_id;
    if not found then
      raise exception 'discussion thread not found or blocked by policy';
    end if;
  else
    applied_status := case moderation_action
      when 'hide_post' then 'hidden'
      when 'restore_post' then 'visible'
      else null
    end;
    if applied_status is null then
      raise exception 'invalid post moderation action';
    end if;
    update public.concept_discussion_posts
      set status = applied_status
      where id = target_post_id;
    if not found then
      raise exception 'discussion post not found or blocked by policy';
    end if;
  end if;

  insert into public.concept_discussion_moderation_actions (
    thread_id,
    post_id,
    moderator_id,
    action,
    reason
  )
  values (
    target_thread_id,
    target_post_id,
    current_moderator,
    moderation_action,
    btrim(moderation_reason)
  )
  returning id, created_at into inserted_action_id, inserted_created_at;

  return query
  select
    inserted_action_id,
    target_thread_id,
    target_post_id,
    moderation_action,
    applied_status,
    inserted_created_at;
end;
$$;

grant execute on function public.apply_concept_discussion_moderation(uuid, uuid, text, text) to authenticated;
