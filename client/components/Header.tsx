"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRoast, useSpice } from "@/lib/roast-store";
import { spiceProfile } from "@/lib/spice";
import { Logo } from "./Logo";

const TABS = [
  { href: "/", label: "Upload & Roast", short: "Upload", needsRoast: false },
  { href: "/dashboard", label: "Roast Dashboard", short: "Dashboard", needsRoast: true },
  { href: "/rabbit-holes", label: "Channel Rabbit Holes", short: "Rabbit holes", needsRoast: true },
  { href: "/receipt", label: "Roast Receipt", short: "Receipt", needsRoast: true },
];

export function Header() {
  const pathname = usePathname();
  const roast = useRoast();
  const spice = useSpice();
  const profile = spiceProfile(roast?.meta.spice ?? spice);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 px-4 sm:px-6 md:flex-nowrap">
        <Link href="/" className="shrink-0 py-3" aria-label="RoastMyTube home">
          <Logo />
        </Link>

        <span className="chip hidden shrink-0 border border-line bg-surface text-amber 2xl:inline-flex">
          <span className="size-2 rounded-full bg-ember animate-flicker" aria-hidden />
          0 files stored. Ever.
        </span>

        <nav
          aria-label="Roast steps"
          className="-mx-4 -mb-px flex w-[calc(100%+2rem)] min-w-0 overflow-x-auto border-t border-line px-1 [scrollbar-width:none] md:order-none md:mx-0 md:ml-auto md:w-auto md:border-t-0 md:px-0"
        >
          {TABS.map((tab, i) => {
            const active = pathname === tab.href;
            const locked = tab.needsRoast && !roast;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`eyebrow shrink-0 whitespace-nowrap border-b-2 px-3 py-3.5 transition-colors md:py-5 ${
                  active
                    ? "border-flame bg-surface text-fg"
                    : `border-transparent hover:text-fg ${locked ? "text-dim" : "text-muted"}`
                }`}
              >
                {i + 1}. <span className="xl:hidden">{tab.short}</span>
                <span className="hidden xl:inline">{tab.label}</span>
              </Link>
            );
          })}
        </nav>

        <span className="chip hidden shrink-0 border border-amber/30 text-amber lg:inline-flex">
          Roast mode: {profile.pill} <span aria-hidden>{profile.emoji}</span>
        </span>
      </div>
    </header>
  );
}
