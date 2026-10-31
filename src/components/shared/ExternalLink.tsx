"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> & { href: string };

/** Opens in a new tab and tells screen-reader users so. */
export function ExternalLink({ children, ...props }: Props) {
  const { t } = useLanguage();
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> {t.a11y.newTab}</span>
    </a>
  );
}
