"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { CallButton, MapCard, WhatsAppButton } from "../shared/Actions";
import { ContactList } from "../shared/ContactList";
import { Cloud, Star } from "../shared/Decor";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

export function Contacts() {
  const { t } = useLanguage();
  const c = t.contacts;

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative overflow-hidden bg-white py-[clamp(4rem,9vh,6.5rem)]">
      <Cloud className="pointer-events-none absolute right-[-40px] bottom-10 w-56 text-lilac-soft" />
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-[1fr_1fr] items-stretch gap-12 px-8">
        <Reveal>
          <SectionHeading id="contacts" eyebrow={c.eyebrow} title={c.title} text={c.text} />
          <div className="mt-8">
            <ContactList />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton label={c.whatsapp} />
            <CallButton label={c.call} />
          </div>
        </Reveal>
        <Reveal delay={120} className="relative min-h-[420px]">
          <MapCard className="h-full" />
          <Star className="pointer-events-none absolute -top-5 -left-5 w-12 text-sun" />
        </Reveal>
      </div>
    </section>
  );
}
