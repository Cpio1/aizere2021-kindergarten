"use client";

import type { SiteMedia } from "@/lib/images";
import { FloatingWhatsApp } from "../shared/Actions";
import { Footer } from "../shared/Footer";
import { MobileAbout } from "./MobileAbout";
import { MobileContacts } from "./MobileContacts";
import { MobileDocuments } from "./MobileDocuments";
import { MobileGallery } from "./MobileGallery";
import { MobileGroups } from "./MobileGroups";
import { MobileHeader } from "./MobileHeader";
import { MobileHero } from "./MobileHero";
import { MobileMeals } from "./MobileMeals";

/** Composition for phones and tablets (< 1024 px). */
export function MobileWebsite({ heroImage, aboutImage, gallery }: SiteMedia) {
  return (
    <>
      <MobileHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <MobileHero image={heroImage} />
        <MobileAbout image={aboutImage} />
        <MobileGroups />
        <MobileMeals />
        <MobileGallery images={gallery} />
        <MobileDocuments />
        <MobileContacts />
      </main>
      <Footer compact />
      <FloatingWhatsApp className="right-4 bottom-[calc(1rem+var(--safe-bottom))]" />
    </>
  );
}
