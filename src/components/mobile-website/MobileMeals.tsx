"use client";

import { Info } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppButton } from "../shared/Actions";
import { foods, Sparkle } from "../shared/Decor";
import { Reveal } from "../shared/Reveal";

export function MobileMeals() {
  const { t } = useLanguage();
  const m = t.meals;

  return (
    <section id="meals" aria-labelledby="meals-title" className="py-10">
      <div className="mx-auto max-w-2xl px-4">
        <Reveal className="relative overflow-hidden rounded-[32px_32px_32px_96px] bg-violet px-5 pt-6 pb-7 text-white">
          <div className="dots pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[0.8rem] font-bold">
              <Sparkle className="h-3 w-3 text-sun" />
              {m.eyebrow}
            </p>

            <div className="mt-4 flex items-center gap-4">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-sun font-display text-[3.25rem] min-[420px]:h-24 min-[420px]:w-24 min-[420px]:text-[3.75rem] leading-none font-extrabold text-violet-deep" aria-hidden="true">
                {site.mealsPerDay}
              </span>
              <h2 id="meals-title" className="min-w-0 font-display text-[clamp(1.2rem,5.4vw,1.55rem)] leading-[1.15] font-extrabold text-balance hyphens-auto">
                {m.title}
              </h2>
            </div>

            <ul className="mt-5 flex justify-between gap-2" aria-hidden="true">
              {foods.map((Food, i) => (
                <li key={i} className="grid h-14 w-14 place-items-center rounded-full bg-white">
                  <Food className="h-9 w-9" />
                </li>
              ))}
            </ul>

            <p className="mt-5 text-[0.98rem] leading-relaxed text-white/90">{m.text}</p>
            <p className="mt-3 flex items-start gap-2.5 rounded-[18px] bg-white/12 px-4 py-3 text-[0.93rem] font-semibold">
              <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-sun" aria-hidden="true" />
              {m.menuNote}
            </p>
            <WhatsAppButton label={m.cta} variant="sun" className="mt-4 w-full focus-light" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
