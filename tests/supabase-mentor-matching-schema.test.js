const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Supabase mentor matching schema", () => {
  const migration = read("supabase/migrations/011_mentor_matching.sql");

  it("creates mentor profile, match, message, and rating tables without seeded mentors", () => {
    expect(migration).toContain("create table if not exists public.mentor_profiles");
    expect(migration).toContain("create table if not exists public.mentor_matches");
    expect(migration).toContain("create table if not exists public.mentor_messages");
    expect(migration).toContain("create table if not exists public.mentor_ratings");
    expect(migration).toContain("constraint mentor_matches_no_self_match check (learner_id <> mentor_id)");
    expect(migration).toContain("constraint mentor_ratings_score_range check (rating_score between 1 and 5)");
    expect(migration).not.toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i);
  });

  it("derives master eligibility and reputation from real peer/community data", () => {
    expect(migration).toContain("create or replace view public.mentor_master_eligibility");
    expect(migration).toContain("from public.peer_reviews");
    expect(migration).toContain("from public.community_reputation_summary");
    expect(migration).toContain("coalesce(p.completed_reviews, 0) >= 3");
    expect(migration).toContain("coalesce(p.avg_review_score, 0) >= 4");
    expect(migration).toContain("coalesce(c.reputation_points, 0) >= 5");
    expect(migration).toContain("create or replace view public.mentor_reputation_summary");
    expect(migration).toContain("avg(r.rating_score)");
  });

  it("uses RLS and RPCs for eligibility-gated matching, chat, and rating", () => {
    expect(migration).toContain("alter table public.mentor_profiles enable row level security");
    expect(migration).toContain("alter table public.mentor_matches enable row level security");
    expect(migration).toContain("alter table public.mentor_messages enable row level security");
    expect(migration).toContain("alter table public.mentor_ratings enable row level security");
    expect(migration).toContain("create or replace function public.register_mentor_availability");
    expect(migration).toContain("mentor registration requires master eligibility");
    expect(migration).toContain("create or replace function public.request_mentor_match");
    expect(migration).toContain("p.user_id <> current_learner");
    expect(migration).toContain("order by (");
    expect(migration).toContain("create or replace function public.rate_mentor_match");
    expect(migration).toContain("alter publication supabase_realtime add table public.mentor_messages");
  });
});
