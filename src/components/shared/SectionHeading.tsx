import { cn } from "./cn";
import { Sparkle } from "./Decor";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  size?: "md" | "sm";
  className?: string;
};

/** Eyebrow + h2 + lead. Text keeps its natural case (no uppercase for Kazakh). */
export function SectionHeading({ id, eyebrow, title, text, align = "left", size = "md", className }: Props) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "inline-flex items-center gap-2 rounded-full bg-lilac px-3.5 py-1.5 font-bold text-violet-deep",
          size === "sm" ? "text-[0.8rem]" : "text-sm",
        )}
      >
        <Sparkle className="h-3.5 w-3.5 text-violet" />
        {eyebrow}
      </p>
      <h2
        id={`${id}-title`}
        className={cn(
          "mt-3 font-display font-extrabold text-balance text-ink",
          size === "sm" ? "text-[1.6rem] leading-[1.15]" : "text-[clamp(2rem,2.6vw,2.6rem)] leading-[1.12]",
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "mt-3 text-pretty text-ink-soft",
            size === "sm" ? "text-[0.98rem] leading-relaxed" : "max-w-xl text-lg leading-relaxed",
            align === "center" && "mx-auto",
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}
