"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { CallButton, MapCard, WhatsAppButton } from "../shared/Actions";
import { ContactList } from "../shared/ContactList";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";

export function MobileContacts() {
  const { t } = useLanguage();
  const c = t.contacts;

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="bg-white py-10">
      <div className="mx-auto max-w-2xl px-4">
        <Reveal>
          <SectionHeading id="contacts" eyebrow={c.eyebrow} title={c.title} text={c.text} size="sm" />
        </Reveal>
        <Reveal className="mt-5">
          <ContactList compact />
        </Reveal>
        <Reveal className="mt-5 grid gap-2.5 min-[520px]:grid-cols-2">
          <WhatsAppButton label={c.whatsapp} className="w-full" />
          <CallButton label={c.call} className="w-full" />
        </Reveal>
        <Reveal className="mt-6">
          <MapCard compact />
        </Reveal>
      </div>
    </section>
  );
}
