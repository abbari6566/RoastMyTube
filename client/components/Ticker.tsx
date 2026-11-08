const ROASTS = [
  "You watched 73 hours of Blender donut tutorials and still can't render a sphere without crashing.",
  "14 deep-dives into 1990s Japanese synthesizer history won't fix your sleep cycle.",
  "Rewatching 8-hour lofi beats to 'focus' is just napping with extra steps.",
  "You subscribed to 6 meal-prep channels. Your fridge contains one lime.",
  "Three separate 'How to stop watching YouTube' videos. In one night.",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={hidden || undefined}>
      {ROASTS.map((r, i) => (
        <span key={i} className="flex items-center gap-3 whitespace-nowrap text-sm">
          <span className={`chip ${i % 2 ? "bg-ember text-bg" : "bg-flame text-bg"}`}>Sample roast</span>
          <em className={i % 3 === 2 ? "text-amber" : "text-fg/90"}>“{r}”</em>
          <span className="text-dim" aria-hidden>
            {"///"}
          </span>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="overflow-hidden border-b border-line bg-bg-2 py-2.5">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
