import type { Metadata, Viewport } from "next";
import { Nunito, Rubik } from "next/font/google";
import { Providers } from "@/components/shared/Providers";
import { SITE_URL, site } from "@/config/site";
import { dictionaries } from "@/i18n/translations";
import "./globals.css";

// cyrillic-ext carries the Kazakh letters Ә Ғ Қ Ң Ө Ұ Ү Һ І in both faces.
const heading = Rubik({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});
const body = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const kk = dictionaries.kk.meta;
const ru = dictionaries.ru.meta;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: kk.title,
  description: kk.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: ["Айзере 2021", "балабақша Есік", "бөбекжай Есік", "детский сад Есик", "ясли-сад Есик", "детский сад на казахском языке"],
  openGraph: {
    type: "website",
    locale: "kk_KZ",
    alternateLocale: ["ru_KZ"],
    url: "/",
    siteName: site.name,
    title: kk.title,
    description: `${kk.description} ${ru.description}`,
  },
  twitter: { card: "summary", title: kk.title, description: kk.description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FFFDF7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: site.name,
  legalName: site.legalName.ru,
  url: SITE_URL,
  telephone: "+77073176976",
  sameAs: [site.instagram.url],
  address: {
    "@type": "PostalAddress",
    streetAddress: "улица Маншук Маметовой, 20 Г",
    addressLocality: "Есик",
    addressRegion: "Алматинская область",
    addressCountry: "KZ",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    opens: site.hours.opens,
    closes: site.hours.closes,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `js` class and data-layout are set on the client before/after hydration
    <html lang="kk" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
