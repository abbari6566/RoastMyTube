"use client";

import Link from "next/link";
import { ArrowRight, Flame, TriangleAlert } from "lucide-react";
import { EmptyState, PageLoading } from "@/components/EmptyState";
import { Highlight } from "@/components/Highlight";
import { Meter } from "@/components/Meter";
import { Thumb } from "@/components/Thumb";
import { useRoast } from "@/lib/roast-store";
import { spiceProfile } from "@/lib/spice";
import { hourLabel, num, shortDate } from "@/lib/format";
import type { Metric } from "@/lib/types";

const TONE: Record<Metric["tone"], string> = {
  light: "text-fg",
  red: "text-flame-soft",
  amber: "text-amber",
};

export default function DashboardPage() {
  const roast = useRoast();
  if (roast === undefined) return <PageLoading />;
  if (!roast) return <EmptyState />;

  const { meta, diagnosis, metrics, stats } = roast;
  const spice = spiceProfile(meta.spice);
  const maxChannel = Math.max(1, ...stats.top_channels.map((c) => c.count));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Report bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="size-3 rounded-full bg-flame animate-flicker" aria-hidden />
          <span className="font-display font-bold tracking-wider text-flame-soft uppercase">
            Diagnostic report #{meta.report_id}
          </span>
          <span className="text-dim">{"//"}</span>
          <span className="eyebrow text-muted">
            {num(meta.total_videos)} videos · {shortDate(meta.date_range.start)} – {shortDate(meta.date_range.end)} (
            {num(meta.days_covered)} days)
          </span>
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="chip bg-amber/10 py-1.5 text-amber">
            AI roast severity: {spice.name} <span aria-hidden>{spice.emoji}</span>
          </span>
        </div>
      </div>

      {/* Hero diagnosis */}
      <section className="card relative mt-8 overflow-hidden bg-[linear-gradient(135deg,#232329_0%,#1b1b20_45%,#2a1d20_100%)] p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="chip bg-flame py-1.5 text-bg">Official psychological diagnosis</span>
              <span className="chip bg-surface-2 py-1.5 text-amber">
                <TriangleAlert className="size-3.5" aria-hidden /> {diagnosis.tag}
              </span>
            </div>
            <h1 className="display mt-6 text-5xl sm:text-6xl xl:text-7xl">
              {diagnosis.title} <span className="text-flame">&amp;</span> {diagnosis.title_accent}
            </h1>
            <p className="mt-8 rounded-xl bg-well px-5 py-5 text-lg leading-relaxed sm:px-8 sm:text-xl">
              <Highlight text={diagnosis.summary} />
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-end">
            <div className="w-full max-w-[300px] rounded-xl bg-well p-2 ring-1 ring-line">
              <Thumb videoId={diagnosis.hero_video_id} className="aspect-square" hue={8} />
              <p className="eyebrow mt-2 rounded-md bg-flame py-2 text-center text-bg">
                Algo puppet tier: {diagnosis.tier}
              </p>
            </div>
            <div className="text-center lg:text-right">
              <p className="eyebrow text-muted">Algorithm resistance</p>
              <p className="font-display text-2xl font-extrabold text-flame-soft uppercase">{diagnosis.resistance}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" aria-label="Shame metrics">
        {metrics.map((m) => (
          <article key={m.kicker} className="card flex flex-col p-6">
            <div className="flex items-start justify-between gap-2">
              <p className="eyebrow text-muted">{m.kicker}</p>
              {m.badge && <span className="chip shrink-0 bg-flame/20 text-flame">{m.badge}</span>}
            </div>
            <p className="eyebrow mt-6 text-amber">{m.label}</p>
            <p className={`mt-1 font-display text-5xl font-black tracking-tight ${TONE[m.tone]}`}>
              {m.value}
              {m.unit && <span className="ml-1 text-xl font-bold text-amber">{m.unit}</span>}
            </p>
            <p className="mt-5 flex-1 rounded-lg bg-well px-3 py-3 text-sm text-muted">{m.caption}</p>
          </article>
        ))}
      </section>

      {/* Channels + closer */}
      <section className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="card p-6">
          <p className="eyebrow text-flame">Repeat offenders</p>
          <h2 className="display mt-2 text-3xl">Top channels</h2>
          <ol className="mt-6 space-y-4">
            {stats.top_channels.map((c, i) => (
              <li key={c.name}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate">
                    <span className="mr-2 font-mono text-dim">{String(i + 1).padStart(2, "0")}</span>
                    {c.name}
                  </span>
                  <span className="shrink-0 font-mono text-muted">{num(c.count)} videos</span>
                </div>
                <Meter percent={(c.count / maxChannel) * 100} index={i} />
              </li>
            ))}
          </ol>
          <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5 text-center">
            <div>
              <dt className="eyebrow text-dim">Peak hour</dt>
              <dd className="font-display text-xl font-bold">{hourLabel(stats.peak_hour)}</dd>
            </div>
            <div>
              <dt className="eyebrow text-dim">After midnight</dt>
              <dd className="font-display text-xl font-bold text-amber">{Math.round(stats.late_night_share * 100)}%</dd>
            </div>
            <div>
              <dt className="eyebrow text-dim">Longest binge</dt>
              <dd className="font-display text-xl font-bold text-flame-soft">{stats.longest_binge.videos} videos</dd>
            </div>
          </dl>
        </div>

        <div className="card flex flex-col justify-between bg-[linear-gradient(160deg,#2a1d20,#1b1b20)] p-6">
          <div>
            <p className="eyebrow flex items-center gap-2 text-flame">
              <Flame className="size-4" aria-hidden /> Closing burn
            </p>
            <blockquote className="mt-4 font-display text-2xl leading-snug font-bold">“{roast.closer}”</blockquote>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Link
              href="/rabbit-holes"
              className="eyebrow flex items-center justify-center gap-2 rounded-lg bg-surface-2 px-4 py-3.5 text-sm ring-1 ring-line hover:bg-line"
            >
              See rabbit holes <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/receipt"
              className="eyebrow flex items-center justify-center gap-2 rounded-lg bg-flame px-4 py-3.5 text-sm text-bg hover:brightness-110"
            >
              Print my receipt <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
