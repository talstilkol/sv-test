-- supabase/migrations/011_mentor_matching.sql
-- Run: supabase db push

create table if not exists public.mentor_profiles (
  user_id     uuid not null references auth.users(id) on delete cascade,
  concept_key text not null,
  status      text not null default 'active',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (user_id, concept_key),
  constraint mentor_profiles_concept_not_blank check (length(btrim(concept_key)) > 0),
  constraint mentor_profiles_status_check check (status in ('active', 'paused'))
);

create table if not exists public.mentor_matches (
  id          uuid primary key default gen_random_uuid(),
  learner_id  uuid not null references auth.users(id) on delete cascade,
  mentor_id   uuid not null references auth.users(id) on delete cascade,
  concept_key text not null,
  status      text not null default 'active',
  created_at  timestamptz not null default now(),
  closed_at   timestamptz,
  constraint mentor_matches_no_self_match check (learner_id <> mentor_id),
  constraint mentor_matches_concept_not_blank check (length(btrim(concept_key)) > 0),
  constraint mentor_matches_status_check check (status in ('active', 'closed', 'cancelled'))
);

create table if not exists public.mentor_messages (
  id         uuid primary key default gen_random_uuid(),
  match_id   uuid not null references public.mentor_matches(id) on delete cascade,
  sender_id  uuid not null references auth.users(id) on delete cascade,
  body       text not null,
  created_at timestamptz not null default now(),
  constraint mentor_messages_body_not_blank check (length(btrim(body)) > 0)
);

create table if not exists public.mentor_ratings (
  id           uuid primary key default gen_random_uuid(),
  match_id     uuid not null unique references public.mentor_matches(id) on delete cascade,
  learner_id   uuid not null references auth.users(id) on delete cascade,
  mentor_id    uuid not null references auth.users(id) on delete cascade,
  rating_score smallint not null,
  feedback     text,
  created_at   timestamptz not null default now(),
  constraint mentor_ratings_score_range check (rating_score between 1 and 5),
  constraint mentor_ratings_no_self_rating check (learner_id <> mentor_id)
);

create index if not exists idx_mentor_profiles_concept_status
  on public.mentor_profiles (concept_key, status, updated_at asc);

create index if not exists idx_mentor_matches_participants_status
  on public.mentor_matches (learner_id, mentor_id, status, created_at desc);

create index if not exists idx_mentor_messages_match_created
  on public.mentor_messages (match_id, created_at asc);

create index if not exists idx_mentor_ratings_mentor
  on public.mentor_ratings (mentor_id, created_at desc);

drop trigger if exists set_mentor_profiles_updated_at on public.mentor_profiles;
create trigger set_mentor_profiles_updated_at
  before update on public.mentor_profiles
  for each row
  execute function public.set_updated_at();

create or replace view public.mentor_master_eligibility
with (security_invoker = true)
as
with peer_stats as (
  select
    reviewer_id as user_id,
    count(*)::integer as completed_reviews,
    avg((correctness_score + clarity_score)::numeric / 2)::numeric(5,2) as avg_review_score
  from public.peer_reviews
  group by reviewer_id
),
community_stats as (
  select
    user_id,
    reputation_points
  from public.community_reputation_summary
)
select
  coalesce(p.user_id, c.user_id) as user_id,
  coalesce(p.completed_reviews, 0)::integer as completed_reviews,
  coalesce(p.avg_review_score, 0)::numeric(5,2) as avg_review_score,
  coalesce(c.reputation_points, 0)::integer as community_reputation,
  (
    coalesce(p.completed_reviews, 0) >= 3
    and coalesce(p.avg_review_score, 0) >= 4
    and coalesce(c.reputation_points, 0) >= 5
  ) as eligible
from peer_stats p
full join community_stats c
  on c.user_id = p.user_id;

create or replace view public.mentor_reputation_summary
with (security_invoker = true)
as
select
  m.mentor_id,
  count(r.id)::integer as rated_sessions,
  coalesce(avg(r.rating_score)::numeric(5,2), 0)::numeric(5,2) as average_rating,
  coalesce(max(r.created_at), null) as last_rating_at,
  coalesce(e.completed_reviews, 0)::integer as completed_peer_reviews,
  coalesce(e.community_reputation, 0)::integer as community_reputation
from public.mentor_matches m
left join public.mentor_ratings r
  on r.match_id = m.id
left join public.mentor_master_eligibility e
  on e.user_id = m.mentor_id
group by
  m.mentor_id,
  e.completed_reviews,
  e.community_reputation;

alter table public.mentor_profiles enable row level security;
alter table public.mentor_matches enable row level security;
alter table public.mentor_messages enable row level security;
alter table public.mentor_ratings enable row level security;

drop policy if exists "Authenticated users read active mentor profiles" on public.mentor_profiles;
create policy "Authenticated users read active mentor profiles"
  on public.mentor_profiles for select
  using (auth.role() = 'authenticated' and status = 'active');

drop policy if exists "Eligible users manage own mentor profiles" on public.mentor_profiles;
create policy "Eligible users manage own mentor profiles"
  on public.mentor_profiles for all
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.mentor_master_eligibility e
      where e.user_id = auth.uid()
        and e.eligible = true
    )
  );

drop policy if exists "Mentor participants read matches" on public.mentor_matches;
create policy "Mentor participants read matches"
  on public.mentor_matches for select
  using (auth.uid() in (learner_id, mentor_id));

drop policy if exists "Learners create mentor matches" on public.mentor_matches;
create policy "Learners create mentor matches"
  on public.mentor_matches for insert
  with check (auth.uid() = learner_id and mentor_id <> auth.uid());

drop policy if exists "Mentor participants update matches" on public.mentor_matches;
create policy "Mentor participants update matches"
  on public.mentor_matches for update
  using (auth.uid() in (learner_id, mentor_id))
  with check (auth.uid() in (learner_id, mentor_id));

drop policy if exists "Mentor participants read messages" on public.mentor_messages;
create policy "Mentor participants read messages"
  on public.mentor_messages for select
  using (
    exists (
      select 1
      from public.mentor_matches m
      where m.id = mentor_messages.match_id
        and auth.uid() in (m.learner_id, m.mentor_id)
    )
  );

drop policy if exists "Mentor participants send messages" on public.mentor_messages;
create policy "Mentor participants send messages"
  on public.mentor_messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1
      from public.mentor_matches m
      where m.id = mentor_messages.match_id
        and m.status = 'active'
        and auth.uid() in (m.learner_id, m.mentor_id)
    )
  );

drop policy if exists "Mentor participants read ratings" on public.mentor_ratings;
create policy "Mentor participants read ratings"
  on public.mentor_ratings for select
  using (auth.uid() in (learner_id, mentor_id));

drop policy if exists "Learners rate mentor matches" on public.mentor_ratings;
create policy "Learners rate mentor matches"
  on public.mentor_ratings for insert
  with check (
    auth.uid() = learner_id
    and exists (
      select 1
      from public.mentor_matches m
      where m.id = mentor_ratings.match_id
        and m.learner_id = auth.uid()
        and m.mentor_id = mentor_ratings.mentor_id
    )
  );

create or replace function public.register_mentor_availability(target_concept_key text)
returns table (
  user_id uuid,
  concept_key text,
  status text,
  eligible boolean
)
language plpgsql
security invoker
set search_path = public
as $$
declare
  current_mentor uuid := auth.uid();
  safe_concept text := btrim(coalesce(target_concept_key, ''));
begin
  if current_mentor is null then
    raise exception 'mentor registration requires authenticated user';
  end if;

  if length(safe_concept) = 0 then
    raise exception 'mentor registration requires concept key';
  end if;

  if not exists (
    select 1
    from public.mentor_master_eligibility e
    where e.user_id = current_mentor
      and e.eligible = true
  ) then
    raise exception 'mentor registration requires master eligibility';
  end if;

  insert into public.mentor_profiles (
    user_id,
    concept_key,
    status
  )
  values (
    current_mentor,
    safe_concept,
    'active'
  )
  on conflict (user_id, concept_key)
  do update set status = 'active';

  return query
  select
    current_mentor,
    safe_concept,
    'active'::text,
    true;
end;
$$;

create or replace function public.request_mentor_match(target_concept_key text)
returns table (
  match_id uuid,
  learner_id uuid,
  mentor_id uuid,
  concept_key text,
  status text,
  created_at timestamptz
)
language plpgsql
security invoker
set search_path = public
as $$
declare
  current_learner uuid := auth.uid();
  safe_concept text := btrim(coalesce(target_concept_key, ''));
  selected_mentor uuid;
  inserted_match_id uuid;
  inserted_created_at timestamptz;
begin
  if current_learner is null then
    raise exception 'mentor matching requires authenticated user';
  end if;

  if length(safe_concept) = 0 then
    raise exception 'mentor matching requires concept key';
  end if;

  select p.user_id
  into selected_mentor
  from public.mentor_profiles p
  where p.concept_key = safe_concept
    and p.status = 'active'
    and p.user_id <> current_learner
  order by (
    select count(*)
    from public.mentor_matches active_match
    where active_match.mentor_id = p.user_id
      and active_match.status = 'active'
  ) asc,
  p.updated_at asc,
  p.user_id asc
  limit 1;

  if selected_mentor is null then
    raise exception 'no eligible mentor available for concept';
  end if;

  insert into public.mentor_matches (
    learner_id,
    mentor_id,
    concept_key,
    status
  )
  values (
    current_learner,
    selected_mentor,
    safe_concept,
    'active'
  )
  returning id, created_at into inserted_match_id, inserted_created_at;

  return query
  select
    inserted_match_id,
    current_learner,
    selected_mentor,
    safe_concept,
    'active'::text,
    inserted_created_at;
end;
$$;

create or replace function public.rate_mentor_match(
  target_match_id uuid,
  target_rating_score smallint,
  target_feedback text default null
)
returns table (
  rating_id uuid,
  match_id uuid,
  learner_id uuid,
  mentor_id uuid,
  rating_score smallint,
  status text,
  created_at timestamptz
)
language plpgsql
security invoker
set search_path = public
as $$
declare
  current_learner uuid := auth.uid();
  selected_match public.mentor_matches%rowtype;
  inserted_rating_id uuid;
  inserted_created_at timestamptz;
begin
  if current_learner is null then
    raise exception 'mentor rating requires authenticated user';
  end if;

  if target_rating_score < 1 or target_rating_score > 5 then
    raise exception 'mentor rating score must be between 1 and 5';
  end if;

  select m.*
  into selected_match
  from public.mentor_matches m
  where m.id = target_match_id
    and m.learner_id = current_learner
  for update;

  if not found then
    raise exception 'mentor match not found for learner';
  end if;

  insert into public.mentor_ratings (
    match_id,
    learner_id,
    mentor_id,
    rating_score,
    feedback
  )
  values (
    selected_match.id,
    selected_match.learner_id,
    selected_match.mentor_id,
    target_rating_score,
    nullif(btrim(coalesce(target_feedback, '')), '')
  )
  returning id, created_at into inserted_rating_id, inserted_created_at;

  update public.mentor_matches
    set status = 'closed',
        closed_at = inserted_created_at
    where id = selected_match.id;

  return query
  select
    inserted_rating_id,
    selected_match.id,
    selected_match.learner_id,
    selected_match.mentor_id,
    target_rating_score,
    'closed'::text,
    inserted_created_at;
end;
$$;

grant execute on function public.register_mentor_availability(text) to authenticated;
grant execute on function public.request_mentor_match(text) to authenticated;
grant execute on function public.rate_mentor_match(uuid, smallint, text) to authenticated;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
    and not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'mentor_messages'
    ) then
    alter publication supabase_realtime add table public.mentor_messages;
  end if;
end;
$$;
