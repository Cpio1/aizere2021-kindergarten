"use client";

import { Baby, Languages, LayoutGrid, Soup } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { cn } from "../shared/cn";
import { Flower, Sparkle, Sun } from "../shared/Decor";
import { FramePhoto } from "../shared/Photo";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

export function About({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const a = t.about;
  const facts = [
    { ...a.facts.language, Icon: Languages, shape: "petal", tone: "bg-violet text-white" },
    { ...a.facts.ages, Icon: Baby, shape: "rounded-full", tone: "bg-sun text-ink" },
    { ...a.facts.groups, Icon: LayoutGrid, shape: "blob", tone: "bg-mint text-mint-deep" },
    { ...a.facts.meals, Icon: Soup, shape: "leaf", tone: "bg-lilac text-violet-deep" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-[clamp(4rem,9vh,6.5rem)]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[0.9fr_1.1fr] items-center gap-16 px-8">
        <Reveal className="relative mx-auto w-full max-w-[440px]">
          <div className="blob absolute -inset-5 bg-mint" aria-hidden="true" />
          <div className="relative aspect-[1/1.05] overflow-hidden rounded-[46%_54%_42%_58%/52%_44%_56%_48%] border-[6px] border-white bg-lilac shadow-[0_30px_60px_-34px_rgb(48_42_64/0.5)]">
            <FramePhoto image={image} alt={a.photoAlt} sizes="440px" />
          </div>
          <Sun className="animate-sway-slow absolute -top-6 -right-4 w-20 text-sun" />
          <Flower className="absolute -bottom-4 left-4 w-14 text-violet" />
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading id="about" eyebrow={a.eyebrow} title={a.title} />
            <div className="mt-5 space-y-3 text-[1.08rem] leading-relaxed text-pretty text-ink-soft">
              {a.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
            {facts.map(({ title, text, Icon, shape, tone }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="flex items-center gap-4">
                <span className={cn("grid h-16 w-16 shrink-0 place-items-center", shape, tone)}>
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-xl font-extrabold text-ink">{title}</span>
                  <span className="block font-semibold text-ink-soft">{text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
      <Sparkle className="pointer-events-none absolute top-16 right-[6%] w-7 text-sun" />
    </section>
  );
}
