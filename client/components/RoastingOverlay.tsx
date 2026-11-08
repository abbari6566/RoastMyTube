"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

const LINES = [
  "Counting your 3 AM decisions…",
  "Cross-referencing abandoned tutorials…",
  "Measuring lofi dependency…",
  "Calculating hours you'll never get back…",
  "Consulting the algorithm about you…",
  "Sharpening the jokes…",
];

export function RoastingOverlay() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % LINES.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 grid place-items-center bg-bg/95 px-4 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center text-center">
        <span className="relative grid size-24 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-flame/20" aria-hidden />
          <span className="grid size-20 place-items-center rounded-full bg-surface ring-2 ring-flame/60">
            <Flame className="size-10 text-flame animate-flicker" aria-hidden />
          </span>
        </span>
        <p className="display mt-8 text-3xl sm:text-4xl">Incinerating your record</p>
        <p className="eyebrow mt-4 text-amber">{LINES[i]}</p>
      </div>
    </div>
  );
}
