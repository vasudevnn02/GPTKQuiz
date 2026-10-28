// ══════════════════════════════════════════════════════════════════
// iOS 27 / visionOS LIQUID GLASS  —  Inline Style Tokens
// ══════════════════════════════════════════════════════════════════
// Pair every spread with className="liqglass" (or variant) from
// index.css to get ::before dome-shine, ::after noise grain, and
// shimmer hover animation.
// ══════════════════════════════════════════════════════════════════

// Standard card / panel
export const glass = {
  background: `linear-gradient(
    158deg,
    rgba(255,255,255,0.26) 0%,
    rgba(255,255,255,0.10) 22%,
    rgba(255,255,255,0.02) 48%,
    rgba(255,255,255,0.00) 65%,
    rgba(255,255,255,0.06) 100%
  )`,
  backdropFilter: 'blur(44px) saturate(210%) brightness(1.12)',
  WebkitBackdropFilter: 'blur(44px) saturate(210%) brightness(1.12)',
  border: 'none',
  outline: '1px solid rgba(255,255,255,0.38)',
  outlineOffset: '-1px',
  boxShadow: [
    '0 32px 72px rgba(0,0,0,0.55)',
    '0 8px 24px rgba(0,0,0,0.35)',
    'inset 0 2.5px 2px 0 rgba(255,255,255,0.90)',
    'inset 0 -1.5px 2px 0 rgba(255,255,255,0.25)',
    'inset 2px 0 2px -1px rgba(255,255,255,0.50)',
    'inset -2px 0 2px -1px rgba(255,255,255,0.18)',
  ].join(', '),
};

// Modal / elevated panel — deeper blur, stronger specular
export const glassDeep = {
  background: `linear-gradient(
    158deg,
    rgba(255,255,255,0.30) 0%,
    rgba(255,255,255,0.12) 20%,
    rgba(255,255,255,0.03) 50%,
    rgba(255,255,255,0.01) 65%,
    rgba(255,255,255,0.08) 100%
  )`,
  backdropFilter: 'blur(52px) saturate(220%) brightness(1.14)',
  WebkitBackdropFilter: 'blur(52px) saturate(220%) brightness(1.14)',
  border: 'none',
  outline: '1px solid rgba(255,255,255,0.42)',
  outlineOffset: '-1px',
  boxShadow: [
    '0 48px 96px rgba(0,0,0,0.65)',
    '0 16px 40px rgba(0,0,0,0.40)',
    'inset 0 3px 2.5px 0 rgba(255,255,255,0.95)',
    'inset 0 -2px 2px 0 rgba(255,255,255,0.28)',
    'inset 2.5px 0 2px -1px rgba(255,255,255,0.55)',
    'inset -2.5px 0 2px -1px rgba(255,255,255,0.22)',
  ].join(', '),
};

// Nested inner card / sub-panel
export const glassInner = {
  background: 'rgba(255,255,255,0.07)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: 'none',
  outline: '1px solid rgba(255,255,255,0.22)',
  outlineOffset: '-1px',
  boxShadow: 'inset 0 1.5px 1px 0 rgba(255,255,255,0.45)',
};

// Button pill
export const glassBtn = {
  background: `linear-gradient(
    145deg,
    rgba(255,255,255,0.22) 0%,
    rgba(255,255,255,0.08) 100%
  )`,
  backdropFilter: 'blur(28px) saturate(180%)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
  border: 'none',
  outline: '1px solid rgba(255,255,255,0.38)',
  outlineOffset: '-1px',
  color: '#ffffff',
  boxShadow: [
    '0 8px 22px rgba(0,0,0,0.30)',
    'inset 0 1.5px 1.5px 0 rgba(255,255,255,0.80)',
    'inset 0 -1px 1px 0 rgba(255,255,255,0.20)',
  ].join(', '),
};
