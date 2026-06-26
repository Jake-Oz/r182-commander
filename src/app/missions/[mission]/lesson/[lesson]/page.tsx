import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSeedKnowledgeItems,
  getSeedMission,
  indexByCode,
} from "@/lib/seed-data";

type LessonPageProps = {
  params: Promise<{
    mission: string;
    lesson: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { mission: missionCode, lesson: lessonCode } = await params;
  const [mission, knowledgeItems] = await Promise.all([
    getSeedMission(missionCode),
    getSeedKnowledgeItems(),
  ]);

  const lesson = mission?.lessons.find((item) => item.code === lessonCode);

  if (!mission || !lesson) {
    notFound();
  }

  const knowledgeByCode = indexByCode(knowledgeItems);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="border-b border-panel-border pb-6">
          <Link
            href={`/missions/${mission.code}`}
            className="font-mono text-sm text-accent hover:text-accent-strong"
          >
            Back to {mission.code}
          </Link>
          <p className="mt-6 font-mono text-sm uppercase text-accent">
            {lesson.code}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            {lesson.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            Target duration: {lesson.targetMinutesMin}-{lesson.targetMinutesMax} minutes
          </p>
        </header>

        <section className="grid gap-4">
          {lesson.knowledgeItemCodes.map((code) => {
            const item = knowledgeByCode.get(code);

            if (!item) {
              return null;
            }

            return (
              <article key={code} className="border border-panel-border bg-panel p-5">
                <p className="font-mono text-xs uppercase text-accent">
                  {item.code}
                </p>
                <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-mono text-xs uppercase text-muted">
                      Knowledge
                    </h3>
                    <p className="mt-2 text-sm leading-6">{item.knowledge}</p>
                  </div>
                  <div>
                    <h3 className="font-mono text-xs uppercase text-muted">
                      Understanding
                    </h3>
                    <p className="mt-2 text-sm leading-6">
                      {item.understanding}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-mono text-xs uppercase text-muted">
                      Application
                    </h3>
                    <p className="mt-2 text-sm leading-6">
                      {item.application}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-mono text-xs uppercase text-muted">
                      Command
                    </h3>
                    <p className="mt-2 text-sm leading-6">{item.command}</p>
                  </div>
                </div>
                <div className="mt-5 border-t border-panel-border pt-4">
                  <h3 className="font-mono text-xs uppercase text-muted">
                    Sources
                  </h3>
                  <div className="mt-3 grid gap-2">
                    {item.sourceReferences.map((source) => (
                      <div
                        key={`${source.sourceTitle}-${source.sourceSection}-${source.sourcePage}`}
                        className="grid gap-1 text-sm leading-6 text-muted sm:grid-cols-[1fr_auto]"
                      >
                        <span>
                          {source.sourceSection} | page {source.sourcePage}
                        </span>
                        <span className="font-mono text-xs uppercase text-accent">
                          {source.verification}
                          {source.pdfPages?.length
                            ? ` | PDF ${source.pdfPages.join(", ")}`
                            : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
