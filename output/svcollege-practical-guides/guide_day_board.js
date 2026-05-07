"use strict";

(() => {
  if (window.__svcollegeGuideDayBoardLoaded) return;
  window.__svcollegeGuideDayBoardLoaded = true;

  const route = document.querySelector(".guide-simple-route");
  if (!route) return;

  const PROGRESS_KEY = "svcollege-practical-guides-progress-v1";
  const SCHEDULE_KEY = "svcollege-practical-guides-schedule-v1";
  const dayPlan = [
    { id: "day1-ts-js", title: "יום 1 - TS + JS בסיס + סרטונים 1-16", minutes: 750, href: "./guide_01_ideas.html" },
    { id: "day2-react-skeleton", title: "יום 2 - React Skeleton + סרטונים 17-32", minutes: 780, href: "./guide_02_homework_and_exam_drills.html" },
    { id: "day3-validations", title: "יום 3 - Forms + Validations + סרטונים 33-48", minutes: 810, href: "./guide_02_homework_and_exam_drills.html" },
    { id: "day4-project70", title: "יום 4 - Project 70 מלא + סרטונים 49-64", minutes: 840, href: "./guide_02_homework_and_exam_drills.html" },
    { id: "day5-express-mongo", title: "יום 5 - Express/Mongo + סרטונים 65-80", minutes: 750, href: "./guide_02_homework_and_exam_drills.html" },
    { id: "day6-mock", title: "יום 6 - Mock Exam + סרטונים 81-97", minutes: 750, href: "./guide_03_exam_day_runbook.html" },
    { id: "day7-weaknesses", title: "יום 7 - תיקון חולשות + סרטונים 98-114 + עץ 73", minutes: 1085, href: "./progress_tracker.html" }
  ];
  const totalMinutes = dayPlan.reduce((sum, day) => sum + day.minutes, 0);

  function injectStyles() {
    if (document.getElementById("guide-day-board-style")) return;
    const style = document.createElement("style");
    style.id = "guide-day-board-style";
    style.textContent = `
      .guide-simple-shell {
        display:grid;
        grid-template-columns:minmax(0,1.7fr) minmax(280px,1fr);
        grid-template-areas:"route board";
        direction:ltr;
        gap:14px;
        align-items:start;
        margin:0 0 22px;
      }
      .guide-simple-shell > * { direction:rtl; }
      .guide-simple-route { grid-area:route; margin:0 !important; }
      .guide-lag-top {
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
        margin:0 0 12px;
        padding:12px 14px;
        border:1px solid rgba(251,113,133,.55);
        border-radius:14px;
        background:rgba(127,29,29,.28);
        color:#fecdd3;
        font-weight:900;
      }
      .guide-lag-top button {
        background:var(--red,#fb7185);
        color:#111827;
        border-radius:12px;
        min-height:40px;
        padding:8px 12px;
        border:0;
        font-weight:900;
        cursor:pointer;
      }
      .guide-day-board {
        grid-area:board;
        display:grid;
        gap:10px;
        padding:14px;
        border:1px solid rgba(34,211,238,.38);
        border-radius:18px;
        background:rgba(15,23,42,.82);
      }
      .guide-day-board h3 { margin:0; color:var(--cyan,#22d3ee); }
      .guide-day-board p { margin:0; font-size:.9rem; color:var(--muted,#a8b3c7); }
      .guide-day-board.is-behind { border-color:rgba(251,113,133,.62); background:rgba(69,10,10,.24); }
      .guide-day-list { list-style:none; margin:0; padding:0; display:grid; gap:8px; }
      .guide-day-item {
        display:grid;
        grid-template-columns:minmax(0,1fr) auto;
        align-items:center;
        gap:8px;
        padding:10px 10px;
        border:1px solid rgba(148,163,184,.2);
        border-radius:12px;
        background:rgba(2,6,23,.38);
      }
      .guide-day-item strong { color:var(--ink,#f8fafc); font-size:.95rem; }
      .guide-day-item small { display:block; color:var(--muted,#a8b3c7); font-size:.78rem; font-weight:800; }
      .guide-day-item b { color:var(--green,#86efac); font-size:1rem; min-width:52px; text-align:left; }
      .guide-day-item.done { border-color:rgba(134,239,172,.45); background:rgba(20,83,45,.2); }
      .guide-day-item.done b { color:#bbf7d0; }
      .guide-day-item.overdue { border-color:rgba(251,113,133,.6); background:rgba(127,29,29,.32); }
      .guide-day-item.overdue b, .guide-day-item.overdue strong { color:#fecdd3; }
      .guide-day-board .guide-next-task {
        min-height:42px;
        border-radius:12px;
        background:var(--cyan,#22d3ee);
        color:#03111f;
        font-weight:900;
        border:0;
        cursor:pointer;
      }
      @media (max-width:980px) {
        .guide-simple-shell { grid-template-columns:1fr; grid-template-areas:"route" "board"; direction:rtl; }
      }
      @media print {
        .guide-lag-top, .guide-day-board { display:none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureShell() {
    const existing = route.closest(".guide-simple-shell");
    if (existing) return existing;
    const shell = document.createElement("section");
    shell.className = "guide-simple-shell";
    route.parentNode.insertBefore(shell, route);
    shell.appendChild(route);
    return shell;
  }

  function ensureLagTop(shell) {
    let lagTop = document.querySelector("[data-lag-top]");
    if (lagTop) return lagTop;
    lagTop = document.createElement("div");
    lagTop.className = "guide-lag-top";
    lagTop.setAttribute("data-lag-top", "");
    lagTop.hidden = true;
    lagTop.innerHTML = `
      <span data-lag-text>אתה מפגר ב-0.0 שעות ביחס ללוז המתוכנן.</span>
      <button type="button" data-start-next-top>התחל את המשימה הבאה</button>
    `;
    shell.parentNode.insertBefore(lagTop, shell);
    return lagTop;
  }

  function ensureDayBoard(shell) {
    let board = shell.querySelector("[data-day-board]");
    if (board) return board;
    board = document.createElement("aside");
    board.className = "guide-day-board";
    board.setAttribute("data-day-board", "");
    board.setAttribute("aria-label", "לוח משימות לפי ימים");
    board.innerHTML = `
      <h3>לוח משימות לפי ימים</h3>
      <p data-plan-start>הלוז מתחיל: --</p>
      <ol class="guide-day-list" data-day-list></ol>
      <button type="button" class="guide-next-task" data-start-next-board>התחל את המשימה הבאה</button>
    `;
    shell.appendChild(board);
    return board;
  }

  function loadJson(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function formatMinutes(total) {
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    return `${hours}:${String(minutes).padStart(2, "0")}`;
  }

  function formatLagHours(minutes) {
    const hours = minutes / 60;
    return hours.toLocaleString("he-IL", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }

  function completedMinutes(state) {
    return dayPlan.reduce((sum, day) => sum + (state[day.id] ? day.minutes : 0), 0);
  }

  function getScheduleStart(state) {
    const schedule = loadJson(SCHEDULE_KEY);
    const parsed = Date.parse(String(schedule.startedAt || ""));
    if (!Number.isFinite(parsed)) {
      const inferred = new Date(Date.now() - (completedMinutes(state) * 60000)).toISOString();
      saveJson(SCHEDULE_KEY, { startedAt: inferred });
      return Date.parse(inferred);
    }
    return parsed;
  }

  function nextDay(state) {
    return dayPlan.find((day) => !state[day.id]) || null;
  }

  function setNextTaskButtons(day, topButton, boardButton) {
    const buttons = [topButton, boardButton].filter(Boolean);
    buttons.forEach((button) => {
      if (!day) {
        button.disabled = true;
        button.textContent = "סיימת את כל המשימות";
        return;
      }
      button.disabled = false;
      button.textContent = "התחל את המשימה הבאה";
      button.onclick = () => {
        window.location.href = day.href;
      };
    });
  }

  function render() {
    const shell = ensureShell();
    const lagTop = ensureLagTop(shell);
    const board = ensureDayBoard(shell);

    const dayList = board.querySelector("[data-day-list]");
    const lagText = lagTop.querySelector("[data-lag-text]");
    const routePercent = route.querySelector("[data-route-percent]") || route.querySelector(".guide-simple-percent strong");
    const routeStep = route.querySelector("[data-route-step]") || route.querySelector(".guide-simple-percent span");
    const routeBar = route.querySelector("[data-route-bar]") || route.querySelector(".guide-simple-bar i");
    const routeOutput = route.querySelector("[data-route-output]") || route.querySelector(".guide-simple-arrows output");
    const planStart = board.querySelector("[data-plan-start]");
    const topNextButton = lagTop.querySelector("[data-start-next-top]");
    const boardNextButton = board.querySelector("[data-start-next-board]");

    const state = loadJson(PROGRESS_KEY);
    const startAt = getScheduleStart(state);
    const elapsedMinutes = Math.max(0, Math.floor((Date.now() - startAt) / 60000));
    const doneMinutes = completedMinutes(state);
    const doneDays = dayPlan.filter((day) => !!state[day.id]).length;
    const percent = Math.round((doneMinutes / totalMinutes) * 100);
    const expectedTotal = Math.min(totalMinutes, elapsedMinutes);
    const lagMinutes = Math.max(0, expectedTotal - doneMinutes);

    if (routePercent) routePercent.textContent = `${percent}%`;
    if (routeBar) routeBar.style.width = `${percent}%`;
    if (routeOutput) routeOutput.textContent = `${percent}%`;
    if (routeStep) {
      routeStep.textContent = doneDays >= dayPlan.length
        ? "הושלמו כל 7 הימים"
        : `יום ${Math.min(doneDays + 1, dayPlan.length)} מתוך ${dayPlan.length}`;
    }

    if (planStart) {
      const startText = new Date(startAt).toLocaleString("he-IL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
      planStart.textContent = `הלוז התחיל: ${startText}`;
    }

    let cumulative = 0;
    dayList.innerHTML = dayPlan.map((day) => {
      const start = cumulative;
      const end = cumulative + day.minutes;
      cumulative = end;
      let expectedPercent = 0;
      if (elapsedMinutes >= end) expectedPercent = 100;
      else if (elapsedMinutes > start) expectedPercent = Math.round(((elapsedMinutes - start) / day.minutes) * 100);
      const actualPercent = state[day.id] ? 100 : 0;
      const overdue = expectedPercent > actualPercent + 2;
      const done = actualPercent === 100;
      const classes = ["guide-day-item", done ? "done" : "", overdue ? "overdue" : ""].join(" ").trim();
      return `<li class="${classes}">
        <div>
          <strong>${day.title}</strong>
          <small>בוצע ${actualPercent}% · יעד עכשיו ${expectedPercent}% · ${formatMinutes(day.minutes)} שעות</small>
        </div>
        <b>${actualPercent}%</b>
      </li>`;
    }).join("");

    const behind = lagMinutes > 0;
    board.classList.toggle("is-behind", behind);
    lagTop.hidden = !behind;
    if (behind && lagText) {
      lagText.textContent = `אתה מפגר ב-${formatLagHours(lagMinutes)} שעות ביחס ללוז המתוכנן`;
    }

    setNextTaskButtons(nextDay(state), topNextButton, boardNextButton);
  }

  injectStyles();
  render();
})();
