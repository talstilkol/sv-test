const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Supabase classes schema", () => {
  const migration = read("supabase/migrations/002_classes.sql");

  it("creates a real teacher-owned classes table without seed data", () => {
    expect(migration).toContain("create table if not exists public.classes");
    expect(migration).toContain("teacher_id  uuid not null references auth.users(id) on delete cascade");
    expect(migration).toContain("course_key  text not null");
    expect(migration).toContain("name        text not null");
    expect(migration).toContain("constraint classes_course_key_not_blank");
    expect(migration).toContain("constraint classes_name_not_blank");
    expect(migration).toContain("constraint classes_teacher_name_unique unique (teacher_id, name)");
    expect(migration).not.toMatch(/\binsert\s+into\b/i);
  });

  it("enforces row-level security for the authenticated teacher", () => {
    expect(migration).toContain("alter table public.classes enable row level security");
    expect(migration).toContain('create policy "Teachers read own classes"');
    expect(migration).toContain('create policy "Teachers create own classes"');
    expect(migration).toContain('create policy "Teachers update own classes"');
    expect(migration).toContain('create policy "Teachers delete own classes"');
    expect(migration.match(/auth\.uid\(\) = teacher_id/g)).toHaveLength(5);
  });

  it("keeps class ordering and updated_at maintenance explicit", () => {
    expect(migration).toContain("idx_classes_teacher_created");
    expect(migration).toContain("on public.classes (teacher_id, created_at desc)");
    expect(migration).toContain("create or replace function public.set_updated_at()");
    expect(migration).toContain("create trigger set_classes_updated_at");
  });
});
