import Link from "next/link";
import { Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="flex flex-wrap items-baseline gap-2">
          <Wordmark className="text-flame" />
          <span className="eyebrow text-dim">{"// Algorithmic shame protocol"}</span>
        </p>
        <p className="text-xs text-dim">
          Your file is processed in memory and never saved. Video titles are sent to OpenAI to write the roast.
        </p>
        <nav className="flex gap-5" aria-label="Footer">
          <Link href="/" className="eyebrow text-muted hover:text-fg">
            Upload archive
          </Link>
          <Link href="/#how-to" className="eyebrow text-muted hover:text-fg">
            Get your file
          </Link>
        </nav>
      </div>
    </footer>
  );
}
