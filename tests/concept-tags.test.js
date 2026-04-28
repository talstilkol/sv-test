import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import {
  buildConceptRegistry,
  canonicalConceptKey,
  normalizeConceptName,
  resolveConceptKey,
  resolveConceptKeysForQuestion,
  splitConceptKey,
  tagForConcept,
} from "../src/core/concept-tags.js";
import { inferQuestionConceptKeys } from "../src/core/question-prerequisites.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILES = [
  "data/lesson11.js",
  "data/lesson12.js",
  "data/lesson13.js",
  "data/lesson_html_css_foundations.js",
  "data/lesson_tooling_git.js",
  "data/lesson15.js",
  "data/lesson16.js",
  "data/lesson17.js",
  "data/lesson18.js",
  "data/lesson19.js",
  "data/lesson20.js",
  "data/lesson_sql_orm.js",
  "data/lesson_auth_security.js",
  "data/lesson_nextjs.js",
  "data/lesson_nestjs.js",
  "data/lesson_devops_deploy.js",
  "data/lesson_ai_engineering.js",
  "data/lesson_design_systems.js",
  "data/lesson21.js",
  "data/lesson22.js",
  "data/lesson23.js",
  "data/lesson24.js",
  "data/lesson25.js",
  "data/lesson26.js",
  "data/lesson27.js",
  "data/lesson_closures.js",
  "data/workbook_taskmanager.js",
  "data/ai_development.js",
  "data/react_blueprint.js",
  "data/questions_bank.js",
  "data/svcollege_questions_sql_orm.js",
  "data/svcollege_questions_auth.js",
  "data/svcollege_questions_nextjs.js",
  "data/svcollege_questions_nestjs.js",
  "data/svcollege_questions_devops.js",
  "data/svcollege_questions_ai_engineering.js",
  "data/svcollege_questions_design_systems.js",
  "data/svcollege_questions_bridge.js",
  "data/lesson_quiz_keys.js",
  "content-loader.js",
];

function loadPortalData() {
  const sandbox = {
    console: { log() {}, warn() {}, error() {} },
    setTimeout() {},
    clearTimeout() {},
  };
  sandbox.window = sandbox;
  sandbox.global = sandbox;

  DATA_FILES.forEach((file) => {
    vm.runInNewContext(
      fs.readFileSync(path.join(ROOT, file), "utf8"),
      sandbox,
      { filename: file },
    );
  });

  return {
    lessons: sandbox.LESSONS_DATA || [],
    bank: sandbox.QUESTIONS_BANK || { mc: [], fill: [] },
  };
}

describe("concept tag registry", () => {
  it("normalizes names and splits canonical keys deterministically", () => {
    expect(normalizeConceptName("  מִשְׁתַּנֶּה  ")).toBe("משתנה");
    expect(canonicalConceptKey("lesson_11", "Array")).toBe("lesson_11::Array");
    expect(splitConceptKey("lesson_11::By Reference")).toEqual({
      lessonId: "lesson_11",
      conceptName: "By Reference",
    });
  });

  it("builds aliases and tags for one concept", () => {
    const tag = tagForConcept(
      { id: "lesson_11", title: "JS" },
      { conceptName: "Array", difficulty: 2, aliases: ["מערך"] },
      0,
    );

    expect(tag.key).toBe("lesson_11::Array");
    expect(tag.tags).toContain("lesson:lesson_11");
    expect(tag.tags).toContain("alias:מערך");
    expect(tag.tags).toContain("difficulty:2");
  });

  it("resolves duplicate concept names only when the lesson context disambiguates them", () => {
    const lessons = [
      { id: "a", concepts: [{ conceptName: "Component" }] },
      { id: "b", concepts: [{ conceptName: "Component" }] },
    ];
    const registry = buildConceptRegistry(lessons);

    expect(registry.duplicateConceptNames).toHaveLength(1);
    expect(resolveConceptKey({ conceptName: "Component", registry })).toBe("");
    expect(resolveConceptKey({ lessonId: "b", conceptName: "Component", registry })).toBe("b::Component");
  });

  it("keeps multi-concept question tags stable and unique", () => {
    const registry = buildConceptRegistry([
      {
        id: "lesson_11",
        concepts: [{ conceptName: "Array" }, { conceptName: "Index" }],
      },
    ]);
    const keys = resolveConceptKeysForQuestion({
      question: {
        conceptKeys: ["lesson_11::Array", "lesson_11::Index", "lesson_11::Array"],
      },
      registry,
    });

    expect(keys).toEqual(["lesson_11::Array", "lesson_11::Index"]);
  });

  it("assigns a canonical tag to every loaded portal concept", () => {
    const { lessons } = loadPortalData();
    const registry = buildConceptRegistry(lessons);
    const conceptCount = lessons.reduce((sum, lesson) => sum + (lesson.concepts || []).length, 0);

    expect(registry.size).toBe(conceptCount);
    expect(conceptCount).toBeGreaterThan(400);
    lessons.forEach((lesson) => {
      (lesson.concepts || []).forEach((concept) => {
        const key = canonicalConceptKey(lesson.id, concept.conceptName);
        const tag = registry.byKey[key];
        expect(tag).toBeTruthy();
        expect(tag.tags).toContain(key);
        expect(tag.aliases.length).toBeGreaterThan(0);
      });
    });
  });

  it("resolves every loaded MC/fill question to existing concept tags", () => {
    const { lessons, bank } = loadPortalData();
    const registry = buildConceptRegistry(lessons);
    const questions = [...(bank.mc || []), ...(bank.fill || [])];
    const unresolved = questions
      .map((question) => {
        const explicitKeys = resolveConceptKeysForQuestion({ question, registry });
        const inferredKeys = explicitKeys.length
          ? explicitKeys
          : inferQuestionConceptKeys({ question, lessons, limit: 6 })
            .map((key) => resolveConceptKey({ conceptKey: key, registry }))
            .filter(Boolean);
        return {
          id: question.id || question.question || question.prompt || "",
          keys: inferredKeys,
        };
      })
      .filter((item) => !item.keys.length || item.keys.some((key) => !registry.byKey[key]));

    expect(questions.length).toBeGreaterThan(100);
    expect(unresolved).toEqual([]);
  });
});
