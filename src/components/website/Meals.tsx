"use client";

import { Info } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppButton } from "../shared/Actions";
import { Blob, foods, Sparkle, Star } from "../shared/Decor";
import { Reveal } from "../shared/Reveal";

// positions of the food illustrations around the big "4"
const orbit = ["top-2 left-6", "top-0 right-8", "bottom-4 right-2", "bottom-2 left-2"];

export function Meals() {
  const { t } = useLanguage();
  const m = t.meals;

  return (
    <section id="meals" aria-labelledby="meals-title" className="py-[clamp(4rem,9vh,6.5rem)]">
      <div className="mx-auto max-w-[1200px] px-8">
        <Reveal className="relative overflow-hidden rounded-[56px_56px_56px_160px] bg-violet px-14 py-12 text-white">
          <div className="dots pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <Sparkle className="pointer-events-none absolute top-8 right-[40%] w-6 text-sun" />
          <Star className="pointer-events-none absolute bottom-10 right-10 w-10 text-white/15" />

          <div className="relative grid grid-cols-[380px_1fr] items-center gap-14">
            <div className="relative mx-auto h-[300px] w-[340px]" aria-hidden="true">
              <Blob className="absolute inset-6 text-white/12" />
              <div className="absolute inset-[60px] grid place-items-center rounded-full bg-sun shadow-[0_20px_40px_-20px_rgb(0_0_0/0.4)]">
                <span className="font-display text-[8.5rem] leading-none font-extrabold text-violet-deep">{site.mealsPerDay}</span>
              </div>
              {foods.map((Food, i) => (
                <span key={i} className={`animate-sway absolute grid h-[72px] w-[72px] place-items-center rounded-full bg-white shadow-lg ${orbit[i]}`} style={{ animationDelay: `${-i * 1.6}s` }}>
                  <Food className="h-11 w-11" />
                </span>
              ))}
            </div>

            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-bold text-white">
                <Sparkle className="h-3.5 w-3.5 text-sun" />
                {m.eyebrow}
              </p>
              <h2 id="meals-title" className="mt-3 font-display text-[clamp(2rem,2.6vw,2.6rem)] leading-[1.12] font-extrabold text-balance">
                {m.title}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">{m.text}</p>
              <p className="mt-5 flex max-w-xl items-start gap-3 rounded-[22px] bg-white/12 px-5 py-4 font-semibold">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-sun" aria-hidden="true" />
                {m.menuNote}
              </p>
              <WhatsAppButton label={m.cta} variant="sun" className="mt-6 focus-light" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
