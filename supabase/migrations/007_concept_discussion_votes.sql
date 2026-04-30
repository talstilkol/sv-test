-- supabase/migrations/007_concept_discussion_votes.sql
-- Run: supabase db push

create table if not exists public.concept_discussion_votes (
  id         uuid primary key default gen_random_uuid(),
  thread_id  uuid not null references public.concept_discussion_threads(id) on delete cascade,
  voter_id   uuid not null references auth.users(id) on delete cascade,
  vote       smallint not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint concept_discussion_votes_value_check check (vote in (-1, 1)),
  constraint concept_discussion_votes_unique unique (thread_id, voter_id)
);

create index if not exists idx_concept_discussion_votes_thread
  on public.concept_discussion_votes (thread_id);

drop trigger if exists set_concept_discussion_votes_updated_at on public.concept_discussion_votes;
create trigger set_concept_discussion_votes_updated_at
  before update on public.concept_discussion_votes
  for each row
  execute function public.set_updated_at();

alter table public.concept_discussion_votes enable row level security;

drop policy if exists "Authenticated users read discussion votes" on public.concept_discussion_votes;
create policy "Authenticated users read discussion votes"
  on public.concept_discussion_votes for select
  using (
    auth.role() = 'authenticated'
    and exists (
      select 1
      from public.concept_discussion_threads t
      where t.id = concept_discussion_votes.thread_id
        and t.status <> 'hidden'
    )
  );

drop policy if exists "Authenticated users vote once per discussion" on public.concept_discussion_votes;
create policy "Authenticated users vote once per discussion"
  on public.concept_discussion_votes for insert
  with check (
    auth.uid() = voter_id
    and exists (
      select 1
      from public.concept_discussion_threads t
      where t.id = concept_discussion_votes.thread_id
        and t.status <> 'hidden'
    )
  );

drop policy if exists "Authenticated users update own discussion vote" on public.concept_discussion_votes;
create policy "Authenticated users update own discussion vote"
  on public.concept_discussion_votes for update
  using (auth.uid() = voter_id)
  with check (auth.uid() = voter_id);

drop policy if exists "Authenticated users remove own discussion vote" on public.concept_discussion_votes;
create policy "Authenticated users remove own discussion vote"
  on public.concept_discussion_votes for delete
  using (auth.uid() = voter_id);
