const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Supabase class concept mastery schema", () => {
  const migration = read("supabase/migrations/004_class_concept_mastery.sql");

  it("creates a real mastery table without seeded heatmap rows", () => {
    expect(migration).toContain("create table if not exists public.class_concept_mastery");
    expect(migration).toContain("class_id          uuid not null references public.classes(id) on delete cascade");
    expect(migration).toContain("class_student_id  uuid not null references public.class_students(id) on delete cascade");
    expect(migration).toContain("concept_key       text not null");
    expect(migration).toContain("constraint class_concept_mastery_pct_range check (mastery_pct between 0 and 100)");
    expect(migration).toContain("constraint class_concept_mastery_previous_pct_range check (previous_mastery_pct is null or previous_mastery_pct between 0 and 100)");
    expect(migration).toContain("constraint class_concept_mastery_unique_cell unique (class_student_id, concept_key)");
    expect(migration).not.toMatch(/\binsert\s+into\b/i);
  });

  it("protects heatmap rows with teacher-owned RLS and optional student self-update", () => {
    expect(migration).toContain("alter table public.class_concept_mastery enable row level security");
    expect(migration).toContain('create policy "Teachers read mastery in own classes"');
    expect(migration).toContain('create policy "Teachers write mastery in own classes"');
    expect(migration).toContain('create policy "Teachers update mastery in own classes"');
    expect(migration).toContain('create policy "Students update own mastery rows"');
    expect(migration.match(/c\.teacher_id = auth\.uid\(\)/g).length).toBeGreaterThanOrEqual(3);
    expect(migration).toContain("cs.student_id = auth.uid()");
  });
});
