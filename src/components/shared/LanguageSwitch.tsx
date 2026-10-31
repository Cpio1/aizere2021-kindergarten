"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { LANGS } from "@/i18n/translations";
import { cn } from "./cn";

export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className={cn("flex rounded-full border border-line bg-white p-1", className)}
    >
      {LANGS.map((option) => {
        const active = option === lang;
        return (
          <button
            key={option}
            type="button"
            lang={option}
            aria-pressed={active}
            aria-label={t.langFull[option]}
            onClick={() => setLang(option)}
            className={cn(
              "min-h-9 min-w-12 rounded-full px-3 text-sm font-bold transition-colors duration-200",
              active ? "bg-violet text-white" : "text-ink-soft hover:bg-lilac hover:text-ink",
            )}
          >
            {t.langName[option]}
          </button>
        );
      })}
    </div>
  );
}
