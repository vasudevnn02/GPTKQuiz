import React from 'react';

// Exact match to user image:
// Pitch-black background (#000000) with a crisp, vivid vibrant blue gradient sphere/circle
// that peaks through the frosted translucent card.
export default function AnimatedBg() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      overflow: 'hidden', pointerEvents: 'none',
      backgroundColor: '#000000',
    }}>
      {/* Primary Cyan-to-Deep-Navy Gradient Sphere - Center-Top (under main cards) */}
      <div
        style={{
          position: 'absolute',
          width: '680px',
          height: '680px',
          top: '8%',
          left: '50%',
          marginLeft: '-340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 68% 68%, #00d2ff 0%, #0077fe 35%, #05267a 70%, #031445 100%)',
          boxShadow: '0 0 120px rgba(0, 180, 255, 0.45), 0 0 240px rgba(0, 100, 255, 0.25)',
          animation: 'floatOrb1 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Secondary glowing cyan-blue orb - Lower Right */}
      <div
        style={{
          position: 'absolute',
          width: '540px',
          height: '540px',
          bottom: '-10%',
          right: '5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 65% 65%, #00e1ff 0%, #0066ee 40%, #041c59 75%, #020b29 100%)',
          boxShadow: '0 0 100px rgba(0, 200, 255, 0.35)',
          animation: 'floatOrb2 24s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Subtle deep indigo accent orb - Lower Left */}
      <div
        style={{
          position: 'absolute',
          width: '480px',
          height: '480px',
          bottom: '5%',
          left: '4%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #0088ff 0%, #07328f 45%, #010c2e 100%)',
          opacity: 0.7,
          animation: 'floatOrb1 26s ease-in-out infinite reverse',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
