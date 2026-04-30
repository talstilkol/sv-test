-- supabase/migrations/003_class_students.sql
-- Run: supabase db push

create table if not exists public.class_students (
  id             uuid primary key default gen_random_uuid(),
  class_id       uuid not null references public.classes(id) on delete cascade,
  student_id     uuid references auth.users(id) on delete set null,
  display_name   text not null,
  status         text not null default 'active',
  joined_at      timestamptz not null default now(),
  last_active_at timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  constraint class_students_display_name_not_blank check (length(btrim(display_name)) > 0),
  constraint class_students_status_check check (status in ('active', 'invited', 'inactive', 'removed')),
  constraint class_students_unique_display_name unique (class_id, display_name)
);

create index if not exists idx_class_students_class_name
  on public.class_students (class_id, display_name);

create index if not exists idx_class_students_activity
  on public.class_students (class_id, last_active_at desc nulls last);

drop trigger if exists set_class_students_updated_at on public.class_students;
create trigger set_class_students_updated_at
  before update on public.class_students
  for each row
  execute function public.set_updated_at();

alter table public.class_students enable row level security;

drop policy if exists "Teachers read students in own classes" on public.class_students;
create policy "Teachers read students in own classes"
  on public.class_students for select
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_students.class_id
        and c.teacher_id = auth.uid()
    )
  );

drop policy if exists "Teachers add students to own classes" on public.class_students;
create policy "Teachers add students to own classes"
  on public.class_students for insert
  with check (
    exists (
      select 1
      from public.classes c
      where c.id = class_students.class_id
        and c.teacher_id = auth.uid()
    )
  );

drop policy if exists "Teachers update students in own classes" on public.class_students;
create policy "Teachers update students in own classes"
  on public.class_students for update
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_students.class_id
        and c.teacher_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.classes c
      where c.id = class_students.class_id
        and c.teacher_id = auth.uid()
    )
  );

drop policy if exists "Teachers remove students from own classes" on public.class_students;
create policy "Teachers remove students from own classes"
  on public.class_students for delete
  using (
    exists (
      select 1
      from public.classes c
      where c.id = class_students.class_id
        and c.teacher_id = auth.uid()
    )
  );
