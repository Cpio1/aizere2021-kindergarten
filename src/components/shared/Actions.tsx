"use client";

import Image from "next/image";
import { FolderOpen, Lock, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { WhatsAppIcon } from "./BrandIcons";
import { cn } from "./cn";
import { ExternalLink } from "./ExternalLink";
import { useScrolled } from "./hooks";

export const btn = {
  base: "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-base font-bold transition-[transform,background-color,box-shadow,color] duration-200 hover:-translate-y-0.5 active:translate-y-0",
  wa: "bg-wa text-white shadow-[0_10px_24px_-12px_rgb(31_157_85/0.8)] hover:bg-wa-deep",
  primary: "bg-violet text-white shadow-[0_10px_24px_-12px_rgb(120_86_200/0.9)] hover:bg-violet-deep",
  ghost: "border-2 border-violet/25 bg-white text-violet-deep hover:border-violet hover:bg-lilac-soft",
  sun: "bg-sun text-ink hover:bg-[#ffcf45]",
};

export function WhatsAppButton({ label, className, variant = "wa" }: { label: string; className?: string; variant?: "wa" | "primary" | "sun" }) {
  return (
    <ExternalLink href={site.whatsapp.url} className={cn(btn.base, btn[variant], className)}>
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      {label}
    </ExternalLink>
  );
}

export function CallButton({ label, className }: { label: string; className?: string }) {
  return (
    <a href={site.phone.tel} className={cn(btn.base, btn.ghost, className)}>
      <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
      {label}
    </a>
  );
}

/** One button for the documents folder: disabled until site.documentsUrl is filled in. */
export function DocumentsButton({ className }: { className?: string }) {
  const { t } = useLanguage();
  if (!site.documentsUrl) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={cn(btn.base, "cursor-not-allowed bg-[#ece8f2] text-[#6f6880] hover:translate-y-0", className)}
      >
        <Lock className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
        {t.documents.soon}
      </button>
    );
  }
  return (
    <ExternalLink href={site.documentsUrl} className={cn(btn.base, btn.primary, className)}>
      <FolderOpen className="h-5 w-5 shrink-0" aria-hidden="true" />
      {t.documents.open}
    </ExternalLink>
  );
}

/** Folder illustration for the documents section. */
export function FolderArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 80" className={className} aria-hidden="true" focusable="false">
      <path d="M8 18c0-4 3-7 7-7h20l8 8h38c4 0 7 3 7 7v40c0 4-3 7-7 7H15c-4 0-7-3-7-7Z" fill="#7856C8" />
      <rect x="20" y="20" width="50" height="34" rx="4" fill="#fff" transform="rotate(-6 45 37)" />
      <rect x="28" y="16" width="50" height="34" rx="4" fill="#FFFDF7" />
      <path d="M36 26h32M36 33h26M36 40h18" stroke="#B9A6E6" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 34c0-4 3-7 7-7h66c4 0 7 3 7 7v32c0 4-3 7-7 7H15c-4 0-7-3-7-7Z" fill="#9277D6" />
      <path d="M40 50h16" stroke="#FFD968" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 2GIS map when site.mapEmbedUrl is set; otherwise an address card (never an empty iframe).
 */
export function MapCard({ className, compact }: { className?: string; compact?: boolean }) {
  const { t, lang } = useLanguage();
  const c = t.contacts;

  if (site.mapEmbedUrl) {
    return (
      <div className={cn("overflow-hidden rounded-[28px] border border-line bg-white", className)}>
        <iframe
          src={site.mapEmbedUrl}
          title={c.mapFrame}
          loading="lazy"
          className={cn("block w-full", compact ? "h-64" : "h-full min-h-80")}
          referrerPolicy="no-referrer-when-downgrade"
        />
        {site.mapUrl && (
          <ExternalLink href={site.mapUrl} className="flex min-h-12 items-center justify-center gap-2 font-bold text-violet-deep hover:bg-lilac-soft">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            {c.mapOpen}
          </ExternalLink>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "dots relative flex flex-col justify-center overflow-hidden rounded-[28px] bg-lilac",
        compact ? "p-5" : "p-8",
        className,
      )}
    >
      {/* stylised streets — an illustration, not a map */}
      <svg viewBox="0 0 400 260" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-20 190C80 150 140 200 220 160S360 90 420 110" stroke="#fff" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path d="M120 -20C140 60 110 140 150 280" stroke="#fff" strokeWidth="16" fill="none" opacity=".8" />
        <path d="M300 -20C280 80 320 160 290 280" stroke="#fff" strokeWidth="12" fill="none" opacity=".6" />
        <circle cx="330" cy="200" r="34" fill="#DDF1E5" />
        <circle cx="60" cy="60" r="26" fill="#DDF1E5" />
      </svg>
      <div className="relative mx-auto flex max-w-sm flex-col items-center text-center">
        <span className="animate-sway-soft grid h-14 w-14 place-items-center rounded-full bg-violet text-white shadow-[0_12px_24px_-12px_rgb(120_86_200)]">
          <MapPin className="h-7 w-7" aria-hidden="true" />
        </span>
        <p className={cn("mt-4 font-display font-extrabold text-ink", compact ? "text-lg" : "text-xl")}>{c.mapTitle}</p>
        <p className="mt-2 rounded-2xl bg-white/90 px-4 py-3 text-[0.95rem] leading-snug font-semibold text-ink">
          {site.address[lang]}
        </p>
        <p className="mt-3 text-sm font-semibold text-ink-soft">{c.mapSoon}</p>
      </div>
    </div>
  );
}

/** Masonry of gallery photos at their natural proportions — nothing is cropped. */
export function GalleryGrid({
  images,
  visible,
  onOpen,
  columns,
  sizes,
}: {
  images: SiteImage[];
  visible: number;
  onOpen: (index: number) => void;
  columns: string;
  sizes: string;
}) {
  const { t } = useLanguage();
  return (
    <ul className={cn("gap-3", columns)}>
      {images.slice(0, visible).map((image, i) => (
        <li key={image.src} className="animate-fade-in mb-3 break-inside-avoid">
          <button
            type="button"
            onClick={() => onOpen(i)}
            aria-label={t.gallery.open(i + 1)}
            className="group block w-full overflow-hidden rounded-[22px] bg-lilac"
          >
            <Image
              src={image.src}
              alt={t.gallery.photoAlt(i + 1)}
              width={image.width}
              height={image.height}
              sizes={sizes}
              quality={78}
              loading="lazy"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

/** Floating WhatsApp button; keeps clear of the phone's home indicator. */
export function FloatingWhatsApp({ className }: { className?: string }) {
  const { t } = useLanguage();
  // hidden on the first screen, where the hero already has a WhatsApp button
  const shown = useScrolled(480);
  return (
    <ExternalLink
      href={site.whatsapp.url}
      aria-label={t.a11y.whatsappFloat}
      tabIndex={shown ? undefined : -1}
      aria-hidden={shown ? undefined : true}
      className={cn(
        "fixed z-40 grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-[0_14px_30px_-10px_rgb(31_157_85/0.9)] transition-[transform,opacity] duration-300 hover:scale-105 hover:bg-wa-deep",
        shown ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </ExternalLink>
  );
}
