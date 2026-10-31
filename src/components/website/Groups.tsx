"use client";

import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppButton } from "../shared/Actions";
import { cn } from "../shared/cn";
import { Cloud, Pencil, Star, toys } from "../shared/Decor";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

const cardTones = [
  { card: "bg-lilac", number: "text-violet", shape: "arch" },
  { card: "bg-sun-soft", number: "text-[#c99a12]", shape: "rounded-[44px]" },
  { card: "bg-mint", number: "text-mint-deep", shape: "arch" },
];

export function Groups() {
  const { t } = useLanguage();
  const g = t.groups;

  return (
    <section id="groups" aria-labelledby="groups-title" className="relative overflow-hidden bg-white py-[clamp(4rem,9vh,6.5rem)]">
      <Cloud className="pointer-events-none absolute top-10 -left-10 w-48 text-lilac-soft" />
      <Pencil className="pointer-events-none absolute top-20 right-[7%] w-28 rotate-[-18deg]" />

      <div className="relative mx-auto max-w-[1200px] px-8">
        <Reveal>
          <SectionHeading id="groups" eyebrow={g.eyebrow} title={g.title} text={g.text} align="center" />
        </Reveal>

        <ul className="mx-auto mt-12 grid max-w-[980px] grid-cols-3 gap-8">
          {Array.from({ length: site.groups }, (_, i) => {
            const tone = cardTones[i % cardTones.length];
            const Toy = toys[i % toys.length];
            return (
              <Reveal
                as="li"
                key={i}
                delay={i * 100}
                className={cn(
                  "group relative flex flex-col items-center px-6 pt-10 pb-8 text-center transition-transform duration-300 hover:-translate-y-1.5",
                  tone.card,
                  tone.shape,
                )}
              >
                <Toy className="h-20 w-auto transition-transform duration-500 group-hover:rotate-[-6deg]" />
                <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">{g.card(i + 1)}</h3>
                <span className={cn("pointer-events-none absolute top-4 right-6 font-display text-5xl font-extrabold opacity-25", tone.number)} aria-hidden="true">
                  {i + 1}
                </span>
                <Star className="mt-3 w-6 text-white" />
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="max-w-lg font-semibold text-ink-soft">{g.note}</p>
          <WhatsAppButton label={g.cta} variant="primary" />
        </Reveal>
      </div>
    </section>
  );
}
