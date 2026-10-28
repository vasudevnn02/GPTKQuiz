// Ultra Liquid Frosted Glass (Apple VisionOS & iOS Specular Architecture)
// Multi-stop gradient light transmission, specular rim refraction, ambient drop shadow, and saturated frosted blur.

export const glass = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
  backdropFilter: 'blur(28px) saturate(190%)',
  WebkitBackdropFilter: 'blur(28px) saturate(190%)',
  border: '1px solid rgba(255, 255, 255, 0.28)',
  boxShadow: '0 20px 48px rgba(0, 0, 0, 0.38), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.65), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.12)',
};

export const glassDeep = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%)',
  backdropFilter: 'blur(32px) saturate(200%)',
  WebkitBackdropFilter: 'blur(32px) saturate(200%)',
  border: '1px solid rgba(255, 255, 255, 0.32)',
  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.42), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.75), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.15)',
};

export const glassInner = {
  background: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
};

export const glassBtn = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.32)',
  color: '#ffffff',
  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)',
};
