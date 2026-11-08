"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AtSign } from "lucide-react";
import { Ticker } from "@/components/Ticker";
import { UploadCard } from "@/components/upload/UploadCard";
import { SpiceSelector } from "@/components/upload/SpiceSelector";
import { HowToExport } from "@/components/upload/HowToExport";
import { RoastingOverlay } from "@/components/RoastingOverlay";
import { checkFile, requestRoast, RoastError, sampleRoast } from "@/lib/api";
import { setRoast, setSpice, useSpice } from "@/lib/roast-store";
import type { RoastResponse } from "@/lib/types";

const HERO_STATS = [
  { value: "0 bytes", label: "Data stored on our servers", tone: "text-flame" },
  { value: "3 levels", label: "Of algorithmic malice", tone: "text-amber" },
  { value: "100%", label: "Judgment guaranteed", tone: "text-ember" },
];

export default function UploadPage() {
  const router = useRouter();
  const spice = useSpice();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [roasting, setRoasting] = useState(false);

  function handleFile(f: File) {
    const problem = checkFile(f);
    setError(problem?.message ?? null);
    setFile(problem ? null : f);
  }

  async function run(job: () => Promise<RoastResponse>) {
    setError(null);
    setRoasting(true);
    try {
      setRoast(await job());
      router.push("/dashboard");
    } catch (e) {
      setError(e instanceof RoastError ? e.message : "Something broke while roasting you. Try again.");
      setRoasting(false);
    }
  }

  return (
    <>
      {roasting && <RoastingOverlay />}
      <Ticker />

      <section className="relative">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,rgba(255,77,94,0.12),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:py-20">
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              <span className="chip bg-flame/15 text-flame">Protocol: algorithmic humiliation v3.8</span>
              <span className="chip bg-amber/10 text-amber">Zero mercies logged</span>
            </div>
            <h1 className="display mt-6 text-5xl sm:text-6xl xl:text-7xl">
              We read your
              <br />
              <span className="text-flame">watch history</span>
              <br />
              so you can feel ashamed.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Upload your YouTube Takeout archive. Our clinically unhinged AI dissects your 3 AM dopamine benders,
              half-baked self-improvement obsessions, and the 4-hour video essay on a defunct theme park you swore
              you&apos;d finish.
            </p>

            <dl className="card mt-8 grid grid-cols-1 gap-5 p-5 sm:grid-cols-3 sm:p-6">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-1">
                  <dt className="eyebrow text-muted">{s.label}</dt>
                  <dd className={`font-display text-3xl font-extrabold ${s.tone}`}>{s.value}</dd>
                </div>
              ))}
            </dl>

            <figure className="card relative mt-6 overflow-hidden p-6">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_100%_100%,rgba(255,77,94,0.12),transparent)]"
                aria-hidden
              />
              <figcaption className="relative flex items-center justify-between gap-3">
                <span className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-surface-2">
                    <AtSign className="size-5 text-flame-soft" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-mono text-sm font-bold">Example victim</span>
                    <span className="block font-mono text-xs text-dim">Roasted at spicy level</span>
                  </span>
                </span>
                <span className="chip bg-flame text-bg">Cringe index: 96%</span>
              </figcaption>
              <blockquote className="relative mt-4 italic leading-relaxed text-fg/90">
                “You spent 48 hours watching YouTube restorations of rusted 1940s pliers, yet the kitchen sink in your
                rented studio has had a steady leak since March. The algorithm knows you&apos;re a fraud.”
              </blockquote>
            </figure>
          </div>

          <UploadCard
            file={file}
            error={error}
            onFile={handleFile}
            onClear={() => {
              setFile(null);
              setError(null);
            }}
            onSample={() => run(() => sampleRoast(spice))}
          />
        </div>
      </section>

      <SpiceSelector
        value={spice}
        onChange={setSpice}
        canSubmit={!!file && !roasting}
        onSubmit={() => file && run(() => requestRoast(file, spice))}
      />

      <HowToExport />
    </>
  );
}
