import "server-only";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * Single source of photos for the whole site — read from public/images at build time:
 * - main-page.*  → hero photo
 * - main-page2.* → «About» photo
 * - every other photo (image1, image2, … in natural order) → gallery
 * Supported: png, jpg, jpeg, webp, avif. Add or replace files and rebuild — nothing else to edit.
 */
export type SiteImage = {
  src: string;
  width: number;
  height: number;
};

type ImageFile = SiteImage & { hash: string };

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const SPECIAL = ["main-page", "main-page2"] as const;
type SpecialName = (typeof SPECIAL)[number];
/** Service graphics that must never appear in the gallery. */
const SERVICE = /^(logo|favicon|icon|og|og-image|apple-touch-icon)([-_.].*)?$/i;
const EXTENSION_PRIORITY = [".avif", ".webp", ".jpg", ".jpeg", ".png"];

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const baseName = (fileName: string) => path.basename(fileName, path.extname(fileName));
const strip = ({ src, width, height }: ImageFile): SiteImage => ({ src, width, height });

function listImageFiles(): string[] {
  try {
    return fs
      .readdirSync(IMAGES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .filter((name) => SUPPORTED.has(path.extname(name).toLowerCase()));
  } catch {
    // The folder may not exist yet — that's a valid, empty state.
    return [];
  }
}

function readImage(fileName: string): ImageFile | null {
  try {
    const buffer = fs.readFileSync(path.join(IMAGES_DIR, fileName));
    const { width, height, orientation } = imageSize(buffer);
    if (!width || !height) return null;
    // EXIF orientations 5–8 mean the photo is displayed rotated by 90°.
    const rotated = orientation !== undefined && orientation >= 5 && orientation <= 8;
    return {
      src: `/images/${encodeURIComponent(fileName)}`,
      width: rotated ? height : width,
      height: rotated ? width : height,
      hash: createHash("sha1").update(buffer).digest("hex"),
    };
  } catch {
    // Unreadable or corrupt file — skip it instead of rendering a broken image.
    return null;
  }
}

/** Finds `main-page.*` / `main-page2.*` with whatever extension actually exists. */
function findSpecial(name: SpecialName): ImageFile | null {
  const candidates = listImageFiles()
    .filter((file) => baseName(file).toLowerCase() === name)
    .sort(
      (a, b) =>
        EXTENSION_PRIORITY.indexOf(path.extname(a).toLowerCase()) -
        EXTENSION_PRIORITY.indexOf(path.extname(b).toLowerCase()),
    );
  for (const file of candidates) {
    const image = readImage(file);
    if (image) return image;
  }
  return null;
}

/** Gallery photos; byte-identical copies (including copies of the main photos) are skipped. */
function getGalleryImages(specials: (ImageFile | null)[]): SiteImage[] {
  const seen = new Set(specials.flatMap((image) => (image ? [image.hash] : [])));
  const result: SiteImage[] = [];
  for (const file of listImageFiles().sort(collator.compare)) {
    const base = baseName(file).toLowerCase();
    if ((SPECIAL as readonly string[]).includes(base) || SERVICE.test(base)) continue;
    const image = readImage(file);
    if (!image || seen.has(image.hash)) continue;
    seen.add(image.hash);
    result.push(strip(image));
  }
  return result;
}

/** Everything the page reads from public/images, passed to both layouts. */
export type SiteMedia = {
  heroImage: SiteImage | null;
  aboutImage: SiteImage | null;
  gallery: SiteImage[];
};

export function getSiteMedia(): SiteMedia {
  const hero = findSpecial("main-page");
  const about = findSpecial("main-page2");
  return {
    heroImage: hero && strip(hero),
    aboutImage: about && strip(about),
    gallery: getGalleryImages([hero, about]),
  };
}
