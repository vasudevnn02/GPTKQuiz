// Pure transparent glass system — panels are almost invisible,
// showing the vivid blue background through the blur.

export const glass = {
  background: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  // Strong specular top edge = glass feel
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
};

export const glassDeep = {
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(60px) saturate(200%)',
  WebkitBackdropFilter: 'blur(60px) saturate(200%)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
};

export const glassInner = {
  background: 'rgba(255, 255, 255, 0.04)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
};

export const glassBtn = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  color: '#ffffff',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
};
