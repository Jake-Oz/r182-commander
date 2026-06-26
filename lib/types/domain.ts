export type EntityId = string;

export type ISODateTime = string;

export type VerificationStatus =
  | "DRAFT"
  | "EXTRACTED"
  | "VERIFIED"
  | "COMMANDER_ENHANCED";

export type MissionStatus =
  | "LOCKED"
  | "AVAILABLE"
  | "ACTIVE"
  | "COMPLETED"
  | "MASTERED";

export type KnowledgeCategory =
  | "LIMITATION"
  | "PROCEDURE"
  | "SYSTEM"
  | "PERFORMANCE"
  | "EMERGENCY";

export type Criticality = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type OperationalFrequency =
  | "RARE"
  | "OCCASIONAL"
  | "EVERY_FLIGHT"
  | "AS_REQUIRED";

export type CompetencyLevel =
  | "UNSEEN"
  | "RECOGNISE"
  | "EXPLAIN"
  | "APPLY"
  | "COMMAND";

export type ScenarioStatus = "DRAFT" | "VERIFIED" | "ACTIVE" | "ARCHIVED";

export interface TimestampedEntity {
  id: EntityId;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface SourceReference extends TimestampedEntity {
  knowledgeItemId: EntityId;
  sourceType: string;
  sourceTitle: string;
  sourceSection?: string;
  sourcePage?: string;
  sourceRevision?: string;
  verification: VerificationStatus;
  notes?: string;
}

export interface Aircraft extends TimestampedEntity {
  code: string;
  manufacturer: string;
  model: string;
  variant?: string;
  year?: number;
  configuration?: Record<string, unknown>;
}

export interface MissionGraduationCriteria {
  minimumCompetency?: CompetencyLevel;
  minimumCommanderScore?: number;
  requiredLessonIds?: EntityId[];
  requiredScenarioIds?: EntityId[];
}

export interface Mission extends TimestampedEntity {
  aircraftId: EntityId;
  code: string;
  title: string;
  description?: string;
  purpose?: string;
  status: MissionStatus;
  sequence: number;
  graduationCriteria?: MissionGraduationCriteria;
  lessonIds?: EntityId[];
  knowledgeItemIds?: EntityId[];
  scenarioIds?: EntityId[];
  competencyIds?: EntityId[];
}

export interface Lesson extends TimestampedEntity {
  missionId: EntityId;
  code: string;
  title: string;
  summary?: string;
  sequence: number;
  targetMinutesMin?: number;
  targetMinutesMax?: number;
  objectives?: string[];
  knowledgeItemIds?: EntityId[];
}

export interface KnowledgeItem extends TimestampedEntity {
  aircraftId: EntityId;
  code: string;
  title: string;
  category: KnowledgeCategory;
  knowledge: string;
  understanding?: string;
  application?: string;
  command?: string;
  memoryRequired: boolean;
  referenceRequired: boolean;
  criticality: Criticality;
  operationalFrequency?: OperationalFrequency;
  verificationStatus: VerificationStatus;
  sourceReferences?: SourceReference[];
  lessonIds?: EntityId[];
  missionIds?: EntityId[];
  scenarioIds?: EntityId[];
  competencyIds?: EntityId[];
}

export interface Scenario extends TimestampedEntity {
  aircraftId: EntityId;
  missionId?: EntityId;
  code: string;
  title: string;
  status: ScenarioStatus;
  context: Record<string, unknown>;
  initialState?: Record<string, unknown>;
  decisionModel?: Record<string, unknown>;
  outcomeModel?: Record<string, unknown>;
  minimumCompetency?: CompetencyLevel;
  commanderScore?: number;
  knowledgeItemIds?: EntityId[];
  competencyIds?: EntityId[];
}

export interface Competency extends TimestampedEntity {
  code: string;
  title: string;
  description?: string;
  domain?: string;
  knowledgeItemIds?: EntityId[];
  missionIds?: EntityId[];
  scenarioIds?: EntityId[];
}
