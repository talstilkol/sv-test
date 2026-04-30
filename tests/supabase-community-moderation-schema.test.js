const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Supabase community moderation schema", () => {
  const migration = read("supabase/migrations/009_community_moderation.sql");

  it("creates moderator, report, and audit tables without seeded moderation rows", () => {
    expect(migration).toContain("create table if not exists public.community_moderators");
    expect(migration).toContain("create table if not exists public.concept_discussion_reports");
    expect(migration).toContain("create table if not exists public.concept_discussion_moderation_actions");
    expect(migration).toContain("constraint concept_discussion_reports_target_check");
    expect(migration).toContain("constraint concept_discussion_moderation_actions_action_check");
    expect(migration).not.toMatch(/\binsert\s+into\s+public\.community_moderators\b/i);
    expect(migration).not.toMatch(/\binsert\s+into\s+public\.concept_discussion_reports\b/i);
  });

  it("uses RLS to separate reporters, moderators, and audit writes", () => {
    expect(migration).toContain("alter table public.community_moderators enable row level security");
    expect(migration).toContain("alter table public.concept_discussion_reports enable row level security");
    expect(migration).toContain("alter table public.concept_discussion_moderation_actions enable row level security");
    expect(migration).toContain('create policy "Authenticated users create discussion reports"');
    expect(migration).toContain('create policy "Reporters and moderators read discussion reports"');
    expect(migration).toContain('create policy "Moderators insert moderation actions"');
    expect(migration.match(/from public\.community_moderators m/g).length).toBeGreaterThanOrEqual(6);
  });

  it("adds a transactional moderation RPC and grants it only to authenticated users", () => {
    expect(migration).toContain("create or replace function public.apply_concept_discussion_moderation");
    expect(migration).toContain("security invoker");
    expect(migration).toContain("moderation requires community moderator role");
    expect(migration).toContain("update public.concept_discussion_threads");
    expect(migration).toContain("update public.concept_discussion_posts");
    expect(migration).toContain("insert into public.concept_discussion_moderation_actions");
    expect(migration).toContain("grant execute on function public.apply_concept_discussion_moderation(uuid, uuid, text, text) to authenticated");
  });
});
