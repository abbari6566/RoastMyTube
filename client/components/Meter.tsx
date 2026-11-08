const COLORS = ["bg-amber", "bg-flame", "bg-ember"] as const;

export function Meter({ percent, index = 0, className = "h-1.5" }: { percent: number; index?: number; className?: string }) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-surface-2 ${className}`}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={p}
    >
      <div className={`h-full rounded-full ${COLORS[index % COLORS.length]}`} style={{ width: `${p}%` }} />
    </div>
  );
}
