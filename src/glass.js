// ══════════════════════════════════════════════════════════════════
// Pure Neutral Transparent Glass (Achromatic, Colorless Frosted Glass)
// ══════════════════════════════════════════════════════════════════

// Standard card — true colorless transparent glass
export const glass = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(26px)',
  WebkitBackdropFilter: 'blur(26px)',
  border: 'none',
  outline: '1px solid rgba(255, 255, 255, 0.22)',
  outlineOffset: '-1px',
  boxShadow: [
    '0 14px 40px rgba(0, 0, 0, 0.35)',
    'inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.65)',
    'inset 0 -1px 1px 0 rgba(255, 255, 255, 0.12)',
    'inset 1px 0 1px -1px rgba(255, 255, 255, 0.30)',
    'inset -1px 0 1px -1px rgba(255, 255, 255, 0.12)',
  ].join(', '),
};

// Modal / elevated panel — true colorless transparent glass
export const glassDeep = {
  background: 'rgba(255, 255, 255, 0.065)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  border: 'none',
  outline: '1px solid rgba(255, 255, 255, 0.26)',
  outlineOffset: '-1px',
  boxShadow: [
    '0 24px 60px rgba(0, 0, 0, 0.45)',
    '0 6px 20px rgba(0, 0, 0, 0.25)',
    'inset 0 2px 1.5px 0 rgba(255, 255, 255, 0.75)',
    'inset 0 -1px 1px 0 rgba(255, 255, 255, 0.15)',
    'inset 1.5px 0 1px -1px rgba(255, 255, 255, 0.35)',
    'inset -1.5px 0 1px -1px rgba(255, 255, 255, 0.14)',
  ].join(', '),
};

// Nested inner panel
export const glassInner = {
  background: 'rgba(255, 255, 255, 0.035)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: 'none',
  outline: '1px solid rgba(255, 255, 255, 0.16)',
  outlineOffset: '-1px',
  boxShadow: 'inset 0 1px 0.5px 0 rgba(255, 255, 255, 0.40)',
};

// Button pill
export const glassBtn = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: 'none',
  outline: '1px solid rgba(255, 255, 255, 0.25)',
  outlineOffset: '-1px',
  color: '#ffffff',
  boxShadow: [
    '0 4px 14px rgba(0, 0, 0, 0.22)',
    'inset 0 1px 1px 0 rgba(255, 255, 255, 0.60)',
    'inset 0 -0.5px 0.5px 0 rgba(255, 255, 255, 0.15)',
  ].join(', '),
};
