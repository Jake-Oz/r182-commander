import { getSeedAircraft } from "@/lib/seed-data";

function formatValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }

  return String(value);
}

function getAircraftFuelConfiguration(aircraft: Awaited<ReturnType<typeof getSeedAircraft>>) {
  return aircraft.configuration.fuel?.aircraftSpecificUsableFuel as
    | {
        usableGallons?: number;
        usableLitres?: number;
        notes?: string;
      }
    | undefined;
}

export default async function AircraftPage() {
  const aircraft = await getSeedAircraft();
  const aircraftFuel = getAircraftFuelConfiguration(aircraft);
  const sections = Object.entries(aircraft.configuration);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="border-b border-panel-border pb-6">
          <p className="font-mono text-sm uppercase text-accent">
            {aircraft.code}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            {aircraft.year} {aircraft.manufacturer} {aircraft.variant}
          </h1>
          <p className="mt-3 text-sm text-muted">
            Configuration extracted from POH seed data. Status:{" "}
            <span className="font-mono text-accent-strong">
              {aircraft.verificationStatus}
            </span>
          </p>
        </header>

        {aircraftFuel ? (
          <section className="border border-accent bg-panel p-5">
            <p className="font-mono text-xs uppercase text-accent">
              Aircraft-specific fuel
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted">Operational usable fuel</p>
                <p className="mt-1 text-2xl font-semibold">
                  {aircraftFuel.usableLitres} L
                </p>
              </div>
              <div>
                <p className="text-sm text-muted">Weight and balance</p>
                <p className="mt-1 text-2xl font-semibold">
                  {aircraftFuel.usableGallons} US gal
                </p>
              </div>
              <div>
                <p className="text-sm text-muted">Display rule</p>
                <p className="mt-1 text-sm leading-6 text-foreground">
                  Litres operationally; gallons for weight and balance.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2">
          {sections.map(([section, values]) => (
            <article
              key={section}
              className="border border-panel-border bg-panel p-5"
            >
              <h2 className="text-lg font-semibold capitalize">{section}</h2>
              <dl className="mt-4 flex flex-col gap-3">
                {Object.entries(values ?? {}).map(([key, value]) => (
                  <div key={key}>
                    <dt className="font-mono text-xs uppercase text-muted">
                      {key}
                    </dt>
                    <dd className="mt-1 break-words text-sm leading-6 text-foreground">
                      {formatValue(value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </section>

        <section className="border border-panel-border bg-panel p-5">
          <h2 className="text-lg font-semibold">Source References</h2>
          <div className="mt-4 grid gap-3">
            {aircraft.sourceReferences.map((source) => (
              <div
                key={`${source.sourceSection}-${source.sourcePage}`}
                className="border-t border-panel-border pt-3 first:border-t-0 first:pt-0"
              >
                <p className="text-sm text-foreground">
                  {source.sourceSection}
                </p>
                <p className="mt-1 font-mono text-xs text-muted">
                  POH page {source.sourcePage} | PDF pages{" "}
                  {source.pdfPages?.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
