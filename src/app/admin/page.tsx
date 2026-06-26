import { getSeedKnowledgeItems } from "@/lib/seed-data";

export default async function AdminPage() {
  const knowledgeItems = await getSeedKnowledgeItems();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="border-b border-panel-border pb-6">
          <p className="font-mono text-sm uppercase text-accent">
            Knowledge Admin
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            POH extraction review
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
            These records are extracted from OCR and visual checks of the POH.
            Keep them out of assessment flows until their source references are
            reviewed and promoted to verified.
          </p>
        </header>

        <section className="grid gap-3">
          {knowledgeItems.map((item) => {
            const source = item.sourceReferences[0];

            return (
              <article
                key={item.code}
                className="border border-panel-border bg-panel p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase text-accent">
                      {item.code}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-foreground">
                      {item.knowledge}
                    </p>
                  </div>
                  <div className="flex gap-2 font-mono text-xs uppercase">
                    <span className="border border-panel-border px-2 py-1 text-muted">
                      {item.category}
                    </span>
                    <span className="border border-panel-border px-2 py-1 text-accent-strong">
                      {item.verificationStatus}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 border-t border-panel-border pt-4 md:grid-cols-3">
                  <div>
                    <p className="font-mono text-xs uppercase text-muted">
                      Criticality
                    </p>
                    <p className="mt-1 text-sm">{item.criticality}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase text-muted">
                      Source
                    </p>
                    <p className="mt-1 text-sm">{source.sourcePage}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase text-muted">
                      PDF page
                    </p>
                    <p className="mt-1 text-sm">
                      {source.pdfPages?.join(", ") ?? "Unmapped"}
                    </p>
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
