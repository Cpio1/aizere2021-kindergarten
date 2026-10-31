"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DocumentsButton, FolderArt } from "../shared/Actions";
import { Sparkle } from "../shared/Decor";
import { Reveal } from "../shared/Reveal";

export function Documents() {
  const { t } = useLanguage();
  const d = t.documents;

  return (
    <section id="documents" aria-labelledby="documents-title" className="py-[clamp(3rem,7vh,5rem)]">
      <div className="mx-auto max-w-[1000px] px-8">
        <Reveal className="relative flex items-center gap-8 rounded-[999px] border-2 border-dashed border-violet/25 bg-sun-soft py-6 pr-8 pl-8">
          <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-white">
            <FolderArt className="w-16" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-sm font-bold text-violet-deep">
              <Sparkle className="h-3.5 w-3.5 text-violet" />
              {d.eyebrow}
            </p>
            <h2 id="documents-title" className="mt-1 font-display text-[1.65rem] leading-tight font-extrabold text-ink">
              {d.title}
            </h2>
            <p className="mt-1 text-ink-soft">{d.text}</p>
          </div>
          <DocumentsButton className="shrink-0" />
        </Reveal>
      </div>
    </section>
  );
}
