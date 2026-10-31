"use client";

import { Building2, Clock3, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { InstagramIcon } from "./BrandIcons";
import { cn } from "./cn";
import { ExternalLink } from "./ExternalLink";

/** Name, address, phone, hours and Instagram — the same facts in both layouts. */
export function ContactList({ compact }: { compact?: boolean }) {
  const { t, lang } = useLanguage();
  const c = t.contacts;
  const link = "underline decoration-violet/30 underline-offset-4 transition-colors hover:text-violet-deep hover:decoration-violet";
  const rows = [
    { label: c.name, Icon: Building2, tone: "bg-lilac text-violet-deep", value: site.legalName[lang] },
    { label: c.address, Icon: MapPin, tone: "bg-sun-soft text-[#8a6400]", value: site.address[lang] },
    {
      label: c.phone,
      Icon: Phone,
      tone: "bg-mint text-mint-deep",
      value: (
        <a href={site.phone.tel} className={cn(link, "whitespace-nowrap")}>
          {site.phone.display}
        </a>
      ),
    },
    { label: c.hours, Icon: Clock3, tone: "bg-lilac text-violet-deep", value: site.hours.display },
    {
      label: c.instagram,
      Icon: InstagramIcon,
      tone: "bg-sun-soft text-[#8a6400]",
      value: (
        <ExternalLink href={site.instagram.url} className={cn(link, "break-all")}>
          {site.instagram.handle}
        </ExternalLink>
      ),
    },
  ];

  return (
    <dl className={cn("grid", compact ? "gap-3.5" : "gap-4")}>
      {rows.map(({ label, Icon, tone, value }) => (
        <div key={label} className="flex items-start gap-3.5">
          <span className={cn("grid shrink-0 place-items-center rounded-full", compact ? "h-10 w-10" : "h-11 w-11", tone)}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 pt-0.5">
            <dt className="text-[0.82rem] font-bold text-ink-soft">{label}</dt>
            <dd className={cn("font-semibold text-ink", compact ? "text-[0.98rem] leading-snug" : "text-[1.05rem] leading-snug")}>{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
