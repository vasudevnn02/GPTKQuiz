// ══════════════════════════════════════════════════════════════════
// Pure Transparent Glass  —  Blue Galaxy Bleeds Through
// ══════════════════════════════════════════════════════════════════
// Cards are nearly invisible — ultra-thin white sheen + strong blur
// so the deep navy/blue star background saturates through naturally.
// Pair inline spread with className="liqglass" / "liqglass-deep"
// from index.css to get dome shine + noise grain + shimmer hover.
// ══════════════════════════════════════════════════════════════════

// Standard card — very transparent, blue galaxy shows through
export const glass = {
  background: 'rgba(255,255,255,0.045)',
  backdropFilter: 'blur(32px) saturate(180%) brightness(1.08)',
  WebkitBackdropFilter: 'blur(32px) saturate(180%) brightness(1.08)',
  border: 'none',
  outline: '1px solid rgba(255,255,255,0.20)',
  outlineOffset: '-1px',
  boxShadow: [
    '0 12px 36px rgba(0,0,0,0.28)',
    'inset 0 1.5px 1px 0 rgba(255,255,255,0.65)',
    'inset 0 -1px 1px 0 rgba(255,255,255,0.12)',
    'inset 1px 0 1px -1px rgba(255,255,255,0.30)',
    'inset -1px 0 1px -1px rgba(255,255,255,0.12)',
  ].join(', '),
};

// Modal / elevated panel — slightly more visible
export const glassDeep = {
  background: 'rgba(255,255,255,0.055)',
  backdropFilter: 'blur(40px) saturate(190%) brightness(1.10)',
  WebkitBackdropFilter: 'blur(40px) saturate(190%) brightness(1.10)',
  border: 'none',
  outline: '1px solid rgba(255,255,255,0.24)',
  outlineOffset: '-1px',
  boxShadow: [
    '0 20px 52px rgba(0,0,0,0.35)',
    '0 6px 16px rgba(0,0,0,0.20)',
    'inset 0 2px 1.5px 0 rgba(255,255,255,0.75)',
    'inset 0 -1px 1px 0 rgba(255,255,255,0.15)',
    'inset 1.5px 0 1px -1px rgba(255,255,255,0.35)',
    'inset -1.5px 0 1px -1px rgba(255,255,255,0.14)',
  ].join(', '),
};

// Nested inner panel
export const glassInner = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: 'none',
  outline: '1px solid rgba(255,255,255,0.14)',
  outlineOffset: '-1px',
  boxShadow: 'inset 0 1px 0.5px 0 rgba(255,255,255,0.40)',
};

// Button pill
export const glassBtn = {
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: 'none',
  outline: '1px solid rgba(255,255,255,0.25)',
  outlineOffset: '-1px',
  color: '#ffffff',
  boxShadow: [
    '0 4px 14px rgba(0,0,0,0.22)',
    'inset 0 1px 1px 0 rgba(255,255,255,0.60)',
    'inset 0 -0.5px 0.5px 0 rgba(255,255,255,0.15)',
  ].join(', '),
};
