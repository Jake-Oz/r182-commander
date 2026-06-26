import Link from "next/link";

type SectionPlaceholderProps = {
  title: string;
  description: string;
};

export function SectionPlaceholder({
  title,
  description,
}: SectionPlaceholderProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-5 py-10 sm:px-8">
        <Link
          href="/dashboard"
          className="mb-8 w-fit font-mono text-sm text-accent hover:text-accent-strong"
        >
          Back to dashboard
        </Link>
        <section className="border border-panel-border bg-panel p-6 sm:p-8">
          <p className="font-mono text-sm uppercase text-muted">Route</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {description}
          </p>
        </section>
      </div>
    </main>
  );
}
