"use client";

import { Flame, SlidersHorizontal } from "lucide-react";
import { SPICES, spiceProfile } from "@/lib/spice";
import type { Spice } from "@/lib/types";

const ACCENT = {
  muted: { title: "text-fg", badge: "bg-surface-2 text-muted", ring: "ring-fg/40" },
  ember: { title: "text-ember", badge: "bg-ember text-bg", ring: "ring-ember" },
  flame: { title: "text-flame", badge: "bg-flame text-bg", ring: "ring-flame" },
};

export function SpiceSelector({
  value,
  onChange,
  onSubmit,
  canSubmit,
}: {
  value: Spice;
  onChange: (s: Spice) => void;
  onSubmit: () => void;
  canSubmit: boolean;
}) {
  const selected = spiceProfile(value);

  return (
    <section className="border-y border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-flame">Configuration console</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Select your roast severity</h2>
          </div>
          <p className="max-w-md text-muted">
            Adjust the algorithmic malice level. Higher tiers deploy personal existential critiques against your
            late-night viewing habits.
          </p>
        </div>

        <div role="radiogroup" aria-label="Roast severity" className="mt-10 grid gap-5 md:grid-cols-3">
          {SPICES.map((s) => {
            const a = ACCENT[s.accent];
            const active = s.id === value;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange(s.id)}
                className={`card flex flex-col p-6 text-left transition ${
                  active ? `bg-surface-2 ring-2 ${a.ring}` : "hover:bg-surface-2/70"
                }`}
              >
                <span className="flex items-start justify-between">
                  <span className="text-4xl" aria-hidden>
                    {s.emoji}
                  </span>
                  <span className={`chip ${a.badge}`}>{s.level}</span>
                </span>
                <span className={`mt-6 font-display text-xl font-bold uppercase ${a.title}`}>{s.name}</span>
                <span className="mt-2 text-sm text-muted">{s.blurb}</span>
                <span className="mt-6 rounded-lg bg-well px-4 py-3 text-sm italic text-muted">{s.sample}</span>
              </button>
            );
          })}
        </div>

        <div className="card mt-6 flex flex-col gap-4 bg-well p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <p className="flex items-center gap-3 pl-1">
            <SlidersHorizontal className="size-5 text-ember" aria-hidden />
            Selected profile:{" "}
            <span className={`font-display font-bold uppercase ${ACCENT[selected.accent].title}`}>
              {selected.name}
            </span>
          </p>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            className="flex items-center justify-center gap-3 rounded-lg bg-flame px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-bg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Flame className="size-5" aria-hidden />
            Incinerate my record
          </button>
        </div>
        {!canSubmit && (
          <p className="mt-3 text-right text-sm text-dim">Drop your watch-history.json above to unlock the button.</p>
        )}
      </div>
    </section>
  );
}
