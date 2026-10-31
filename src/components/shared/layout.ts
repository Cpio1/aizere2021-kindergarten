/**
 * The single switch point between the two compositions: laptops and desktops (≥ 1024 px) get
 * components/website, phones and tablets get components/mobile-website. Keep in sync with globals.css.
 */
export const DESKTOP_QUERY = "(min-width: 64rem)";

export type Layout = "desktop" | "mobile";
