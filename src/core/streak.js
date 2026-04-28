const DAY_MS = 86_400_000;

export function dateKey(now = Date.now()) {
  return new Date(now).toISOString().slice(0, 10);
}

export function monthKeyFromDateKey(key) {
  return String(key || "").slice(0, 7);
}

export function shiftDateKey(key, days) {
  const time = Date.parse(`${key}T00:00:00.000Z`);
  if (!Number.isFinite(time)) return "";
  return dateKey(time + days * DAY_MS);
}

export function normalizeStreak(state) {
  return {
    count: Math.max(0, Number(state && state.count) || 0),
    lastDate: String((state && state.lastDate) || ""),
    freezeMonth: String((state && state.freezeMonth) || ""),
    lastFreezeDate: String((state && state.lastFreezeDate) || ""),
    lastFreezeCoveredDate: String((state && state.lastFreezeCoveredDate) || ""),
  };
}

export function advanceStreak(state, now = Date.now()) {
  const streak = normalizeStreak(state);
  const today = dateKey(now);
  const yesterday = shiftDateKey(today, -1);
  const dayBeforeYesterday = shiftDateKey(today, -2);
  const currentMonth = monthKeyFromDateKey(today);

  if (streak.lastDate === today) {
    return { ...streak, changed: false, usedFreeze: false };
  }

  if (streak.lastDate === yesterday) {
    return {
      ...streak,
      count: streak.count + 1,
      lastDate: today,
      changed: true,
      usedFreeze: false,
    };
  }

  if (
    streak.count > 0 &&
    streak.lastDate === dayBeforeYesterday &&
    streak.freezeMonth !== currentMonth
  ) {
    return {
      ...streak,
      count: streak.count + 1,
      lastDate: today,
      freezeMonth: currentMonth,
      lastFreezeDate: today,
      lastFreezeCoveredDate: yesterday,
      changed: true,
      usedFreeze: true,
    };
  }

  return {
    ...streak,
    count: 1,
    lastDate: today,
    changed: true,
    usedFreeze: false,
  };
}

export function freezeAvailable(state, now = Date.now()) {
  const streak = normalizeStreak(state);
  return streak.freezeMonth !== monthKeyFromDateKey(dateKey(now));
}
