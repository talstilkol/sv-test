-- supabase/migrations/006_concept_discussions.sql
-- Run: supabase db push

create table if not exists public.concept_discussion_threads (
  id          uuid primary key default gen_random_uuid(),
  concept_key text not null,
  title       text not null,
  author_id   uuid not null references auth.users(id) on delete cascade,
  status      text not null default 'open',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint concept_discussion_threads_key_not_blank check (length(btrim(concept_key)) > 0),
  constraint concept_discussion_threads_title_not_blank check (length(btrim(title)) > 0),
  constraint concept_discussion_threads_status_check check (status in ('open', 'resolved', 'locked', 'hidden'))
);

create table if not exists public.concept_discussion_posts (
  id          uuid primary key default gen_random_uuid(),
  thread_id   uuid not null references public.concept_discussion_threads(id) on delete cascade,
  author_id   uuid not null references auth.users(id) on delete cascade,
  body        text not null,
  status      text not null default 'visible',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint concept_discussion_posts_body_not_blank check (length(btrim(body)) > 0),
  constraint concept_discussion_posts_status_check check (status in ('visible', 'hidden'))
);

create index if not exists idx_concept_discussion_threads_concept_created
  on public.concept_discussion_threads (concept_key, created_at desc);

create index if not exists idx_concept_discussion_posts_thread_created
  on public.concept_discussion_posts (thread_id, created_at asc);

drop trigger if exists set_concept_discussion_threads_updated_at on public.concept_discussion_threads;
create trigger set_concept_discussion_threads_updated_at
  before update on public.concept_discussion_threads
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_concept_discussion_posts_updated_at on public.concept_discussion_posts;
create trigger set_concept_discussion_posts_updated_at
  before update on public.concept_discussion_posts
  for each row
  execute function public.set_updated_at();

alter table public.concept_discussion_threads enable row level security;
alter table public.concept_discussion_posts enable row level security;

drop policy if exists "Authenticated users read visible concept threads" on public.concept_discussion_threads;
create policy "Authenticated users read visible concept threads"
  on public.concept_discussion_threads for select
  using (auth.role() = 'authenticated' and status <> 'hidden');

drop policy if exists "Authenticated users create concept threads" on public.concept_discussion_threads;
create policy "Authenticated users create concept threads"
  on public.concept_discussion_threads for insert
  with check (auth.uid() = author_id);

drop policy if exists "Authors update own concept threads" on public.concept_discussion_threads;
create policy "Authors update own concept threads"
  on public.concept_discussion_threads for update
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "Authenticated users read visible concept posts" on public.concept_discussion_posts;
create policy "Authenticated users read visible concept posts"
  on public.concept_discussion_posts for select
  using (
    auth.role() = 'authenticated'
    and status = 'visible'
    and exists (
      select 1
      from public.concept_discussion_threads t
      where t.id = concept_discussion_posts.thread_id
        and t.status <> 'hidden'
    )
  );

drop policy if exists "Authenticated users create concept posts" on public.concept_discussion_posts;
create policy "Authenticated users create concept posts"
  on public.concept_discussion_posts for insert
  with check (
    auth.uid() = author_id
    and exists (
      select 1
      from public.concept_discussion_threads t
      where t.id = concept_discussion_posts.thread_id
        and t.status in ('open', 'resolved')
    )
  );

drop policy if exists "Authors update own concept posts" on public.concept_discussion_posts;
create policy "Authors update own concept posts"
  on public.concept_discussion_posts for update
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);
