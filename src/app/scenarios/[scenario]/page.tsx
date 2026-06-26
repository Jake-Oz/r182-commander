import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSeedCompetencies,
  getSeedKnowledgeItems,
  getSeedMissions,
  getSeedScenario,
  indexByCode,
} from "@/lib/seed-data";

type ScenarioPageProps = {
  params: Promise<{
    scenario: string;
  }>;
};

function JsonBlock({ value }: { value: unknown }) {
  return (
    <pre className="overflow-auto border border-panel-border bg-background p-4 font-mono text-xs leading-6 text-muted">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

export default async function ScenarioPage({ params }: ScenarioPageProps) {
  const { scenario: scenarioCode } = await params;
  const [scenario, missions, knowledgeItems, competencies] = await Promise.all([
    getSeedScenario(scenarioCode),
    getSeedMissions(),
    getSeedKnowledgeItems(),
    getSeedCompetencies(),
  ]);

  if (!scenario) {
    notFound();
  }

  const missionByCode = indexByCode(missions);
  const knowledgeByCode = indexByCode(knowledgeItems);
  const competencyByCode = indexByCode(competencies);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="border-b border-panel-border pb-6">
          <Link
            href="/scenarios"
            className="font-mono text-sm text-accent hover:text-accent-strong"
          >
            Back to scenarios
          </Link>
          <p className="mt-6 font-mono text-sm uppercase text-accent">
            {scenario.code}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            {scenario.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {scenario.missionCode
              ? missionByCode.get(scenario.missionCode)?.title
              : "Unassigned mission"}{" "}
            | minimum competency {scenario.minimumCompetency}
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-4">
            <section className="border border-panel-border bg-panel p-5">
              <h2 className="text-xl font-semibold">Scenario Context</h2>
              <div className="mt-4">
                <JsonBlock value={scenario.context} />
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <article className="border border-panel-border bg-panel p-5">
                <h2 className="text-xl font-semibold">Decision Model</h2>
                <div className="mt-4">
                  <JsonBlock value={scenario.decisionModel} />
                </div>
              </article>
              <article className="border border-panel-border bg-panel p-5">
                <h2 className="text-xl font-semibold">Outcome Model</h2>
                <div className="mt-4">
                  <JsonBlock value={scenario.outcomeModel} />
                </div>
              </article>
            </section>
          </div>

          <aside className="flex flex-col gap-4">
            <section className="border border-panel-border bg-panel p-5">
              <h2 className="text-xl font-semibold">Knowledge</h2>
              <div className="mt-4 grid gap-3">
                {scenario.knowledgeItemCodes.map((code) => {
                  const item = knowledgeByCode.get(code);

                  return (
                    <div key={code} className="border-t border-panel-border pt-3 first:border-t-0 first:pt-0">
                      <p className="font-mono text-xs uppercase text-accent">
                        {code}
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        {item?.title ?? "Missing Knowledge Item"}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {item?.knowledge}
                      </p>
                      {item ? (
                        <div className="mt-3 grid gap-1">
                          {item.sourceReferences.map((source) => (
                            <p
                              key={`${source.sourceSection}-${source.sourcePage}`}
                              className="font-mono text-xs uppercase text-muted"
                            >
                              {source.sourcePage} | {source.verification}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="border border-panel-border bg-panel p-5">
              <h2 className="text-xl font-semibold">Competencies</h2>
              <div className="mt-4 grid gap-3">
                {scenario.competencyCodes.map((code) => {
                  const competency = competencyByCode.get(code);

                  return (
                    <div key={code} className="border-t border-panel-border pt-3 first:border-t-0 first:pt-0">
                      <p className="font-mono text-xs uppercase text-accent">
                        {code}
                      </p>
                      <p className="mt-1 text-sm">
                        {competency?.title ?? "Missing competency"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
