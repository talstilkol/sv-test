-- supabase/migrations/001_progress.sql
-- Run: supabase db push

create table if not exists public.user_progress (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  lesson_id   text not null,
  concept     text not null,
  scores_json jsonb not null default '{}',
  updated_at  timestamptz not null default now(),
  unique (user_id, lesson_id, concept)
);

-- Row-Level Security: users can only see their own progress
alter table public.user_progress enable row level security;

create policy "Users read own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users write own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

create policy "Users delete own progress"
  on public.user_progress for delete
  using (auth.uid() = user_id);

-- Index for fast lookups by user
create index if not exists idx_user_progress_user on public.user_progress(user_id);
