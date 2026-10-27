// Pure glass tokens — near-zero fill so animated blobs show through blur
export const glass = {
  background: 'rgba(255, 255, 255, 0.07)',
  backdropFilter: 'blur(36px) saturate(160%)',
  WebkitBackdropFilter: 'blur(36px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.32)',
};

export const glassDeep = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(52px) saturate(180%)',
  WebkitBackdropFilter: 'blur(52px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.14)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
};

export const glassInner = {
  background: 'rgba(255, 255, 255, 0.055)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
};

export const glassBtn = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  color: '#ffffff',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28)',
};
