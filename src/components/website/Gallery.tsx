"use client";

import { ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import { GALLERY_INITIAL, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { btn, GalleryGrid } from "../shared/Actions";
import { InstagramIcon } from "../shared/BrandIcons";
import { cn } from "../shared/cn";
import { Cloud, Flower } from "../shared/Decor";
import { ExternalLink } from "../shared/ExternalLink";
import { useGallery } from "../shared/hooks";
import { Lightbox } from "../shared/Lightbox";
import { PhotoPlaceholder } from "../shared/Photo";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

export function Gallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const g = t.gallery;
  const { expanded, toggle, active, setActive, close, sectionRef } = useGallery();
  const visible = expanded ? images.length : GALLERY_INITIAL.desktop;

  return (
    <section id="gallery" ref={sectionRef} aria-labelledby="gallery-title" className="relative bg-white py-[clamp(4rem,9vh,6.5rem)]">
      <div className="mx-auto max-w-[1200px] px-8">
        <Reveal className="flex items-end justify-between gap-8">
          <SectionHeading id="gallery" eyebrow={g.eyebrow} title={g.title} text={g.text} />
          <ExternalLink href={site.instagram.url} className={cn(btn.base, btn.ghost, "shrink-0")}>
            <InstagramIcon className="h-5 w-5" />
            {site.instagram.handle}
          </ExternalLink>
        </Reveal>

        {images.length ? (
          <>
            <Reveal className="mt-10">
              <GalleryGrid
                images={images}
                visible={visible}
                onOpen={setActive}
                columns="columns-3"
                sizes="(min-width: 1240px) 390px, 32vw"
              />
            </Reveal>
            {images.length > GALLERY_INITIAL.desktop && (
              <div className="mt-6 flex justify-center">
                <button type="button" onClick={toggle} aria-expanded={expanded} className={cn(btn.base, btn.primary)}>
                  {expanded ? g.less : g.more}
                  {expanded ? <ChevronUp className="h-5 w-5" aria-hidden="true" /> : <ChevronDown className="h-5 w-5" aria-hidden="true" />}
                </button>
              </div>
            )}
            <Lightbox images={images} index={active} onChange={setActive} onClose={close} />
          </>
        ) : (
          <Reveal className="mt-10 grid grid-cols-[1fr_1.3fr_1fr] items-center gap-6">
            <div className="aspect-[4/5] overflow-hidden arch">
              <PhotoPlaceholder />
            </div>
            <div className="relative flex flex-col items-center rounded-[40px] bg-lilac-soft px-10 py-12 text-center">
              <Cloud className="pointer-events-none absolute -top-6 left-8 w-24 text-lilac" />
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-violet">
                <ImageIcon className="h-8 w-8" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-ink">{g.empty}</h3>
              <p className="mt-2 text-ink-soft">{g.emptyText}</p>
              <ExternalLink href={site.instagram.url} className={cn(btn.base, btn.primary, "mt-6")}>
                <InstagramIcon className="h-5 w-5" />
                {g.instagram}
              </ExternalLink>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[48px]">
              <PhotoPlaceholder />
              <Flower className="pointer-events-none absolute top-6 left-6 w-12 text-sun" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
