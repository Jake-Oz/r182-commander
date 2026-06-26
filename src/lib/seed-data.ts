import { readFile } from "node:fs/promises";
import path from "node:path";

type SourceReference = {
  sourceType: string;
  sourceTitle: string;
  sourceSection: string;
  sourcePage: string;
  pdfPages?: number[];
  verification: string;
  notes?: string;
};

export type SeedAircraft = {
  code: string;
  manufacturer: string;
  model: string;
  variant?: string;
  year?: number;
  verificationStatus: string;
  configuration: {
    engine?: Record<string, unknown>;
    propeller?: Record<string, unknown>;
    fuel?: Record<string, unknown> & {
      operationalDisplayUnit?: string;
      weightAndBalanceUnit?: string;
      aircraftSpecificUsableFuel?: {
        usableGallons: number;
        usableLitres: number;
        notes?: string;
      };
    };
    oil?: Record<string, unknown>;
    weights?: Record<string, unknown>;
    specificLoadings?: Record<string, unknown>;
  };
  sourceReferences: SourceReference[];
};

export type SeedKnowledgeItem = {
  code: string;
  title: string;
  category: string;
  knowledge: string;
  understanding?: string;
  application?: string;
  command?: string;
  memoryRequired: boolean;
  referenceRequired: boolean;
  criticality: string;
  operationalFrequency?: string;
  verificationStatus: string;
  sourceReferences: SourceReference[];
};

export type SeedCompetency = {
  code: string;
  title: string;
  description?: string;
  domain?: string;
};

export type SeedLesson = {
  code: string;
  title: string;
  sequence: number;
  targetMinutesMin?: number;
  targetMinutesMax?: number;
  knowledgeItemCodes: string[];
};

export type SeedMission = {
  code: string;
  title: string;
  purpose: string;
  status: "LOCKED" | "AVAILABLE" | "ACTIVE" | "COMPLETED" | "MASTERED";
  sequence: number;
  competencyCodes: string[];
  knowledgeItemCodes: string[];
  lessons: SeedLesson[];
  scenarioCodes?: string[];
  graduationCriteria?: {
    minimumCompetency?: string;
    minimumCommanderScore?: number;
  };
};

export type SeedScenario = {
  code: string;
  title: string;
  status: "DRAFT" | "VERIFIED" | "ACTIVE" | "ARCHIVED";
  missionCode?: string;
  context: Record<string, unknown>;
  decisionModel?: Record<string, unknown>;
  outcomeModel?: Record<string, unknown>;
  competencyCodes: string[];
  knowledgeItemCodes: string[];
  minimumCompetency?: string;
  commanderScore?: number;
};

async function readSeedJson<T>(relativePath: string): Promise<T> {
  const filePath = path.join(process.cwd(), "data", "seed", relativePath);
  const file = await readFile(filePath, "utf8");
  return JSON.parse(file) as T;
}

export async function getSeedAircraft() {
  return readSeedJson<SeedAircraft>("aircraft/r182-1978.json");
}

export async function getSeedKnowledgeItems() {
  return readSeedJson<SeedKnowledgeItem[]>(
    "knowledge-items/poh-limitations.json",
  );
}

export async function getSeedCompetencies() {
  return readSeedJson<SeedCompetency[]>("competencies/core-competencies.json");
}

export async function getSeedMissions() {
  return readSeedJson<SeedMission[]>("missions/core-missions.json");
}

export async function getSeedScenarios() {
  return readSeedJson<SeedScenario[]>("scenarios/core-scenarios.json");
}

export async function getSeedMission(code: string) {
  const missions = await getSeedMissions();
  return missions.find((mission) => mission.code === code);
}

export async function getSeedScenario(code: string) {
  const scenarios = await getSeedScenarios();
  return scenarios.find((scenario) => scenario.code === code);
}

export function indexByCode<T extends { code: string }>(items: T[]) {
  return new Map(items.map((item) => [item.code, item]));
}

export async function getSeedSummary() {
  const [aircraft, knowledgeItems, missions, scenarios, competencies] =
    await Promise.all([
    getSeedAircraft(),
    getSeedKnowledgeItems(),
    getSeedMissions(),
    getSeedScenarios(),
    getSeedCompetencies(),
  ]);

  const criticalItems = knowledgeItems.filter(
    (item) => item.criticality === "CRITICAL",
  );

  const sourcePages = new Set(
    knowledgeItems.flatMap((item) =>
      item.sourceReferences.map((source) => source.sourcePage),
    ),
  );

  return {
    aircraft,
    knowledgeItems,
    missions,
    scenarios,
    competencies,
    criticalItemCount: criticalItems.length,
    sourcePageCount: sourcePages.size,
  };
}
