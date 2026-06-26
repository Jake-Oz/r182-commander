import {
  getSeedCompetencies,
  getSeedMissions,
  getSeedScenarios,
} from "@/lib/seed-data";

const levelByStatus = {
  LOCKED: 0,
  AVAILABLE: 1,
  ACTIVE: 2,
  COMPLETED: 3,
  MASTERED: 4,
};

export default async function ProgressPage() {
  const [missions, scenarios, competencies] = await Promise.all([
    getSeedMissions(),
    getSeedScenarios(),
    getSeedCompetencies(),
  ]);

  const activeMissions = missions.filter((mission) => mission.status === "ACTIVE");
  const activeScenarioCount = scenarios.filter(
    (scenario) => scenario.status === "ACTIVE",
  ).length;
  const commanderScore =
    missions.reduce((total, mission) => total + levelByStatus[mission.status], 0) /
    (missions.length * 4);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="border-b border-panel-border pb-6">
          <p className="font-mono text-sm uppercase text-accent">
            Pilot State
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            Progress model
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
            This is a deterministic seed-data progress view. User-specific
            progress will move to server-side persistence when authentication is
            introduced.
          </p>
        </header>

        <section className="grid gap-3 sm:grid-cols-3">
          <div className="border border-panel-border bg-panel p-5">
            <p className="text-sm text-muted">Commander score baseline</p>
            <p className="mt-2 text-3xl font-semibold">
              {Math.round(commanderScore * 100)}
            </p>
          </div>
          <div className="border border-panel-border bg-panel p-5">
            <p className="text-sm text-muted">Active missions</p>
            <p className="mt-2 text-3xl font-semibold">
              {activeMissions.length}
            </p>
          </div>
          <div className="border border-panel-border bg-panel p-5">
            <p className="text-sm text-muted">Active scenarios</p>
            <p className="mt-2 text-3xl font-semibold">
              {activeScenarioCount}
            </p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_380px]">
          <div className="border border-panel-border bg-panel p-5">
            <h2 className="text-xl font-semibold">Mission State</h2>
            <div className="mt-4 grid gap-3">
              {missions.map((mission) => (
                <div
                  key={mission.code}
                  className="grid gap-2 border-t border-panel-border pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[90px_1fr_120px]"
                >
                  <span className="font-mono text-xs uppercase text-accent">
                    {mission.code}
                  </span>
                  <span className="text-sm">{mission.title}</span>
                  <span className="font-mono text-xs uppercase text-muted">
                    {mission.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside className="border border-panel-border bg-panel p-5">
            <h2 className="text-xl font-semibold">Competency Domains</h2>
            <div className="mt-4 grid gap-3">
              {competencies.map((competency) => (
                <div
                  key={competency.code}
                  className="border-t border-panel-border pt-3 first:border-t-0 first:pt-0"
                >
                  <p className="font-mono text-xs uppercase text-accent">
                    {competency.domain}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {competency.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {competency.description}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
