"use client";

import { ArrowDown, CalendarHeart, Clock3, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { btn, WhatsAppButton } from "../shared/Actions";
import { cn } from "../shared/cn";
import { Sparkle, Star } from "../shared/Decor";
import { FramePhoto } from "../shared/Photo";

export function MobileHero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const h = t.hero;
  const chips = [
    { ...h.chips.ages, Icon: CalendarHeart, tone: "bg-sun-soft text-[#8a6400]" },
    { ...h.chips.groups, Icon: Users, tone: "bg-lilac text-violet-deep" },
    { ...h.chips.hours, Icon: Clock3, tone: "bg-mint text-mint-deep" },
  ];

  return (
    <section id="home" aria-labelledby="home-title" className="relative overflow-hidden pt-[var(--header-h)]">
      <div className="blob pointer-events-none absolute -top-16 -right-24 h-72 w-80 bg-lilac/70" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl px-4 pt-5 pb-10">
        <div className="relative mx-auto w-[min(78%,330px)]">
          <div className="absolute inset-0 translate-x-3 translate-y-3 arch bg-sun" aria-hidden="true" />
          <div className="relative aspect-[5/6] overflow-hidden arch border-4 border-white bg-lilac shadow-[0_20px_40px_-24px_rgb(48_42_64/0.5)]">
            <FramePhoto image={image} alt={h.photoAlt} sizes="(max-width: 430px) 78vw, 330px" priority />
          </div>
          <Star className="animate-sway-soft pointer-events-none absolute -top-2 -left-4 w-9 text-sun" />
          <Sparkle className="pointer-events-none absolute top-10 -right-4 w-5 text-violet" />
        </div>

        <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.8rem] font-bold text-violet-deep shadow-[0_4px_14px_-8px_rgb(120_86_200/0.6)]">
          <Sparkle className="h-3 w-3 text-sun" />
          {h.eyebrow}
        </p>
        <h1 id="home-title" className="mt-3 font-display text-[clamp(1.75rem,7.6vw,2.4rem)] leading-[1.12] font-extrabold text-balance text-ink">
          {h.title}
        </h1>
        <p className="mt-3 text-[1rem] leading-relaxed text-pretty text-ink-soft">{h.text}</p>

        <div className="mt-5 grid gap-2.5 min-[520px]:grid-cols-2">
          <WhatsAppButton label={h.whatsapp} className="w-full" />
          <a href="#about" className={cn(btn.base, btn.ghost, "w-full")}>
            {h.about}
            <ArrowDown className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-5 grid grid-cols-3 gap-2">
          {chips.map(({ value, label, Icon, tone }) => (
            <li key={label} className="flex flex-col items-center rounded-[18px] border border-line bg-white px-1.5 py-2.5 text-center">
              <span className={cn("grid h-8 w-8 place-items-center rounded-full", tone)}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="mt-1.5 font-display text-[0.9rem] leading-tight font-extrabold whitespace-nowrap text-ink max-[374px]:text-[0.8rem]">
                {value}
              </span>
              <span className="mt-0.5 text-[0.72rem] leading-tight font-semibold text-ink-soft">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
