"use client";

import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";

/** Small flower-sun mark used in the logo and the favicon. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <g fill="#7856C8">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse key={deg} cx="24" cy="11" rx="7" ry="10" transform={`rotate(${deg} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="9" fill="#FFD968" />
      <circle cx="21" cy="23" r="1.4" fill="#302A40" />
      <circle cx="27" cy="23" r="1.4" fill="#302A40" />
      <path d="M20.5 26.5c2 2 5 2 7 0" stroke="#302A40" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, onClick, size = "md" }: { className?: string; onClick?: () => void; size?: "sm" | "md" }) {
  const { t } = useLanguage();
  const [word, year] = site.name.split(" ");
  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label={t.a11y.home}
      className={cn("group inline-flex min-h-11 shrink-0 items-center gap-2.5", className)}
    >
      <LogoMark
        className={cn(
          "shrink-0 transition-transform duration-500 group-hover:rotate-[30deg]",
          size === "sm" ? "h-9 w-9" : "h-11 w-11",
        )}
      />
      <span
        className={cn(
          "font-display leading-none font-extrabold whitespace-nowrap text-ink",
          size === "sm" ? "text-lg" : "text-[1.35rem]",
        )}
      >
        {word} <span className="text-violet">{year}</span>
      </span>
    </a>
  );
}
