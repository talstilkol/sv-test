-- supabase/migrations/010_peer_code_review.sql
-- Run: supabase db push

create table if not exists public.peer_review_submissions (
  id                uuid primary key default gen_random_uuid(),
  author_id         uuid not null references auth.users(id) on delete cascade,
  concept_key       text not null,
  level             text not null,
  solution_text     text not null,
  status            text not null default 'submitted',
  review_xp_awarded integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint peer_review_submissions_concept_not_blank check (length(btrim(concept_key)) > 0),
  constraint peer_review_submissions_solution_not_blank check (length(btrim(solution_text)) > 0),
  constraint peer_review_submissions_level_check check (level in ('beginner', 'intermediate', 'advanced')),
  constraint peer_review_submissions_status_check check (status in ('submitted', 'matched', 'reviewed', 'archived')),
  constraint peer_review_submissions_xp_nonnegative check (review_xp_awarded >= 0)
);

create table if not exists public.peer_review_matches (
  id            uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.peer_review_submissions(id) on delete cascade,
  reviewer_id   uuid not null references auth.users(id) on delete cascade,
  reviewee_id   uuid not null references auth.users(id) on delete cascade,
  status        text not null default 'assigned',
  created_at    timestamptz not null default now(),
  completed_at  timestamptz,
  constraint peer_review_matches_no_self_review check (reviewer_id <> reviewee_id),
  constraint peer_review_matches_status_check check (status in ('assigned', 'completed', 'skipped')),
  constraint peer_review_matches_unique_reviewer unique (submission_id, reviewer_id)
);

create table if not exists public.peer_reviews (
  id                 uuid primary key default gen_random_uuid(),
  match_id           uuid not null unique references public.peer_review_matches(id) on delete cascade,
  submission_id      uuid not null references public.peer_review_submissions(id) on delete cascade,
  reviewer_id        uuid not null references auth.users(id) on delete cascade,
  correctness_score  smallint not null,
  clarity_score      smallint not null,
  strengths          text not null,
  improvements       text not null,
  xp_awarded         integer not null,
  created_at         timestamptz not null default now(),
  constraint peer_reviews_score_range check (
    correctness_score between 1 and 5
    and clarity_score between 1 and 5
  ),
  constraint peer_reviews_strengths_not_blank check (length(btrim(strengths)) > 0),
  constraint peer_reviews_improvements_not_blank check (length(btrim(improvements)) > 0),
  constraint peer_reviews_xp_nonnegative check (xp_awarded >= 0)
);

create index if not exists idx_peer_review_submissions_level_status_created
  on public.peer_review_submissions (level, status, created_at asc);

create index if not exists idx_peer_review_matches_reviewer_status
  on public.peer_review_matches (reviewer_id, status, created_at desc);

create index if not exists idx_peer_reviews_submission
  on public.peer_reviews (submission_id, created_at desc);

drop trigger if exists set_peer_review_submissions_updated_at on public.peer_review_submissions;
create trigger set_peer_review_submissions_updated_at
  before update on public.peer_review_submissions
  for each row
  execute function public.set_updated_at();

alter table public.peer_review_submissions enable row level security;
alter table public.peer_review_matches enable row level security;
alter table public.peer_reviews enable row level security;

drop policy if exists "Authors create peer review submissions" on public.peer_review_submissions;
create policy "Authors create peer review submissions"
  on public.peer_review_submissions for insert
  with check (auth.uid() = author_id);

drop policy if exists "Authors and assigned reviewers read peer review submissions" on public.peer_review_submissions;
create policy "Authors and assigned reviewers read peer review submissions"
  on public.peer_review_submissions for select
  using (
    auth.uid() = author_id
    or exists (
      select 1
      from public.peer_review_matches m
      where m.submission_id = peer_review_submissions.id
        and m.reviewer_id = auth.uid()
    )
  );

drop policy if exists "Authors update own submitted peer review submissions" on public.peer_review_submissions;
create policy "Authors update own submitted peer review submissions"
  on public.peer_review_submissions for update
  using (auth.uid() = author_id and status = 'submitted')
  with check (auth.uid() = author_id);

drop policy if exists "Review participants read peer review matches" on public.peer_review_matches;
create policy "Review participants read peer review matches"
  on public.peer_review_matches for select
  using (auth.uid() in (reviewer_id, reviewee_id));

drop policy if exists "Assigned reviewers update own peer review matches" on public.peer_review_matches;
create policy "Assigned reviewers update own peer review matches"
  on public.peer_review_matches for update
  using (auth.uid() = reviewer_id)
  with check (auth.uid() = reviewer_id);

drop policy if exists "Assigned reviewers insert peer reviews" on public.peer_reviews;
create policy "Assigned reviewers insert peer reviews"
  on public.peer_reviews for insert
  with check (
    auth.uid() = reviewer_id
    and exists (
      select 1
      from public.peer_review_matches m
      where m.id = peer_reviews.match_id
        and m.submission_id = peer_reviews.submission_id
        and m.reviewer_id = auth.uid()
        and m.status = 'assigned'
    )
  );

drop policy if exists "Review participants read peer reviews" on public.peer_reviews;
create policy "Review participants read peer reviews"
  on public.peer_reviews for select
  using (
    auth.uid() = reviewer_id
    or exists (
      select 1
      from public.peer_review_submissions s
      where s.id = peer_reviews.submission_id
        and s.author_id = auth.uid()
    )
  );

create or replace function public.claim_peer_review_submission(target_level text default null)
returns table (
  match_id uuid,
  submission_id uuid,
  reviewee_id uuid,
  concept_key text,
  level text,
  solution_text text,
  created_at timestamptz
)
language plpgsql
security invoker
set search_path = public
as $$
declare
  current_reviewer uuid := auth.uid();
  selected_submission public.peer_review_submissions%rowtype;
  inserted_match_id uuid;
begin
  if current_reviewer is null then
    raise exception 'peer review matching requires authenticated user';
  end if;

  select s.*
  into selected_submission
  from public.peer_review_submissions s
  where s.author_id <> current_reviewer
    and s.status = 'submitted'
    and (target_level is null or target_level = '' or s.level = target_level)
  order by s.created_at asc, s.id asc
  for update skip locked
  limit 1;

  if not found then
    raise exception 'no eligible peer review submission available';
  end if;

  insert into public.peer_review_matches (
    submission_id,
    reviewer_id,
    reviewee_id
  )
  values (
    selected_submission.id,
    current_reviewer,
    selected_submission.author_id
  )
  returning id into inserted_match_id;

  update public.peer_review_submissions
    set status = 'matched'
    where id = selected_submission.id;

  return query
  select
    inserted_match_id,
    selected_submission.id,
    selected_submission.author_id,
    selected_submission.concept_key,
    selected_submission.level,
    selected_submission.solution_text,
    selected_submission.created_at;
end;
$$;

create or replace function public.submit_peer_review(
  peer_match_id uuid,
  correctness smallint,
  clarity smallint,
  review_strengths text,
  review_improvements text
)
returns table (
  review_id uuid,
  match_id uuid,
  submission_id uuid,
  xp_awarded integer,
  status text,
  created_at timestamptz
)
language plpgsql
security invoker
set search_path = public
as $$
declare
  current_reviewer uuid := auth.uid();
  selected_match public.peer_review_matches%rowtype;
  deterministic_xp integer;
  inserted_review_id uuid;
  inserted_created_at timestamptz;
begin
  if current_reviewer is null then
    raise exception 'peer review submission requires authenticated user';
  end if;

  if correctness < 1 or correctness > 5 or clarity < 1 or clarity > 5 then
    raise exception 'peer review scores must be between 1 and 5';
  end if;

  if length(btrim(coalesce(review_strengths, ''))) = 0
    or length(btrim(coalesce(review_improvements, ''))) = 0 then
    raise exception 'peer review template requires strengths and improvements';
  end if;

  select m.*
  into selected_match
  from public.peer_review_matches m
  where m.id = peer_match_id
    and m.reviewer_id = current_reviewer
    and m.status = 'assigned'
  for update;

  if not found then
    raise exception 'assigned peer review match not found';
  end if;

  deterministic_xp := 20 + correctness + clarity;

  insert into public.peer_reviews (
    match_id,
    submission_id,
    reviewer_id,
    correctness_score,
    clarity_score,
    strengths,
    improvements,
    xp_awarded
  )
  values (
    selected_match.id,
    selected_match.submission_id,
    current_reviewer,
    correctness,
    clarity,
    btrim(review_strengths),
    btrim(review_improvements),
    deterministic_xp
  )
  returning id, created_at into inserted_review_id, inserted_created_at;

  update public.peer_review_matches
    set status = 'completed',
        completed_at = inserted_created_at
    where id = selected_match.id;

  update public.peer_review_submissions
    set status = 'reviewed',
        review_xp_awarded = review_xp_awarded + deterministic_xp
    where id = selected_match.submission_id;

  return query
  select
    inserted_review_id,
    selected_match.id,
    selected_match.submission_id,
    deterministic_xp,
    'completed'::text,
    inserted_created_at;
end;
$$;

grant execute on function public.claim_peer_review_submission(text) to authenticated;
grant execute on function public.submit_peer_review(uuid, smallint, smallint, text, text) to authenticated;
