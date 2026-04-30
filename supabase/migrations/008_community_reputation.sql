-- supabase/migrations/008_community_reputation.sql
-- Run: supabase db push

create or replace view public.community_reputation_summary
with (security_invoker = true)
as
select
  t.author_id as user_id,
  count(distinct t.id)::integer as thread_count,
  count(v.id)::integer as received_votes,
  coalesce(sum(case when v.vote = 1 then 2 when v.vote = -1 then -1 else 0 end), 0)::integer as reputation_points,
  max(v.updated_at) as last_vote_at
from public.concept_discussion_threads t
left join public.concept_discussion_votes v
  on v.thread_id = t.id
where t.status <> 'hidden'
group by t.author_id;
