"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navIds } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppButton } from "../shared/Actions";
import { cn } from "../shared/cn";
import { useActiveSection, useScrolled, useScrollLock } from "../shared/hooks";
import { LanguageSwitch } from "../shared/LanguageSwitch";
import { Logo } from "../shared/Logo";

export function MobileHeader() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(8);
  const active = useActiveSection(".mobile-root");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);

  // Escape closes the menu and returns focus to the toggle; focus moves into the panel on open.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative z-10 flex h-[var(--header-h)] items-center justify-between gap-2 px-4 transition-[background-color,box-shadow] duration-300",
          scrolled || open ? "bg-milk shadow-[0_6px_24px_-16px_rgb(48_42_64/0.4)]" : "bg-milk/85 backdrop-blur",
        )}
      >
        <Logo size="sm" onClick={close} />
        <div className="flex items-center gap-2">
          <LanguageSwitch className="max-[359px]:hidden" />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.menuClose : t.a11y.menuOpen}
            className="grid h-11 w-11 place-items-center rounded-full bg-violet text-white transition-colors hover:bg-violet-deep"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 top-[var(--header-h)] bg-ink/30 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] origin-top overflow-y-auto rounded-b-[28px] bg-milk px-4 pt-2 pb-5 shadow-[0_24px_40px_-24px_rgb(48_42_64/0.5)] transition-[opacity,transform] duration-300 ease-out",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <nav aria-label={t.a11y.nav}>
          <ul className="grid grid-cols-2 gap-2">
            {navIds.map((id) => (
              <li key={id} className={id === "home" ? "col-span-2" : undefined}>
                <a
                  href={`#${id}`}
                  onClick={close}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "flex min-h-12 items-center rounded-2xl px-4 text-[1rem] font-bold transition-colors",
                    active === id ? "bg-violet text-white" : "bg-lilac-soft text-ink hover:bg-lilac",
                  )}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitch className="mt-3 w-fit min-[360px]:hidden" />
        <WhatsAppButton label={t.hero.whatsapp} className="mt-3 w-full" />
      </div>
    </header>
  );
}
