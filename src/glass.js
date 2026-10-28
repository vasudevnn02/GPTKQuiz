// ══════════════════════════════════════════════════════════════════
// Pure Neutral Transparent Glass (Achromatic, Colorless Frosted Glass)
// ══════════════════════════════════════════════════════════════════

// Standard card — true colorless transparent glass (bg & stars clearly visible through it)
export const glass = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1)',
};

// Modal / elevated panel
export const glassDeep = {
  background: 'rgba(255, 255, 255, 0.07)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.26)',
  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.45), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.12)',
};

// Nested inner panel
export const glassInner = {
  background: 'rgba(255, 255, 255, 0.035)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: 'inset 0 1px 0.5px 0 rgba(255, 255, 255, 0.35)',
};

// Button pill
export const glassBtn = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  color: '#ffffff',
  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.22), inset 0 1px 1px 0 rgba(255, 255, 255, 0.55)',
};
