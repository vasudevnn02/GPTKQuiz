// Pure Transparent Glass Tokens
// - ZERO blue tint in the glass cards
// - Pure translucent frosted glass plate: rgba(255, 255, 255, 0.04)
// - Strong optical backdrop blur refraction
// - Crisp, glossy specular edge highlight
export const glass = {
  background: 'rgba(255, 255, 255, 0.04)',
  backdropFilter: 'blur(36px) saturate(160%)',
  WebkitBackdropFilter: 'blur(36px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.14)',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.28)',
};

export const glassDeep = {
  background: 'rgba(255, 255, 255, 0.035)',
  backdropFilter: 'blur(45px) saturate(170%)',
  WebkitBackdropFilter: 'blur(45px) saturate(170%)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: '0 30px 70px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.32)',
};

export const glassInner = {
  background: 'rgba(255, 255, 255, 0.035)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
};

export const glassBtn = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  color: '#ffffff',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
};
