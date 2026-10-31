"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navIds, type NavId } from "@/config/site";

/** True once the page has scrolled past `offset` pixels (rAF-throttled). */
export function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > offset));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [offset]);

  return scrolled;
}

/**
 * Highlights the nav item of the section in the middle of the viewport.
 * `scope` is the layout root: both layouts use the same ids, so lookups stay inside the visible one.
 */
export function useActiveSection(scope: string) {
  const [active, setActive] = useState<NavId>("home");

  useEffect(() => {
    const root = document.querySelector(scope);
    if (!root) return;
    const sections = navIds
      .map((id) => root.querySelector<HTMLElement>(`#${id}`))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id as NavId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [scope]);

  return active;
}

/** Locks page scroll while `locked` is true, without a layout shift from the disappearing scrollbar. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const prev = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    return () => {
      root.style.overflow = prev.overflow;
      root.style.paddingRight = prev.paddingRight;
    };
  }, [locked]);
}

/** State shared by both galleries: "show more" and the photo open in the lightbox. */
export function useGallery() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setActive(null), []);

  const toggle = () => {
    // collapsing from deep inside the gallery: bring its start back on screen
    if (expanded && (sectionRef.current?.getBoundingClientRect().top ?? 0) < 0) {
      sectionRef.current?.scrollIntoView({ block: "start" });
    }
    setExpanded(!expanded);
  };

  return { expanded, toggle, active, setActive, close, sectionRef };
}
