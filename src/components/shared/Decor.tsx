// Decorative shapes and small illustrations. All are aria-hidden and pointer-events-none
// when positioned over content, so they never block text or buttons.

type ShapeProps = { className?: string; style?: React.CSSProperties };

export function Cloud({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 120 64" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M30 62h64a24 24 0 0 0 2-47.9A30 30 0 0 0 40.6 14 22 22 0 0 0 30 62Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Star({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M24 3.5c1.3 0 2.3.8 2.8 2l4.5 9.8 10.6 1.3c2.6.3 3.6 3.5 1.7 5.3l-7.8 7.3 2 10.5c.5 2.6-2.2 4.5-4.5 3.3L24 37.8l-9.3 5.2c-2.3 1.2-5-.7-4.5-3.3l2-10.5-7.8-7.3c-1.9-1.8-.9-5 1.7-5.3l10.6-1.3 4.5-9.8c.5-1.2 1.5-2 2.8-2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Four-point sparkle. */
export function Sparkle({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M16 1c1.2 8.2 6.8 13.8 15 15-8.2 1.2-13.8 6.8-15 15-1.2-8.2-6.8-13.8-15-15C9.2 14.8 14.8 9.2 16 1Z" fill="currentColor" />
    </svg>
  );
}

export function Flower({ className, style, center = "#FFD968" }: ShapeProps & { center?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true" focusable="false">
      <g fill="currentColor">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="32" cy="16" rx="10" ry="14" transform={`rotate(${deg} 32 32)`} />
        ))}
      </g>
      <circle cx="32" cy="32" r="9" fill={center} />
    </svg>
  );
}

export function Sun({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="40" y1="6" x2="40" y2="14" transform={`rotate(${i * 45} 40 40)`} />
        ))}
      </g>
      <circle cx="40" cy="40" r="18" fill="currentColor" />
    </svg>
  );
}

export function Squiggle({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 120 24" fill="none" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M3 14c9-9 18-9 27 0s18 9 27 0 18-9 27 0 18 9 27 0"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Organic blob used behind photos and the "4" in the meals section. */
export function Blob({ className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M162 42c20 22 28 56 18 86s-38 56-72 60-68-12-84-40-12-66 8-92 50-38 78-36 32 0 52 22Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ───────────── Toys for the groups section ───────────── */

export function Blocks({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 96 80" className={className} aria-hidden="true" focusable="false">
      <rect x="6" y="40" width="34" height="34" rx="6" fill="#7856C8" />
      <rect x="46" y="40" width="34" height="34" rx="6" fill="#FFD968" />
      <rect x="26" y="4" width="34" height="34" rx="6" fill="#8FD3AE" transform="rotate(-8 43 21)" />
      <text x="23" y="64" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff" fontFamily="system-ui">
        А
      </text>
      <text x="63" y="64" textAnchor="middle" fontSize="20" fontWeight="800" fill="#302A40" fontFamily="system-ui">
        Ә
      </text>
      <text x="43" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="#302A40" fontFamily="system-ui" transform="rotate(-8 43 21)">
        Б
      </text>
    </svg>
  );
}

export function Pencil({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 96 32" className={className} aria-hidden="true" focusable="false">
      <rect x="18" y="6" width="62" height="20" rx="3" fill="#FFD968" />
      <rect x="18" y="6" width="62" height="7" rx="3" fill="#FFE79A" />
      <rect x="80" y="6" width="12" height="20" rx="4" fill="#F4A7B9" />
      <rect x="76" y="6" width="6" height="20" fill="#C9C2D6" />
      <path d="M18 6 2 16l16 10Z" fill="#F3D2A6" />
      <path d="M8 12.3 2 16l6 3.7Z" fill="#302A40" />
    </svg>
  );
}

export function Ball({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="28" fill="#FFD968" />
      <path d="M32 4a28 28 0 0 1 0 56c-9-8-12-18-12-28S23 12 32 4Z" fill="#7856C8" />
      <path d="M32 4c9 8 12 18 12 28s-3 20-12 28" fill="none" stroke="#fff" strokeWidth="3" />
      <ellipse cx="20" cy="18" rx="6" ry="3.5" fill="#fff" opacity=".5" transform="rotate(-35 20 18)" />
    </svg>
  );
}

export function Duck({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 72 64" className={className} aria-hidden="true" focusable="false">
      <path d="M8 38c0-6 6-8 12-6 6 2 10 0 12-4 2-5 0-10 0-14C32 6 38 2 46 2s14 6 14 14c0 5-3 9-7 11 8 2 13 8 13 15 0 11-12 20-29 20S8 52 8 38Z" fill="#FFD968" />
      <path d="M58 12c5-1 10 1 12 3-3 3-8 4-12 3Z" fill="#F59E52" />
      <circle cx="49" cy="12" r="2.6" fill="#302A40" />
      <path d="M26 42c6 6 16 6 22 0" fill="none" stroke="#E8B83C" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export const toys = [Blocks, Ball, Duck] as const;

/* ───────────── Food for the meals section (illustrative, not a menu) ───────────── */

export function Apple({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path d="M32 18c-6-5-22-4-22 14 0 14 10 28 18 28 2 0 3-1 4-1s2 1 4 1c8 0 18-14 18-28 0-18-16-19-22-14Z" fill="#F07B7B" />
      <path d="M32 18c0-6 2-10 6-12" stroke="#6B4E2E" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M36 10c4-6 12-6 14-4-2 6-9 8-14 4Z" fill="#7BC496" />
      <ellipse cx="20" cy="30" rx="4" ry="7" fill="#fff" opacity=".35" />
    </svg>
  );
}

export function Carrot({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path d="M44 16c6 6 4 12-2 18L14 58c-3 2-6-1-4-4l22-30c6-8 9-10 12-8Z" fill="#F59E52" />
      <path d="M24 38l5 3M30 30l5 3M19 46l4 2" stroke="#D97C35" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M44 16c2-8 8-12 12-12-1 6-5 10-12 12Zm0 0c6-2 12 0 14 4-6 2-11 0-14-4Z" fill="#7BC496" />
    </svg>
  );
}

export function Bowl({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path d="M24 10c-3 4 3 6 0 10M32 8c-3 4 3 6 0 10M40 10c-3 4 3 6 0 10" stroke="#B9A6E6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M6 30h52c0 14-11 24-26 24S6 44 6 30Z" fill="#7856C8" />
      <path d="M6 30h52" stroke="#5F3FAE" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 38c4 6 10 8 16 8" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".45" fill="none" />
    </svg>
  );
}

export function Cup({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path d="M12 18h34l-4 36c0 3-3 6-6 6H22c-3 0-6-3-6-6Z" fill="#DDF1E5" stroke="#8FD3AE" strokeWidth="3" />
      <path d="M14 30h30l-2 24c0 2-2 4-4 4H20c-2 0-4-2-4-4Z" fill="#fff" />
      <path d="M46 26c8 0 10 4 10 8s-4 8-11 8" stroke="#8FD3AE" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export const foods = [Apple, Bowl, Carrot, Cup] as const;
