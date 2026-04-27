document.addEventListener("DOMContentLoaded", () => {
  const lessonsNav = document.getElementById("lessons-nav");
  const welcomeScreen = document.getElementById("welcome-screen");
  const activeLessonContainer = document.getElementById("active-lesson");
  const currentLessonTitle = document.getElementById("current-lesson-title");
  const currentLessonDesc = document.getElementById("current-lesson-desc");
  const lessonBody = document.getElementById("lesson-body");
  const levelTabs = document.querySelectorAll(".level-tab");
  const searchInput = document.getElementById("search-input");
  const quizSection = document.getElementById("quiz-section");
  const quizBody = document.getElementById("quiz-body");
  const quizSubmitBtn = document.getElementById("quiz-submit");
  const quizResetBtn = document.getElementById("quiz-reset");
  const quizResults = document.getElementById("quiz-results");
  const quizScore = document.getElementById("quiz-score");
  const quizFeedback = document.getElementById("quiz-feedback");
  const mobileToggle = document.getElementById("mobile-toggle");
  const sidebar = document.getElementById("sidebar");
  const knowledgeMapView = document.getElementById("knowledge-map-view");
  const studyModeView = document.getElementById("study-mode-view");
  const trainerView = document.getElementById("trainer-view");
  const guideView = document.getElementById("guide-view");
  const openKnowledgeMapBtn = document.getElementById("open-knowledge-map");
  const openStudyModeBtn = document.getElementById("open-study-mode");
  const openTrainerBtn = document.getElementById("open-trainer");
  const openGuideBtn = document.getElementById("open-guide");
  const codeblocksView = document.getElementById("codeblocks-view");
  const openCodeblocksBtn = document.getElementById("open-codeblocks");
  const traceView = document.getElementById("trace-view");
  const openTraceBtn = document.getElementById("open-trace");

  let currentLessonId = null;
  let currentLevel = "grandma";
  let quizCompleted = {};

  // =========== PROFICIENCY STORE (V/X knowledge map) ===========
  // proficiency[conceptKey] = "v" | "x" | undefined
  // conceptKey = `${lessonId}::${conceptName}`
  const PROF_STORAGE_KEY = "lumenportal:proficiency:v1";
  let proficiency = {};
  try {
    proficiency = JSON.parse(localStorage.getItem(PROF_STORAGE_KEY) || "{}");
  } catch (_) { proficiency = {}; }

  function saveProficiency() {
    try { localStorage.setItem(PROF_STORAGE_KEY, JSON.stringify(proficiency)); } catch (_) {}
  }

  function conceptKey(lessonId, conceptName) {
    return `${lessonId}::${conceptName}`;
  }

  function setProficiency(lessonId, conceptName, val) {
    const k = conceptKey(lessonId, conceptName);
    if (val == null) delete proficiency[k];
    else proficiency[k] = val;
    saveProficiency();
  }

  function getProficiency(lessonId, conceptName) {
    return proficiency[conceptKey(lessonId, conceptName)] || null;
  }

  function allConcepts() {
    const out = [];
    (window.LESSONS_DATA || []).forEach((l) => {
      (l.concepts || []).forEach((c) => {
        out.push({ lesson: l, concept: c });
      });
    });
    return out;
  }

  // =========== QUESTION BANK INDEX ===========
  // Counts questions per (lessonId, conceptName), separating curated vs seeded
  function bankCountsFor(lessonId, conceptName) {
    const bank = window.QUESTIONS_BANK || { mc: [], fill: [] };
    const key = conceptKey(lessonId, conceptName);
    const mcAll = (bank.mc || []).filter((q) => q.conceptKey === key);
    const fillAll = (bank.fill || []).filter((q) => q.conceptKey === key);
    const counts = {
      mc: mcAll.length,
      fill: fillAll.length,
      mcCurated: mcAll.filter((q) => !q._seeded).length,
      fillCurated: fillAll.filter((q) => !q._seeded).length,
    };
    counts.mcSeeded = counts.mc - counts.mcCurated;
    counts.fillSeeded = counts.fill - counts.fillCurated;
    return counts;
  }
  function bankByTopic(topicId) {
    const bank = window.QUESTIONS_BANK || { mc: [], fill: [] };
    return {
      mc: (bank.mc || []).filter((q) => q.topicId === topicId),
      fill: (bank.fill || []).filter((q) => q.topicId === topicId),
    };
  }
  function bankByConcept(lessonId, conceptName) {
    const bank = window.QUESTIONS_BANK || { mc: [], fill: [] };
    const key = conceptKey(lessonId, conceptName);
    return {
      mc: (bank.mc || []).filter((q) => q.conceptKey === key),
      fill: (bank.fill || []).filter((q) => q.conceptKey === key),
    };
  }
  // Find concept by key (used by guide to update levels for hand-crafted Qs)
  function findConceptByKey(key) {
    if (!key) return null;
    const [lessonId, ...rest] = key.split("::");
    const conceptName = rest.join("::");
    const lesson = (window.LESSONS_DATA || []).find((l) => l.id === lessonId);
    if (!lesson) return null;
    const concept = (lesson.concepts || []).find(
      (c) => c.conceptName === conceptName,
    );
    if (!concept) return null;
    return { lesson, concept };
  }

  function profCounts() {
    const concepts = allConcepts();
    let v = 0, x = 0;
    concepts.forEach(({ lesson, concept }) => {
      const p = getProficiency(lesson.id, concept.conceptName);
      if (p === "v") v++;
      else if (p === "x") x++;
    });
    return { total: concepts.length, v, x, pending: concepts.length - v - x };
  }

  // =========== P1.3 — PWA: Register Service Worker ===========
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("service-worker.js", { scope: "/" })
        .then((reg) => {
          console.log("[LumenPortal] 🛡️ SW registered:", reg.scope);
        })
        .catch((err) => {
          console.warn("[LumenPortal] SW registration failed:", err);
        });
    });
  }

  // =========== MOBILE MENU ===========
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      mobileToggle.setAttribute(
        "aria-expanded",
        sidebar.classList.contains("open") ? "true" : "false",
      );
    });
  }

  // =========== P1.2.4 — Theme Toggle (Light / Dark / Auto) ===========
  const THEME_KEY = "lumenportal:theme:v1";
  const themeToggle = document.getElementById("theme-toggle");
  const themeStates = ["auto", "light", "dark"]; // cycle order
  const themeIcons = { auto: "🌗", light: "☀️", dark: "🌙" };

  function applyTheme(theme) {
    document.documentElement.classList.remove("theme-light", "theme-dark");
    if (theme === "light") document.documentElement.classList.add("theme-light");
    if (theme === "dark") document.documentElement.classList.add("theme-dark");
    if (themeToggle) {
      themeToggle.querySelector("span").textContent = themeIcons[theme] || "🌗";
      themeToggle.setAttribute(
        "aria-label",
        theme === "auto"
          ? "מצב תצוגה: אוטומטי (לחץ למעבר לבהיר)"
          : theme === "light"
            ? "מצב תצוגה: בהיר (לחץ למעבר לכהה)"
            : "מצב תצוגה: כהה (לחץ למעבר לאוטומטי)",
      );
    }
  }

  // Init from localStorage or auto
  let currentTheme = "auto";
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved && themeStates.includes(saved)) currentTheme = saved;
  } catch (_) {}
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const idx = themeStates.indexOf(currentTheme);
      currentTheme = themeStates[(idx + 1) % themeStates.length];
      try {
        localStorage.setItem(THEME_KEY, currentTheme);
      } catch (_) {}
      applyTheme(currentTheme);
    });
  }

  // =========== INIT SIDEBAR ===========
  function initSidebar() {
    if (!window.LESSONS_DATA) return;
    lessonsNav.innerHTML = "";

    window.LESSONS_DATA.forEach((lesson, index) => {
      const btn = document.createElement("button");
      btn.className = "lesson-nav-btn";
      if (quizCompleted[lesson.id]) btn.classList.add("completed");
      btn.innerHTML = `<span class="num">${index + 1}</span><span class="lesson-label">${lesson.title}</span>`;
      btn.dataset.id = lesson.id;
      btn.dataset.searchText = (
        lesson.title +
        " " +
        lesson.description +
        " " +
        (lesson.concepts || []).map((c) => c.conceptName).join(" ")
      ).toLowerCase();

      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".lesson-nav-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        openLesson(lesson.id);
        sidebar.classList.remove("open");
      });

      lessonsNav.appendChild(btn);
    });

    // Update welcome stats
    const statLessons = document.getElementById("stat-lessons");
    const statConcepts = document.getElementById("stat-concepts");
    const statBank = document.getElementById("stat-bank");
    if (statLessons) statLessons.textContent = window.LESSONS_DATA.length;
    if (statConcepts) {
      const total = window.LESSONS_DATA.reduce(
        (sum, l) => sum + (l.concepts ? l.concepts.length : 0),
        0,
      );
      statConcepts.textContent = total;
    }
    if (statBank) {
      const bank = window.QUESTIONS_BANK || { mc: [], fill: [] };
      statBank.textContent = (bank.mc || []).length + (bank.fill || []).length;
    }

    // Onboarding tour visibility — hide if dismissed previously
    const tour = document.querySelector(".onboarding-tour");
    if (tour && localStorage.getItem("ob_tour_dismissed") === "1") {
      tour.style.display = "none";
    }

    updateProgress();
  }

  // =========== ONBOARDING TOUR ===========
  document.addEventListener("click", (e) => {
    const action = e.target?.dataset?.tourAction;
    if (!action) return;
    e.preventDefault();
    switch (action) {
      case "open-guide":
        document.getElementById("open-guide-btn")?.click();
        break;
      case "open-trainer":
        document.getElementById("open-trainer-btn")?.click();
        break;
      case "open-study":
        document.getElementById("open-study-btn")?.click();
        break;
      case "open-map":
        document.getElementById("open-map-btn")?.click();
        break;
      case "dismiss-tour":
        localStorage.setItem("ob_tour_dismissed", "1");
        const tourEl = document.querySelector(".onboarding-tour");
        if (tourEl) {
          tourEl.style.transition = "opacity 0.4s, transform 0.4s";
          tourEl.style.opacity = "0";
          tourEl.style.transform = "translateY(-12px)";
          setTimeout(() => {
            tourEl.style.display = "none";
            tourEl.style.opacity = "";
            tourEl.style.transform = "";
          }, 400);
        }
        break;
    }
  });

  // =========== SEARCH ===========
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      document.querySelectorAll(".lesson-nav-btn").forEach((btn) => {
        const text = btn.dataset.searchText || "";
        btn.style.display = !query || text.includes(query) ? "flex" : "none";
      });
    });
  }

  // =========== LEVEL TABS ===========
  levelTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      levelTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentLevel = tab.dataset.level;
      if (currentLessonId) renderContent();
    });
  });

  // =========== VIEW SWITCHING ===========
  function hideAllViews() {
    welcomeScreen.style.display = "none";
    activeLessonContainer.style.display = "none";
    if (knowledgeMapView) knowledgeMapView.style.display = "none";
    if (studyModeView) studyModeView.style.display = "none";
    if (trainerView) trainerView.style.display = "none";
    if (guideView) guideView.style.display = "none";
    const _anatomyView = document.getElementById("code-anatomy-view");
    if (_anatomyView) _anatomyView.style.display = "none";
    if (codeblocksView) codeblocksView.style.display = "none";
    if (traceView) traceView.style.display = "none";
    document
      .querySelectorAll(".top-tab")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".lesson-nav-btn")
      .forEach((b) => b.classList.remove("active"));
  }

  // Wire the "🏠 שיעורים" tab to bring user back to welcome / lessons home
  document.getElementById("open-home")?.addEventListener("click", () => {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "ברוכים הבאים לפורטל המומחים";
    currentLessonDesc.textContent =
      "בחרו שיעור מהתפריט כדי להתחיל ללמוד. כל מושג מוסבר ב-6 רמות שונות — מסבתא ועד פרופסור!";
    welcomeScreen.style.display = "flex";
    document.getElementById("open-home")?.classList.add("active");
    scrollToTop();
    sidebar.classList.remove("open");
  });

  function scrollToTop() {
    const c = document.getElementById("content-container");
    if (c) c.scrollTop = 0;
  }

  // =========== OPEN LESSON ===========
  function openLesson(lessonId) {
    currentLessonId = lessonId;
    const lesson = window.LESSONS_DATA.find((l) => l.id === lessonId);
    if (!lesson) return;

    hideAllViews();
    currentLessonTitle.textContent = lesson.title;
    currentLessonDesc.textContent = lesson.description;
    activeLessonContainer.style.display = "block";

    lessonBody.style.animation = "none";
    lessonBody.offsetHeight;
    lessonBody.style.animation = "fadeIn 0.4s ease";

    renderContent();
    renderQuiz();
    scrollToTop();
  }

  // =========== OPEN KNOWLEDGE MAP ===========
  function openKnowledgeMap() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🗺️ מפת ידע אישית";
    currentLessonDesc.textContent =
      "סמן V/X לכל מושג. בלחיצה על שם המושג תועבר לשיעור הרלוונטי.";
    knowledgeMapView.style.display = "block";
    openKnowledgeMapBtn?.classList.add("active");
    renderKnowledgeMap();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  // =========== OPEN STUDY MODE ===========
  function openStudyMode() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🎯 לימוד מותאם";
    currentLessonDesc.textContent =
      "המערכת תלמד אותך את החומר במושגים שסימנת כחלשים (X).";
    studyModeView.style.display = "block";
    openStudyModeBtn?.classList.add("active");
    // Lazy-load seeded bank (Study Mode also benefits)
    if (typeof window.ensureSeededBank === "function") {
      window.ensureSeededBank().then(() => startStudySession());
    } else {
      startStudySession();
    }
    scrollToTop();
    sidebar.classList.remove("open");
  }

  // =========== KNOWLEDGE MAP RENDER ===========
  let kmFilter = "all";
  let kmQuery = "";

  function renderKnowledgeMap() {
    const container = document.getElementById("km-lessons-container");
    if (!container || !window.LESSONS_DATA) return;

    // Update top stats — combines per-concept LEVEL (1..7) and mastery state.
    let masterCount = 0, weakCnt = 0, partialCnt = 0, pendingCnt = 0;
    let atRiskCnt = 0, dueCnt = 0;
    let levelSum = 0;
    allConcepts().forEach(({ lesson, concept }) => {
      const sc = getScore(lesson.id, concept.conceptName);
      levelSum += sc.level;
      if (sc.level >= 7) masterCount++;
      else if (sc.attempts === 0 && sc.level === 1) pendingCnt++;
      else if (sc.level <= 2) weakCnt++;
      else partialCnt++;
      if (getMasteryState(sc) === "at-risk") atRiskCnt++;
      if (sc.attempts > 0 && isSrsDue(sc)) dueCnt++;
    });
    const totalConcepts = masterCount + weakCnt + partialCnt + pendingCnt;
    const avgLvl = totalConcepts ? levelSum / totalConcepts : 1;
    document.getElementById("km-total").textContent = totalConcepts;
    document.getElementById("km-known").textContent = masterCount;
    document.getElementById("km-unknown").textContent = weakCnt;
    document.getElementById("km-pending").textContent = pendingCnt;
    const masteryPct = totalConcepts
      ? Math.round(((avgLvl - 1) / 6) * 100)
      : 0;
    document.getElementById("km-mastery-fill").style.width = masteryPct + "%";
    const dueSummary = dueCnt > 0 ? ` · 🔁 ${dueCnt} לחזרה` : "";
    const riskSummary = atRiskCnt > 0 ? ` · ⚠️ ${atRiskCnt} בסיכון` : "";
    document.getElementById("km-mastery-text").textContent =
      `רמת שליטה: ${masteryPct}% · רמה ממוצעת ${avgLvl.toFixed(2)}/7 (${masterCount} 🏆 · ${partialCnt} בתהליך · ${weakCnt} חלשים · ${pendingCnt} לא נבחנו)${riskSummary}${dueSummary}`;

    // Build groups
    const q = kmQuery.toLowerCase().trim();
    const MASTERY_LABEL = {
      new: "🆕 חדש",
      learning: "📘 בלימוד",
      review: "📗 בחזרה",
      "at-risk": "⚠️ בסיכון",
      mastered: "🏆 מאסטר",
    };
    const html = window.LESSONS_DATA
      .map((lesson) => {
        const concepts = (lesson.concepts || []).filter((c) => {
          const sc = getScore(lesson.id, c.conceptName);
          // Track A — A5: filter by mastery state (5 buckets) instead of raw level.
          // Legacy values are aliased to mastery states so the existing dropdown
          // entries keep working:
          //   known   → mastered
          //   unknown → learning ∪ at-risk
          //   pending → new
          // New additive values (injected at boot): learning, review,
          // at-risk, mastered, new, due.
          const state = getMasteryState(sc);
          switch (kmFilter) {
            case "all": break;
            case "known":
            case "mastered":
              if (state !== "mastered") return false;
              break;
            case "unknown":
              if (!(state === "learning" || state === "at-risk")) return false;
              break;
            case "pending":
            case "new":
              if (state !== "new") return false;
              break;
            case "learning":
            case "review":
            case "at-risk":
              if (state !== kmFilter) return false;
              break;
            case "due":
              if (!(sc.attempts > 0 && isSrsDue(sc))) return false;
              break;
            default: break;
          }
          if (q && !c.conceptName.toLowerCase().includes(q)) return false;
          return true;
        });
        if (concepts.length === 0) return "";

        const lessonScores = (lesson.concepts || []).map((c) =>
          getScore(lesson.id, c.conceptName),
        );
        const lessonMaster = lessonScores.filter((s) => s.level >= 7).length;
        const lessonWeak = lessonScores.filter((s) => s.level <= 2).length;
        const lessonTotal = (lesson.concepts || []).length;
        const lessonAvg = lessonTotal
          ? lessonScores.reduce((s, e) => s + e.level, 0) / lessonTotal
          : 1;
        const lessonPct = Math.round(((lessonAvg - 1) / 6) * 100);

        const rows = concepts
          .map((c) => {
            const sc = getScore(lesson.id, c.conceptName);
            const lvl = LEVEL_INFO[sc.level];
            const state = getMasteryState(sc);
            const due = isSrsDue(sc) && state !== "new";
            const rowCls = [
              sc.level >= 7 ? "is-known" : sc.level <= 2 ? "is-unknown" : "",
              due ? "is-due" : "",
            ]
              .filter(Boolean)
              .join(" ");
            const stages =
              sc.level < 7
                ? `<span class="km-stages" title="שלבים שנדרשים לקידום">${sc.passedMC ? "🅰️✅" : "🅰️◯"}${needsCodeFill(c) ? (sc.passedFill ? " ✍️✅" : " ✍️◯") : ""}</span>`
                : "";
            const bank = bankCountsFor(lesson.id, c.conceptName);
            const bankBadges = `
              <span class="km-bank-counters" title="מספר השאלות במאגר עבור המושג">
                <span class="km-bank-counter ${bank.mc > 0 ? "has" : ""}">🅰️ ${bank.mc}</span>
                <span class="km-bank-counter ${bank.fill > 0 ? "has" : ""}">✍️ ${bank.fill}</span>
              </span>`;
            const masteryBadge = `<span class="km-mastery-badge km-mastery-${state}" title="מצב שליטה">${MASTERY_LABEL[state] || state}</span>`;
            const dueBadge = due
              ? `<span class="km-due-badge" title="חזרה לפי SRS — הגיע מועד">🔁 חזרה מומלצת</span>`
              : "";
            return `
              <div class="km-concept-row ${rowCls}" data-lesson="${esc(lesson.id)}" data-concept="${esc(c.conceptName)}">
                <div class="km-concept-name" title="פתח את המושג בשיעור">${esc(c.conceptName)}</div>
                ${masteryBadge}
                ${dueBadge}
                ${bankBadges}
                ${stages}
                <span class="km-status km-level ${lvl.cssClass}" title="רמה נעולה — מתעדכנת על ידי המאמן 🔒">${lvl.icon} ${sc.level}/7 ${esc(lvl.label)}</span>
              </div>`;
          })
          .join("");

        return `
          <div class="km-lesson-group">
            <div class="km-lesson-header">
              <h4>${esc(lesson.title)}</h4>
              <div class="km-lesson-meta">
                <span class="pill v">🏆 ${lessonMaster}</span>
                <span class="pill x">⚠️ ${lessonWeak}</span>
                <span class="pill">${lessonMaster}/${lessonTotal}</span>
                <div class="km-lesson-mini-bar"><div class="km-lesson-mini-fill" style="width:${lessonPct}%"></div></div>
              </div>
            </div>
            <div class="km-concepts-grid">${rows}</div>
          </div>`;
      })
      .join("");

    container.innerHTML =
      html ||
      `<div class="study-empty"><div class="big-icon">🔍</div><p>לא נמצאו מושגים שתואמים לסינון.</p></div>`;

    // Concept-name click → open lesson (toggle handlers removed; statuses are locked)
    container.querySelectorAll(".km-concept-row").forEach((row) => {
      const lessonId = row.dataset.lesson;
      const conceptName = row.dataset.concept;

      row.querySelector(".km-concept-name")?.addEventListener("click", () => {
        openLesson(lessonId);
        // Scroll to concept after a short delay
        setTimeout(() => {
          const cards = document.querySelectorAll(".concept-card h4");
          for (const h of cards) {
            if (h.textContent.trim() === conceptName) {
              h.closest(".concept-card").scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              h.closest(".concept-card").style.outline =
                "2px solid var(--accent)";
              setTimeout(() => {
                h.closest(".concept-card").style.outline = "";
              }, 2200);
              break;
            }
          }
        }, 250);
      });
    });
  }

  // KM toolbar wiring
  document.getElementById("km-search")?.addEventListener("input", (e) => {
    kmQuery = e.target.value;
    renderKnowledgeMap();
  });
  document.getElementById("km-filter")?.addEventListener("change", (e) => {
    kmFilter = e.target.value;
    renderKnowledgeMap();
  });
  document.getElementById("km-go-trainer")?.addEventListener("click", () => {
    openTrainer();
  });
  document.getElementById("km-reset")?.addEventListener("click", () => {
    if (!confirm("איפוס מלא של מפת הידע: ימחק את כל הציונים והסטטוסים. להמשיך?"))
      return;
    proficiency = {};
    scores = {};
    saveProficiency();
    saveScores();
    renderKnowledgeMap();
  });

  // =========== STUDY MODE ENGINE ===========
  let studyQueue = [];
  let studyIndex = 0;
  let studyLevel = "junior";

  function startStudySession() {
    // Build queue: all concepts marked X (with simple shuffle for variety)
    studyQueue = allConcepts().filter(
      ({ lesson, concept }) =>
        getProficiency(lesson.id, concept.conceptName) === "x",
    );
    // Shuffle (seeded PRNG via lib/rng.js)
    studyQueue = window.RNG.shuffle(studyQueue);
    studyIndex = 0;
    renderStudyCard();
  }

  function renderStudyCard() {
    const container = document.getElementById("study-card-container");
    const subtitle = document.getElementById("study-subtitle");
    const progressText = document.getElementById("study-progress-text");
    const progressFill = document.getElementById("study-progress-fill");

    if (!container) return;

    if (studyQueue.length === 0) {
      const counts = profCounts();
      subtitle.textContent =
        counts.x === 0
          ? "מצוין! לא סימנת אף מושג כחלש."
          : "אין מושגים פעילים — סיימת את כל החולשות!";
      progressText.textContent = "0 / 0";
      progressFill.style.width = "0%";
      container.innerHTML = `
        <div class="study-empty">
          <div class="big-icon">${counts.x === 0 ? "🌟" : "🏁"}</div>
          <h3 style="color: var(--text-bright); margin-bottom:0.5rem;">
            ${counts.x === 0 ? "אין מושגים שסימנת כחלשים" : "סיימת את כל המושגים החלשים!"}
          </h3>
          <p>פתח את <strong>מפת הידע</strong> וסמן את המושגים שאתה מרגיש חלש בהם ב-X — והמערכת תבנה לך תוכנית לימוד אישית.</p>
          <button class="study-btn primary" id="study-go-map" style="margin-top:1.5rem;">🗺️ פתח מפת ידע</button>
        </div>`;
      document
        .getElementById("study-go-map")
        ?.addEventListener("click", openKnowledgeMap);
      return;
    }

    // End of queue
    if (studyIndex >= studyQueue.length) {
      progressText.textContent = `${studyQueue.length} / ${studyQueue.length}`;
      progressFill.style.width = "100%";
      subtitle.textContent = "סיבוב הושלם 💪";
      container.innerHTML = `
        <div class="study-empty">
          <div class="big-icon">🎉</div>
          <h3 style="color: var(--text-bright); margin-bottom:0.5rem;">סיימת סיבוב לימוד!</h3>
          <p>עברת על ${studyQueue.length} מושגים. אם נשארו לך מושגים מסומנים כ-X — לחץ למטה לסיבוב נוסף.</p>
          <div class="study-actions" style="justify-content:center;">
            <button class="study-btn primary" id="study-restart">🔄 התחל סיבוב חדש</button>
            <button class="study-btn open-lesson" id="study-back-map">🗺️ חזרה למפת ידע</button>
          </div>
        </div>`;
      document
        .getElementById("study-restart")
        ?.addEventListener("click", startStudySession);
      document
        .getElementById("study-back-map")
        ?.addEventListener("click", openKnowledgeMap);
      return;
    }

    const { lesson, concept } = studyQueue[studyIndex];
    const total = studyQueue.length;
    progressText.textContent = `${studyIndex + 1} / ${total}`;
    progressFill.style.width = `${((studyIndex) / total) * 100}%`;
    subtitle.textContent = `מושג ${studyIndex + 1} מתוך ${total} — סמן "השתפרתי" כשאתה מרגיש שהבנת.`;

    const levels = [
      { key: "grandma", label: "👵 סבתא" },
      { key: "child", label: "🧒 ילד" },
      { key: "soldier", label: "🪖 חייל" },
      { key: "student", label: "🎓 סטודנט" },
      { key: "junior", label: "💻 ג'וניור" },
      { key: "professor", label: "🔬 פרופ׳" },
    ];

    const explanationText =
      (concept.levels && concept.levels[studyLevel]) ||
      (concept.levels && concept.levels.junior) ||
      "";

    container.innerHTML = `
      <div class="study-card">
        <div class="lesson-context">📚 ${esc(lesson.title)}</div>
        <h3>${esc(concept.conceptName)}</h3>
        <div class="study-levels-mini">
          ${levels
            .map(
              (l) =>
                `<button data-level="${l.key}" class="${l.key === studyLevel ? "active" : ""}">${l.label}</button>`,
            )
            .join("")}
        </div>
        <div class="study-explanation">${esc(explanationText)}</div>
        ${(() => {
          // Show analogy for the currently-selected explanation level
          const lvIdx = LEVEL_KEYS.indexOf(studyLevel);
          return lvIdx >= 0 ? renderAnalogyForLevel(concept, lvIdx) : "";
        })()}
        ${
          concept.codeExample
            ? `
        <div class="code-box">
          <div class="code-toolbar">
            <button class="code-tool-btn" data-study-action="toggle-comments" title="הוסף הערות בעברית לכל שורה">💬 הערות בעברית</button>
          </div>
          <pre data-code-original="${esc(concept.codeExample)}"><code>${esc(concept.codeExample)}</code></pre>
          ${concept.codeExplanation ? `<div class="code-explanation"><strong>💡 פינת הקוד:</strong> ${esc(concept.codeExplanation)}</div>` : ""}
        </div>`
            : ""
        }
        ${renderDeepDivePanel(concept)}
        ${renderExtendedExplanationPanel(concept)}
        <div class="study-actions">
          <button class="study-btn primary" id="study-mastered">✅ הבנתי — סמן כבקיא ועבור הלאה</button>
          <button class="study-btn still-weak" id="study-still-weak">↻ עדיין חלש — חזור על זה אחר כך</button>
          <button class="study-btn skip" id="study-skip">⏭️ דלג</button>
          <button class="study-btn open-lesson" id="study-open-lesson">📖 פתח את השיעור המלא</button>
        </div>
      </div>`;

    container.querySelectorAll(".study-levels-mini button").forEach((b) => {
      b.addEventListener("click", () => {
        studyLevel = b.dataset.level;
        renderStudyCard();
      });
    });

    // Hebrew comments toggle in study card
    container.querySelector('[data-study-action="toggle-comments"]')?.addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const pre = container.querySelector(".code-box pre");
      if (!pre) return;
      const code = pre.querySelector("code");
      const original = pre.dataset.codeOriginal || "";
      if (btn.classList.contains("active")) {
        code.textContent = original;
        btn.classList.remove("active");
        btn.textContent = "💬 הערות בעברית";
      } else {
        code.textContent = annotateCodeHebrew(original);
        btn.classList.add("active");
        btn.textContent = "🔙 הסר הערות";
      }
    });

    document.getElementById("study-mastered")?.addEventListener("click", () => {
      setProficiency(lesson.id, concept.conceptName, "v");
      studyIndex++;
      renderStudyCard();
    });
    document.getElementById("study-still-weak")?.addEventListener("click", () => {
      // Push to end of queue, keep marked X
      studyQueue.push(studyQueue[studyIndex]);
      studyIndex++;
      renderStudyCard();
    });
    document.getElementById("study-skip")?.addEventListener("click", () => {
      studyIndex++;
      renderStudyCard();
    });
    document.getElementById("study-open-lesson")?.addEventListener("click", () => {
      openLesson(lesson.id);
      setTimeout(() => {
        const cards = document.querySelectorAll(".concept-card h4");
        for (const h of cards) {
          if (h.textContent.trim() === concept.conceptName) {
            h.closest(".concept-card").scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            break;
          }
        }
      }, 250);
    });
  }

  // =========== TRAINER ENGINE (Level 1-7 per concept) ===========
  // Level 1 = no answer yet (default)
  // Level 2 = passed grandma   | Level 3 = passed child    | Level 4 = passed soldier
  // Level 5 = passed student   | Level 6 = passed junior   | Level 7 = passed professor (mastered)
  // To advance one level: must pass BOTH the multiple-choice AND the code-fill at the CURRENT level.
  const SCORE_STORAGE_KEY = "lumenportal:scores:v1";
  // scores[conceptKey] = { level, passedMC, passedFill, attempts, correct }
  let scores = {};
  try {
    scores = JSON.parse(localStorage.getItem(SCORE_STORAGE_KEY) || "{}");
  } catch (_) { scores = {}; }

  function saveScores() {
    try { localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores)); } catch (_) {}
  }

  // Migrate older v1 records (which used {score, attempts, correct})
  (function migrateScores() {
    let touched = false;
    Object.keys(scores).forEach((k) => {
      const s = scores[k];
      if (s && s.level === undefined) {
        const oldScore = s.score || 0;
        let lvl;
        if (oldScore >= 3) lvl = 7;
        else if (oldScore > 0) lvl = Math.min(6, 1 + oldScore);
        else lvl = 1;
        scores[k] = {
          level: lvl,
          passedMC: false,
          passedFill: false,
          attempts: s.attempts || 0,
          correct: s.correct || 0,
        };
        touched = true;
      }
    });
    if (touched) saveScores();
  })();

  // Level → concept-explanation key mapping (matches lesson.concepts[i].levels keys)
  const LEVEL_KEYS = [null, "grandma", "child", "soldier", "student", "junior", "professor"];
  const LEVEL_INFO = {
    1: { icon: "👵", label: "סבתא", cssClass: "lvl-1" },
    2: { icon: "🧒", label: "כיתה א'", cssClass: "lvl-2" },
    3: { icon: "🪖", label: "חייל", cssClass: "lvl-3" },
    4: { icon: "🎓", label: "סטודנט", cssClass: "lvl-4" },
    5: { icon: "💻", label: "ג'וניור", cssClass: "lvl-5" },
    6: { icon: "🔬", label: "פרופ׳", cssClass: "lvl-6" },
    7: { icon: "🏆", label: "מאסטר", cssClass: "lvl-7" },
  };

  function getScore(lessonId, conceptName) {
    const k = conceptKey(lessonId, conceptName);
    return (
      scores[k] || {
        level: 1,
        passedMC: false,
        passedFill: false,
        attempts: 0,
        correct: 0,
        markedKnown: false,
        weakReports: 0,
        correctRunCount: 0,
      }
    );
  }

  function defaultSrsState() {
    if (window.SRS && typeof window.SRS.createState === "function") {
      return window.SRS.createState();
    }
    // Conservative fallback if lib/srs.js failed to load.
    return {
      ease: 2.5,
      interval: 0,
      due: Date.now(),
      repetitions: 0,
      lapses: 0,
      lastReviewed: null,
    };
  }

  function ensureScore(lessonId, conceptName) {
    const k = conceptKey(lessonId, conceptName);
    if (!scores[k]) {
      scores[k] = {
        level: 1, passedMC: false, passedFill: false, attempts: 0, correct: 0,
        markedKnown: false, weakReports: 0, correctRunCount: 0,
        srsState: defaultSrsState(),
      };
    } else {
      // Lazy migration — fill new fields on existing records
      if (scores[k].markedKnown === undefined) scores[k].markedKnown = false;
      if (scores[k].weakReports === undefined) scores[k].weakReports = 0;
      if (scores[k].correctRunCount === undefined) scores[k].correctRunCount = 0;
      if (!scores[k].srsState || typeof scores[k].srsState !== "object") {
        scores[k].srsState = defaultSrsState();
      }
    }
    return scores[k];
  }

  // One-time migration pass: every score that pre-existed before SRS landed
  // gets a default srsState so weightFor / KM badge logic can rely on it.
  (function migrateSrsState() {
    let touched = false;
    Object.keys(scores).forEach((k) => {
      const s = scores[k];
      if (s && (!s.srsState || typeof s.srsState !== "object")) {
        s.srsState = defaultSrsState();
        touched = true;
      }
    });
    if (touched) saveScores();
  })();

  // Mastery states (Track A — A5). Five buckets used by the Knowledge Map
  // filter and by the per-concept badge.
  //   new       — never attempted
  //   learning  — still in early levels (≤3)
  //   review    — progressing (4–6)
  //   at-risk   — high level but SRS overdue → forgetting
  //   mastered  — reached level 7
  function getMasteryState(sc) {
    if (!sc || sc.attempts === 0) return "new";
    if (sc.level >= 7) return "mastered";
    const due = sc.srsState && sc.srsState.due;
    if (typeof due === "number" && due <= Date.now() && sc.level >= 6) {
      return "at-risk";
    }
    if (sc.level <= 3) return "learning";
    return "review";
  }

  function isSrsDue(sc) {
    if (!sc || !sc.srsState || typeof sc.srsState.due !== "number") return false;
    return sc.srsState.due <= Date.now();
  }

  // === Difficulty-aware helpers ===
  // Each concept may declare `difficulty: 1..10`. Defaults to 5 (medium).
  function getDifficulty(concept) {
    const d = concept && concept.difficulty;
    if (typeof d === "number" && d >= 1 && d <= 10) return d;
    return 5;
  }

  // How many consecutive correct answers are needed before the user may mark V (mark-as-known).
  // Difficulty 1-2 → 1 correct. 3-4 → 2. 5-6 → 3. 7 → 5. 8+ → never (must master via 7 levels).
  function correctNeededForV(difficulty) {
    if (difficulty >= 8) return Infinity;
    if (difficulty <= 2) return 1;
    if (difficulty <= 4) return 2;
    if (difficulty <= 6) return 3;
    return 5; // difficulty 7
  }

  function canMarkV(lessonId, conceptName, concept) {
    const sc = getScore(lessonId, conceptName);
    if (sc.markedKnown) return false;
    if (sc.level >= 7) return false; // already mastered, no need
    const need = correctNeededForV(getDifficulty(concept));
    if (!isFinite(need)) return false; // hard concepts cannot be V'd
    return sc.correctRunCount >= need;
  }

  function markAsKnown(lessonId, conceptName) {
    const sc = ensureScore(lessonId, conceptName);
    sc.markedKnown = true;
    sc.level = 7; // mastered via shortcut
    saveScores();
  }

  function reportWeak(lessonId, conceptName) {
    const sc = ensureScore(lessonId, conceptName);
    sc.weakReports = (sc.weakReports || 0) + 1;
    sc.correctRunCount = 0; // reset V progress on weak-report
    // Track A — A4: a weak-report is semantically "I forgot this". Push it
    // into SRS as a lapse so the trainer surfaces it again sooner.
    try {
      if (window.SRS && typeof window.SRS.update === "function") {
        const ref = findConceptByKey(conceptKey(lessonId, conceptName));
        const diff = ref ? getDifficulty(ref.concept) : 5;
        window.SRS.update(sc.srsState, false, diff);
      }
    } catch (_) {}
    saveScores();
  }

  // Concept needs a code-fill stage only if it has a codeExample
  function needsCodeFill(concept) {
    return !!concept.codeExample;
  }

  // Returns "mc" or "fill" — which question type the concept needs at its current level
  function nextNeedFor(concept, sc) {
    if (sc.level >= 7) return null;
    if (!sc.passedMC) return "mc";
    if (needsCodeFill(concept) && !sc.passedFill) return "fill";
    return null; // ready to advance — handled in applyAnswer
  }

  // Apply a correct/wrong answer for the given kind ("mc" | "fill") at the concept's current level.
  // Returns { advanced: bool, newLevel: int } so UI can celebrate.
  function applyAnswer(lessonId, conceptName, concept, kind, correct) {
    const sc = ensureScore(lessonId, conceptName);
    sc.attempts++;
    if (correct) {
      sc.correct++;
      sc.correctRunCount = (sc.correctRunCount || 0) + 1;
    } else {
      sc.correctRunCount = 0; // reset V-progress on any wrong answer
    }

    if (sc.level >= 7) {
      // Already mastered — keep stats only
      saveScores();
      return { advanced: false, newLevel: 7 };
    }

    if (correct) {
      if (kind === "mc") sc.passedMC = true;
      else if (kind === "fill") sc.passedFill = true;

      // Advance if both stages cleared (or only MC if no codeExample)
      const fillReq = needsCodeFill(concept);
      if (sc.passedMC && (!fillReq || sc.passedFill)) {
        sc.level = Math.min(7, sc.level + 1);
        sc.passedMC = false;
        sc.passedFill = false;
        saveScores();
        return { advanced: true, newLevel: sc.level };
      }
    }
    // Wrong answers don't demote level or remove existing passes — they only deny progress.
    saveScores();
    return { advanced: false, newLevel: sc.level };
  }

  // Trainer state
  let trainerMode = "adaptive"; // "adaptive" | "weak" | "mixed"
  let trainerCurrent = null; // { lesson, concept, question }
  let trainerStats = { asked: 0, correct: 0, wrong: 0 };
  let trainerLastAnswered = false;
  // Code-trace per-question state: tracks progress through steps[].
  let traceState = null; // { stepIdx, attempts, hintShown }

  // Normalize an answer for forgiving comparison (trim, lowercase, collapse whitespace).
  function normalizeAnswer(s) {
    return String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
  }
  function isTraceAnswerCorrect(userInput, step) {
    const u = normalizeAnswer(userInput);
    if (!u) return false;
    const correct = [step.answer, ...(step.acceptable || [])]
      .filter(Boolean)
      .map(normalizeAnswer);
    return correct.includes(u);
  }

  // Pick a curated trace question for a concept, if any exist.
  function pickTraceForConcept(conceptKey) {
    const pool = (window.QUESTIONS_BANK && window.QUESTIONS_BANK.trace) || [];
    const candidates = pool.filter((t) => t.conceptKey === conceptKey);
    if (!candidates.length) return null;
    return candidates[window.RNG.int(candidates.length)];
  }

  // Concepts that have an explanation (junior or student)
  function trainableConcepts() {
    return allConcepts().filter(({ concept }) => {
      const lv = concept.levels || {};
      return !!(lv.junior || lv.student || lv.professor || lv.grandma);
    });
  }

  function bestExplanation(concept) {
    const lv = concept.levels || {};
    return lv.junior || lv.student || lv.professor || lv.soldier || lv.child || lv.grandma || "";
  }

  // =========== HEBREW CODE ANNOTATOR ===========
  // Mapping: detect common JS / React / Node / Mongo patterns and produce a
  // short Hebrew explanation appended as a comment at the END of the line.
  // The annotator is intentionally conservative: only patterns we KNOW are added.
  const HEB_PATTERNS = [
    // --- React Hooks ---
    { re: /\buseState\s*\(/, hint: "useState — Hook לניהול state פנימי בקומפוננטה" },
    { re: /\buseEffect\s*\(/, hint: "useEffect — מריץ קוד אחרי רינדור (תופעות לוואי)" },
    { re: /\buseRef\s*\(/, hint: "useRef — שומר ערך שלא גורם לרינדור מחדש כשמשתנה" },
    { re: /\buseMemo\s*\(/, hint: "useMemo — מטמון לערך שמחושב יקר" },
    { re: /\buseCallback\s*\(/, hint: "useCallback — מטמון לפונקציה (שומר זהות בין רינדורים)" },
    { re: /\buseContext\s*\(/, hint: "useContext — קורא ערך מ-Context Provider בעץ הקומפוננטות" },
    { re: /\buseReducer\s*\(/, hint: "useReducer — חלופה ל-useState לניהול state מורכב עם פעולות" },
    { re: /\buseParams\s*\(/, hint: "useParams — שולף פרמטרים דינמיים מה-URL (Router)" },
    { re: /\buseNavigate\s*\(/, hint: "useNavigate — מאפשר ניווט פרוגרמטי בין מסכים" },
    { re: /\bcreateContext\s*\(/, hint: "createContext — יוצר ערוץ נתונים ש-Provider יזרים אליו" },

    // --- React core ---
    { re: /<\w+(\s|\/|>)/, hint: "JSX — תחביר שמשלב HTML בתוך JS, מתורגם ל-React.createElement" },
    { re: /\bclassName\s*=/, hint: "className — תחליף ל-class ב-JSX (כי class שמורה ב-JS)" },
    { re: /\bprops\b/, hint: "props — נתונים שעוברים מהקומפוננטה האב לבן" },
    { re: /<[A-Z]\w+\.Provider/, hint: "Provider — עוטף את העץ ומספק ערך לכל הצאצאים" },
    { re: /\bReact\.memo\s*\(/, hint: "React.memo — ממנע רינדור מחדש אם ה-props לא השתנו" },

    // --- Array methods ---
    { re: /\.map\s*\(/, hint: "map — יוצר מערך חדש בעקבות טרנספורמציה לכל איבר" },
    { re: /\.filter\s*\(/, hint: "filter — מערך חדש רק עם איברים שעוברים תנאי" },
    { re: /\.reduce\s*\(/, hint: "reduce — מצמצם מערך לערך בודד (סכום, אובייקט וכו')" },
    { re: /\.forEach\s*\(/, hint: "forEach — מבצע פעולה לכל איבר (לא מחזיר ערך)" },
    { re: /\.find\s*\(/, hint: "find — מחזיר את האיבר הראשון שעובר תנאי, או undefined" },
    { re: /\.some\s*\(/, hint: "some — true אם לפחות איבר אחד עובר תנאי" },
    { re: /\.every\s*\(/, hint: "every — true רק אם כל האיברים עוברים תנאי" },
    { re: /\.includes\s*\(/, hint: "includes — בודק אם ערך קיים במערך/מחרוזת" },
    { re: /\.push\s*\(/, hint: "push — מוסיף איבר בסוף המערך (משנה את המערך המקורי!)" },
    { re: /\.pop\s*\(/, hint: "pop — מסיר ומחזיר את האיבר האחרון" },
    { re: /\.shift\s*\(/, hint: "shift — מסיר ומחזיר את האיבר הראשון" },
    { re: /\.unshift\s*\(/, hint: "unshift — מוסיף איבר בתחילת המערך" },
    { re: /\.splice\s*\(/, hint: "splice — מוסיף/מסיר איברים באמצע המערך (משנה אותו!)" },
    { re: /\.slice\s*\(/, hint: "slice — מחזיר חלק מהמערך כעותק חדש (לא משנה את המקור)" },
    { re: /\.sort\s*\(/, hint: "sort — ממיין את המערך במקום (כברירת מחדל לפי אלפבית!)" },
    { re: /\.concat\s*\(/, hint: "concat — מאחד מערכים למערך חדש" },
    { re: /\.join\s*\(/, hint: "join — הופך מערך למחרוזת עם מפריד" },
    { re: /\.split\s*\(/, hint: "split — הופך מחרוזת למערך לפי מפריד" },

    // --- Async / Promise / Fetch ---
    { re: /\basync\s+function|\basync\s*\(/, hint: "async — מסמן פונקציה אסינכרונית, מחזירה Promise" },
    { re: /\bawait\b/, hint: "await — מחכה לפתרון של Promise בלי לחסום את הדפדפן" },
    { re: /\bnew\s+Promise\s*\(/, hint: "Promise — אובייקט שמייצג ערך עתידי (pending/fulfilled/rejected)" },
    { re: /\.then\s*\(/, hint: "then — רושם callback להפעלה כשה-Promise נפתר בהצלחה" },
    { re: /\.catch\s*\(/, hint: "catch — תופס שגיאה מ-Promise שנדחה" },
    { re: /\.finally\s*\(/, hint: "finally — רץ תמיד, גם אם הצליח וגם אם נכשל" },
    { re: /\bfetch\s*\(/, hint: "fetch — שולח בקשת HTTP, מחזיר Promise של Response" },
    { re: /\bres\.json\s*\(/, hint: "res.json() — מפענח גוף-תגובה כ-JSON" },
    { re: /\.resolve\s*\(/, hint: "resolve — פותר Promise בהצלחה עם ערך" },
    { re: /\.reject\s*\(/, hint: "reject — דוחה Promise עם שגיאה" },

    // --- Variables / declarations ---
    { re: /^\s*const\s+\w+\s*=/, hint: "const — קבוע (לא ניתן להציב ערך חדש למשתנה)" },
    { re: /^\s*let\s+\w+\s*=/, hint: "let — משתנה שניתן להציב לו ערך חדש (block-scoped)" },
    { re: /^\s*var\s+\w+\s*=/, hint: "var — הצהרת משתנה ישנה (function-scoped, עדיף let/const)" },
    { re: /=>\s*[{(]/, hint: "Arrow function — פונקציה קצרה, ללא binding משלה ל-this" },
    { re: /\bfunction\s+\w+\s*\(/, hint: "function — הצהרת פונקציה רגילה (hoisted, עם this משלה)" },
    { re: /\bclass\s+\w+/, hint: "class — סוכר תחבירי על prototype, מבנה לאובייקטים" },
    { re: /\bextends\s+\w+/, hint: "extends — ירושה: המחלקה הזו יורשת ממחלקה אחרת" },
    { re: /\bsuper\s*\(/, hint: "super — קורא ל-constructor של מחלקת-העל" },
    { re: /\bnew\s+\w+\s*\(/, hint: "new — יוצר מופע חדש של מחלקה (קורא ל-constructor)" },

    // --- Spread / destructuring ---
    { re: /\.\.\.\w+/, hint: "spread — פורש איברים של מערך/אובייקט (חיוני ל-immutability)" },
    { re: /\bconst\s*\{\s*\w+/, hint: "destructuring — שולף מאפיינים מאובייקט למשתנים נפרדים" },
    { re: /\bconst\s*\[\s*\w+/, hint: "destructuring — שולף איברי מערך למשתנים נפרדים" },

    // --- Modules ---
    { re: /^\s*import\s+/, hint: "import — מייבא קוד ממודול אחר" },
    { re: /^\s*export\s+default/, hint: "export default — ייצוא ראשי של המודול (אחד למודול)" },
    { re: /^\s*export\s+/, hint: "export — ייצוא בעל-שם (אפשר כמה במודול)" },
    { re: /\brequire\s*\(/, hint: "require — ייבוא בסגנון CommonJS (Node.js)" },
    { re: /\bmodule\.exports\s*=/, hint: "module.exports — מייצא ערך מהמודול (CommonJS)" },

    // --- Express / Server ---
    { re: /\bexpress\s*\(\s*\)/, hint: "express() — יוצר אפליקציית Express" },
    { re: /\bapp\.get\s*\(/, hint: "GET endpoint — קריאת מידע (Read)" },
    { re: /\bapp\.post\s*\(/, hint: "POST endpoint — יצירת משאב חדש (Create)" },
    { re: /\bapp\.put\s*\(/, hint: "PUT endpoint — עדכון מלא של משאב (Update)" },
    { re: /\bapp\.delete\s*\(/, hint: "DELETE endpoint — מחיקת משאב (Delete)" },
    { re: /\bapp\.use\s*\(/, hint: "use() — רישום middleware שרץ לכל בקשה" },
    { re: /\bres\.send\s*\(/, hint: "res.send — שולח תגובה ללקוח" },
    { re: /\bres\.json\s*\(/, hint: "res.json — שולח JSON ללקוח" },
    { re: /\bres\.status\s*\(/, hint: "res.status — מגדיר HTTP status code (200/201/404/500...)" },
    { re: /\breq\.body\b/, hint: "req.body — גוף הבקשה (JSON שנשלח מהלקוח)" },
    { re: /\breq\.params\b/, hint: "req.params — פרמטרים דינמיים מה-URL (כמו :id)" },
    { re: /\breq\.query\b/, hint: "req.query — פרמטרי query string (?key=val)" },
    { re: /\bnext\s*\(\s*\)/, hint: "next() — מעביר את הבקשה ל-middleware הבא" },

    // --- Mongoose / DB ---
    { re: /\bmongoose\.Schema\b|new\s+mongoose\.Schema/, hint: "Schema — מגדיר את מבנה המסמך ב-Mongo" },
    { re: /\bmongoose\.model\b/, hint: "model — יוצר מודל מ-Schema, ממנו עושים פעולות DB" },
    { re: /\bmongoose\.connect\b/, hint: "connect — מתחבר ל-MongoDB (ב-startup של השרת)" },
    { re: /\.find\s*\(\s*\{/, hint: "find — שולף מסמכים לפי תנאי (מחזיר מערך)" },
    { re: /\.findOne\s*\(/, hint: "findOne — שולף מסמך אחד שתואם, או null" },
    { re: /\.findById\s*\(/, hint: "findById — שולף מסמך לפי _id" },
    { re: /\.create\s*\(/, hint: "create — יוצר ושומר מסמך חדש" },
    { re: /\.save\s*\(\s*\)/, hint: "save — שומר את המסמך ל-DB (insert/update)" },

    // --- DOM ---
    { re: /\bdocument\.getElementById\b/, hint: "getElementById — שולף אלמנט לפי id (ראשון בלבד)" },
    { re: /\bdocument\.querySelector\b/, hint: "querySelector — שולף אלמנט לפי CSS selector (הראשון)" },
    { re: /\bdocument\.querySelectorAll\b/, hint: "querySelectorAll — מחזיר NodeList של כל ההתאמות" },
    { re: /\bdocument\.createElement\b/, hint: "createElement — יוצר אלמנט HTML חדש בזיכרון" },
    { re: /\baddEventListener\b/, hint: "addEventListener — מאזין לאירוע (click/input/submit...)" },
    { re: /\.appendChild\b/, hint: "appendChild — מוסיף אלמנט-בן ל-DOM" },
    { re: /\.innerHTML\s*=/, hint: "innerHTML — מחליף את כל ה-HTML הפנימי (זהירות מ-XSS!)" },
    { re: /\.textContent\s*=/, hint: "textContent — מחליף את הטקסט הפנימי (בטוח מ-XSS)" },
    { re: /\.classList\.add|\.classList\.remove|\.classList\.toggle/, hint: "classList — שולט במחלקות CSS של האלמנט" },
    { re: /\blocalStorage\.setItem\b/, hint: "localStorage — שומר נתונים לאחסון מתמשך בדפדפן" },
    { re: /\blocalStorage\.getItem\b/, hint: "localStorage.getItem — קורא מאחסון מתמשך (מחרוזת או null)" },
    { re: /\bJSON\.stringify\b/, hint: "JSON.stringify — הופך ערך JS למחרוזת JSON (לאחסון/שליחה)" },
    { re: /\bJSON\.parse\b/, hint: "JSON.parse — הופך מחרוזת JSON חזרה לערך JS" },

    // --- Errors / Control flow ---
    { re: /^\s*try\s*\{/, hint: "try — מנסה להריץ קוד שעלול לזרוק שגיאה" },
    { re: /\bcatch\s*\(/, hint: "catch — תופס שגיאה ומאפשר טיפול ידידותי" },
    { re: /^\s*finally\s*\{/, hint: "finally — רץ תמיד (גם אחרי throw/return)" },
    { re: /^\s*throw\s+/, hint: "throw — זורק שגיאה (מפסיק את הביצוע עד try/catch)" },
    { re: /^\s*if\s*\(/, hint: "if — תנאי: מריץ את הבלוק רק אם הביטוי אמיתי" },
    { re: /^\s*else\b/, hint: "else — מבוצע אם ה-if לא התקיים" },
    { re: /^\s*for\s*\(/, hint: "for — לולאה (אתחול; תנאי; קידום)" },
    { re: /^\s*while\s*\(/, hint: "while — לולאה כל עוד התנאי אמיתי" },
    { re: /^\s*return\s+/, hint: "return — מחזיר ערך מהפונקציה ויוצא ממנה" },

    // --- TypeScript ---
    { re: /:\s*string\b/, hint: ": string — טיפוס מחרוזת (TypeScript)" },
    { re: /:\s*number\b/, hint: ": number — טיפוס מספר (TypeScript)" },
    { re: /:\s*boolean\b/, hint: ": boolean — טיפוס בוליאני (TypeScript)" },
    { re: /:\s*\w+\[\]/, hint: "[] — טיפוס מערך של (TypeScript)" },
    { re: /^\s*interface\s+\w+/, hint: "interface — חתימה של אובייקט/מחלקה (TypeScript)" },
    { re: /^\s*type\s+\w+\s*=/, hint: "type — alias לטיפוס (TypeScript)" },
    { re: /\?\s*:/, hint: "? — שדה אופציונלי (TypeScript)" },

    // --- Console ---
    { re: /\bconsole\.log\b/, hint: "console.log — הדפסה לקונסול (לדיבוג)" },
    { re: /\bconsole\.error\b/, hint: "console.error — הדפסת שגיאה (אדומה בקונסול)" },
  ];

  // Apply Hebrew comments line-by-line. Returns the original code with `// הערה`
  // appended at the end of each line that matches a known pattern.
  function annotateCodeHebrew(code) {
    if (!code) return "";
    const lines = code.split("\n");
    return lines
      .map((line) => {
        // Skip if line already has a comment, is empty, or is just braces
        if (!line.trim() || /^\s*\/\//.test(line) || /^\s*[{}();,]+\s*$/.test(line))
          return line;
        // Don't double-comment if user's line already has // comment
        if (/\s\/\/\s/.test(line)) return line;
        for (const p of HEB_PATTERNS) {
          if (p.re.test(line)) {
            // Pad to align comment columns nicely
            const padded = line.length < 50 ? line + " ".repeat(Math.max(1, 50 - line.length)) : line + "  ";
            return `${padded} // ${p.hint}`;
          }
        }
        return line;
      })
      .join("\n");
  }

  function shortName(s) {
    return (s || "").trim().replace(/\s+/g, " ");
  }

  // Weight per concept — lower current level = higher weight (concept needs more practice).
  // Difficulty and weakReports also boost the weight: harder concepts and user-flagged
  // weak ones surface more often.
  function weightFor(lessonId, conceptName) {
    const sc = getScore(lessonId, conceptName);
    if (sc.level >= 7) return 0.15; // mastered — almost never re-asked
    // Base: level 1 -> 8, level 6 -> 3
    let w = Math.max(1.5, 9 - sc.level);
    if (sc.attempts === 0) w *= 1.3; // never tried — slight boost
    // If concept already passed MC at current level but not fill, slightly boost it so the user finishes the level
    if (sc.passedMC || sc.passedFill) w *= 1.4;

    // Difficulty boost: harder concepts surface ~25% more per difficulty point above 5.
    const concept = findConceptByKey(conceptKey(lessonId, conceptName))?.concept;
    if (concept) {
      const diff = getDifficulty(concept);
      if (diff > 5) w *= 1 + (diff - 5) * 0.15; // diff 10 → ×1.75
    }

    // Weak-report boost: each report doubles the weight (capped at ×4).
    if (sc.weakReports > 0) {
      w *= Math.min(4, 1 + sc.weakReports);
    }

    // SRS due boost: concepts whose next review is due/overdue get a ×3 boost
    // so the trainer brings them back into rotation (Track A — A4).
    if (isSrsDue(sc)) {
      w *= 3;
    }

    return Math.max(0.2, w);
  }

  function pickWeightedConcept() {
    const pool = trainableConcepts();
    if (pool.length === 0) return null;

    let filtered = pool;
    if (trainerMode === "weak") {
      filtered = pool.filter(({ lesson, concept }) => {
        const sc = getScore(lesson.id, concept.conceptName);
        return sc.level <= 3; // grandma/child/soldier — still considered weak
      });
      if (filtered.length === 0) filtered = pool;
    }

    const weights = filtered.map(({ lesson, concept }) =>
      weightFor(lesson.id, concept.conceptName),
    );
    const total = weights.reduce((a, b) => a + b, 0);
    let r = window.RNG.next() * total;
    for (let i = 0; i < filtered.length; i++) {
      r -= weights[i];
      if (r <= 0) return filtered[i];
    }
    return filtered[filtered.length - 1];
  }

  // ---- Code Fill: pick a meaningful blank in concept.codeExample
  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Common JS/React keywords/methods worth blanking out
  const FILL_PRIORITY = new Set([
    "useState", "useEffect", "useRef", "useMemo", "useCallback", "useContext",
    "useReducer", "createContext", "Provider", "memo", "forwardRef",
    "map", "filter", "reduce", "forEach", "find", "some", "every", "includes",
    "push", "pop", "shift", "unshift", "splice", "slice", "concat", "sort",
    "async", "await", "Promise", "then", "catch", "finally", "resolve", "reject",
    "fetch", "json", "addEventListener", "querySelector", "createElement",
    "const", "let", "var", "return", "function", "class", "extends", "super",
    "import", "export", "default", "from", "as",
    "true", "false", "null", "undefined",
    "this", "new", "delete", "typeof", "instanceof",
    "props", "state", "children", "key", "ref",
  ]);

  function makeCodeFill(concept) {
    const code = concept.codeExample;
    if (!code || code.length < 8) return null;

    const name = (concept.conceptName || "").trim();
    if (!name) return null;

    // 1) Try to find the concept name (or a single-word part of it) in the code
    const words = name.split(/[\s\-_]+/).filter((w) => w.length >= 3);
    for (const w of words) {
      const re = new RegExp(`\\b(${escapeRegex(w)})\\b`, "i");
      const m = code.match(re);
      if (m) {
        const answer = m[0];
        if (answer.length < 2 || answer.length > 24) continue;
        const blanked = code.replace(re, "____");
        return { answer, blanked };
      }
    }

    // 2) Try priority keyword/method tokens
    const tokens = code.match(/[A-Za-z_$][A-Za-z0-9_$]+/g) || [];
    const priorityHits = tokens.filter((t) => FILL_PRIORITY.has(t));
    if (priorityHits.length > 0) {
      const chosen = priorityHits[window.RNG.int(priorityHits.length)];
      const idx = code.indexOf(chosen);
      if (idx !== -1) {
        const blanked =
          code.substring(0, idx) + "____" + code.substring(idx + chosen.length);
        return { answer: chosen, blanked };
      }
    }

    // 3) Fallback: pick a "distinctive" identifier (length ≥ 4, not a number/bracket)
    const skip = new Set([
      "console", "log", "document", "window", "true", "false", "null",
      "undefined", "if", "else", "for", "while",
    ]);
    const candidates = tokens.filter(
      (t) => !skip.has(t) && t.length >= 4 && t.length <= 18,
    );
    if (candidates.length === 0) return null;
    const chosen = candidates[window.RNG.int(candidates.length)];
    const idx = code.indexOf(chosen);
    if (idx === -1) return null;
    const blanked =
      code.substring(0, idx) + "____" + code.substring(idx + chosen.length);
    return { answer: chosen, blanked };
  }

  // Question generation: returns either a multiple-choice (kind="mc") or code-fill (kind="fill")
  // question depending on the concept's CURRENT level and which stage it has not yet passed.
  // The MC's correct answer uses the explanation of the concept's current level.
  function buildQuestion(lessonItem) {
    const { lesson, concept } = lessonItem;
    const sc = getScore(lesson.id, concept.conceptName);
    const need = nextNeedFor(concept, sc);
    if (!need) return null; // mastered

    // Helpers
    const pool = trainableConcepts().filter(
      (x) => x.concept.conceptName !== concept.conceptName,
    );

    function shuffle(arr) {
      return window.RNG.shuffle(arr);
    }

    // --- Code Trace (curated, multi-step) — preferred occasionally for the MC stage ---
    // We only offer trace as an alternative to MC, never instead of fill.
    // Triggered when: need === "mc", level >= 3, and a curated trace exists for this concept.
    if (need === "mc" && sc.level >= 3 && window.RNG.next() < 0.45) {
      const conceptKey = `${lesson.id}::${concept.conceptName}`;
      const trace = pickTraceForConcept(conceptKey);
      if (trace) {
        return {
          kind: "trace",
          level: sc.level,
          trace, // full trace question object: { id, code, steps[], explanation }
        };
      }
    }

    // --- Code-fill stage ---
    if (need === "fill") {
      const fill = makeCodeFill(concept);
      if (fill) {
        return {
          kind: "fill",
          level: sc.level,
          question: `השלם את הטוקן החסר בקוד של המושג "${concept.conceptName}":`,
          codeBlock: fill.blanked,
          answer: fill.answer,
          hint: `אורך התשובה: ${fill.answer.length} תווים. אות ראשונה: "${fill.answer[0]}".`,
          explanation: `התשובה הנכונה: ${fill.answer}. ${concept.codeExplanation || ""}`.trim(),
        };
      }
      // If we couldn't generate a fill (no codeExample / weird code), fall through to MC.
    }

    // --- Multiple-choice stage at current level ---
    const levelKey = LEVEL_KEYS[sc.level] || "junior";
    const conceptLevels = concept.levels || {};
    const correctExpl = conceptLevels[levelKey] || bestExplanation(concept);
    const levelLabel = LEVEL_INFO[sc.level].label;

    // Distractors: explanations from OTHER concepts at the SAME level (so wording matches difficulty).
    // Falls back to bestExplanation if some concepts lack that level.
    function distractorAt(otherConcept) {
      const lv = otherConcept.levels || {};
      return lv[levelKey] || bestExplanation(otherConcept);
    }

    function pickDistractors(n, accessor) {
      const arr = window.RNG.shuffle(pool);
      const seen = new Set([accessor(concept)]);
      const out = [];
      for (const item of arr) {
        const v = accessor(item.concept);
        if (!v || seen.has(v)) continue;
        seen.add(v);
        out.push(v);
        if (out.length >= n) break;
      }
      return out;
    }

    // Pick one of two MC sub-types: "describe" (concept → explanation) or "name-match" (explanation → concept)
    const subType = window.RNG.next() < 0.5 ? "describe" : "name-match";

    if (subType === "describe") {
      const distractors = pickDistractors(3, distractorAt);
      const opts = shuffle([correctExpl, ...distractors]);
      return {
        kind: "mc",
        level: sc.level,
        question: `איזה מהמשפטים הבאים מתאר נכון את "${concept.conceptName}" — ברמת ${LEVEL_INFO[sc.level].icon} ${levelLabel}?`,
        options: opts,
        correctIndex: opts.indexOf(correctExpl),
        explanation: `הגדרה ברמת ${levelLabel}: ${correctExpl}`,
      };
    }

    // name-match: show the level-specific explanation, ask for the concept name
    const distractors = pickDistractors(3, (c) => c.conceptName);
    const opts = shuffle([concept.conceptName, ...distractors]);
    return {
      kind: "mc",
      level: sc.level,
      question: `איזה מושג מתאים להסבר הבא (ברמת ${LEVEL_INFO[sc.level].icon} ${levelLabel})?\n\n"${correctExpl}"`,
      options: opts,
      correctIndex: opts.indexOf(concept.conceptName),
      explanation: `המושג: ${concept.conceptName}.`,
    };
  }

  function nextQuestion() {
    trainerLastAnswered = false;
    // Try up to 8 times to find a non-mastered concept (since mastered ones return null question)
    let picked = null, q = null;
    for (let i = 0; i < 8; i++) {
      picked = pickWeightedConcept();
      if (!picked) break;
      q = buildQuestion(picked);
      if (q) break;
    }
    if (!picked || !q) {
      trainerCurrent = null;
      renderTrainerCard();
      return;
    }
    trainerCurrent = { lesson: picked.lesson, concept: picked.concept, question: q };
    renderTrainerCard();
  }

  function masteredCount() {
    let m = 0;
    trainableConcepts().forEach(({ lesson, concept }) => {
      if (getScore(lesson.id, concept.conceptName).level >= 7) m++;
    });
    return m;
  }

  function weakCount() {
    let w = 0;
    trainableConcepts().forEach(({ lesson, concept }) => {
      const sc = getScore(lesson.id, concept.conceptName);
      if (sc.level <= 2) w++; // level 1 (סבתא) or 2 (כיתה א')
    });
    return w;
  }

  // Average level across all trainable concepts (1..7) — for the global mastery bar
  function avgLevel() {
    const all = trainableConcepts();
    if (all.length === 0) return 1;
    const sum = all.reduce(
      (s, { lesson, concept }) => s + getScore(lesson.id, concept.conceptName).level,
      0,
    );
    return sum / all.length;
  }

  function updateTrainerDashboard() {
    const acc = trainerStats.asked
      ? Math.round((trainerStats.correct / trainerStats.asked) * 100)
      : 0;
    document.getElementById("t-asked").textContent = trainerStats.asked;
    document.getElementById("t-correct").textContent = trainerStats.correct;
    document.getElementById("t-wrong").textContent = trainerStats.wrong;
    document.getElementById("t-accuracy").textContent = acc + "%";
    document.getElementById("t-mastered").textContent = masteredCount();
    document.getElementById("t-weak").textContent = weakCount();

    const total = trainableConcepts().length || 1;
    const avg = avgLevel();
    // Global mastery scaled by (level - 1) / 6 so level 1 -> 0% and level 7 -> 100%
    const pct = Math.round(((avg - 1) / 6) * 100);
    document.getElementById("t-mastery-fill").style.width = pct + "%";
    document.getElementById("t-mastery-text").textContent =
      `שליטה כללית: ${pct}% · רמה ממוצעת ${avg.toFixed(2)} מתוך 7 · ${masteredCount()}/${total} ברמת מאסטר 🏆`;
  }

  function renderTrainerCard() {
    const card = document.getElementById("trainer-quiz-card");
    if (!card) return;
    updateTrainerDashboard();

    if (!trainerCurrent) {
      card.innerHTML = `
        <div class="tq-empty">
          <div class="big-icon">🤔</div>
          <h3 style="color: var(--text-bright); margin-bottom:0.5rem;">לא נמצאו מושגים זמינים לאימון</h3>
          <p>ודא שהשיעורים נטענו או החלף ל"מצב מעורב".</p>
        </div>`;
      return;
    }

    const { lesson, concept, question } = trainerCurrent;
    const sc = getScore(lesson.id, concept.conceptName);
    const lvl = LEVEL_INFO[sc.level];

    // Code Trace has its own render path — multi-step UI, separate flow.
    if (question.kind === "trace") {
      renderTraceQuestion(card, lesson, concept, question, sc, lvl);
      return;
    }

    const stageBadge = `${question.kind === "fill" ? "✍️ השלמת קוד" : "🅰️ שאלה אמריקנית"}`;
    const progressBadge = `שלבים ברמה ${sc.level}: ${sc.passedMC ? "🅰️✅" : "🅰️◯"} ${needsCodeFill(concept) ? (sc.passedFill ? "✍️✅" : "✍️◯") : ""}`.trim();

    // Render the code block — for code-fill we replace ____ with a styled placeholder
    let codeHTML = "";
    if (question.codeBlock) {
      const safe = esc(question.codeBlock);
      const replaced =
        question.kind === "fill"
          ? safe.replace(/____/g, '<span class="tq-code-blank">____</span>')
          : safe;
      codeHTML = `<div class="tq-code"><pre><code>${replaced}</code></pre></div>`;
    }

    // Body — branch by type
    const bodyHTML =
      question.kind === "fill"
        ? `
          <div class="tq-fill-hint">${esc(question.hint || "")}</div>
          <input type="text" class="tq-fill-input" id="tq-fill-input"
            placeholder="הקלד את הטוקן החסר ולחץ Enter..." autocomplete="off" spellcheck="false" dir="ltr" />
          <div class="tq-actions">
            <button class="tq-btn primary" id="tq-fill-submit">✅ בדוק תשובה</button>
            <button class="tq-btn secondary" id="tq-skip-fill">⏭️ דלג</button>
          </div>`
        : `
          <div class="tq-options">
            ${question.options
              .map(
                (opt, i) =>
                  `<button class="tq-option" data-i="${i}">${esc(opt)}</button>`,
              )
              .join("")}
          </div>`;

    card.innerHTML = `
      <div class="tq-context">
        <span><span class="tq-lesson">${esc(lesson.title)}</span> · <strong>${esc(concept.conceptName)}</strong></span>
        <span class="tq-level-pill ${lvl.cssClass}" title="הרמה הנוכחית של המושג">רמה ${sc.level}/7 · ${lvl.icon} ${esc(lvl.label)}</span>
      </div>
      <div class="tq-stage-row">
        <span class="tq-stage-badge">${stageBadge}</span>
        <span class="tq-progress-badge">${progressBadge}</span>
      </div>
      <div class="tq-question">${esc(question.question).replace(/\n/g, "<br>")}</div>
      ${codeHTML}
      ${bodyHTML}
      <div id="tq-feedback-slot"></div>
      <div class="tq-actions" id="tq-actions" style="display:none">
        <button class="tq-btn primary" id="tq-next">➡️ שאלה הבאה</button>
        <button class="tq-btn secondary" id="tq-open-lesson">📖 פתח את השיעור</button>
        <button class="tq-btn secondary" id="tq-skip">⏭️ דלג בלי לענות</button>
      </div>`;

    if (question.type === "code-fill") {
      const input = document.getElementById("tq-fill-input");
      input?.focus();
      input?.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
          onFillAnswer(input.value);
        }
      });
      document
        .getElementById("tq-fill-submit")
        ?.addEventListener("click", () => onFillAnswer(input.value));
      document
        .getElementById("tq-skip-fill")
        ?.addEventListener("click", () => nextQuestion());
    } else {
      card.querySelectorAll(".tq-option").forEach((btn) => {
        btn.addEventListener("click", () =>
          onAnswer(parseInt(btn.dataset.i, 10)),
        );
      });
    }

    document.getElementById("tq-skip")?.addEventListener("click", () => {
      nextQuestion();
    });
  }

  // ============================================================================
  // Code Trace renderer — multi-step UI with line highlighting + hint + progress
  // ============================================================================
  function renderTraceQuestion(card, lesson, concept, question, sc, lvl) {
    // Reset trace state for a new trace question
    if (!traceState || traceState.traceId !== question.trace.id) {
      traceState = {
        traceId: question.trace.id,
        stepIdx: 0,
        attempts: 0,
        hintShown: false,
        wrongOnAnyStep: false,
      };
    }
    const t = question.trace;
    const totalSteps = t.steps.length;
    const stepIdx = traceState.stepIdx;
    const completed = stepIdx >= totalSteps;
    const step = completed ? null : t.steps[stepIdx];

    const codeLines = String(t.code || "").split("\n");
    const lineToHighlight = step && step.line ? step.line : -1;
    const codeHTML = codeLines
      .map((line, i) => {
        const num = i + 1;
        const isHighlighted = num === lineToHighlight;
        return `<div class="trace-line${isHighlighted ? " trace-line-active" : ""}" data-line="${num}">
          <span class="trace-line-num">${num}</span>
          <span class="trace-line-code">${esc(line) || "&nbsp;"}</span>
        </div>`;
      })
      .join("");

    const progressPct = Math.round((stepIdx / totalSteps) * 100);
    const progressHTML = `
      <div class="trace-progress-row">
        <span class="trace-progress-label">שלב ${Math.min(stepIdx + 1, totalSteps)} מתוך ${totalSteps}</span>
        <div class="trace-progress-track"><div class="trace-progress-fill" style="width:${progressPct}%"></div></div>
      </div>`;

    const titleHTML = t.title
      ? `<div class="trace-title">🔍 ${esc(t.title)}</div>`
      : "";

    let bodyHTML = "";
    if (!completed) {
      bodyHTML = `
        <div class="trace-step">
          <div class="trace-prompt">${esc(step.prompt).replace(/\n/g, "<br>")}</div>
          <input type="text" class="trace-input" id="trace-input"
            placeholder="הקלד את התשובה ולחץ Enter..." autocomplete="off" spellcheck="false" dir="ltr" />
          <div class="trace-actions">
            <button class="tq-btn primary" id="trace-submit">✅ בדוק</button>
            <button class="tq-btn secondary" id="trace-hint">💡 רמז</button>
            <button class="tq-btn secondary" id="trace-skip">⏭️ דלג בשלב</button>
          </div>
          <div class="trace-hint" id="trace-hint-slot" style="display:none"></div>
          <div class="trace-feedback" id="trace-feedback-slot"></div>
        </div>`;
    } else {
      // All steps completed — show explanation + score this trace as MC pass
      bodyHTML = `
        <div class="trace-complete">
          <div class="trace-complete-headline">🎉 השלמת את כל השלבים!</div>
          <div class="trace-explanation"><strong>סיכום:</strong> ${esc(t.explanation || "")}</div>
        </div>`;
    }

    card.innerHTML = `
      <div class="tq-context">
        <span><span class="tq-lesson">${esc(lesson.title)}</span> · <strong>${esc(concept.conceptName)}</strong></span>
        <span class="tq-level-pill ${lvl.cssClass}" title="הרמה הנוכחית של המושג">רמה ${sc.level}/7 · ${lvl.icon} ${esc(lvl.label)}</span>
      </div>
      <div class="tq-stage-row">
        <span class="tq-stage-badge">🔍 מעקב קוד (Code Trace)</span>
        <span class="tq-progress-badge">${sc.passedMC ? "🅰️✅" : "🅰️◯"} ${needsCodeFill(concept) ? (sc.passedFill ? "✍️✅" : "✍️◯") : ""}</span>
      </div>
      ${titleHTML}
      ${progressHTML}
      <div class="trace-code-block"><pre>${codeHTML}</pre></div>
      ${bodyHTML}
      <div id="tq-feedback-slot"></div>
      <div class="tq-actions" id="tq-actions" style="display:none">
        <button class="tq-btn primary" id="tq-next">➡️ שאלה הבאה</button>
        <button class="tq-btn secondary" id="tq-open-lesson">📖 פתח את השיעור</button>
        <button class="tq-btn secondary" id="tq-skip">⏭️ דלג</button>
      </div>`;

    if (!completed) {
      const input = document.getElementById("trace-input");
      input?.focus();
      input?.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
          onTraceSubmit(input.value);
        }
      });
      document.getElementById("trace-submit")?.addEventListener("click", () => {
        onTraceSubmit(document.getElementById("trace-input").value);
      });
      document.getElementById("trace-hint")?.addEventListener("click", () => {
        traceState.hintShown = true;
        const slot = document.getElementById("trace-hint-slot");
        if (slot) {
          slot.style.display = "block";
          slot.innerHTML = `<strong>💡 רמז:</strong> ${esc(step.hint || "אין רמז זמין.")}`;
        }
      });
      document.getElementById("trace-skip")?.addEventListener("click", () => {
        // Reveal answer for this step and advance without credit
        traceState.wrongOnAnyStep = true;
        traceState.stepIdx++;
        traceState.hintShown = false;
        traceState.attempts = 0;
        renderTraceQuestion(card, lesson, concept, question, sc, lvl);
      });
    } else {
      // Auto-trigger MC stage scoring + show next-question controls
      finalizeTraceQuestion(concept);
    }

    document.getElementById("tq-skip")?.addEventListener("click", () => {
      traceState = null;
      nextQuestion();
    });
  }

  function onTraceSubmit(rawInput) {
    if (!trainerCurrent || trainerCurrent.question.kind !== "trace") return;
    const t = trainerCurrent.question.trace;
    const step = t.steps[traceState.stepIdx];
    if (!step) return;
    const fbSlot = document.getElementById("trace-feedback-slot");
    traceState.attempts++;
    if (isTraceAnswerCorrect(rawInput, step)) {
      if (fbSlot) {
        fbSlot.innerHTML = `<div class="trace-fb-correct">✅ נכון! התשובה: <code>${esc(step.answer)}</code></div>`;
      }
      // Advance after a short delay so user reads the feedback
      setTimeout(() => {
        traceState.stepIdx++;
        traceState.hintShown = false;
        traceState.attempts = 0;
        const card = document.getElementById("trainer-quiz-card");
        if (card) renderTraceQuestion(card, trainerCurrent.lesson, trainerCurrent.concept, trainerCurrent.question, getScore(trainerCurrent.lesson.id, trainerCurrent.concept.conceptName), LEVEL_INFO[getScore(trainerCurrent.lesson.id, trainerCurrent.concept.conceptName).level]);
      }, 700);
    } else {
      traceState.wrongOnAnyStep = true;
      if (fbSlot) {
        const showAnswer = traceState.attempts >= 2;
        fbSlot.innerHTML = `<div class="trace-fb-wrong">❌ לא מדויק. ${showAnswer ? `התשובה: <code>${esc(step.answer)}</code> — נסה שלב הבא.` : "נסה שוב או לחץ '💡 רמז'."}</div>`;
        if (showAnswer) {
          // After 2 wrong attempts, auto-advance with no credit
          setTimeout(() => {
            traceState.stepIdx++;
            traceState.hintShown = false;
            traceState.attempts = 0;
            const card = document.getElementById("trainer-quiz-card");
            if (card) renderTraceQuestion(card, trainerCurrent.lesson, trainerCurrent.concept, trainerCurrent.question, getScore(trainerCurrent.lesson.id, trainerCurrent.concept.conceptName), LEVEL_INFO[getScore(trainerCurrent.lesson.id, trainerCurrent.concept.conceptName).level]);
          }, 1400);
        }
      }
    }
  }

  function finalizeTraceQuestion(concept) {
    if (trainerLastAnswered) return;
    trainerLastAnswered = true;
    const correct = !traceState.wrongOnAnyStep;
    const levelBefore = getScore(trainerCurrent.lesson.id, concept.conceptName).level;
    // Treat trace as MC stage — pass-through to existing scoring
    const result = applyAnswer(trainerCurrent.lesson.id, concept.conceptName, concept, "mc", correct);
    if (correct) trainerStats.correct++; else trainerStats.wrong++;
    trainerStats.asked++;
    const fbSlot = document.getElementById("tq-feedback-slot");
    if (fbSlot) {
      const verdict = correct ? "✅ עברת את ה-Code Trace בלי טעויות!" : "📝 השלמת את ה-Trace, אך עם טעויות בדרך.";
      fbSlot.innerHTML = `<div class="tq-feedback ${correct ? "ok" : "warn"}">
        <strong>${verdict}</strong>
        ${result.advanced ? `<div>⬆️ קודמת לרמה ${result.newLevel}!</div>` : ""}
      </div>`;
    }
    const actions = document.getElementById("tq-actions");
    if (actions) actions.style.display = "flex";
    document.getElementById("tq-next")?.addEventListener("click", () => {
      traceState = null;
      nextQuestion();
    });
    document.getElementById("tq-open-lesson")?.addEventListener("click", () => {
      openLesson(trainerCurrent.lesson.id);
    });
    updateTrainerHeader();
  }

  // Build a unified post-answer feedback message based on the level/advance result
  function buildAnswerFeedback(correct, kind, levelBefore, result, concept, question) {
    const sc = getScore(trainerCurrent.lesson.id, concept.conceptName);
    const verdict = correct ? "✅ נכון!" : "❌ לא מדויק";
    const slotLabel = kind === "mc" ? "🅰️ שאלה אמריקנית" : "✍️ השלמת קוד";

    let progressLine = "";
    if (correct) {
      if (result.advanced) {
        const newLvl = LEVEL_INFO[result.newLevel];
        const isMaster = result.newLevel === 7;
        progressLine = isMaster
          ? `🏆🎉 <strong>הגעת לרמה 7 — מאסטר!</strong> שלטת בכל 6 הרמות של <strong>${esc(concept.conceptName)}</strong>.`
          : `⬆️ <strong>קודמת מרמה ${levelBefore} לרמה ${result.newLevel} — ${newLvl.icon} ${newLvl.label}!</strong> השלמת את שני השלבים.`;
      } else {
        const sb = sc.passedMC ? "🅰️✅" : "🅰️◯";
        const fb = needsCodeFill(concept) ? (sc.passedFill ? " ✍️✅" : " ✍️◯") : "";
        progressLine = `נקודה נצברה ב-${slotLabel}. השלבים ברמה ${sc.level}: ${sb}${fb}. עוד שלב אחד וקודמת רמה!`;
      }
    } else {
      progressLine = `הרמה לא יורדת. נסה שוב — נדרשות תשובה אמריקנית נכונה ${needsCodeFill(concept) ? "וגם השלמת קוד נכונה" : ""} כדי לעלות מרמה ${sc.level}.`;
    }

    const wrongAns =
      !correct && kind === "fill"
        ? ` — התשובה הנכונה: <code>${esc(question.answer || "")}</code>`
        : "";

    return `
      <div class="tq-feedback ${correct ? "correct" : "wrong"}">
        <div class="verdict">${verdict}${wrongAns}<span class="delta">${correct ? "+1" : "0"}</span></div>
        <div>${esc(question.explanation || "")}</div>
        <div style="margin-top:0.5rem; font-size:0.92rem; color: var(--text-main);">
          ${progressLine}
        </div>
      </div>`;
  }

  function attachPostAnswerActions(lesson, concept) {
    document.getElementById("tq-actions").style.display = "flex";
    document.getElementById("tq-next")?.addEventListener("click", nextQuestion);
    document.getElementById("tq-open-lesson")?.addEventListener("click", () => {
      openLesson(lesson.id);
      setTimeout(() => {
        const cards = document.querySelectorAll(".concept-card h4");
        for (const h of cards) {
          if (h.textContent.trim() === concept.conceptName) {
            h.closest(".concept-card").scrollIntoView({ behavior: "smooth", block: "center" });
            break;
          }
        }
      }, 250);
    });
  }

  function onFillAnswer(rawInput) {
    if (!trainerCurrent || trainerLastAnswered) return;
    const userAns = (rawInput || "").trim();
    if (!userAns) return;
    trainerLastAnswered = true;

    const { lesson, concept, question } = trainerCurrent;
    const correct =
      userAns.toLowerCase() === (question.answer || "").toLowerCase();

    const levelBefore = getScore(lesson.id, concept.conceptName).level;
    const result = applyAnswer(lesson.id, concept.conceptName, concept, "fill", correct);
    trainerStats.asked++;
    if (correct) trainerStats.correct++; else trainerStats.wrong++;

    const input = document.getElementById("tq-fill-input");
    if (input) {
      input.classList.add(correct ? "correct" : "wrong");
      input.disabled = true;
    }
    document.querySelectorAll("#tq-fill-submit, #tq-skip-fill").forEach((b) => {
      b.style.display = "none";
    });

    document.getElementById("tq-feedback-slot").innerHTML = buildAnswerFeedback(
      correct, "fill", levelBefore, result, concept, question,
    );
    attachPostAnswerActions(lesson, concept);

    updateTrainerDashboard();
    if (document.getElementById("trainer-report").style.display !== "none") {
      renderTrainerReport();
    }
  }

  function onAnswer(selectedIdx) {
    if (!trainerCurrent || trainerLastAnswered) return;
    trainerLastAnswered = true;

    const { lesson, concept, question } = trainerCurrent;
    const correct = selectedIdx === question.correctIndex;

    const levelBefore = getScore(lesson.id, concept.conceptName).level;
    const result = applyAnswer(lesson.id, concept.conceptName, concept, "mc", correct);
    trainerStats.asked++;
    if (correct) trainerStats.correct++; else trainerStats.wrong++;

    const card = document.getElementById("trainer-quiz-card");
    card.querySelectorAll(".tq-option").forEach((btn) => {
      btn.classList.add("disabled");
      const i = parseInt(btn.dataset.i, 10);
      if (i === question.correctIndex) btn.classList.add("correct");
      else if (i === selectedIdx) btn.classList.add("wrong");
    });

    document.getElementById("tq-feedback-slot").innerHTML = buildAnswerFeedback(
      correct, "mc", levelBefore, result, concept, question,
    );
    attachPostAnswerActions(lesson, concept);

    updateTrainerDashboard();
    if (document.getElementById("trainer-report").style.display !== "none") {
      renderTrainerReport();
    }
  }

  // Bank coverage summary — counts how many concepts have 0 hand-crafted MC/Fill questions
  function renderBankCoverage() {
    const all = allConcepts();
    if (all.length === 0) return "";

    let zeroMC = 0, zeroFill = 0, zeroBoth = 0;
    let totalNeedingFill = 0;
    const missingByLesson = {};

    all.forEach(({ lesson, concept }) => {
      const counts = bankCountsFor(lesson.id, concept.conceptName);
      const needFill = !!concept.codeExample;
      if (needFill) totalNeedingFill++;
      const isMissing =
        counts.mc < 3 || (needFill && counts.fill < 2);
      if (counts.mc === 0) zeroMC++;
      if (needFill && counts.fill === 0) zeroFill++;
      if (counts.mc === 0 && needFill && counts.fill === 0) zeroBoth++;
      if (isMissing) {
        missingByLesson[lesson.title] = missingByLesson[lesson.title] || [];
        missingByLesson[lesson.title].push({
          name: concept.conceptName,
          mc: counts.mc,
          fill: counts.fill,
          needFill,
        });
      }
    });

    const allMC = (window.QUESTIONS_BANK && window.QUESTIONS_BANK.mc) || [];
    const allFill = (window.QUESTIONS_BANK && window.QUESTIONS_BANK.fill) || [];
    const curatedMC = allMC.filter((q) => !q._seeded).length;
    const seededMC_total = allMC.length - curatedMC;
    const curatedFill = allFill.filter((q) => !q._seeded).length;
    const seededFill_total = allFill.length - curatedFill;
    const totalQuestions = allMC.length + allFill.length;

    const targetMC = all.length * 3;
    const targetFill = totalNeedingFill * 2;
    const haveMC = allMC.length;
    const haveFill = allFill.length;
    const mcPct = Math.round((haveMC / targetMC) * 100) || 0;
    const fillPct = Math.round((haveFill / targetFill) * 100) || 0;

    const missingHTML = Object.keys(missingByLesson)
      .map((lessonTitle) => {
        const items = missingByLesson[lessonTitle];
        return `
          <div class="bc-lesson">
            <div class="bc-lesson-head">${esc(lessonTitle)} <span class="bc-count">${items.length} מושגים חסרים</span></div>
            <div class="bc-items">
              ${items
                .map(
                  (it) => `
                <div class="bc-item">
                  <span class="bc-name">${esc(it.name)}</span>
                  <span class="bc-counter ${it.mc === 0 ? "zero" : it.mc < 3 ? "partial" : "ok"}">🅰️ ${it.mc}/3</span>
                  ${
                    it.needFill
                      ? `<span class="bc-counter ${it.fill === 0 ? "zero" : it.fill < 2 ? "partial" : "ok"}">✍️ ${it.fill}/2</span>`
                      : `<span class="bc-counter na">— ללא קוד</span>`
                  }
                </div>`,
                )
                .join("")}
            </div>
          </div>`;
      })
      .join("");

    return `
      <div class="bank-coverage glass-panel">
        <h3>📊 כיסוי מאגר השאלות</h3>
        <div class="bc-summary">
          <div class="bc-stat"><span class="n">${totalQuestions}</span><span>סה"כ שאלות במאגר</span></div>
          <div class="bc-stat"><span class="n">${haveMC}/${targetMC}</span><span>🅰️ MC (${mcPct}%)</span></div>
          <div class="bc-stat"><span class="n">${haveFill}/${targetFill}</span><span>✍️ Fill (${fillPct}%)</span></div>
          <div class="bc-stat"><span class="n">${curatedMC + curatedFill}</span><span>✋ ידני curated</span></div>
          <div class="bc-stat"><span class="n">${seededMC_total + seededFill_total}</span><span>🤖 seed אוטומטי</span></div>
          <div class="bc-stat"><span class="n">${zeroBoth}</span><span>בלי שום שאלה</span></div>
        </div>
        <div class="bc-mc-bar">
          <div class="bc-bar"><div class="bc-bar-fill mc" style="width:${mcPct}%"></div></div>
          <div class="bc-bar"><div class="bc-bar-fill fill" style="width:${fillPct}%"></div></div>
        </div>
        <details class="bc-details">
          <summary>📂 הצג רשימה מלאה של מושגים שעדיין דורשים שאלות (${Object.values(missingByLesson).reduce((s, a) => s + a.length, 0)})</summary>
          <div class="bc-list">${missingHTML}</div>
        </details>
      </div>`;
  }

  function renderTrainerReport() {
    const body = document.getElementById("trainer-report-body");
    if (!body || !window.LESSONS_DATA) return;

    const coverageHTML = renderBankCoverage();

    const html = window.LESSONS_DATA
      .map((lesson) => {
        const concepts = lesson.concepts || [];
        if (concepts.length === 0) return "";

        const enriched = concepts.map((c) => {
          const sc = getScore(lesson.id, c.conceptName);
          return { c, sc };
        });

        // Sort: lowest level first (weakest concepts surface at top)
        enriched.sort((a, b) => a.sc.level - b.sc.level);

        const lessonAttempts = enriched.reduce((s, e) => s + e.sc.attempts, 0);
        const lessonMastered = enriched.filter((e) => e.sc.level >= 7).length;
        const lessonAvgLevel =
          enriched.reduce((s, e) => s + e.sc.level, 0) / enriched.length;
        const lessonPct = Math.round(((lessonAvgLevel - 1) / 6) * 100);

        const rows = enriched
          .map(({ c, sc }) => {
            const lvl = LEVEL_INFO[sc.level];
            const masteredCls = sc.level >= 7 ? "mastered" : "";
            const cls =
              sc.level >= 6 ? "pos" : sc.level >= 3 ? "zero" : "neg";
            const levelPct = Math.round(((sc.level - 1) / 6) * 100);
            const stagesNote = sc.level < 7
              ? `<span class="tr-stages">${sc.passedMC ? "🅰️✅" : "🅰️◯"}${needsCodeFill(c) ? (sc.passedFill ? " ✍️✅" : " ✍️◯") : ""}</span>`
              : "";
            return `
              <div class="tr-concept ${cls} ${masteredCls}" title="רמה ${sc.level}/7 · ${esc(lvl.label)}">
                <span class="tr-name">${esc(c.conceptName)}${sc.level >= 7 ? " 🏆" : ""}</span>
                <span class="tr-attempts">${sc.correct}/${sc.attempts}</span>
                ${stagesNote}
                <div class="tr-bar"><div style="width:${levelPct}%"></div></div>
                <span class="tr-score tr-level-pill ${lvl.cssClass}">${lvl.icon} ${sc.level}/7</span>
              </div>`;
          })
          .join("");

        return `
          <div class="tr-lesson">
            <div class="tr-lesson-head">
              <span>${esc(lesson.title)}</span>
              <span class="tr-pct">${lessonMastered}/${concepts.length} מאסטר 🏆 · רמה ממוצעת ${lessonAvgLevel.toFixed(2)}/7 (${lessonPct}%) · ${lessonAttempts} ניסיונות</span>
            </div>
            <div class="tr-concepts">${rows}</div>
          </div>`;
      })
      .join("");

    body.innerHTML = coverageHTML + html;
  }

  function openTrainer() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🧠 מאמן הידע";
    currentLessonDesc.textContent =
      "המערכת מציגה שאלות אדפטיביות. כל תשובה מעדכנת את הציון של המושג ואת רמת השליטה הכללית.";
    trainerView.style.display = "block";
    openTrainerBtn?.classList.add("active");
    trainerStats = { asked: 0, correct: 0, wrong: 0 };
    // Lazy-load the seeded bank (1.4MB) on first Trainer open.
    if (typeof window.ensureSeededBank === "function") {
      window.ensureSeededBank().then(() => {
        nextQuestion();
        renderTrainerReport();
      });
    } else {
      nextQuestion();
      renderTrainerReport();
    }
    scrollToTop();
    sidebar.classList.remove("open");
  }

  // Trainer toolbar
  document.getElementById("t-toggle-report")?.addEventListener("click", () => {
    const r = document.getElementById("trainer-report");
    if (r.style.display === "none") {
      r.style.display = "block";
      renderTrainerReport();
    } else {
      r.style.display = "none";
    }
  });
  document.getElementById("t-focus-weak")?.addEventListener("click", (e) => {
    trainerMode = "weak";
    e.target.classList.add("active");
    document.getElementById("t-mode-mixed")?.classList.remove("active");
    nextQuestion();
  });
  document.getElementById("t-mode-mixed")?.addEventListener("click", (e) => {
    trainerMode = "adaptive";
    e.target.classList.add("active");
    document.getElementById("t-focus-weak")?.classList.remove("active");
    nextQuestion();
  });
  document.getElementById("t-reset-scores")?.addEventListener("click", () => {
    if (!confirm("לאפס את כל הציונים? סימוני V/X של מפת הידע לא ייפגעו."))
      return;
    scores = {};
    saveScores();
    trainerStats = { asked: 0, correct: 0, wrong: 0 };
    nextQuestion();
    renderTrainerReport();
  });
  document.getElementById("t-export-csv")?.addEventListener("click", () => {
    exportProgressCSV();
  });

  // =========== CSV EXPORT ===========
  function csvEscape(v) {
    const s = String(v ?? "");
    if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }
  function exportProgressCSV() {
    const all = allConcepts();
    const rows = [
      [
        "lesson_id",
        "lesson_title",
        "concept_name",
        "level",
        "level_label",
        "passed_mc",
        "passed_fill",
        "attempts",
        "correct",
        "wrong",
        "accuracy_pct",
        "timestamp_iso",
      ],
    ];
    const now = new Date().toISOString();
    all.forEach(({ lesson, concept }) => {
      const sc = getScore(lesson.id, concept.conceptName);
      const lvl = LEVEL_INFO[sc.level];
      const wrong = (sc.attempts || 0) - (sc.correct || 0);
      const acc = sc.attempts > 0
        ? Math.round((sc.correct / sc.attempts) * 100)
        : 0;
      rows.push([
        lesson.id,
        lesson.title,
        concept.conceptName,
        sc.level,
        (lvl.icon + " " + lvl.label).trim(),
        sc.passedMC ? 1 : 0,
        sc.passedFill ? 1 : 0,
        sc.attempts || 0,
        sc.correct || 0,
        wrong,
        acc,
        now,
      ]);
    });

    // Add summary row
    const totals = all.reduce(
      (acc, { lesson, concept }) => {
        const sc = getScore(lesson.id, concept.conceptName);
        acc.lvl += sc.level;
        acc.attempts += sc.attempts || 0;
        acc.correct += sc.correct || 0;
        if (sc.level >= 7) acc.masters++;
        return acc;
      },
      { lvl: 0, attempts: 0, correct: 0, masters: 0 },
    );
    const avgLevel = (totals.lvl / Math.max(1, all.length)).toFixed(2);
    rows.push([]);
    rows.push([
      "SUMMARY",
      "",
      `סה"כ ${all.length} מושגים · ${totals.masters} מאסטרים 🏆`,
      `avg=${avgLevel}`,
      "",
      "",
      "",
      totals.attempts,
      totals.correct,
      totals.attempts - totals.correct,
      totals.attempts > 0 ? Math.round((totals.correct / totals.attempts) * 100) : 0,
      now,
    ]);

    const csv = "\uFEFF" + rows.map((r) => r.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const fname = `lumen_progress_${new Date().toISOString().slice(0, 10)}.csv`;
    a.href = url;
    a.download = fname;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 0);
  }

  // =========== QUICK GUIDE ENGINE ===========
  let guideOpenStates = {}; // topicId -> true/false
  let guideQuery = "";

  function openGuide() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "📖 מדריך מקוצר";
    currentLessonDesc.textContent =
      "סקירה מהירה של 22 הנושאים החשובים, עם שאלות תרגול ושאלות השלמת קוד מקושרות למפת הידע.";
    guideView.style.display = "block";
    openGuideBtn?.classList.add("active");

    const guide = window.QUICK_GUIDE || { topics: [] };
    document.getElementById("guide-subtitle").textContent =
      (guide.intro && guide.intro.subtitle) ||
      "הסדר ההגיוני: JavaScript בסיסי → DOM → אסינכרוניות → Node/Express → MongoDB → React → Hooks → Router → TypeScript → React+TS.";
    renderGuide();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function renderBlock(b) {
    if (!b) return "";
    if (b.type === "p") return `<div class="guide-block p">${esc(b.text)}</div>`;
    if (b.type === "code")
      return `<div class="guide-code"><pre><code>${esc(b.code)}</code></pre></div>`;
    if (b.type === "table") {
      const head = (b.header || []).map((h) => `<th>${esc(h)}</th>`).join("");
      const rows = (b.rows || [])
        .map(
          (r) =>
            `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`,
        )
        .join("");
      return `<div class="guide-table-wrap"><table class="guide-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    return "";
  }

  function renderGuide() {
    const container = document.getElementById("guide-topics-container");
    if (!container) return;
    const guide = window.QUICK_GUIDE || { topics: [] };
    const q = (guideQuery || "").toLowerCase().trim();

    container.innerHTML = guide.topics
      .filter((t) => {
        if (!q) return true;
        const hay = (t.title + " " + (t.blocks || []).map((b) => (b.text || b.code || "")).join(" ")).toLowerCase();
        return hay.includes(q);
      })
      .map((topic) => {
        const counts = bankByTopic(topic.id);
        const isOpen = !!guideOpenStates[topic.id];
        const blocksHTML = (topic.blocks || []).map(renderBlock).join("");

        // Build the embedded quizzes
        const mcHTML = counts.mc.length
          ? counts.mc
              .map((q, i) => {
                const qid = `q_${topic.id}_mc_${i}`;
                const lvl = LEVEL_INFO[q.level] || LEVEL_INFO[3];
                return `
                  <div class="guide-q-card" data-qid="${qid}" data-correct="${q.correctIndex}" data-concept="${esc(q.conceptKey || "")}" data-kind="mc">
                    <div class="guide-q-meta">
                      <span>שאלה ${i + 1}</span>
                      <span class="lvl-pill ${lvl.cssClass}">${lvl.icon} רמה ${q.level}</span>
                    </div>
                    <div class="guide-q-text">${esc(q.question)}</div>
                    <div class="guide-q-options">
                      ${q.options
                        .map(
                          (opt, oi) =>
                            `<button class="guide-q-option" data-i="${oi}">${esc(opt)}</button>`,
                        )
                        .join("")}
                    </div>
                    <div class="guide-q-feedback" data-explanation="${esc(q.explanation || "")}"></div>
                  </div>`;
              })
              .join("")
          : `<p style="color:var(--text-muted);font-size:0.9rem;">אין עדיין שאלות אמריקניות לנושא זה במאגר. השתמש במאמן הידע לאימון אדפטיבי.</p>`;

        const fillHTML = counts.fill.length
          ? counts.fill
              .map((q, i) => {
                const qid = `q_${topic.id}_fill_${i}`;
                const lvl = LEVEL_INFO[q.level] || LEVEL_INFO[3];
                return `
                  <div class="guide-q-card" data-qid="${qid}" data-answer="${esc(q.answer)}" data-concept="${esc(q.conceptKey || "")}" data-kind="fill">
                    <div class="guide-q-meta">
                      <span>קטע ${i + 1} · ${esc(q.hint || "")}</span>
                      <span class="lvl-pill ${lvl.cssClass}">${lvl.icon} רמה ${q.level}</span>
                    </div>
                    <div class="guide-code"><pre><code>${esc(q.code)}</code></pre></div>
                    <div class="guide-q-fill-row">
                      <input type="text" class="guide-q-fill-input" placeholder="הקלד את הטוקן החסר..." dir="ltr" autocomplete="off" spellcheck="false" />
                      <button class="guide-q-fill-submit">✅ בדוק</button>
                    </div>
                    <div class="guide-q-feedback" data-explanation="${esc(q.explanation || "")}"></div>
                  </div>`;
              })
              .join("")
          : `<p style="color:var(--text-muted);font-size:0.9rem;">אין עדיין קטעי קוד להשלמה לנושא זה במאגר.</p>`;

        return `
          <div class="guide-topic ${isOpen ? "is-open" : ""}" data-topic="${esc(topic.id)}">
            <div class="guide-topic-head">
              <div class="guide-topic-title">
                <span class="guide-topic-num">${topic.number}</span>
                <span class="icon-big">${topic.icon || "📚"}</span>
                <h3>${esc(topic.title)}</h3>
              </div>
              <div class="guide-topic-meta">
                <span class="pill-mini mc">🅰️ ${counts.mc.length}</span>
                <span class="pill-mini fill">✍️ ${counts.fill.length}</span>
                <span class="chev">◀</span>
              </div>
            </div>
            <div class="guide-topic-body">
              ${blocksHTML}
              <div class="guide-quiz-section">
                <h4>🅰️ שאלות אמריקניות (${counts.mc.length})</h4>
                ${mcHTML}
              </div>
              <div class="guide-quiz-section">
                <h4>✍️ קטעי קוד להשלמה (${counts.fill.length})</h4>
                ${fillHTML}
              </div>
            </div>
          </div>`;
      })
      .join("") ||
      `<div class="tq-empty"><div class="big-icon">🔍</div><p>לא נמצאו נושאים שתואמים לחיפוש.</p></div>`;

    // Click to expand/collapse
    container.querySelectorAll(".guide-topic").forEach((topicEl) => {
      const tid = topicEl.dataset.topic;
      topicEl.querySelector(".guide-topic-head")?.addEventListener("click", () => {
        guideOpenStates[tid] = !guideOpenStates[tid];
        topicEl.classList.toggle("is-open", guideOpenStates[tid]);
      });

      // MC click handlers
      topicEl.querySelectorAll(".guide-q-card[data-kind='mc']").forEach((card) => {
        const correct = parseInt(card.dataset.correct, 10);
        const conceptKeyStr = card.dataset.concept;
        card.querySelectorAll(".guide-q-option").forEach((btn) => {
          btn.addEventListener("click", () => {
            if (card.classList.contains("answered")) return;
            const sel = parseInt(btn.dataset.i, 10);
            const isCorrect = sel === correct;
            card.classList.add("answered");
            card.classList.add(isCorrect ? "correct" : "wrong");
            card.querySelectorAll(".guide-q-option").forEach((o) => {
              o.classList.add("disabled");
              const i = parseInt(o.dataset.i, 10);
              if (i === correct) o.classList.add("correct");
              else if (i === sel) o.classList.add("wrong");
            });
            applyGuideAnswer(conceptKeyStr, "mc", isCorrect, card);
          });
        });
      });

      // Fill click handlers
      topicEl.querySelectorAll(".guide-q-card[data-kind='fill']").forEach((card) => {
        const expected = (card.dataset.answer || "").trim();
        const conceptKeyStr = card.dataset.concept;
        const input = card.querySelector(".guide-q-fill-input");
        const submitBtn = card.querySelector(".guide-q-fill-submit");

        function submit() {
          if (card.classList.contains("answered")) return;
          const userAns = (input.value || "").trim();
          if (!userAns) return;
          const isCorrect =
            userAns.toLowerCase() === expected.toLowerCase();
          card.classList.add("answered");
          card.classList.add(isCorrect ? "correct" : "wrong");
          input.classList.add(isCorrect ? "correct" : "wrong");
          input.disabled = true;
          submitBtn.disabled = true;
          applyGuideAnswer(conceptKeyStr, "fill", isCorrect, card);
        }

        submitBtn?.addEventListener("click", submit);
        input?.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            submit();
          }
        });
      });
    });
  }

  // Apply an answer from the guide — bumps the linked concept's level (if any)
  // and renders a feedback line into the card.
  function applyGuideAnswer(conceptKeyStr, kind, isCorrect, cardEl) {
    const fb = cardEl.querySelector(".guide-q-feedback");
    const baseExpl = fb?.dataset.explanation || "";
    let levelMsg = "";
    let beforeLvl = null;
    let afterResult = null;

    if (conceptKeyStr) {
      const ref = findConceptByKey(conceptKeyStr);
      if (ref) {
        beforeLvl = getScore(ref.lesson.id, ref.concept.conceptName).level;
        afterResult = applyAnswer(
          ref.lesson.id,
          ref.concept.conceptName,
          ref.concept,
          kind,
          isCorrect,
        );
        if (isCorrect) {
          if (afterResult.advanced) {
            const nl = LEVEL_INFO[afterResult.newLevel];
            levelMsg = afterResult.newLevel === 7
              ? `🏆 הגעת לרמת מאסטר ב-${esc(ref.concept.conceptName)}!`
              : `⬆️ ${esc(ref.concept.conceptName)} עלה מרמה ${beforeLvl} לרמה ${afterResult.newLevel} (${nl.icon} ${nl.label}).`;
          } else {
            levelMsg = `נקודה ל-${esc(ref.concept.conceptName)}. עוד שלב וקודמת רמה.`;
          }
        } else {
          levelMsg = `${esc(ref.concept.conceptName)} נשאר ברמה ${beforeLvl}. נסה שוב במאמן הידע.`;
        }
      }
    }

    if (fb) {
      fb.innerHTML = `
        <div><strong>${isCorrect ? "✅ נכון!" : "❌ לא מדויק."}</strong> ${esc(baseExpl)}</div>
        ${levelMsg ? `<div style="margin-top:0.4rem;">${levelMsg}</div>` : ""}
      `;
    }

    // Refresh KM stats if open
    if (knowledgeMapView && knowledgeMapView.style.display === "block") {
      renderKnowledgeMap();
    }
  }

  // Toolbar wiring (guide)
  document.getElementById("guide-search")?.addEventListener("input", (e) => {
    guideQuery = e.target.value;
    renderGuide();
  });
  document.getElementById("guide-expand-all")?.addEventListener("click", () => {
    (window.QUICK_GUIDE?.topics || []).forEach((t) => {
      guideOpenStates[t.id] = true;
    });
    renderGuide();
  });
  document.getElementById("guide-collapse-all")?.addEventListener("click", () => {
    guideOpenStates = {};
    renderGuide();
  });

  // Wire sidebar quick-action buttons
  openKnowledgeMapBtn?.addEventListener("click", openKnowledgeMap);
  openStudyModeBtn?.addEventListener("click", openStudyMode);
  openTrainerBtn?.addEventListener("click", openTrainer);
  openGuideBtn?.addEventListener("click", openGuide);
  document.getElementById("open-code-anatomy")?.addEventListener("click", openCodeAnatomy);
  openCodeblocksBtn?.addEventListener("click", openCodeblocks);
  openTraceBtn?.addEventListener("click", openTracePage);

  // Global Print-to-PDF — works on every view. Sets a body class to mark
  // which view is "active" (so @media print can isolate it), triggers
  // the browser's native print dialog (user picks "Save as PDF"), then
  // restores state.
  document.getElementById("global-print-btn")?.addEventListener("click", () => {
    const activeBtn = document.querySelector(".top-tab.active");
    const tab = activeBtn?.dataset?.tab || "home";
    const html = document.documentElement;
    const body = document.body;
    body.dataset.printingView = tab;
    body.classList.add("is-printing");
    // Expand all collapsible sections so content isn't hidden in print
    document.querySelectorAll(".guide-topic").forEach((t) => t.classList.add("is-open"));
    document.querySelectorAll(".cb-block").forEach((b) => b.classList.add("is-open"));
    setTimeout(() => {
      window.print();
      // Restore after print dialog closes
      setTimeout(() => {
        body.classList.remove("is-printing");
        delete body.dataset.printingView;
      }, 500);
    }, 100);
  });

  // =========== OPEN CODE ANATOMY (read-only token-by-token breakdown page) ===========
  function openCodeAnatomy() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "📐 פירוק קוד";
    currentLessonDesc.textContent = "הסברים קצרים על תפקיד כל רכיב בקטעי קוד מהשיעורים.";
    const view = document.getElementById("code-anatomy-view");
    if (!view) return;
    view.style.display = "block";
    document.getElementById("open-code-anatomy")?.classList.add("active");
    renderCodeAnatomyPage();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function renderCodeAnatomyPage() {
    const container = document.getElementById("code-anatomy-content");
    if (!container) return;
    const lessons = (window.LESSONS_DATA || []).filter((l) =>
      (l.concepts || []).some(
        (c) =>
          c.extendedTab &&
          Array.isArray(c.extendedTab.codeBreakdowns) &&
          c.extendedTab.codeBreakdowns.length,
      ),
    );
    if (!lessons.length) {
      container.innerHTML =
        '<div class="anatomy-empty">אין עדיין פירוקי קוד. הם יתווספו בהדרגה לשיעורים 21–27.</div>';
      return;
    }
    container.innerHTML = lessons
      .map(
        (lesson) => `
        <section class="anatomy-lesson-block">
          <h3>${esc(lesson.title)}</h3>
          ${(lesson.concepts || [])
            .filter((c) => c.extendedTab && Array.isArray(c.extendedTab.codeBreakdowns) && c.extendedTab.codeBreakdowns.length)
            .map(
              (c) => `
              <div class="anatomy-concept-block">
                <h4>${esc(c.conceptName)}</h4>
                ${c.extendedTab.codeBreakdowns.map(renderCodeAnatomyBlock).join("")}
              </div>`,
            )
            .join("")}
        </section>`,
      )
      .join("");
  }

  function renderCodeAnatomyBlock(br) {
    const code = String(br.code || "");
    const parts = Array.isArray(br.parts) ? br.parts : [];
    const partsRows = parts
      .map(
        (p) => `
        <div class="code-anatomy-row">
          <span class="code-anatomy-piece">${esc(p.piece || p.token || "")}</span>
          <span class="code-anatomy-role">${esc(p.role || "")}</span>
        </div>`,
      )
      .join("");
    return `
      <div class="code-anatomy">
        <pre class="code-anatomy-code"><code>${esc(code)}</code></pre>
        ${parts.length ? `<div class="code-anatomy-parts">${partsRows}</div>` : ""}
        ${br.summary ? `<div class="code-anatomy-summary">${esc(br.summary)}</div>` : ""}
      </div>`;
  }

  // =========== CODE BLOCKS (interactive line-by-line code with MC questions) ===========
  // Per-block UI state: which questions answered (correct/wrong), which blocks open.
  // Score updates flow through applyAnswer() — same as guide/trainer.
  const CB_STATE_KEY = "lumenportal:codeblock_state:v1";
  let cbState = {};
  try {
    cbState = JSON.parse(localStorage.getItem(CB_STATE_KEY) || "{}");
  } catch (_) { cbState = {}; }
  function saveCbState() {
    try { localStorage.setItem(CB_STATE_KEY, JSON.stringify(cbState)); } catch (_) {}
  }
  function recordCbAnswer(blockId, qId, isCorrect) {
    if (!cbState[blockId]) cbState[blockId] = { answers: {} };
    cbState[blockId].answers[qId] = isCorrect ? "correct" : "wrong";
    saveCbState();
  }

  let cbOpenStates = {}; // blockId -> bool
  let cbQuery = "";
  let cbLessonFilter = "all";
  let cbDifficultyFilter = "all";

  const CB_DIFF_INFO = {
    1: { label: "בסיסי", icon: "🟢", cssClass: "cb-diff-1" },
    2: { label: "בינוני", icon: "🟡", cssClass: "cb-diff-2" },
    3: { label: "מתקדם", icon: "🔴", cssClass: "cb-diff-3" },
  };

  function openCodeblocks() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "💻 למד בלוקי קוד";
    currentLessonDesc.textContent =
      "בלוקי קוד עם הסבר לכל שורה + שאלות שמעלות את הניקוד שלך לכל מושג.";
    if (codeblocksView) codeblocksView.style.display = "block";
    openCodeblocksBtn?.classList.add("active");
    populateCbLessonFilter();
    updateCbStats();
    renderCodeblocks();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  // ============================================================================
  // Code Trace top-level page — list all curated traces, filter, and play
  // ============================================================================
  let traceFilterLesson = "all";
  let traceFilterLevel = "all";
  let activeTraceSession = null; // { trace, lesson, concept } when playing

  function openTracePage() {
    hideAllViews();
    currentLessonId = null;
    currentLessonTitle.textContent = "🔬 Code Trace";
    currentLessonDesc.textContent =
      "תרגל חיזוי פלט שורה אחר שורה. כל סשן מועלה את הניקוד למושג המקושר.";
    if (traceView) traceView.style.display = "block";
    openTraceBtn?.classList.add("active");
    activeTraceSession = null;
    populateTraceFilters();
    renderTraceList();
    scrollToTop();
    sidebar.classList.remove("open");
  }

  function populateTraceFilters() {
    const sel = document.getElementById("trace-filter-lesson");
    if (!sel || sel.options.length > 1) {
      // Already populated; just rewire change handlers below
    } else {
      // First time — fill lesson options
      const lessons = (window.LESSONS_DATA || []).filter((l) =>
        ((window.QUESTIONS_BANK && window.QUESTIONS_BANK.trace) || []).some(
          (t) => t.conceptKey && t.conceptKey.startsWith(`${l.id}::`),
        ),
      );
      lessons.forEach((l) => {
        const opt = document.createElement("option");
        opt.value = l.id;
        opt.textContent = l.title;
        sel.appendChild(opt);
      });
    }
    // Always re-attach handlers (idempotent)
    sel?.addEventListener("change", () => {
      traceFilterLesson = sel.value;
      renderTraceList();
    });
    document.getElementById("trace-filter-level")?.addEventListener("change", (ev) => {
      traceFilterLevel = ev.target.value;
      renderTraceList();
    });
    document.getElementById("trace-random")?.addEventListener("click", () => {
      const all = filteredTraces();
      if (!all.length) return;
      const t = all[window.RNG.int(all.length)];
      startTraceSession(t);
    });
  }

  function filteredTraces() {
    const all = (window.QUESTIONS_BANK && window.QUESTIONS_BANK.trace) || [];
    return all.filter((t) => {
      if (traceFilterLesson !== "all") {
        if (!t.conceptKey || !t.conceptKey.startsWith(`${traceFilterLesson}::`)) {
          return false;
        }
      }
      if (traceFilterLevel !== "all") {
        const min = parseInt(traceFilterLevel, 10);
        const max = min + 1;
        if (typeof t.level !== "number" || t.level < min || t.level > max) {
          return false;
        }
      }
      return true;
    });
  }

  function renderTraceList() {
    const listEl = document.getElementById("trace-list");
    const playerEl = document.getElementById("trace-player");
    if (!listEl) return;
    if (activeTraceSession) {
      listEl.style.display = "none";
      if (playerEl) playerEl.style.display = "block";
      renderTraceSession();
      return;
    }
    listEl.style.display = "block";
    if (playerEl) playerEl.style.display = "none";
    const traces = filteredTraces();
    if (!traces.length) {
      listEl.innerHTML = `<div class="anatomy-empty">אין traces זמינים בסינון הנוכחי.</div>`;
      return;
    }
    listEl.innerHTML = traces
      .map((t) => {
        const concept = (t.conceptKey || "").split("::")[1] || "";
        const lvl = LEVEL_INFO[t.level] || { icon: "❓", label: "לא מוגדר" };
        return `
          <div class="trace-card" data-trace-id="${esc(t.id)}">
            <div class="trace-card-row">
              <strong>${esc(t.title || t.id)}</strong>
              <span class="tq-level-pill ${lvl.cssClass || ""}">רמה ${t.level || "?"} · ${lvl.icon} ${esc(lvl.label)}</span>
            </div>
            <div class="trace-card-meta">${esc(concept)} · ${t.steps.length} שלבים</div>
          </div>`;
      })
      .join("");
    listEl.querySelectorAll(".trace-card").forEach((el) => {
      el.addEventListener("click", () => {
        const tid = el.dataset.traceId;
        const t = traces.find((x) => x.id === tid);
        if (t) startTraceSession(t);
      });
    });
  }

  function startTraceSession(trace) {
    // Find the lesson + concept that match this trace's conceptKey
    const [lessonId, conceptName] = (trace.conceptKey || "").split("::");
    const lesson = (window.LESSONS_DATA || []).find((l) => l.id === lessonId);
    const concept = lesson?.concepts?.find((c) => c.conceptName === conceptName);
    if (!lesson || !concept) {
      console.warn("[trace] missing lesson/concept for", trace.conceptKey);
      return;
    }
    // Reuse the trainer trace flow by setting trainerCurrent
    trainerCurrent = {
      lesson,
      concept,
      question: { kind: "trace", level: trace.level || 3, trace },
    };
    trainerLastAnswered = false;
    traceState = null;
    activeTraceSession = { trace, lesson, concept };
    renderTraceList();
  }

  function renderTraceSession() {
    const playerEl = document.getElementById("trace-player");
    if (!playerEl || !activeTraceSession) return;
    // Build a fake "trainer-quiz-card" inside the player + a back button
    playerEl.innerHTML = `
      <div class="trace-player-toolbar">
        <button class="km-btn-mini" id="trace-back-to-list">⬅️ חזרה לרשימה</button>
      </div>
      <div id="trainer-quiz-card" class="tq-card"></div>`;
    document.getElementById("trace-back-to-list")?.addEventListener("click", () => {
      activeTraceSession = null;
      trainerCurrent = null;
      traceState = null;
      renderTraceList();
    });
    // Render via the existing trainer-card pipeline
    renderTrainerCard();
  }

  function updateCbStats() {
    const blocks = (window.CODE_BLOCKS && window.CODE_BLOCKS.blocks) || [];
    const total = blocks.length;
    let completed = 0;
    let totalQs = 0;
    let correctQs = 0;
    let masterCount = 0;
    blocks.forEach((b) => {
      const prog = blockProgress(b);
      totalQs += prog.total;
      correctQs += prog.correct;
      if (prog.total > 0 && prog.answered === prog.total) completed++;
      const sc = getScore(b.lessonId, b.conceptName);
      if (sc.level >= 7) masterCount++;
    });
    const progressPct =
      totalQs > 0 ? Math.round((correctQs / totalQs) * 100) : 0;
    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    set("cb-stat-total", total);
    set("cb-stat-completed", completed);
    set("cb-stat-correct", correctQs);
    set("cb-stat-mastered", masterCount);
    set("cb-stat-progress", progressPct + "%");
  }

  function populateCbLessonFilter() {
    const sel = document.getElementById("cb-filter-lesson");
    if (!sel) return;
    const blocks = (window.CODE_BLOCKS && window.CODE_BLOCKS.blocks) || [];
    const lessonIds = [...new Set(blocks.map((b) => b.lessonId))];
    const lessonsByID = Object.fromEntries(
      (window.LESSONS_DATA || []).map((l) => [l.id, l]),
    );
    const currentValue = sel.value || "all";
    sel.innerHTML =
      `<option value="all">כל השיעורים</option>` +
      lessonIds
        .map((id) => {
          const l = lessonsByID[id];
          const title = l ? l.title : id;
          return `<option value="${esc(id)}">${esc(title)}</option>`;
        })
        .join("");
    sel.value = currentValue;
  }

  function blockProgress(block) {
    const st = cbState[block.id]?.answers || {};
    const total = (block.questions || []).length;
    const answered = (block.questions || []).filter((q) => st[q.id]).length;
    const correct = (block.questions || []).filter(
      (q) => st[q.id] === "correct",
    ).length;
    return { total, answered, correct };
  }

  function getBlockImportance(block) {
    if (block.importance) return Math.min(4, Math.max(1, block.importance));
    const map = window.CB_IMPORTANCE || {};
    return map[block.conceptName] || 2;
  }

  function getBlockImportantNote(block) {
    if (block.importantNote) return block.importantNote;
    const map = window.CB_IMPORTANT_NOTES || {};
    return map[block.conceptName] || "";
  }

  // Wrap occurrences of `term` (literal, case-sensitive) inside an HTML-escaped
  // text with <span class="cb-highlight cb-imp-{N}">. Uses esc() per segment to
  // avoid double-escaping. Returns ready-to-insert HTML.
  function highlightTermInText(text, term, importance) {
    if (!text) return "";
    if (!term || !term.trim()) return esc(text);
    // Build a literal regex (escape special chars in the term)
    const reTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(reTerm, "g");
    const parts = [];
    let lastIdx = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > lastIdx) parts.push(esc(text.slice(lastIdx, m.index)));
      parts.push(
        `<span class="cb-highlight cb-imp-${importance}" title="מושג מרכזי: ${esc(term)}">${esc(m[0])}</span>`,
      );
      lastIdx = m.index + m[0].length;
      if (m.index === re.lastIndex) re.lastIndex++; // safety
    }
    if (lastIdx < text.length) parts.push(esc(text.slice(lastIdx)));
    return parts.join("");
  }

  function renderConceptCallout(block) {
    const imp = getBlockImportance(block);
    const note = getBlockImportantNote(block);
    const sameConceptCount = ((window.CODE_BLOCKS?.blocks) || []).filter(
      (b) => b.conceptName === block.conceptName,
    ).length;
    const stars = "★".repeat(imp) + "☆".repeat(4 - imp);
    const impLabels = {
      1: "שולי",
      2: "רגיל",
      3: "חשוב מאוד",
      4: "🔥 קריטי / יסוד יסודות",
    };
    return `
      <div class="cb-concept-callout cb-imp-bg-${imp}">
        <div class="cb-cc-head">
          <span class="cb-cc-icon">📌</span>
          <span class="cb-cc-name cb-highlight cb-imp-${imp}">${esc(block.conceptName)}</span>
          <span class="cb-cc-stars" title="דרגת חשיבות ${imp}/4">${stars}</span>
          <span class="cb-cc-grade cb-imp-grade-${imp}">${esc(impLabels[imp])}</span>
        </div>
        ${note ? `<div class="cb-cc-note">💡 ${esc(note)}</div>` : ""}
        <div class="cb-cc-actions">
          <button class="cb-cc-link" data-action="open-lesson"
                  data-lesson="${esc(block.lessonId)}"
                  data-concept="${esc(block.conceptName)}">
            📖 הסבר מעמיק בשיעור
          </button>
          ${sameConceptCount > 1
            ? `<button class="cb-cc-link" data-action="filter-concept"
                       data-concept="${esc(block.conceptName)}">
                 💻 בלוקי קוד נוספים על ${esc(block.conceptName)} (${sameConceptCount - 1})
               </button>`
            : ""}
        </div>
      </div>`;
  }

  // Build a map of {targetLine: [{q, idx, status}]} for click-to-jump indicators
  function buildLineQuestionMap(block) {
    const map = {};
    const answers = cbState[block.id]?.answers || {};
    (block.questions || []).forEach((q, idx) => {
      if (!q.targetLine) return;
      if (!map[q.targetLine]) map[q.targetLine] = [];
      map[q.targetLine].push({
        q,
        idx,
        status: answers[q.id] || "pending", // 'pending' | 'correct' | 'wrong'
      });
    });
    return map;
  }

  function renderBlockNav(block, filteredList) {
    const blocks = filteredList || (window.CODE_BLOCKS?.blocks || []);
    const idx = blocks.findIndex((b) => b.id === block.id);
    const prev = idx > 0 ? blocks[idx - 1] : null;
    const next = idx < blocks.length - 1 ? blocks[idx + 1] : null;
    return `
      <div class="cb-block-nav">
        <button class="cb-nav-btn cb-nav-prev" data-target="${prev ? esc(prev.id) : ""}" ${prev ? "" : "disabled"} title="${prev ? `מעבר ל: ${esc(prev.title)}` : "אין קודם"}">
          ▶ ${prev ? `הקודם: ${esc(prev.title.substring(0, 26))}${prev.title.length > 26 ? "…" : ""}` : "אין קודם"}
        </button>
        <span class="cb-nav-pos">${idx + 1} / ${blocks.length}</span>
        <button class="cb-nav-btn cb-nav-next" data-target="${next ? esc(next.id) : ""}" ${next ? "" : "disabled"} title="${next ? `מעבר ל: ${esc(next.title)}` : "אין הבא"}">
          ${next ? `הבא: ${esc(next.title.substring(0, 26))}${next.title.length > 26 ? "…" : ""}` : "אין הבא"} ◀
        </button>
      </div>`;
  }

  function renderAnnotatedCode(block) {
    const lines = (block.code || "").split("\n");
    const comments = block.lineComments || {};
    const term = block.conceptName;
    const imp = getBlockImportance(block);
    const lineQs = buildLineQuestionMap(block);
    return `
      <div class="cb-code-wrap">
        <button class="cb-copy-code-btn" data-block="${esc(block.id)}" title="העתק את הקוד ללוח">📋 העתק קוד</button>
      <div class="cb-code-with-lines">
        ${lines
          .map((line, i) => {
            const n = i + 1;
            const comment = comments[n] || "";
            const codeHTML = line
              ? highlightTermInText(line, term, imp)
              : "&nbsp;";
            const commentHTML = comment
              ? highlightTermInText(comment, term, imp)
              : "";
            const questions = lineQs[n] || [];
            const indicatorsHTML = questions
              .map((qi) => {
                const icon =
                  qi.status === "correct"
                    ? "✅"
                    : qi.status === "wrong"
                      ? "❌"
                      : "❓";
                return `<button class="cb-line-q-indicator cb-line-q-${qi.status}"
                                 data-qid="${esc(qi.q.id)}"
                                 title="שאלה ${qi.idx + 1} — ${qi.status === "correct" ? "נענתה נכון" : qi.status === "wrong" ? "נענתה שגוי" : "טרם נענתה"} (לחץ למעבר)">${icon}</button>`;
              })
              .join("");
            return `
              <div class="cb-line ${questions.length ? "cb-line-has-q" : ""}">
                <span class="cb-line-num">${n}</span>
                <code class="cb-line-code">${codeHTML}</code>
                ${indicatorsHTML ? `<span class="cb-line-indicators">${indicatorsHTML}</span>` : ""}
                ${commentHTML ? `<span class="cb-line-comment">// ${commentHTML}</span>` : ""}
              </div>`;
          })
          .join("")}
      </div>
      </div>`;
  }

  function renderCbQuestion(block, q, idx) {
    const lineCount = (block.code || "").split("\n").length;
    if (q.targetLine && q.targetLine > lineCount) {
      return `<div class="guide-q-card"><div class="guide-q-text">⚠️ שאלה מצביעה על שורה ${q.targetLine} שלא קיימת.</div></div>`;
    }
    const prevAns = cbState[block.id]?.answers?.[q.id];
    const answered = !!prevAns;
    const lineLabel =
      q.targetLine != null ? `שורה ${q.targetLine}` : `שאלה ${idx + 1}`;
    const optionsHTML = (q.options || [])
      .map((opt, oi) => {
        let cls = "guide-q-option";
        if (answered) {
          cls += " disabled";
          if (oi === q.correctIndex) cls += " correct";
        }
        return `<button class="${cls}" data-i="${oi}">${esc(opt)}</button>`;
      })
      .join("");
    const cardCls =
      "guide-q-card cb-q-card" +
      (answered ? ` answered ${prevAns === "correct" ? "correct" : "wrong"}` : "");
    return `
      <div class="${cardCls}"
           data-block="${esc(block.id)}"
           data-qid="${esc(q.id)}"
           data-correct="${q.correctIndex}">
        <div class="guide-q-meta">
          <span>📍 ${esc(lineLabel)} · שאלה ${idx + 1}</span>
          ${answered ? `<span class="lvl-pill ${prevAns === "correct" ? "lvl-master" : "lvl-grandma"}">${prevAns === "correct" ? "✓ נענתה נכון" : "✗ ענית לא נכון"}</span>` : ""}
        </div>
        <div class="guide-q-text">${esc(q.question)}</div>
        <div class="guide-q-options">${optionsHTML}</div>
        <div class="guide-q-feedback" data-explanation="${esc(q.explanation || "")}">
          ${answered ? `<div><strong>${prevAns === "correct" ? "✅ נכון!" : "❌ לא מדויק."}</strong> ${esc(q.explanation || "")}</div>` : ""}
        </div>
      </div>`;
  }

  function renderCodeblocks() {
    const container = document.getElementById("cb-blocks-container");
    if (!container) return;
    const blocks = (window.CODE_BLOCKS && window.CODE_BLOCKS.blocks) || [];
    const lessonsByID = Object.fromEntries(
      (window.LESSONS_DATA || []).map((l) => [l.id, l]),
    );
    const q = (cbQuery || "").toLowerCase().trim();

    const filtered = blocks.filter((b) => {
      if (cbLessonFilter !== "all" && b.lessonId !== cbLessonFilter) return false;
      if (cbDifficultyFilter !== "all" && String(b.difficulty) !== cbDifficultyFilter)
        return false;
      if (q) {
        const hay = (
          b.title +
          " " +
          (b.intro || "") +
          " " +
          b.conceptName +
          " " +
          (b.code || "")
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (!filtered.length) {
      container.innerHTML = `<div class="tq-empty"><div class="big-icon">🔍</div><p>לא נמצאו בלוקים תואמים.</p></div>`;
      return;
    }

    container.innerHTML = filtered
      .map((block) => {
        const isOpen = !!cbOpenStates[block.id];
        const prog = blockProgress(block);
        const completed = prog.total > 0 && prog.answered === prog.total;
        const allCorrect = completed && prog.correct === prog.total;
        const lessonTitle = lessonsByID[block.lessonId]?.title || block.lessonId;
        const diff = CB_DIFF_INFO[block.difficulty] || CB_DIFF_INFO[1];
        const sc = getScore(block.lessonId, block.conceptName);
        const lvl = LEVEL_INFO[sc.level] || LEVEL_INFO[1];

        const questionsHTML = (block.questions || [])
          .map((qq, i) => renderCbQuestion(block, qq, i))
          .join("");

        return `
          <div class="cb-block ${isOpen ? "is-open" : ""} ${completed ? "completed" : ""} ${allCorrect ? "all-correct" : ""}"
               data-block="${esc(block.id)}">
            <div class="cb-block-head">
              <div class="cb-block-title">
                <span class="icon-big">${block.icon || "💻"}</span>
                <h3>${esc(block.title)}</h3>
              </div>
              <div class="cb-block-meta">
                <span class="pill-mini cb-pill-lesson">${esc(lessonTitle)}</span>
                <span class="pill-mini cb-pill-concept">📌 ${esc(block.conceptName)}</span>
                <span class="pill-mini ${diff.cssClass}">${diff.icon} ${diff.label}</span>
                <span class="lvl-pill ${lvl.cssClass}">${lvl.icon} רמה ${sc.level}</span>
                <span class="pill-mini cb-pill-prog">${completed ? (allCorrect ? "🏆" : "✓") : "📊"} ${prog.answered}/${prog.total}</span>
                <button class="cb-tool-btn cb-toggle-comments" title="הסתר/הצג הערות (מצב מבחן)">👁️</button>
                <button class="cb-tool-btn cb-reset-btn" title="אפס תשובות לבלוק זה">🔄</button>
                <button class="cb-tool-btn cb-pdf-btn" title="ייצא PDF צבעוני של בלוק זה">📄</button>
                <span class="chev">◀</span>
              </div>
            </div>
            <div class="cb-block-body">
              ${renderConceptCallout(block)}
              ${block.intro ? `<div class="cb-block-intro">${esc(block.intro)}</div>` : ""}
              ${renderAnnotatedCode(block)}
              <div class="cb-questions-section">
                <h4>❓ שאלות לבדיקת הבנה</h4>
                ${questionsHTML}
              </div>
              ${renderBlockNav(block, filtered)}
            </div>
          </div>`;
      })
      .join("");

    // Wire interactions
    container.querySelectorAll(".cb-block").forEach((blockEl) => {
      const blockId = blockEl.dataset.block;
      const block = filtered.find((b) => b.id === blockId);
      if (!block) return;

      blockEl.querySelector(".cb-block-head")?.addEventListener("click", () => {
        cbOpenStates[blockId] = !cbOpenStates[blockId];
        blockEl.classList.toggle("is-open", cbOpenStates[blockId]);
      });

      // Wire concept-callout actions
      blockEl.querySelectorAll(".cb-cc-link").forEach((btn) => {
        btn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          const action = btn.dataset.action;
          if (action === "open-lesson") {
            const lessonId = btn.dataset.lesson;
            const conceptName = btn.dataset.concept;
            selectedConceptByLesson[lessonId] = conceptName;
            openLesson(lessonId);
          } else if (action === "filter-concept") {
            const conceptName = btn.dataset.concept;
            cbQuery = conceptName;
            const search = document.getElementById("cb-search");
            if (search) search.value = conceptName;
            renderCodeblocks();
            scrollToTop();
          }
        });
      });

      // PDF export
      blockEl.querySelector(".cb-pdf-btn")?.addEventListener("click", (ev) => {
        ev.stopPropagation();
        exportBlockToPdf(block);
      });

      // Toggle line comments visibility (test/learning mode)
      blockEl.querySelector(".cb-toggle-comments")?.addEventListener(
        "click",
        (ev) => {
          ev.stopPropagation();
          const hidden = blockEl.classList.toggle("cb-comments-hidden");
          ev.currentTarget.textContent = hidden ? "🙈" : "👁️";
          ev.currentTarget.title = hidden
            ? "הצג הערות"
            : "הסתר/הצג הערות (מצב מבחן)";
          // Auto-open the block if it was closed
          if (!cbOpenStates[blockId]) {
            cbOpenStates[blockId] = true;
            blockEl.classList.add("is-open");
          }
        },
      );

      // Copy code button
      blockEl.querySelector(".cb-copy-code-btn")?.addEventListener("click", async (ev) => {
        ev.stopPropagation();
        const btn = ev.currentTarget;
        try {
          await navigator.clipboard.writeText(block.code || "");
          btn.textContent = "✓ הועתק!";
          btn.classList.add("cb-copied");
          setTimeout(() => {
            btn.textContent = "📋 העתק קוד";
            btn.classList.remove("cb-copied");
          }, 1600);
        } catch (e) {
          btn.textContent = "❌ העתקה נכשלה";
          setTimeout(() => { btn.textContent = "📋 העתק קוד"; }, 1600);
        }
      });

      // Block navigation (prev/next)
      blockEl.querySelectorAll(".cb-nav-btn").forEach((navBtn) => {
        navBtn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          if (navBtn.disabled) return;
          const targetId = navBtn.dataset.target;
          if (!targetId) return;
          // Close current, open target
          cbOpenStates[block.id] = false;
          cbOpenStates[targetId] = true;
          renderCodeblocks();
          const targetEl = document.querySelector(`.cb-block[data-block="${targetId}"]`);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            targetEl.classList.add("cb-flash");
            setTimeout(() => targetEl.classList.remove("cb-flash"), 1400);
          }
        });
      });

      // Click indicator next to a code line — scroll to that question + flash it
      blockEl.querySelectorAll(".cb-line-q-indicator").forEach((ind) => {
        ind.addEventListener("click", (ev) => {
          ev.stopPropagation();
          const qid = ind.dataset.qid;
          const target = blockEl.querySelector(`.cb-q-card[data-qid="${qid}"]`);
          if (!target) return;
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.classList.add("cb-flash");
          setTimeout(() => target.classList.remove("cb-flash"), 1400);
        });
      });

      // Reset block answers
      blockEl.querySelector(".cb-reset-btn")?.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (
          !confirm(
            `לאפס את התשובות של "${block.title}"?\n\nהמצב של הניקוד הכללי לא ישתנה — רק הסימון של איזה שאלות נענו בבלוק זה.`,
          )
        )
          return;
        if (cbState[block.id]) {
          delete cbState[block.id];
          saveCbState();
        }
        renderCodeblocks();
        // Re-open the block after re-render
        const reopened = document.querySelector(
          `.cb-block[data-block="${block.id}"]`,
        );
        if (reopened) {
          cbOpenStates[block.id] = true;
          reopened.classList.add("is-open");
        }
      });

      blockEl.querySelectorAll(".cb-q-card").forEach((card) => {
        if (card.classList.contains("answered")) return;
        const correct = parseInt(card.dataset.correct, 10);
        const qId = card.dataset.qid;
        const question = block.questions.find((q) => q.id === qId);
        card.querySelectorAll(".guide-q-option").forEach((btn) => {
          btn.addEventListener("click", () => {
            if (card.classList.contains("answered")) return;
            const sel = parseInt(btn.dataset.i, 10);
            const isCorrect = sel === correct;
            card.classList.add("answered");
            card.classList.add(isCorrect ? "correct" : "wrong");
            card.querySelectorAll(".guide-q-option").forEach((o) => {
              o.classList.add("disabled");
              const i = parseInt(o.dataset.i, 10);
              if (i === correct) o.classList.add("correct");
              else if (i === sel) o.classList.add("wrong");
            });
            applyCodeblockAnswer(block, question, isCorrect, card);
          });
        });
      });
    });
  }

  function applyCodeblockAnswer(block, question, isCorrect, cardEl) {
    const fb = cardEl.querySelector(".guide-q-feedback");
    const baseExpl = fb?.dataset.explanation || "";
    let levelMsg = "";

    const ref = findConceptByKey(`${block.lessonId}::${block.conceptName}`);
    if (ref) {
      const beforeLvl = getScore(ref.lesson.id, ref.concept.conceptName).level;
      const afterResult = applyAnswer(
        ref.lesson.id,
        ref.concept.conceptName,
        ref.concept,
        question.kind || "mc",
        isCorrect,
      );
      if (isCorrect) {
        if (afterResult.advanced) {
          const nl = LEVEL_INFO[afterResult.newLevel];
          levelMsg =
            afterResult.newLevel === 7
              ? `🏆 הגעת לרמת מאסטר ב-${esc(ref.concept.conceptName)}!`
              : `⬆️ ${esc(ref.concept.conceptName)} עלה מרמה ${beforeLvl} לרמה ${afterResult.newLevel} (${nl.icon} ${nl.label}).`;
        } else {
          levelMsg = `נקודה ל-${esc(ref.concept.conceptName)}. המשך לאמן במאמן הידע כדי להעלות רמה.`;
        }
      } else {
        levelMsg = `${esc(ref.concept.conceptName)} נשאר ברמה ${beforeLvl}. נסה שוב במאמן הידע.`;
      }
    } else {
      levelMsg = `⚠️ המושג "${esc(block.conceptName)}" לא נמצא בנתוני השיעור — הניקוד לא נרשם.`;
    }

    if (fb) {
      fb.innerHTML = `
        <div><strong>${isCorrect ? "✅ נכון!" : "❌ לא מדויק."}</strong> ${esc(baseExpl)}</div>
        ${levelMsg ? `<div style="margin-top:0.4rem;">${levelMsg}</div>` : ""}
      `;
    }

    recordCbAnswer(block.id, question.id, isCorrect);
    updateCbBlockHeader(block);
    maybeShowBlockCompletion(block);
    updateCbStats();
    // Update line indicators in place — change icon for the answered question
    const blockEl = document.querySelector(
      `.cb-block[data-block="${block.id}"]`,
    );
    const ind = blockEl?.querySelector(
      `.cb-line-q-indicator[data-qid="${question.id}"]`,
    );
    if (ind) {
      ind.textContent = isCorrect ? "✅" : "❌";
      ind.classList.remove("cb-line-q-pending");
      ind.classList.add(`cb-line-q-${isCorrect ? "correct" : "wrong"}`);
    }

    if (knowledgeMapView && knowledgeMapView.style.display === "block") {
      renderKnowledgeMap();
    }
  }

  function updateCbBlockHeader(block) {
    const blockEl = document.querySelector(
      `.cb-block[data-block="${block.id}"]`,
    );
    if (!blockEl) return;
    const prog = blockProgress(block);
    const completed = prog.total > 0 && prog.answered === prog.total;
    const allCorrect = completed && prog.correct === prog.total;
    blockEl.classList.toggle("completed", completed);
    blockEl.classList.toggle("all-correct", allCorrect);
    const progPill = blockEl.querySelector(".cb-pill-prog");
    if (progPill) {
      progPill.textContent = `${completed ? (allCorrect ? "🏆" : "✓") : "📊"} ${prog.answered}/${prog.total}`;
    }
    // Refresh level pill (in case level advanced)
    const sc = getScore(block.lessonId, block.conceptName);
    const lvl = LEVEL_INFO[sc.level] || LEVEL_INFO[1];
    const lvlPill = blockEl.querySelector(".cb-block-meta .lvl-pill");
    if (lvlPill) {
      lvlPill.className = `lvl-pill ${lvl.cssClass}`;
      lvlPill.textContent = `${lvl.icon} רמה ${sc.level}`;
    }
  }

  function maybeShowBlockCompletion(block) {
    const blockEl = document.querySelector(
      `.cb-block[data-block="${block.id}"]`,
    );
    if (!blockEl) return;
    const prog = blockProgress(block);
    const completed = prog.total > 0 && prog.answered === prog.total;
    if (!completed) return;
    if (blockEl.querySelector(".cb-completion-banner")) return; // already shown

    const allCorrect = prog.correct === prog.total;
    const ref = findConceptByKey(`${block.lessonId}::${block.conceptName}`);
    const sc = ref ? getScore(ref.lesson.id, ref.concept.conceptName) : null;
    const canMarkKnownNow = ref
      ? canMarkV(ref.lesson.id, ref.concept.conceptName, ref.concept)
      : false;

    const banner = document.createElement("div");
    banner.className = `cb-completion-banner ${allCorrect ? "all-correct" : "partial"}`;
    banner.innerHTML = allCorrect
      ? `<div class="cb-cb-icon">🎉</div>
         <div class="cb-cb-text">
           <strong>סיימת את הבלוק במלואו — ${esc(prog.correct)}/${esc(prog.total)} נכונות!</strong>
           <span>צבירה למושג <em>${esc(block.conceptName)}</em>${sc ? ` · רמה ${sc.level}` : ""}.</span>
         </div>
         ${canMarkKnownNow ? `<button class="cb-mark-known-btn" data-block="${esc(block.id)}">✓ סמן כידוע</button>` : ""}`
      : `<div class="cb-cb-icon">📍</div>
         <div class="cb-cb-text">
           <strong>סיימת את הבלוק (${esc(prog.correct)}/${esc(prog.total)} נכונות).</strong>
           <span>אפשר לחזור על הקוד ולנסות שוב במאמן הידע לחיזוק.</span>
         </div>`;
    const body = blockEl.querySelector(".cb-block-body");
    if (body) body.appendChild(banner);

    const markBtn = banner.querySelector(".cb-mark-known-btn");
    if (markBtn && ref) {
      markBtn.addEventListener("click", () => {
        markAsKnown(ref.lesson.id, ref.concept.conceptName);
        markBtn.disabled = true;
        markBtn.textContent = "✓ סומן כידוע";
        updateCbBlockHeader(block);
        if (knowledgeMapView && knowledgeMapView.style.display === "block") {
          renderKnowledgeMap();
        }
      });
    }
  }

  // Toolbar wiring
  let _cbSearchTO = null;
  document.getElementById("cb-search")?.addEventListener("input", (e) => {
    clearTimeout(_cbSearchTO);
    _cbSearchTO = setTimeout(() => {
      cbQuery = e.target.value;
      renderCodeblocks();
    }, 200);
  });
  document.getElementById("cb-filter-lesson")?.addEventListener("change", (e) => {
    cbLessonFilter = e.target.value;
    renderCodeblocks();
  });
  document
    .getElementById("cb-filter-difficulty")
    ?.addEventListener("change", (e) => {
      cbDifficultyFilter = e.target.value;
      renderCodeblocks();
    });
  document.getElementById("cb-expand-all")?.addEventListener("click", () => {
    (window.CODE_BLOCKS?.blocks || []).forEach((b) => {
      cbOpenStates[b.id] = true;
    });
    renderCodeblocks();
  });
  document.getElementById("cb-collapse-all")?.addEventListener("click", () => {
    cbOpenStates = {};
    renderCodeblocks();
  });
  // Keyboard shortcuts (only when codeblocks view is active)
  document.addEventListener("keydown", (ev) => {
    if (!codeblocksView || codeblocksView.style.display !== "block") return;
    // Don't intercept while typing in inputs / textareas
    const t = ev.target;
    const inField =
      t &&
      (t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA" ||
        t.isContentEditable);
    if (inField && ev.key !== "Escape") return;
    // Modifier-only events should pass through to browser/native shortcuts
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;

    const key = ev.key;
    if (key === "j" || key === "ArrowDown") {
      ev.preventDefault();
      cbJumpRelative(+1);
    } else if (key === "k" || key === "ArrowUp") {
      ev.preventDefault();
      cbJumpRelative(-1);
    } else if (key === "e") {
      ev.preventDefault();
      document.getElementById("cb-expand-all")?.click();
    } else if (key === "c") {
      ev.preventDefault();
      document.getElementById("cb-collapse-all")?.click();
    } else if (key === "r") {
      ev.preventDefault();
      document.getElementById("cb-random-block")?.click();
    } else if (key === "p") {
      ev.preventDefault();
      document.getElementById("cb-export-pdf")?.click();
    } else if (key === "/") {
      ev.preventDefault();
      document.getElementById("cb-search")?.focus();
    } else if (key === "?" || (ev.shiftKey && key === "/")) {
      ev.preventDefault();
      toggleCbKeysHelp(true);
    } else if (key === "Escape") {
      // Close help modal or clear search
      if (document.getElementById("cb-keys-modal")?.classList.contains("open")) {
        toggleCbKeysHelp(false);
        return;
      }
      const search = document.getElementById("cb-search");
      if (search && search.value) {
        search.value = "";
        cbQuery = "";
        renderCodeblocks();
      }
    }
  });

  // Move open-state to next/prev block in the currently filtered list
  function cbJumpRelative(delta) {
    const renderedIds = Array.from(
      document.querySelectorAll(".cb-block"),
    ).map((el) => el.dataset.block);
    if (!renderedIds.length) return;
    const openId = Object.keys(cbOpenStates).find((k) => cbOpenStates[k]);
    let idx = openId ? renderedIds.indexOf(openId) : -1;
    if (idx === -1) idx = delta > 0 ? -1 : renderedIds.length;
    const newIdx = Math.min(
      renderedIds.length - 1,
      Math.max(0, idx + delta),
    );
    const targetId = renderedIds[newIdx];
    cbOpenStates = { [targetId]: true };
    renderCodeblocks();
    setTimeout(() => {
      const el = document.querySelector(`.cb-block[data-block="${targetId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("cb-flash");
        setTimeout(() => el.classList.remove("cb-flash"), 1400);
      }
    }, 50);
  }

  function toggleCbKeysHelp(force) {
    let modal = document.getElementById("cb-keys-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "cb-keys-modal";
      modal.className = "cb-keys-modal";
      modal.innerHTML = `
        <div class="cb-keys-card">
          <div class="cb-keys-head">
            <h3>⌨️ קיצורי מקלדת — בלוקי קוד</h3>
            <button class="cb-keys-close" aria-label="סגור">✕</button>
          </div>
          <table class="cb-keys-table">
            <tr><td><kbd>J</kbd> / <kbd>↓</kbd></td><td>בלוק הבא</td></tr>
            <tr><td><kbd>K</kbd> / <kbd>↑</kbd></td><td>בלוק הקודם</td></tr>
            <tr><td><kbd>E</kbd></td><td>פתח את כל הבלוקים</td></tr>
            <tr><td><kbd>C</kbd></td><td>כווץ את כל הבלוקים</td></tr>
            <tr><td><kbd>R</kbd></td><td>בלוק אקראי</td></tr>
            <tr><td><kbd>P</kbd></td><td>ייצוא PDF צבעוני</td></tr>
            <tr><td><kbd>/</kbd></td><td>מיקוד שדה החיפוש</td></tr>
            <tr><td><kbd>Esc</kbd></td><td>נקה חיפוש / סגור עזרה</td></tr>
            <tr><td><kbd>?</kbd></td><td>הצג את העזרה הזו</td></tr>
          </table>
        </div>`;
      document.body.appendChild(modal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("cb-keys-close")) {
          toggleCbKeysHelp(false);
        }
      });
    }
    const shouldOpen = force === undefined ? !modal.classList.contains("open") : force;
    modal.classList.toggle("open", shouldOpen);
  }

  document.getElementById("cb-keys-help")?.addEventListener("click", () =>
    toggleCbKeysHelp(true),
  );

  document.getElementById("cb-random-block")?.addEventListener("click", () => {
    const blocks = (window.CODE_BLOCKS && window.CODE_BLOCKS.blocks) || [];
    if (!blocks.length) return;
    // Reset filters so all blocks are eligible
    cbQuery = "";
    cbLessonFilter = "all";
    cbDifficultyFilter = "all";
    const search = document.getElementById("cb-search");
    if (search) search.value = "";
    document.getElementById("cb-filter-lesson").value = "all";
    document.getElementById("cb-filter-difficulty").value = "all";
    // Pick a random block, prefer ones with incomplete progress
    const incomplete = blocks.filter((b) => {
      const p = blockProgress(b);
      return p.answered < p.total;
    });
    const pool = incomplete.length ? incomplete : blocks;
    const pick = pool[window.RNG.int(pool.length)];
    cbOpenStates = { [pick.id]: true };
    renderCodeblocks();
    setTimeout(() => {
      const el = document.querySelector(`.cb-block[data-block="${pick.id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("cb-flash");
        setTimeout(() => el.classList.remove("cb-flash"), 1400);
      }
    }, 50);
  });
  document.getElementById("cb-export-pdf")?.addEventListener("click", () => {
    const blocks = (window.CODE_BLOCKS && window.CODE_BLOCKS.blocks) || [];
    const q = (cbQuery || "").toLowerCase().trim();
    const filtered = blocks.filter((b) => {
      if (cbLessonFilter !== "all" && b.lessonId !== cbLessonFilter) return false;
      if (
        cbDifficultyFilter !== "all" &&
        String(b.difficulty) !== cbDifficultyFilter
      )
        return false;
      if (q) {
        const hay = (
          b.title +
          " " +
          (b.intro || "") +
          " " +
          b.conceptName +
          " " +
          (b.code || "")
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (!filtered.length) {
      alert("אין בלוקים להציג. נסה לאפס את הפילטרים.");
      return;
    }
    exportBlocksToPdf(filtered);
  });

  // ============ PDF EXPORT ============
  // Opens a new window with print-friendly HTML for one or more blocks,
  // applies inline color CSS, and triggers print(). User chooses
  // "Save as PDF" in the browser's print dialog.
  function exportBlockToPdf(block) {
    exportBlocksToPdf([block]);
  }

  function exportBlocksToPdf(blocks) {
    const lessonsByID = Object.fromEntries(
      (window.LESSONS_DATA || []).map((l) => [l.id, l]),
    );
    const cssEsc = (s) => esc(s);

    const blockHTML = blocks
      .map((block, idx) => {
        const lessonTitle = lessonsByID[block.lessonId]?.title || block.lessonId;
        const imp = getBlockImportance(block);
        const note = getBlockImportantNote(block);
        const stars = "★".repeat(imp) + "☆".repeat(4 - imp);
        const impLabels = {
          1: "שולי",
          2: "רגיל",
          3: "חשוב מאוד",
          4: "🔥 קריטי / יסוד יסודות",
        };
        const term = block.conceptName;
        const lines = (block.code || "").split("\n");
        const comments = block.lineComments || {};
        const linesHTML = lines
          .map((line, i) => {
            const n = i + 1;
            const c = comments[n] || "";
            const codeHTML = line ? highlightTermInText(line, term, imp) : "&nbsp;";
            const cHTML = c ? highlightTermInText(c, term, imp) : "";
            return `
              <div class="pdf-line">
                <span class="pdf-num">${n}</span>
                <code class="pdf-code">${codeHTML}</code>
                ${cHTML ? `<span class="pdf-comment">// ${cHTML}</span>` : ""}
              </div>`;
          })
          .join("");
        const questionsHTML = (block.questions || [])
          .map((q, qi) => {
            const correctIdx = q.correctIndex;
            const optsHTML = (q.options || [])
              .map(
                (opt, oi) =>
                  `<div class="pdf-opt ${oi === correctIdx ? "pdf-correct" : ""}">${oi === correctIdx ? "✓" : "○"} ${cssEsc(opt)}</div>`,
              )
              .join("");
            return `
              <div class="pdf-q">
                <div class="pdf-q-meta">📍 שורה ${q.targetLine || "?"} · שאלה ${qi + 1}</div>
                <div class="pdf-q-text">${cssEsc(q.question)}</div>
                <div class="pdf-q-opts">${optsHTML}</div>
                ${q.explanation ? `<div class="pdf-q-expl"><strong>הסבר:</strong> ${cssEsc(q.explanation)}</div>` : ""}
              </div>`;
          })
          .join("");
        return `
          <section class="pdf-block ${idx > 0 ? "pdf-page-break" : ""}">
            <header class="pdf-header">
              <div class="pdf-title-row">
                <span class="pdf-icon">${cssEsc(block.icon || "💻")}</span>
                <h1>${cssEsc(block.title)}</h1>
              </div>
              <div class="pdf-meta-row">
                <span class="pdf-pill pdf-pill-lesson">${cssEsc(lessonTitle)}</span>
                <span class="pdf-pill pdf-pill-concept">📌 ${cssEsc(block.conceptName)}</span>
                <span class="pdf-pill pdf-pill-imp pdf-imp-${imp}">${stars} ${cssEsc(impLabels[imp])}</span>
              </div>
            </header>
            ${note ? `<div class="pdf-callout pdf-imp-bg-${imp}">💡 ${cssEsc(note)}</div>` : ""}
            ${block.intro ? `<p class="pdf-intro">${cssEsc(block.intro)}</p>` : ""}
            <div class="pdf-code-block">${linesHTML}</div>
            ${questionsHTML ? `<div class="pdf-questions"><h2>❓ שאלות לבדיקת הבנה</h2>${questionsHTML}</div>` : ""}
            <footer class="pdf-footer">LumenPortal · בלוק ${idx + 1}/${blocks.length}</footer>
          </section>`;
      })
      .join("");

    const pdfStyles = `
      @page { size: A4; margin: 14mm; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; direction: rtl; font-family: Heebo, Arial, sans-serif; color: #1f2937; background: #fff; }
      .pdf-block { padding: 0; max-width: 100%; }
      .pdf-page-break { page-break-before: always; break-before: page; }
      .pdf-header { border-bottom: 3px solid #6366f1; padding-bottom: 8px; margin-bottom: 12px; }
      .pdf-title-row { display: flex; align-items: center; gap: 10px; }
      .pdf-icon { font-size: 28px; }
      .pdf-header h1 { font-size: 22px; margin: 0; color: #4338ca; }
      .pdf-meta-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
      .pdf-pill { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 12px; border: 1px solid #c7d2fe; background: #eef2ff; color: #4338ca; }
      .pdf-pill-concept { background: #ecfeff; color: #0e7490; border-color: #67e8f9; }
      .pdf-pill-imp { background: #fef3c7; color: #92400e; border-color: #fbbf24; }
      .pdf-imp-1 { background: #f3f4f6; color: #6b7280; border-color: #d1d5db; }
      .pdf-imp-2 { background: #dbeafe; color: #1e40af; border-color: #93c5fd; }
      .pdf-imp-3 { background: #fef3c7; color: #92400e; border-color: #fbbf24; }
      .pdf-imp-4 { background: #fce7f3; color: #9f1239; border-color: #fb7185; }
      .pdf-callout { padding: 10px 14px; margin: 10px 0 14px; border-radius: 6px; font-size: 13px; line-height: 1.55; }
      .pdf-imp-bg-1 { background: #f9fafb; border-right: 4px solid #9ca3af; }
      .pdf-imp-bg-2 { background: #eff6ff; border-right: 4px solid #3b82f6; }
      .pdf-imp-bg-3 { background: #fffbeb; border-right: 4px solid #f59e0b; }
      .pdf-imp-bg-4 { background: #fff1f2; border-right: 4px solid #f43f5e; }
      .pdf-intro { font-size: 12.5px; line-height: 1.6; color: #4b5563; margin: 8px 0 12px; }
      .pdf-code-block { background: #0f172a; color: #e0f2fe; padding: 14px 12px; border-radius: 8px; margin: 12px 0; border-right: 4px solid #6366f1; direction: ltr; font-family: "Fira Code", Menlo, Consolas, monospace; font-size: 11.5px; line-height: 1.65; }
      .pdf-line { display: grid; grid-template-columns: 28px 1fr; gap: 8px; padding: 1px 0; align-items: start; }
      .pdf-line + .pdf-line { border-top: 1px dashed rgba(255,255,255,0.05); }
      .pdf-num { color: #94a3b8; font-size: 10px; text-align: right; padding-top: 2px; user-select: none; }
      .pdf-code { color: #a5d6ff; white-space: pre-wrap; word-break: break-word; }
      .pdf-comment { grid-column: 2; color: #cbd5e1; font-style: italic; font-family: Heebo, Arial, sans-serif; font-size: 11px; direction: rtl; text-align: right; opacity: 0.92; padding-top: 2px; }
      .cb-highlight { display: inline-block; padding: 1px 5px; border-radius: 4px; font-weight: 700; }
      .cb-imp-1 { background: rgba(156,163,175,0.18); color: #cbd5e1; font-size: 0.95em; }
      .cb-imp-2 { background: rgba(59,130,246,0.22); color: #bfdbfe; font-size: 1em; }
      .cb-imp-3 { background: rgba(245,158,11,0.25); color: #fbbf24; font-size: 1.08em; box-shadow: 0 0 0 1px rgba(245,158,11,0.5); }
      .cb-imp-4 { background: linear-gradient(135deg, rgba(244,63,94,0.35), rgba(168,85,247,0.35)); color: #fff; font-size: 1.18em; box-shadow: 0 0 0 1px rgba(244,63,94,0.7); text-shadow: 0 0 6px rgba(244,63,94,0.6); }
      .pdf-comment .cb-imp-4, .pdf-comment .cb-imp-3, .pdf-comment .cb-imp-2, .pdf-comment .cb-imp-1 { color: #1e3a8a; background: #fef3c7; }
      .pdf-questions { margin-top: 14px; }
      .pdf-questions h2 { font-size: 15px; color: #b91c1c; margin: 12px 0 8px; }
      .pdf-q { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px 12px; margin-bottom: 8px; page-break-inside: avoid; break-inside: avoid; }
      .pdf-q-meta { font-size: 10.5px; color: #6b7280; margin-bottom: 4px; }
      .pdf-q-text { font-weight: 700; color: #111827; margin-bottom: 6px; font-size: 12.5px; }
      .pdf-q-opts { display: flex; flex-direction: column; gap: 3px; margin-bottom: 6px; }
      .pdf-opt { font-size: 11.5px; padding: 4px 8px; border-radius: 4px; border: 1px solid #e5e7eb; }
      .pdf-correct { background: #dcfce7; border-color: #86efac; color: #14532d; font-weight: 700; }
      .pdf-q-expl { font-size: 11px; color: #4b5563; padding: 6px 8px; background: #f9fafb; border-right: 3px solid #6366f1; border-radius: 4px; }
      .pdf-footer { font-size: 10px; color: #9ca3af; text-align: center; margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e7eb; }
      @media print {
        body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      }
    `;

    const pdfDocHTML = `<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>LumenPortal — בלוקי קוד (${blocks.length})</title>
    <style>${pdfStyles}</style>
  </head>
  <body>
    ${blockHTML}
    <script>
      window.addEventListener('load', () => { setTimeout(() => window.print(), 300); });
    <\/script>
  </body>
</html>`;

    const w = window.open("", "_blank");
    if (!w) {
      alert(
        "החלון נחסם. אפשר Pop-ups לדומיין הזה או לחץ Ctrl+P אחרי שתיפתח חלונית.",
      );
      return;
    }
    w.document.open();
    w.document.write(pdfDocHTML);
    w.document.close();
  }

  // =========== RENDER CONTENT (adaptive — per-concept level) ===========
  // Per-concept "view level" overrides — let the user temporarily lower the displayed level
  // without affecting the score-driven actual level. Map: conceptKey -> level (1..6) or null.
  let conceptViewOverride = {};
  // Which concept is currently focused in the lesson view (per lesson). Map: lessonId -> conceptName
  let selectedConceptByLesson = {};

  function renderContent() {
    const lesson = window.LESSONS_DATA.find((l) => l.id === currentLessonId);
    if (!lesson) return;

    const concepts = lesson.concepts || [];
    if (concepts.length === 0) {
      lessonBody.innerHTML = `
        <h3>${esc(lesson.title)}</h3>
        <div class="concept-card"><p>אין מושגים זמינים בשיעור זה.</p></div>`;
      return;
    }

    // Resolve selected concept (default = first if not set)
    let selected =
      selectedConceptByLesson[lesson.id] || concepts[0].conceptName;
    let selectedConcept = concepts.find((c) => c.conceptName === selected);
    if (!selectedConcept) {
      selectedConcept = concepts[0];
      selectedConceptByLesson[lesson.id] = selectedConcept.conceptName;
    }

    // Build the concepts menu (top horizontal strip with per-student levels)
    const menuHTML = `
      <div class="concepts-menu" id="concepts-menu">
        <div class="concepts-menu-label">📚 מושגי השיעור (${concepts.length}) — לחץ למעבר:</div>
        <div class="concepts-menu-strip">
          ${concepts
            .map((c) => {
              const sc = getScore(lesson.id, c.conceptName);
              const lvl = LEVEL_INFO[sc.level];
              const isActive = c.conceptName === selectedConcept.conceptName;
              const stages =
                sc.level < 7
                  ? `<span class="cm-stages">${sc.passedMC ? "🅰️✅" : "🅰️◯"}${needsCodeFill(c) ? (sc.passedFill ? "✍️✅" : "✍️◯") : ""}</span>`
                  : "";
              return `
                <button class="cm-pill ${isActive ? "active" : ""} ${lvl.cssClass}"
                        data-concept="${esc(c.conceptName)}"
                        title="רמה ${sc.level}/7 — ${esc(lvl.label)}">
                  <span class="cm-lvl">${lvl.icon} ${sc.level}</span>
                  <span class="cm-name">${esc(c.conceptName)}</span>
                  ${stages}
                </button>`;
            })
            .join("")}
        </div>
      </div>`;

    lessonBody.innerHTML = `
      <h3>${esc(lesson.title)}</h3>
      ${
        lesson.videoScript
          ? `
      <div class="concept-card" style="border-right: 3px solid var(--warning);">
        <h4 style="color: var(--warning);">🎬 תסריט סרטון לימודי</h4>
        <p class="concept-explanation"><strong>[פתיח]</strong> ${esc(lesson.videoScript.hook)}</p>
        <p class="concept-explanation"><strong>[תוכן]</strong> ${esc(lesson.videoScript.body)}</p>
        <p class="concept-explanation" style="margin-bottom:0;"><strong>[סיום]</strong> ${esc(lesson.videoScript.outro)}</p>
      </div>`
          : ""
      }
      ${menuHTML}
      <div class="concepts-list" id="concepts-list">
        ${renderConceptCard(lesson, selectedConcept, concepts.indexOf(selectedConcept))}
      </div>
    `;

    // Wire menu pills
    document.querySelectorAll(".cm-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        selectedConceptByLesson[lesson.id] = pill.dataset.concept;
        renderContent();
        // Smooth-scroll the menu to keep the active pill visible
        setTimeout(() => {
          const active = document.querySelector(".cm-pill.active");
          active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }, 50);
      });
    });

    // Wire per-concept controls (simplify / illustration / etc.)
    wireConceptCardHandlers(lesson);

    // Auto-render inline quiz under the selected concept
    const card = document.querySelector(".concept-card.adaptive");
    if (card) {
      autoRenderConceptQuiz(card, lesson, selectedConcept);
    }
  }

  // Render BOTH MC and Fill stages always-visible inside the active concept card
  function autoRenderConceptQuiz(card, lesson, concept) {
    const slot = card.querySelector(".concept-quiz-slot");
    if (!slot) return;
    const sc = getScore(lesson.id, concept.conceptName);
    const fill = concept.codeExample ? makeCodeFill(concept) : null;

    // Master state — show only a "refresh" button
    if (sc.level >= 7) {
      slot.innerHTML = `
        <div class="concept-mastered-banner">
          🏆 הגעת לרמת מאסטר במושג זה — שלטת בכל 6 הרמות.
          <button class="concept-btn quiz" data-action="quiz-refresh">🔁 התחל סבב חידוש</button>
        </div>`;
      slot.querySelector('[data-action="quiz-refresh"]')?.addEventListener("click", () => {
        startConceptInlineQuiz(card, lesson, concept, "mc");
      });
      return;
    }

    const mcStageHTML = sc.passedMC
      ? `<div class="concept-stage-done">🅰️ ✅ עברת את שלב השאלה האמריקנית ברמה זו.</div>`
      : `<div class="concept-stage" data-stage="mc"><div class="concept-stage-head">🅰️ שלב 1 — שאלה אמריקנית</div><div class="concept-stage-body" id="cs-mc-body"></div></div>`;

    const needFill = !!fill;
    const fillStageHTML = !needFill
      ? `<div class="concept-stage-done muted">✍️ אין דוגמת קוד למושג — קידום על שלב MC בלבד.</div>`
      : sc.passedFill
        ? `<div class="concept-stage-done">✍️ ✅ עברת את שלב השלמת הקוד ברמה זו.</div>`
        : `<div class="concept-stage" data-stage="fill"><div class="concept-stage-head">✍️ שלב 2 — השלמת קוד</div><div class="concept-stage-body" id="cs-fill-body"></div></div>`;

    slot.innerHTML = `
      <div class="concept-stages">
        ${mcStageHTML}
        ${fillStageHTML}
      </div>`;

    // Render MC if not yet passed
    if (!sc.passedMC) {
      const q = pickMCQuestionForConcept(lesson, concept);
      const body = document.getElementById("cs-mc-body");
      if (q && body) {
        body.innerHTML = `
          <div class="ciq-question">${esc(q.question).replace(/\n/g, "<br>")}</div>
          ${q.codeBlock ? `<div class="code-box"><pre><code>${esc(q.codeBlock)}</code></pre></div>` : ""}
          <div class="ciq-options">
            ${q.options
              .map(
                (opt, i) =>
                  `<button class="ciq-option" data-i="${i}">${esc(opt)}</button>`,
              )
              .join("")}
          </div>
          <div class="ciq-feedback"></div>`;
        body.querySelectorAll(".ciq-option").forEach((btn) => {
          btn.addEventListener("click", () => {
            const sel = parseInt(btn.dataset.i, 10);
            const correct = sel === q.correctIndex;
            body.querySelectorAll(".ciq-option").forEach((o) => {
              o.classList.add("disabled");
              const i = parseInt(o.dataset.i, 10);
              if (i === q.correctIndex) o.classList.add("correct");
              else if (i === sel) o.classList.add("wrong");
            });
            handleConceptQuizAnswer(card, lesson, concept, "mc", correct, q);
          });
        });
      } else if (body) {
        body.innerHTML = `<div class="ciq-fb">לא נמצאה שאלה במאגר עבור מושג זה. ניתן להוסיף ב-<code>data/questions_bank.js</code>.</div>`;
      }
    }

    // Render Fill if not yet passed (and exists)
    if (needFill && !sc.passedFill) {
      const body = document.getElementById("cs-fill-body");
      if (body) {
        body.innerHTML = `
          <div class="ciq-hint">${esc(`אורך התשובה: ${fill.answer.length} תווים. אות ראשונה: "${fill.answer[0]}".`)}</div>
          <div class="code-box"><pre><code>${esc(fill.blanked).replace(/____/g, '<span class="tq-code-blank">____</span>')}</code></pre></div>
          <div class="ciq-fill-row">
            <input type="text" class="ciq-fill-input" placeholder="הקלד את הטוקן החסר..." dir="ltr" autocomplete="off" spellcheck="false" />
            <button class="ciq-submit primary">✅ בדוק</button>
          </div>
          <div class="ciq-feedback"></div>`;

        const input = body.querySelector(".ciq-fill-input");
        const submitBtn = body.querySelector(".ciq-submit");
        const submit = () => {
          const userAns = (input.value || "").trim();
          if (!userAns) return;
          const correct =
            userAns.toLowerCase() === (fill.answer || "").toLowerCase();
          input.disabled = true;
          submitBtn.disabled = true;
          input.classList.add(correct ? "correct" : "wrong");
          handleConceptQuizAnswer(card, lesson, concept, "fill", correct, {
            answer: fill.answer,
          });
        };
        submitBtn.addEventListener("click", submit);
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        });
      }
    }
  }

  function renderConceptCard(lesson, concept, idx) {
    const k = conceptKey(lesson.id, concept.conceptName);
    const sc = getScore(lesson.id, concept.conceptName);
    const actualLevel = sc.level;
    const overrideLevel = conceptViewOverride[k];
    // If level 7 (master) — display professor explanation. Else display user's current level.
    const displayLevelIdx =
      overrideLevel ||
      (actualLevel >= 7 ? 6 : Math.min(6, Math.max(1, actualLevel)));
    const displayKey = LEVEL_KEYS[displayLevelIdx] || "junior";
    const explanation =
      (concept.levels && concept.levels[displayKey]) ||
      bestExplanation(concept) ||
      "אין הסבר זמין למושג זה.";

    const lvlInfo = LEVEL_INFO[displayLevelIdx];
    const realLvlInfo = LEVEL_INFO[actualLevel];
    const isOverride = !!overrideLevel && overrideLevel !== actualLevel;
    const canSimplify = displayLevelIdx > 1;
    const hasIllustration = !!concept.illustration;

    const overrideBadge = isOverride
      ? `<span class="concept-override-pill" title="הצגה זמנית של רמה ${displayLevelIdx} במקום הרמה האישית שלך">👁️ צופה ברמה ${displayLevelIdx}</span>`
      : "";

    // === Difficulty + V-button + Report-Weak meta ===
    const diff = getDifficulty(concept);
    const diffClass =
      diff <= 3 ? "diff-easy" : diff <= 6 ? "diff-medium" : diff <= 8 ? "diff-hard" : "diff-extreme";
    const diffLabel =
      diff <= 3 ? "קל" : diff <= 6 ? "בינוני" : diff <= 8 ? "קשה" : "מאוד קשה";
    const diffPill = `<span class="diff-pill ${diffClass}" title="ניקוד קושי 1–10. מסמן כמה הסברים, שאלות ותרגילים נדרשים לשליטה.">🌡️ קושי ${diff}/10 · ${diffLabel}</span>`;

    const need = correctNeededForV(diff);
    const canV = canMarkV(lesson.id, concept.conceptName, concept);
    const showVProgress = isFinite(need) && actualLevel < 7 && !sc.markedKnown;
    const vProgressBadge = showVProgress
      ? `<span class="v-progress" title="כמה תשובות נכונות נדרשות עד שתוכל לסמן ✓">✓ התקדמות: ${Math.min(sc.correctRunCount || 0, need)}/${need}</span>`
      : "";

    const masteredBadge = sc.markedKnown
      ? `<span class="v-mastered" title="סימנת בעצמך ✓ — הוסר ממאמן">✓ סימנתי כידוע</span>`
      : "";

    const weakBadge = sc.weakReports > 0
      ? `<span class="weak-badge" title="${sc.weakReports} דיווחי חולשה — המאמן יציג את המושג הזה לעיתים תכופות יותר">🆘 חלש ×${sc.weakReports}</span>`
      : "";

    return `
      <div class="concept-card adaptive" data-cid="${idx}" data-concept="${esc(concept.conceptName)}">
        <div class="concept-card-head">
          <h4>${esc(concept.conceptName)}</h4>
          <div class="concept-level-row">
            ${diffPill}
            ${weakBadge}
            ${masteredBadge}
            ${vProgressBadge}
            ${overrideBadge}
            <span class="tq-level-pill ${realLvlInfo.cssClass}" title="הרמה האישית שלך במושג">${realLvlInfo.icon} רמה ${actualLevel}/7</span>
          </div>
        </div>

        <div class="concept-display-meta">
          מוצג ברמת <strong>${lvlInfo.icon} ${esc(lvlInfo.label)}</strong>${
            actualLevel >= 7
              ? " · 🏆 הגעת לרמת מאסטר!"
              : ""
          }
        </div>

        <p class="concept-explanation">${esc(explanation)}</p>

        ${
          hasIllustration
            ? `<div class="concept-illustration" style="display:none;"><pre>${esc(concept.illustration)}</pre></div>`
            : ""
        }

        ${renderAnalogyForLevel(concept, displayLevelIdx)}

        ${
          concept.codeExample
            ? `
        <div class="code-box">
          <div class="code-toolbar">
            <button class="code-tool-btn" data-action="toggle-comments" data-card-cid="${idx}" title="הוסף הערות בעברית לכל שורה">💬 הערות בעברית</button>
            <button class="code-tool-btn run-btn" data-action="run-code" data-card-cid="${idx}" aria-label="הרץ את הקוד בסביבה מבודדת" title="הרץ את הקוד בסביבה מבודדת — תראה את ה-console.log">🚀 הרץ</button>
          </div>
          <pre data-code-original="${esc(concept.codeExample)}"><code>${esc(concept.codeExample)}</code></pre>
          <div class="code-runner-output" data-runner-output="${idx}" style="display:none;"></div>
          ${
            concept.codeExplanation
              ? `<div class="code-explanation"><strong>💡 פינת הקוד:</strong> ${esc(concept.codeExplanation)}</div>`
              : ""
          }
        </div>`
            : ""
        }

        ${renderDeepDivePanel(concept)}
        ${renderExtendedExplanationPanel(concept)}
        ${renderExtrasPanel(concept, sc, diff)}
        ${renderMnemonicPanel(concept)}
        ${renderAntiPatternsPanel(concept)}
        ${renderBugHuntPanel(concept)}
        ${renderWarStoriesPanel(concept)}
        ${renderComparisonsPanel(concept)}
        ${renderAudioModeButton(concept, explanation)}

        <div class="concept-actions">
          ${
            canSimplify
              ? `<button class="concept-btn simplify" data-action="simplify">🤔 לא ברור — רמה פשוטה יותר</button>`
              : ""
          }
          ${
            hasIllustration
              ? `<button class="concept-btn illustrate" data-action="toggle-illustration">🖼️ הצג תרשים</button>`
              : ""
          }
          ${
            canV
              ? `<button class="concept-btn mark-v" data-action="mark-v" aria-label="סמן את המושג ${esc(concept.conceptName)} כידוע" title="המושג הזה ברור לי — סמן כידוע ועבור הלאה">✓ ברור לי — סמן כידוע</button>`
              : ""
          }
          ${
            actualLevel < 7 && !sc.markedKnown
              ? `<button class="concept-btn report-weak" data-action="report-weak" aria-label="דווח שאני חלש במושג ${esc(concept.conceptName)}" title="המאמן יציג את המושג לעיתים תכופות יותר ויפתח עוד הסברים, שאלות ודוגמאות קוד">🆘 אני חלש בזה — תן לי עוד</button>`
              : ""
          }
          ${
            isOverride
              ? `<button class="concept-btn ghost" data-action="reset-view">👁️ חזור לרמה האישית</button>`
              : ""
          }
        </div>

        <div class="concept-quiz-slot"></div>
      </div>
    `;
  }

  // === Extras panel: extra explanations, code snippets, pitfalls, and practice questions ===
  // Shows when ANY of:
  //   - difficulty >= 7 (always visible — hard concepts get extra material by default)
  //   - user reported weak (weakReports > 0)
  //   - user got 2+ wrong answers and current correctRunCount is low
  // Content sources: concept.extras + concept_enrichment commonMistakes.
  function renderExtrasPanel(concept, sc, diff) {
    const ext = concept.extras || {};
    const cm = (concept.deepDive && concept.deepDive.commonMistakes) ||
               (concept.commonMistakes) || [];
    const hasExtras =
      (ext.moreExamples && ext.moreExamples.length) ||
      (ext.pitfalls && ext.pitfalls.length) ||
      (ext.practiceQuestions && ext.practiceQuestions.length) ||
      (cm && cm.length);

    if (!hasExtras) return "";

    const stuckOnWrong = sc.attempts > 0 && (sc.correct / sc.attempts) < 0.5 && sc.attempts >= 3;
    const shouldOpen = diff >= 7 || sc.weakReports > 0 || stuckOnWrong;

    const examples = (ext.moreExamples || [])
      .map((ex, i) => `
        <div class="extras-example">
          <div class="extras-ex-head">דוגמה ${i + 1}</div>
          <pre><code>${esc(ex.code || "")}</code></pre>
          ${ex.explanation ? `<div class="extras-ex-expl">${esc(ex.explanation)}</div>` : ""}
        </div>`).join("");

    const pitfalls = (ext.pitfalls || [])
      .map((p, i) => `
        <div class="extras-pitfall">
          <div class="extras-pf-head">⚠️ טעות ${i + 1}: ${esc(p.mistake || "")}</div>
          ${p.why ? `<div><strong>למה זה שגוי:</strong> ${esc(p.why)}</div>` : ""}
          ${p.fix ? `<div><strong>תיקון:</strong> <code>${esc(p.fix)}</code></div>` : ""}
        </div>`).join("");

    const cmList = (cm || [])
      .map((p, i) => `
        <div class="extras-pitfall">
          <div class="extras-pf-head">⚠️ ${esc(p.mistake || "")}</div>
          ${p.why ? `<div><strong>למה:</strong> ${esc(p.why)}</div>` : ""}
          ${p.fix ? `<div><strong>תיקון:</strong> ${esc(p.fix)}</div>` : ""}
        </div>`).join("");

    const practice = (ext.practiceQuestions || [])
      .map((q, i) => `
        <div class="extras-practice">
          <div class="extras-pq-head">❓ תרגול נוסף ${i + 1}</div>
          <div class="extras-pq-text">${esc(q.question || "")}</div>
          <details><summary>הצג תשובה</summary>
            <div class="extras-pq-answer">${esc(q.answer || "")}</div>
          </details>
        </div>`).join("");

    return `
      <details class="extras-panel" ${shouldOpen ? "open" : ""}>
        <summary>🆘 עוד הסברים, דוגמאות ושאלות (${diff >= 7 ? "מומלץ למושג קשה" : "תרגול נוסף"})</summary>
        <div class="extras-body">
          ${examples ? `<div class="extras-section"><h5>📚 דוגמאות קוד נוספות</h5>${examples}</div>` : ""}
          ${(pitfalls || cmList) ? `<div class="extras-section"><h5>⚠️ טעויות נפוצות</h5>${pitfalls}${cmList}</div>` : ""}
          ${practice ? `<div class="extras-section"><h5>❓ שאלות תרגול נוספות</h5>${practice}</div>` : ""}
        </div>
      </details>`;
  }

  // P2.S1.2 — Mnemonic Panel (Hebrew acronym + rhyme + visual hook)
  function renderMnemonicPanel(concept) {
    const m = concept.mnemonic;
    if (!m) return "";
    return `
      <details class="mnemonic-panel">
        <summary>🧠 לזכירה — ${esc(m.acronym || "")} ${m.visualHook || ""}</summary>
        <div class="mnemonic-body">
          ${m.expansion ? `<div class="mnemonic-expansion"><strong>הרחבה:</strong> ${esc(m.expansion)}</div>` : ""}
          ${m.rhyme ? `<pre class="mnemonic-rhyme">${esc(m.rhyme)}</pre>` : ""}
          ${m.why ? `<div class="mnemonic-why">${esc(m.why)}</div>` : ""}
        </div>
      </details>`;
  }

  // P2.S1.1 — Anti-Patterns Gallery (bad code → damage → good code)
  function renderAntiPatternsPanel(concept) {
    const aps = concept.antiPatterns;
    if (!Array.isArray(aps) || aps.length === 0) return "";
    const items = aps
      .map((ap, i) => {
        const sevClass = ap.severity === "P0" ? "ap-sev-p0" : "ap-sev-p1";
        return `
        <div class="anti-pattern-card ${sevClass}">
          <div class="ap-head">
            <span class="ap-num">#${i + 1}</span>
            <span class="ap-title">${esc(ap.title || "")}</span>
            ${ap.severity ? `<span class="ap-sev">${esc(ap.severity)}</span>` : ""}
          </div>
          <div class="ap-bad">
            <div class="ap-label-bad">❌ פגום</div>
            <pre><code>${esc(ap.bad?.code || "")}</code></pre>
          </div>
          ${ap.damage ? `<div class="ap-damage"><strong>נזק:</strong> ${esc(ap.damage)}</div>` : ""}
          <div class="ap-good">
            <div class="ap-label-good">✅ תקין</div>
            <pre><code>${esc(ap.good?.code || "")}</code></pre>
          </div>
          ${
            Array.isArray(ap.diff) && ap.diff.length
              ? `<div class="ap-diff"><strong>השינוי:</strong> ${ap.diff.map((d) => `<code>${esc(d)}</code>`).join(", ")}</div>`
              : ""
          }
        </div>`;
      })
      .join("");
    return `
      <details class="anti-patterns-panel">
        <summary>🔁 דפוסי-נגד (${aps.length} מקרים)</summary>
        <div class="ap-body">${items}</div>
      </details>`;
  }

  // P1.4.3 — Bug Hunt panel (broken code → identify → fix)
  function renderBugHuntPanel(concept) {
    const bugs = concept.bugHunts;
    if (!Array.isArray(bugs) || bugs.length === 0) return "";
    const items = bugs
      .map((b, i) => {
        const optionsHtml = (b.options || [])
          .map(
            (opt, oi) =>
              `<button class="bug-option" data-action="bug-answer" data-bug-id="${esc(b.id)}" data-bug-idx="${oi}">${esc(opt)}</button>`,
          )
          .join("");
        return `
        <div class="bug-hunt-card" data-bug-card="${esc(b.id)}">
          <div class="bh-head">
            <span class="bh-num">🐛 #${i + 1}</span>
            <span class="bh-title">${esc(b.title || "")}</span>
            ${typeof b.level === "number" ? `<span class="bh-level">רמה ${b.level}</span>` : ""}
          </div>
          <div class="bh-broken">
            <div class="bh-label-bad">❌ קוד שבור</div>
            <pre><code>${esc(b.brokenCode || "")}</code></pre>
            ${typeof b.bugLine === "number" ? `<div class="bh-hint-line">💡 רמז: הבאג בשורה ${b.bugLine}</div>` : ""}
          </div>
          ${b.hint ? `<div class="bh-hint">🔎 ${esc(b.hint)}</div>` : ""}
          <div class="bh-options" data-bug-options="${esc(b.id)}">
            <div class="bh-options-prompt">מה הבעיה?</div>
            ${optionsHtml}
          </div>
          <div class="bh-result" data-bug-result="${esc(b.id)}" hidden>
            <div class="bh-fix">
              <div class="bh-label-good">✅ פתרון</div>
              <pre><code>${esc(b.fix || "")}</code></pre>
            </div>
            ${b.explanation ? `<div class="bh-explanation"><strong>📚 הסבר:</strong> ${esc(b.explanation)}</div>` : ""}
          </div>
        </div>`;
      })
      .join("");
    return `
      <details class="bug-hunt-panel">
        <summary>🐛 ציד באגים (${bugs.length} מקרים)</summary>
        <div class="bh-body">${items}</div>
      </details>`;
  }

  // P2.S2.1 — War Stories Library (real production incidents)
  function renderWarStoriesPanel(concept) {
    const stories = concept.warStories;
    if (!Array.isArray(stories) || stories.length === 0) return "";
    const items = stories
      .map((s, i) => {
        const sevClass =
          s.severity === "P0" ? "ws-sev-p0" : s.severity === "P1" ? "ws-sev-p1" : "ws-sev-p2";
        return `
        <div class="war-story-card ${sevClass}">
          <div class="ws-head">
            <span class="ws-num">📍 #${i + 1}</span>
            <span class="ws-title">${esc(s.title || "")}</span>
            ${s.severity ? `<span class="ws-sev">${esc(s.severity)}</span>` : ""}
            ${s.hours ? `<span class="ws-hours" title="זמן שהושקע בדיבוג">⏱️ ${esc(s.hours)}</span>` : ""}
          </div>
          ${s.context ? `<div class="ws-row"><strong>הקונטקסט:</strong> ${esc(s.context)}</div>` : ""}
          ${s.bug ? `<div class="ws-row ws-bug"><strong>הבאג:</strong> <code>${esc(s.bug)}</code></div>` : ""}
          ${s.diagnosis ? `<div class="ws-row"><strong>אבחנה:</strong> ${esc(s.diagnosis)}</div>` : ""}
          ${s.fix ? `<div class="ws-row ws-fix"><strong>תיקון:</strong> <code>${esc(s.fix)}</code></div>` : ""}
          ${s.lesson ? `<div class="ws-row ws-lesson"><strong>📚 לקח:</strong> ${esc(s.lesson)}</div>` : ""}
        </div>`;
      })
      .join("");
    return `
      <details class="war-stories-panel">
        <summary>📚 סיפורי שטח — ${stories.length} מקרים אמיתיים מייצור</summary>
        <div class="ws-body">${items}</div>
      </details>`;
  }

  // P2.S2.2 — Side-by-Side Comparator (X vs Y)
  function renderComparisonsPanel(concept) {
    const cmps = concept.comparisons;
    if (!Array.isArray(cmps) || cmps.length === 0) return "";
    const items = cmps
      .map((cmp) => {
        const rows = (cmp.rows || [])
          .map(
            (r) => `
          <tr>
            <td class="cmp-dim">${esc(r.dim || "")}</td>
            <td class="cmp-cell-a">${esc(r.a || "")}</td>
            <td class="cmp-cell-b">${esc(r.b || "")}</td>
          </tr>`,
          )
          .join("");
        return `
        <div class="comparison-card">
          <div class="cmp-head">
            <div class="cmp-side cmp-side-a">
              <span class="cmp-icon">${esc(cmp.a?.icon || "")}</span>
              <span class="cmp-name">${esc(cmp.a?.name || "A")}</span>
              ${cmp.a?.tagline ? `<span class="cmp-tag">${esc(cmp.a.tagline)}</span>` : ""}
            </div>
            <div class="cmp-vs">VS</div>
            <div class="cmp-side cmp-side-b">
              <span class="cmp-icon">${esc(cmp.b?.icon || "")}</span>
              <span class="cmp-name">${esc(cmp.b?.name || "B")}</span>
              ${cmp.b?.tagline ? `<span class="cmp-tag">${esc(cmp.b.tagline)}</span>` : ""}
            </div>
          </div>
          <table class="cmp-table">
            <thead>
              <tr>
                <th class="cmp-dim-head">ממד</th>
                <th>${esc(cmp.a?.name || "A")}</th>
                <th>${esc(cmp.b?.name || "B")}</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          ${cmp.when ? `<div class="cmp-when"><strong>💡 מתי:</strong> ${esc(cmp.when)}</div>` : ""}
        </div>`;
      })
      .join("");
    return `
      <details class="comparisons-panel">
        <summary>⚖️ השוואה — ${cmps.length === 1 ? cmps[0].a.name + " vs " + cmps[0].b.name : cmps.length + " השוואות"}</summary>
        <div class="cmp-body">${items}</div>
      </details>`;
  }

  // P2.S2.3 — Audio Mode (Web Speech API TTS)
  function renderAudioModeButton(concept, levelText) {
    if (typeof window === "undefined" || typeof window.speechSynthesis === "undefined") return "";
    if (!levelText || levelText.length < 10) return "";
    return `
      <button class="audio-mode-btn" data-action="audio-read" data-text="${esc(levelText)}"
              aria-label="הקרא את ההסבר בקול" title="הקרא בקול (Web Speech)">
        🎤 הקרא בקול
      </button>`;
  }

  // Renders an "analogy from daily life" callout for the level being displayed.
  // Looks up concept.analogies[levelKey] (e.g. concept.analogies.grandma).
  // If the curated analogy is missing, returns empty string.
  function renderAnalogyForLevel(concept, levelIdx) {
    const lvKey = LEVEL_KEYS[levelIdx];
    if (!lvKey) return "";
    const analogy =
      (concept.analogies && concept.analogies[lvKey]) ||
      (concept.analogy && typeof concept.analogy === "string" ? concept.analogy : "");
    if (!analogy) return "";
    return `<div class="concept-analogy" title="אסוציאציה מחיי היום-יום">
      <span class="ca-label">🌍 כמו בחיים:</span>
      <span class="ca-text">${esc(analogy)}</span>
    </div>`;
  }

  // Renders the "📚 הסבר מורחב" expandable panel for exam prep.
  // Pulls from concept.extendedTab = { simpleGrandma, simpleExplanation,
  // thinkingMethod (string|string[]), purpose, codeSnippets[], codeBreakdowns[] }.
  // Returns "" when no curated content exists, so card looks unchanged.
  function renderExtendedExplanationPanel(concept) {
    const ext = concept.extendedTab;
    if (!ext) return "";
    const snippets = (ext.codeSnippets || [])
      .map(
        (s) => `
        <div class="ext-snippet">
          <div class="ext-snippet-title">${esc(s.title || "")}</div>
          <pre class="ext-snippet-code"><code>${esc(s.code || "")}</code></pre>
          ${s.explanation ? `<div class="ext-snippet-explanation">${esc(s.explanation)}</div>` : ""}
        </div>`,
      )
      .join("");
    const thinkingList = Array.isArray(ext.thinkingMethod)
      ? `<ol class="ext-thinking">${ext.thinkingMethod.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`
      : ext.thinkingMethod
        ? `<p>${esc(ext.thinkingMethod)}</p>`
        : "";
    const breakdowns = Array.isArray(ext.codeBreakdowns)
      ? ext.codeBreakdowns.map(renderCodeAnatomyBlock).join("")
      : "";
    return `<details class="extended-panel">
      <summary>📚 הסבר מורחב — לכיתה, לקריאה, ולמבחן</summary>
      <div class="ext-body">
        ${ext.simpleGrandma ? `<div class="ext-section ext-grandma"><h5>👵 דימוי פשוט לסבתא</h5><p>${esc(ext.simpleGrandma)}</p></div>` : ""}
        ${ext.simpleExplanation ? `<div class="ext-section ext-simple"><h5>💡 הסבר פשוט וברור</h5><p>${esc(ext.simpleExplanation)}</p></div>` : ""}
        ${thinkingList ? `<div class="ext-section ext-thinking-section"><h5>🧭 דרך חשיבה קבועה</h5>${thinkingList}</div>` : ""}
        ${ext.purpose ? `<div class="ext-section ext-purpose"><h5>🎯 מה המטרה?</h5><p>${esc(ext.purpose)}</p></div>` : ""}
        ${breakdowns ? `<div class="ext-section ext-anatomy-section"><h5>📐 פירוק קוד — תפקיד כל רכיב</h5>${breakdowns}</div>` : ""}
        ${snippets ? `<div class="ext-section ext-snippets-section"><h5>📦 דוגמאות קוד נוספות</h5>${snippets}</div>` : ""}
      </div>
    </details>`;
  }

  // Renders the "💡 למה זה קיים?" expandable panel.
  // Pulls from concept.deepDive = { purpose, problem, withoutIt, useWhen }.
  // Falls back to a generic prompt if no curated content exists.
  function renderDeepDivePanel(concept) {
    const dd = concept.deepDive || {};
    const hasContent = !!(dd.purpose || dd.problem || dd.withoutIt || dd.useWhen);
    if (!hasContent) {
      return `<details class="deep-dive empty">
        <summary>💡 למה זה קיים? <span class="dd-status">— הסבר עומק יתווסף בקרוב</span></summary>
        <div class="dd-body">
          <p class="dd-fallback">למידע מורחב על המושג, ראה את ההסבר ברמה גבוהה יותר (סטודנט / ג'וניור / פרופ׳).</p>
        </div>
      </details>`;
    }
    return `<details class="deep-dive">
      <summary>💡 למה זה קיים? — הבן את הלוגיקה והצורך</summary>
      <div class="dd-body">
        ${dd.purpose ? `<div class="dd-row"><strong>🎯 המטרה:</strong> ${esc(dd.purpose)}</div>` : ""}
        ${dd.problem ? `<div class="dd-row"><strong>🤔 הבעיה שזה פותר:</strong> ${esc(dd.problem)}</div>` : ""}
        ${dd.withoutIt ? `<div class="dd-row"><strong>❌ מה היה בלעדיו:</strong> ${esc(dd.withoutIt)}</div>` : ""}
        ${dd.useWhen ? `<div class="dd-row"><strong>✅ מתי משתמשים:</strong> ${esc(dd.useWhen)}</div>` : ""}
      </div>
    </details>`;
  }

  // P1.1.2 — Per-card refresh helper.
  // Replaces only the targeted concept-card in DOM instead of full renderContent().
  // Falls back to full re-render if the card isn't currently visible.
  function refreshConceptCard(conceptName) {
    const lesson = (window.LESSONS_DATA || []).find(
      (l) => l.id === currentLessonId,
    );
    if (!lesson) {
      renderContent();
      return;
    }
    const concept = (lesson.concepts || []).find(
      (c) => c.conceptName === conceptName,
    );
    if (!concept) {
      renderContent();
      return;
    }
    const idx = (lesson.concepts || []).indexOf(concept);
    const oldCard = document.querySelector(
      `.concept-card.adaptive[data-concept="${cssEscape(conceptName)}"]`,
    );
    if (!oldCard) {
      renderContent();
      return;
    }
    const tmp = document.createElement("div");
    tmp.innerHTML = renderConceptCard(lesson, concept, idx);
    const newCard = tmp.firstElementChild;
    if (!newCard) {
      renderContent();
      return;
    }
    oldCard.replaceWith(newCard);
    // Re-wire handlers only on this card by re-using existing wireConceptCardHandlers
    // (it queries all .concept-card.adaptive but new cards are idempotent: each
    // listener was just bound to this freshly inserted card).
    wireConceptCardHandlers(lesson);
  }

  function wireConceptCardHandlers(lesson) {
    document.querySelectorAll(".concept-card.adaptive").forEach((card) => {
      const conceptName = card.dataset.concept;
      const concept = (lesson.concepts || []).find(
        (c) => c.conceptName === conceptName,
      );
      if (!concept) return;
      const k = conceptKey(lesson.id, conceptName);

      card.querySelectorAll("[data-action]").forEach((btn) => {
        btn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          const action = btn.dataset.action;
          if (action === "simplify") {
            const cur =
              conceptViewOverride[k] ||
              Math.min(6, Math.max(1, getScore(lesson.id, conceptName).level));
            const next = Math.max(1, cur - 1);
            conceptViewOverride[k] = next;
            refreshConceptCard(conceptName); // P1.1.2 — per-card refresh
          } else if (action === "reset-view") {
            delete conceptViewOverride[k];
            refreshConceptCard(conceptName); // P1.1.2
          } else if (action === "toggle-illustration") {
            const ill = card.querySelector(".concept-illustration");
            if (ill) ill.style.display = ill.style.display === "none" ? "block" : "none";
          } else if (action === "toggle-comments") {
            const pre = card.querySelector(".code-box pre");
            if (!pre) return;
            const code = pre.querySelector("code");
            const original = pre.dataset.codeOriginal || "";
            const isAnnotated = btn.classList.contains("active");
            if (isAnnotated) {
              code.textContent = original;
              btn.classList.remove("active");
              btn.textContent = "💬 הערות בעברית";
            } else {
              code.textContent = annotateCodeHebrew(original);
              btn.classList.add("active");
              btn.textContent = "🔙 הסר הערות";
            }
          } else if (action === "run-code") {
            // P1.4.1 — execute codeExample in a sandboxed iframe and show output.
            const pre = card.querySelector(".code-box pre");
            const out = card.querySelector(`[data-runner-output="${btn.dataset.cardCid}"]`);
            if (!pre || !out || typeof window.CodeRunner !== "function") return;
            const code = pre.dataset.codeOriginal || pre.textContent || "";
            btn.disabled = true;
            btn.textContent = "⏳ רץ...";
            out.style.display = "block";
            out.innerHTML = '<div class="runner-status">⏳ מריץ...</div>';
            const runner = new window.CodeRunner(out);
            runner
              .run(code)
              .then((result) => {
                btn.disabled = false;
                btn.textContent = "🚀 הרץ שוב";
                const lines = [];
                if (result.logs && result.logs.length) {
                  lines.push(
                    '<div class="runner-section"><strong>📤 פלט (console):</strong></div>',
                  );
                  result.logs.forEach((log) => {
                    lines.push(
                      `<div class="runner-log runner-log-${log.level}">${esc(log.text)}</div>`,
                    );
                  });
                } else {
                  lines.push(
                    '<div class="runner-status">✓ הרץ ללא פלט (אין console.log)</div>',
                  );
                }
                if (result.errors && result.errors.length) {
                  lines.push(
                    '<div class="runner-section"><strong>❌ שגיאות:</strong></div>',
                  );
                  result.errors.forEach((err) => {
                    lines.push(
                      `<div class="runner-error">${esc(err.message)}${err.line ? ` (line ${err.line})` : ""}</div>`,
                    );
                  });
                }
                out.innerHTML = lines.join("");
              })
              .catch((err) => {
                btn.disabled = false;
                btn.textContent = "🚀 הרץ שוב";
                out.innerHTML = `<div class="runner-error">שגיאה: ${esc(err.message || err)}</div>`;
              });
          } else if (action === "bug-answer") {
            // P1.4.3 — user picked an option in the Bug Hunt
            const bugId = btn.dataset.bugId;
            const pickedIdx = parseInt(btn.dataset.bugIdx, 10);
            const card = btn.closest(".bug-hunt-card");
            if (!card) return;
            const bugList = concept.bugHunts || [];
            const bug = bugList.find((b) => b.id === bugId);
            if (!bug) return;
            const optionsBox = card.querySelector(`[data-bug-options="${cssEscape(bugId)}"]`);
            const resultBox = card.querySelector(`[data-bug-result="${cssEscape(bugId)}"]`);
            const isCorrect = pickedIdx === bug.correctIndex;
            // Mark all options as disabled, highlight correct + chosen
            if (optionsBox) {
              optionsBox.querySelectorAll(".bug-option").forEach((b, i) => {
                b.disabled = true;
                if (i === bug.correctIndex) b.classList.add("bug-option-correct");
                if (i === pickedIdx && !isCorrect) b.classList.add("bug-option-wrong");
              });
            }
            if (resultBox) resultBox.hidden = false;
            // Per-distractor feedback for wrong choices: subtle status tag
            if (!isCorrect) {
              const tag = document.createElement("div");
              tag.className = "bh-status bh-status-wrong";
              tag.textContent = "❌ לא בדיוק. ראה את ההסבר למטה.";
              optionsBox?.appendChild(tag);
            } else {
              const tag = document.createElement("div");
              tag.className = "bh-status bh-status-correct";
              tag.textContent = "✅ נכון!";
              optionsBox?.appendChild(tag);
            }
          } else if (action === "mark-v") {
            // Confirm shortcut, then mark and re-render
            if (confirm(`לסמן את "${concept.conceptName}" כמושג ידוע? המאמן לא יציג אותו יותר.`)) {
              markAsKnown(lesson.id, concept.conceptName);
              refreshConceptCard(concept.conceptName); // P1.1.2 — per-card
            }
          } else if (action === "report-weak") {
            reportWeak(lesson.id, concept.conceptName);
            // Open the extras panel automatically + per-card refresh to show new badge/extras
            refreshConceptCard(concept.conceptName); // P1.1.2
            setTimeout(() => {
              const newCard = document.querySelector(
                `.concept-card.adaptive[data-concept="${cssEscape(concept.conceptName)}"]`
              );
              const ext = newCard?.querySelector(".extras-panel");
              if (ext) {
                ext.setAttribute("open", "");
                ext.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 100);
          } else if (action === "quiz") {
            startConceptInlineQuiz(card, lesson, concept);
          } else if (action === "audio-read") {
            // P2.S2.3 — Speak the explanation in Hebrew via Web Speech API
            const text = btn.dataset.text || "";
            if (!text || typeof window.speechSynthesis === "undefined") return;
            // Cancel any current speech first
            window.speechSynthesis.cancel();
            const utter = new window.SpeechSynthesisUtterance(text);
            utter.lang = "he-IL";
            utter.rate = 0.95;
            utter.pitch = 1.0;
            // Try to pick a Hebrew voice if available
            const voices = window.speechSynthesis.getVoices();
            const heVoice = voices.find((v) => v.lang && v.lang.startsWith("he"));
            if (heVoice) utter.voice = heVoice;
            const wasReading = btn.classList.contains("audio-reading");
            if (wasReading) {
              btn.classList.remove("audio-reading");
              btn.textContent = "🎤 הקרא בקול";
              return;
            }
            btn.classList.add("audio-reading");
            btn.textContent = "⏹️ עצור";
            utter.onend = () => {
              btn.classList.remove("audio-reading");
              btn.textContent = "🎤 הקרא בקול";
            };
            utter.onerror = () => {
              btn.classList.remove("audio-reading");
              btn.textContent = "🎤 הקרא בקול";
            };
            window.speechSynthesis.speak(utter);
          }
        });
      });
    });
  }

  // ========= Inline mini-quiz inside the lesson concept card =========
  // Flow: pick an MC question (from bank if exists, else auto-generate).
  // If correct → applyAnswer mc=true; if concept needs fill, follow up with one fill question.
  // Pass both → level advances; render refreshes to show new level.
  function startConceptInlineQuiz(card, lesson, concept, stage) {
    const sc = getScore(lesson.id, concept.conceptName);
    if (!stage) {
      // Auto-detect: if user passed MC at this level but not Fill, jump to fill
      if (sc.level < 7 && sc.passedMC && needsCodeFill(concept) && !sc.passedFill) {
        stage = "fill";
      } else {
        stage = "mc";
      }
    }
    const slot = card.querySelector(".concept-quiz-slot");
    if (!slot) return;

    if (stage === "mc") {
      const q = pickMCQuestionForConcept(lesson, concept);
      if (!q) {
        slot.innerHTML = `<div class="concept-quiz-empty">לא נמצאה שאלה זמינה למושג זה.</div>`;
        return;
      }
      slot.innerHTML = `
        <div class="concept-inline-quiz" data-stage="mc">
          <div class="ciq-head">🅰️ שאלה אמריקנית</div>
          <div class="ciq-question">${esc(q.question).replace(/\n/g, "<br>")}</div>
          ${q.codeBlock ? `<div class="code-box"><pre><code>${esc(q.codeBlock)}</code></pre></div>` : ""}
          <div class="ciq-options">
            ${q.options
              .map(
                (opt, i) =>
                  `<button class="ciq-option" data-i="${i}">${esc(opt)}</button>`,
              )
              .join("")}
          </div>
          <div class="ciq-feedback"></div>
        </div>`;

      slot.querySelectorAll(".ciq-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          const sel = parseInt(btn.dataset.i, 10);
          const correct = sel === q.correctIndex;
          slot.querySelectorAll(".ciq-option").forEach((o) => {
            o.classList.add("disabled");
            const i = parseInt(o.dataset.i, 10);
            if (i === q.correctIndex) o.classList.add("correct");
            else if (i === sel) o.classList.add("wrong");
          });
          handleConceptQuizAnswer(card, lesson, concept, "mc", correct, q);
        });
      });
    } else if (stage === "fill") {
      const fill = makeCodeFill(concept);
      if (!fill) {
        // No code-fill possible; mark as advanced via mc only
        const result = applyAnswer(lesson.id, concept.conceptName, concept, "fill", true);
        slot.innerHTML = renderQuizResultBlock(true, "fill", result, "אין דוגמת קוד למושג זה — קודמת אוטומטית.");
        renderContent();
        return;
      }
      slot.innerHTML = `
        <div class="concept-inline-quiz" data-stage="fill">
          <div class="ciq-head">✍️ עכשיו השלם את הקוד</div>
          <div class="ciq-hint">${esc(`אורך התשובה: ${fill.answer.length} תווים. אות ראשונה: "${fill.answer[0]}".`)}</div>
          <div class="code-box"><pre><code>${esc(fill.blanked).replace(/____/g, '<span class="tq-code-blank">____</span>')}</code></pre></div>
          <div class="ciq-fill-row">
            <input type="text" class="ciq-fill-input" placeholder="הקלד את הטוקן החסר..." dir="ltr" autocomplete="off" spellcheck="false" />
            <button class="ciq-submit primary">✅ בדוק</button>
          </div>
          <div class="ciq-feedback"></div>
        </div>`;

      const input = slot.querySelector(".ciq-fill-input");
      const submitBtn = slot.querySelector(".ciq-submit");
      const submit = () => {
        const userAns = (input.value || "").trim();
        if (!userAns) return;
        const correct =
          userAns.toLowerCase() === (fill.answer || "").toLowerCase();
        input.disabled = true;
        submitBtn.disabled = true;
        input.classList.add(correct ? "correct" : "wrong");
        handleConceptQuizAnswer(card, lesson, concept, "fill", correct, {
          answer: fill.answer,
        });
      };
      submitBtn.addEventListener("click", submit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          submit();
        }
      });
      input.focus();
    }
  }

  function pickMCQuestionForConcept(lesson, concept) {
    const sc = getScore(lesson.id, concept.conceptName);
    const bank = bankByConcept(lesson.id, concept.conceptName);
    if (bank.mc.length > 0) {
      // Preference order:
      // 1. Curated, same level
      // 2. Curated, any level
      // 3. Seeded, same level
      // 4. Any seeded
      const curatedSame = bank.mc.filter((q) => !q._seeded && q.level === sc.level);
      if (curatedSame.length) return curatedSame[window.RNG.int(curatedSame.length)];
      const curatedAny = bank.mc.filter((q) => !q._seeded);
      if (curatedAny.length) return curatedAny[window.RNG.int(curatedAny.length)];
      const seededSame = bank.mc.filter((q) => q.level === sc.level);
      if (seededSame.length) return seededSame[window.RNG.int(seededSame.length)];
      return bank.mc[window.RNG.int(bank.mc.length)];
    }
    const auto = buildQuestion({ lesson, concept });
    if (auto && auto.kind === "mc") return auto;
    return null;
  }

  function handleConceptQuizAnswer(card, lesson, concept, kind, correct, qInfo) {
    const levelBefore = getScore(lesson.id, concept.conceptName).level;
    const result = applyAnswer(
      lesson.id,
      concept.conceptName,
      concept,
      kind,
      correct,
    );

    // Build feedback message
    let msg = "";
    if (correct) {
      if (result.advanced) {
        const nl = LEVEL_INFO[result.newLevel];
        msg =
          result.newLevel === 7
            ? `🏆 כל הכבוד! הגעת לרמת מאסטר במושג זה!`
            : `⬆️ עלית מרמה ${levelBefore} לרמה ${result.newLevel} (${nl.icon} ${nl.label})!`;
      } else if (kind === "mc") {
        msg = needsCodeFill(concept)
          ? `נכון! ✅ עכשיו השלם את הקוד למטה כדי לקדם רמה.`
          : `נקודה ל-MC. בקרוב קודמת רמה.`;
      } else {
        msg = `נקודה להשלמת קוד. ענה גם על השאלה האמריקנית כדי לקדם רמה.`;
      }
    } else {
      const wrongHint =
        kind === "fill" && qInfo && qInfo.answer
          ? ` התשובה הנכונה: <code>${esc(qInfo.answer)}</code>.`
          : "";
      msg = `הרמה לא יורדת — נסה רמה פשוטה יותר או נסה שוב.${wrongHint}`;
    }

    // Inject feedback into the relevant body's .ciq-feedback div
    const bodyId = kind === "mc" ? "cs-mc-body" : "cs-fill-body";
    const body = document.getElementById(bodyId);
    const fb = body?.querySelector(".ciq-feedback");
    if (fb) {
      fb.innerHTML = `
        <div class="ciq-fb ${correct ? "correct" : "wrong"}">
          <strong>${correct ? "✅ נכון!" : "❌ לא מדויק."}</strong> ${msg}
        </div>
        ${
          !correct
            ? `<div class="ciq-actions">
                 <button class="concept-btn simplify" data-action="simplify-after-wrong">🤔 הצג רמה פשוטה יותר</button>
                 <button class="concept-btn ghost" data-action="retry">🔁 נסה שוב</button>
               </div>`
            : ""
        }`;

      // Wire post-wrong actions
      fb.querySelector('[data-action="simplify-after-wrong"]')?.addEventListener(
        "click",
        () => {
          const k = conceptKey(lesson.id, concept.conceptName);
          const cur =
            conceptViewOverride[k] ||
            Math.min(6, Math.max(1, getScore(lesson.id, concept.conceptName).level));
          conceptViewOverride[k] = Math.max(1, cur - 1);
          renderContent();
        },
      );
      fb.querySelector('[data-action="retry"]')?.addEventListener("click", () => {
        // Re-render the auto-quiz so a fresh question loads
        autoRenderConceptQuiz(card, lesson, concept);
      });
    }

    // Auto-progression: refresh after a short pause
    if (result.advanced) {
      setTimeout(() => renderContent(), 1100); // re-render whole lesson menu (level changed)
    } else if (correct) {
      // MC passed but Fill remains (or vice versa) — refresh stages so "✅ done" shows
      setTimeout(() => autoRenderConceptQuiz(card, lesson, concept), 1000);
    }
  }

  function renderQuizResultBlock(correct, kind, result, msg) {
    return `<div class="ciq-fb ${correct ? "correct" : "wrong"}">
      <strong>${correct ? "✅" : "❌"}</strong> ${msg}
    </div>`;
  }

  function cssEscape(s) {
    return String(s).replace(/(["'\\])/g, "\\$1");
  }

  // =========== QUIZ ENGINE ===========
  function renderQuiz() {
    const lesson = window.LESSONS_DATA.find((l) => l.id === currentLessonId);
    if (!lesson || !lesson.quiz || lesson.quiz.length === 0) {
      quizSection.style.display = "none";
      return;
    }

    quizSection.style.display = "block";
    quizSubmitBtn.style.display = "inline-flex";
    quizResetBtn.style.display = "none";
    quizResults.style.display = "none";

    quizBody.innerHTML = lesson.quiz
      .map(
        (q, qIndex) => `
      <div class="quiz-question" data-index="${qIndex}" data-correct="${q.correct}">
        <div class="quiz-question-text"><span class="q-num">שאלה ${qIndex + 1}:</span> ${esc(q.question)}</div>
        <div class="quiz-options">
          ${q.options
            .map(
              (opt, oIndex) => `
            <label class="quiz-option" data-option="${oIndex}">
              <input type="radio" name="q${qIndex}" value="${oIndex}" />
              <span>${esc(opt)}</span>
            </label>
          `,
            )
            .join("")}
        </div>
        <div class="quiz-explanation-text">💡 ${esc(q.explanation || "")}</div>
      </div>
    `,
      )
      .join("");

    // Option click handler
    quizBody.querySelectorAll(".quiz-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        const radio = opt.querySelector('input[type="radio"]');
        radio.checked = true;
        opt
          .closest(".quiz-options")
          .querySelectorAll(".quiz-option")
          .forEach((o) => o.classList.remove("selected"));
        opt.classList.add("selected");
      });
    });
  }

  // Quiz Submit
  quizSubmitBtn.addEventListener("click", () => {
    const questions = quizBody.querySelectorAll(".quiz-question");
    let correct = 0;
    let total = questions.length;
    let allAnswered = true;

    questions.forEach((qEl) => {
      const selected = qEl.querySelector('input[type="radio"]:checked');
      if (!selected) {
        allAnswered = false;
        return;
      }

      const correctIndex = parseInt(qEl.dataset.correct);
      const selectedIndex = parseInt(selected.value);

      qEl.classList.add("answered");

      if (selectedIndex === correctIndex) {
        correct++;
        qEl.classList.add("correct");
        qEl
          .querySelector(`.quiz-option[data-option="${selectedIndex}"]`)
          .classList.add("correct-answer");
      } else {
        qEl.classList.add("wrong");
        qEl
          .querySelector(`.quiz-option[data-option="${selectedIndex}"]`)
          .classList.add("wrong-answer");
        qEl
          .querySelector(`.quiz-option[data-option="${correctIndex}"]`)
          .classList.add("correct-answer");
      }

      // Disable further clicks
      qEl.querySelectorAll("input").forEach((r) => (r.disabled = true));
      qEl
        .querySelectorAll(".quiz-option")
        .forEach((o) => (o.style.cursor = "default"));
    });

    if (!allAnswered) {
      alert("אנא ענו על כל השאלות לפני הבדיקה!");
      return;
    }

    const pct = Math.round((correct / total) * 100);
    quizScore.textContent = `${correct} / ${total} — ${pct}%`;

    if (pct === 100) {
      quizScore.className = "quiz-score perfect";
      quizFeedback.textContent = "🏆 מושלם! ענית נכון על כל השאלות! ציון 100!";
    } else if (pct >= 70) {
      quizScore.className = "quiz-score good";
      quizFeedback.textContent =
        "👏 עבודה טובה! עברו על ההסברים של השאלות שפספסתם.";
    } else {
      quizScore.className = "quiz-score needs-work";
      quizFeedback.textContent =
        "💪 לא נורא! חזרו על החומר ונסו שוב. ההצלחה בדרך!";
    }

    quizResults.style.display = "block";
    quizSubmitBtn.style.display = "none";
    quizResetBtn.style.display = "inline-flex";

    // Mark completed
    if (pct === 100 && currentLessonId) {
      quizCompleted[currentLessonId] = true;
      const btn = document.querySelector(
        `.lesson-nav-btn[data-id="${currentLessonId}"]`,
      );
      if (btn) btn.classList.add("completed");
      updateProgress();
    }
  });

  // Quiz Reset
  quizResetBtn.addEventListener("click", () => {
    renderQuiz();
  });

  // =========== PROGRESS (level-based) ===========
  function updateProgress() {
    if (!window.LESSONS_DATA) return;
    const all = allConcepts();
    if (all.length === 0) return;

    let totalLevel = 0;
    let masters = 0;
    all.forEach(({ lesson, concept }) => {
      const sc = getScore(lesson.id, concept.conceptName);
      totalLevel += sc.level;
      if (sc.level >= 7) masters++;
    });
    const avgLevel = totalLevel / all.length;
    // Map [1, 7] → [0%, 100%]
    const pct = Math.max(0, Math.min(100, Math.round(((avgLevel - 1) / 6) * 100)));

    const progressBar = document.getElementById("global-progress");
    const progressText = document.getElementById("progress-text");
    if (progressBar) progressBar.style.width = pct + "%";
    if (progressText) {
      progressText.textContent =
        `${masters}/${all.length} מאסטר 🏆 · רמה ממוצעת ${avgLevel.toFixed(1)}/7 (${pct}%)`;
    }
  }

  // Hook progress update + SRS scheduling to score changes — wrap the original
  // applyAnswer so any call site (trainer, guide, lesson inline quiz) refreshes
  // the global progress bar AND advances the SRS interval/ease for the concept.
  const _origApplyAnswer = applyAnswer;
  applyAnswer = function (lessonId, conceptName, concept, kind, correct) {
    const r = _origApplyAnswer(lessonId, conceptName, concept, kind, correct);
    try { updateProgress(); } catch (_) {}
    try {
      if (window.SRS && typeof window.SRS.update === "function") {
        const sc = ensureScore(lessonId, conceptName);
        window.SRS.update(sc.srsState, !!correct, getDifficulty(concept));
        saveScores();
      }
    } catch (_) {}
    return r;
  };

  // =========== UTILITIES ===========
  function esc(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // =========== BANK VERSIONING (Track A — A2) ===========
  // The bank declares its version + lastUpdate + changelog at the top of
  // data/questions_bank.js (preserved as window.QUESTIONS_BANK_VERSION etc.
  // because content-loader.js reshapes window.QUESTIONS_BANK).
  // Behaviour:
  //   1. Always console.log the active version on boot.
  //   2. If the user has a stored version that no longer matches AND they
  //      have any saved scores/proficiency, offer to refresh local progress.
  (function bankVersionCheck() {
    const version =
      (typeof window.QUESTIONS_BANK_VERSION === "string" && window.QUESTIONS_BANK_VERSION) ||
      (window.QUESTIONS_BANK && window.QUESTIONS_BANK._version) ||
      "unknown";
    const lastUpdate =
      (typeof window.QUESTIONS_BANK_LAST_UPDATE === "string" && window.QUESTIONS_BANK_LAST_UPDATE) ||
      (window.QUESTIONS_BANK && window.QUESTIONS_BANK._lastUpdate) ||
      "";
    console.log(
      `[LumenPortal] Bank v${version}` + (lastUpdate ? ` (${lastUpdate})` : ""),
    );

    const VERSION_KEY = "lumenportal:bankVersion:v1";
    let stored = null;
    try { stored = localStorage.getItem(VERSION_KEY); } catch (_) {}

    if (stored && stored !== version) {
      const hasProgress =
        Object.keys(scores).length > 0 || Object.keys(proficiency).length > 0;
      if (hasProgress) {
        const ok = confirm(
          `🔄 מאגר השאלות עודכן מגרסה ${stored} → ${version}.\n` +
            `האם לרענן את ההתקדמות המקומית? (זה יאפס טבלת ציונים ו-SRS)`,
        );
        if (ok) {
          scores = {};
          proficiency = {};
          saveScores();
          saveProficiency();
        }
      }
    }

    try { localStorage.setItem(VERSION_KEY, version); } catch (_) {}
  })();

  // =========== MASTERY STATES CSS (Track A — A5) ===========
  // Append a small style block (gray / blue / yellow / orange / green) so the
  // Knowledge Map can show the 5 buckets without touching style.css.
  (function injectMasteryStyles() {
    if (document.getElementById("track-a-mastery-styles")) return;
    const css = `
      .km-mastery-badge { display:inline-block; padding:2px 8px; border-radius:999px; font-size:0.78em; font-weight:700; margin-right:6px; }
      .km-mastery-new      { background:#e0e0e0; color:#444; }
      .km-mastery-learning { background:#cfe3ff; color:#0b3a82; }
      .km-mastery-review   { background:#fff3b5; color:#7a5b00; }
      .km-mastery-at-risk  { background:#ffd8a8; color:#7a3d00; }
      .km-mastery-mastered { background:#c8f5d0; color:#0e5a25; }
      .km-due-badge { display:inline-block; padding:2px 6px; border-radius:6px; background:#ffd8a8; color:#7a3d00; font-size:0.78em; font-weight:700; margin-right:6px; }
      .km-concept-row.is-due { box-shadow: inset 3px 0 0 0 #ff8c1a; }
    `;
    const style = document.createElement("style");
    style.id = "track-a-mastery-styles";
    style.textContent = css;
    document.head.appendChild(style);
  })();

  // Track A — A5: extend the existing #km-filter dropdown with mastery-state
  // options. Done programmatically so we don't touch index.html (Track D's
  // territory). Idempotent — guards against double-injection on reload.
  (function injectMasteryFilterOptions() {
    const sel = document.getElementById("km-filter");
    if (!sel || sel.dataset.trackAExtended === "1") return;
    const extra = [
      { value: "learning", label: "📘 בלימוד" },
      { value: "review", label: "📗 בחזרה" },
      { value: "at-risk", label: "⚠️ בסיכון" },
      { value: "due", label: "🔁 הגיע מועד חזרה" },
    ];
    extra.forEach((o) => {
      const opt = document.createElement("option");
      opt.value = o.value;
      opt.textContent = o.label;
      sel.appendChild(opt);
    });
    sel.dataset.trackAExtended = "1";
  })();

  // =========== BOOT ===========
  setTimeout(() => {
    initSidebar();
    // Mark Home tab as active on first load
    document.getElementById("open-home")?.classList.add("active");
  }, 150);
});
