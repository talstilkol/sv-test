const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Supabase class students schema", () => {
  const migration = read("supabase/migrations/003_class_students.sql");

  it("creates class_students without seeded students", () => {
    expect(migration).toContain("create table if not exists public.class_students");
    expect(migration).toContain("class_id       uuid not null references public.classes(id) on delete cascade");
    expect(migration).toContain("display_name   text not null");
    expect(migration).toContain("constraint class_students_display_name_not_blank");
    expect(migration).toContain("constraint class_students_status_check");
    expect(migration).not.toMatch(/\binsert\s+into\b/i);
  });

  it("limits student list access to teachers who own the class", () => {
    expect(migration).toContain("alter table public.class_students enable row level security");
    expect(migration).toContain('create policy "Teachers read students in own classes"');
    expect(migration).toContain('create policy "Teachers add students to own classes"');
    expect(migration).toContain('create policy "Teachers update students in own classes"');
    expect(migration).toContain('create policy "Teachers remove students from own classes"');
    expect(migration.match(/c\.teacher_id = auth\.uid\(\)/g).length).toBeGreaterThanOrEqual(4);
  });
});
