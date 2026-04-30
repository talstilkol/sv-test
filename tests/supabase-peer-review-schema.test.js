const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Supabase peer review schema", () => {
  const migration = read("supabase/migrations/010_peer_code_review.sql");

  it("creates submission, match, and review tables without seeded peer work", () => {
    expect(migration).toContain("create table if not exists public.peer_review_submissions");
    expect(migration).toContain("create table if not exists public.peer_review_matches");
    expect(migration).toContain("create table if not exists public.peer_reviews");
    expect(migration).toContain("constraint peer_review_matches_no_self_review check (reviewer_id <> reviewee_id)");
    expect(migration).toContain("constraint peer_reviews_score_range check");
    expect(migration).not.toMatch(/\binsert\s+into\s+public\.peer_review_submissions\b/i);
  });

  it("uses authenticated RLS for authors, assigned reviewers, and review participants", () => {
    expect(migration).toContain("alter table public.peer_review_submissions enable row level security");
    expect(migration).toContain("alter table public.peer_review_matches enable row level security");
    expect(migration).toContain("alter table public.peer_reviews enable row level security");
    expect(migration).toContain('create policy "Authors create peer review submissions"');
    expect(migration).toContain('create policy "Authors and assigned reviewers read peer review submissions"');
    expect(migration).toContain('create policy "Assigned reviewers insert peer reviews"');
    expect(migration.match(/auth\.uid\(\)/g).length).toBeGreaterThanOrEqual(8);
  });

  it("adds matching and review RPCs with deterministic XP", () => {
    expect(migration).toContain("create or replace function public.claim_peer_review_submission");
    expect(migration).toContain("s.author_id <> current_reviewer");
    expect(migration).toContain("order by s.created_at asc, s.id asc");
    expect(migration).toContain("for update skip locked");
    expect(migration).toContain("create or replace function public.submit_peer_review");
    expect(migration).toContain("deterministic_xp := 20 + correctness + clarity");
    expect(migration).toContain("grant execute on function public.claim_peer_review_submission(text) to authenticated");
    expect(migration).toContain("grant execute on function public.submit_peer_review(uuid, smallint, smallint, text, text) to authenticated");
  });
});
