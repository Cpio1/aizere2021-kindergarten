"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DocumentsButton, FolderArt } from "../shared/Actions";
import { Reveal } from "../shared/Reveal";

export function MobileDocuments() {
  const { t } = useLanguage();
  const d = t.documents;

  return (
    <section id="documents" aria-labelledby="documents-title" className="py-8">
      <div className="mx-auto max-w-2xl px-4">
        <Reveal className="rounded-[28px] border-2 border-dashed border-violet/25 bg-sun-soft p-5">
          <div className="flex items-center gap-3.5">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white">
              <FolderArt className="w-11" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.8rem] font-bold text-violet-deep">{d.eyebrow}</p>
              <h2 id="documents-title" className="font-display text-[1.25rem] leading-tight font-extrabold text-ink">
                {d.title}
              </h2>
            </div>
          </div>
          <p className="mt-3 text-[0.95rem] text-ink-soft">{d.text}</p>
          <DocumentsButton className="mt-4 w-full" />
        </Reveal>
      </div>
    </section>
  );
}
