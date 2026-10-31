"use client";

import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppButton } from "../shared/Actions";
import { cn } from "../shared/cn";
import { Pencil, toys } from "../shared/Decor";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

const tones = ["bg-lilac", "bg-sun-soft", "bg-mint"];

export function MobileGroups() {
  const { t } = useLanguage();
  const g = t.groups;

  return (
    <section id="groups" aria-labelledby="groups-title" className="relative overflow-hidden bg-white py-10">
      <Pencil className="pointer-events-none absolute top-8 -right-6 w-20 rotate-[-20deg] opacity-80" />
      <div className="relative mx-auto max-w-2xl px-4">
        <Reveal>
          <SectionHeading id="groups" eyebrow={g.eyebrow} title={g.title} text={g.text} size="sm" />
        </Reveal>
        <ul className="mt-5 grid grid-cols-3 gap-2.5">
          {Array.from({ length: site.groups }, (_, i) => {
            const Toy = toys[i % toys.length];
            return (
              <Reveal as="li" key={i} delay={i * 70} className={cn("arch-sm flex flex-col items-center px-2 pt-5 pb-4 text-center", tones[i % tones.length])}>
                <Toy className="h-11 w-auto" />
                <h3 className="mt-2.5 font-display text-[1rem] leading-tight font-extrabold text-ink">{g.card(i + 1)}</h3>
              </Reveal>
            );
          })}
        </ul>
        <Reveal className="mt-5">
          <p className="text-[0.93rem] font-semibold text-ink-soft">{g.note}</p>
          <WhatsAppButton label={g.cta} variant="primary" className="mt-3 w-full" />
        </Reveal>
      </div>
    </section>
  );
}
