const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Supabase concept discussions schema", () => {
  const migration = read("supabase/migrations/006_concept_discussions.sql");

  it("creates thread and post tables without seeded discussions", () => {
    expect(migration).toContain("create table if not exists public.concept_discussion_threads");
    expect(migration).toContain("create table if not exists public.concept_discussion_posts");
    expect(migration).toContain("concept_key text not null");
    expect(migration).toContain("thread_id   uuid not null references public.concept_discussion_threads(id) on delete cascade");
    expect(migration).toContain("constraint concept_discussion_threads_title_not_blank");
    expect(migration).toContain("constraint concept_discussion_posts_body_not_blank");
    expect(migration).not.toMatch(/\binsert\s+into\b/i);
  });

  it("uses authenticated RLS for visible threads and author-owned writes", () => {
    expect(migration).toContain("alter table public.concept_discussion_threads enable row level security");
    expect(migration).toContain("alter table public.concept_discussion_posts enable row level security");
    expect(migration).toContain('create policy "Authenticated users read visible concept threads"');
    expect(migration).toContain('create policy "Authenticated users create concept threads"');
    expect(migration).toContain('create policy "Authenticated users read visible concept posts"');
    expect(migration).toContain('create policy "Authenticated users create concept posts"');
    expect(migration.match(/auth\.uid\(\) = author_id/g).length).toBeGreaterThanOrEqual(4);
    expect(migration).toContain("status <> 'hidden'");
  });
});
