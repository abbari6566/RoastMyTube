import { forwardRef } from "react";
import { num } from "@/lib/format";
import type { RoastResponse } from "@/lib/types";

export type ReceiptTheme = "neon" | "thermal" | "amber" | "y2k";
export type ReceiptFormat = "story" | "landscape";

export interface ReceiptOptions {
  showCringe: boolean;
  showLateNight: boolean;
  showItems: boolean;
  showStamp: boolean;
}

export const FORMAT_SIZE: Record<ReceiptFormat, { w: number; h: number; label: string; px: string }> = {
  story: { w: 540, h: 960, label: "Story / Reel", px: "1080 × 1920 (9:16)" },
  landscape: { w: 600, h: 338, label: "Landscape / X", px: "1200 × 676 (16:9)" },
};

interface Palette {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  accent2: string;
  line: string;
  pill: string;
  stamp: string;
}

export const THEMES: Record<ReceiptTheme, { name: string; blurb: string; dot: string; p: Palette }> = {
  neon: {
    name: "Neon Obsidian",
    blurb: "Charcoal matrix with laser crimson glows",
    dot: "#ff4d5e",
    p: { bg: "#0e0e11", fg: "#ececf1", muted: "#a3a3ae", accent: "#ff4d5e", accent2: "#f6bd3b", line: "#3a3a42", pill: "#1d1d22", stamp: "#c8102e" },
  },
  thermal: {
    name: "Thermal Paper",
    blurb: "Vintage supermarket faded register roll",
    dot: "#f4f1ea",
    p: { bg: "#f4f1ea", fg: "#1c1b19", muted: "#6b675f", accent: "#1c1b19", accent2: "#1c1b19", line: "#b9b3a7", pill: "#e6e1d6", stamp: "#c8102e" },
  },
  amber: {
    name: "Hazard Amber",
    blurb: "Industrial biohazard warning aesthetic",
    dot: "#f6bd3b",
    p: { bg: "#14110a", fg: "#f6e7c1", muted: "#b5a57e", accent: "#f6bd3b", accent2: "#ff7a1a", line: "#4a4026", pill: "#241e10", stamp: "#ff7a1a" },
  },
  y2k: {
    name: "Y2K Glitch",
    blurb: "Analog TV flicker and cyber artifacts",
    dot: "#ff7a1a",
    p: { bg: "#0b0e24", fg: "#d8f3ff", muted: "#8aa3c9", accent: "#ff3df2", accent2: "#33e1ff", line: "#2a3266", pill: "#141a3d", stamp: "#ff3df2" },
  },
};

function Barcode({ seed, color, height }: { seed: string; color: string; height: number }) {
  const bars = Array.from({ length: 42 }, (_, i) => {
    const c = seed.charCodeAt(i % seed.length) + i * 7;
    return { w: (c % 3) + 1, gap: ((c >> 2) % 2) + 1 };
  });
  return (
    <div className="flex items-stretch justify-center" style={{ height }} aria-hidden>
      {bars.map((b, i) => (
        <span key={i} style={{ width: b.w * 2, marginRight: b.gap * 2, background: color }} />
      ))}
    </div>
  );
}

function Stamp({ text, color, small }: { text: string; color: string; small?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute font-display font-black tracking-[0.15em] uppercase"
      style={{
        color,
        border: `3px solid ${color}`,
        opacity: 0.85,
        transform: "rotate(-14deg)",
        padding: small ? "4px 10px" : "4px 14px",
        fontSize: small ? 18 : 24,
        right: small ? 24 : 22,
        top: small ? 30 : 222,
        borderRadius: 6,
        mixBlendMode: "normal",
      }}
    >
      {text}
      <div style={{ fontSize: small ? 8 : 10, letterSpacing: "0.3em", textAlign: "center" }}>Certified shame</div>
    </div>
  );
}

export const ReceiptCard = forwardRef<
  HTMLDivElement,
  { roast: RoastResponse; theme: ReceiptTheme; format: ReceiptFormat; options: ReceiptOptions }
>(function ReceiptCard({ roast, theme, format, options }, ref) {
  const { p } = THEMES[theme];
  const size = FORMAT_SIZE[format];
  const { meta, receipt, stats } = roast;
  const when = new Date(meta.generated_at);
  const stampDate = Number.isNaN(when.getTime())
    ? meta.generated_at
    : `${when.toISOString().slice(0, 10)} // ${when.toTimeString().slice(0, 8)}`;
  const days = Math.floor(meta.estimated_hours / 24);
  const hours = Math.round(meta.estimated_hours % 24);
  const tax = Math.round(meta.estimated_hours * 7.25); // "minimum wage" of time lost — pure joke math

  const totals = [
    { label: "Subtotal watched", value: `${num(meta.estimated_hours)} hours`, show: true },
    { label: "Cringe surcharge", value: `${receipt.cringe_percent}%`, show: options.showCringe },
    { label: "After-midnight fee", value: `${Math.round(stats.late_night_share * 100)}%`, show: options.showLateNight },
    { label: "Dopamine deficit tax", value: `+$${num(tax)}.00`, show: true },
  ].filter((t) => t.show);

  const story = format === "story";
  const items = receipt.items.slice(0, story ? 5 : 3);

  const header = (
    <div className={story ? "text-center" : ""}>
      <p className={`flex items-center gap-2 font-display font-extrabold uppercase ${story ? "justify-center text-2xl" : "text-lg"}`}>
        <span className="inline-block size-3 rounded-full" style={{ background: p.accent }} />
        <span>
          Roast<span style={{ color: p.accent }}>My</span>Tube
        </span>
      </p>
      <p
        className={`mt-2 font-display text-xs font-bold uppercase ${story ? "tracking-[0.15em]" : "tracking-[0.06em]"}`}
        style={{ color: p.accent2 }}
      >
        Official atrophy receipt #{meta.report_id}
      </p>
      <div className="mt-2 text-[11px] leading-relaxed" style={{ color: p.muted }}>
        <p>DATE: {stampDate}</p>
        {story && <p>TERMINAL: GOOGLE_TAKEOUT_NODE</p>}
        <p>VIDEOS SCANNED: {num(meta.total_videos)}</p>
      </div>
      <p
        className={`mt-3 inline-block rounded px-3 py-1.5 font-display font-bold uppercase ${story ? "text-sm" : "text-xs"}`}
        style={{ background: p.pill, color: p.accent2 }}
      >
        Time wasted: {days} days, {hours} hours
      </p>
    </div>
  );

  const itemList = options.showItems && (
    <div>
      <div className="flex justify-between text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: p.muted }}>
        <span>Item / channel incident</span>
        <span>Cost</span>
      </div>
      <ul className={story ? "mt-3 space-y-3" : "mt-2 space-y-2"}>
        {items.map((it) => (
          <li key={it.title}>
            <div className="flex justify-between gap-3 text-[13px] font-bold">
              <span className="min-w-0 truncate">
                {it.qty}x {it.title}
              </span>
              <span style={{ color: p.accent }}>$0.00</span>
            </div>
            <div className="flex justify-between gap-3 text-[9px] uppercase" style={{ color: p.muted }}>
              <span className="truncate">{it.detail}</span>
              <span className="shrink-0">{it.tag}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const totalsBlock = (
    <div className="space-y-1.5">
      {totals.map((t, i) => (
        <div
          key={t.label}
          className={`flex justify-between uppercase ${story ? "text-sm" : "text-xs"}`}
          style={{ color: i % 2 ? p.accent2 : p.fg }}
        >
          <span>{t.label}:</span>
          <span className="font-bold">{t.value}</span>
        </div>
      ))}
    </div>
  );

  const rule = <div style={{ borderTop: `1px dashed ${p.line}` }} />;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden font-mono"
      style={{ width: size.w, height: size.h, background: p.bg, color: p.fg }}
    >
      {theme === "amber" && (
        <>
          <div className="absolute inset-x-0 top-0 h-2.5" style={{ background: "repeating-linear-gradient(45deg,#f6bd3b 0 12px,#14110a 12px 24px)" }} />
          <div className="absolute inset-x-0 bottom-0 h-2.5" style={{ background: "repeating-linear-gradient(45deg,#f6bd3b 0 12px,#14110a 12px 24px)" }} />
        </>
      )}
      {theme === "y2k" && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 3px)" }}
        />
      )}

      {story ? (
        <div className="flex h-full flex-col gap-5 px-9 py-10">
          {header}
          <div>
            <Barcode seed={meta.report_id} color={p.fg} height={56} />
            <p className="mt-1 text-center text-[10px]" style={{ color: p.muted }}>
              *{meta.report_id.replace(/\D/g, "").padEnd(12, "0")}*
            </p>
          </div>
          {rule}
          {itemList}
          {rule}
          {totalsBlock}
          {rule}
          <p className="text-center text-xs leading-relaxed italic" style={{ color: p.muted }}>
            “{roast.closer}”
          </p>
          <p className="mt-auto text-center text-[10px] tracking-[0.2em] uppercase" style={{ color: p.muted }}>
            No refunds · No returns · No dignity
            <br />
            roastmytube
          </p>
        </div>
      ) : (
        <div className="grid h-full grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-5 px-6 py-6">
          <div className="flex min-w-0 flex-col gap-3">
            {header}
            <Barcode seed={meta.report_id} color={p.fg} height={26} />
            <div className="mt-auto">{totalsBlock}</div>
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-3 pl-5" style={{ borderLeft: `1px dashed ${p.line}` }}>
            {itemList || (
              <p className="text-sm leading-relaxed italic" style={{ color: p.muted }}>
                “{roast.closer}”
              </p>
            )}
          </div>
        </div>
      )}

      {options.showStamp && <Stamp text={receipt.stamp} color={p.stamp} small={!story} />}
    </div>
  );
});
