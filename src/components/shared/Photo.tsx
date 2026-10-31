import Image from "next/image";
import type { SiteImage } from "@/lib/images";
import { cn } from "./cn";
import { Cloud, Flower, Sun } from "./Decor";

/**
 * Neutral illustration shown until a real photo is added to public/images.
 * It is decorative only and never pretends to be a photo of the kindergarten.
 */
export function PhotoPlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-full w-full overflow-hidden bg-gradient-to-b from-lilac to-[#f7f2ff]", className)}
    >
      <Sun className="absolute top-[12%] right-[14%] w-[22%] text-sun" />
      <Cloud className="absolute top-[24%] left-[8%] w-[34%] text-white" />
      <Cloud className="absolute top-[40%] right-[6%] w-[24%] text-white/80" />
      <div className="absolute inset-x-0 bottom-0 h-[30%] rounded-t-[50%] bg-mint" />
      <div className="absolute right-[-10%] bottom-0 h-[22%] w-[70%] rounded-t-[50%] bg-[#c8e9d5]" />
      <Flower className="absolute bottom-[12%] left-[16%] w-[13%] text-violet" />
      <Flower className="absolute bottom-[8%] left-[38%] w-[9%] text-[#b9a6e6]" />
      <Flower className="absolute right-[20%] bottom-[14%] w-[11%] text-white" center="#7856C8" />
    </div>
  );
}

type PhotoProps = {
  image: SiteImage | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Photo that fills its (shaped) frame; falls back to the illustration when the file is missing. */
export function FramePhoto({ image, alt, sizes, priority, className }: PhotoProps) {
  if (!image) return <PhotoPlaceholder className={className} />;
  return (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={82}
      // faces are usually in the upper part of the frame — keep them in view when cropping to the shape
      className={cn("object-cover object-[50%_30%]", className)}
    />
  );
}
