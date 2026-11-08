import Image from "next/image";
import { Play } from "lucide-react";

/** YouTube thumbnail from a video id, or a stylized placeholder (removed videos, mock data). */
export function Thumb({
  videoId,
  label,
  className = "",
  hue = 0,
}: {
  videoId: string | null;
  label?: string;
  className?: string;
  hue?: number;
}) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-well ${className}`}>
      {videoId ? (
        <Image
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt=""
          fill
          sizes="(min-width: 1024px) 240px, 50vw"
          className="object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 30% 20%, hsl(${hue} 85% 55% / 0.55), transparent 60%),
              radial-gradient(90% 80% at 85% 90%, hsl(${(hue + 40) % 360} 90% 50% / 0.4), transparent 60%),
              linear-gradient(160deg, #1d1d24, #0c0c0f)`,
          }}
        >
          <Play className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-fg/40" aria-hidden />
        </div>
      )}
      {label && (
        <span className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[10px] font-bold text-fg">
          {label}
        </span>
      )}
    </div>
  );
}
