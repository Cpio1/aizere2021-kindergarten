/**
 * Every fact and link about the kindergarten lives here — both layouts read from this file.
 * Only confirmed data: do not add prices, group names, schedules or licences until they are provided.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aizere2021.vercel.app";

export const site = {
  /** Short name used in the logo. */
  name: "Айзере 2021",
  legalName: {
    kk: "ЖШС «Айзере 2021» бөбекжай балабақшасы",
    ru: "ТОО «Айзере 2021», ясли-сад",
  },
  address: {
    kk: "Алматы облысы, Еңбекшіқазақ ауданы, Есік қаласы, Мәншүк Мәметова көшесі, 20 Г",
    ru: "Алматинская область, Енбекшиказахский район, город Есик, улица Маншук Маметовой, 20 Г",
  },
  phone: {
    display: "+7 (707) 317-69-76",
    tel: "tel:+77073176976",
  },
  whatsapp: {
    url: "https://wa.me/77073176976",
  },
  instagram: {
    handle: "@aizere_2021_balabakshasy",
    url: "https://www.instagram.com/aizere_2021_balabakshasy/",
  },
  hours: { opens: "07:30", closes: "18:00", display: "07:30–18:00" },
  groups: 3,
  ages: { from: 3, to: 6 },
  mealsPerDay: 4,

  /**
   * Link to the folder with documents (Google Drive, Яндекс Диск, …).
   * While it is null the button in the «Құжаттар / Документы» section is disabled.
   */
  documentsUrl: "https://drive.google.com/drive/folders/1Nv7tM__GNDLfZYZq_N6-2dtbmBtPOp0T" as string | null,

  /**
   * 2GIS map. Paste the embed (iframe src) link into mapEmbedUrl and the page link into mapUrl.
   * While mapEmbedUrl is null the contacts section shows an address card instead of a map.
   */
  mapEmbedUrl: null as string | null,
  mapUrl: null as string | null,
} as const;

export const navIds = ["home", "about", "groups", "meals", "gallery", "documents", "contacts"] as const;
export type NavId = (typeof navIds)[number];

/** How many photos the gallery shows before «Көбірек көрсету / Показать больше». */
export const GALLERY_INITIAL = { desktop: 6, mobile: 4 } as const;
