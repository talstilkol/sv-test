-- supabase/migrations/004_class_concept_mastery.sql
-- Run: supabase db push

create table if not exists public.class_concept_mastery (
  id                uuid primary key default gen_random_uuid(),
  class_id          uuid not null references public.classes(id) on delete cascade,
  class_student_id  uuid not null references public.class_students(id) on delete cascade,
  concept_key       text not null,
  mastery_pct       integer not null default 0,
  previous_mastery_pct integer,
  attempts          integer not null default 0,
  correct           integer not null default 0,
  last_evidence_at  timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint class_concept_mastery_key_not_blank check (length(btrim(concept_key)) > 0),
  constraint class_concept_mastery_pct_range check (mastery_pct between 0 and 100),
  constraint class_concept_mastery_previous_pct_range check (previous_mastery_pct is null or previous_mastery_pct between 0 and 100),
  constraint class_concept_mastery_attempts_nonnegative check (attempts >= 0),
  constraint class_concept_mastery_correct_range check (correct >= 0 and correct <= attempts),
  constraint class_concept_mastery_unique_cell unique (class_student_id, concept_key)
);

create index if not exists idx_class_concept_mastery_class_concept
  on public.class_concept_mastery (class_id, concept_key);

create index if not exists idx_class_concept_mastery_class_student
  on public.class_concept_mastery (class_id, class_student_id);

drop trigger if exists set_class_concept_mastery_updated_at on public.class_concept_mastery;
create trigger set_class_concept_mastery_updated_at
  before update on public.class_concept_mastery
  for each row
  execute function public.set_updated_at();

alter table public.class_concept_mastery enable row level security;

drop policy if exists "Teachers read mastery in own classes" on public.class_concept_mastery;
create policy "Teachers read mastery in own classes"
  on public.class_concept_mastery for select
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_concept_mastery.class_id
        and c.teacher_id = auth.uid()
    )
  );

drop policy if exists "Teachers write mastery in own classes" on public.class_concept_mastery;
create policy "Teachers write mastery in own classes"
  on public.class_concept_mastery for insert
  with check (
    exists (
      select 1
      from public.classes c
      where c.id = class_concept_mastery.class_id
        and c.teacher_id = auth.uid()
    )
  );

drop policy if exists "Teachers update mastery in own classes" on public.class_concept_mastery;
create policy "Teachers update mastery in own classes"
  on public.class_concept_mastery for update
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_concept_mastery.class_id
        and c.teacher_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.classes c
      where c.id = class_concept_mastery.class_id
        and c.teacher_id = auth.uid()
    )
  );

drop policy if exists "Students update own mastery rows" on public.class_concept_mastery;
create policy "Students update own mastery rows"
  on public.class_concept_mastery for update
  using (
    exists (
      select 1
      from public.class_students cs
      where cs.id = class_concept_mastery.class_student_id
        and cs.student_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.class_students cs
      where cs.id = class_concept_mastery.class_student_id
        and cs.student_id = auth.uid()
    )
  );
