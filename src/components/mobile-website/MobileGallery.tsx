"use client";

import { ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import { GALLERY_INITIAL, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { btn, GalleryGrid } from "../shared/Actions";
import { InstagramIcon } from "../shared/BrandIcons";
import { cn } from "../shared/cn";
import { ExternalLink } from "../shared/ExternalLink";
import { useGallery } from "../shared/hooks";
import { Lightbox } from "../shared/Lightbox";
import { PhotoPlaceholder } from "../shared/Photo";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

export function MobileGallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const g = t.gallery;
  const { expanded, toggle, active, setActive, close, sectionRef } = useGallery();
  const visible = expanded ? images.length : GALLERY_INITIAL.mobile;

  return (
    <section id="gallery" ref={sectionRef} aria-labelledby="gallery-title" className="bg-white py-10">
      <div className="mx-auto max-w-2xl px-4">
        <Reveal>
          <SectionHeading id="gallery" eyebrow={g.eyebrow} title={g.title} text={g.text} size="sm" />
        </Reveal>

        {images.length ? (
          <>
            <div className="mt-5">
              <GalleryGrid images={images} visible={visible} onOpen={setActive} columns="columns-2" sizes="(max-width: 672px) 46vw, 320px" />
            </div>
            {images.length > GALLERY_INITIAL.mobile && (
              <button type="button" onClick={toggle} aria-expanded={expanded} className={cn(btn.base, btn.primary, "mt-2 w-full")}>
                {expanded ? g.less : g.more}
                {expanded ? <ChevronUp className="h-5 w-5" aria-hidden="true" /> : <ChevronDown className="h-5 w-5" aria-hidden="true" />}
              </button>
            )}
            <Lightbox images={images} index={active} onChange={setActive} onClose={close} />
          </>
        ) : (
          <Reveal className="relative mt-5 overflow-hidden rounded-[28px] bg-lilac-soft">
            <div className="h-36">
              <PhotoPlaceholder />
            </div>
            <div className="flex flex-col items-center px-5 pt-5 pb-6 text-center">
              <span className="-mt-12 grid h-14 w-14 place-items-center rounded-full bg-white text-violet shadow">
                <ImageIcon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-display text-lg font-extrabold text-ink">{g.empty}</h3>
              <p className="mt-1.5 text-[0.93rem] text-ink-soft">{g.emptyText}</p>
            </div>
          </Reveal>
        )}

        <ExternalLink href={site.instagram.url} className={cn(btn.base, btn.ghost, "mt-3 w-full")}>
          <InstagramIcon className="h-5 w-5" />
          {site.instagram.handle}
        </ExternalLink>
      </div>
    </section>
  );
}
