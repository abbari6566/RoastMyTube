import { Flame } from "lucide-react";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold tracking-tight uppercase ${className}`}>
      Roast<span className="text-flame">My</span>Tube
    </span>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-lg bg-flame/15 ring-1 ring-flame/40">
        <Flame className="size-5 text-flame" aria-hidden />
      </span>
      <Wordmark className="text-lg" />
    </span>
  );
}
