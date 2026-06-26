import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSeedCompetencies,
  getSeedKnowledgeItems,
  getSeedMission,
  getSeedScenarios,
  indexByCode,
} from "@/lib/seed-data";

type MissionPageProps = {
  params: Promise<{
    mission: string;
  }>;
};

export default async function MissionPage({ params }: MissionPageProps) {
  const { mission: missionCode } = await params;
  const [mission, knowledgeItems, competencies, scenarios] = await Promise.all([
    getSeedMission(missionCode),
    getSeedKnowledgeItems(),
    getSeedCompetencies(),
    getSeedScenarios(),
  ]);

  if (!mission) {
    notFound();
  }

  const knowledgeByCode = indexByCode(knowledgeItems);
  const competencyByCode = indexByCode(competencies);
  const scenarioByCode = indexByCode(scenarios);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="border-b border-panel-border pb-6">
          <Link
            href="/missions"
            className="font-mono text-sm text-accent hover:text-accent-strong"
          >
            Back to missions
          </Link>
          <p className="mt-6 font-mono text-sm uppercase text-accent">
            {mission.code}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            {mission.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
            {mission.purpose}
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4">
            <section className="border border-panel-border bg-panel p-5">
              <h2 className="text-xl font-semibold">Lessons</h2>
              <div className="mt-4 grid gap-3">
                {mission.lessons.map((lesson) => (
                  <Link
                    key={lesson.code}
                    href={`/missions/${mission.code}/lesson/${lesson.code}`}
                    className="border border-panel-border p-4 transition hover:border-accent"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs uppercase text-muted">
                          {lesson.code}
                        </p>
                        <h3 className="mt-2 text-base font-semibold">
                          {lesson.title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs uppercase text-muted">
                        {lesson.targetMinutesMin}-{lesson.targetMinutesMax} min
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {lesson.knowledgeItemCodes.length} source-backed
                      Knowledge Items
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="border border-panel-border bg-panel p-5">
              <h2 className="text-xl font-semibold">Knowledge Items</h2>
              <div className="mt-4 grid gap-3">
                {mission.knowledgeItemCodes.map((code) => {
                  const item = knowledgeByCode.get(code);

                  return (
                    <article key={code} className="border-t border-panel-border pt-3 first:border-t-0 first:pt-0">
                      <p className="font-mono text-xs uppercase text-accent">
                        {code}
                      </p>
                      <h3 className="mt-1 text-base font-semibold">
                        {item?.title ?? "Missing Knowledge Item"}
                      </h3>
                      {item ? (
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {item.knowledge}
                        </p>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-4">
            <section className="border border-panel-border bg-panel p-5">
              <h2 className="text-xl font-semibold">Graduation</h2>
              <dl className="mt-4 grid gap-3">
                <div>
                  <dt className="font-mono text-xs uppercase text-muted">
                    Minimum competency
                  </dt>
                  <dd className="mt-1 text-sm">
                    {mission.graduationCriteria?.minimumCompetency ?? "Unset"}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase text-muted">
                    Commander score
                  </dt>
                  <dd className="mt-1 text-sm">
                    {mission.graduationCriteria?.minimumCommanderScore ?? 0}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="border border-panel-border bg-panel p-5">
              <h2 className="text-xl font-semibold">Competencies</h2>
              <div className="mt-4 grid gap-3">
                {mission.competencyCodes.map((code) => {
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

            <section className="border border-panel-border bg-panel p-5">
              <h2 className="text-xl font-semibold">Scenarios</h2>
              <div className="mt-4 grid gap-3">
                {(mission.scenarioCodes ?? []).map((code) => {
                  const scenario = scenarioByCode.get(code);

                  return (
                    <Link
                      key={code}
                      href={`/scenarios/${code}`}
                      className="border-t border-panel-border pt-3 text-sm hover:text-accent first:border-t-0 first:pt-0"
                    >
                      {scenario?.title ?? code}
                    </Link>
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
