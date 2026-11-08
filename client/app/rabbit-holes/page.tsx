"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Brain,
  CircleCheck,
  CircleX,
  FlaskConical,
  Flame,
  HandMetal,
  LifeBuoy,
  RotateCcw,
  TrendingUp,
  TriangleAlert,
  Trash2,
} from "lucide-react";
import { EmptyState, PageLoading } from "@/components/EmptyState";
import { Meter } from "@/components/Meter";
import { Thumb } from "@/components/Thumb";
import { clearRoast, useRoast } from "@/lib/roast-store";
import { num } from "@/lib/format";
import type { Hop, RabbitHole } from "@/lib/types";

const RANK_COLORS = ["bg-flame", "bg-ember", "bg-flame", "bg-amber"];
const HOP_ICONS = [CircleCheck, TrendingUp, TriangleAlert, CircleX];
const HOP_TONES = ["text-amber", "text-amber", "text-ember", "text-flame"];

function RabbitHoleCard({ hole, rank }: { hole: RabbitHole; rank: number }) {
  return (
    <article className="card flex flex-col p-5 sm:p-7">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={`grid size-9 shrink-0 place-items-center rounded font-display text-lg font-bold text-bg ${
              RANK_COLORS[rank % RANK_COLORS.length]
            }`}
          >
            {String(rank + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="eyebrow text-ember">{hole.category}</p>
            <h3 className="display text-2xl sm:text-3xl">{hole.name}</h3>
          </div>
        </div>
        <span className="chip shrink-0 rotate-2 bg-surface-2 text-amber">{hole.count_label}</span>
      </header>

      <div className="mt-6 grid gap-5 rounded-xl bg-well p-4 sm:grid-cols-[minmax(0,200px)_1fr]">
        <Thumb videoId={hole.video_id} label={hole.duration_label} className="aspect-video" hue={rank * 70 + 10} />
        <div className="flex flex-col gap-3">
          {hole.gauges.map((g, i) => (
            <div key={g.label}>
              <div className="eyebrow mb-1.5 flex justify-between gap-3">
                <span className="text-fg">{g.label}</span>
                <span className="text-right text-amber">{g.value}</span>
              </div>
              <Meter percent={g.percent} index={i === 0 ? 1 : 0} />
            </div>
          ))}
          <dl className="mt-1 grid grid-cols-2 gap-3 text-sm">
            {hole.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-muted">{f.label}</dt>
                <dd className="text-amber">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-5 flex-1 rounded-xl bg-surface-2/60 p-5">
        <p className="eyebrow flex items-center gap-2 text-flame">
          <Flame className="size-3.5" aria-hidden /> AI shame assessment:
        </p>
        <p className="mt-3 text-lg leading-relaxed">“{hole.assessment}”</p>
      </div>

      <p className="eyebrow mt-5 text-dim">{hole.footnote}</p>
    </article>
  );
}

function HopCard({ hop, index, last }: { hop: Hop; index: number; last: boolean }) {
  const Icon = HOP_ICONS[Math.min(index, HOP_ICONS.length - 1)];
  const tone = last ? "text-flame" : HOP_TONES[Math.min(index, HOP_TONES.length - 1)];
  return (
    <li className={`card flex flex-col p-5 ${last ? "ring-1 ring-flame/50" : ""}`}>
      <div className="flex items-center justify-between">
        <span className={`chip ${last ? "bg-flame text-bg" : "bg-surface-2 text-muted"}`}>
          {last ? "Terminal hop" : `Hop ${String(index + 1).padStart(2, "0")}`} {"//"} {hop.time}
        </span>
        <Icon className={`size-5 ${tone}`} aria-hidden />
      </div>
      <p className={`eyebrow mt-6 ${tone}`}>{hop.phase}</p>
      <p className={`mt-2 font-display text-lg leading-snug font-bold ${last ? "text-flame-soft" : ""}`}>
        “{hop.title}”
      </p>
      <p className="mt-3 flex-1 text-sm text-muted">{hop.caption}</p>
      <div className="mt-5">
        <Meter percent={hop.dopamine} index={last ? 1 : 0} className="h-1" />
        <p className="eyebrow mt-2 flex justify-between gap-2 text-dim">
          <span>Dopamine: {hop.dopamine}%</span>
          <span className={tone}>{hop.mind}</span>
        </p>
      </div>
    </li>
  );
}

export default function RabbitHolesPage() {
  const router = useRouter();
  const roast = useRoast();
  const [filter, setFilter] = useState<string | null>(null);

  if (roast === undefined) return <PageLoading />;
  if (!roast) return <EmptyState />;

  const { rabbit_holes, descent, poison, meta } = roast;
  const categories = Array.from(new Set(rabbit_holes.map((h) => h.category)));
  const shown = filter ? rabbit_holes.filter((h) => h.category === filter) : rabbit_holes;

  function startOver() {
    clearRoast();
    router.push("/");
  }

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(50%_80%_at_10%_0%,rgba(255,77,94,0.14),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="chip bg-flame/15 text-flame">Protocol // cringe_audit_v3</span>
          <span className="eyebrow flex items-center gap-1.5 text-amber">
            <TriangleAlert className="size-3.5" aria-hidden /> Shame telemetry active
          </span>
          <span className="eyebrow text-muted">· Audited object: you</span>
        </div>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="display text-5xl sm:text-6xl">
              The hall of <span className="text-flame">shame</span>: top {rabbit_holes.length} rabbit holes
            </h1>
            <p className="mt-4 text-muted">
              Mercilessly cataloged breakdown of your algorithmic spiral. We analyzed {num(meta.total_videos)}{" "}
              timestamps and concluded your dopamine receptors are held together by scotch tape.
            </p>
          </div>
          <dl className="card flex shrink-0 gap-8 bg-surface-2 px-6 py-4">
            <div>
              <dt className="eyebrow text-muted">Total time wasted</dt>
              <dd className="font-display text-3xl font-extrabold text-flame-soft">
                {num(meta.estimated_hours)} hrs
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Soul degradation</dt>
              <dd className="font-display text-3xl font-extrabold text-amber uppercase">
                {Math.round(poison.score * 10)}%
              </dd>
            </div>
          </dl>
        </div>

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filter rabbit holes"
          className="card mt-8 flex gap-1 overflow-x-auto bg-surface p-1.5 [scrollbar-width:none]"
        >
          {[null, ...categories].map((c) => {
            const active = filter === c;
            return (
              <button
                key={c ?? "all"}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c)}
                className={`eyebrow shrink-0 rounded-md px-4 py-2.5 whitespace-nowrap transition ${
                  active ? "bg-flame text-bg" : "text-fg/80 hover:bg-surface-2"
                }`}
              >
                {c ?? `All rabbit holes (${String(rabbit_holes.length).padStart(2, "0")})`}
              </button>
            );
          })}
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-2" aria-label="Rabbit holes">
          {shown.map((h) => (
            <RabbitHoleCard key={h.name} hole={h} rank={rabbit_holes.indexOf(h)} />
          ))}
        </section>

        {/* Path of descent */}
        {descent && descent.hops.length > 0 && (
          <section className="mt-20">
            <p className="eyebrow flex items-center gap-2 text-amber">
              <TrendingUp className="size-4" aria-hidden /> Reconstructed event log // {descent.session_label}
            </p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Path of descent: how you got cooked</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Visual forensic autopsy of your descent from legitimate research to terminal brainrot in just{" "}
              {descent.hops.length} algorithmic hops.
            </p>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {descent.hops.map((hop, i) => (
                <HopCard key={hop.time + hop.title} hop={hop} index={i} last={i === descent.hops.length - 1} />
              ))}
            </ol>
          </section>
        )}

        <div className="card mt-6 flex flex-col gap-4 bg-surface-2/50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-surface-2">
              <Brain className="size-5 text-flame-soft" aria-hidden />
            </span>
            <div>
              <p className="font-display text-lg font-bold">Simulate another descent</p>
              <p className="text-sm text-muted">Roast another file, or the same one at a crueler spice level.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={startOver}
            className="eyebrow flex items-center justify-center gap-2 rounded-lg bg-flame px-6 py-3.5 text-sm text-bg hover:brightness-110"
          >
            Run another autopsy <RotateCcw className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* Poison index */}
      <section className="mt-10 border-t border-line bg-bg-2">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow flex items-center gap-2 text-muted">
              <FlaskConical className="size-4" aria-hidden /> Bio-algorithmic diagnostic telemetry
            </p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">
              Algorithm poison index: <span className="text-flame">level {poison.score} / 10</span>
            </h2>
            <p className="mt-5 text-muted">{poison.blurb}</p>
            <ul className="mt-8 space-y-5">
              {poison.bars.map((b, i) => (
                <li key={b.label}>
                  <div className="eyebrow mb-2 flex justify-between gap-3">
                    <span>{b.label}</span>
                    <span className={i === 0 ? "text-amber" : i === 1 ? "text-flame" : "text-ember"}>
                      {b.percent}% ({b.note})
                    </span>
                  </div>
                  <Meter percent={b.percent} index={i} className="h-2" />
                </li>
              ))}
            </ul>
          </div>

          <div className="card relative overflow-hidden bg-[linear-gradient(150deg,#232329,#2a1d20)] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow flex items-center gap-2 text-flame-soft">
                <LifeBuoy className="size-4" aria-hidden /> Recovery protocol
              </p>
              <span className="chip bg-black/60 text-fg">Status: defeated</span>
            </div>
            <h3 className="display mt-6 text-3xl">Recommended course of action</h3>
            <p className="mt-3 text-muted">{poison.recovery}</p>
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={startOver}
                className="eyebrow flex w-full items-center justify-between gap-3 rounded-lg bg-black/50 px-5 py-4 text-left text-sm ring-1 ring-line hover:ring-fg/30"
              >
                <span className="flex items-center gap-3">
                  <Trash2 className="size-4 text-amber" aria-hidden /> Option A: purge this roast & start over
                </span>
                <span className="text-dim">[Coward way]</span>
              </button>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow flex w-full items-center justify-between gap-3 rounded-lg bg-flame px-5 py-4 text-sm text-bg hover:brightness-110"
              >
                <span className="flex items-center gap-3">
                  <HandMetal className="size-4" aria-hidden /> Option B: embrace the sludge
                </span>
                <span className="flex items-center gap-1">
                  [Remain cooked] <ArrowRight className="size-4" aria-hidden />
                </span>
              </a>
            </div>
            <p className="mt-5 text-xs text-flame-soft/50 italic">
              * Warning: Option B will auto-queue 6 hours of Japanese carpentry restoration at 2:00 AM tonight.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
