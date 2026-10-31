"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { useScrollLock } from "./hooks";

type Props = {
  images: SiteImage[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

const SWIPE_DISTANCE = 50;
const noopSubscribe = () => () => {};

export function Lightbox({ images, index, onChange, onClose }: Props) {
  const { t } = useLanguage();
  const g = t.gallery;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;
  // Portals need document.body, which only exists after hydration.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const total = images.length;

  useScrollLock(open);

  const go = useCallback(
    (step: number) => {
      if (index === null || total < 2) return;
      onChange((index + step + total) % total);
    },
    [index, total, onChange],
  );

  // Keyboard: Escape closes, arrows switch, Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("button")].filter(
          (el) => el.offsetParent !== null,
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  // Move focus into the dialog while open and give it back to the photo afterwards.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => previous?.focus({ preventScroll: true });
  }, [open]);

  if (!mounted || index === null || !images[index]) return null;
  const image = images[index];

  const arrow =
    "grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform duration-200 hover:scale-105 focus-light";

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={g.dialog}
      className="animate-fade-in fixed inset-0 z-[100] flex flex-col bg-[#231d30]/[0.97]"
      onTouchStart={(e) => {
        const touch = e.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;
        if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        else if (dy > SWIPE_DISTANCE * 2 && Math.abs(dy) > Math.abs(dx)) onClose();
      }}
    >
      <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2 text-white sm:px-6">
        <p className="text-sm font-bold tabular-nums" aria-live="polite">
          {g.counter(index + 1, total)}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={g.close}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus-light"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative min-h-0 flex-1"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div key={image.src} className="animate-pop-in pointer-events-none absolute inset-3 sm:inset-x-24 sm:inset-y-4">
          <Image
            src={image.src}
            alt={g.photoAlt(index + 1)}
            fill
            sizes="100vw"
            quality={85}
            className="object-contain"
            priority
          />
        </div>

        {total > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={g.prev} className={`${arrow} absolute top-1/2 left-5 hidden -translate-y-1/2 sm:grid`}>
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={g.next} className={`${arrow} absolute top-1/2 right-5 hidden -translate-y-1/2 sm:grid`}>
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* phone controls sit under the photo, within thumb reach */}
      {total > 1 && (
        <div className="flex justify-center gap-5 px-4 pt-2 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:hidden">
          <button type="button" onClick={() => go(-1)} aria-label={g.prev} className={arrow}>
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label={g.next} className={arrow}>
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* neighbours are fetched ahead so switching is instant */}
      {total > 1 && (
        <div className="hidden" aria-hidden="true">
          {[images[(index + 1) % total], images[(index - 1 + total) % total]].map((img) => (
            <Image key={img.src} src={img.src} alt="" width={img.width} height={img.height} sizes="100vw" quality={85} loading="eager" />
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}
