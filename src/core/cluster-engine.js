// src/core/cluster-engine.js
// Cluster-based V-marking + anti-cheat engine.
// Sprint 4 partial: extracted from app.js to reduce monolith.
//
// PUBLIC API (window.ClusterEngine):
//   computeClusterVStatus(getScore, conceptKey, lessonId, conceptName)
//     → { cluster, membersPassed, requiredMembers, perMemberNeed, verified, weakMember } or null
//   canMarkVForCluster(getScore, conceptKey, lessonId, conceptName, concept,
//                     correctNeededForV, getDifficulty)
//     → boolean
//
// Pure functions: no DOM, no globals besides window.CLUSTER_INDEX.
// Easy to unit-test.

(function () {
  "use strict";

  function getClusterApi() {
    return (typeof window !== "undefined" && window.CLUSTER_INDEX) || null;
  }

  function findCluster(lessonId, conceptName) {
    const api = getClusterApi();
    return api ? api.findByConcept(lessonId, conceptName) : null;
  }

  function perMemberThreshold(clusterDifficulty, correctNeededForV) {
    return Math.max(1, Math.ceil(correctNeededForV(clusterDifficulty) / 2));
  }

  function requiredMembersCount(cluster) {
    return Math.max(1, Math.ceil(cluster.members.length / 2));
  }

  function memberHasPassed(scoresMap, conceptKeyFn, lessons, memberName, threshold) {
    for (const lessonRef of lessons) {
      const sc = scoresMap[conceptKeyFn(lessonRef, memberName)];
      if (sc) return Number(sc.correctRunCount || 0) >= threshold;
    }
    return false;
  }

  function findWeakMember(scoresMap, conceptKeyFn, cluster, lessonId, threshold) {
    return cluster.members.find((m) => {
      const lessons = cluster.lessons || [lessonId];
      return !memberHasPassed(scoresMap, conceptKeyFn, lessons, m, threshold);
    });
  }

  function computeClusterVStatus(scoresMap, conceptKeyFn, correctNeededForV, lessonId, conceptName) {
    const cluster = findCluster(lessonId, conceptName);
    if (!cluster) return null;
    const threshold = perMemberThreshold(cluster.difficulty, correctNeededForV);
    let membersPassed = 0;
    cluster.members.forEach((m) => {
      const lessons = cluster.lessons || [lessonId];
      if (memberHasPassed(scoresMap, conceptKeyFn, lessons, m, threshold)) membersPassed++;
    });
    const required = requiredMembersCount(cluster);
    return {
      cluster,
      membersPassed,
      requiredMembers: required,
      perMemberNeed: threshold,
      verified: membersPassed >= required,
      weakMember: findWeakMember(scoresMap, conceptKeyFn, cluster, lessonId, threshold),
    };
  }

  function canMarkVForCluster(scoresMap, conceptKeyFn, correctNeededForV, getDifficulty,
                               lessonId, conceptName, concept) {
    const cluster = findCluster(lessonId, conceptName);
    if (!cluster) return null; // null = not in cluster, defer to base canMarkV
    const clusterDiff = Math.max(cluster.difficulty, getDifficulty(concept));
    if (clusterDiff >= 7) return false; // hard cluster — must master via 7 levels
    const status = computeClusterVStatus(scoresMap, conceptKeyFn, correctNeededForV, lessonId, conceptName);
    return status && status.verified;
  }

  function clusterMembersAsScoreKeys(cluster, conceptKeyFn) {
    const keys = [];
    cluster.members.forEach((m) => {
      (cluster.lessons || []).forEach((lid) => {
        keys.push(conceptKeyFn(lid, m));
      });
    });
    return keys;
  }

  const api = {
    findCluster,
    computeClusterVStatus,
    canMarkVForCluster,
    clusterMembersAsScoreKeys,
    perMemberThreshold,
    requiredMembersCount,
  };

  if (typeof window !== "undefined") window.ClusterEngine = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
