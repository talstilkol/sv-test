const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Supabase community reputation schema", () => {
  const migration = read("supabase/migrations/008_community_reputation.sql");

  it("creates a security-invoker reputation view without seeded reputation rows", () => {
    expect(migration).toContain("create or replace view public.community_reputation_summary");
    expect(migration).toContain("with (security_invoker = true)");
    expect(migration).toContain("t.author_id as user_id");
    expect(migration).toContain("count(distinct t.id)::integer as thread_count");
    expect(migration).toContain("count(v.id)::integer as received_votes");
    expect(migration).toContain("reputation_points");
    expect(migration).not.toMatch(/\binsert\s+into\b/i);
  });

  it("derives reputation from real discussion votes and hides hidden threads", () => {
    expect(migration).toContain("from public.concept_discussion_threads t");
    expect(migration).toContain("left join public.concept_discussion_votes v");
    expect(migration).toContain("on v.thread_id = t.id");
    expect(migration).toContain("when v.vote = 1 then 2");
    expect(migration).toContain("when v.vote = -1 then -1");
    expect(migration).toContain("where t.status <> 'hidden'");
    expect(migration).toContain("group by t.author_id");
  });
});
