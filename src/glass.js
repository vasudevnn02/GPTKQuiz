// Apple iOS Liquid Glassmorphism System
// Squircles with frosted blur, translucent fills, and specular rim highlights allowing the deep galaxy background to shine through.

export const glass = {
  background: 'rgba(255, 255, 255, 0.07)',
  backdropFilter: 'blur(30px) saturate(190%)',
  WebkitBackdropFilter: 'blur(30px) saturate(190%)',
  border: '1px solid rgba(255, 255, 255, 0.24)',
  boxShadow: '0 20px 48px rgba(0, 0, 0, 0.35), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.45), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1)',
};

export const glassDeep = {
  background: 'rgba(255, 255, 255, 0.09)',
  backdropFilter: 'blur(32px) saturate(200%)',
  WebkitBackdropFilter: 'blur(32px) saturate(200%)',
  border: '1px solid rgba(255, 255, 255, 0.28)',
  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.12)',
};

export const glassInner = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.25)',
};

export const glassBtn = {
  background: 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(22px)',
  WebkitBackdropFilter: 'blur(22px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: '#ffffff',
  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.45)',
};
