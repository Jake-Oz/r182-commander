import Link from "next/link";
import { architectureTracks, primaryRoutes } from "@/lib/app-shell";
import { getSeedSummary } from "@/lib/seed-data";

export default async function DashboardPage() {
  const { aircraft, knowledgeItems, criticalItemCount } = await getSeedSummary();

  const systemMetrics = [
    { label: "Aircraft", value: aircraft.code },
    { label: "Knowledge items", value: String(knowledgeItems.length) },
    { label: "Critical items", value: String(criticalItemCount) },
    {
      label: "Usable fuel",
      value: `${aircraft.configuration.fuel?.aircraftSpecificUsableFuel?.usableLitres ?? "N/A"} L`,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 border-b border-panel-border pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-sm uppercase text-accent">
              R182 Commander
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
              Command training workspace
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              A maintainable app shell for the knowledge-first mission
              architecture. The current seed set is extracted from the Cessna
              1978 Model R182 Pilot&apos;s Operating Handbook and remains
              source-traceable.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex h-11 items-center justify-center border border-panel-border px-4 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
          >
            Review POH extraction
          </Link>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {systemMetrics.map((metric) => (
            <div
              key={metric.label}
              className="border border-panel-border bg-panel p-4"
            >
              <p className="text-sm text-muted">{metric.label}</p>
              <p className="mt-2 font-mono text-sm text-accent-strong">
                {metric.value}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Application Routes</h2>
              <span className="font-mono text-xs uppercase text-muted">
                App Router
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {primaryRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="group border border-panel-border bg-panel p-5 transition hover:border-accent"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold group-hover:text-accent">
                        {route.label}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {route.description}
                      </p>
                    </div>
                    <span className="font-mono text-xs uppercase text-muted">
                      {route.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="border border-panel-border bg-panel p-5">
            <h2 className="text-xl font-semibold">Architecture Tracks</h2>
            <div className="mt-5 flex flex-col gap-3">
              {architectureTracks.map((track, index) => (
                <div
                  key={track}
                  className="flex items-center gap-3 border-b border-panel-border pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="font-mono text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-foreground">{track}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="border border-panel-border bg-panel p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">POH Extraction Status</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                Records are marked as extracted, not verified. Use the cited
                POH section and page references for human review before using
                content in assessment or operational decision flows.
              </p>
            </div>
            <span className="font-mono text-xs uppercase text-accent-strong">
              {aircraft.verificationStatus}
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
