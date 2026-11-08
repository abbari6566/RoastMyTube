import { TriangleAlert } from "lucide-react";

const STEPS = [
  {
    title: "Open Google Takeout",
    body: (
      <>
        Go to{" "}
        <a
          href="https://takeout.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-flame underline underline-offset-2"
        >
          takeout.google.com
        </a>{" "}
        and sign in with the account you watch YouTube on.
      </>
    ),
  },
  { title: "Deselect all", body: <>Click “Deselect all”, then scroll down and tick only “YouTube and YouTube Music”.</> },
  {
    title: "Pick history + JSON",
    body: (
      <>
        Click “All YouTube data included” → keep only <b>history</b>. Then “Multiple formats” → set History to{" "}
        <b className="text-amber">JSON</b>.
      </>
    ),
  },
  { title: "Export & download", body: <>Create the export. Google emails you a .zip — usually in minutes, sometimes hours.</> },
  {
    title: "Find the file",
    body: (
      <>
        Unzip and open <code className="font-mono text-xs text-fg">Takeout/YouTube and YouTube Music/history/</code>. Upload{" "}
        <code className="font-mono text-xs text-flame">watch-history.json</code>.
      </>
    ),
  },
];

export function HowToExport() {
  return (
    <section id="how-to" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <p className="eyebrow text-dim">Manual data mining protocol</p>
      <h2 className="display mt-3 text-4xl sm:text-5xl">How to extract your Takeout file in 60 seconds</h2>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s, i) => (
          <li key={s.title} className="card flex flex-col p-5">
            <span className="font-display text-3xl font-black text-flame">{String(i + 1).padStart(2, "0")}</span>
            <span className="mt-3 font-display font-bold uppercase">{s.title}</span>
            <span className="mt-2 text-sm text-muted">{s.body}</span>
          </li>
        ))}
      </ol>

      <p className="mt-6 flex gap-2.5 rounded-xl border border-amber/30 bg-amber/5 px-4 py-3 text-sm text-muted">
        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />
        Takeout defaults to HTML — make sure you switch History to JSON. Accounts created after mid-2020 auto-delete
        history older than 3 years, so your roast may only cover recent sins.
      </p>
    </section>
  );
}
