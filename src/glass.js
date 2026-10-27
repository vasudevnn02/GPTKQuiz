// Exact Frosted Glass match to reference image:
// - Semi-translucent frosted glass plate: rgba(255, 255, 255, 0.08) - rgba(255, 255, 255, 0.12)
// - Heavy matte refraction blur: blur(44px) saturate(160%)
// - Crisp, thin, luminous perimeter outline: 1px solid rgba(255, 255, 255, 0.22)
// - Specular top refraction edge: inset 0 1px 0 rgba(255, 255, 255, 0.35)
// - Rounded pill/squircle corners: borderRadius 24px - 28px
export const glass = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(40px) saturate(160%)',
  WebkitBackdropFilter: 'blur(40px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.32)',
};

export const glassDeep = {
  background: 'rgba(255, 255, 255, 0.07)',
  backdropFilter: 'blur(48px) saturate(160%)',
  WebkitBackdropFilter: 'blur(48px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.36)',
};

export const glassInner = {
  background: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.14)',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.18)',
};

export const glassBtn = {
  background: 'rgba(255, 255, 255, 0.14)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255, 255, 255, 0.28)',
  color: '#ffffff',
  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
};
