"use client";

import { useEffect, useRef } from "react";
import { cn } from "./cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms, for staggering neighbours. */
  delay?: number;
  as?: "div" | "li" | "article";
};

/** Fades its content in once it scrolls into view (CSS transform + opacity, see globals.css). */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.classList.add("is-visible");
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
