"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Copy, Download, LoaderCircle, Monitor, Send, Share2, SlidersHorizontal, Smartphone } from "lucide-react";
import { EmptyState, PageLoading } from "@/components/EmptyState";
import {
  FORMAT_SIZE,
  ReceiptCard,
  THEMES,
  type ReceiptFormat,
  type ReceiptOptions,
  type ReceiptTheme,
} from "@/components/receipt/ReceiptCard";
import { useRoast } from "@/lib/roast-store";
import { num } from "@/lib/format";

const TOGGLES: { key: keyof ReceiptOptions; title: string; body: string }[] = [
  { key: "showCringe", title: "Show cringe index", body: "Displays calculated algorithmic dignity deficit" },
  { key: "showLateNight", title: "Show after-midnight fee", body: "Flag late-night sleep schedule self-sabotage" },
  { key: "showItems", title: "Itemize channel incidents", body: "List your most embarrassing line items" },
  { key: "showStamp", title: "Watermark severity", body: "Stamp the verification seal on top" },
];

/** Scales the fixed-size receipt down to fit its column. */
function useFitScale(width: number) {
  // Callback ref: the container only mounts once the roast has hydrated.
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [el, width]);
  return { ref: setEl, scale };
}

export default function ReceiptPage() {
  const roast = useRoast();
  const [theme, setTheme] = useState<ReceiptTheme>("neon");
  const [format, setFormat] = useState<ReceiptFormat>("story");
  const [options, setOptions] = useState<ReceiptOptions>({
    showCringe: true,
    showLateNight: true,
    showItems: true,
    showStamp: true,
  });
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const size = FORMAT_SIZE[format];
  const { ref: fitRef, scale } = useFitScale(size.w);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  if (roast === undefined) return <PageLoading />;
  if (!roast) return <EmptyState />;

  const shareText = `RoastMyTube diagnosed me as "${roast.diagnosis.title} & ${roast.diagnosis.title_accent}". ${num(
    roast.meta.estimated_hours,
  )} hours wasted. "${roast.closer}"`;

  async function exportPng() {
    if (!receiptRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(receiptRef.current, { pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `roastmytube-${roast!.meta.report_id}-${format}.png`;
      a.click();
      setToast("Receipt downloaded");
    } catch {
      setToast("Export failed — try again");
    } finally {
      setBusy(false);
    }
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(shareText);
      setToast("Roast copied to clipboard");
    } catch {
      setToast("Couldn't access the clipboard");
    }
  }

  const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}`;
  const redditUrl = `https://www.reddit.com/submit?title=${encodeURIComponent(
    "My YouTube watch history just got roasted",
  )}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(50%_70%_at_50%_0%,rgba(255,77,94,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-wrap items-center gap-3">
          <span className="chip bg-flame/15 text-flame">Export protocol // step 04</span>
          <span className="eyebrow text-amber">Render_ready</span>
        </div>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="display text-5xl sm:text-6xl">
              The digital shame <span className="text-flame">receipt</span>
            </h1>
            <p className="mt-4 text-muted">
              A scientifically weaponized breakdown of your YouTube viewing atrophy. Customise the thermal dossier,
              export it as a high-res card, and broadcast your algorithmic bankruptcy.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <button
              type="button"
              onClick={copyText}
              className="eyebrow flex items-center gap-2 rounded-lg bg-surface-2 px-5 py-3.5 text-sm ring-1 ring-line hover:bg-line"
            >
              <Copy className="size-4" aria-hidden /> Copy roast
            </button>
            <button
              type="button"
              onClick={exportPng}
              disabled={busy}
              className="eyebrow flex items-center gap-2 rounded-lg bg-flame px-5 py-3.5 text-sm text-bg hover:brightness-110 disabled:opacity-60"
            >
              {busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <Download className="size-4" aria-hidden />}
              Export PNG
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* Studio controls */}
          <aside className="card h-fit p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2.5 font-display text-xl font-bold uppercase">
                <SlidersHorizontal className="size-5 text-flame" aria-hidden /> Studio controls
              </h2>
            </div>

            <fieldset className="mt-7">
              <legend className="eyebrow flex w-full justify-between text-flame-soft">
                <span>Receipt material theme</span>
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(Object.keys(THEMES) as ReceiptTheme[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={theme === t}
                    onClick={() => setTheme(t)}
                    className={`rounded-lg p-3 text-left transition ${
                      theme === t ? "bg-surface-2 ring-1 ring-flame/60" : "bg-well hover:bg-surface-2"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-display text-xs font-bold tracking-wider uppercase">
                      <span className="size-3 shrink-0 rounded-full" style={{ background: THEMES[t].dot }} />
                      {THEMES[t].name}
                    </span>
                    <span className="mt-1 block text-xs text-muted">{THEMES[t].blurb}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="eyebrow text-flame-soft">Telemetry & shame parameters</legend>
              <div className="mt-3 space-y-2">
                {TOGGLES.map((t) => (
                  <label
                    key={t.key}
                    className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-well px-4 py-3"
                  >
                    <span>
                      <span className="block font-display text-sm font-bold tracking-wide uppercase">{t.title}</span>
                      <span className="block text-xs text-muted">{t.body}</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={options[t.key]}
                      onChange={(e) => setOptions((o) => ({ ...o, [t.key]: e.target.checked }))}
                      className="size-5 shrink-0 accent-flame"
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="eyebrow text-flame-soft">Output dimension matrix</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(Object.keys(FORMAT_SIZE) as ReceiptFormat[]).map((f) => {
                  const Icon = f === "story" ? Smartphone : Monitor;
                  return (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={format === f}
                      onClick={() => setFormat(f)}
                      className={`flex items-start justify-between gap-2 rounded-lg p-3 text-left transition ${
                        format === f ? "bg-surface-2 ring-1 ring-flame/60" : "bg-well hover:bg-surface-2"
                      }`}
                    >
                      <span>
                        <span className="block font-display text-xs font-bold tracking-wider uppercase">
                          {FORMAT_SIZE[f].label}
                        </span>
                        <span className="block text-xs text-muted">{FORMAT_SIZE[f].px}</span>
                      </span>
                      <Icon className="size-5 shrink-0 text-muted" aria-hidden />
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-7 grid grid-cols-2 gap-2">
              <a
                href={xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow flex items-center justify-center gap-2 rounded-lg bg-surface-2 px-3 py-3.5 ring-1 ring-line hover:bg-line"
              >
                <Send className="size-4" aria-hidden /> Share to X
              </a>
              <a
                href={redditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow flex items-center justify-center gap-2 rounded-lg bg-surface-2 px-3 py-3.5 ring-1 ring-line hover:bg-line"
              >
                <Share2 className="size-4 text-ember" aria-hidden /> Post to Reddit
              </a>
            </div>
          </aside>

          {/* Live preview */}
          <section aria-label="Receipt preview" className="min-w-0">
            <div className="eyebrow mb-3 flex justify-between gap-3 text-muted">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-flame animate-flicker" aria-hidden /> Live preview
              </span>
              <span>{size.px}</span>
            </div>
            <div ref={fitRef} className="w-full">
              <div className="mx-auto" style={{ width: size.w * scale, height: size.h * scale }}>
                <div
                  className="origin-top-left shadow-[0_30px_80px_-20px_rgba(255,77,94,0.35)]"
                  style={{ transform: `scale(${scale})`, width: size.w, height: size.h }}
                >
                  <ReceiptCard ref={receiptRef} roast={roast} theme={theme} format={format} options={options} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-surface-2 px-5 py-3 text-sm shadow-lg ring-1 ring-line"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
