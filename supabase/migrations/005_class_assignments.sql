-- supabase/migrations/005_class_assignments.sql
-- Run: supabase db push

create table if not exists public.class_assignments (
  id                 uuid primary key default gen_random_uuid(),
  class_id           uuid not null references public.classes(id) on delete cascade,
  created_by         uuid not null references auth.users(id) on delete cascade,
  title              text not null,
  assignment_type    text not null,
  target_concept_key text,
  due_at             timestamptz,
  status             text not null default 'active',
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  constraint class_assignments_title_not_blank check (length(btrim(title)) > 0),
  constraint class_assignments_type_check check (assignment_type in ('concept_practice', 'mock_exam', 'code_task', 'reading')),
  constraint class_assignments_status_check check (status in ('active', 'archived', 'completed'))
);

create index if not exists idx_class_assignments_class_due
  on public.class_assignments (class_id, due_at asc nulls last, created_at desc);

drop trigger if exists set_class_assignments_updated_at on public.class_assignments;
create trigger set_class_assignments_updated_at
  before update on public.class_assignments
  for each row
  execute function public.set_updated_at();

alter table public.class_assignments enable row level security;

drop policy if exists "Teachers read assignments in own classes" on public.class_assignments;
create policy "Teachers read assignments in own classes"
  on public.class_assignments for select
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_assignments.class_id
        and c.teacher_id = auth.uid()
    )
  );

drop policy if exists "Teachers create assignments in own classes" on public.class_assignments;
create policy "Teachers create assignments in own classes"
  on public.class_assignments for insert
  with check (
    created_by = auth.uid()
    and exists (
      select 1
      from public.classes c
      where c.id = class_assignments.class_id
        and c.teacher_id = auth.uid()
    )
  );

drop policy if exists "Teachers update assignments in own classes" on public.class_assignments;
create policy "Teachers update assignments in own classes"
  on public.class_assignments for update
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_assignments.class_id
        and c.teacher_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.classes c
      where c.id = class_assignments.class_id
        and c.teacher_id = auth.uid()
    )
  );

drop policy if exists "Teachers delete assignments in own classes" on public.class_assignments;
create policy "Teachers delete assignments in own classes"
  on public.class_assignments for delete
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_assignments.class_id
        and c.teacher_id = auth.uid()
    )
  );
