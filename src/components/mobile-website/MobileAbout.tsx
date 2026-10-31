"use client";

import { Baby, Languages, LayoutGrid, Soup } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { cn } from "../shared/cn";
import { Flower } from "../shared/Decor";
import { FramePhoto } from "../shared/Photo";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

export function MobileAbout({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const a = t.about;
  const facts = [
    { ...a.facts.language, Icon: Languages, tone: "bg-violet text-white", shape: "petal" },
    { ...a.facts.ages, Icon: Baby, tone: "bg-sun text-ink", shape: "rounded-full" },
    { ...a.facts.groups, Icon: LayoutGrid, tone: "bg-mint text-mint-deep", shape: "blob" },
    { ...a.facts.meals, Icon: Soup, tone: "bg-lilac text-violet-deep", shape: "leaf" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="py-10">
      <div className="mx-auto max-w-2xl px-4">
        <Reveal>
          <SectionHeading id="about" eyebrow={a.eyebrow} title={a.title} size="sm" />
        </Reveal>
        <Reveal className="relative mt-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[36px_120px_36px_36px] sm:aspect-[16/9] bg-lilac">
            <FramePhoto image={image} alt={a.photoAlt} sizes="(max-width: 672px) 92vw, 640px" />
          </div>
          <Flower className="pointer-events-none absolute -bottom-3 -left-1 w-10 text-violet" />
        </Reveal>
        <Reveal className="mt-5 space-y-2.5 text-[0.98rem] leading-relaxed text-pretty text-ink-soft">
          {a.text.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <ul className="mt-5 grid grid-cols-2 gap-2.5">
          {facts.map(({ title, text, Icon, tone, shape }, i) => (
            <Reveal as="li" key={title} delay={i * 60} className="flex items-center gap-2.5 rounded-[20px] bg-white p-2.5 shadow-[0_0_0_1px_#e6dff2]">
              <span className={cn("grid h-10 w-10 shrink-0 place-items-center", tone, shape)}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block font-display text-[0.95rem] font-extrabold text-ink">{title}</span>
                <span className="block text-[0.78rem] font-semibold text-ink-soft">{text}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
