(function () {
  "use strict";

  /**
   * @typedef {import("../view-contracts").QuestionPanelChoiceContract} QuestionPanelChoiceContract
   * @typedef {import("../view-contracts").QuestionPanelFillContract} QuestionPanelFillContract
   * @typedef {import("../view-contracts").QuestionPanelRenderContext} QuestionPanelRenderContext
   */

  const root = typeof window !== "undefined" ? window : globalThis;

  function fallbackEsc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeWith(esc, value) {
    return typeof esc === "function" ? esc(value) : fallbackEsc(value);
  }

  function renderEmpty(message, esc) {
    return `<div class="concept-quiz-empty">${escapeWith(esc, message || "unknown/unavailable")}</div>`;
  }

  /**
   * @param {QuestionPanelRenderContext & { q: QuestionPanelChoiceContract }} input
   */
  function renderInlineMc({ sc, totalQuestionStages, q, lesson, concept, esc, renderQuestionPrereqPanel }) {
    const escape = (value) => escapeWith(esc, value);
    const prereq = typeof renderQuestionPrereqPanel === "function"
      ? renderQuestionPrereqPanel({ question: q, lesson, concept, mode: "inline" })
      : "";
    return `
        <details class="concept-questions-panel" data-page-section="שאלות ותרגול" open>
          <summary class="concept-questions-summary"><span>שאלות</span><strong>${escape(sc && sc.passedMC ? 1 : 0)}/${escape(totalQuestionStages)}</strong></summary>
          <div class="concept-stages">
            <details class="concept-stage" data-stage="mc" data-page-section="שאלה 1 מתוך ${escape(totalQuestionStages)} — אמריקנית" open>
              <summary class="concept-stage-head"><span>שאלה 1 מתוך ${escape(totalQuestionStages)}</span> 🅰️ שאלה אמריקנית</summary>
              <div class="concept-stage-body" id="cs-mc-body">
                <div class="concept-inline-quiz" data-stage="mc">
                  <div class="question-learning-layout inline">
                    <div class="question-answer-area">
                      <div class="ciq-question-count">שאלה 1 מתוך ${escape(totalQuestionStages)}</div>
                      <div class="ciq-question">${escape(q && q.question).replace(/\n/g, "<br>")}</div>
                      ${q && q.codeBlock ? `<div class="code-box"><pre><code>${escape(q.codeBlock)}</code></pre></div>` : ""}
                      <div class="ciq-options">
                        ${(Array.isArray(q && q.options) ? q.options : [])
                          .map((opt, i) => `<button class="ciq-option" data-i="${i}">${escape(opt)}</button>`)
                          .join("")}
                      </div>
                    </div>
                    ${prereq}
                  </div>
                  <div class="ciq-feedback"></div>
                </div>
              </div>
            </details>
          </div>
        </details>`;
  }

  /**
   * @param {QuestionPanelRenderContext & { fill: QuestionPanelFillContract, fillCode: string, fillAnswer: string, conceptKeyValue?: string }} input
   */
  function renderInlineFill({
    sc,
    totalQuestionStages,
    fill,
    fillCode,
    fillAnswer,
    lesson,
    concept,
    esc,
    conceptKeyValue,
    renderQuestionPrereqPanel,
  }) {
    const escape = (value) => escapeWith(esc, value);
    const conceptName = concept && concept.conceptName ? concept.conceptName : "unknown/unavailable";
    const promptQuestion = {
      question: `השלם את הטוקן החסר בקוד של ${conceptName}`,
      code: fillCode,
      conceptKey: conceptKeyValue || "unknown/unavailable",
    };
    const prereq = typeof renderQuestionPrereqPanel === "function"
      ? renderQuestionPrereqPanel({ question: promptQuestion, lesson, concept, mode: "inline" })
      : "";
    const hint = (fill && fill.hint) || `אורך התשובה: ${String(fillAnswer || "").length} תווים. אות ראשונה: "${String(fillAnswer || "")[0] || ""}".`;
    return `
        <details class="concept-questions-panel" data-page-section="שאלות ותרגול" open>
          <summary class="concept-questions-summary"><span>שאלות</span><strong>${escape(sc && sc.passedMC ? 1 : 0)}/${escape(totalQuestionStages)}</strong></summary>
          <div class="concept-stages">
            <details class="concept-stage" data-stage="fill" data-page-section="שאלה 2 מתוך ${escape(totalQuestionStages)} — השלמת קוד" open>
              <summary class="concept-stage-head"><span>שאלה 2 מתוך ${escape(totalQuestionStages)}</span> ✍️ השלמת קוד</summary>
              <div class="concept-stage-body" id="cs-fill-body">
                <div class="concept-inline-quiz" data-stage="fill">
                  <div class="question-learning-layout inline">
                    <div class="question-answer-area">
                      <div class="ciq-question-count">שאלה 2 מתוך ${escape(totalQuestionStages)}</div>
                      <div class="ciq-hint">${escape(hint)}</div>
                      <div class="code-box"><pre><code>${escape(fillCode).replace(/____/g, '<span class="tq-code-blank">____</span>')}</code></pre></div>
                      <div class="ciq-fill-row">
                        <input type="text" class="ciq-fill-input" placeholder="הקלד את הטוקן החסר..." dir="ltr" autocomplete="off" spellcheck="false" />
                        <button class="ciq-submit primary">✅ בדוק</button>
                      </div>
                    </div>
                    ${prereq}
                  </div>
                  <div class="ciq-feedback"></div>
                </div>
              </div>
            </details>
          </div>
        </details>`;
  }

  function isFillCorrect(userAnswer, expectedAnswer) {
    return String(userAnswer || "").trim().toLowerCase() === String(expectedAnswer || "").trim().toLowerCase();
  }

  function renderQuizResultBlock(correct, msg, esc) {
    return `<div class="ciq-fb ${correct ? "correct" : "wrong"}">
      <strong>${correct ? "✅" : "❌"}</strong> ${escapeWith(esc, msg)}
    </div>`;
  }

  root.LumenQuestionPanels = {
    renderEmpty,
    renderInlineMc,
    renderInlineFill,
    isFillCorrect,
    renderQuizResultBlock,
  };
})();
