"use client";

import { ArrowDown, CalendarHeart, Clock3, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { btn, WhatsAppButton } from "../shared/Actions";
import { cn } from "../shared/cn";
import { Cloud, Flower, Sparkle, Squiggle, Star } from "../shared/Decor";
import { FramePhoto, isLandscape } from "../shared/Photo";

export function Hero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const h = t.hero;
  const chips = [
    { ...h.chips.ages, Icon: CalendarHeart, tone: "bg-sun-soft text-[#8a6400]" },
    { ...h.chips.groups, Icon: Users, tone: "bg-lilac text-violet-deep" },
    { ...h.chips.hours, Icon: Clock3, tone: "bg-mint text-mint-deep" },
  ];

  return (
    <section id="home" aria-labelledby="home-title" className="relative overflow-hidden pt-[var(--header-h)]">
      {/* soft background shapes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="blob absolute -top-24 right-[-8%] h-[560px] w-[620px] bg-lilac/70" />
        <div className="absolute bottom-[-120px] left-[-80px] h-[300px] w-[300px] rounded-full bg-sun-soft/70" />
        <Cloud className="animate-sway-slow absolute top-[18%] left-[44%] w-24 text-lilac" />
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-[1.08fr_0.92fr] items-center gap-12 px-8 py-[clamp(2rem,5vh,4rem)]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-violet-deep shadow-[0_6px_20px_-12px_rgb(120_86_200/0.6)]">
            <Sparkle className="h-4 w-4 text-sun" />
            {h.eyebrow}
          </p>
          <h1
            id="home-title"
            className="mt-5 font-display text-[clamp(2.5rem,3.7vw,3.7rem)] leading-[1.07] font-extrabold text-balance text-ink"
          >
            {h.title}
          </h1>
          <Squiggle className="mt-4 w-28 text-sun" />
          <p className="mt-4 max-w-[34rem] text-[1.1rem] leading-relaxed text-pretty text-ink-soft">{h.text}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppButton label={h.whatsapp} />
            <a href="#about" className={cn(btn.base, btn.ghost)}>
              {h.about}
              <ArrowDown className="h-4.5 w-4.5" aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            {chips.map(({ value, label, Icon, tone }) => (
              <li key={label} className="flex items-center gap-3 rounded-[20px] border border-line bg-white py-2.5 pr-5 pl-2.5">
                <span className={cn("grid h-10 w-10 place-items-center rounded-full", tone)}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="leading-tight">
                  <span className="block font-display text-[1.05rem] font-extrabold text-ink">{value}</span>
                  <span className="block text-[0.82rem] font-semibold text-ink-soft">{label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={cn(
            "relative mx-auto w-full",
            isLandscape(image) ? "max-w-[460px]" : "max-w-[min(460px,calc(min(64vh,580px)*0.8))]",
          )}
        >
          <div className="absolute inset-0 translate-x-5 translate-y-5 arch bg-sun" aria-hidden="true" />
          <div className={cn("relative w-full overflow-hidden arch", isLandscape(image) ? "aspect-[4/3]" : "aspect-[4/5]", "border-[6px] border-white bg-lilac shadow-[0_30px_60px_-30px_rgb(48_42_64/0.45)]")}>
            <FramePhoto image={image} alt={h.photoAlt} sizes="(min-width: 1024px) 460px, 100vw" priority />
          </div>
          <Star className="animate-sway absolute -top-3 -left-6 w-14 text-sun" />
          <Flower className="animate-sway-slow absolute bottom-10 -left-10 w-16 text-violet" />
          <Sparkle className="animate-sway absolute top-16 -right-6 w-8 text-violet" style={{ animationDelay: "-2s" }} />
          <Cloud className="absolute -right-10 bottom-[-18px] w-32 text-white drop-shadow-[0_8px_16px_rgb(48_42_64/0.12)]" />
        </div>
      </div>
    </section>
  );
}
