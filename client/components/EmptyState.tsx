import Link from "next/link";
import { Ghost } from "lucide-react";

export function EmptyState() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-surface ring-1 ring-line">
        <Ghost className="size-7 text-flame" aria-hidden />
      </span>
      <h1 className="display mt-6 text-4xl">Nothing to roast yet</h1>
      <p className="mt-3 text-muted">
        Upload your watch history first. We can&apos;t judge what we haven&apos;t seen (yet).
      </p>
      <Link
        href="/"
        className="eyebrow mt-8 rounded-lg bg-flame px-6 py-3.5 text-sm text-bg transition hover:brightness-110"
      >
        Upload my history
      </Link>
    </section>
  );
}

export function PageLoading() {
  return <div className="min-h-[60vh]" aria-busy="true" />;
}
