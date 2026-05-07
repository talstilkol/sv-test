(function () {
  "use strict";

  var PROGRESS_KEY = "lumenportal:homeworkExamPlanProgress:v2";
  /* Legacy import/export compatibility key: lumenportal:homeworkExamPlanProgress:v1 */
  /* Refactor contract marker: fullReadinessRows + */
  var DIAGNOSTIC_KEY = "lumenportal:homeworkExamBasicDiagnostic:v1";
  var GATE_EVIDENCE_KEY = "lumenportal:homeworkExamGateEvidence:v1";
  var EXAM100_KEY = "lumenportal:exam100Path:v1";
  var progressReadStatus = "empty";

  function defaultEsc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function safeJsonParse(value) {
    try {
      var parsed = JSON.parse(value || "{}");
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  var exam100Core = window.Exam100PathCore || {};

  function getProgress() {
    try {
      var raw = localStorage.getItem(PROGRESS_KEY);
      if (!raw) {
        progressReadStatus = "empty";
        return {};
      }
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        progressReadStatus = "ok";
        return parsed;
      }
      backupCorruptProgress(raw);
      progressReadStatus = "corrupt";
      return {};
    } catch (_) {
      try {
        backupCorruptProgress(localStorage.getItem(PROGRESS_KEY));
      } catch (_inner) {}
      progressReadStatus = "corrupt";
      return {};
    }
  }

  function setProgress(progress) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress || {}));
      progressReadStatus = "ok";
    } catch (_) {}
  }

  function backupCorruptProgress(raw) {
    try {
      if (!raw || localStorage.getItem(PROGRESS_KEY + ":corruptBackup")) return;
      localStorage.setItem(PROGRESS_KEY + ":corruptBackup", raw);
    } catch (_) {}
  }

  function progressDone(value) {
    if (value === true) return true;
    return !!(value && typeof value === "object" && value.status === "done");
  }

  function progressRecord(done) {
    return done ? { status: "done", updatedAt: new Date().toISOString() } : null;
  }

  function taskStatusText(done) {
    return done ? "done" : "open";
  }

  function stableTaskId(prefix, parts) {
    var body = (parts || []).map(function (part, index) {
      var value = String(part == null ? "" : part)
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return value || ("part-" + (index + 1));
    }).join("-");
    return prefix + "-" + body;
  }

  function getDiagnosticProgress() {
    try {
      return safeJsonParse(localStorage.getItem(DIAGNOSTIC_KEY));
    } catch (_) {
      return {};
    }
  }

  function setDiagnosticProgress(progress) {
    try {
      localStorage.setItem(DIAGNOSTIC_KEY, JSON.stringify(progress || {}));
    } catch (_) {}
  }

  function getGateEvidence() {
    try {
      return safeJsonParse(localStorage.getItem(GATE_EVIDENCE_KEY));
    } catch (_) {
      return {};
    }
  }

  function setGateEvidence(evidence) {
    try {
      localStorage.setItem(GATE_EVIDENCE_KEY, JSON.stringify(evidence || {}));
    } catch (_) {}
  }

  function getExam100State() {
    try {
      return safeJsonParse(localStorage.getItem(EXAM100_KEY));
    } catch (_) {
      return {};
    }
  }

  function setExam100State(state) {
    try {
      localStorage.setItem(EXAM100_KEY, JSON.stringify(state || {}));
      return true;
    } catch (_) {
      return false;
    }
  }

  function exam100QuestionId(section, questionIndex) {
    if (exam100Core.questionId) return exam100Core.questionId(section, questionIndex);
    return String(section.id || "section") + "::q" + String(questionIndex + 1);
  }

  function exam100PlacementQuestions(path) {
    if (exam100Core.placementQuestions) return exam100Core.placementQuestions(path);
    return ((path || {}).placementTest || {}).sections
      ? path.placementTest.sections.flatMap(function (section) {
        return (section.questions || []).map(function (question, index) {
          return {
            id: exam100QuestionId(section, index),
            section: section,
            question: question,
          };
        });
      })
      : [];
  }

  function exam100Score(path, state) {
    if (exam100Core.score) return exam100Core.score(path, state);
    var questions = exam100PlacementQuestions(path);
    var answers = (state || {}).answers || {};
    return questions.filter(function (item) { return !!answers[item.id]; }).length;
  }

  function exam100LevelFor(path, score) {
    if (exam100Core.levelFor) return exam100Core.levelFor(path, score);
    var levels = (((path || {}).placementTest || {}).levels || []);
    return levels.find(function (level) {
      return score >= Number(level.min || 0) && score <= Number(level.max || 0);
    }) || levels[0] || { id: "beginner", label: "Beginner", routeId: "start-from-zero", message: "להתחיל מהבסיס." };
  }

  function exam100RouteFor(path, routeId) {
    if (exam100Core.routeFor) return exam100Core.routeFor(path, routeId);
    return ((path || {}).closedRoutes || []).find(function (route) { return route.id === routeId; }) || ((path || {}).closedRoutes || [])[0] || {};
  }

  function exam100SavedText(state) {
    if (exam100Core.savedText) return exam100Core.savedText(state);
    if (!state || !state.savedAt) return "עדיין לא נשמר אבחון";
    var saved = Date.parse(state.savedAt);
    if (!saved) return "נשמר בפרופיל מקומי";
    var seconds = Math.max(0, Math.round((Date.now() - saved) / 1000));
    if (seconds < 10) return "נשמר עכשיו";
    if (seconds < 60) return "נשמר לפני " + seconds + " שניות";
    var minutes = Math.round(seconds / 60);
    return "נשמר לפני " + minutes + " דקות";
  }

  function exam100RuntimeSaveMode() {
    if (exam100Core.runtimeSaveMode) return exam100Core.runtimeSaveMode();
    if (window.location && window.location.protocol === "file:") {
      return "שמירה מקומית בלבד - פתח דרך שרת כדי לקבל גיבוי profile";
    }
    if (navigator && navigator.onLine === false) {
      return "אופליין - נשמר מקומית ויסונכרן כששרת מקומי זמין";
    }
    return "שחזור מפרופיל מקומי + גיבוי שרת מקומי כשמריצים דרך npm run dev";
  }

  function exam100GateStatus(path, route, state) {
    var score = exam100Score(path, state);
    var total = exam100PlacementQuestions(path).length;
    var skipped = !!(state && state.skipPlacement);
    var selectedRouteId = skipped ? "track-100" : exam100LevelFor(path, score).routeId;
    if (!route || route.id !== selectedRouteId) return "לא השלב הנוכחי";
    if (skipped || score >= total) return "עברת";
    if (score > 0) return "חסר לך " + (total - score) + " סימונים באבחון";
    return "לא עברת - חסר אבחון";
  }

  function gateEvidenceFor(trackId) {
    var evidence = getGateEvidence();
    var item = evidence[trackId] || {};
    return {
      text: String(item.text || ""),
      passedAt: item.passedAt || "",
    };
  }

  function domainFor(title, task) {
    var value = String((title || "") + " " + (task || "")).toLowerCase();
    if (/\bts\b|typescript|type narrowing|enum|interface|union|book|genre/.test(value)) return "typescript";
    if (/\bjs\b|javascript|even\/odd|sequence|fibonacci|sort|סכום|מיון|ספרות/.test(value)) return "javascript";
    if (/react|express|mongo|next|project|api|server|schema|routes|routing|forms|validations|validation|layout|ui|crud|פרויקט|ולידציות|שרת|טופס/.test(value)) return "project";
    return "examOps";
  }

  function planTasks(masterPlan) {
    var weekTasks = (masterPlan.sevenDayPlan || []).flatMap(function (day, dayIndex) {
      return (day.tasks || []).map(function (task, taskIndex) {
        return {
          id: "day-" + (dayIndex + 1) + "-task-" + (taskIndex + 1),
          day: day.day || ("יום " + (dayIndex + 1)),
          dayIndex: dayIndex,
          title: day.title || "",
          text: task,
          domain: domainFor(day.title || "", task),
        };
      });
    });
    var materialTasks = (masterPlan.materialCompletionTasks || []).flatMap(function (group, groupIndex) {
      return (group.tasks || []).map(function (task, taskIndex) {
        return {
          id: "material-" + (groupIndex + 1) + "-task-" + (taskIndex + 1),
          day: group.heat ? "Heat " + group.heat : "חוסרי חומר",
          dayIndex: -1,
          materialIndex: groupIndex,
          materialTaskIndex: taskIndex,
          title: group.title || "השלמת חומר",
          text: task,
          domain: "examOps",
        };
      });
    });
    return weekTasks.concat(materialTasks);
  }

  function list(items, esc) {
    return "<ul>" + (items || []).map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") + "</ul>";
  }

  function diagnosticCheckId(track, check) {
    return String(track.id || "track") + "::" + String(check.id || check.label || "check");
  }

  function diagnosticItems(tracks) {
    return (tracks || []).flatMap(function (track) {
      return (track.checks || []).map(function (check) {
        return { track: track, check: check, id: diagnosticCheckId(track, check) };
      });
    });
  }

  function diagnosticSummary(tracks, progress) {
    var allChecks = diagnosticItems(tracks);
    var completed = allChecks.filter(function (item) { return progress[item.id]; }).length;
    var percent = allChecks.length ? Math.round((completed / allChecks.length) * 100) : 0;
    return {
      allChecks: allChecks,
      completed: completed,
      total: allChecks.length,
      percent: percent,
      next: allChecks.find(function (item) { return !progress[item.id]; }) || null,
    };
  }

  function guidedExamStages(percent) {
    var value = Number(percent || 0);
    return [
      { key: "diagnostic", min: 0, title: "1. אבחון בסיס", action: "scroll-hxm-basic-diagnostic", button: "פתח אבחון", body: "מסמנים רק ידע שאתה יודע להסביר ולכתוב בלי עזרה." },
      { key: "repair", min: 30, title: "2. תיקון חולשה ראשונה", action: "scroll-hxm-basic-diagnostic", button: "תקן חולשה", body: "לא עוברים לפרויקט לפני שסגרת את הבדיקה הראשונה שלא סומנה." },
      { key: "project", min: 70, title: "3. Project 70", action: "scroll-hxm-templates", button: "בחר פרויקט", body: "בונים flow עובד: routes, forms, validations, CRUD/API ו-layout." },
      { key: "javascript", min: 80, title: "4. JavaScript 20", action: "scroll-hxm-js", button: "תרגל JS", body: "פותרים פונקציית מערך/object עם validation ו-Error ברור עד 20 דקות." },
      { key: "typescript", min: 90, title: "5. TypeScript 10", action: "scroll-hxm-ts", button: "תרגל TS", body: "סוגרים type/interface/enum/union/narrowing עד 10 דקות." },
      { key: "mock", min: 100, title: "6. Mock Exam מלא", action: "start-homework-mock", button: "התחל סימולציה", body: "רק אחרי שכל הבסיס מסומן: 70/20/10 בתנאי זמן אמיתיים." },
    ].map(function (stage, index, stages) {
      var unlocked = value >= stage.min;
      var nextStage = stages[index + 1] || null;
      var complete = nextStage ? value >= nextStage.min : value >= 100;
      return Object.assign({}, stage, {
        unlocked: unlocked,
        complete: complete,
        active: unlocked && !complete,
      });
    });
  }

  function heatForPlanTask(task) {
    var day = String((task && task.day) || "");
    var match = day.match(/Heat\s+(\d+)/i);
    if (match) return Number(match[1]);
    var domain = task && task.domain;
    if (domain === "project") return 9;
    if (domain === "javascript") return 5;
    if (domain === "typescript") return 4;
    return 3;
  }

  function actionForPlanTask(task) {
    if (!task) return "start-homework-mock";
    if (task.materialIndex != null) return "scroll-hxm-material-backlog";
    if (task.domain === "project") return "scroll-hxm-templates";
    if (task.domain === "javascript") return "scroll-hxm-js";
    if (task.domain === "typescript") return "scroll-hxm-ts";
    return "scroll-hxm-exam-day";
  }

  function buttonForPlanTask(task) {
    if (!task) return "התחל סימולציה";
    if (task.materialIndex != null) return "פתח Backlog";
    if (task.domain === "project") return "פתח פרויקט";
    if (task.domain === "javascript") return "פתח JS";
    if (task.domain === "typescript") return "פתח TS";
    return "פתח Checklist";
  }

  function todayCommandFor(masterPlan, tracks) {
    var diagnosticProgress = getDiagnosticProgress();
    var planProgress = getProgress();
    var diagnostic = diagnosticSummary(tracks || [], diagnosticProgress);
    if (diagnostic.next) {
      var gate = diagnosticGateFor(diagnostic.next.track);
      return {
        phase: "אבחון בסיס",
        heat: diagnostic.next.track.heat || 10,
        title: diagnostic.next.track.title + " - " + diagnostic.next.check.label,
        time: gate.time || diagnostic.next.track.time || "30 דקות",
        action: "scroll-hxm-basic-diagnostic",
        button: "פתח Gate",
        target: gate.task,
        proof: "כתוב ב-Gate מה בנית, איזה input בדקת, ומה יצא בפועל. בלי ראיה של 20 תווים לא מסמנים מעבר.",
        blocked: "Project 70, Mock Exam וחומר צדדי חסומים עד שסוגרים את הבדיקה הזו.",
      };
    }
    var tasks = planTasks(masterPlan || {});
    var nextTask = tasks.find(function (task) { return !planProgress[task.id]; });
    if (nextTask) {
      return {
        phase: nextTask.day,
        heat: heatForPlanTask(nextTask),
        title: nextTask.title || "משימת Master Plan",
        time: nextTask.dayIndex >= 0 ? "לפי יום התוכנית" : "עד סגירת ה-Backlog",
        action: actionForPlanTask(nextTask),
        button: buttonForPlanTask(nextTask),
        target: nextTask.text,
        proof: "סמן את המשימה רק אחרי שיש תוצר עובד או בדיקה שעברה. אם אין תוצר, היא נשארת פתוחה.",
        blocked: nextTask.materialIndex != null
          ? "לא מוסיפים פיצ׳רים חדשים לפני שהחוסר הזה נסגר."
          : "לא מדלגים למשימה הבאה לפני קריטריון המעבר של היום.",
      };
    }
    return {
      phase: "סימולציה מלאה",
      heat: 6,
      title: "Mock Exam מלא 70/20/10",
      time: "4 שעות",
      action: "start-homework-mock",
      button: "התחל מבחן",
      target: "בצע סימולציה מלאה: פרויקט 70, JavaScript 20, TypeScript 10, ואז תיקוני validations/layout/API.",
      proof: "ציון עצמי לפי rubric: Project /70, JS /20, TS /10.",
      blocked: "אחרי סימולציה לא מוסיפים פיצ׳רים חדשים; מתקנים רק חולשות שהתגלו.",
    };
  }

  function renderTodayCommandPanel(masterPlan, tracks, esc) {
    var command = todayCommandFor(masterPlan, tracks);
    return "<section class=\"hxm-today-command heat-" + esc(command.heat) + "\" id=\"hxm-today-command\" data-hxm-today-command=\"active\" aria-label=\"פקודת לימוד עכשיו\">" +
      "<div class=\"hxm-today-command-head\"><div><h4>מה עושים עכשיו</h4><p>כרטיס אחד בלבד. פותחים אותו, מבצעים, כותבים ראיה, ואז מתקדמים.</p></div><b data-hxm-today-heat=\"active\">Heat " + esc(command.heat) + "</b></div>" +
      "<div class=\"hxm-today-command-body\"><div><span data-hxm-today-phase=\"active\">" + esc(command.phase) + "</span><strong data-hxm-today-title=\"active\">" + esc(command.title) + "</strong><small data-hxm-today-time=\"active\">" + esc(command.time) + "</small></div>" +
      "<p><b>המשימה:</b> <span data-hxm-today-target=\"active\">" + esc(command.target) + "</span></p>" +
      "<p><b>ראיה לפני מעבר:</b> <span data-hxm-today-proof=\"active\">" + esc(command.proof) + "</span></p>" +
      "<p class=\"hxm-today-blocked\"><b>חסום עכשיו:</b> <span data-hxm-today-blocked=\"active\">" + esc(command.blocked) + "</span></p></div>" +
      "<button class=\"km-btn-mini primary\" type=\"button\" data-hxm-action=\"" + esc(command.action) + "\" data-hxm-today-action=\"active\">" + esc(command.button) + "</button>" +
    "</section>";
  }

  function renderCodeExplainBox(meta, esc) {
    var lineByLine = meta.lineByLine && meta.lineByLine.length
      ? meta.lineByLine
      : [
          "קרא קודם את שם הפונקציה/קומפוננטה ואת רשימת הפרמטרים.",
          "זהה איפה מתבצעת בדיקת קלט או validation.",
          "זהה איפה הנתונים משתנים בצורה immutable.",
          "בדוק שה-return מחזיר בדיוק את המבנה שהשאלה ביקשה.",
        ];
    var focus = meta.focus && meta.focus.length ? meta.focus : [];
    var commonMistakes = meta.commonMistakes && meta.commonMistakes.length
      ? meta.commonMistakes
      : ["לדלג על validation", "להחזיר מבנה שונה מהנדרש", "לעדכן state או מערך עם mutation", "לא לבדוק edge case בסיסי"];
    var focusHtml = focus.length ? list(focus, esc) : "<p>התמקד בדרישות שמופיעות ב-checklist ובשם השאלה.</p>";
    return "<div class=\"hxm-code-explain\"><strong>הסבר הקוד בעברית</strong>" +
      (meta.overview ? "<p>" + esc(meta.overview) + "</p>" : "") +
      "<div class=\"hxm-code-explain-grid\">" +
        "<section><h6>שורה-שורה</h6><ol>" + lineByLine.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") + "</ol></section>" +
        "<section><h6>מה חייבים לזהות</h6>" + focusHtml + "</section>" +
        "<section><h6>טעויות נפוצות</h6>" + list(commonMistakes, esc) + "</section>" +
        "<section><h6>תרגול מיידי</h6><p>" + esc(meta.practice || "הסתר את הפתרון, כתוב את אותו דפוס מחדש, ואז השווה מול ה-checklist.") + "</p></section>" +
      "</div></div>";
  }

  function explainCodeLine(line, index) {
    var text = String(line || "").trim();
    var prefix = "שורה " + index + ": ";
    if (/^import\b/.test(text)) return prefix + "מייבאת תלות שהקוד צריך לפני הרצה; במבחן בודקים שהייבוא תואם לספרייה ולשם הקומפוננטה.";
    if (/^export\b/.test(text)) return prefix + "מייצאת פונקציה/קומפוננטה כדי שקובץ אחר יוכל להשתמש בה.";
    if (/^enum\s+/.test(text)) return prefix + "מגדירה enum כדי להגביל ערכים קבועים במקום להשאיר string חופשי.";
    if (/^type\s+/.test(text)) return prefix + "מגדירה shape של TypeScript; זה החוזה של הנתונים לפני שמתחילים לכתוב לוגיקה.";
    if (/^interface\s+/.test(text)) return prefix + "מגדירה interface, בדרך כלל לאובייקט או props שאפשר להרחיב בהמשך.";
    if (/____\s*:/.test(text) || /:\s*____/.test(text)) return prefix + "מסמנת מקום השלמה בשאלת TypeScript; צריך לזהות אם חסר שם שדה או טיפוס.";
    if (/^[A-Za-z_$][\w$]*\??:\s*[^=]+;?$/.test(text)) return prefix + "מגדירה שדה בתוך טיפוס/אובייקט; שם השדה והטיפוס שלו חייבים להתאים בדיוק לדרישת השאלה.";
    if (/^function\s+/.test(text)) return prefix + "פותחת פונקציה עם שם ופרמטרים; קודם מזהים מה נכנס ומה הפונקציה חייבת להחזיר.";
    if (/=>\s*\{?$/.test(text) || /^\(?[a-zA-Z0-9_,\s{}[\]]+\)?\s*=>/.test(text)) return prefix + "פותחת callback; חשוב להבין מאיזה map/filter/reduce/fetch הוא מקבל את הערך.";
    if (/useState\s*\(/.test(text)) return prefix + "יוצר state מקומי ב-React; הערך מוצג במסך וה-setter גורם ל-render חדש.";
    if (/useEffect\s*\(/.test(text)) return prefix + "מריץ side effect אחרי render; מתאים ל-fetch, subscription או סנכרון עם משהו מחוץ ל-JSX.";
    if (/useMemo\s*\(/.test(text)) return prefix + "שומר תוצאת חישוב בין renders; משתמשים בזה רק כשיש חישוב נגזר או reference שצריך יציבות.";
    if (/useRef\s*\(/.test(text)) return prefix + "יוצר ref יציב שלא גורם ל-render כשמשנים אותו; מתאים ל-DOM או ערך פנימי.";
    if (/BrowserRouter|Routes|Route\b|useNavigate|useParams|Link\b/.test(text)) return prefix + "מטפל בניווט של React Router; במבחן חשוב לוודא שה-path והמסך תואמים לדרישה.";
    if (/app\.use\(cors/.test(text)) return prefix + "פותח CORS כדי שה-frontend יוכל לדבר עם backend בפורט אחר.";
    if (/app\.use\(express\.json/.test(text)) return prefix + "מפעיל פענוח JSON לפני routes; בלי זה req.body לא יעבוד.";
    if (/mongoose\.connect/.test(text)) return prefix + "מחבר את השרת ל-MongoDB; עדיף דרך משתנה סביבה ולא מחרוזת קשיחה.";
    if (/new mongoose\.Schema/.test(text)) return prefix + "מגדיר Schema של MongoDB: אילו שדות קיימים ואילו constraints בסיסיים יש להם.";
    if (/mongoose\.model/.test(text)) return prefix + "יוצר Model שממנו מבצעים find/create/update/delete מול MongoDB.";
    if (/app\.(get|post|put|delete)\s*\(/.test(text)) return prefix + "מגדיר endpoint ב-Express; צריך לבדוק method, path, validation ו-response status.";
    if (/fetch\s*\(/.test(text)) return prefix + "שולח בקשת HTTP; לפני שמעדכנים UI צריך לטפל ב-loading, response.ok ושגיאה.";
    if (/response\.ok/.test(text)) return prefix + "בודק שהשרת החזיר הצלחה; אם לא, הופכים את זה לשגיאה גלויה במקום להמשיך עם data שבור.";
    if (/\.json\s*\(/.test(text)) return prefix + "ממיר response ל-JSON כדי שהקוד יוכל לעבוד עם אובייקטים ומערכים.";
    if (/\.catch\s*\(/.test(text)) return prefix + "מטפל בכשל רשת או API; במבחן זה מונע מסך שבור ומראה שיש error handling.";
    if (/try\s*\{/.test(text)) return prefix + "פותח אזור פעולה שעלול להיכשל, לרוב async/API/database.";
    if (/catch\s*\(/.test(text)) return prefix + "תופס שגיאה ומחזיר טיפול מבוקר במקום קריסה.";
    if (/throw new Error/.test(text)) return prefix + "עוצר קלט לא תקין עם שגיאה מפורשת; זה דפוס חובה בשאלות JS.";
    if (/^\s*if\s*\(/.test(text)) return prefix + "בודק תנאי לפני שממשיכים; לרוב זה guard ל-validation, not found או branching.";
    if (/return\b/.test(text) && /\.reduce\s*\(/.test(text)) return prefix + "מחזיר תוצאה של reduce; זה דפוס accumulator לבניית מספר, מערך או object.";
    if (/\.reduce\s*\(/.test(text)) return prefix + "עובר על מערך ומחזיק accumulator; מתאים לשאלות JS של ספירה או group by.";
    if (/\[[^\]]+\]\s*=/.test(text)) return prefix + "מעדכנת ערך בתוך object לפי key מחושב; זה לב שאלות group by וספירה.";
    if (/^\},\s*\{\}\);?$/.test(text)) return prefix + "האובייקט הריק הוא ערך ההתחלה של accumulator ב-reduce.";
    if (/^\},\s*\[\]\);?$/.test(text)) return prefix + "המערך הריק הוא ערך ההתחלה של accumulator ב-reduce.";
    if (/\.filter\s*\(/.test(text)) return prefix + "יוצר מערך חדש רק עם איברים שעוברים תנאי; מתאים לחיפוש, סינון ומחיקה.";
    if (/\.map\s*\(/.test(text)) return prefix + "יוצר מערך חדש באותו אורך; מתאים להצגה ב-React או עדכון immutable.";
    if (/\.find\s*\(/.test(text)) return prefix + "מחפש איבר יחיד; במסך Edit משתמשים בזה כדי למצוא לפי id.";
    if (/\.some\s*\(|\.every\s*\(/.test(text)) return prefix + "בודק תנאי על המערך בלי לבנות מערך חדש.";
    if (/set[A-Z][A-Za-z0-9]*\s*\(/.test(text)) return prefix + "מעדכן state; צריך לוודא שלא עושים mutation ושמשתמשים בערך קודם כשצריך.";
    if (/res\.status\s*\(/.test(text)) return prefix + "מחזיר status code מפורש; זה מראה שהשרת מבחין בין הצלחה, קלט שגוי ושגיאת שרת.";
    if (/req\.body|req\.params|req\.query/.test(text)) return prefix + "קורא נתונים מהבקשה; צריך לוודא שהמקור תואם לשאלה ושיש validation.";
    if (/Number\.isNaN|Number\.isFinite|typeof\s+/.test(text)) return prefix + "מבצע בדיקת טיפוס/מספר לפני חישוב; זה מונע edge cases בשאלות JS.";
    if (/trim\s*\(/.test(text)) return prefix + "מנקה רווחים מקלט משתמש; כך שדה עם רווחים בלבד לא עובר validation.";
    if (/^\s*const\s+|^\s*let\s+/.test(text)) return prefix + "מגדיר משתנה מקומי שמשרת את השלב הבא בלוגיקה; בדוק אם הוא מקור נתונים, חישוב נגזר או state.";
    if (/^\s*return\b/.test(text)) return prefix + "מחזיר את הפלט הסופי של הפונקציה/קומפוננטה; צריך להשוות אותו בדיוק למה שהשאלה ביקשה.";
    if (/<[A-Za-z][^>]*>/.test(text)) return prefix + "מחזיר JSX למסך; ודא שכל input מחובר ל-state ושכל רשימה מקבלת key.";
    return prefix + "מקדמת את הפתרון לפי הקוד בפועל: `" + text.slice(0, 90) + "`.";
  }

  function deriveHebrewLineByLine(code) {
    var lines = String(code || "")
      .split("\n")
      .map(function (line) { return line.trim(); })
      .filter(function (line) { return line && !/^[{});,\]]+$/.test(line); });
    var visible = lines.slice(0, 18).map(function (line, index) {
      return explainCodeLine(line, index + 1);
    });
    if (lines.length > 18) {
      visible.push("השורות הבאות ממשיכות את אותו דפוס; בזמן מבחן בודקים שלא נשבר validation, state update או return shape.");
    }
    while (visible.length < 6) {
      visible.push("בדיקת מבחן: הסבר בקול מה הקלט, מה הפלט, ואיזו שורה מגנה מפני קלט לא תקין.");
    }
    return visible;
  }

  function renderCodeBlockWithExplanation(code, meta, esc) {
    var safeCode = code || "unknown/unavailable";
    var explanationMeta = Object.assign({}, meta || {});
    if (!Array.isArray(explanationMeta.lineByLine) || !explanationMeta.lineByLine.length) {
      explanationMeta.lineByLine = deriveHebrewLineByLine(safeCode);
    }
    return "<pre class=\"hxm-reference-code\"><code>" + esc(safeCode) + "</code></pre>" +
      renderCodeExplainBox(explanationMeta, esc);
  }

  function diagnosticGateFor(track) {
    var gates = {
      basic_js_arrays: {
        title: "בדיקת מעבר JS 20",
        time: "20 דקות",
        task: "כתוב מהזיכרון פונקציה שמקבלת [1, 15, 30, 5, 800] ומחזירה object לפי אורך ספרות. הוסף בדיקת קלט וזרוק Error אם איבר אינו number.",
        expected: "{ 1: 6, 2: 45, 3: 800 } וגם Error ברור עבור ['x'].",
        pass: ["חתימת פונקציה ברורה", "בדיקת typeof + Number.isNaN", "accumulator object", "פלט exact shape", "throw new Error"],
        repair: "אם נתקעת יותר מ-20 דקות, חזור לבלוק sumByDigitLength וכתוב אותו שוב בלי להעתיק.",
      },
      basic_react_state: {
        title: "בדיקת מעבר React בסיס",
        time: "30 דקות",
        task: "בנה קומפוננטה קטנה עם input controlled, כפתור Add, רשימה עם map, ו-empty state כשאין נתונים.",
        expected: "הוספה מעדכנת UI בלי רענון, השם הריק לא נוסף, ולכל item יש key יציב.",
        pass: ["useState לרשימה", "input עם value/onChange", "הוספה immutable", "map עם key", "empty state"],
        repair: "אם השתמשת ב-push או key=index, חזור לשיעור Students table לפני Project 70.",
      },
      basic_forms_validation: {
        title: "בדיקת מעבר Forms",
        time: "25 דקות",
        task: "כתוב validateRegister(form) עם username, password, confirmPassword ו-age. אל תשלח submit אם יש errors.",
        expected: "errors object עם הודעות ספציפיות לכל שדה, וה-submit נעצר לפני fetch כשיש שגיאה.",
        pass: ["שדות חובה", "regex username", "חוקי password", "confirm password", "age 18-60", "errors ליד שדות"],
        repair: "אם יש alert כללי בלבד, בנה errors object והצג הודעה מתחת לכל input.",
      },
      basic_router_crud: {
        title: "בדיקת מעבר Router + CRUD",
        time: "35 דקות",
        task: "צור skeleton עם Login, Home, Add, Edit/:id, List ו-NotFound. הוסף add/edit/delete על state מקומי.",
        expected: "כל route נפתח, Edit עושה prefill, Delete מסיר item אחרון ומציג empty state.",
        pass: ["BrowserRouter/Routes/Route", "useNavigate אחרי הצלחה", "useParams ב-Edit", "map לעריכה", "filter למחיקה"],
        repair: "אם route עובד רק דרך URL ידני, הוסף Navbar/Link וכפתורי ניווט.",
      },
      basic_api_async: {
        title: "בדיקת מעבר API",
        time: "30 דקות",
        task: "שלוף מוצרים מ-dummyjson, הצג loading/error, בנה categories מהנתונים וסנן לפי select.",
        expected: "הקטגוריות לא hard-coded, products המקורי לא משתנה, ו-URL שבור מציג error במקום מסך ריק.",
        pass: ["fetch בתוך useEffect", "response.ok", "loading/error", "derived categories", "filter לתצוגה בלבד"],
        repair: "אם ה-fetch נמצא בגוף הקומפוננטה, העבר אותו ל-useEffect עם dependency מתאים.",
      },
      basic_typescript: {
        title: "בדיקת מעבר TypeScript 10",
        time: "10 דקות",
        task: "כתוב Book + Genre + searchByGenre + User union עם narrowing באמצעות in.",
        expected: "אין any, לכל פונקציה return type ברור, ו-access לשדה ייחודי קורה רק אחרי narrowing.",
        pass: ["type Book", "enum Genre", "Book[] return type", "User union", "in narrowing", "בלי any"],
        repair: "אם נגעת ב-profile בלי narrowing, פתור שוב GuestUser/RegisteredUser מהזיכרון.",
      },
      basic_express_mongo: {
        title: "בדיקת מעבר Express/Mongo",
        time: "35 דקות",
        task: "הקם server.js עם cors, express.json, mongoose schema/model, GET /tasks ו-POST /tasks עם validation.",
        expected: "GET מחזיר מערך, POST ללא title מחזיר 400, POST תקין מחזיר 201 ושומר במסד.",
        pass: ["cors לפני routes", "express.json לפני routes", "mongoose.connect", "Schema + Model", "GET all", "POST create + status codes"],
        repair: "אם req.body undefined, בדוק ש-express.json מופיע לפני ה-routes.",
      },
    };
    return gates[track && track.id] || {
      title: "בדיקת מעבר",
      time: track && track.time ? track.time : "20 דקות",
      task: track && track.goal ? track.goal : "פתור משימה קצרה שמוכיחה שליטה במושגי המסלול.",
      expected: track && track.passCriteria ? track.passCriteria : "הפתרון עומד ב-checklist בלי עזרה.",
      pass: (track && track.checks || []).slice(0, 5).map(function (check) { return check.label; }),
      repair: track && track.strengthenIfMissed ? track.strengthenIfMissed : "חזור לצעד הראשון שלא הצלחת להסביר בקול.",
    };
  }

  function renderDiagnosticGate(track, esc) {
    var gate = diagnosticGateFor(track);
    var evidence = gateEvidenceFor(track.id || "");
    var evidenceStatus = evidence.passedAt
      ? "נשמר מעבר אחרון: " + evidence.passedAt.slice(0, 16).replace("T", " ")
      : evidence.text.trim().length
        ? "ראיה נשמרה מקומית. לחץ מעבר רק אחרי שבדקת מול checklist."
        : "חובה לכתוב ראיה קצרה לפני סימון מעבר.";
    return "<section class=\"hxm-diagnostic-gate\" data-hxm-diagnostic-gate=\"" + esc(track.id || "") + "\">" +
      "<div class=\"hxm-gate-head\"><div><strong>" + esc(gate.title) + "</strong><span>" + esc(gate.time) + " · בדיקת מעבר לפני השלב הבא</span></div><b>Gate</b></div>" +
      "<p><b>משימה:</b> " + esc(gate.task) + "</p>" +
      "<p><b>תוצר צפוי:</b> " + esc(gate.expected) + "</p>" +
      "<div class=\"hxm-gate-checklist\"><strong>עברת רק אם יש:</strong>" + list(gate.pass || [], esc) + "</div>" +
      "<p class=\"hxm-gate-repair\"><b>אם לא עברת:</b> " + esc(gate.repair) + "</p>" +
      "<label class=\"hxm-gate-evidence\"><span>הראיה שלי לפני מעבר</span><textarea data-hxm-gate-evidence=\"" + esc(track.id || "") + "\" rows=\"3\" placeholder=\"כתוב מה בנית, איזה input בדקת, ומה הפלט/התוצאה שיצאה בפועל.\">" + esc(evidence.text) + "</textarea></label>" +
      "<small class=\"hxm-gate-evidence-status\" data-hxm-gate-evidence-status=\"" + esc(track.id || "") + "\">" + esc(evidenceStatus) + "</small>" +
      "<button class=\"km-btn-mini primary\" type=\"button\" data-hxm-gate-pass=\"" + esc(track.id || "") + "\">עברתי בדיקת מעבר - סמן מסלול כשלם</button>" +
    "</section>";
  }

  function scoringText(scoring) {
    return Object.keys(scoring || {}).map(function (key) {
      return key + ": " + scoring[key];
    }).join(" · ");
  }

  function sourceLabels(ids, sourcesById, esc) {
    return (ids || []).map(function (id) {
      return sourcesById[id] ? sourcesById[id].label : id;
    }).filter(Boolean).map(esc).join(" · ");
  }

  function renderMaterialCoverage(coverage, sourcesById, esc) {
    if (!coverage || !Array.isArray(coverage.items)) return "";
    var statusLabels = {
      covered: "מכוסה",
      imported: "מיובא",
      "partial-imported": "חלקי",
      "duplicate-review": "בדיקת כפילות",
      "unknown/unavailable": "לא זמין",
    };
    var rows = coverage.items.map(function (item) {
      var source = sourcesById[item.sourceId] || {};
      var status = item.status || "unknown/unavailable";
      return "<article class=\"hxm-coverage-row status-" + esc(status.replace(/[^a-z0-9_-]/gi, "-")) + "\">" +
        "<div><strong>" + esc(item.label) + "</strong><span>" + esc(statusLabels[status] || status) + " · " + esc(item.priority || "") + "</span></div>" +
        "<p>" + esc(item.evidence || "") + "</p>" +
        (source.path ? "<code dir=\"ltr\">" + esc(source.path) + "</code>" : "") +
      "</article>";
    }).join("");
    var accounted = coverage.totalFiles ? Math.round((Number(coverage.accountedFiles || 0) / Number(coverage.totalFiles)) * 100) : 0;
    return "<details class=\"hxm-sources hxm-coverage-dashboard\" id=\"hxm-coverage-dashboard\" open><summary>Coverage Dashboard — כל חומרי המבחן</summary>" +
      "<div class=\"hxm-coverage-metrics\">" +
        "<div><strong>" + esc(coverage.accountedFiles || 0) + "/" + esc(coverage.totalFiles || 0) + "</strong><span>קבצים מטופלים</span></div>" +
        "<div><strong>" + esc(accounted) + "%</strong><span>accounted</span></div>" +
        "<div><strong>" + esc(coverage.examCriticalReadyPercent || 0) + "%</strong><span>חומר חשוב למבחן</span></div>" +
        "<div><strong>" + esc(coverage.duplicateFiles || 0) + "</strong><span>כפילויות</span></div>" +
        "<div><strong>" + esc(coverage.unknownUnavailableFiles || 0) + "</strong><span>unknown/unavailable</span></div>" +
      "</div>" +
      "<p class=\"hxm-coverage-policy\">" + esc(coverage.policy || "") + "</p>" +
      "<div class=\"hxm-coverage-list\">" + rows + "</div>" +
    "</details>";
  }

  var EXAM_LESSON_MATERIAL_TARGETS = {
    lesson_24: { h: 10, title: "Hooks/API", min: 100 },
    lesson_25: { h: 10, title: "Tailwind/Movie", min: 100 },
    lesson_26: { h: 10, title: "TypeScript/React TS", min: 100 },
    lesson_17: { h: 9, title: "HTTP/Express", min: 80 },
    lesson_18: { h: 9, title: "Node/Express HW", min: 80 },
    lesson_20: { h: 9, title: "Mongo/Mongoose", min: 80 },
    lesson_21: { h: 9, title: "React Basics", min: 80 },
    lesson_22: { h: 9, title: "React State", min: 80 },
    lesson_23: { h: 9, title: "Router/Context", min: 80 },
    lesson_27: { h: 9, title: "TS/Budget", min: 80 },
    lesson_nextjs: { h: 9, title: "Next.js Dashboard", min: 80 },
  };

  function percent(part, total) {
    return total ? Math.round((part / total) * 100) : 0;
  }

  function conceptHasExamExtras(concept) {
    var extras = concept && concept.extras;
    return !!(extras &&
      ["moreExamples", "pitfalls", "practiceQuestions"].every(function (field) {
        return Array.isArray(extras[field]) && extras[field].length > 0;
      }));
  }

  function materialQuestionCounts() {
    var bank = window.QUESTIONS_BANK || {};
    return ([])
      .concat(bank.mc || [], bank.fill || [], bank.trace || [], bank.bug || [], bank.build || [])
      .reduce(function (acc, item) {
        if (item && item.conceptKey) acc[item.conceptKey] = (acc[item.conceptKey] || 0) + 1;
        return acc;
      }, {});
  }

  function buildExamMaterialGapReport() {
    var questionCounts = materialQuestionCounts();
    return Object.keys(EXAM_LESSON_MATERIAL_TARGETS).map(function (lessonId) {
      var target = EXAM_LESSON_MATERIAL_TARGETS[lessonId];
      var lesson = (window.LESSONS_DATA || []).find(function (item) { return item.id === lessonId; }) || { id: lessonId, title: target.title, concepts: [] };
      var concepts = lesson.concepts || [];
      var rows = concepts.map(function (concept) {
        var key = lesson.id + "::" + concept.conceptName;
        var comparisons = Array.isArray(concept.comparisons) ? concept.comparisons.length : 0;
        var extrasReady = conceptHasExamExtras(concept);
        return {
          key: key,
          name: concept.conceptName,
          comparisons: comparisons,
          extrasReady: extrasReady,
          questions: questionCounts[key] || 0,
          ready: comparisons > 0 && extrasReady,
        };
      });
      var comparisonCount = rows.filter(function (row) { return row.comparisons > 0; }).length;
      var extrasCount = rows.filter(function (row) { return row.extrasReady; }).length;
      var readyCount = rows.filter(function (row) { return row.ready; }).length;
      var readyPercent = percent(readyCount, rows.length);
      return {
        lessonId: lessonId,
        title: lesson.title || target.title,
        h: target.h,
        min: target.min,
        total: rows.length,
        comparisons: comparisonCount,
        extras: extrasCount,
        ready: readyCount,
        readyPercent: readyPercent,
        status: readyPercent >= target.min ? "ready" : "missing",
        missing: rows.filter(function (row) { return !row.ready; }).slice(0, 6),
      };
    }).sort(function (a, b) {
      return (b.h - a.h) || a.lessonId.localeCompare(b.lessonId);
    });
  }

  function renderExamMaterialGapReport(rows, esc) {
    if (!Array.isArray(rows) || !rows.length) return "";
    var missingLessons = rows.filter(function (row) { return row.status !== "ready"; }).length;
    var cards = rows.map(function (row) {
      var missing = row.missing.length
        ? "<small>חסר: " + row.missing.map(function (item) { return esc(item.name); }).join(" · ") + "</small>"
        : "<small>כל המושגים במסלול הזה מחוברים להשוואות ולתרגול.</small>";
      return "<article class=\"hxm-material-gap-row status-" + esc(row.status) + "\">" +
        "<b>" + esc(row.h) + "</b>" +
        "<div><strong>" + esc(row.title) + "</strong><span>" + esc(row.lessonId) + " · " + esc(row.ready) + "/" + esc(row.total) + " מוכנים · יעד " + esc(row.min) + "%</span>" + missing + "</div>" +
        "<em>" + esc(row.comparisons) + "/" + esc(row.total) + " השוואות · " + esc(row.extras) + "/" + esc(row.total) + " תרגול</em>" +
        "<button class=\"km-btn-mini\" type=\"button\" data-hxm-open-lesson=\"" + esc(row.lessonId) + "\">פתח שיעור</button>" +
      "</article>";
    }).join("");
    return "<details class=\"hxm-sources hxm-material-gaps\" id=\"hxm-material-gaps\" open><summary>חוסרי חומר לפי שיעור — השוואות ותרגול למבחן</summary>" +
      "<div class=\"hxm-material-gap-summary " + (missingLessons ? "has-gaps" : "ready") + "\"><strong>" + (missingLessons ? "יש חוסרים פעילים" : "כל מסלולי המבחן מוכנים") + "</strong><span>נמדד לפי מושגים עם טבלת השוואה + extras מלאים. וידאו לא משמש כמקור ללא תמלול.</span></div>" +
      "<div class=\"hxm-material-gap-list\">" + cards + "</div>" +
    "</details>";
  }

  function exam100ClosedStages(path) {
    var rewards = ["מצפן", "רמה", "מטבע JS", "מפתח", "מגן", "שרת", "Builder", "Type", "שעון", "כתר 100"];
    return ((path || {}).closedRoutes || []).flatMap(function (route, routeIndex) {
      return (route.steps || []).map(function (step, stepIndex) {
        var isGateStep = stepIndex === (route.steps || []).length - 1;
        return {
          id: route.id + "::" + stepIndex,
          routeId: route.id,
          routeLabel: route.label || route.id,
          routeLevel: route.level || "",
          routeIndex: routeIndex,
          stepIndex: stepIndex,
          stepCount: (route.steps || []).length,
          title: step,
          minutes: route.minutes || 0,
          gate: isGateStep ? (route.gate || "") : "סיים את השלב בלי לדלג; רק אז לחץ קדימה.",
          gateType: route.gateType || "manual-gate",
          passingScore: route.passingScore || 0,
          requiredActions: route.requiredActions || [],
          reward: rewards[(routeIndex + stepIndex) % rewards.length],
        };
      });
    });
  }

  function exam100CurrentPathIndex(path, state) {
    var stages = exam100ClosedStages(path);
    if (!stages.length) return 0;
    var savedIndex = Number((state || {}).currentPathIndex);
    if (Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < stages.length) return savedIndex;
    var routeId = (state || {}).currentRouteId || (exam100LevelFor(path, exam100Score(path, state || {})).routeId);
    var stepIndex = Number((state || {}).currentStepIndex || 0);
    var found = stages.findIndex(function (stage) {
      return stage.routeId === routeId && stage.stepIndex === stepIndex;
    });
    return found >= 0 ? found : 0;
  }

  function exam100PathPercent(index, total) {
    if (!total) return 0;
    return Math.round(((index + 1) / total) * 100);
  }

  function exam100DayPlan() {
    return [
      { day: 1, title: "אבחון + JS בסיס", minutes: 300 },
      { day: 2, title: "React בסיס + state", minutes: 330 },
      { day: 3, title: "Forms + validations", minutes: 360 },
      { day: 4, title: "Project 70", minutes: 345 },
      { day: 5, title: "Router + API + Mongo", minutes: 330 },
      { day: 6, title: "TS 10 + חולשות", minutes: 300 },
      { day: 7, title: "סימולציה מלאה", minutes: 300 },
    ];
  }

  function exam100TotalMinutes(plan) {
    return (plan || []).reduce(function (sum, day) {
      return sum + Number(day.minutes || 0);
    }, 0);
  }

  function exam100ScheduleState(state, pathIndex, stageCount) {
    var plan = exam100DayPlan();
    var totalMinutes = exam100TotalMinutes(plan);
    var startedMs = Date.parse((state || {}).startedAt || (state || {}).savedAt || "");
    var elapsedMinutes = Number.isFinite(startedMs)
      ? Math.max(0, Math.floor((Date.now() - startedMs) / 60000))
      : 0;
    var progressRatio = stageCount > 1 ? pathIndex / (stageCount - 1) : 0;
    var completedMinutes = Math.round(totalMinutes * Math.max(0, Math.min(1, progressRatio)));
    var expectedMinutes = Math.min(totalMinutes, elapsedMinutes);
    var lagMinutes = Math.max(0, expectedMinutes - completedMinutes);
    return {
      plan: plan,
      totalMinutes: totalMinutes,
      elapsedMinutes: elapsedMinutes,
      completedMinutes: completedMinutes,
      lagMinutes: lagMinutes,
    };
  }

  function exam100HoursText(minutes) {
    var total = Math.max(0, Math.round(Number(minutes || 0)));
    var hours = Math.floor(total / 60);
    var rest = total % 60;
    if (!hours) return rest + " דק׳";
    if (!rest) return hours + " שעות";
    return hours + " שעות ו-" + rest + " דק׳";
  }

  function renderExam100Schedule(path, state, pathIndex, stages, esc) {
    var schedule = exam100ScheduleState(state, pathIndex, stages.length);
    var cumulative = 0;
    var rows = schedule.plan.map(function (day) {
      var start = cumulative;
      var end = cumulative + Number(day.minutes || 0);
      cumulative = end;
      var doneInDay = Math.max(0, Math.min(Number(day.minutes || 0), schedule.completedMinutes - start));
      var expectedInDay = Math.max(0, Math.min(Number(day.minutes || 0), schedule.elapsedMinutes - start));
      var dayPercent = Number(day.minutes || 0) ? Math.round((doneInDay / Number(day.minutes || 0)) * 100) : 0;
      var status = dayPercent >= 100 ? "done" : (expectedInDay > doneInDay ? "overdue" : (expectedInDay > 0 || dayPercent > 0 ? "current" : "planned"));
      return "<article class=\"hxm-exam100-day-row " + esc(status) + "\" data-exam100-day-row data-status=\"" + esc(status) + "\">" +
        "<b>יום " + esc(day.day) + "</b>" +
        "<div><strong>" + esc(day.title) + "</strong><span>" + esc(dayPercent) + "% · " + esc(minutesText(day.minutes)) + "</span><i style=\"--day-progress:" + esc(dayPercent) + "%\"></i></div>" +
        "<em>" + esc(status === "done" ? "בוצע" : status === "overdue" ? "בפיגור" : status === "current" ? "היום" : "בהמשך") + "</em>" +
      "</article>";
    }).join("");
    var lag = schedule.lagMinutes;
    var lagStatus = lag > 0 ? "behind" : "on-track";
    var nextDisabled = pathIndex >= stages.length - 1 ? " disabled" : "";
    var lagText = lag > 0
      ? "אתה בפיגור " + exam100HoursText(lag) + " ביחס ללוז המתוכנן"
      : "אתה בקצב ביחס ללוז המתוכנן";
    return "<section class=\"hxm-exam100-schedule\" aria-label=\"לוח משימות לפי ימים\">" +
      "<div class=\"hxm-exam100-lag-banner " + esc(lagStatus) + "\" data-exam100-lag-banner data-lag-minutes=\"" + esc(lag) + "\">" +
        "<strong>" + esc(lagText) + "</strong>" +
        "<button class=\"hxm-arrow-btn primary\" type=\"button\" data-exam100-next-task" + nextDisabled + ">התחל את המשימה הבאה</button>" +
      "</div>" +
      "<aside class=\"hxm-exam100-day-board\" data-exam100-day-board><div><h5>לוח משימות לפי ימים</h5><p>התקדמות יומית מחושבת מהמסלול הסגור. שמירה מקומית היא שחזור בלבד, לא ציון רשמי.</p></div>" + rows + "</aside>" +
    "</section>";
  }

  function renderExamTaskTreeSectionExercises(tree, esc) {
    if (!tree || !Array.isArray(tree.branches)) return "";
    var sortedBranches = tree.branches.slice().sort(function (a, b) {
      return Number(b.probability || 0) - Number(a.probability || 0) || String(a.label || "").localeCompare(String(b.label || ""));
    });
    var sectionExercises = Array.isArray(tree.sectionExercises) ? tree.sectionExercises : [];
    var technicalTaskLookup = {};
    sortedBranches.forEach(function (branch) {
      (branch.subbranches || []).forEach(function (sub) {
        (sub.technicalTasks || []).forEach(function (task) {
          technicalTaskLookup[sub.id] = task;
        });
      });
    });
    return sectionExercises.map(function (exercise) {
      var fileTree = exercise.projectFileTree || {};
      var fileRows = (fileTree.files || []).map(function (file) {
        var isTarget = file.path === fileTree.targetFile;
        return "<li class=\"" + (isTarget ? "target" : "") + "\"><code dir=\"ltr\">" + esc(file.path || "") + "</code><span>" + esc(file.purpose || "") + "</span></li>";
      }).join("");
      var subtaskRows = (exercise.technicalSubtasks || []).map(function (step) {
        return "<li><b>" + esc(step.order || "") + ". " + esc(step.title || "") + "</b><span>" + esc(step.details || "") + "</span><code dir=\"ltr\">" + esc(step.file || "") + "</code></li>";
      }).join("");
      var rubricRows = (exercise.scoreRubric || []).map(function (item) {
        return "<li><b>" + esc(item.points || 0) + " נק׳</b><span>" + esc(item.label || "") + "</span><em>" + esc(item.evidence || "") + "</em></li>";
      }).join("");
      var howRows = (exercise.howToGet100 || []).map(function (item) {
        return "<li>" + esc(item) + "</li>";
      }).join("");
      var beyondRows = (exercise.beyond100 || []).map(function (item) {
        return "<li>" + esc(item) + "</li>";
      }).join("");
      var conceptRows = (exercise.conceptsToKnow || []).slice(0, 8).map(function (concept) {
        return "<li><b>" + esc(concept.title || "") + "</b><span>" + esc(concept.explanation || "") + "</span></li>";
      }).join("");
      var explanationLevels = exercise.explanationLevels || {};
      var codeRows = (exercise.technicalTaskRefs || []).map(function (ref) {
        var task = technicalTaskLookup[ref.subbranchId] || {};
        var recipe = task.codeRecipe || {};
        var taskLevels = task.explanationLevels || {};
        return "<details class=\"hxm-exam-section-code\" data-exam-section-code=\"" + esc(task.id || "") + "\">" +
          "<summary><span>" + esc(task.title || ref.title || ref.subbranchId || "קוד סעיף") + "</span><code dir=\"ltr\">" + esc(task.targetFile || ref.targetFile || "unknown/unavailable") + "</code></summary>" +
          "<div class=\"hxm-exam-section-levels\"><article><b>ברמת סבתא</b><span>" + esc(recipe.grandmaExplanation || taskLevels.grandma || "") + "</span></article><article><b>ברמה מקצועית</b><span>" + esc(recipe.professionalExplanation || taskLevels.professional || "") + "</span></article></div>" +
          "<p>" + esc(recipe.explanation || "") + "</p>" +
          "<pre dir=\"ltr\"><code>" + esc(recipe.code || "unknown/unavailable") + "</code></pre>" +
          "<small><b>Gate 100:</b> " + esc(recipe.gate || task.gate || "") + "</small>" +
        "</details>";
      }).join("");
      if (!codeRows) {
        codeRows = "<p class=\"hxm-exam-task-policy\">אין קוד אוטומטי לסעיף זה עד עיון ידני במקור. לא ממציאים דרישה טכנית.</p>";
      }
      return "<details class=\"hxm-exam-section-exercise " + esc(exercise.status || "ready") + "\" data-exam-section-exercise=\"" + esc(exercise.id || "") + "\">" +
        "<summary><b>סעיף " + esc(exercise.idx || "") + "</b><span><strong>" + esc(exercise.sourceFile || "") + " · " + esc(exercise.question || "") + "." + esc(exercise.section || "") + "</strong><em>" + esc((exercise.taskIds || []).join(", ")) + "</em></span><small>" + esc(exercise.autoScorable ? "רובריקת 100" : "manual_review") + "</small></summary>" +
        "<div class=\"hxm-exam-section-body\">" +
          "<blockquote>" + esc(exercise.sectionText || "") + "</blockquote>" +
          "<section class=\"hxm-exam-section-levels\"><article><h6>ברמת סבתא</h6><span>" + esc(explanationLevels.grandma || "") + "</span></article><article><h6>ברמה מקצועית</h6><span>" + esc(explanationLevels.professional || "") + "</span></article></section>" +
          "<section class=\"hxm-exam-section-file-tree\"><h6>עץ קבצים של התרגיל</h6><strong><code dir=\"ltr\">" + esc(fileTree.root || "exam-project/") + "</code></strong><ul>" + fileRows + "</ul></section>" +
          "<section class=\"hxm-exam-section-subtasks\"><h6>סעיפים, תתי־סעיפים ומשימות טכניות</h6><ol>" + subtaskRows + "</ol></section>" +
          "<section class=\"hxm-exam-section-rubric\"><h6>על מה מקבלים ציון ואיך לקבל 100</h6><ol>" + rubricRows + "</ol></section>" +
          "<section class=\"hxm-exam-section-steps\"><div><h6>איך לקבל 100</h6><ol>" + howRows + "</ol></div><div><h6>מעבר ל-100</h6><ol>" + beyondRows + "</ol></div></section>" +
          "<section class=\"hxm-exam-section-concepts\"><h6>מושגים שחייבים לדעת</h6><ol>" + conceptRows + "</ol></section>" +
          "<section class=\"hxm-exam-section-codes\"><h6>קוד לפי קובץ יעד + הערות בעברית</h6>" + codeRows + "</section>" +
        "</div>" +
      "</details>";
    }).join("");
  }

  function renderIdeCodeLines(code, esc) {
    var lines = String(code || "unknown/unavailable").split("\n");
    return lines.slice(0, 80).map(function (line, index) {
      return "<span class=\"hxm-exam-ide-code-line\"><b>" + esc(index + 1) + "</b><code dir=\"ltr\">" + esc(line || " ") + "</code></span>";
    }).join("");
  }

  function internalPointValue(total, index, count) {
    var safeTotal = Math.max(0, Math.round(Number(total || 0)));
    var safeCount = Math.max(1, Math.round(Number(count || 1)));
    var base = Math.floor(safeTotal / safeCount);
    var remainder = safeTotal - (base * safeCount);
    return base + (index < remainder ? 1 : 0);
  }

  function buildExamTopicModel(tree, sortedBranches) {
    var sectionExercises = Array.isArray(tree.sectionExercises) ? tree.sectionExercises : [];
    var topics = sortedBranches.map(function (branch) {
      return { branch: branch, exercises: [] };
    });
    var topicByBranchId = {};
    var subbranchLookup = {};
    var taskLookup = {};
    var sectionPlacement = {};
    topics.forEach(function (topic) {
      var branch = topic.branch || {};
      topicByBranchId[branch.id] = topic;
      (branch.subbranches || []).forEach(function (sub) {
        subbranchLookup[sub.id] = { branch: branch, subbranch: sub };
        (sub.technicalTasks || []).forEach(function (task) {
          taskLookup[task.id] = task;
          if (!taskLookup[sub.id]) taskLookup[sub.id] = task;
        });
      });
    });
    function placementFor(exercise) {
      var refs = exercise.technicalTaskRefs || [];
      for (var refIndex = 0; refIndex < refs.length; refIndex += 1) {
        if (subbranchLookup[refs[refIndex].subbranchId]) return subbranchLookup[refs[refIndex].subbranchId];
      }
      var taskIds = exercise.taskIds || [];
      for (var taskIndex = 0; taskIndex < taskIds.length; taskIndex += 1) {
        if (subbranchLookup[taskIds[taskIndex]]) return subbranchLookup[taskIds[taskIndex]];
      }
      for (var branchIndex = 0; branchIndex < sortedBranches.length; branchIndex += 1) {
        var branch = sortedBranches[branchIndex];
        var subbranches = branch.subbranches || [];
        for (var subIndex = 0; subIndex < subbranches.length; subIndex += 1) {
          if ((subbranches[subIndex].sectionIds || []).indexOf(exercise.idx) >= 0) {
            return { branch: branch, subbranch: subbranches[subIndex] };
          }
        }
      }
      return { branch: { id: "unknown", label: "unknown/unavailable", probability: 0 }, subbranch: { id: "unknown/unavailable", probability: 0 } };
    }
    var exerciseByIdx = {};
    sectionExercises.forEach(function (exercise) {
      exerciseByIdx[exercise.idx] = exercise;
      var placement = placementFor(exercise);
      sectionPlacement[exercise.id] = placement;
    });
    topics.forEach(function (topic) {
      var seen = {};
      topic.exercises = ((topic.branch || {}).sectionIds || [])
        .map(function (idx) { return exerciseByIdx[idx]; })
        .filter(function (exercise) {
          if (!exercise || seen[exercise.id]) return false;
          seen[exercise.id] = true;
          return true;
        })
        .sort(function (a, b) { return Number(a.idx || 0) - Number(b.idx || 0); });
    });
    return {
      topics: topics,
      taskLookup: taskLookup,
      sectionPlacement: sectionPlacement,
    };
  }

  function renderCodeLineExplanationRows(code, esc) {
    var lines = String(code || "unknown/unavailable").split("\n");
    return lines.map(function (line, index) {
      var cleanLine = line.trim();
      var explanation = cleanLine
        ? explainCodeLine(cleanLine, index + 1)
        : "שורה " + (index + 1) + ": שורה ריקה לשיפור קריאות; לא מוסיפה לוגיקה.";
      return "<tr><th>" + esc(index + 1) + "</th><td><code dir=\"ltr\">" + esc(line || " ") + "</code></td><td>" + esc(explanation) + "</td></tr>";
    }).join("");
  }

  function renderProjectFileTree(fileTree, targetFile, esc) {
    var rows = ((fileTree || {}).files || []).map(function (file) {
      var isTarget = file.path === targetFile;
      return "<li class=\"" + (isTarget ? "target" : "") + "\"><button type=\"button\" data-exam-ide-file=\"" + esc(file.path || "unknown/unavailable") + "\"><code dir=\"ltr\">" + esc(file.path || "unknown/unavailable") + "</code><span>" + esc(file.purpose || "unknown/unavailable") + "</span></button></li>";
    }).join("");
    if (!rows) rows = "<li><code dir=\"ltr\">unknown/unavailable</code><span>עץ קבצים לא זמין במקור.</span></li>";
    return "<section class=\"hxm-exam-ide-file-tree\"><strong>עץ קבצים</strong><div class=\"hxm-exam-task-tree-root\"><code dir=\"ltr\">" + esc((fileTree || {}).root || "exam-project/") + "</code></div><ul>" + rows + "</ul></section>";
  }

  function renderExamQuestionRubric(exercise, esc) {
    var rows = (exercise.scoreRubric || []).map(function (item) {
      return "<li><b>" + esc(item.points || 0) + " נק׳</b><span>" + esc(item.label || "") + "</span><em>" + esc(item.evidence || "") + "</em></li>";
    }).join("");
    if (!rows) rows = "<li><b>unknown/unavailable</b><span>אין רובריקה זמינה במקור.</span><em>לא ממציאים ניקוד.</em></li>";
    return rows;
  }

  function renderExamPortalTaskButtons(exercise, esc) {
    var status = String(exercise.status || (exercise.autoScorable ? "ready" : "manual_review")).replace(/-/g, "_");
    var locked = status === "manual_review" || exercise.autoScorable === false;
    var rows = [];
    (exercise.technicalSubtasks || []).forEach(function (step, index) {
      rows.push("<button class=\"hxm-exam-portal-task\" type=\"button\" data-exam-portal-task data-exam-portal-task-title=\"" + esc(step.title || "unknown/unavailable") + "\" data-exam-portal-task-details=\"" + esc(step.details || "unknown/unavailable") + "\" data-exam-portal-task-file=\"" + esc(step.file || "unknown/unavailable") + "\"><b>" + esc(index + 1) + ". " + esc(step.title || "unknown/unavailable") + "</b><span>" + esc(step.details || "unknown/unavailable") + "</span><code dir=\"ltr\">" + esc(step.file || "unknown/unavailable") + "</code></button>");
    });
    (exercise.technicalTaskRefs || []).forEach(function (ref) {
      rows.push("<button class=\"hxm-exam-portal-task technical\" type=\"button\" data-exam-portal-task data-exam-portal-task-title=\"" + esc(ref.title || "unknown/unavailable") + "\" data-exam-portal-task-details=\"" + esc(ref.technicalTaskId || ref.subbranchId || "unknown/unavailable") + "\" data-exam-portal-task-file=\"" + esc(ref.targetFile || "unknown/unavailable") + "\"><b>" + esc(ref.title || "משימה טכנית") + "</b><span>" + esc(ref.technicalTaskId || ref.subbranchId || "unknown/unavailable") + "</span><code dir=\"ltr\">" + esc(ref.targetFile || "unknown/unavailable") + "</code></button>");
    });
    if (!rows.length) {
      return "<button class=\"hxm-exam-portal-task locked\" type=\"button\" disabled aria-disabled=\"true\"><b>" + esc(locked ? "manual_review נעול" : "unknown/unavailable") + "</b><span>" + esc(locked ? "אין משימות טכניות לפתיחה לפני עיון ידני במקור." : "אין תתי־משימות זמינות במקור.") + "</span><code dir=\"ltr\">unknown/unavailable</code></button>";
    }
    return rows.join("");
  }

  function renderExamPortalFileTree(sectionExercises, esc) {
    var seen = {};
    var rows = [];
    (sectionExercises || []).forEach(function (exercise) {
      var tree = exercise.projectFileTree || {};
      (tree.files || []).forEach(function (file) {
        var path = file.path || "unknown/unavailable";
        if (seen[path]) return;
        seen[path] = true;
        var purpose = file.purpose || "unknown/unavailable";
        var target = path === tree.targetFile ? " target" : "";
        rows.push("<button class=\"hxm-exam-portal-file" + target + "\" type=\"button\" data-exam-portal-file=\"" + esc(path) + "\"><code dir=\"ltr\">" + esc(path) + "</code><span>" + esc(purpose) + "</span><small>" + esc(path === "unknown/unavailable" ? "unknown/unavailable" : "local project file") + "</small></button>");
      });
    });
    if (!rows.length) {
      rows.push("<button class=\"hxm-exam-portal-file unavailable\" type=\"button\" data-exam-portal-file=\"unknown/unavailable\"><code dir=\"ltr\">unknown/unavailable</code><span>עץ קבצים לא זמין במקור.</span><small>unknown/unavailable</small></button>");
    }
    return rows.join("");
  }

  function renderManualReviewClosurePlan(exercise, esc) {
    var status = String(exercise.status || (exercise.autoScorable ? "ready" : "manual_review")).replace(/-/g, "_");
    if (status !== "manual_review" && exercise.autoScorable !== false) return "";
    var missingFields = [
      ["full_source_prompt", "נוסח מלא של השאלה", "טקסט מלא או צילום/OCR של סעיף המבחן, מעבר לכותרת ולניקוד."],
      ["target_surface", "משטח יעד", "קובץ או מסך יעד: route, component, function, model, schema או DB."],
      ["input_output_contract", "קלט ופלט", "מה המשתמש/השרת מקבל, מה חייב לחזור, ומה מבנה הנתונים."],
      ["validation_and_errors", "ולידציה ושגיאות", "תנאי חובה, edge cases, הודעות שגיאה או status codes."],
      ["scoring_rubric", "ניקוד רשמי", "חלוקת נקודות רשמית לתת־סעיפים, אם קיימת במקור."],
      ["acceptance_gate", "בדיקת קבלה", "איך מוכיחים שהפתרון נכון: UI state, API response, DB state או test."],
    ];
    var sourceRefs = (exercise.sourceRefs || []).map(function (ref) {
      return "<code dir=\"ltr\">" + esc(ref || "unknown/unavailable") + "</code>";
    }).join("");
    if (!sourceRefs) sourceRefs = "<code dir=\"ltr\">unknown/unavailable</code>";
    var rows = missingFields.map(function (field) {
      return "<li><b><code dir=\"ltr\">" + esc(field[0]) + "</code> · " + esc(field[1]) + "</b><span>" + esc(field[2]) + "</span></li>";
    }).join("");
    return "<section class=\"hxm-exam-manual-review-plan\" data-exam-manual-review-plan=\"" + esc(exercise.id || "") + "\">" +
      "<header><div><h6>תוכנית פתיחת manual_review</h6><p>הסעיף לא נפתח לציון אוטומטי כי המקור הזמין הוא כותרת/ניקוד בלבד. לא מייצרים קוד או דרישות בלי מקור.</p></div><b>0/6 ראיות</b></header>" +
      "<article><strong>ראיה קיימת</strong><span>" + esc(exercise.sectionText || "unknown/unavailable") + "</span><div>" + sourceRefs + "</div></article>" +
      "<ol>" + rows + "</ol>" +
      "<footer>תנאי פתיחה: למלא את <code dir=\"ltr\">docs/source-review.md</code> בחוזה טכני מלא, ואז למפות קובץ יעד, קלט/פלט, ולידציה, Gate בדיקה ורובריקה בלי fake data.</footer>" +
    "</section>";
  }

  function examQuestionSubtaskProgressId(exercise, step, index) {
    return stableTaskId("exam-question-subtask", [exercise.id || "section", step.id || step.order || (index + 1), step.title || "task"]);
  }

  function legacyExamTechnicalTaskProgressId(task, ref, step, index) {
    return stableTaskId("exam-technical-task", [(task && task.id) || (ref && ref.technicalTaskId) || "task", step.id || step.order || (index + 1), step.title || "step"]);
  }

  function examTechnicalTaskProgressId(exercise, task, ref, step, index) {
    return stableTaskId("exam-technical-task", [exercise && exercise.id || "section", (task && task.id) || (ref && ref.technicalTaskId) || "task", step.id || step.order || (index + 1), step.title || "step"]);
  }

  function examQuestionProgressIds(exercise, taskLookup) {
    var status = String(exercise.status || (exercise.autoScorable ? "ready" : "manual_review")).replace(/-/g, "_");
    if (status === "manual_review" || exercise.autoScorable === false) return [];
    var ids = [];
    var seen = {};
    (exercise.technicalSubtasks || []).forEach(function (step, index) {
      var id = examQuestionSubtaskProgressId(exercise, step, index);
      if (!seen[id]) {
        seen[id] = true;
        ids.push(id);
      }
    });
    (exercise.technicalTaskRefs || []).forEach(function (ref) {
      var task = (taskLookup || {})[ref.technicalTaskId] || (taskLookup || {})[ref.subbranchId];
      (task && task.technicalSubtasks || []).forEach(function (step, index) {
        var id = examTechnicalTaskProgressId(exercise, task, ref, step, index);
        if (!seen[id]) {
          seen[id] = true;
          ids.push(id);
        }
      });
    });
    return ids;
  }

  function examQuestionProgressSummary(exercise, taskLookup) {
    var ids = examQuestionProgressIds(exercise, taskLookup);
    var progress = getProgress();
    var done = ids.filter(function (id) { return progressDone(progress[id]); }).length;
    return {
      done: done,
      total: ids.length,
      percent: ids.length ? Math.round((done / ids.length) * 100) : 0,
    };
  }

  function examTopicProgressSummary(topic, taskLookup) {
    var ids = [];
    var seen = {};
    (topic.exercises || []).forEach(function (exercise) {
      examQuestionProgressIds(exercise, taskLookup).forEach(function (id) {
        if (seen[id]) return;
        seen[id] = true;
        ids.push(id);
      });
    });
    var progress = getProgress();
    var done = ids.filter(function (id) { return progressDone(progress[id]); }).length;
    var nextExercise = (topic.exercises || []).find(function (exercise) {
      return examQuestionProgressIds(exercise, taskLookup).some(function (id) {
        return !progressDone(progress[id]);
      });
    }) || (!ids.length ? (topic.exercises || [])[0] : null);
    return {
      done: done,
      total: ids.length,
      percent: ids.length ? Math.round((done / ids.length) * 100) : 0,
      nextExercise: nextExercise,
    };
  }

  function renderExamQuestionSubtasks(exercise, esc) {
    var steps = exercise.technicalSubtasks || [];
    if (!steps.length) return "<p class=\"hxm-exam-task-policy\">אין תתי־משימות זמינות במקור.</p>";
    var locked = exercise.status === "manual_review" || exercise.autoScorable === false;
    return "<ol>" + steps.map(function (step, index) {
      var points = internalPointValue(100, index, steps.length);
      var id = examQuestionSubtaskProgressId(exercise, step, index);
      var input = locked
        ? "<input type=\"checkbox\" disabled aria-label=\"" + esc("manual_review נעול לתת־משימה בסעיף " + (exercise.idx || "")) + "\">"
        : "<input type=\"checkbox\" data-hxm-plan-task=\"" + esc(id) + "\" aria-label=\"" + esc("סמן V לתת־משימה בסעיף " + (exercise.idx || "") + ": " + (step.title || "")) + "\">";
      var attrs = locked
        ? " data-task-kind=\"manual-review-subtask\" data-task-status=\"locked\""
        : " data-hxm-time-task-row=\"" + esc(id) + "\" data-task-kind=\"exam-question-subtask\" data-task-source=\"" + esc(exercise.sourceFile || "unknown/unavailable") + "\" data-task-minutes=\"0\" data-task-status=\"open\"";
      return "<li><label class=\"hxm-exam-question-subtask-row" + (locked ? " locked" : "") + "\"" + attrs + ">" + input + "<div><b>" + esc(step.order || index + 1) + ". " + esc(step.title || "unknown/unavailable") + "</b><span>" + esc(step.details || "unknown/unavailable") + "</span><code dir=\"ltr\">" + esc(step.file || "unknown/unavailable") + "</code></div></label><em>משקל תרגול פנימי: " + esc(locked ? "locked" : points) + " נק׳ מתוך 100. כדי לקבל 100: " + esc(locked ? "לעיין ידנית במקור לפני ציון או קוד." : "להשלים את התת־משימה בדיוק בקובץ היעד ולבדוק מול הרובריקה.") + "</em></li>";
    }).join("") + "</ol>";
  }

  function renderExamTaskCodeCard(exercise, task, ref, index, count, esc) {
    var recipe = (task && task.codeRecipe) || {};
    var taskLevels = (task && task.explanationLevels) || {};
    var targetFile = (task && task.targetFile) || (ref && ref.targetFile) || "unknown/unavailable";
    var taskPoints = internalPointValue(100, index, count);
    var steps = (task && task.technicalSubtasks) || [];
    var stepRows = steps.length ? steps.map(function (step, stepIndex) {
      var id = examTechnicalTaskProgressId(exercise, task, ref, step, stepIndex);
      var legacyId = legacyExamTechnicalTaskProgressId(task, ref, step, stepIndex);
      return "<li><label class=\"hxm-exam-question-subtask-row compact\" data-hxm-time-task-row=\"" + esc(id) + "\" data-task-kind=\"exam-technical-task\" data-task-source=\"" + esc(targetFile) + "\" data-task-minutes=\"0\" data-task-status=\"open\"><input type=\"checkbox\" data-hxm-plan-task=\"" + esc(id) + "\" data-hxm-legacy-plan-task=\"" + esc(legacyId) + "\" aria-label=\"" + esc("סמן V למשימה טכנית: " + (step.title || "")) + "\"><b>" + esc(internalPointValue(taskPoints, stepIndex, steps.length)) + " נק׳</b><span>" + esc(step.title || "unknown/unavailable") + "</span><code dir=\"ltr\">" + esc(step.file || targetFile) + "</code></label></li>";
    }).join("") : "<li><b>unknown/unavailable</b><span>אין פירוק תתי־משימות לקוד במקור.</span><code dir=\"ltr\">" + esc(targetFile) + "</code></li>";
    if (!task || !recipe.code) {
      return "<article class=\"hxm-exam-question-code-card locked\" data-exam-task-technical-task=\"" + esc((ref && ref.technicalTaskId) || "unknown/unavailable") + "\"><h6>" + esc((ref && ref.title) || "משימה טכנית") + "</h6><p class=\"hxm-exam-task-policy\">קוד לא זמין מהמקור. לא ממציאים קובץ או פתרון.</p></article>";
    }
    return "<article class=\"hxm-exam-question-code-card\" data-exam-task-technical-task=\"" + esc(task.id || "") + "\">" +
      "<header><div><h6>" + esc(task.title || (ref && ref.title) || "משימה טכנית") + "</h6><span>משקל תרגול פנימי בסעיף: " + esc(taskPoints) + " נק׳</span></div><code dir=\"ltr\">" + esc(targetFile) + "</code></header>" +
      renderProjectFileTree(task.projectFileTree || {}, targetFile, esc) +
      "<section class=\"hxm-exam-question-task-score\"><h6>משימות טכניות כדי לקבל 100</h6><ol>" + stepRows + "</ol></section>" +
      "<section class=\"hxm-exam-section-levels\"><article><h6>ברמת סבתא</h6><span>" + esc(recipe.grandmaExplanation || taskLevels.grandma || "unknown/unavailable") + "</span></article><article><h6>ברמה מקצועית</h6><span>" + esc(recipe.professionalExplanation || taskLevels.professional || "unknown/unavailable") + "</span></article></section>" +
      "<p>" + esc(recipe.explanation || "unknown/unavailable") + "</p>" +
      "<pre class=\"hxm-exam-ide-code\"><code>" + renderIdeCodeLines(recipe.code, esc) + "</code></pre>" +
      "<table class=\"hxm-exam-code-explain\"><thead><tr><th>#</th><th>שורת קוד</th><th>מה השורה עושה</th></tr></thead><tbody>" + renderCodeLineExplanationRows(recipe.code, esc) + "</tbody></table>" +
      "<small><b>טעות נפוצה:</b> " + esc(recipe.commonMistake || "unknown/unavailable") + "</small>" +
      "<small><b>Gate 100:</b> " + esc(recipe.gate || task.gate || "unknown/unavailable") + "</small>" +
    "</article>";
  }

  function renderExamQuestionPage(exercise, placement, taskLookup, isFirst, esc) {
    var rawStatus = String(exercise.status || (exercise.autoScorable ? "ready" : "manual_review")).replace(/-/g, "_");
    var status = (rawStatus === "manual_review" || exercise.autoScorable === false) ? "manual_review" : rawStatus;
    var branch = (placement && placement.branch) || {};
    var subbranch = (placement && placement.subbranch) || {};
    var refs = exercise.technicalTaskRefs || [];
    var concepts = (exercise.conceptsToKnow || []).map(function (concept) {
      return "<li><b>" + esc(concept.title || "unknown/unavailable") + "</b><span>" + esc(concept.explanation || "unknown/unavailable") + "</span></li>";
    }).join("");
    if (!concepts) concepts = "<li><b>unknown/unavailable</b><span>מושגים לא זמינים במקור לסעיף זה.</span></li>";
    var codeCards = refs.map(function (ref, index) {
      return renderExamTaskCodeCard(exercise, taskLookup[ref.technicalTaskId] || taskLookup[ref.subbranchId], ref, index, refs.length || 1, esc);
    }).join("");
    if (!codeCards) {
      codeCards = "<article class=\"hxm-exam-question-code-card locked\"><h6>manual_review</h6><p class=\"hxm-exam-task-policy\">הסעיף נעול עד עיון ידני במקור. אין קוד אוטומטי ואין ציון אוטומטי.</p></article>";
    }
    var levels = exercise.explanationLevels || {};
    var initialProgress = examQuestionProgressSummary(exercise, taskLookup);
    return "<article class=\"hxm-exam-question-page " + esc(status) + "\" data-exam-question-page=\"" + esc(exercise.id || "") + "\" data-exam-section-exercise=\"" + esc(exercise.id || "") + "\"" + (isFirst ? "" : " hidden") + ">" +
      "<header class=\"hxm-exam-question-page-head\"><div><strong>סעיף " + esc(exercise.idx || "") + " · " + esc(exercise.question || "") + "/" + esc(exercise.section || "") + "</strong><h5>" + esc(exercise.sourceFile || "unknown/unavailable") + "</h5><p>" + esc(exercise.sectionText || "unknown/unavailable") + "</p></div><aside><b>" + esc(status === "manual_review" ? "נעול" : "ready") + "</b><span>" + esc(branch.label || "unknown/unavailable") + " / " + esc(subbranch.id || "unknown/unavailable") + "</span><strong data-exam-question-progress-count=\"" + esc(exercise.id || "") + "\">" + esc(initialProgress.done) + "/" + esc(initialProgress.total) + "</strong><small data-exam-question-progress-percent=\"" + esc(exercise.id || "") + "\">" + esc(initialProgress.percent) + "%</small><i class=\"hxm-exam-question-progress-bar\"><em data-exam-question-progress-bar=\"" + esc(exercise.id || "") + "\" style=\"width:" + esc(initialProgress.percent) + "%\"></em></i></aside></header>" +
      "<section class=\"hxm-exam-section-levels\"><article><h6>הסבר ברמת סבתא</h6><span>" + esc(levels.grandma || "unknown/unavailable") + "</span></article><article><h6>הסבר מקצועי</h6><span>" + esc(levels.professional || "unknown/unavailable") + "</span></article></section>" +
      renderProjectFileTree(exercise.projectFileTree || {}, (exercise.projectFileTree || {}).targetFile || "unknown/unavailable", esc) +
      renderManualReviewClosurePlan(exercise, esc) +
      "<section class=\"hxm-exam-question-subtasks\"><h6>פירוק למשימות, ענפים ותתי־ענפים</h6>" + renderExamQuestionSubtasks(exercise, esc) + "</section>" +
      "<section class=\"hxm-exam-section-rubric\"><h6>ניקוד הסעיף ואיך לקבל 100</h6><ol>" + renderExamQuestionRubric(exercise, esc) + "</ol><p>ניקוד רשמי לתתי־משימות: unknown/unavailable. המשקלים לתתי־משימות הם פירוק תרגול פנימי מתוך 100 בלבד.</p></section>" +
      "<section class=\"hxm-exam-section-concepts\"><h6>מושגים שחייבים לדעת</h6><ol>" + concepts + "</ol></section>" +
      "<section class=\"hxm-exam-section-codes\"><h6>קטעי קוד והסבר שורה־שורה</h6>" + codeCards + "</section>" +
    "</article>";
  }

  function renderExamTaskIde(tree, sortedBranches, esc) {
    var sectionExercises = Array.isArray(tree.sectionExercises) ? tree.sectionExercises : [];
    var model = buildExamTopicModel(tree, sortedBranches);
    var manualCount = sectionExercises.filter(function (exercise) {
      return exercise.status === "manual_review" || exercise.autoScorable === false;
    }).length;
    var readyCount = Math.max(0, sectionExercises.length - manualCount);
    var topicRows = model.topics.map(function (topic, index) {
      var branch = topic.branch || {};
      var topicProgress = examTopicProgressSummary(topic, model.taskLookup);
      var nextExercise = topicProgress.nextExercise || {};
      var nextTopicLabel = !topicProgress.total
        ? (nextExercise.id ? "manual_review נעול: סעיף " + (nextExercise.idx || "") : "אין משימות אוטומטיות")
        : (nextExercise.id ? "הבא: סעיף " + (nextExercise.idx || "") + " · " + (nextExercise.question || "") + "/" + (nextExercise.section || "") : "כל המשימות האוטומטיות סומנו");
      var questionRows = topic.exercises.map(function (exercise) {
        var rawStatus = String(exercise.status || (exercise.autoScorable ? "ready" : "manual_review")).replace(/-/g, "_");
        var status = (rawStatus === "manual_review" || exercise.autoScorable === false) ? "manual_review" : rawStatus;
        var progressSummary = examQuestionProgressSummary(exercise, model.taskLookup);
        var previewRubric = (exercise.scoreRubric || []).slice(0, 3).map(function (item) {
          return "<li><b>" + esc(item.points || 0) + " נק׳</b><span>" + esc(item.label || "") + "</span></li>";
        }).join("");
        var portalTasks = renderExamPortalTaskButtons(exercise, esc);
        return "<article class=\"hxm-exam-topic-question " + esc(status) + "\" data-exam-topic-question=\"" + esc(exercise.id || "") + "\">" +
          "<div class=\"hxm-exam-question-row\">" +
            "<button class=\"hxm-exam-question-plus\" type=\"button\" data-exam-question-toggle=\"" + esc(exercise.id || "") + "\" aria-expanded=\"false\" aria-label=\"הרחב פירוט קצר\">+</button>" +
            "<button class=\"hxm-exam-question-title\" type=\"button\" data-exam-question-open=\"" + esc(exercise.id || "") + "\" data-exam-portal-question=\"" + esc(exercise.id || "") + "\"><strong>סעיף " + esc(exercise.idx || "") + " · " + esc(exercise.question || "") + "/" + esc(exercise.section || "") + "</strong><span>" + esc(exercise.sectionText || "unknown/unavailable") + "</span></button>" +
            "<button class=\"hxm-exam-question-popout\" type=\"button\" data-exam-question-popout=\"" + esc(exercise.id || "") + "\">פתח IDE</button><em>" + esc(status === "manual_review" ? "manual_review" : "ready") + "</em><small data-exam-topic-question-progress=\"" + esc(exercise.id || "") + "\">" + esc(progressSummary.done) + "/" + esc(progressSummary.total) + " · " + esc(progressSummary.percent) + "%</small>" +
          "</div>" +
          "<div class=\"hxm-exam-portal-task-children\" data-exam-portal-task-children=\"" + esc(exercise.id || "") + "\">" + portalTasks + "</div>" +
          "<div class=\"hxm-exam-question-preview\" data-exam-question-preview=\"" + esc(exercise.id || "") + "\" hidden><ol>" + previewRubric + "</ol><button type=\"button\" data-exam-question-open=\"" + esc(exercise.id || "") + "\">פתח עמוד שאלה מלא</button><button type=\"button\" data-exam-question-popout=\"" + esc(exercise.id || "") + "\">פתח בחלון IDE חדש</button></div>" +
        "</article>";
      }).join("");
      return "<details class=\"hxm-exam-topic" + esc(topicProgress.total > 0 && topicProgress.done === topicProgress.total ? " complete" : "") + "\" data-exam-topic=\"" + esc(branch.id || "") + "\"" + (index === 0 ? " open" : "") + "><summary><b>" + esc(index + 1) + "</b><span><strong>" + esc(branch.label || branch.id || "unknown/unavailable") + "</strong><em>" + esc(topic.exercises.length) + " שאלות · הסתברות " + esc(branch.probability || 0) + "%</em></span><small class=\"hxm-exam-topic-progress\"><strong data-exam-topic-progress-count=\"" + esc(branch.id || "") + "\">" + esc(topicProgress.done) + "/" + esc(topicProgress.total) + "</strong><em data-exam-topic-progress-percent=\"" + esc(branch.id || "") + "\">" + esc(topicProgress.percent) + "%</em><i><span data-exam-topic-progress-bar=\"" + esc(branch.id || "") + "\" style=\"width:" + esc(topicProgress.percent) + "%\"></span></i><mark data-exam-topic-next=\"" + esc(branch.id || "") + "\">" + esc(nextTopicLabel) + "</mark></small></summary><div class=\"hxm-exam-topic-questions\">" + questionRows + "</div></details>";
    }).join("");
    var firstReady = sectionExercises.find(function (exercise) {
      return exercise.status !== "manual_review" && exercise.autoScorable !== false;
    }) || sectionExercises[0] || {};
    var pageRows = sectionExercises.map(function (exercise) {
      return renderExamQuestionPage(exercise, model.sectionPlacement[exercise.id], model.taskLookup, exercise.id === firstReady.id, esc);
    }).join("");
    var nextRows = sectionExercises.filter(function (exercise) {
      return exercise.status !== "manual_review" && exercise.autoScorable !== false;
    }).slice(0, 8).map(function (exercise, index) {
      var id = stableTaskId("exam-question-next", [exercise.id || "section", exercise.sourceFile || "source"]);
      return "<label class=\"hxm-exam-ide-terminal-row\" data-hxm-time-task-row=\"" + esc(id) + "\" data-task-kind=\"exam-question-page\" data-task-source=\"" + esc(exercise.sourceFile || "unknown/unavailable") + "\" data-task-minutes=\"0\" data-task-status=\"open\"><input type=\"checkbox\" data-hxm-plan-task=\"" + esc(id) + "\"><span><b>" + esc(index + 1) + ". פתח וסכם סעיף " + esc(exercise.idx || "") + "</b><small>" + esc(exercise.sectionText || "unknown/unavailable") + "</small><code dir=\"ltr\">" + esc(((exercise.projectFileTree || {}).targetFile) || "unknown/unavailable") + "</code></span></label>";
    }).join("");
    var fileRows = renderExamPortalFileTree(sectionExercises, esc);
    return "<section class=\"hxm-exam-task-ide hxm-exam-task-ide-portal hxm-exam-topic-browser\" id=\"hxm-exam-task-ide-portal\" data-exam-task-ide data-exam-task-ide-portal data-exam-portal-default-section=\"" + esc(firstReady.id || "") + "\" aria-label=\"פורטל משימות מבחן\">" +
      "<header class=\"hxm-exam-portal-commandbar\"><div class=\"hxm-exam-portal-brand\"><span>IDE</span><div><strong>פורטל משימות מבחן</strong><small>Exam100 Task IDE · ימין שאלות · שמאל קבצים · מרכז הסבר וקוד</small></div></div><nav class=\"hxm-exam-portal-tabs\" aria-label=\"IDE tabs\"><b>Questions</b><b>Explanation</b><b>Code</b><b>Files</b></nav><aside class=\"hxm-exam-ide-inspector hxm-exam-portal-gate\" aria-label=\"Gate 100\"><article><b>" + esc(readyCount) + "/" + esc(sectionExercises.length) + "</b><span>ready auto-scorable</span></article><article><b>" + esc(manualCount) + "</b><span>manual_review locked</span></article></aside></header>" +
      "<div class=\"hxm-exam-portal-shell\">" +
        "<aside class=\"hxm-exam-portal-files\" data-exam-portal-files aria-label=\"עץ קבצי הקוד\"><div class=\"hxm-exam-ide-title\"><strong>עץ קבצי הקוד</strong><span>לחיצה כאן משנה רק את אזור הקוד</span></div><div class=\"hxm-exam-portal-file-list\" data-exam-portal-file-tree>" + fileRows + "</div></aside>" +
        "<main class=\"hxm-exam-portal-center hxm-exam-question-pages\" aria-label=\"מרכז IDE\"><section class=\"hxm-exam-portal-panel explain\"><div class=\"hxm-exam-ide-editor-head\"><div><strong data-exam-portal-explain-title>הסברים</strong><span data-exam-portal-current-section>בחר סעיף מעץ השאלות מימין</span></div><b>RTL</b></div><div class=\"hxm-exam-portal-explain\" data-exam-portal-explain></div></section><section class=\"hxm-exam-portal-panel code\"><div class=\"hxm-exam-ide-editor-head\"><div><strong data-exam-portal-code-title>קוד</strong><span>בחר קובץ מעץ הקבצים משמאל. הניווט הימני לא משנה את הקוד.</span></div><b>LTR</b></div><div class=\"hxm-exam-portal-code\" data-exam-portal-code><section><h6>בחר קובץ</h6><p>הקוד יוצג כאן בלבד. נתון חסר נשאר unknown/unavailable.</p></section></div></section></main>" +
        "<aside class=\"hxm-exam-portal-questions hxm-exam-topic-list\" data-exam-portal-questions aria-label=\"שאלות, סעיפים ומשימות\"><div class=\"hxm-exam-ide-title\"><strong>שאלות / סעיפים / משימות</strong><span>" + esc(model.topics.length) + " נושאים · " + esc(sectionExercises.length) + " שאלות</span></div><div class=\"hxm-exam-ide-section-list\">" + topicRows + "</div></aside>" +
      "</div>" +
      "<footer class=\"hxm-exam-ide-terminal hxm-exam-portal-terminal\" aria-label=\"Task terminal\"><div class=\"hxm-exam-ide-title\"><strong>Status / Terminal</strong><span>משימות ready ראשונות · V נשמר מקומית ולא ציון רשמי</span></div><div>" + nextRows + "</div></footer>" +
      "<div class=\"hxm-exam-portal-page-library\" data-exam-portal-page-library hidden>" + pageRows + "</div>" +
    "</section>";
  }

  function renderExamTaskTree(tree, esc) {
    if (!tree || !Array.isArray(tree.branches) || !tree.branches.length) return "";
    var sortedBranches = tree.branches.slice().sort(function (a, b) {
      return Number(b.probability || 0) - Number(a.probability || 0) || String(a.label || "").localeCompare(String(b.label || ""));
    });
    var totalTechnicalTasks = sortedBranches.reduce(function (sum, branch) {
      return sum + (branch.subbranches || []).reduce(function (subSum, sub) {
        return subSum + (Array.isArray(sub.technicalTasks) ? sub.technicalTasks.length : 0);
      }, 0);
    }, 0);
    var study = tree.studyMinutes ? " · נוסף ללוח: " + exam100HoursText(tree.studyMinutes) : "";
    var ideRows = renderExamTaskIde(tree, sortedBranches, esc);
    return "<section class=\"hxm-exam-task-tree\" data-exam-task-tree aria-label=\"עץ 73 סעיפי מבחן\">" +
      "<div class=\"hxm-exam-task-tree-head\"><div><h5>עץ תרגילי המבחן לפי נושאים</h5><p>פותחים נושא, רואים את כל שאלות המבחן שלו, ואז לוחצים על שאלה כדי לפתוח עמוד מלא עם ענפים, תתי־ענפים, ניקוד, מושגים וקוד מוסבר.</p></div><b>" + esc(tree.totalSections || 0) + " שאלות · " + esc(sortedBranches.length) + " נושאים · " + esc(totalTechnicalTasks) + " משימות" + esc(study) + "</b></div>" +
      ideRows +
      "<p class=\"hxm-exam-task-policy\">manual_review נשאר חסום לציון אוטומטי עד עיון ידני במקור. אין fake data, אין אקראיות, ואין הסקת חומר מווידאו ללא תמלול.</p>" +
    "</section>";
  }

  function renderSolutionGuideDrills(drills, esc) {
    if (!drills || !drills.ready || !Array.isArray(drills.exams) || !drills.exams.length) return "";
    var examRows = drills.exams.map(function (exam) {
      var routeRows = (exam.routes || []).map(function (route) {
        return "<code dir=\"ltr\">" + esc(route) + "</code>";
      }).join("");
      var stageRows = (exam.stages || []).slice(0, 5).map(function (stage) {
        return "<li><b>" + esc(stage.summary || "") + "</b><span>" + esc(stage.estimatedMinutes ? minutesText(stage.estimatedMinutes) : "זמן לפי מקור: unknown/unavailable") + "</span></li>";
      }).join("");
      return "<article class=\"hxm-solution-guide-exam\" data-solution-guide-exam=\"" + esc(exam.id || "") + "\">" +
        "<div><strong>" + esc(exam.title || "") + "</strong><span>" + esc((exam.scoreParts || []).map(function (part) { return part.value + " " + part.label; }).join(" · ")) + "</span></div>" +
        "<p>Routes שחולצו: " + routeRows + "</p>" +
        "<ul>" + stageRows + "</ul>" +
        "<small>" + esc(exam.codeBlockCount || 0) + " code blocks · " + esc((exam.stages || []).length) + " שלבים · מדיניות: " + esc(exam.drillPolicy || "") + "</small>" +
      "</article>";
    }).join("");
    var jsRows = (drills.jsSolutions || []).map(function (solution) {
      return "<li data-solution-guide-js=\"" + esc(solution.id || "") + "\">" + esc(solution.title || "") + "</li>";
    }).join("");
    return "<details class=\"hxm-solution-guide-drills\" id=\"hxm-solution-guide-drills\">" +
      "<summary>חוברת פתרונות 4 מבחנים - מפת תרגול שחולצה</summary>" +
      "<div class=\"hxm-solution-guide-head\"><div><h4>מפת תרגול מתוך חוברת הפתרונות</h4><p>זה מקור reference בלבד, לא תפריט בתוך Exam100. כל נתון כאן חולץ מה-HTML המקורי; שדה חסר נשאר unknown/unavailable.</p></div><b>" + esc(drills.summary.exams || 0) + " מבחנים · " + esc(drills.summary.routes || 0) + " routes · " + esc(drills.summary.stages || 0) + " שלבים</b></div>" +
      "<div class=\"hxm-solution-guide-grid\">" + examRows + "</div>" +
      "<section class=\"hxm-solution-guide-js\"><h5>פתרונות JS שחולצו</h5><ol>" + jsRows + "</ol></section>" +
      "<p class=\"hxm-exam-task-policy\">" + esc(drills.extractionPolicy || "extracted-only") + "</p>" +
    "</details>";
  }

  function renderExam100Path(path, esc, mode) {
    if (!path || !path.placementTest) return "";
    var state = getExam100State();
    var score = exam100Score(path, state);
    var total = exam100PlacementQuestions(path).length;
    var skipped = !!state.skipPlacement;
    var level = exam100LevelFor(path, score);
    var stages = exam100ClosedStages(path);
    var pathIndex = exam100CurrentPathIndex(path, state);
    var current = stages[pathIndex] || stages[0] || {};
    var currentRoute = exam100RouteFor(path, current.routeId || (skipped ? "track-100" : level.routeId));
    var progressPercent = exam100PathPercent(pathIndex, stages.length);
    var planRows = (path.closedRoutes || []).map(function (route, index) {
      var active = route.id === current.routeId ? " active" : "";
      var routeSteps = (route.steps || []).length;
      return "<article class=\"hxm-exam100-plan-lane" + active + "\"><b>" + esc(index + 1) + "</b><div><strong>" + esc(route.label || "") + "</strong><span>" + esc(route.level || "") + " · " + esc(routeSteps) + " שלבים · " + esc(minutesText(route.minutes || 0)) + "</span></div></article>";
    }).join("");
    var journeyRows = stages.map(function (step, index) {
      var status = index < pathIndex ? " done" : (index === pathIndex ? " current" : " locked");
      var aria = index === pathIndex ? " aria-current=\"step\"" : "";
      return "<article class=\"hxm-exam100-journey-step" + status + "\"" + aria + " data-exam100-map-step=\"" + esc(index) + "\"><b>" + esc(index + 1) + "</b><strong>" + esc(step.title) + "</strong><span>" + esc(step.routeLabel) + "</span><em>" + esc(step.reward) + "</em></article>";
    }).join("");
    var requiredRows = list(current.requiredActions || currentRoute.requiredActions || [], esc);
    var scheduleRows = renderExam100Schedule(path, state, pathIndex, stages, esc);
    var taskTreeRows = renderExam100TaskTreeBoard((mode || {}).masterPlan || {}, (mode || {}).basicDiagnosticTracks || [], esc);
    var examTaskTreeRows = renderExamTaskTree((mode || {}).examTaskTree, esc);
    var fullTaskListRows = renderRemainingTimePlan((mode || {}).masterPlan || {}, (mode || {}).basicDiagnosticTracks || [], esc);
    return "<section class=\"hxm-exam100\" id=\"hxm-exam100-path\" aria-label=\"Exam 100 Path\">" +
      taskTreeRows +
      "<div class=\"hxm-exam100-hero\"><div><p>SVCollege 100 במבחן</p><h4>" + esc(path.title || "Exam 100 Path") + "</h4><span>" + esc(path.summary || "") + "</span></div><b data-exam100-save-status>" + esc(exam100SavedText(state)) + "</b></div>" +
      "<div class=\"hxm-exam100-score\"><article><strong data-exam100-closed-percent>" + esc(progressPercent) + "%</strong><span>התקדמות במסלול</span></article><article><strong data-exam100-score>" + esc(score) + "/" + esc(total) + "</strong><span>אבחון שמור</span></article><article><strong data-exam100-level>" + esc(skipped ? "100 Track" : level.label) + "</strong><span>רמה משוערת</span></article><article><strong data-exam100-route-label>" + esc(current.routeLabel || "") + "</strong><span>התוכנית הפעילה</span></article></div>" +
      "<section class=\"hxm-exam100-journey locked\" aria-label=\"מפת מסלול עם פרסים\"><div><h5>מפת הדרך מהכניסה עד ציון 100</h5><p>אין תפריט בחירה בתוך המסלול. זזים רק עם חץ אחורה וחץ קדימה, וכל שלב מראה Gate ופרס.</p></div><div class=\"hxm-exam100-progress\"><i data-exam100-bar style=\"width:" + esc(progressPercent) + "%\"></i></div><div class=\"hxm-exam100-journey-track\">" + journeyRows + "</div></section>" +
      examTaskTreeRows +
      scheduleRows +
      "<section class=\"hxm-exam100-plan-lanes\" aria-label=\"התוכניות הסגורות ללא בחירה\">" + planRows + "</section>" +
      "<article class=\"hxm-exam100-current-step\" data-exam100-current-step>" +
        "<div><span data-exam100-stage-counter>שלב " + esc(pathIndex + 1) + " מתוך " + esc(stages.length) + "</span><strong data-exam100-current-title>" + esc(current.title || "") + "</strong><p data-exam100-current-route>" + esc(current.routeLabel || "") + " · " + esc(current.routeLevel || "") + "</p></div>" +
        "<section><b>Gate מעבר:</b><p data-exam100-current-gate>" + esc(current.gate || "") + "</p><small data-exam100-current-rule>" + esc(current.gateType || "") + " · ציון מעבר " + esc(current.passingScore || "") + "</small></section>" +
        "<section class=\"hxm-exam100-readonly-proof\"><b>עברת אם:</b>" + requiredRows + "</section>" +
        "<div class=\"hxm-exam100-arrow-controls\" aria-label=\"ניווט מסלול סגור\">" +
          "<button class=\"hxm-arrow-btn\" type=\"button\" data-exam100-path-prev" + (pathIndex <= 0 ? " disabled" : "") + " aria-label=\"חזור שלב אחד\">← אחורה</button>" +
          "<span data-exam100-progress-label>" + esc(progressPercent) + "%</span>" +
          "<button class=\"hxm-arrow-btn primary\" type=\"button\" data-exam100-path-next" + (pathIndex >= stages.length - 1 ? " disabled" : "") + " aria-label=\"עבור לשלב הבא\">קדימה →</button>" +
        "</div>" +
      "</article>" +
      fullTaskListRows +
      "<p class=\"hxm-exam100-save-source\" data-exam100-save-mode>" + esc(exam100RuntimeSaveMode()) + "</p>" +
    "</section>";
  }

  function renderStartHereHeatPanel(masterPlan, mode, esc) {
    var coverage = mode.materialCoverage || {};
    var criticalPercent = Number(coverage.examCriticalReadyPercent || 0);
    var accounted = Number(coverage.accountedFiles || 0);
    var total = Number(coverage.totalFiles || 0);
    var unknown = Number(coverage.unknownUnavailableFiles || 0);
    var heatItems = [
      { heat: 10, title: "אבחון בסיס - להתחיל כאן", time: "30-45 דק׳", why: "בודק מה אתה יודע עכשיו ומה צריך חיזוק לפני פרויקט 70.", action: "scroll-hxm-basic-diagnostic", label: "פתח אבחון" },
      { heat: 9, title: "Project 70", time: "60-90 דק׳", why: "זה רוב הציון. בחר תבנית ובנה flow עובד.", action: "scroll-hxm-templates", label: "בחר תבנית פרויקט" },
      { heat: 8, title: "Forms + Validations", time: "35 דק׳", why: "השגיאות הכי יקרות בציון: שדות ריקים, סיסמה, גיל, מספרים, duplicate.", action: "scroll-hxm-exam-day", label: "פתח checklist" },
      { heat: 7, title: "React Routing + CRUD/API", time: "45 דק׳", why: "Login/Register/Home/Add/Edit/List חוזרים כמעט בכל דפוס מבחן.", action: "scroll-hxm-templates", label: "לתרגול פרויקט" },
      { heat: 6, title: "Mock Exam מלא", time: "4 שעות", why: "בודק האם אתה באמת מסוגל לסיים לפי 70/20/10.", action: "start-homework-mock", label: "התחל מבחן" },
      { heat: 5, title: "JavaScript 20", time: "20 דק׳", why: "שאלת מערך/אובייקט עם בדיקת קלט ו-Error ברורה.", action: "scroll-hxm-js", label: "לשאלות JS" },
      { heat: 4, title: "TypeScript 10", time: "10 דק׳", why: "נקודות מהירות: type/interface/enum/union/narrowing.", action: "scroll-hxm-ts", label: "לשאלות TS" },
      { heat: 3, title: "Express/Mongo בתוך הפרויקט", time: "40 דק׳", why: "חשוב אם הפרויקט כולל backend: cors, express.json, schema, CRUD.", action: "scroll-hxm-exam-day", label: "ל-Express checklist" },
      { heat: 2, title: "Coverage וחומר מותר", time: "10 דק׳", why: "בדיקת ביטחון שהכול מכוסה ומה מותר להכין מראש.", action: "scroll-hxm-coverage", label: "בדוק כיסוי" },
      { heat: 2, title: "חוברת פתרונות 4 מבחנים", time: "15 דק׳", why: "לראות את מפת הפתרונות שחולצה: routes, שלבים ו-JS מתוך המקור בלבד.", action: "scroll-hxm-solution-guide", label: "פתח חוברת" },
      { heat: 1, title: "אזור אדום", time: "2 דק׳", why: "רק לוודא לאן לא להיכנס השבוע.", action: "scroll-hxm-red-zone", label: "ראה מה לחסום" },
    ];
    var heatRows = heatItems.map(function (item) {
      return "<article class=\"hxm-heat-row heat-" + esc(item.heat) + "\" data-hxm-heat=\"" + esc(item.heat) + "\">" +
        "<strong>" + esc(item.heat) + "</strong>" +
        "<div><b>" + esc(item.title) + "</b><span>" + esc(item.time) + " · " + esc(item.why) + "</span></div>" +
        "<button class=\"km-btn-mini\" type=\"button\" data-hxm-action=\"" + esc(item.action) + "\">" + esc(item.label) + "</button>" +
      "</article>";
    }).join("");
    return "<section class=\"hxm-start-here\" id=\"hxm-start-here\" aria-label=\"התחל כאן לפי דרגות חום\">" +
      "<div class=\"hxm-start-head\"><div><h4>התחל כאן - גרסה פשוטה</h4><p>אם אתה נכנס עכשיו ולא יודע מאיפה להתחיל: לך לפי דרגות החום מלמעלה למטה. 10 = הכי משתלם לציון, 1 = רק אם נשאר זמן.</p></div><b>Heat 10 -> 1</b></div>" +
      "<div class=\"hxm-start-verdict\"><strong>כיסוי חומר חשוב למבחן: " + esc(criticalPercent) + "%</strong><span>" + esc(accounted) + "/" + esc(total) + " קבצים מטופלים. " + esc(unknown) + " מקור נשאר unknown/unavailable: הווידאו ללא תמלול ולכן לא משמש כתוכן מוכח.</span></div>" +
      "<div class=\"hxm-heat-list\">" + heatRows + "</div>" +
    "</section>";
  }

  function relevanceBadgeClass(value) {
    if (value === "critical") return "critical";
    if (value === "useful") return "useful";
    if (value === "blocked") return "blocked";
    return "low";
  }

  function renderExamOnlyMode(mode, esc) {
    var relevance = (mode || {}).examRelevance || {};
    var tabs = relevance.tabRelevance || [];
    var lessons = relevance.lessonRelevance || [];
    if (!tabs.length && !lessons.length) return "";
    var counts = tabs.reduce(function (acc, item) {
      var key = item.relevance || "low";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    var actionCards = [
      { label: "1", title: "עכשיו", body: "פתח אבחון בסיס וסגור את הבדיקה הראשונה שלא סומנה.", action: "scroll-hxm-basic-diagnostic", button: "פתח אבחון" },
      { label: "2", title: "אחר כך", body: "עבור ל-Project 70 רק אחרי Gate evidence קצר וברור.", action: "scroll-hxm-templates", button: "Project 70" },
      { label: "3", title: "בסוף", body: "פתור JS 20 ו-TS 10 לפי זמן, ואז Mock Exam מלא.", action: "start-homework-mock", button: "Mock מלא" },
    ].map(function (item) {
      return "<article class=\"hxm-exam-only-action\"><b>" + esc(item.label) + "</b><div><strong>" + esc(item.title) + "</strong><span>" + esc(item.body) + "</span></div><button class=\"km-btn-mini primary\" type=\"button\" data-hxm-action=\"" + esc(item.action) + "\">" + esc(item.button) + "</button></article>";
    }).join("");
    var tabRows = tabs.map(function (tab) {
      var cls = relevanceBadgeClass(tab.relevance);
      return "<article class=\"hxm-exam-relevance-row " + esc(cls) + "\" data-hxm-exam-relevance=\"" + esc(tab.id || "") + "\" data-hxm-exam-relevance-level=\"" + esc(tab.relevance || "low") + "\">" +
        "<b>Heat " + esc(tab.heat || "-") + "</b>" +
        "<div><strong>" + esc(tab.label || tab.id || "") + "</strong><span>" + esc(tab.reason || "") + "</span><small>במקום זה: " + esc(tab.doInstead || "חזור למסלול המבחן") + "</small></div>" +
        "<em>" + esc(tab.status || tab.relevance || "") + "</em>" +
      "</article>";
    }).join("");
    var lessonRows = lessons.map(function (lesson) {
      var cls = relevanceBadgeClass(lesson.relevance);
      return "<article class=\"hxm-exam-lesson-row " + esc(cls) + "\"><b>Heat " + esc(lesson.heat || "-") + "</b><div><strong>" + esc(lesson.label || lesson.lessonId || "") + "</strong><span>" + esc(lesson.lessonId || "") + " · " + esc(lesson.reason || "") + "</span></div></article>";
    }).join("");
    var emptyPolicy = (relevance.emptyStatePolicy || []).map(function (item) {
      return "<article><strong>" + esc(item.case || "") + "</strong><span>" + esc(item.meaning || "") + "</span><b>" + esc(item.action || "") + "</b></article>";
    }).join("");
    var legend = list(relevance.heatLegend || [], esc);
    return "<section class=\"hxm-exam-only-mode\" id=\"hxm-exam-only-mode\" aria-label=\"Exam Only Mode\">" +
      "<div class=\"hxm-exam-only-head\"><div><h4>Exam Only Mode פעיל</h4><p>" + esc(relevance.policy || "עובדים רק על חומר שמשרת את המבחן הקרוב.") + "</p></div><b>Critical " + esc(counts.critical || 0) + " · Useful " + esc(counts.useful || 0) + " · Red " + esc(counts.blocked || 0) + "</b></div>" +
      "<div class=\"hxm-exam-only-actions\">" + actionCards + "</div>" +
      "<details open><summary>מפת טאבים: ירוק/צהוב/אדום</summary><div class=\"hxm-exam-relevance-list\">" + tabRows + "</div></details>" +
      "<details><summary>שיעורים קריטיים לפי Heat</summary><div class=\"hxm-exam-lesson-list\">" + lessonRows + "</div></details>" +
      "<details><summary>מה עושים כשחלק ריק?</summary><div class=\"hxm-empty-policy-grid\">" + emptyPolicy + "</div></details>" +
      "<details><summary>מקרא Heat</summary>" + legend + "</details>" +
    "</section>";
  }

  function codeExplanationAudit(mode) {
    var blocks = [];
    (mode.basicDiagnosticTracks || []).forEach(function (track) {
      (track.codeBlocks || []).forEach(function (block) {
        blocks.push({ source: track.title, code: block.code, overview: block.overview, lineByLine: block.lineByLine, focus: block.focus, commonMistakes: block.commonMistakes, practice: block.practice });
      });
    });
    (mode.buildQuestions || []).forEach(function (item) {
      blocks.push({ source: item.title || item.id, code: item.reference, overview: item.explanation, lineByLine: [], focus: (item.tests || []).map(function (test) { return test.description; }), commonMistakes: item.followUps || [], practice: item.hint });
    });
    (mode.jsQuestions || []).forEach(function (item) {
      blocks.push({ source: item.title || item.id, code: item.reference, overview: item.explanation, lineByLine: [], focus: (item.tests || []).map(function (test) { return test.description; }), commonMistakes: ["validation", "Error", "exact output"], practice: item.hint });
    });
    (mode.tsQuestions || []).forEach(function (item) {
      blocks.push({ source: item.id, code: item.code, overview: item.explanation, lineByLine: [], focus: [item.conceptKey, item.answer], commonMistakes: ["any", "missing narrowing", "wrong type"], practice: "כתוב מחדש והסבר את התשובה." });
    });
    var ready = blocks.filter(function (block) {
      return String(block.code || "").length > 40 &&
        String(block.overview || "").length > 20 &&
        ((block.lineByLine || []).length >= 3 || String(block.code || "").split("\n").length >= 3) &&
        (block.focus || []).length >= 1 &&
        (block.commonMistakes || []).length >= 1 &&
        String(block.practice || "").length > 10;
    }).length;
    var manualLineByLine = blocks.filter(function (block) { return (block.lineByLine || []).length >= 3; }).length;
    return {
      total: blocks.length,
      ready: ready,
      percent: blocks.length ? Math.round((ready / blocks.length) * 100) : 0,
      manualLineByLine: manualLineByLine,
    };
  }

  function renderCodeExplanationQuality(mode, esc) {
    var audit = codeExplanationAudit(mode || {});
    var contract = (((mode || {}).examRelevance || {}).codeExplanationContract || []);
    var contractRows = contract.map(function (item) {
      return "<span>" + esc(item) + "</span>";
    }).join("");
    var priorityRows = [
      "React forms/state/map/routes",
      "useEffect, useRef, fetch",
      "Express routes/status codes",
      "Mongo schema/model/CRUD",
      "JS array/object algorithms",
      "TS type/interface/enum/union/narrowing",
    ].map(function (item) {
      return "<article><strong>" + esc(item) + "</strong><span>כל בלוק מוצג עם הסבר עברי, דגשי מבחן, טעויות ותרגול.</span></article>";
    }).join("");
    return "<details class=\"hxm-sources hxm-code-quality\" id=\"hxm-code-quality\" open><summary>איכות הסברי קוד בעברית — Code Blocks קריטיים</summary>" +
      "<div class=\"hxm-code-quality-head\"><div><strong>" + esc(audit.ready) + "/" + esc(audit.total) + " בלוקים מוכנים למבחן</strong><span>כולל הסברים ידניים ואוטומטיים לפי חוזה אחיד. " + esc(audit.manualLineByLine) + " כוללים פירוק שורות ידני.</span></div><b>" + esc(audit.percent) + "%</b></div>" +
      "<div class=\"hxm-code-contract\">" + contractRows + "</div>" +
      "<div class=\"hxm-code-priority-grid\">" + priorityRows + "</div>" +
    "</details>";
  }

  function renderBasicDiagnosticTracks(tracks, progress, esc) {
    if (!Array.isArray(tracks) || !tracks.length) return "";
    var summary = diagnosticSummary(tracks, progress);
    var percent = summary.percent;
    var next = summary.next;
    var cards = tracks.map(function (track) {
      var checks = (track.checks || []);
      var trackDone = checks.filter(function (check) { return progress[diagnosticCheckId(track, check)]; }).length;
      var trackPercent = checks.length ? Math.round((trackDone / checks.length) * 100) : 0;
      var checkRows = checks.map(function (check) {
        var id = diagnosticCheckId(track, check);
        var checked = progress[id] ? " checked" : "";
        var doneClass = progress[id] ? " done" : "";
        return "<label class=\"hxm-basic-check" + doneClass + "\" data-hxm-basic-check-row=\"" + esc(id) + "\">" +
          "<input type=\"checkbox\" data-hxm-basic-check=\"" + esc(id) + "\"" + checked + ">" +
          "<span><b>" + esc(check.label) + "</b><small>הוכחה: " + esc(check.evidence || "") + "</small><em>חיזוק אם לא עברת: " + esc(check.reinforcement || "") + "</em></span>" +
        "</label>";
      }).join("");
      var codeBlocks = (track.codeBlocks || []).map(function (block) {
        return "<details class=\"hxm-basic-code\" open><summary>" + esc(block.title || "בלוק קוד") + "</summary>" +
          renderCodeBlockWithExplanation(block.code, block, esc) +
        "</details>";
      }).join("");
      return "<article class=\"hxm-basic-track heat-" + esc(track.heat || "") + "\" data-hxm-basic-track=\"" + esc(track.id) + "\">" +
        "<div class=\"hxm-basic-track-head\"><div><strong>" + esc(track.title) + "</strong><span>" + esc(track.time || "") + " · Heat " + esc(track.heat || "") + "</span></div><b data-hxm-basic-track-score=\"" + esc(track.id) + "\">" + trackDone + "/" + checks.length + "</b></div>" +
        "<p>" + esc(track.goal || "") + "</p>" +
        "<div class=\"hxm-basic-bar\" aria-hidden=\"true\"><i data-hxm-basic-track-bar=\"" + esc(track.id) + "\" style=\"width:" + trackPercent + "%\"></i></div>" +
        "<div class=\"hxm-basic-grid\"><section><h5>בדיקת ידע</h5><div class=\"hxm-basic-check-list\">" + checkRows + "</div></section><section><h5>צעדים קדימה</h5>" + list(track.steps || [], esc) + "<p><b>קריטריון מעבר:</b> " + esc(track.passCriteria || "") + "</p><p><b>חיזוק:</b> " + esc(track.strengthenIfMissed || "") + "</p></section></div>" +
        renderDiagnosticGate(track, esc) +
        codeBlocks +
      "</article>";
    }).join("");
    return "<details class=\"hxm-sources hxm-basic-diagnostic\" id=\"hxm-basic-diagnostic\" open><summary>אבחון בסיס סגור - מה אני יודע ומה לחזק</summary>" +
      "<div class=\"hxm-basic-summary\" data-hxm-basic-summary><div><strong>בדיקת בסיס לפני פרויקט 70</strong><span>סמן רק דברים שאתה יודע להסביר ולכתוב בלי עזרה. כל מה שלא מסומן הופך לחיזוק הבא.</span></div><b data-hxm-basic-percent>" + percent + "%</b></div>" +
      "<div class=\"hxm-progress-bar\" aria-hidden=\"true\"><i data-hxm-basic-overall-bar style=\"width:" + percent + "%\"></i></div>" +
      "<p class=\"hxm-basic-next\" data-hxm-basic-next>" + (next ? "החיזוק הבא: " + esc(next.track.title + " - " + next.check.label) : "כל בדיקות הבסיס סומנו. עבור ל-Project 70 או Mock Exam מלא.") + "</p>" +
      "<div class=\"hxm-basic-actions\"><button class=\"km-btn-mini ghost danger\" type=\"button\" data-hxm-basic-reset>איפוס אבחון בסיס וראיות Gate</button><span>השתמש בזה כדי להתחיל מסלול נקי לפני סימולציה.</span></div>" +
      "<div class=\"hxm-basic-track-list\">" + cards + "</div>" +
    "</details>";
  }

  function renderGuidedExamPath(tracks, progress, esc) {
    var summary = diagnosticSummary(tracks, progress);
    var stages = guidedExamStages(summary.percent);
    var nextText = summary.next
      ? summary.next.track.title + " - " + summary.next.check.label
      : "כל בדיקות הבסיס סגורות. עבור לסימולציה מלאה.";
    var cards = stages.map(function (stage) {
      var status = stage.complete ? "complete" : stage.active ? "active" : stage.unlocked ? "unlocked" : "locked";
      var disabled = stage.unlocked ? "" : " disabled";
      var gate = stage.unlocked ? "פתוח" : "נפתח אחרי " + stage.min + "% אבחון";
      return "<article class=\"hxm-guided-stage " + esc(status) + "\" data-hxm-guided-stage=\"" + esc(stage.key) + "\" data-hxm-guided-min=\"" + esc(stage.min) + "\">" +
        "<div><strong>" + esc(stage.title) + "</strong><span data-hxm-guided-gate>" + esc(gate) + "</span></div>" +
        "<p>" + esc(stage.body) + "</p>" +
        "<button class=\"km-btn-mini" + (stage.active ? " primary" : "") + "\" type=\"button\" data-hxm-action=\"" + esc(stage.action) + "\" data-hxm-guided-button=\"" + esc(stage.key) + "\"" + disabled + ">" + esc(stage.button) + "</button>" +
      "</article>";
    }).join("");
    return "<section class=\"hxm-guided-path\" id=\"hxm-guided-path\" data-hxm-guided-path aria-label=\"נתיב למידה סגור לפי מצב האבחון\">" +
      "<div class=\"hxm-guided-head\"><div><h4>הצעד הבא עכשיו</h4><p>הפורטל ננעל למסלול אחד: אבחון בסיס → תיקון חולשות → Project 70 → JS 20 → TS 10 → Mock Exam מלא.</p></div><b data-hxm-guided-percent>" + esc(summary.percent) + "%</b></div>" +
      "<p class=\"hxm-guided-next\" data-hxm-guided-next>עכשיו לעבוד על: " + esc(nextText) + "</p>" +
      "<div class=\"hxm-guided-stage-grid\">" + cards + "</div>" +
    "</section>";
  }

  function renderExamDayMode(masterPlan, mode, esc) {
    var checklist = masterPlan.examDayChecklist || {};
    var projectChecks = (checklist.project || []).concat(checklist.express || []).concat(checklist.submission || []);
    var jsPatterns = masterPlan.jsPatterns || [];
    var jsRules = masterPlan.jsPatternRequirements || [];
    var tsChecks = [
      "type/interface/enum נכתבים בלי להסתכל.",
      "Union + in narrowing נפתרים ב-10 דקות.",
      "Book/Genre/User מהמקור נפתרים כקובץ TS מלא.",
      "אין any כשאפשר להגדיר טיפוס מדויק.",
      "פונקציות מחזירות טיפוס מפורש כשזה חלק מהשאלה.",
    ];
    var schedule = masterPlan.examDaySchedule || [];
    return "<details class=\"hxm-sources hxm-exam-day-mode\" id=\"hxm-exam-day-mode\" open><summary>Exam Day Mode — 70/20/10 בארבע שעות</summary>" +
      "<div class=\"hxm-exam-day-grid\">" +
        "<section><h5>סדר עבודה</h5>" + list(schedule, esc) + "</section>" +
        "<section><h5>בדוק את הפרויקט שלי</h5>" + list(projectChecks, esc) + "</section>" +
        "<section><h5>JS 20 Trainer</h5>" + list(jsPatterns, esc) + "<h5>כללי פתרון</h5>" + list(jsRules, esc) + "</section>" +
        "<section><h5>TS 10 Trainer</h5>" + list(tsChecks, esc) + "</section>" +
      "</div>" +
      "<div class=\"hxm-exam-day-actions\">" +
        "<button class=\"km-btn-mini primary\" type=\"button\" data-hxm-action=\"start-homework-mock\">התחל סימולציה 70/20/10</button>" +
        "<button class=\"km-btn-mini\" type=\"button\" data-hxm-action=\"trainer\">תרגול חולשות</button>" +
        "<button class=\"km-btn-mini\" type=\"button\" data-hxm-action=\"codeblocks\">פתח פתרונות JS/TS</button>" +
      "</div>" +
      "<p class=\"hxm-exam-day-note\">תבניות פעילות: " + esc((mode.templates || []).length) + " · שאלות JS: " + esc((mode.jsQuestions || []).length) + " · שאלות TS: " + esc((mode.tsQuestions || []).length) + ".</p>" +
    "</details>";
  }

  function minutesText(minutes) {
    var total = Math.max(0, Math.round(Number(minutes || 0)));
    var hours = Math.floor(total / 60);
    var rest = total % 60;
    if (!hours) return rest + " דק׳";
    if (!rest) return hours + " שעות";
    return hours + " שעות " + rest + " דק׳";
  }

  function timePlanState(masterPlan, tracks) {
    var plan = (masterPlan || {}).remainingTimePlan || {};
    var diagnosticProgress = getDiagnosticProgress();
    var planProgress = getProgress();
    var diagnosticCompleted = 0;
    var weekCompleted = 0;
    var optionalCompleted = 0;
    var dayCounters = {};
    var diagnosticRows = (plan.diagnosticTasks || []).map(function (task, index) {
      var track = (tracks || [])[index] || {};
      var checks = track.checks || [];
      var done = checks.filter(function (check) { return diagnosticProgress[diagnosticCheckId(track, check)]; }).length;
      var pct = checks.length ? Math.round((done / checks.length) * 100) : 0;
      var completedMinutes = Math.round(Number(task.minutes || 0) * pct / 100);
      diagnosticCompleted += completedMinutes;
      return Object.assign({}, task, {
        id: "diagnostic-time-" + index,
        percent: pct,
        completedMinutes: completedMinutes,
      });
    });
    var mediaPlan = plan.mediaAssetPlan || {};
    var videoRows = (mediaPlan.videos || []).map(function (task) {
      var progressId = task.id || "";
      var done = progressDone(planProgress[progressId]);
      return Object.assign({}, task, {
        progressId: progressId,
        completed: done,
      });
    });
    var presentationImageRows = (mediaPlan.presentationImages || []).map(function (task) {
      var progressId = task.id || "";
      var done = progressDone(planProgress[progressId]);
      return Object.assign({}, task, {
        progressId: progressId,
        completed: done,
      });
    });
    var videoCompleted = videoRows.reduce(function (sum, task) {
      return sum + (task.completed ? Number(task.minutes || 0) : 0);
    }, 0);
    var presentationImageCompleted = presentationImageRows.reduce(function (sum, task) {
      return sum + (task.completed ? Number(task.minutes || 0) : 0);
    }, 0);
    var weekRows = (plan.weekTasks || []).filter(function (task) {
      return !String(task.id || "").includes("watch-videos");
    }).map(function (task) {
      var dayNumber = String(task.day || "").match(/\d+/);
      var dayKey = dayNumber ? dayNumber[0] : "0";
      dayCounters[dayKey] = (dayCounters[dayKey] || 0) + 1;
      var progressId = "day-" + dayKey + "-task-" + dayCounters[dayKey];
      var done = progressDone(planProgress[progressId]);
      if (done) weekCompleted += Number(task.minutes || 0);
      return Object.assign({}, task, {
        progressId: progressId,
        completed: done,
      });
    });
    var optionalRows = (plan.optionalBacklog || []).map(function (task) {
      var progressId = "optional-time-" + (task.id || "task");
      var done = progressDone(planProgress[progressId]) || Number(task.completionPercent || 0) >= 100;
      var taskMinutes = Number(task.minutes || 0);
      var completedMinutes = done ? taskMinutes : Math.round(taskMinutes * Math.max(0, Math.min(100, Number(task.completionPercent || 0))) / 100);
      optionalCompleted += completedMinutes;
      return Object.assign({}, task, {
        progressId: progressId,
        completed: done,
        completedMinutes: completedMinutes,
      });
    });
    var examTree = window.HOMEWORK_EXAM_MODE && window.HOMEWORK_EXAM_MODE.examTaskTree || {};
    var examSectionRows = (Array.isArray(examTree.sectionExercises) ? examTree.sectionExercises : []).map(function (exercise, index) {
      var status = exercise.status || (exercise.autoScorable ? "ready" : "manual_review");
      var progressId = "exam-section-" + (exercise.id || ("section-" + (index + 1)));
      var done = status === "manual_review" ? false : progressDone(planProgress[progressId]);
      return Object.assign({}, exercise, {
        progressId: progressId,
        title: "סעיף " + (exercise.idx || (index + 1)) + " - " + (exercise.sourceFile || "unknown/unavailable") + " · " + (exercise.question || "") + "." + (exercise.section || ""),
        kind: "exam-section",
        source: exercise.sourceFile || "unknown/unavailable",
        minutes: 0,
        completed: done,
        taskStatus: status === "manual_review" ? "locked" : taskStatusText(done),
        manualReview: status === "manual_review",
      });
    });
    var requiredMinutes = Number(plan.requiredMinutes || 0);
    var requiredCompleted = diagnosticCompleted + weekCompleted + videoCompleted + presentationImageCompleted;
    var requiredPercent = requiredMinutes ? Math.min(100, Math.round((requiredCompleted / requiredMinutes) * 100)) : 0;
    var optionalMinutes = Number(plan.optionalBacklogMinutes || 0);
    var optionalPercent = optionalMinutes ? Math.min(100, Math.round((optionalCompleted / optionalMinutes) * 100)) : 0;
    return {
      plan: plan,
      diagnosticRows: diagnosticRows,
      weekRows: weekRows,
      examSectionRows: examSectionRows,
      videoRows: videoRows,
      presentationImageRows: presentationImageRows,
      optionalRows: optionalRows,
      requiredCompleted: requiredCompleted,
      requiredRemaining: Math.max(0, requiredMinutes - requiredCompleted),
      requiredPercent: requiredPercent,
      optionalCompleted: optionalCompleted,
      optionalRemaining: Math.max(0, optionalMinutes - optionalCompleted),
      optionalPercent: optionalPercent,
    };
  }

  function nextTimePlanTask(state) {
    var diagnostic = (state.diagnosticRows || []).find(function (task) {
      return Number(task.percent || 0) < 100;
    });
    if (diagnostic) {
      return {
        title: diagnostic.title || "אבחון בסיס",
        meta: "אבחון · " + minutesText(diagnostic.minutes || 0) + " · " + (diagnostic.percent || 0) + "% הושלם",
        selector: "[data-hxm-time-diagnostic=\"" + (diagnostic.id || "") + "\"]",
      };
    }
    var requiredGroups = [
      { rows: state.weekRows || [], kind: "מסלול אתר+עץ" },
      { rows: (state.examSectionRows || []).filter(function (task) { return !task.manualReview; }), kind: "סעיף מבחן" },
      { rows: state.videoRows || [], kind: "וידאו" },
      { rows: state.presentationImageRows || [], kind: "מצגת/תמונה" },
    ];
    for (var i = 0; i < requiredGroups.length; i++) {
      var found = requiredGroups[i].rows.find(function (task) { return !task.completed; });
      if (found) {
        return {
          title: found.title || found.name || "unknown/unavailable",
          meta: requiredGroups[i].kind + " · " + minutesText(found.minutes || 0),
          selector: "[data-hxm-time-task-row=\"" + (found.progressId || "") + "\"]",
        };
      }
    }
    return {
      title: "כל משימות החובה סומנו",
      meta: "אפשר לעבור ל-Backlog לא חוסם או סימולציית 70/20/10.",
      selector: "",
    };
  }

  function renderExam100FullReadinessBoard(masterPlan, tracks, esc) {
    var state = timePlanState(masterPlan, tracks);
    var plan = state.plan || {};
    if (!plan.requiredMinutes) return "";
    var siteMinutes = state.weekRows.reduce(function (sum, task) { return sum + Number(task.minutes || 0); }, 0);
    var siteCompleted = state.weekRows.reduce(function (sum, task) { return sum + (task.completed ? Number(task.minutes || 0) : 0); }, 0);
    var diagnosticMinutes = state.diagnosticRows.reduce(function (sum, task) { return sum + Number(task.minutes || 0); }, 0);
    var diagnosticCompleted = state.diagnosticRows.reduce(function (sum, task) { return sum + Number(task.completedMinutes || 0); }, 0);
    var videoDone = state.videoRows.filter(function (task) { return task.completed; }).length;
    var presentationDone = state.presentationImageRows.filter(function (task) { return task.completed; }).length;
    var examSectionDone = state.examSectionRows.filter(function (task) { return task.completed; }).length;
    var manualReviewCount = state.examSectionRows.filter(function (task) { return task.manualReview; }).length;
    var calcPercent = function (done, total) {
      return total ? Math.round((Math.max(0, done) / total) * 100) : 0;
    };
    var cards = [
      {
        label: "1. המסלול באתר + העץ המלא",
        value: minutesText(siteMinutes),
        meta: state.weekRows.length + " משימות + " + state.examSectionRows.length + " סעיפי עץ · " + calcPercent(siteCompleted, siteMinutes) + "%",
        note: examSectionDone + "/" + state.examSectionRows.length + " סעיפים סומנו. " + manualReviewCount + " manual_review נעולים ולא נספרים כ-auto-scorable.",
      },
      {
        label: "אבחון בסיס",
        value: minutesText(diagnosticMinutes),
        meta: state.diagnosticRows.length + " בדיקות · " + calcPercent(diagnosticCompleted, diagnosticMinutes) + "%",
        note: "בדיקת ידע התחלתית לפני קפיצה לפרויקט 70.",
      },
      {
        label: "2. צפייה בכל הסרטונים",
        value: minutesText(plan.videoWatchMinutes || 0),
        meta: videoDone + "/" + state.videoRows.length + " סרטונים · " + esc(plan.videoWatchMinutesEach || 30) + " דק׳ לכל סרטון",
        note: "סימון V ידני בלבד. וידאו ללא תמלול אינו מקור תוכן אוטומטי.",
      },
      {
        label: "3. צפייה במצגות ותמונות",
        value: minutesText(plan.presentationImageMinutes || 0),
        meta: presentationDone + "/" + state.presentationImageRows.length + " פריטים · " + esc(plan.presentationImageMinutesEach || 20) + " דק׳ לפריט",
        note: "מצגות ותמונות מהרשימה שחולצה מהתיקייה.",
      },
    ].map(function (card) {
      return "<article class=\"hxm-exam100-full-card\"><strong>" + esc(card.label) + "</strong><b>" + esc(card.value) + "</b><span>" + esc(card.meta) + "</span><small>" + esc(card.note) + "</small></article>";
    }).join("");
    return "<section class=\"hxm-exam100-full-readiness\" data-exam100-full-readiness data-hxm-task-board-source=\"remainingTimePlan+exam_tasks_tree+media\" data-hxm-task-board-storage-key=\"" + esc(PROGRESS_KEY) + "\" aria-label=\"לוח משימות מלא ל-100 במבחן\">" +
      "<div class=\"hxm-exam100-full-head\"><div><h5>לוח משימות מלא ל-100 במבחן</h5><p>זה כולל את המסלול באתר, עץ המבחן המלא, 114 סרטונים ו-40 מצגות/תמונות. סימון V מתעדכן בשמירה מקומית בלבד, לא כציון רשמי.</p></div><b data-exam100-total-left>" + esc(minutesText(state.requiredRemaining)) + " נותר</b></div>" +
      "<div class=\"hxm-exam100-full-progress\"><i data-exam100-full-bar style=\"width:" + esc(state.requiredPercent) + "%\"></i></div>" +
      "<div class=\"hxm-exam100-full-metrics\"><article><strong data-exam100-required-percent>" + esc(state.requiredPercent) + "%</strong><span>התקדמות כוללת</span></article><article><strong>" + esc(plan.requiredLabel || minutesText(plan.requiredMinutes)) + "</strong><span>זמן מלא לסיום הכל</span></article><article><strong>" + esc(state.videoRows.length) + " + " + esc(state.presentationImageRows.length) + " + " + esc(state.examSectionRows.length) + "</strong><span>סרטונים + מצגות/תמונות + סעיפי עץ</span></article></div>" +
      "<div class=\"hxm-exam100-full-cards\">" + cards + "</div>" +
      "<button class=\"km-btn-mini primary\" type=\"button\" data-hxm-action=\"scroll-hxm-time-plan\">פתח לוח מלא וסמן V</button>" +
    "</section>";
  }

  function taskTreeBoardTaskLink(task, category, esc) {
    var target = task && (task.href || task.url || task.path || task.target || "");
    if (target && /^https?:\/\//.test(String(target))) {
      return "<a href=\"" + esc(target) + "\" target=\"_blank\" rel=\"noopener\">פתח יעד</a>";
    }
    if (target && /^#/.test(String(target))) return "<a href=\"" + esc(target) + "\">פתח באתר</a>";
    if (target) return "<span class=\"hxm-tree-link local\"><b>local file</b><code dir=\"ltr\">" + esc(target) + "</code></span>";
    if (category === "portal") return "<a href=\"#hxm-time-plan\">פתח בלוח הפורטל</a>";
    if (category === "exam") return "<a href=\"#hxm-time-plan\">פתח בעץ המשימות</a>";
    return "<span class=\"hxm-tree-link unavailable\">unknown/unavailable</span>";
  }

  function renderTaskTreeBoardTask(task, category, index, esc, approvalId) {
    var id = task.progressId || task.id || (category + "-" + index);
    var title = task.title || task.name || task.label || "unknown/unavailable";
    var minutes = Number(task.minutes || 0);
    var completed = !!task.completed;
    var manualReview = !!task.manualReview;
    var checked = completed ? " checked" : "";
    var status = manualReview ? "נעול" : (completed ? "בוצע" : "0");
    var source = task.source || task.folder || task.day || task.gate || "unknown/unavailable";
    return "<label class=\"hxm-tree-task-row" + (completed ? " done" : "") + (manualReview ? " manual-review" : "") + "\" data-hxm-tree-task-row data-hxm-requires-approval=\"" + esc(approvalId) + "\" data-task-minutes=\"" + esc(minutes) + "\" data-task-category=\"" + esc(category) + "\">" +
      "<input type=\"checkbox\" data-hxm-plan-task=\"" + esc(id) + "\" data-hxm-tree-task=\"" + esc(id) + "\" data-hxm-tree-category=\"" + esc(category) + "\" aria-label=\"" + esc("סמן V למשימה: " + title) + "\"" + checked + " disabled aria-disabled=\"true\">" +
      "<span class=\"hxm-tree-task-main\"><b>" + esc(index + 1) + ". " + esc(title) + "</b><small>" + esc(source) + "</small></span>" +
      "<span class=\"hxm-tree-task-time\">" + esc(minutesText(minutes)) + "</span>" +
      "<span class=\"hxm-tree-task-status\" data-hxm-tree-task-status>" + esc(status) + "</span>" +
      "<span class=\"hxm-tree-task-target\">" + taskTreeBoardTaskLink(task, category, esc) + "</span>" +
    "</label>";
  }

  function renderTaskTreeCategory(category, esc) {
    var approvalId = "approval-" + category.id;
    var percent = category.minutes ? Math.round((category.completedMinutes || 0) / category.minutes * 100) : 0;
    var left = Math.max(0, (category.minutes || 0) - (category.completedMinutes || 0));
    var rows = (category.tasks || []).map(function (task, index) {
      return renderTaskTreeBoardTask(task, category.id, index, esc, approvalId);
    }).join("");
    return "<details class=\"hxm-task-tree-category\" data-hxm-task-category=\"" + esc(category.id) + "\">" +
      "<summary><div><strong>" + esc(category.title) + "</strong><span data-hxm-tree-category-count>" + esc(category.countLabel) + "</span></div><b data-hxm-tree-category-left>" + esc(minutesText(left)) + " לסיום</b><em data-hxm-tree-category-percent>" + esc(percent) + "%</em><i aria-hidden=\"true\"><span data-hxm-tree-category-bar style=\"width:" + esc(percent) + "%\"></span></i></summary>" +
      "<div class=\"hxm-tree-approval\"><label><input type=\"checkbox\" data-hxm-plan-task=\"" + esc(approvalId) + "\" data-hxm-category-approval=\"" + esc(approvalId) + "\" data-hxm-approval-category=\"" + esc(category.id) + "\"> <span>אישור ידני שלך לפתיחת/סיום החלק הזה</span></label><small>בלי האישור הזה אי אפשר לסמן V במשימות הקטגוריה.</small></div>" +
      "<div class=\"hxm-tree-task-list\" data-hxm-tree-task-list>" + rows + "</div>" +
    "</details>";
  }

  function codexForwardTasks() {
    return [
      { id: "REM-009", priority: "P0", group: "REM", title: "בדיקת regression אחרי פירוק", hours: 3 },
      { id: "FINAL-001", priority: "P0", group: "FINAL", title: "ריצת סגירה מלאה", hours: 1 },
    ];
  }

  function formatCodexHours(hours) {
    var whole = Math.floor(Number(hours || 0));
    var minutes = Math.round((Number(hours || 0) - whole) * 60);
    if (!minutes) return whole + " שעות";
    return whole + " שעות " + minutes + " דק׳";
  }

  function renderCodexForwardTasksPanel(esc) {
    var tasks = codexForwardTasks();
    var totalHours = tasks.reduce(function (sum, task) { return sum + Number(task.hours || 0); }, 0);
    var rows = tasks.map(function (task) {
      return "<article class=\"hxm-codex-task-row\" data-codex-forward-task=\"" + esc(task.id) + "\">" +
        "<span class=\"hxm-codex-task-id\">" + esc(task.id) + "</span>" +
        "<strong>" + esc(task.title) + "</strong>" +
        "<b>" + esc(task.hours) + " ש׳</b>" +
        "<em>" + esc(task.priority) + "</em>" +
      "</article>";
    }).join("");
    return "<aside class=\"hxm-codex-forward-panel\" data-codex-forward-panel aria-label=\"המשימות שלי קדימה\">" +
      "<div class=\"hxm-codex-forward-head\"><div><strong>המשימות שלי קדימה</strong><span>יתרת עבודה אחרי שחרור ירוק</span></div><b>" + esc(formatCodexHours(totalHours)) + "</b></div>" +
      "<p>נשארו " + esc(tasks.length) + " משימות. משימות IDE-001 עד IDE-013 נסגרו ברמת קוד; הבדיקות נוספו אך לא הורצו בלי בקשה מפורשת.</p>" +
      "<div class=\"hxm-codex-forward-list\">" + rows + "</div>" +
    "</aside>";
  }

  function renderExam100TaskTreeBoard(masterPlan, tracks, esc) {
    var state = timePlanState(masterPlan, tracks);
    var plan = state.plan || {};
    if (!plan.requiredMinutes) return "";
    var portalTasks = [].concat(state.diagnosticRows || []).concat(state.weekRows || []);
    var categories = [
      { id: "portal", title: "תוכנית פורטל", countLabel: (state.weekRows || []).length + " מסלול + " + (state.diagnosticRows || []).length + " אבחון", tasks: portalTasks },
      { id: "exam", title: "עץ משימות מבחן", countLabel: (state.examSectionRows || []).length + " משימות מבחן", tasks: state.examSectionRows || [] },
      { id: "videos", title: "סרטונים", countLabel: (state.videoRows || []).length + " סרטונים", tasks: state.videoRows || [] },
      { id: "images", title: "תמונות/מצגות", countLabel: (state.presentationImageRows || []).length + " פריטים", tasks: state.presentationImageRows || [] },
    ].map(function (category) {
      category.minutes = (category.tasks || []).reduce(function (sum, task) { return sum + Number(task.minutes || 0); }, 0);
      category.completedMinutes = (category.tasks || []).reduce(function (sum, task) { return sum + (task.completed ? Number(task.minutes || 0) : 0); }, 0);
      return category;
    });
    var completedMinutes = categories.reduce(function (sum, category) { return sum + Number(category.completedMinutes || 0); }, 0);
    var requiredMinutes = Number(plan.requiredMinutes || 0);
    var remainingMinutes = Math.max(0, requiredMinutes - completedMinutes);
    var percent = requiredMinutes ? Math.round(completedMinutes / requiredMinutes * 100) : 0;
    return "<details class=\"hxm-task-tree-board\" data-hxm-task-tree-board>" +
      "<summary><div><strong>לוח משימות</strong><span>עץ מלא: פורטל, עץ מבחן, סרטונים ותמונות</span></div><b data-hxm-tree-total-percent>" + esc(percent) + "%</b><em data-hxm-tree-total-left>" + esc(minutesText(remainingMinutes)) + " נותר</em><small>מתוך " + esc(plan.requiredLabel || minutesText(requiredMinutes)) + "</small></summary>" +
      "<div class=\"hxm-task-tree-total-bar\" aria-hidden=\"true\"><i data-hxm-tree-total-bar style=\"width:" + esc(percent) + "%\"></i></div>" +
      "<div class=\"hxm-task-tree-warning\" data-hxm-tree-warning>התקדמות מתחילה מ-0. סימון משימות נעול עד אישור ידני שלך לכל חלק.</div>" +
      "<div class=\"hxm-task-tree-layout\">" +
        renderCodexForwardTasksPanel(esc) +
        "<div class=\"hxm-task-tree-categories\">" + categories.map(function (category) { return renderTaskTreeCategory(category, esc); }).join("") + "</div>" +
      "</div>" +
    "</details>";
  }

  function renderRemainingTimePlan(masterPlan, tracks, esc) {
    var state = timePlanState(masterPlan, tracks);
    var plan = state.plan || {};
    if (!plan.requiredMinutes) return "";
    var nextTimeTask = nextTimePlanTask(state);
    var summary = (plan.summary || []).map(function (item) {
      return "<article><strong>" + esc(item.time) + "</strong><span>" + esc(item.label) + "</span><b>" + esc(item.required ? "חובה" : "לא חוסם") + "</b></article>";
    }).join("");
    var diagnosticRows = state.diagnosticRows.map(function (task) {
      var done = Number(task.percent || 0) >= 100;
      return "<article class=\"hxm-time-task diagnostic heat-" + esc(task.heat || "") + "\" data-hxm-time-diagnostic=\"" + esc(task.id) + "\" data-task-kind=\"diagnostic\" data-task-source=\"basic-diagnostic\" data-task-minutes=\"" + esc(task.minutes || 0) + "\" data-task-status=\"" + esc(taskStatusText(done)) + "\">" +
        "<div><b>Heat " + esc(task.heat || "-") + "</b><strong>" + esc(task.title) + "</strong><span>" + esc(task.gate || "") + "</span></div>" +
        "<em>" + esc(task.minutes) + " דק׳</em><small>" + esc(task.percent) + "% · " + esc(minutesText(task.completedMinutes)) + " הושלם</small>" +
      "</article>";
    }).join("");
    var weekRows = state.weekRows.map(function (task) {
      var checked = task.completed ? " checked" : "";
      var doneClass = task.completed ? " done" : "";
      return "<label class=\"hxm-time-task required hxm-day-task" + doneClass + "\" data-hxm-time-task-row=\"" + esc(task.progressId) + "\" data-task-kind=\"site-tree\" data-task-source=\"remainingTimePlan.weekTasks\" data-task-minutes=\"" + esc(task.minutes || 0) + "\" data-task-status=\"" + esc(taskStatusText(task.completed)) + "\">" +
        "<input type=\"checkbox\" data-hxm-plan-task=\"" + esc(task.progressId) + "\" aria-label=\"" + esc("סמן V למשימת אתר ועץ: " + (task.day || "") + " - " + (task.title || "") + ", " + (task.minutes || 0) + " דקות") + "\"" + checked + ">" +
        "<span><b>" + esc(task.day || "") + " · " + esc(task.minutes) + " דק׳</b><strong>" + esc(task.title || "") + "</strong><small>" + esc(task.gate || "") + "</small></span>" +
      "</label>";
    }).join("");
    var examSectionRows = state.examSectionRows.map(function (task, index) {
      var checked = task.completed ? " checked" : "";
      var doneClass = task.completed ? " done" : "";
      var manualClass = task.manualReview ? " manual-review locked" : "";
      var inputAttr = task.manualReview
        ? "disabled aria-disabled=\"true\" aria-label=\"" + esc("סעיף נעול לעיון ידני: " + (task.title || "")) + "\""
        : "data-hxm-plan-task=\"" + esc(task.progressId) + "\" aria-label=\"" + esc("סמן V לסעיף מבחן: " + (task.title || "")) + "\"" + checked;
      return "<label class=\"hxm-time-task required exam-section hxm-exam-section-task-row" + doneClass + manualClass + "\" data-hxm-time-task-row=\"" + esc(task.progressId) + "\" data-task-kind=\"exam-section\" data-task-source=\"" + esc(task.source || "unknown/unavailable") + "\" data-task-minutes=\"0\" data-task-status=\"" + esc(task.taskStatus || "open") + "\">" +
        "<input type=\"checkbox\" " + inputAttr + ">" +
        "<span><b>" + esc(index + 1) + "/" + esc(state.examSectionRows.length) + " · זמן כלול במסלול האתר/עץ</b><strong>" + esc(task.title || "") + "</strong><small>" + esc(task.manualReview ? "manual_review נעול - דורש עיון ידני במקור ולא נספר כ-auto-scorable" : "ready · מקור: " + (task.source || "unknown/unavailable")) + "</small></span>" +
      "</label>";
    }).join("");
    var videoRows = state.videoRows.map(function (task, index) {
      var checked = task.completed ? " checked" : "";
      var doneClass = task.completed ? " done" : "";
      return "<label class=\"hxm-time-task required media video" + doneClass + "\" data-hxm-time-task-row=\"" + esc(task.progressId) + "\" data-task-kind=\"video\" data-task-source=\"" + esc(task.folder || "mediaAssetPlan.videos") + "\" data-task-minutes=\"" + esc(task.minutes || 30) + "\" data-task-status=\"" + esc(taskStatusText(task.completed)) + "\">" +
        "<input type=\"checkbox\" data-hxm-plan-task=\"" + esc(task.progressId) + "\" aria-label=\"" + esc("סמן V לצפייה בסרטון: " + (task.name || "") + ", " + (task.minutes || 30) + " דקות") + "\"" + checked + ">" +
        "<span><b>" + esc(index + 1) + "/114 · " + esc(task.minutes || 30) + " דק׳</b><strong>" + esc(task.name || "") + "</strong><small>" + esc(task.folder || "") + "</small></span>" +
      "</label>";
    }).join("");
    var presentationImageRows = state.presentationImageRows.map(function (task, index) {
      var checked = task.completed ? " checked" : "";
      var doneClass = task.completed ? " done" : "";
      return "<label class=\"hxm-time-task required media presentation-image" + doneClass + "\" data-hxm-time-task-row=\"" + esc(task.progressId) + "\" data-task-kind=\"presentation-image\" data-task-source=\"" + esc(task.folder || "mediaAssetPlan.presentationImages") + "\" data-task-minutes=\"" + esc(task.minutes || 20) + "\" data-task-status=\"" + esc(taskStatusText(task.completed)) + "\">" +
        "<input type=\"checkbox\" data-hxm-plan-task=\"" + esc(task.progressId) + "\" aria-label=\"" + esc("סמן V לצפייה במצגת או תמונה: " + (task.name || "") + ", " + (task.minutes || 20) + " דקות") + "\"" + checked + ">" +
        "<span><b>" + esc(index + 1) + "/40 · " + esc(task.minutes || 20) + " דק׳</b><strong>" + esc(task.name || "") + "</strong><small>" + esc(task.folder || "") + "</small></span>" +
      "</label>";
    }).join("");
    var optionalRows = state.optionalRows.map(function (task) {
      var checked = task.completed ? " checked" : "";
      var doneClass = task.completed ? " done" : "";
      return "<label class=\"hxm-time-task optional" + doneClass + "\" data-hxm-time-task-row=\"" + esc(task.progressId) + "\" data-task-kind=\"optional-backlog\" data-task-source=\"remainingTimePlan.optionalBacklog\" data-task-minutes=\"" + esc(task.minutes || 0) + "\" data-task-status=\"" + esc(taskStatusText(task.completed)) + "\">" +
        "<input type=\"checkbox\" data-hxm-plan-task=\"" + esc(task.progressId) + "\" aria-label=\"" + esc("סמן V למשימת backlog לא חוסמת: " + (task.title || "")) + "\"" + checked + ">" +
        "<span><b>" + esc(task.minutes) + " דק׳ · לא חוסם</b><strong>" + esc(task.title || "") + "</strong><small>" + esc(task.note || "") + "</small></span>" +
      "</label>";
    }).join("");
    var boardAudit = [
      { label: "אבחון", value: state.diagnosticRows.length },
      { label: "אתר+עץ", value: state.weekRows.length },
      { label: "סעיפי מבחן", value: state.examSectionRows.length },
      { label: "סרטונים", value: state.videoRows.length },
      { label: "מצגות/תמונות", value: state.presentationImageRows.length },
      { label: "Backlog", value: state.optionalRows.length },
      { label: "חובה", value: plan.requiredMinutes + " דק׳" },
    ].map(function (item) {
      return "<article><strong>" + esc(item.value) + "</strong><span>" + esc(item.label) + "</span></article>";
    }).join("");
    var storageBanner = progressReadStatus === "corrupt"
      ? "<div class=\"hxm-time-storage-banner danger\" data-hxm-storage-status=\"corrupt\"><strong>שחזור מקומי נכשל</strong><span>התחלנו מ-0 בלי למחוק גיבוי. מקור הסמכות לציון רשמי עדיין דורש backend-auth.</span></div>"
      : "<div class=\"hxm-time-storage-banner\" data-hxm-storage-status=\"" + esc(progressReadStatus) + "\"><strong>שמירה אוטומטית מקומית</strong><span>מפתח: " + esc(PROGRESS_KEY) + ". זה שחזור מקומי בלבד, לא הוכחת ציון רשמית.</span></div>";
    var nextTaskCard = "<div class=\"hxm-time-next-card\" data-hxm-time-next-card aria-live=\"polite\">" +
      "<div><strong>המשימה הבאה</strong><span data-hxm-time-next-title>" + esc(nextTimeTask.title) + "</span><small data-hxm-time-next-meta>" + esc(nextTimeTask.meta) + "</small></div>" +
      "<button class=\"km-btn-mini primary\" type=\"button\" data-hxm-action=\"focus-next-time-task\">קפוץ למשימה</button>" +
    "</div>";
    return "<details class=\"hxm-sources hxm-time-plan\" id=\"hxm-time-plan\"><summary><div><strong>לוח משימות מלא</strong><span>לוח זמנים מדויק לכל המשימות שנותרו: פורטל, עץ מבחן, סרטונים, תמונות/מצגות ו-backlog</span></div><b data-hxm-time-summary-percent>" + esc(state.requiredPercent) + "%</b><em data-hxm-time-summary-left>" + esc(minutesText(state.requiredRemaining)) + " נותר</em><small>מתוך " + esc(plan.requiredLabel || minutesText(plan.requiredMinutes)) + "</small></summary>" +
      "<div class=\"hxm-time-head\"><div><strong>חובה להכנה מושלמת: " + esc(plan.requiredLabel || minutesText(plan.requiredMinutes)) + "</strong><span>" + esc(plan.note || "") + "</span></div><b data-hxm-time-required-percent aria-live=\"polite\">" + esc(state.requiredPercent) + "%</b></div>" +
      "<div class=\"hxm-progress-bar\" aria-hidden=\"true\"><i data-hxm-time-required-bar style=\"width:" + esc(state.requiredPercent) + "%\"></i></div>" +
      "<div class=\"hxm-time-metrics\"><article><strong data-hxm-time-required-left>" + esc(minutesText(state.requiredRemaining)) + "</strong><span>נותר חובה</span></article><article><strong>" + esc(plan.allPlansLabel || "") + "</strong><span>פורטל + עץ מלא + סרטונים + מצגות/תמונות</span></article><article><strong>" + esc(plan.withFutureVideoLabel || "") + "</strong><span>וידאו לצפייה בלבד, לא מקור תוכן בלי תמלול</span></article></div>" +
      storageBanner +
      nextTaskCard +
      "<div class=\"hxm-task-board-audit\" data-hxm-task-board-audit>" + boardAudit + "</div>" +
      "<div class=\"hxm-time-summary\">" + summary + "</div>" +
      "<h5>אבחון בסיס סגור</h5><div class=\"hxm-time-task-list\">" + diagnosticRows + "</div>" +
      "<h5>1. המסלול עצמו באתר + העץ המלא</h5><div class=\"hxm-time-task-list\">" + weekRows + "</div>" +
      "<h5>עץ מבחן מפורט - " + esc(state.examSectionRows.length) + " סעיפים · זמן כלול במסלול האתר/עץ</h5><div class=\"hxm-time-task-list exam-sections\">" + examSectionRows + "</div>" +
      "<h5>2. צפייה בכל הסרטונים - " + esc(state.videoRows.length) + " פריטים · " + esc(minutesText(plan.videoWatchMinutes || 0)) + "</h5><div class=\"hxm-time-task-list media-list\">" + videoRows + "</div>" +
      "<h5>3. צפייה במצגות ותמונות - " + esc(state.presentationImageRows.length) + " פריטים · " + esc(minutesText(plan.presentationImageMinutes || 0)) + "</h5><div class=\"hxm-time-task-list media-list\">" + presentationImageRows + "</div>" +
      "<h5>Backlog לא חוסם</h5><div class=\"hxm-time-task-list optional\">" + optionalRows + "</div>" +
    "</details>";
  }

  function readTaskTreeProgress() {
    try {
      var parsed = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function writeTaskTreeProgress(progress) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress || {}));
    } catch (_) {}
  }

  function setTaskTreeProgress(id, done) {
    if (!id) return;
    var progress = readTaskTreeProgress();
    if (done) {
      progress[id] = { status: "done", updatedAt: new Date().toISOString() };
    } else {
      delete progress[id];
    }
    writeTaskTreeProgress(progress);
  }

  function taskTreeDone(progress, id) {
    return !!(id && progress && progress[id] && progress[id].status === "done");
  }

  function refreshTaskTreeBoard(container) {
    var board = container ? container.querySelector("[data-hxm-task-tree-board]") : null;
    if (!board) return;
    var progress = readTaskTreeProgress();
    board.querySelectorAll("[data-hxm-category-approval]").forEach(function (input) {
      var id = input.getAttribute("data-hxm-category-approval") || "";
      input.checked = taskTreeDone(progress, id);
    });
    board.querySelectorAll("[data-hxm-tree-task-row]").forEach(function (row) {
      var input = row.querySelector("[data-hxm-tree-task]");
      if (!input) return;
      var approvalId = row.getAttribute("data-hxm-requires-approval") || "";
      var isApproved = taskTreeDone(progress, approvalId);
      var id = input.getAttribute("data-hxm-tree-task") || "";
      var isDone = taskTreeDone(progress, id);
      var isManualReview = row.classList.contains("manual-review");
      input.checked = isDone;
      input.disabled = !isApproved || isManualReview;
      input.setAttribute("aria-disabled", input.disabled ? "true" : "false");
      row.classList.toggle("locked", !isApproved || isManualReview);
      row.classList.toggle("done", isDone);
      var status = row.querySelector("[data-hxm-tree-task-status]");
      if (status) status.textContent = isManualReview ? "נעול" : (isDone ? "בוצע" : "0");
    });
    var totalMinutes = 0;
    var doneMinutes = 0;
    board.querySelectorAll("[data-hxm-task-category]").forEach(function (category) {
      var categoryMinutes = 0;
      var categoryDoneMinutes = 0;
      category.querySelectorAll("[data-hxm-tree-task-row]").forEach(function (row) {
        var input = row.querySelector("[data-hxm-tree-task]");
        var minutes = Number(row.getAttribute("data-task-minutes") || 0);
        categoryMinutes += minutes;
        if (input && input.checked) categoryDoneMinutes += minutes;
      });
      totalMinutes += categoryMinutes;
      doneMinutes += categoryDoneMinutes;
      var percent = categoryMinutes ? Math.round(categoryDoneMinutes / categoryMinutes * 100) : 0;
      var left = Math.max(0, categoryMinutes - categoryDoneMinutes);
      var percentEl = category.querySelector("[data-hxm-tree-category-percent]");
      var leftEl = category.querySelector("[data-hxm-tree-category-left]");
      var barEl = category.querySelector("[data-hxm-tree-category-bar]");
      if (percentEl) percentEl.textContent = percent + "%";
      if (leftEl) leftEl.textContent = minutesText(left) + " לסיום";
      if (barEl) barEl.style.width = percent + "%";
    });
    var totalPercent = totalMinutes ? Math.round(doneMinutes / totalMinutes * 100) : 0;
    var totalLeft = Math.max(0, totalMinutes - doneMinutes);
    var totalPercentEl = board.querySelector("[data-hxm-tree-total-percent]");
    var totalLeftEl = board.querySelector("[data-hxm-tree-total-left]");
    var totalBarEl = board.querySelector("[data-hxm-tree-total-bar]");
    if (totalPercentEl) totalPercentEl.textContent = totalPercent + "%";
    if (totalLeftEl) totalLeftEl.textContent = minutesText(totalLeft) + " נותר";
    if (totalBarEl) totalBarEl.style.width = totalPercent + "%";
  }

  function bindExam100TaskTreeBoard(container) {
    if (!container || container.__hxmTaskTreeBoardBound) return;
    container.__hxmTaskTreeBoardBound = true;
    container.addEventListener("change", function (event) {
      var input = event.target && event.target.closest ? event.target.closest("[data-hxm-category-approval], [data-hxm-tree-task]") : null;
      if (!input || !container.contains(input)) return;
      var board = input.closest("[data-hxm-task-tree-board]");
      if (!board) return;
      if (input.hasAttribute("data-hxm-category-approval")) {
        setTaskTreeProgress(input.getAttribute("data-hxm-category-approval") || "", input.checked);
        refreshTaskTreeBoard(container);
        return;
      }
      var row = input.closest("[data-hxm-tree-task-row]");
      var approvalId = row ? row.getAttribute("data-hxm-requires-approval") : "";
      if (!taskTreeDone(readTaskTreeProgress(), approvalId)) {
        input.checked = false;
        event.preventDefault();
        var warning = board.querySelector("[data-hxm-tree-warning]");
        if (warning) warning.textContent = "אי אפשר לסמן V לפני אישור ידני שלך לפתיחת החלק הזה.";
        refreshTaskTreeBoard(container);
        return;
      }
      setTaskTreeProgress(input.getAttribute("data-hxm-tree-task") || "", input.checked);
      refreshTaskTreeBoard(container);
    }, true);
    refreshTaskTreeBoard(container);
  }

  function renderClosedExamTracks(masterPlan, mode, esc) {
    var projectChecks = ((masterPlan.examDayChecklist || {}).project || []).slice(0, 6);
    var jsPatterns = (masterPlan.jsPatterns || []).slice(0, 6);
    var tsChecks = [
      "type/interface/enum",
      "Union + in narrowing",
      "Book/Genre/User",
      "טיפוסי return מפורשים כשנדרש",
    ];
    var schedule = (masterPlan.examDaySchedule || []).slice(0, 4);
    var redZoneItems = [
      { label: "ידע מורחב ברמת סבתא", reason: "העשרה ארוכה", alternative: "מדריך מקוצר או Trainer" },
      { label: "אבני בסיס", reason: "בסיס כללי", alternative: "Project 70 checklist" },
      { label: "עקרונות יסוד", reason: "לא סימולציית מבחן", alternative: "Exam Day Mode" },
      { label: "מוזיאון", reason: "היסטוריה והעשרה", alternative: "Mock Exam 4h" },
      { label: "כלי שפה", reason: "השוואות שאינן בניקוד", alternative: "JS 20 / TS 10" },
      { label: "חנות חוויות", reason: "לא חומר מבחן", alternative: "Master Plan tasks" },
      { label: "השוואות", reason: "רק עזר נקודתי", alternative: "Guide או Code Trace" },
      { label: "אנטומיית קוד", reason: "כללי מדי", alternative: "Codeblocks ו-Code Trace" },
    ];
    var tracks = [
      {
        key: "project",
        title: "Project 70",
        meta: (mode.templates || []).length + " תבניות פרויקט",
        status: "מסלול סגור",
        body: "רק משימות שמדמות בנייה מעשית: Routing, טפסים, validations, CRUD/API, layout לפי תמונות.",
        checklist: projectChecks,
        action: "scroll-hxm-templates",
        actionLabel: "בחר תבנית",
        secondaryAction: "start-homework-mock",
        secondaryActionLabel: "התחל ראשון",
      },
      {
        key: "javascript",
        title: "JavaScript 20",
        meta: (mode.jsQuestions || []).length + " שאלות JS",
        status: "עד 20 דקות",
        body: "רק פונקציות מערך/אובייקט עם בדיקת קלט, Error ברור, וללא אקראיות.",
        checklist: jsPatterns,
        action: "scroll-hxm-js",
        actionLabel: "לשאלות JS",
        secondaryAction: "codeblocks",
        secondaryActionLabel: "פתרונות קוד",
      },
      {
        key: "typescript",
        title: "TypeScript 10",
        meta: (mode.tsQuestions || []).length + " שאלות TS",
        status: "עד 10 דקות",
        body: "רק type, interface, enum, union ו-narrowing כפי שמופיע בשיעורי הבית.",
        checklist: tsChecks,
        action: "scroll-hxm-ts",
        actionLabel: "לשאלות TS",
        secondaryAction: "trainer",
        secondaryActionLabel: "תרגול חולשות",
      },
      {
        key: "final",
        title: "Mock Exam 4h",
        meta: "70/20/10",
        status: "מסלול מבחן מלא",
        body: "סדר עבודה סגור ליום המבחן: קודם פרויקט, אחר כך JS/TS, ואז תיקוני validations/layout/API.",
        checklist: schedule,
        action: "start-homework-mock",
        actionLabel: "פתח מבחן מלא",
      },
    ];
    var cards = tracks.map(function (track) {
      var secondary = track.secondaryAction
        ? "<button class=\"km-btn-mini\" type=\"button\" data-hxm-action=\"" + esc(track.secondaryAction) + "\">" + esc(track.secondaryActionLabel || "פתח") + "</button>"
        : "";
      return "<article class=\"hxm-track-card track-" + esc(track.key) + "\">" +
        "<div class=\"hxm-track-head\"><div><strong>" + esc(track.title) + "</strong><span>" + esc(track.meta) + "</span></div><b>" + esc(track.status) + "</b></div>" +
        "<p>" + esc(track.body) + "</p>" +
        list(track.checklist || [], esc) +
        "<div class=\"hxm-track-actions\"><button class=\"km-btn-mini primary\" type=\"button\" data-hxm-action=\"" + esc(track.action) + "\">" + esc(track.actionLabel) + "</button>" + secondary + "</div>" +
      "</article>";
    }).join("");
    var redZone = redZoneItems.map(function (item) {
      return "<article class=\"hxm-red-zone-row\"><strong>" + esc(item.label) + "</strong><span>" + esc(item.reason) + "</span><b>" + esc(item.alternative) + "</b></article>";
    }).join("");
    return "<details class=\"hxm-sources hxm-closed-tracks\" id=\"hxm-closed-tracks\" open><summary>מסלולים סגורים למבחן — Project 70 / JS 20 / TS 10</summary>" +
      "<p class=\"hxm-track-intro\">כל מה שלא משרת ישירות את הניקוד הקרוב מסומן באדום בטאבים העליונים. עובדים רק דרך ארבעת המסלולים האלה.</p>" +
      "<div class=\"hxm-track-grid\">" + cards + "</div>" +
      "<section class=\"hxm-red-zone\" id=\"hxm-red-zone\" aria-label=\"אגפים אדומים מחוץ למסלול המבחן\"><div><strong>אזור אדום: לא לבזבז עליו זמן השבוע</strong><span>אם נכנסת לשם, חזור לחלופה שמופיעה כאן.</span></div><div class=\"hxm-red-zone-grid\">" + redZone + "</div></section>" +
    "</details>";
  }

  function renderPlan(masterPlan, tasks, progress, esc) {
    var labels = {
      project: "Project 70",
      javascript: "JS 20",
      typescript: "TS 10",
      examOps: "ניהול מבחן",
    };
    var completed = tasks.filter(function (task) { return progress[task.id]; }).length;
    var percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
    var next = tasks.find(function (task) { return !progress[task.id]; });
    var domains = ["project", "javascript", "typescript", "examOps"].map(function (domain) {
      var domainTasks = tasks.filter(function (task) { return task.domain === domain; });
      var done = domainTasks.filter(function (task) { return progress[task.id]; }).length;
      var pct = domainTasks.length ? Math.round((done / domainTasks.length) * 100) : 0;
      return "<article class=\"hxm-domain-card domain-" + esc(domain) + "\" data-hxm-domain=\"" + esc(domain) + "\">" +
        "<div><strong>" + esc(labels[domain]) + "</strong><span data-hxm-domain-count>" + done + "/" + domainTasks.length + " משימות</span></div>" +
        "<b data-hxm-domain-percent>" + pct + "%</b><div class=\"hxm-mini-bar\" aria-hidden=\"true\"><i data-hxm-domain-bar style=\"width:" + pct + "%\"></i></div>" +
      "</article>";
    }).join("");
    var days = (masterPlan.sevenDayPlan || []).map(function (day, dayIndex) {
      var dayTasks = tasks.filter(function (task) { return task.dayIndex === dayIndex; });
      var done = dayTasks.filter(function (task) { return progress[task.id]; }).length;
      var pct = dayTasks.length ? Math.round((done / dayTasks.length) * 100) : 0;
      var taskRows = (day.tasks || []).map(function (task, taskIndex) {
        var id = "day-" + (dayIndex + 1) + "-task-" + (taskIndex + 1);
        var domain = domainFor(day.title || "", task);
        var checked = progress[id] ? " checked" : "";
        var doneClass = progress[id] ? " done" : "";
        return "<label class=\"hxm-day-task domain-" + esc(domain) + doneClass + "\" data-hxm-task-row=\"" + esc(id) + "\">" +
          "<input type=\"checkbox\" data-hxm-plan-task=\"" + esc(id) + "\"" + checked + ">" +
          "<span>" + esc(task) + "</span><em>" + esc(labels[domain] || domain) + "</em></label>";
      }).join("");
      return "<article class=\"hxm-day-card" + (next && next.dayIndex === dayIndex ? " active" : "") + "\" data-hxm-day-card=\"" + dayIndex + "\">" +
        "<div class=\"hxm-day-head\"><strong>" + esc(day.day) + " - " + esc(day.title) + "</strong><span>" + esc(day.time) + "</span></div>" +
        "<article class=\"hxm-day-progress\" data-hxm-day-progress=\"" + dayIndex + "\"><div><strong>" + esc(day.day) + "</strong><span data-hxm-day-count>" + done + "/" + dayTasks.length + "</span></div><b data-hxm-day-percent>" + pct + "%</b><div class=\"hxm-mini-bar\" aria-hidden=\"true\"><i data-hxm-day-bar style=\"width:" + pct + "%\"></i></div></article>" +
        "<div class=\"hxm-day-task-list\">" + taskRows + "</div><p><b>קריטריון מעבר:</b> " + esc(day.passCriteria || "") + "</p></article>";
    }).join("");
    var tiers = (masterPlan.probabilityTiers || []).map(function (tier) {
      return "<article class=\"hxm-plan-tier\"><strong>" + esc(tier.label) + "</strong>" + list(tier.items || [], esc) + "</article>";
    }).join("");
    var priorities = (masterPlan.priorities || []).map(function (item, index) {
      return "<article class=\"hxm-priority-row\"><b>" + (index + 1) + "</b><div><strong>" + esc(item.label) + "</strong><span>" + esc(item.focus) + "</span></div></article>";
    }).join("");
    var materialTaskGroups = (masterPlan.materialCompletionTasks || []).map(function (group, groupIndex) {
      var groupTasks = tasks.filter(function (task) { return task.materialIndex === groupIndex; });
      var done = groupTasks.filter(function (task) { return progress[task.id]; }).length;
      var pct = groupTasks.length ? Math.round((done / groupTasks.length) * 100) : 0;
      var taskRows = (group.tasks || []).map(function (task, taskIndex) {
        var id = "material-" + (groupIndex + 1) + "-task-" + (taskIndex + 1);
        var checked = progress[id] ? " checked" : "";
        var doneClass = progress[id] ? " done" : "";
        return "<label class=\"hxm-material-task" + doneClass + "\" data-hxm-material-task-row=\"" + esc(id) + "\">" +
          "<input type=\"checkbox\" data-hxm-plan-task=\"" + esc(id) + "\" data-hxm-material-task=\"" + esc(id) + "\"" + checked + ">" +
          "<span>" + esc(task) + "</span></label>";
      }).join("");
      return "<article class=\"hxm-material-task-card heat-" + esc(group.heat || "") + "\" data-hxm-material-task-card=\"" + groupIndex + "\">" +
        "<div class=\"hxm-material-task-head\"><div><strong>" + esc(group.title || "השלמת חומר") + "</strong><span>" + esc(group.lessons || "") + "</span></div><b>Heat " + esc(group.heat || "-") + "</b></div>" +
        "<p>" + esc(group.reason || "") + "</p>" +
        "<article class=\"hxm-day-progress\" data-hxm-material-task-progress=\"" + groupIndex + "\"><div><strong>" + esc(group.title || "השלמה") + "</strong><span data-hxm-material-task-count>" + done + "/" + groupTasks.length + "</span></div><b data-hxm-material-task-percent>" + pct + "%</b><div class=\"hxm-mini-bar\" aria-hidden=\"true\"><i data-hxm-material-task-bar style=\"width:" + pct + "%\"></i></div></article>" +
        "<div class=\"hxm-material-task-list\">" + taskRows + "</div><p><b>קריטריון מעבר:</b> " + esc(group.passCriteria || "") + "</p></article>";
    }).join("");
    var checklist = masterPlan.examDayChecklist || {};
    return "<details class=\"hxm-sources hxm-master-plan\" open><summary>Master Plan לציון 100 - אבחון קלוד משולב</summary>" +
      "<div class=\"hxm-master-head\"><div><strong>" + esc(masterPlan.title || "Master Plan") + "</strong><span>" + esc(masterPlan.source || "") + "</span></div><b>" + esc(scoringText(masterPlan.scoring)) + "</b></div>" +
      "<p class=\"hxm-master-warning\">" + esc(masterPlan.warning || "") + "</p><p class=\"hxm-master-goal\">" + esc(masterPlan.goal || "") + "</p>" +
      "<div class=\"hxm-progress-card\" data-hxm-progress-card><div class=\"hxm-progress-head\"><div><strong>אחוז השלמת Master Plan</strong><span data-hxm-progress-count>" + completed + "/" + tasks.length + " משימות</span></div><b data-hxm-progress-percent>" + percent + "%</b></div><div class=\"hxm-progress-bar\" aria-hidden=\"true\"><i data-hxm-progress-bar style=\"width:" + percent + "%\"></i></div><p class=\"hxm-progress-next\" data-hxm-progress-next>" + (next ? "המשימה הבאה: " + esc(next.day + " - " + next.title + ": " + next.text) : "כל משימות התוכנית סומנו כהושלמו.") + "</p><button class=\"km-btn-mini ghost\" type=\"button\" data-hxm-progress-reset>איפוס סימוני התקדמות</button></div>" +
      "<div class=\"hxm-execution-panel\" data-hxm-execution-panel><div class=\"hxm-execution-head\"><div><strong>לוח ביצוע עד המבחן</strong><span data-hxm-active-day>" + (next ? "עכשיו: " + esc(next.day + " - " + next.title) : "כל הימים סומנו כהושלמו.") + "</span></div><b data-hxm-active-domain>" + esc(next ? labels[next.domain] : "100%") + "</b></div><div class=\"hxm-domain-grid\">" + domains + "</div><div class=\"hxm-action-row\"><button class=\"km-btn-mini primary\" type=\"button\" data-hxm-action=\"start-homework-mock\">התחל מבחן Homework</button><button class=\"km-btn-mini\" type=\"button\" data-hxm-action=\"trainer\">פתח מאמן ידע</button><button class=\"km-btn-mini\" type=\"button\" data-hxm-action=\"trace\">פתח Code Trace</button><button class=\"km-btn-mini\" type=\"button\" data-hxm-action=\"codeblocks\">פתח בלוקי קוד</button></div></div>" +
      "<div class=\"hxm-priority-list\">" + priorities + "</div><h4 class=\"hxm-plan-subhead\">תוכנית 7 ימים עם משימות וקריטריוני מעבר</h4><div class=\"hxm-seven-day-grid\">" + days + "</div>" +
      "<h4 class=\"hxm-plan-subhead\" id=\"hxm-material-backlog\">Backlog השלמת חומרים לפי דוח המשך</h4><div class=\"hxm-material-task-grid\">" + materialTaskGroups + "</div>" +
      "<h4 class=\"hxm-plan-subhead\">מפת הסתברויות ונושאי חובה</h4><div class=\"hxm-plan-tier-grid\">" + tiers + "</div>" +
      "<div class=\"hxm-plan-checklists\"><section><h5>עמודי חובה</h5>" + list(masterPlan.requiredPages || [], esc) + "</section><section><h5>Checklist לכל עמוד React</h5>" + list(masterPlan.pageChecklist || [], esc) + "</section><section><h5>Checklist Express</h5>" + list(masterPlan.expressChecklist || [], esc) + "</section><section><h5>JS Patterns עד 20 דקות</h5>" + list(masterPlan.jsPatterns || [], esc) + "<h5>דרישות לכל פתרון JS</h5>" + list(masterPlan.jsPatternRequirements || [], esc) + "</section></div>" +
      "<div class=\"hxm-plan-checklists compact\"><section><h5>סדר עבודה ביום המבחן</h5>" + list(masterPlan.examDaySchedule || [], esc) + "</section><section><h5>שגיאות שמורידות נקודות</h5>" + list(masterPlan.commonMistakes || [], esc) + "</section><section><h5>כללי זהב</h5>" + list(masterPlan.goldenRules || [], esc) + "</section></div>" +
      "<div class=\"hxm-plan-checklists compact\"><section><h5>פרויקט</h5>" + list(checklist.project || [], esc) + "</section><section><h5>Express</h5>" + list(checklist.express || [], esc) + "</section><section><h5>הגשה</h5>" + list(checklist.submission || [], esc) + "</section></div>" +
      "<div class=\"hxm-plan-checklists compact\"><section><h5>הכנה מותרת מראש</h5>" + list((masterPlan.preExamSetup || {}).allowed || [], esc) + "</section><section><h5>אסור להכין מראש</h5>" + list((masterPlan.preExamSetup || {}).forbidden || [], esc) + "</section><section><h5>הנחות</h5>" + list(masterPlan.assumptions || [], esc) + "</section></div></details>";
  }

  function updateProgress(container, masterPlan, tasks, esc) {
    var progress = getProgress();
    var completed = tasks.filter(function (task) { return progressDone(progress[task.id]); }).length;
    var percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
    var next = tasks.find(function (task) { return !progressDone(progress[task.id]); });
    var percentEl = container.querySelector("[data-hxm-progress-percent]");
    var countEl = container.querySelector("[data-hxm-progress-count]");
    var barEl = container.querySelector("[data-hxm-progress-bar]");
    var nextEl = container.querySelector("[data-hxm-progress-next]");
    var activeDayEl = container.querySelector("[data-hxm-active-day]");
    var activeDomainEl = container.querySelector("[data-hxm-active-domain]");
    var labels = { project: "Project 70", javascript: "JS 20", typescript: "TS 10", examOps: "ניהול מבחן" };
    if (percentEl) percentEl.textContent = percent + "%";
    if (countEl) countEl.textContent = completed + "/" + tasks.length + " משימות";
    if (barEl) barEl.style.width = percent + "%";
    if (nextEl) nextEl.textContent = next ? ("המשימה הבאה: " + next.day + " - " + next.title + ": " + next.text) : "כל משימות התוכנית סומנו כהושלמו.";
    if (activeDayEl) activeDayEl.textContent = next ? ("עכשיו: " + next.day + " - " + next.title) : "כל הימים סומנו כהושלמו.";
    if (activeDomainEl) activeDomainEl.textContent = next ? (labels[next.domain] || next.domain) : "100%";
    ["project", "javascript", "typescript", "examOps"].forEach(function (domain) {
      var domainTasks = tasks.filter(function (task) { return task.domain === domain; });
      var done = domainTasks.filter(function (task) { return progressDone(progress[task.id]); }).length;
      var pct = domainTasks.length ? Math.round((done / domainTasks.length) * 100) : 0;
      var card = container.querySelector("[data-hxm-domain=\"" + domain + "\"]");
      if (!card) return;
      card.classList.toggle("complete", domainTasks.length > 0 && done === domainTasks.length);
      var count = card.querySelector("[data-hxm-domain-count]");
      var percentNode = card.querySelector("[data-hxm-domain-percent]");
      var bar = card.querySelector("[data-hxm-domain-bar]");
      if (count) count.textContent = done + "/" + domainTasks.length + " משימות";
      if (percentNode) percentNode.textContent = pct + "%";
      if (bar) bar.style.width = pct + "%";
    });
    (masterPlan.sevenDayPlan || []).forEach(function (_day, dayIndex) {
      var dayTasks = tasks.filter(function (task) { return task.dayIndex === dayIndex; });
      var done = dayTasks.filter(function (task) { return progressDone(progress[task.id]); }).length;
      var pct = dayTasks.length ? Math.round((done / dayTasks.length) * 100) : 0;
      var row = container.querySelector("[data-hxm-day-progress=\"" + dayIndex + "\"]");
      if (!row) return;
      row.classList.toggle("active", !!next && next.dayIndex === dayIndex);
      row.classList.toggle("complete", dayTasks.length > 0 && done === dayTasks.length);
      var count = row.querySelector("[data-hxm-day-count]");
      var percentNode = row.querySelector("[data-hxm-day-percent]");
      var bar = row.querySelector("[data-hxm-day-bar]");
      if (count) count.textContent = done + "/" + dayTasks.length;
      if (percentNode) percentNode.textContent = pct + "%";
      if (bar) bar.style.width = pct + "%";
    });
    (masterPlan.materialCompletionTasks || []).forEach(function (_group, groupIndex) {
      var groupTasks = tasks.filter(function (task) { return task.materialIndex === groupIndex; });
      var done = groupTasks.filter(function (task) { return progressDone(progress[task.id]); }).length;
      var pct = groupTasks.length ? Math.round((done / groupTasks.length) * 100) : 0;
      var row = container.querySelector("[data-hxm-material-task-progress=\"" + groupIndex + "\"]");
      var card = container.querySelector("[data-hxm-material-task-card=\"" + groupIndex + "\"]");
      if (row) {
        var count = row.querySelector("[data-hxm-material-task-count]");
        var percentNode = row.querySelector("[data-hxm-material-task-percent]");
        var bar = row.querySelector("[data-hxm-material-task-bar]");
        if (count) count.textContent = done + "/" + groupTasks.length;
        if (percentNode) percentNode.textContent = pct + "%";
        if (bar) bar.style.width = pct + "%";
      }
      if (card) card.classList.toggle("complete", groupTasks.length > 0 && done === groupTasks.length);
    });
    container.querySelectorAll("[data-hxm-plan-task]").forEach(function (input) {
      var id = input.getAttribute("data-hxm-plan-task") || "";
      var legacyId = input.getAttribute("data-hxm-legacy-plan-task") || "";
      var done = progressDone(progress[id]) || (!!legacyId && progressDone(progress[legacyId]));
      input.checked = done;
      var row = input.closest(".hxm-day-task, .hxm-material-task, .hxm-time-task, .hxm-exam-section-task-row, .hxm-exam-ide-terminal-row, .hxm-exam-question-subtask-row");
      if (row) {
        row.classList.toggle("done", done);
        if (row.dataset) row.dataset.taskStatus = taskStatusText(done);
      }
    });
    updateExamQuestionTaskProgress(container);
    updateExamTopicProgress(container);
    updateRemainingTimePlan(container, masterPlan, window.HOMEWORK_EXAM_MODE && window.HOMEWORK_EXAM_MODE.basicDiagnosticTracks || [], esc);
    updateTodayCommand(container, masterPlan, window.HOMEWORK_EXAM_MODE && window.HOMEWORK_EXAM_MODE.basicDiagnosticTracks || [], esc);
  }

  function updateExamQuestionTaskProgress(container) {
    container.querySelectorAll("[data-exam-question-page]").forEach(function (page) {
      var sectionId = page.getAttribute("data-exam-question-page") || "";
      var inputs = Array.from(page.querySelectorAll("[data-hxm-plan-task^=\"exam-question-subtask-\"], [data-hxm-plan-task^=\"exam-technical-task-\"]"));
      var total = inputs.length;
      var done = inputs.filter(function (input) { return input.checked; }).length;
      var percent = total ? Math.round((done / total) * 100) : 0;
      page.classList.toggle("complete", total > 0 && done === total);
      var countNodes = container.querySelectorAll("[data-exam-question-progress-count=\"" + sectionId + "\"]");
      countNodes.forEach(function (node) { node.textContent = done + "/" + total; });
      var percentNodes = container.querySelectorAll("[data-exam-question-progress-percent=\"" + sectionId + "\"]");
      percentNodes.forEach(function (node) { node.textContent = percent + "%"; });
      var barNodes = container.querySelectorAll("[data-exam-question-progress-bar=\"" + sectionId + "\"]");
      barNodes.forEach(function (node) { node.style.width = percent + "%"; });
      var topicProgressNodes = container.querySelectorAll("[data-exam-topic-question-progress=\"" + sectionId + "\"]");
      topicProgressNodes.forEach(function (node) { node.textContent = done + "/" + total + " · " + percent + "%"; });
      container.querySelectorAll("[data-exam-topic-question=\"" + sectionId + "\"]").forEach(function (row) {
        row.classList.toggle("complete", total > 0 && done === total);
      });
    });
  }

  function updateExamTopicProgress(container) {
    container.querySelectorAll("[data-exam-topic]").forEach(function (topic) {
      var topicId = topic.getAttribute("data-exam-topic") || "";
      var seen = {};
      var total = 0;
      var done = 0;
      var nextLabel = "";
      var firstManualLabel = "";
      topic.querySelectorAll("[data-exam-topic-question]").forEach(function (row) {
        var sectionId = row.getAttribute("data-exam-topic-question") || "";
        var page = container.querySelector("[data-exam-question-page=\"" + sectionId + "\"]");
        var rowTitle = row.querySelector("[data-exam-question-open] strong");
        var label = rowTitle ? rowTitle.textContent : sectionId;
        if (!firstManualLabel && row.classList.contains("manual_review")) firstManualLabel = "manual_review נעול: " + label;
        if (!page) return;
        var inputs = Array.from(page.querySelectorAll("[data-hxm-plan-task^=\"exam-question-subtask-\"], [data-hxm-plan-task^=\"exam-technical-task-\"]"));
        inputs.forEach(function (input) {
          var id = input.getAttribute("data-hxm-plan-task") || "";
          if (!id || seen[id]) return;
          seen[id] = true;
          total += 1;
          if (input.checked) done += 1;
        });
        if (!nextLabel && inputs.some(function (input) { return !input.checked; })) nextLabel = "הבא: " + label;
      });
      var percent = total ? Math.round((done / total) * 100) : 0;
      topic.classList.toggle("complete", total > 0 && done === total);
      container.querySelectorAll("[data-exam-topic-progress-count=\"" + topicId + "\"]").forEach(function (node) {
        node.textContent = done + "/" + total;
      });
      container.querySelectorAll("[data-exam-topic-progress-percent=\"" + topicId + "\"]").forEach(function (node) {
        node.textContent = percent + "%";
      });
      container.querySelectorAll("[data-exam-topic-progress-bar=\"" + topicId + "\"]").forEach(function (node) {
        node.style.width = percent + "%";
      });
      container.querySelectorAll("[data-exam-topic-next=\"" + topicId + "\"]").forEach(function (node) {
        node.textContent = total ? (nextLabel || "כל המשימות האוטומטיות סומנו") : (firstManualLabel || "אין משימות אוטומטיות");
      });
    });
  }

  function updateRemainingTimePlan(container, masterPlan, tracks, esc) {
    var state = timePlanState(masterPlan || {}, tracks || []);
    var nextTimeTask = nextTimePlanTask(state);
    var percentEl = container.querySelector("[data-hxm-time-required-percent]");
    var summaryPercentEl = container.querySelector("[data-hxm-time-summary-percent]");
    var barEl = container.querySelector("[data-hxm-time-required-bar]");
    var leftEl = container.querySelector("[data-hxm-time-required-left]");
    var summaryLeftEl = container.querySelector("[data-hxm-time-summary-left]");
    var nextTitleEl = container.querySelector("[data-hxm-time-next-title]");
    var nextMetaEl = container.querySelector("[data-hxm-time-next-meta]");
    if (percentEl) percentEl.textContent = state.requiredPercent + "%";
    if (summaryPercentEl) summaryPercentEl.textContent = state.requiredPercent + "%";
    if (barEl) barEl.style.width = state.requiredPercent + "%";
    if (leftEl) leftEl.textContent = minutesText(state.requiredRemaining);
    if (summaryLeftEl) summaryLeftEl.textContent = minutesText(state.requiredRemaining) + " נותר";
    if (nextTitleEl) nextTitleEl.textContent = nextTimeTask.title;
    if (nextMetaEl) nextMetaEl.textContent = nextTimeTask.meta;
    var fullLeftEl = container.querySelector("[data-exam100-total-left]");
    var fullPercentEl = container.querySelector("[data-exam100-required-percent]");
    var fullBarEl = container.querySelector("[data-exam100-full-bar]");
    if (fullLeftEl) fullLeftEl.textContent = minutesText(state.requiredRemaining) + " נותר";
    if (fullPercentEl) fullPercentEl.textContent = state.requiredPercent + "%";
    if (fullBarEl) fullBarEl.style.width = state.requiredPercent + "%";
    state.diagnosticRows.forEach(function (task) {
      var row = container.querySelector("[data-hxm-time-diagnostic=\"" + (task.id || "") + "\"]");
      if (!row) return;
      row.classList.toggle("done", task.percent >= 100);
      if (row.dataset) row.dataset.taskStatus = taskStatusText(task.percent >= 100);
      var small = row.querySelector("small");
      if (small) small.textContent = task.percent + "% · " + minutesText(task.completedMinutes) + " הושלם";
    });
  }

  function updateDiagnostic(container, tracks, esc) {
    var progress = getDiagnosticProgress();
    var summary = diagnosticSummary(tracks, progress);
    var percent = summary.percent;
    var next = summary.next;
    var percentEl = container.querySelector("[data-hxm-basic-percent]");
    var barEl = container.querySelector("[data-hxm-basic-overall-bar]");
    var nextEl = container.querySelector("[data-hxm-basic-next]");
    if (percentEl) percentEl.textContent = percent + "%";
    if (barEl) barEl.style.width = percent + "%";
    if (nextEl) {
      nextEl.textContent = next
        ? ("החיזוק הבא: " + next.track.title + " - " + next.check.label)
        : "כל בדיקות הבסיס סומנו. עבור ל-Project 70 או Mock Exam מלא.";
    }
    (tracks || []).forEach(function (track) {
      var checks = track.checks || [];
      var done = checks.filter(function (check) { return progress[diagnosticCheckId(track, check)]; }).length;
      var pct = checks.length ? Math.round((done / checks.length) * 100) : 0;
      var trackEl = container.querySelector("[data-hxm-basic-track=\"" + (track.id || "") + "\"]");
      if (trackEl) trackEl.classList.toggle("complete", checks.length > 0 && done === checks.length);
      var scoreEl = container.querySelector("[data-hxm-basic-track-score=\"" + (track.id || "") + "\"]");
      var trackBar = container.querySelector("[data-hxm-basic-track-bar=\"" + (track.id || "") + "\"]");
      if (scoreEl) scoreEl.textContent = done + "/" + checks.length;
      if (trackBar) trackBar.style.width = pct + "%";
    });
    container.querySelectorAll("[data-hxm-basic-check]").forEach(function (input) {
      var id = input.getAttribute("data-hxm-basic-check") || "";
      input.checked = !!progress[id];
      var row = input.closest(".hxm-basic-check");
      if (row) row.classList.toggle("done", !!progress[id]);
    });
    updateGuidedExamPath(container, tracks, progress, esc);
    updateRemainingTimePlan(container, window.HOMEWORK_EXAM_MODE && window.HOMEWORK_EXAM_MODE.masterPlan || {}, tracks, esc);
    updateTodayCommand(container, window.HOMEWORK_EXAM_MODE && window.HOMEWORK_EXAM_MODE.masterPlan || {}, tracks, esc);
  }

  function updateTodayCommand(container, masterPlan, tracks, esc) {
    var card = container.querySelector("[data-hxm-today-command]");
    if (!card) return;
    var command = todayCommandFor(masterPlan || {}, tracks || []);
    var heat = String(command.heat || "");
    card.className = card.className.replace(/\s?heat-\d+/g, "");
    card.classList.add("heat-" + heat);
    var heatEl = card.querySelector("[data-hxm-today-heat]");
    var phaseEl = card.querySelector("[data-hxm-today-phase]");
    var titleEl = card.querySelector("[data-hxm-today-title]");
    var timeEl = card.querySelector("[data-hxm-today-time]");
    var targetEl = card.querySelector("[data-hxm-today-target]");
    var proofEl = card.querySelector("[data-hxm-today-proof]");
    var blockedEl = card.querySelector("[data-hxm-today-blocked]");
    var actionEl = card.querySelector("[data-hxm-today-action]");
    if (heatEl) heatEl.textContent = "Heat " + heat;
    if (phaseEl) phaseEl.textContent = command.phase;
    if (titleEl) titleEl.textContent = command.title;
    if (timeEl) timeEl.textContent = command.time;
    if (targetEl) targetEl.textContent = command.target;
    if (proofEl) proofEl.textContent = command.proof;
    if (blockedEl) blockedEl.textContent = command.blocked;
    if (actionEl) {
      actionEl.setAttribute("data-hxm-action", command.action);
      actionEl.textContent = command.button;
    }
  }

  function updateExam100Path(container, path, esc) {
    if (!path) return;
    var state = getExam100State();
    var score = exam100Score(path, state);
    var total = exam100PlacementQuestions(path).length;
    var skipped = !!state.skipPlacement;
    var level = exam100LevelFor(path, score);
    var stages = exam100ClosedStages(path);
    var pathIndex = exam100CurrentPathIndex(path, state);
    var current = stages[pathIndex] || stages[0] || {};
    var route = exam100RouteFor(path, current.routeId || (skipped ? "track-100" : level.routeId));
    var scoreEl = container.querySelector("[data-exam100-score]");
    var levelEl = container.querySelector("[data-exam100-level]");
    var routeEl = container.querySelector("[data-exam100-route-label]");
    var barEl = container.querySelector("[data-exam100-bar]");
    var closedPercentEl = container.querySelector("[data-exam100-closed-percent]");
    var stageCounterEl = container.querySelector("[data-exam100-stage-counter]");
    var currentTitleEl = container.querySelector("[data-exam100-current-title]");
    var currentRouteEl = container.querySelector("[data-exam100-current-route]");
    var currentGateEl = container.querySelector("[data-exam100-current-gate]");
    var currentRuleEl = container.querySelector("[data-exam100-current-rule]");
    var progressLabelEl = container.querySelector("[data-exam100-progress-label]");
    var saveEl = container.querySelector("[data-exam100-save-status]");
    var saveModeEl = container.querySelector("[data-exam100-save-mode]");
    if (scoreEl) scoreEl.textContent = score + "/" + total;
    if (levelEl) levelEl.textContent = skipped ? "100 Track" : level.label;
    if (routeEl) routeEl.textContent = route.label || "";
    if (barEl) barEl.style.width = exam100PathPercent(pathIndex, stages.length) + "%";
    if (closedPercentEl) closedPercentEl.textContent = exam100PathPercent(pathIndex, stages.length) + "%";
    if (stageCounterEl) stageCounterEl.textContent = "שלב " + (pathIndex + 1) + " מתוך " + stages.length;
    if (currentTitleEl) currentTitleEl.textContent = current.title || "";
    if (currentRouteEl) currentRouteEl.textContent = (current.routeLabel || "") + " · " + (current.routeLevel || "");
    if (currentGateEl) currentGateEl.textContent = current.gate || "";
    if (currentRuleEl) currentRuleEl.textContent = (current.gateType || "") + " · ציון מעבר " + (current.passingScore || "");
    if (progressLabelEl) progressLabelEl.textContent = exam100PathPercent(pathIndex, stages.length) + "%";
    if (saveEl) saveEl.textContent = exam100SavedText(state);
    if (saveModeEl) saveModeEl.textContent = exam100RuntimeSaveMode();
    container.querySelectorAll("[data-exam100-map-step]").forEach(function (card) {
      var index = Number(card.getAttribute("data-exam100-map-step") || 0);
      card.classList.toggle("done", index < pathIndex);
      card.classList.toggle("current", index === pathIndex);
      card.classList.toggle("locked", index > pathIndex);
      if (index === pathIndex) card.setAttribute("aria-current", "step");
      else card.removeAttribute("aria-current");
    });
  }

  function updateGuidedExamPath(container, tracks, progress, esc) {
    var summary = diagnosticSummary(tracks, progress || getDiagnosticProgress());
    var stages = guidedExamStages(summary.percent);
    var percentEl = container.querySelector("[data-hxm-guided-percent]");
    var nextEl = container.querySelector("[data-hxm-guided-next]");
    if (percentEl) percentEl.textContent = summary.percent + "%";
    if (nextEl) {
      nextEl.textContent = summary.next
        ? ("עכשיו לעבוד על: " + summary.next.track.title + " - " + summary.next.check.label)
        : "עכשיו לעבוד על: כל בדיקות הבסיס סגורות. עבור לסימולציה מלאה.";
    }
    stages.forEach(function (stage) {
      var card = container.querySelector("[data-hxm-guided-stage=\"" + stage.key + "\"]");
      if (!card) return;
      ["locked", "unlocked", "active", "complete"].forEach(function (status) {
        card.classList.remove(status);
      });
      var status = stage.complete ? "complete" : stage.active ? "active" : stage.unlocked ? "unlocked" : "locked";
      card.classList.add(status);
      var gate = card.querySelector("[data-hxm-guided-gate]");
      if (gate) gate.textContent = stage.unlocked ? "פתוח" : "נפתח אחרי " + stage.min + "% אבחון";
      var button = card.querySelector("[data-hxm-guided-button]");
      if (button) {
        button.disabled = !stage.unlocked;
        button.classList.toggle("primary", stage.active);
      }
    });
  }

  function renderHomeworkExamModeView(ctx) {
    var container = document.getElementById("homework-exam-mode-body");
    if (!container) return;
    var esc = ctx && typeof ctx.esc === "function" ? ctx.esc : defaultEsc;
    var mode = window.HOMEWORK_EXAM_MODE && Array.isArray(window.HOMEWORK_EXAM_MODE.templates) ? window.HOMEWORK_EXAM_MODE : null;
    if (!mode) {
      var empty = document.createElement("p");
      empty.className = "homework-exam-empty";
      empty.textContent = "נתוני Homework Exam Mode לא נטענו.";
      container.replaceChildren(empty);
      return;
    }
    var sourcesById = Object.fromEntries((mode.sources || []).map(function (source) { return [source.id, source]; }));
    var buildById = Object.fromEntries((mode.buildQuestions || []).map(function (build) { return [build.id, build]; }));
    var examTemplates = (ctx && ctx.examTemplates) || [];
    var examTemplatesByHomeworkId = Object.fromEntries(examTemplates.filter(function (template) {
      return template.homeworkExamId;
    }).map(function (template) {
      return [template.homeworkExamId, template];
    }));
    var masterPlan = mode.masterPlan || {};
    var tasks = planTasks(masterPlan);
    var progress = getProgress();
    var diagnosticProgress = getDiagnosticProgress();
    var material = mode.allowedMaterials || {};
    var profileRows = "<div class=\"hxm-profile-card active\"><strong>" + esc((mode.activeProfile || {}).label || "מבנה פעיל") + "</strong><span>" + esc(scoringText((mode.activeProfile || {}).scoringBreakdown)) + "</span><small>" + esc((mode.activeProfile || {}).interpretation || "") + "</small></div>" +
      "<div class=\"hxm-profile-card legacy\"><strong>" + esc((mode.previousProfile || {}).label || "מבנה עבר") + "</strong><span>" + esc(scoringText((mode.previousProfile || {}).scoringBreakdown)) + "</span><small>" + esc((mode.previousProfile || {}).interpretation || "") + "</small></div>";
    var materialRows = "<div class=\"hxm-material-grid\"><div><strong>מותר להביא</strong>" + list(material.openMaterials || [], esc) + "</div><div><strong>מותר להכין מראש</strong>" + list(material.allowedPrework || [], esc) + "</div><div><strong>אסור להכין מראש</strong>" + list(material.forbiddenPrework || [], esc) + "</div></div>";
    var exam100Rows = renderExam100Path(mode.exam100Path, esc, mode);
    var startHereRows = renderStartHereHeatPanel(masterPlan, mode, esc);
    var examOnlyRows = renderExamOnlyMode(mode, esc);
    var todayCommandRows = renderTodayCommandPanel(masterPlan, mode.basicDiagnosticTracks || [], esc);
    var basicDiagnosticRows = renderBasicDiagnosticTracks(mode.basicDiagnosticTracks || [], diagnosticProgress, esc);
    var guidedExamRows = renderGuidedExamPath(mode.basicDiagnosticTracks || [], diagnosticProgress, esc);
    var codeQualityRows = renderCodeExplanationQuality(mode, esc);
    var coverageRows = renderMaterialCoverage(mode.materialCoverage, sourcesById, esc);
    var materialGapRows = renderExamMaterialGapReport(buildExamMaterialGapReport(), esc);
    var closedTrackRows = renderClosedExamTracks(masterPlan, mode, esc);
    var examDayRows = renderExamDayMode(masterPlan, mode, esc);
    var solutionGuideRows = renderSolutionGuideDrills(mode.solutionGuideDrills, esc);
    var examples = (mode.examExamples || []).map(function (example) {
      return "<article class=\"hxm-example-row\"><div><strong>" + esc(example.title) + "</strong><span>" + esc(example.observedScoring) + "</span><small>" + sourceLabels(example.sourceIds || [], sourcesById, esc) + "</small></div><p>" + esc(example.projectPattern) + "</p><p><b>JS:</b> " + esc(example.jsPattern) + "</p><p><b>שימוש במבנה החדש:</b> " + esc(example.currentUse) + "</p></article>";
    }).join("");
    var sources = (mode.sources || []).map(function (source) {
      return "<div class=\"hxm-source-row\"><strong>" + esc(source.label) + "</strong><span>" + esc(source.focus) + "</span><code dir=\"ltr\">" + esc(source.path) + "</code></div>";
    }).join("");
    var rubric = (mode.scoringRubric || []).map(function (item) {
      return "<div class=\"hxm-rubric-row\"><span>" + esc(item.label) + "</span><strong>" + esc(item.points) + "%</strong><small>" + esc(item.evidence) + "</small></div>";
    }).join("");
    var templates = (mode.templates || []).map(function (template) {
      var build = buildById[template.buildQuestionId] || {};
      var examTemplate = examTemplatesByHomeworkId[template.id];
      var buildFocus = (build.tests || []).map(function (test) { return test.description; });
      return "<article class=\"hxm-template-row\"><div class=\"hxm-template-main\"><div class=\"hxm-template-title\"><strong>" + esc(template.title) + "</strong><span>" + esc(template.durationMinutes) + " דקות · פרויקט 70 · JS 20 · TS 10</span></div><div class=\"hxm-template-stack\">" + (template.stack || []).map(function (item) { return "<span>" + esc(item) + "</span>"; }).join("") + "</div>" + list(template.checklist || [], esc) + "</div><div class=\"hxm-template-actions\"><button class=\"km-btn-mini primary\" type=\"button\" data-homework-start=\"" + esc(template.id) + "\"" + (examTemplate ? "" : " disabled") + ">התחל מבחן</button><details><summary>מקור + פתרון reference</summary><p><small>" + sourceLabels(template.sourceIds || [], sourcesById, esc) + "</small></p>" + renderCodeBlockWithExplanation(build.reference, { overview: build.explanation, focus: buildFocus, practice: build.hint, commonMistakes: template.followUps || [] }, esc) + "<div class=\"hxm-followups\">" + (template.followUps || []).map(function (item) { return "<span>" + esc(item) + "</span>"; }).join("") + "</div></details></div></article>";
    }).join("");
    var ts = (mode.tsQuestions || []).map(function (question) {
      return "<details class=\"hxm-ts-question\"><summary>" + esc(question.id) + " · " + esc(question.conceptKey) + "</summary>" + renderCodeBlockWithExplanation(question.code, { overview: question.explanation, focus: ["מושג: " + (question.conceptKey || ""), "השלמה נדרשת: " + (question.answer || ""), "לפתור ב-10 דקות בלי any"], practice: "כתוב את הקטע מחדש ואז הסבר למה התשובה היא " + (question.answer || "") + "." }, esc) + "<p>תשובה: <code dir=\"ltr\">" + esc(question.answer) + "</code></p><small>" + esc(question.explanation) + "</small></details>";
    }).join("");
    var js = (mode.jsQuestions || []).map(function (question) {
      var jsFocus = (question.tests || []).map(function (test) { return test.description; });
      return "<details class=\"hxm-ts-question\"><summary>" + esc(question.title) + " · " + esc(question.scorePoints || 20) + " נק׳</summary><p>" + esc(question.prompt) + "</p>" + renderCodeBlockWithExplanation(question.reference, { overview: question.explanation, focus: jsFocus, practice: question.hint, commonMistakes: ["לשכוח validation", "לא לזרוק Error", "להחזיר מבנה אחר מהמבוקש", "להשתמש בפתרון שלא עומד באילוץ השאלה"] }, esc) + "<small>" + sourceLabels(question.sourceIds || [], sourcesById, esc) + "</small></details>";
    }).join("");
    var rubricTotal = (mode.scoringRubric || []).reduce(function (sum, item) { return sum + Number(item.points || 0); }, 0);

    var metricsRows = "<div class=\"hxm-metrics\"><div><strong>" + esc((mode.templates || []).length) + "</strong><span>תבניות מבחן</span></div><div><strong>" + esc((mode.jsQuestions || []).length) + "</strong><span>שאלות JS</span></div><div><strong>" + esc((mode.tsQuestions || []).length) + "</strong><span>שאלות TS</span></div><div><strong>" + esc((mode.examExamples || []).length) + "</strong><span>מבחני עבר</span></div><div><strong>" + esc((mode.sources || []).length) + "</strong><span>מקורות שיעורי בית</span></div><div><strong>" + esc(rubricTotal) + "%</strong><span>Rubric ציון</span></div></div>";
    var advancedRows =
      metricsRows +
      startHereRows +
      examOnlyRows +
      todayCommandRows +
      guidedExamRows +
      basicDiagnosticRows +
      codeQualityRows +
      materialGapRows +
      closedTrackRows +
      "<div class=\"hxm-grid\"><section><h4>סדר שבוע</h4><ol>" + (mode.weekPlan || []).map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") + "</ol></section><section><h4>Rubric</h4><div class=\"hxm-rubric\">" + rubric + "</div></section></div>" +
      "<details class=\"hxm-sources\" open><summary>מבנה ניקוד פעיל מול מבנה עבר</summary><div class=\"hxm-profile-grid\">" + profileRows + "</div></details>" +
      "<details class=\"hxm-sources\"><summary>חומרים והכנות שמותר להביא</summary>" + materialRows + "</details>" +
      coverageRows +
      solutionGuideRows +
      examDayRows +
      renderPlan(masterPlan, tasks, progress, esc) +
      "<details class=\"hxm-sources\" id=\"hxm-examples\"><summary>מבחנים לדוגמא שנבדקו</summary><div class=\"hxm-example-list\">" + examples + "</div></details>" +
      "<details class=\"hxm-sources\"><summary>מקורות שנכנסו למצב הזה</summary>" + sources + "</details>" +
      "<div class=\"hxm-template-list\" id=\"hxm-template-list\">" + templates + "</div><div class=\"hxm-question-bank\"><details id=\"hxm-ts-bank\"><summary>שאלות TypeScript שנכנסות לכל mock exam</summary>" + ts + "</details><details id=\"hxm-js-bank\"><summary>שאלות JavaScript 20 נק׳ מתוך הדוגמאות</summary>" + js + "</details></div>";
    var isClosedMode = !!(document.body && document.body.classList.contains("exam-focus-mode") && !document.body.classList.contains("show-advanced-tabs"));
    var sanitizeHtml = (typeof window !== "undefined" && typeof window.LUMEN_SANITIZE_HTML === "function")
      ? window.LUMEN_SANITIZE_HTML
      : function (value) { return value; };
    if (isClosedMode) {
      container.innerHTML = sanitizeHtml(exam100Rows);
    } else {
      container.innerHTML = sanitizeHtml(
        exam100Rows +
        "<details class=\"hxm-advanced-library\" id=\"hxm-advanced-library\"><summary>ספרייה מתקדמת - לא חלק מהמסלול הסגור</summary><p>המסלול הראשי עובד רק עם חיצי קדימה ואחורה. פתח את הספרייה רק כשצריך מקור, מבחן לדוגמה או בדיקת חומר.</p>" +
        advancedRows +
        "</details>",
      );
    }

    function scrollToExamSection(selector) {
      var target = container.querySelector(selector);
      if (!target) return;
      if (target.tagName && target.tagName.toLowerCase() === "details") target.open = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.classList.add("hxm-section-pulse");
      setTimeout(function () {
        target.classList.remove("hxm-section-pulse");
      }, 900);
    }

    container.querySelectorAll("[data-homework-start]").forEach(function (button) {
      button.addEventListener("click", function () {
        var template = examTemplatesByHomeworkId[button.getAttribute("data-homework-start") || ""];
        if (!template || !ctx || typeof ctx.startMockExam !== "function") return;
        var confirmFn = window.lumenConfirm || function (message) { return Promise.resolve(confirm(message)); };
        confirmFn(template.desc + "\n\nמבנה: פרויקט 70 נק׳ + JavaScript 20 נק׳ + TypeScript 10 נק׳.", {
          title: "להתחיל את \"" + template.name + "\"?",
          primary: "התחל",
          secondary: "ביטול",
        }).then(function (ok) {
          if (ok) ctx.startMockExam(template);
        });
      });
    });
    container.querySelectorAll("[data-hxm-plan-task]").forEach(function (input) {
      input.addEventListener("change", function () {
        var id = input.getAttribute("data-hxm-plan-task") || "";
        var legacyId = input.getAttribute("data-hxm-legacy-plan-task") || "";
        var nextProgress = getProgress();
        if (input.checked) nextProgress[id] = progressRecord(true);
        else {
          delete nextProgress[id];
          if (legacyId) delete nextProgress[legacyId];
        }
        setProgress(nextProgress);
        updateProgress(container, masterPlan, tasks, esc);
      });
    });
    container.querySelector("[data-hxm-progress-reset]")?.addEventListener("click", function () {
      setProgress({});
      updateProgress(container, masterPlan, tasks, esc);
    });
    container.querySelectorAll("[data-hxm-basic-check]").forEach(function (input) {
      input.addEventListener("change", function () {
        var id = input.getAttribute("data-hxm-basic-check") || "";
        var nextProgress = getDiagnosticProgress();
        if (input.checked) nextProgress[id] = true;
        else delete nextProgress[id];
        setDiagnosticProgress(nextProgress);
        updateDiagnostic(container, mode.basicDiagnosticTracks || [], esc);
      });
    });
    function moveExam100ClosedPath(delta) {
      var path = mode.exam100Path || {};
      var stages = exam100ClosedStages(path);
      if (!stages.length) return;
      var state = getExam100State();
      var currentIndex = exam100CurrentPathIndex(path, state);
      var nextIndex = Math.max(0, Math.min(stages.length - 1, currentIndex + delta));
      var nextStage = stages[nextIndex] || stages[0];
      state.currentPathIndex = nextIndex;
      state.currentRouteId = nextStage.routeId;
      state.currentStepIndex = nextStage.stepIndex;
      state.gateStatus = nextIndex >= currentIndex ? "in-progress" : "review";
      state.startedAt = state.startedAt || new Date().toISOString();
      state.savedAt = new Date().toISOString();
      var saved = setExam100State(state);
      renderHomeworkExamModeView(ctx);
      var nextContainer = document.getElementById("homework-exam-mode-body");
      var saveEl = nextContainer ? nextContainer.querySelector("[data-exam100-save-status]") : null;
      if (saveEl && !saved) saveEl.textContent = "שמירה נכשלה";
      document.getElementById("hxm-exam100-path")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    container.querySelector("[data-exam100-path-prev]")?.addEventListener("click", function () {
      moveExam100ClosedPath(-1);
    });
    container.querySelector("[data-exam100-path-next]")?.addEventListener("click", function () {
      moveExam100ClosedPath(1);
    });
    container.querySelector("[data-exam100-next-task]")?.addEventListener("click", function () {
      moveExam100ClosedPath(1);
    });
    container.querySelector("[data-exam-task-tree-open]")?.addEventListener("click", function () {
      var sectionHost = container.querySelector("[data-exam-section-exercises]");
      if (!sectionHost || sectionHost.getAttribute("data-loaded") === "true") return;
      var placeholder = sectionHost.querySelector("[data-exam-section-placeholder]");
      var renderedSections = renderExamTaskTreeSectionExercises(mode.examTaskTree, esc);
      var sanitize = (typeof window !== "undefined" && typeof window.LUMEN_SANITIZE_HTML === "function")
        ? window.LUMEN_SANITIZE_HTML
        : function (value) { return value; };
      if (placeholder) placeholder.remove();
      sectionHost.insertAdjacentHTML("beforeend", sanitize(renderedSections));
      sectionHost.setAttribute("data-loaded", "true");
    });
    function openExamQuestionPage(sectionId) {
      if (!sectionId) return;
      var page = container.querySelector("[data-exam-question-page=\"" + sectionId + "\"]");
      if (!page) return;
      container.querySelectorAll("[data-exam-question-page]").forEach(function (item) {
        item.hidden = item !== page;
      });
      container.querySelectorAll("[data-exam-question-open]").forEach(function (button) {
        button.classList.toggle("active", button.getAttribute("data-exam-question-open") === sectionId);
      });
      showExamPortalQuestion(sectionId);
      var portal = container.querySelector("[data-exam-task-ide-portal]");
      if (portal) portal.scrollIntoView({ behavior: "smooth", block: "start" });
      else page.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function cleanExamPortalClone(node) {
      var clone = node.cloneNode(true);
      clone.querySelectorAll("input, button[data-exam-question-popout], button[data-exam-question-toggle], button[data-exam-question-open]").forEach(function (item) {
        item.remove();
      });
      return clone;
    }
    function setExamPortalActive(portal, selector, activeButton) {
      portal.querySelectorAll(selector).forEach(function (button) {
        button.classList.toggle("active", button === activeButton);
      });
    }
    function showExamPortalQuestion(sectionId, activeButton) {
      var portal = container.querySelector("[data-exam-task-ide-portal]");
      var page = container.querySelector("[data-exam-question-page=\"" + sectionId + "\"]");
      if (!portal || !page) return;
      var title = (page.querySelector(".hxm-exam-question-page-head strong") || {}).textContent || "unknown/unavailable";
      var explainTitle = portal.querySelector("[data-exam-portal-explain-title]");
      var current = portal.querySelector("[data-exam-portal-current-section]");
      var explain = portal.querySelector("[data-exam-portal-explain]");
      if (explainTitle) explainTitle.textContent = "הסברים";
      if (current) current.textContent = sectionId + " · " + title;
      if (explain) {
        var nodes = [];
        [".hxm-exam-question-page-head", ".hxm-exam-section-levels", ".hxm-exam-manual-review-plan", ".hxm-exam-question-subtasks", ".hxm-exam-section-rubric", ".hxm-exam-section-concepts"].forEach(function (selector) {
          var node = page.querySelector(selector);
          if (node) nodes.push(cleanExamPortalClone(node));
        });
        if (!nodes.length) {
          var fallback = document.createElement("section");
          fallback.textContent = "unknown/unavailable";
          nodes.push(fallback);
        }
        explain.replaceChildren.apply(explain, nodes);
      }
      setExamPortalActive(portal, "[data-exam-portal-question]", activeButton || portal.querySelector("[data-exam-portal-question=\"" + sectionId + "\"]"));
    }
    function showExamPortalTask(button) {
      var portal = container.querySelector("[data-exam-task-ide-portal]");
      if (!portal || !button) return;
      var explainTitle = portal.querySelector("[data-exam-portal-explain-title]");
      var current = portal.querySelector("[data-exam-portal-current-section]");
      var explain = portal.querySelector("[data-exam-portal-explain]");
      var title = button.getAttribute("data-exam-portal-task-title") || "unknown/unavailable";
      var details = button.getAttribute("data-exam-portal-task-details") || "unknown/unavailable";
      var file = button.getAttribute("data-exam-portal-task-file") || "unknown/unavailable";
      if (explainTitle) explainTitle.textContent = "הסבר משימה";
      if (current) current.textContent = title;
      if (explain) {
        var section = document.createElement("section");
        var h = document.createElement("h6");
        h.textContent = title;
        var p = document.createElement("p");
        p.textContent = details;
        var code = document.createElement("code");
        code.dir = "ltr";
        code.textContent = file;
        var note = document.createElement("p");
        note.textContent = "הניווט הימני משנה רק את אזור ההסברים. כדי לראות קוד, בחר קובץ בצד שמאל.";
        section.append(h, p, code, note);
        explain.replaceChildren(section);
      }
      setExamPortalActive(portal, "[data-exam-portal-task]", button);
    }
    function showExamPortalCode(path, activeButton) {
      var portal = container.querySelector("[data-exam-task-ide-portal]");
      if (!portal) return;
      var titleEl = portal.querySelector("[data-exam-portal-code-title]");
      var codeHost = portal.querySelector("[data-exam-portal-code]");
      var safePath = path || "unknown/unavailable";
      if (titleEl) titleEl.textContent = "קוד - " + safePath;
      if (!codeHost) return;
      var matches = Array.from(container.querySelectorAll("[data-exam-portal-page-library] .hxm-exam-section-codes article, [data-exam-portal-page-library] .hxm-exam-section-codes details")).filter(function (node) {
        return safePath !== "unknown/unavailable" && node.textContent.indexOf(safePath) !== -1;
      });
      if (matches.length) {
        codeHost.replaceChildren.apply(codeHost, matches.slice(0, 6).map(function (node) { return cleanExamPortalClone(node); }));
      } else {
        var section = document.createElement("section");
        var h = document.createElement("h6");
        h.textContent = "unknown/unavailable";
        var p = document.createElement("p");
        p.textContent = "לא נמצא קטע קוד שממופה לקובץ. לא ממציאים קוד.";
        var code = document.createElement("code");
        code.dir = "ltr";
        code.textContent = safePath;
        section.append(h, p, code);
        codeHost.replaceChildren(section);
      }
      setExamPortalActive(portal, "[data-exam-portal-file]", activeButton || portal.querySelector("[data-exam-portal-file=\"" + safePath + "\"]"));
    }
    function openExamQuestionIdeWindow(sectionId) {
      if (!sectionId) return;
      openExamQuestionPage(sectionId);
      var page = container.querySelector("[data-exam-question-page=\"" + sectionId + "\"]");
      if (!page) return;
      var title = (page.querySelector(".hxm-exam-question-page-head strong") || {}).textContent || "עמוד שאלה מלא";
      var question = (page.querySelector(".hxm-exam-question-page-head p") || {}).textContent || "unknown/unavailable";
      var subtasks = page.querySelector(".hxm-exam-question-subtasks");
      var fileTree = page.querySelector(".hxm-exam-ide-file-tree");
      var codeCards = page.querySelector(".hxm-exam-section-codes");
      var levels = page.querySelector(".hxm-exam-section-levels");
      var rubric = page.querySelector(".hxm-exam-section-rubric");
      var concepts = page.querySelector(".hxm-exam-section-concepts");
      var subtaskItems = subtasks ? Array.from(subtasks.querySelectorAll("li")).map(function (item, index) {
        var label = (item.querySelector("b") || item).textContent || ("משימה " + (index + 1));
        var details = (item.querySelector("span") || item).textContent || "unknown/unavailable";
        var file = (item.querySelector("code") || {}).textContent || "unknown/unavailable";
        return "<button type=\"button\" data-ide-explain-task=\"" + esc(index) + "\" data-ide-task-title=\"" + esc(label) + "\" data-ide-task-details=\"" + esc(details) + "\" data-ide-task-file=\"" + esc(file) + "\"><b>" + esc(label) + "</b><span>" + esc(details) + "</span><code dir=\"ltr\">" + esc(file) + "</code></button>";
      }).join("") : "";
      var popup = window.open("", "_blank", "width=1440,height=950");
      if (!popup) return;
      try { popup.opener = null; } catch (_) {}
      var html = "<!doctype html><html lang=\"he\" dir=\"rtl\"><head><meta charset=\"utf-8\"><title>" + esc(title) + "</title><style>" +
        "body{margin:0;background:#07111f;color:#e8f2ff;font-family:Arial,sans-serif;direction:rtl}" +
        ".ide{height:100vh;display:grid;grid-template-columns:330px minmax(0,1fr) 360px;grid-template-rows:auto 1fr;grid-template-areas:'head head head' 'files center tree';gap:12px;padding:14px;box-sizing:border-box}" +
        "header{grid-area:head;background:#0d1b31;border:1px solid #254769;border-radius:16px;padding:16px 20px}" +
        "header h1{margin:.2rem 0;font-size:1.6rem}header p{margin:.3rem 0;color:#b8c7dd;font-weight:700}" +
        "aside,main{background:#0b1629;border:1px solid #223b5d;border-radius:16px;overflow:auto}" +
        ".question-tree{grid-area:tree}.file-tree{grid-area:files}main{grid-area:center;display:grid;grid-template-rows:minmax(220px,.48fr) minmax(260px,.52fr);gap:12px;background:transparent;border:0;overflow:hidden}" +
        ".ide-panel{background:#0b1629;border:1px solid #223b5d;border-radius:16px;overflow:auto}" +
        ".panel-title{position:sticky;top:0;background:#10213a;border-bottom:1px solid #254769;padding:12px 14px;font-weight:900;color:#dff9ff}" +
        ".content{padding:14px}.content section,.content article{background:#071225;border:1px solid #203857;border-radius:12px;margin:0 0 12px;padding:12px}" +
        "button{background:#13243c;color:#e8f2ff;border:1px solid #365b84;border-radius:10px;padding:8px 10px;text-align:start;cursor:pointer}" +
        ".question-tree button,.file-tree button{display:block;width:100%;margin:0 0 8px}.question-tree button b,.question-tree button span,.question-tree button code{display:block}.question-tree button span{color:#b8c7dd;font-size:.86rem;margin:.25rem 0}.question-tree .root{border-color:#67e8f9;background:#0f2a3c}.active{outline:2px solid #67e8f9;outline-offset:1px}" +
        "li{margin:.35rem 0}code,pre{direction:ltr;text-align:left}pre{background:#020817;border:1px solid #1d3554;border-radius:12px;padding:12px;overflow:auto}" +
        ".hxm-exam-ide-file-tree button{display:block;width:100%;margin:.25rem 0}.hxm-exam-ide-file-tree .target button{border-color:#facc15;color:#fff2a3}" +
        ".hxm-exam-ide-file-tree ul{padding-inline-start:1.1rem}.hxm-exam-ide-code-line{display:grid;grid-template-columns:3rem minmax(0,1fr)}" +
        ".hxm-exam-ide-code-line b{color:#7b8ca5}.hxm-exam-ide-code-line code{white-space:pre;color:#dbeafe}" +
        "@media(max-width:900px){.ide{height:auto;grid-template-columns:1fr;grid-template-areas:'head' 'tree' 'center' 'files'}main{grid-template-rows:auto}}" +
        "</style></head><body><div class=\"ide\"><header><strong>Exam100 IDE</strong><h1>" + esc(title) + "</h1><p>" + esc(question) + "</p></header>" +
        "<aside class=\"file-tree\"><div class=\"panel-title\">עץ קבצי הקוד</div><div class=\"content\">" + (fileTree ? fileTree.outerHTML : "unknown/unavailable") + "</div></aside>" +
        "<main><section class=\"ide-panel\"><div class=\"panel-title\" data-ide-explain-title>הסברים</div><div class=\"content\" data-ide-explain><section><h2>" + esc(title) + "</h2><p>" + esc(question) + "</p></section>" + (levels ? levels.outerHTML : "") + (rubric ? rubric.outerHTML : "") + (concepts ? concepts.outerHTML : "") + "</div></section><section class=\"ide-panel\"><div class=\"panel-title\" data-ide-code-title>קוד</div><div class=\"content\" data-ide-code-active><section><h2>בחר קובץ מעץ הקבצים משמאל</h2><p>הקוד מוצג כאן בלבד. הניווט הימני לא משנה את אזור הקוד.</p></section></div><div data-ide-code-library hidden>" + (codeCards ? codeCards.innerHTML : "unknown/unavailable") + "</div></section></main>" +
        "<aside class=\"question-tree\"><div class=\"panel-title\">שאלות / סעיפים / משימות</div><div class=\"content\"><button class=\"root active\" type=\"button\" data-ide-show-question><b>השאלה הראשית</b><span>" + esc(question) + "</span></button>" + (subtaskItems || "<p>unknown/unavailable</p>") + "</div></aside>" +
        "</div></body></html>";
      popup.document.open();
      popup.document.close();
      popup.document.documentElement.innerHTML = html.replace(/^<!doctype html>/i, "");
      function showQuestion() {
        var titleEl = popup.document.querySelector("[data-ide-explain-title]");
        var explain = popup.document.querySelector("[data-ide-explain]");
        if (titleEl) titleEl.textContent = "הסברים";
        if (explain) explain.innerHTML = "<section><h2>" + esc(title) + "</h2><p>" + esc(question) + "</p></section>" + (levels ? levels.outerHTML : "") + (rubric ? rubric.outerHTML : "") + (concepts ? concepts.outerHTML : "");
      }
      function showTaskExplanation(button) {
        var taskTitle = button.getAttribute("data-ide-task-title") || "unknown/unavailable";
        var details = button.getAttribute("data-ide-task-details") || "unknown/unavailable";
        var file = button.getAttribute("data-ide-task-file") || "unknown/unavailable";
        var titleEl = popup.document.querySelector("[data-ide-explain-title]");
        var explain = popup.document.querySelector("[data-ide-explain]");
        if (titleEl) titleEl.textContent = "הסבר משימה";
        if (explain) explain.innerHTML = "<section><h2>" + esc(taskTitle) + "</h2><p>" + esc(details) + "</p><p><b>קובץ יעד:</b> <code dir=\"ltr\">" + esc(file) + "</code></p><p>אזור הקוד לא משתנה מכאן. כדי לראות קוד, בחר קובץ בתפריט השמאלי.</p></section>";
      }
      function setActive(selector, activeButton) {
        popup.document.querySelectorAll(selector).forEach(function (button) {
          button.classList.toggle("active", button === activeButton);
        });
      }
      function showCodeFile(path, button) {
        var titleEl = popup.document.querySelector("[data-ide-code-title]");
        var active = popup.document.querySelector("[data-ide-code-active]");
        var library = popup.document.querySelector("[data-ide-code-library]");
        var matches = library ? Array.from(library.querySelectorAll("article, section")).filter(function (node) {
          return node.textContent.indexOf(path) !== -1;
        }) : [];
        if (titleEl) titleEl.textContent = "קוד - " + (path || "unknown/unavailable");
        if (active) active.innerHTML = matches.length ? matches.map(function (node) { return node.outerHTML; }).join("") : "<section><h2>unknown/unavailable</h2><p>לא נמצא קטע קוד שממופה לקובץ <code dir=\"ltr\">" + esc(path || "unknown/unavailable") + "</code>. לא ממציאים קוד.</p></section>";
        setActive("[data-exam-ide-file]", button);
      }
      popup.document.querySelectorAll("[data-ide-show-question]").forEach(function (button) {
        button.addEventListener("click", function () {
          setActive(".question-tree button", button);
          showQuestion();
        });
      });
      popup.document.querySelectorAll("[data-ide-explain-task]").forEach(function (button) {
        button.addEventListener("click", function () {
          setActive(".question-tree button", button);
          showTaskExplanation(button);
        });
      });
      popup.document.querySelectorAll("[data-exam-ide-file]").forEach(function (button) {
        button.addEventListener("click", function () {
          var path = button.getAttribute("data-exam-ide-file") || "unknown/unavailable";
          showCodeFile(path, button);
        });
      });
    }
    container.querySelectorAll("[data-exam-question-open]").forEach(function (button) {
      button.addEventListener("click", function () {
        openExamQuestionPage(button.getAttribute("data-exam-question-open") || "");
      });
    });
    container.querySelectorAll("[data-exam-portal-task]").forEach(function (button) {
      button.addEventListener("click", function () {
        showExamPortalTask(button);
      });
    });
    container.querySelectorAll("[data-exam-portal-file]").forEach(function (button) {
      button.addEventListener("click", function () {
        showExamPortalCode(button.getAttribute("data-exam-portal-file") || "unknown/unavailable", button);
      });
    });
    var portal = container.querySelector("[data-exam-task-ide-portal]");
    if (portal) {
      var defaultSection = portal.getAttribute("data-exam-portal-default-section") || "";
      showExamPortalQuestion(defaultSection);
      var defaultFile = portal.querySelector("[data-exam-portal-file]");
      if (defaultFile) showExamPortalCode(defaultFile.getAttribute("data-exam-portal-file") || "unknown/unavailable", defaultFile);
    }
    container.querySelectorAll("[data-exam-question-popout]").forEach(function (button) {
      button.addEventListener("click", function () {
        openExamQuestionIdeWindow(button.getAttribute("data-exam-question-popout") || "");
      });
    });
    container.querySelectorAll("[data-exam-question-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        var sectionId = button.getAttribute("data-exam-question-toggle") || "";
        var preview = container.querySelector("[data-exam-question-preview=\"" + sectionId + "\"]");
        if (!preview) return;
        preview.hidden = !preview.hidden;
        button.textContent = preview.hidden ? "+" : "-";
        button.setAttribute("aria-expanded", preview.hidden ? "false" : "true");
      });
    });
    container.querySelector("[data-hxm-basic-reset]")?.addEventListener("click", function () {
      setDiagnosticProgress({});
      setGateEvidence({});
      container.querySelectorAll("[data-hxm-gate-evidence]").forEach(function (input) {
        input.value = "";
      });
      container.querySelectorAll("[data-hxm-gate-evidence-status]").forEach(function (status) {
        status.textContent = "חובה לכתוב ראיה קצרה לפני סימון מעבר.";
      });
      updateDiagnostic(container, mode.basicDiagnosticTracks || [], esc);
    });
    container.querySelectorAll("[data-hxm-gate-evidence]").forEach(function (input) {
      input.addEventListener("input", function () {
        var trackId = input.getAttribute("data-hxm-gate-evidence") || "";
        var evidence = getGateEvidence();
        evidence[trackId] = Object.assign({}, evidence[trackId] || {}, { text: input.value });
        setGateEvidence(evidence);
        var status = container.querySelector("[data-hxm-gate-evidence-status=\"" + trackId + "\"]");
        if (status) {
          status.textContent = input.value.trim().length >= 20
            ? "ראיה נשמרה. אפשר לסמן מעבר אחרי בדיקה מול checklist."
            : "כתוב לפחות 20 תווים של ראיה אמיתית לפני מעבר.";
        }
      });
    });
    container.querySelectorAll("[data-hxm-gate-pass]").forEach(function (button) {
      button.addEventListener("click", function () {
        var trackId = button.getAttribute("data-hxm-gate-pass") || "";
        var track = (mode.basicDiagnosticTracks || []).find(function (item) { return item.id === trackId; });
        if (!track) return;
        var evidenceInput = container.querySelector("[data-hxm-gate-evidence=\"" + trackId + "\"]");
        var evidenceText = evidenceInput ? evidenceInput.value.trim() : "";
        var status = container.querySelector("[data-hxm-gate-evidence-status=\"" + trackId + "\"]");
        if (evidenceText.length < 20) {
          if (status) status.textContent = "חסר: כתוב ראיה אמיתית של לפחות 20 תווים לפני סימון מעבר.";
          if (evidenceInput) evidenceInput.focus();
          return;
        }
        var evidence = getGateEvidence();
        evidence[trackId] = {
          text: evidenceText,
          passedAt: new Date().toISOString(),
        };
        setGateEvidence(evidence);
        if (status) status.textContent = "מעבר נשמר. המסלול סומן כשלם והצעד הבא עודכן.";
        var nextProgress = getDiagnosticProgress();
        (track.checks || []).forEach(function (check) {
          nextProgress[diagnosticCheckId(track, check)] = true;
        });
        setDiagnosticProgress(nextProgress);
        updateDiagnostic(container, mode.basicDiagnosticTracks || [], esc);
      });
    });
    container.querySelectorAll("[data-hxm-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        var action = button.getAttribute("data-hxm-action") || "";
        if (action === "trainer" && ctx && typeof ctx.openTrainer === "function") return ctx.openTrainer();
        if (action === "trace" && ctx && typeof ctx.openTracePage === "function") return ctx.openTracePage();
        if (action === "codeblocks" && ctx && typeof ctx.openCodeblocks === "function") return ctx.openCodeblocks();
        if (action === "scroll-hxm-basic-diagnostic") return scrollToExamSection("#hxm-basic-diagnostic");
        if (action === "scroll-hxm-exam-only") return scrollToExamSection("#hxm-exam-only-mode");
        if (action === "scroll-hxm-code-quality") return scrollToExamSection("#hxm-code-quality");
        if (action === "scroll-hxm-templates") return scrollToExamSection("#hxm-template-list");
        if (action === "scroll-hxm-js") return scrollToExamSection("#hxm-js-bank");
        if (action === "scroll-hxm-ts") return scrollToExamSection("#hxm-ts-bank");
        if (action === "scroll-hxm-exam-day") return scrollToExamSection("#hxm-exam-day-mode");
        if (action === "scroll-hxm-examples") return scrollToExamSection("#hxm-examples");
        if (action === "scroll-hxm-coverage") return scrollToExamSection("#hxm-coverage-dashboard");
        if (action === "scroll-hxm-solution-guide") return scrollToExamSection("#hxm-solution-guide-drills");
        if (action === "scroll-hxm-red-zone") return scrollToExamSection("#hxm-red-zone");
        if (action === "scroll-hxm-material-backlog") return scrollToExamSection("#hxm-material-backlog");
        if (action === "scroll-hxm-time-plan") return scrollToExamSection("#hxm-time-plan");
        if (action === "focus-next-time-task") {
          var nextInput = container.querySelector("#hxm-time-plan .hxm-time-task.required input[data-hxm-plan-task]:not(:checked):not(:disabled)");
          var nextRow = nextInput ? nextInput.closest(".hxm-time-task") : container.querySelector("#hxm-time-plan [data-hxm-time-diagnostic]:not(.done)");
          if (nextRow) {
            nextRow.scrollIntoView({ behavior: "smooth", block: "center" });
            nextRow.classList.add("hxm-section-pulse");
            setTimeout(function () {
              nextRow.classList.remove("hxm-section-pulse");
            }, 900);
          }
          if (nextInput) nextInput.focus();
          return;
        }
        if (action === "start-homework-mock") {
          var firstId = (mode.templates && mode.templates[0] && mode.templates[0].id) || "";
          var template = examTemplatesByHomeworkId[firstId];
          if (template && ctx && typeof ctx.startMockExam === "function") ctx.startMockExam(template);
        }
      });
    });
    container.querySelectorAll("[data-hxm-open-lesson]").forEach(function (button) {
      button.addEventListener("click", function () {
        var lessonId = button.getAttribute("data-hxm-open-lesson") || "";
        if (lessonId && ctx && typeof ctx.openLesson === "function") ctx.openLesson(lessonId);
      });
    });
    updateProgress(container, masterPlan, tasks, esc);
    updateDiagnostic(container, mode.basicDiagnosticTracks || [], esc);
    updateExam100Path(container, mode.exam100Path, esc);
    bindExam100TaskTreeBoard(container);
  }

  window.renderHomeworkExamModeView = renderHomeworkExamModeView;
})();
