"use client";

import { navIds, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { btn } from "../shared/Actions";
import { WhatsAppIcon } from "../shared/BrandIcons";
import { cn } from "../shared/cn";
import { ExternalLink } from "../shared/ExternalLink";
import { useActiveSection, useScrolled } from "../shared/hooks";
import { LanguageSwitch } from "../shared/LanguageSwitch";
import { Logo } from "../shared/Logo";

export function Header() {
  const { t } = useLanguage();
  const scrolled = useScrolled();
  const active = useActiveSection(".website-root");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background-color,box-shadow] duration-300",
        scrolled ? "bg-milk/95 shadow-[0_8px_30px_-18px_rgb(48_42_64/0.35)] backdrop-blur-md" : "bg-milk/70",
      )}
    >
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between gap-4 px-6 xl:px-8">
        <Logo className="max-xl:[&_svg]:h-9 max-xl:[&_svg]:w-9 max-xl:[&>span]:text-lg" />
        <nav aria-label={t.a11y.nav} className="min-w-0">
          <ul className="flex items-center">
            {navIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center rounded-full px-2 text-[0.88rem] font-bold whitespace-nowrap transition-colors xl:px-3 xl:text-[0.95rem]",
                    active === id ? "bg-lilac text-violet-deep" : "text-ink-soft hover:bg-lilac-soft hover:text-ink",
                  )}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitch />
          <ExternalLink
            href={site.whatsapp.url}
            aria-label={t.hero.whatsapp}
            className={cn(btn.base, btn.wa, "min-h-11 px-3 text-[0.95rem] xl:px-4")}
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            <span className="hidden xl:inline">WhatsApp</span>
          </ExternalLink>
        </div>
      </div>
    </header>
  );
}
