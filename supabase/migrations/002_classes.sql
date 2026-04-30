-- supabase/migrations/002_classes.sql
-- Run: supabase db push

create table if not exists public.classes (
  id          uuid primary key default gen_random_uuid(),
  teacher_id  uuid not null references auth.users(id) on delete cascade,
  course_key  text not null,
  name        text not null,
  archived_at timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint classes_course_key_not_blank check (length(btrim(course_key)) > 0),
  constraint classes_name_not_blank check (length(btrim(name)) > 0),
  constraint classes_teacher_name_unique unique (teacher_id, name)
);

create index if not exists idx_classes_teacher_created
  on public.classes (teacher_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_classes_updated_at on public.classes;
create trigger set_classes_updated_at
  before update on public.classes
  for each row
  execute function public.set_updated_at();

alter table public.classes enable row level security;

drop policy if exists "Teachers read own classes" on public.classes;
create policy "Teachers read own classes"
  on public.classes for select
  using (auth.uid() = teacher_id);

drop policy if exists "Teachers create own classes" on public.classes;
create policy "Teachers create own classes"
  on public.classes for insert
  with check (auth.uid() = teacher_id);

drop policy if exists "Teachers update own classes" on public.classes;
create policy "Teachers update own classes"
  on public.classes for update
  using (auth.uid() = teacher_id)
  with check (auth.uid() = teacher_id);

drop policy if exists "Teachers delete own classes" on public.classes;
create policy "Teachers delete own classes"
  on public.classes for delete
  using (auth.uid() = teacher_id);
