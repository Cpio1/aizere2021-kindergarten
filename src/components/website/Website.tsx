"use client";

import type { SiteMedia } from "@/lib/images";
import { FloatingWhatsApp } from "../shared/Actions";
import { Footer } from "../shared/Footer";
import { About } from "./About";
import { Contacts } from "./Contacts";
import { Documents } from "./Documents";
import { Gallery } from "./Gallery";
import { Groups } from "./Groups";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Meals } from "./Meals";

/** Composition for laptops and desktops (≥ 1024 px). */
export function Website({ heroImage, aboutImage, gallery }: SiteMedia) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero image={heroImage} />
        <About image={aboutImage} />
        <Groups />
        <Meals />
        <Gallery images={gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer />
      <FloatingWhatsApp className="right-6 bottom-6" />
    </>
  );
}
