const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Supabase concept discussion votes schema", () => {
  const migration = read("supabase/migrations/007_concept_discussion_votes.sql");

  it("creates vote rows without seeded votes", () => {
    expect(migration).toContain("create table if not exists public.concept_discussion_votes");
    expect(migration).toContain("thread_id  uuid not null references public.concept_discussion_threads(id) on delete cascade");
    expect(migration).toContain("voter_id   uuid not null references auth.users(id) on delete cascade");
    expect(migration).toContain("constraint concept_discussion_votes_value_check check (vote in (-1, 1))");
    expect(migration).toContain("constraint concept_discussion_votes_unique unique (thread_id, voter_id)");
    expect(migration).not.toMatch(/\binsert\s+into\b/i);
  });

  it("uses authenticated RLS for reading visible-thread votes and own writes", () => {
    expect(migration).toContain("alter table public.concept_discussion_votes enable row level security");
    expect(migration).toContain('create policy "Authenticated users read discussion votes"');
    expect(migration).toContain('create policy "Authenticated users vote once per discussion"');
    expect(migration).toContain('create policy "Authenticated users update own discussion vote"');
    expect(migration).toContain('create policy "Authenticated users remove own discussion vote"');
    expect(migration.match(/auth\.uid\(\) = voter_id/g).length).toBeGreaterThanOrEqual(3);
    expect(migration).toContain("t.status <> 'hidden'");
  });
});
