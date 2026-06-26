import Link from "next/link";
import {
  getSeedKnowledgeItems,
  getSeedMissions,
  getSeedScenarios,
} from "@/lib/seed-data";

export default async function AssessmentPage() {
  const [missions, scenarios, knowledgeItems] = await Promise.all([
    getSeedMissions(),
    getSeedScenarios(),
    getSeedKnowledgeItems(),
  ]);

  const commandScenarios = scenarios.filter(
    (scenario) => scenario.minimumCompetency === "COMMAND",
  );
  const verifiedItems = knowledgeItems.filter(
    (item) => item.verificationStatus === "VERIFIED",
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="border-b border-panel-border pb-6">
          <p className="font-mono text-sm uppercase text-accent">
            Assessment Engine
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            Competency readiness
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
            Assessments should only promote verified Knowledge Items into
            scoring flows. Extracted POH facts remain reviewable but not final.
          </p>
        </header>

        <section className="grid gap-3 sm:grid-cols-3">
          <div className="border border-panel-border bg-panel p-5">
            <p className="text-sm text-muted">Verified Knowledge Items</p>
            <p className="mt-2 text-3xl font-semibold">
              {verifiedItems.length}
            </p>
          </div>
          <div className="border border-panel-border bg-panel p-5">
            <p className="text-sm text-muted">Command scenarios</p>
            <p className="mt-2 text-3xl font-semibold">
              {commandScenarios.length}
            </p>
          </div>
          <div className="border border-panel-border bg-panel p-5">
            <p className="text-sm text-muted">Graduation gates</p>
            <p className="mt-2 text-3xl font-semibold">{missions.length}</p>
          </div>
        </section>

        <section className="border border-panel-border bg-panel p-5">
          <h2 className="text-xl font-semibold">Assessment Candidates</h2>
          <div className="mt-4 grid gap-3">
            {commandScenarios.map((scenario) => (
              <Link
                key={scenario.code}
                href={`/scenarios/${scenario.code}`}
                className="grid gap-2 border-t border-panel-border pt-3 text-sm hover:text-accent first:border-t-0 first:pt-0 sm:grid-cols-[1fr_140px_120px]"
              >
                <span>{scenario.title}</span>
                <span className="font-mono text-xs uppercase text-muted">
                  {scenario.minimumCompetency}
                </span>
                <span className="font-mono text-xs uppercase text-muted">
                  {scenario.commanderScore}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
