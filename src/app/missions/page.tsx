import Link from "next/link";
import { getSeedMissions, getSeedScenarios } from "@/lib/seed-data";

const statusTone = {
  LOCKED: "text-muted",
  AVAILABLE: "text-accent",
  ACTIVE: "text-accent-strong",
  COMPLETED: "text-foreground",
  MASTERED: "text-foreground",
};

export default async function MissionsPage() {
  const [missions, scenarios] = await Promise.all([
    getSeedMissions(),
    getSeedScenarios(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="border-b border-panel-border pb-6">
          <p className="font-mono text-sm uppercase text-accent">
            Mission Framework
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            Commander missions
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
            Missions are structured around the progression from knowledge to
            command. Each mission references Knowledge Items instead of
            duplicating aircraft facts.
          </p>
        </header>

        <section className="grid gap-4">
          {missions.map((mission) => {
            const missionScenarios = scenarios.filter(
              (scenario) => scenario.missionCode === mission.code,
            );

            return (
              <Link
                key={mission.code}
                href={`/missions/${mission.code}`}
                className="group border border-panel-border bg-panel p-5 transition hover:border-accent"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase text-accent">
                      {mission.code}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold group-hover:text-accent">
                      {mission.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                      {mission.purpose}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-3 font-mono text-xs uppercase">
                    <span className={statusTone[mission.status]}>
                      {mission.status}
                    </span>
                    <span className="text-muted">
                      {mission.lessons.length} lessons
                    </span>
                    <span className="text-muted">
                      {missionScenarios.length} scenarios
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
