export type LearningId = string;
export type EvidenceStatus = "ready" | "manual_review" | "unknown/unavailable";
export type QuestionKind = "mc" | "fill";
export type ScoreAuthority = "local-practice" | "backend-auth" | "unknown/unavailable";

export interface LessonContract {
  id: LearningId;
  title: string;
  conceptKeys: LearningId[];
  source: string;
  required: boolean;
  estimatedMinutes: number | null;
  evidenceStatus: EvidenceStatus;
}

export interface ConceptContract {
  key: LearningId;
  lessonId: LearningId;
  title: string;
  prerequisiteKeys: LearningId[];
  examWeight: number | null;
  evidenceStatus: EvidenceStatus;
}

export interface MultipleChoiceQuestionContract {
  id: LearningId;
  kind: "mc";
  conceptKey: LearningId;
  level: number;
  options: string[];
  correctIndex: number;
  explanation: string;
  optionFeedback: string[];
  source: "manual";
}

export interface FillQuestionContract {
  id: LearningId;
  kind: "fill";
  conceptKey: LearningId;
  level: number;
  code: string;
  answer: string;
  hint: string | null;
  explanation: string;
  source: "manual";
}

export type QuestionContract = MultipleChoiceQuestionContract | FillQuestionContract;

export interface ScoreContract {
  questionId: LearningId;
  conceptKey: LearningId;
  correct: boolean;
  scorePercent: number;
  updatedAt: string;
  authority: ScoreAuthority;
}
