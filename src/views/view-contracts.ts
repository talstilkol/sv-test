export type UnknownAvailability = "unknown/unavailable";

export interface LegacyBridgeScriptContract {
  path: string;
  globalName: string;
  owner: string;
}

export interface MissingLegacyBridgeGlobal {
  path: string;
  globalName: string;
  owner: string;
}

export interface CodexForwardTaskContract {
  id: string;
  priority: "P0" | "P1" | "P2" | "P3";
  group: "REM" | "MR" | "QA" | "MGMT" | "ENV" | "FINAL" | string;
  title: string;
  hours: number;
}

export interface TaskTreeItemContract {
  id: string;
  label: string;
  minutes: number;
  status: "open" | "done" | "locked" | UnknownAvailability;
  href?: string;
  source?: string;
}

export interface TaskTreeCategoryContract {
  id: string;
  title: string;
  countLabel: string;
  tasks: TaskTreeItemContract[];
}

export interface BugAgentSummaryContract {
  active?: number;
  critical?: number;
  error?: number;
  resolvedThisScan?: number;
  ready?: boolean;
}

export interface BugAgentRowContract {
  id: string;
  title: string;
  detail: string;
  severity: "critical" | "error" | "warning" | "info" | string;
  featureId: string;
  action: string;
}

export interface BugAgentLogContract {
  version: number;
  activeBugs: BugAgentRowContract[];
  lastResolved: BugAgentRowContract[];
  summary: BugAgentSummaryContract;
}

export interface QuestionPanelScoreContract {
  passedMC?: boolean;
  passedFill?: boolean;
  level?: number;
}

export interface QuestionPanelChoiceContract {
  question: string;
  options: string[];
  correctIndex: number;
  codeBlock?: string;
  conceptKey?: string;
}

export interface QuestionPanelFillContract {
  hint?: string;
  answer?: string;
  code?: string;
  prompt?: string;
  conceptKey?: string;
}

export interface QuestionPanelRenderContext {
  sc: QuestionPanelScoreContract;
  totalQuestionStages: number;
  lesson: unknown;
  concept: { conceptName?: string } | Record<string, unknown>;
  esc: (value: unknown) => string;
  renderQuestionPrereqPanel?: (input: Record<string, unknown>) => string;
}
