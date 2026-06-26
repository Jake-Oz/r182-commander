import Link from "next/link";
import {
  getSeedKnowledgeItems,
  getSeedMissions,
  getSeedScenarios,
  indexByCode,
} from "@/lib/seed-data";

export default async function ScenariosPage() {
  const [scenarios, missions, knowledgeItems] = await Promise.all([
    getSeedScenarios(),
    getSeedMissions(),
    getSeedKnowledgeItems(),
  ]);

  const missionByCode = indexByCode(missions);
  const knowledgeByCode = indexByCode(knowledgeItems);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="border-b border-panel-border pb-6">
          <p className="font-mono text-sm uppercase text-accent">
            Scenario Engine
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            Operational decisions
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
            Scenarios use Knowledge Items, aircraft state, and operational
            pressure to exercise application and command.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.code}
              href={`/scenarios/${scenario.code}`}
              className="group border border-panel-border bg-panel p-5 transition hover:border-accent"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase text-accent">
                    {scenario.code}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold group-hover:text-accent">
                    {scenario.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {scenario.missionCode
                      ? missionByCode.get(scenario.missionCode)?.title
                      : "Unassigned mission"}
                  </p>
                </div>
                <span className="font-mono text-xs uppercase text-accent-strong">
                  {scenario.status}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {scenario.knowledgeItemCodes.map((code) => (
                  <span
                    key={code}
                    className="border border-panel-border px-2 py-1 font-mono text-xs text-muted"
                  >
                    {knowledgeByCode.get(code)?.title ?? code}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
