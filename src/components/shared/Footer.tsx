"use client";

import { navIds, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "./cn";
import { Logo } from "./Logo";

/** Footer for both layouts: name, year and a short navigation. */
export function Footer({ compact }: { compact?: boolean }) {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className={cn("bg-lilac", compact ? "px-4 pt-8 pb-[calc(6rem+var(--safe-bottom))]" : "py-10")}>
      <div className={cn("mx-auto", compact ? "max-w-2xl" : "flex max-w-[1200px] items-center justify-between gap-8 px-8")}>
        <div>
          <Logo size={compact ? "sm" : "md"} />
          <p className="mt-2 text-sm font-semibold text-ink-soft">{site.legalName[lang]}</p>
        </div>
        <nav aria-label={t.footer.nav} className={compact ? "mt-5" : ""}>
          <ul className={cn("flex flex-wrap", compact ? "gap-x-1 gap-y-0" : "justify-end gap-x-1")}>
            {navIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-[0.93rem] font-bold text-ink-soft transition-colors hover:bg-white hover:text-violet-deep"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p suppressHydrationWarning className={cn("mx-auto text-sm text-ink-soft", compact ? "mt-4 max-w-2xl" : "mt-6 max-w-[1200px] px-8")}>
        © {year} «{site.name}». {t.footer.rights}
      </p>
    </footer>
  );
}
