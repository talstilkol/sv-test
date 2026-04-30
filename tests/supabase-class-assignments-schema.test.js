const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Supabase class assignments schema", () => {
  const migration = read("supabase/migrations/005_class_assignments.sql");

  it("creates assignments without seeded tasks", () => {
    expect(migration).toContain("create table if not exists public.class_assignments");
    expect(migration).toContain("class_id           uuid not null references public.classes(id) on delete cascade");
    expect(migration).toContain("created_by         uuid not null references auth.users(id) on delete cascade");
    expect(migration).toContain("constraint class_assignments_title_not_blank");
    expect(migration).toContain("constraint class_assignments_type_check");
    expect(migration).not.toMatch(/\binsert\s+into\b/i);
  });

  it("protects assignments with teacher-owned RLS", () => {
    expect(migration).toContain("alter table public.class_assignments enable row level security");
    expect(migration).toContain('create policy "Teachers read assignments in own classes"');
    expect(migration).toContain('create policy "Teachers create assignments in own classes"');
    expect(migration).toContain('create policy "Teachers update assignments in own classes"');
    expect(migration).toContain('create policy "Teachers delete assignments in own classes"');
    expect(migration).toContain("created_by = auth.uid()");
    expect(migration.match(/c\.teacher_id = auth\.uid\(\)/g).length).toBeGreaterThanOrEqual(4);
  });
});
