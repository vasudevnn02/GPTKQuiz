import React, { useMemo } from 'react';

// Exact match to User's Screenshot 1:
// Deep black/navy cosmic background with an intense, vibrant electric cyan-blue glow
// blooming from the center-top and illuminating the frosted glass cards.
export default function AnimatedBg() {
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 40; i++) {
      list.push({
        top: `${(i * 23 + 7) % 100}%`,
        left: `${(i * 31 + 17) % 100}%`,
        size: (i % 3 === 0 ? 2 : 1.2),
        opacity: 0.3 + ((i % 4) * 0.15),
      });
    }
    return list;
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      overflow: 'hidden', pointerEvents: 'none',
      backgroundColor: '#020611',
    }}>
      {/* 1. Base Deep Midnight Canvas */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #020716 0%, #01040a 100%)',
      }} />

      {/* 2. Vibrant Electric Cyan-Blue Glowing Aura (Exact bloom from image 1) */}
      <div
        style={{
          position: 'absolute',
          width: '920px',
          height: '520px',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, #00b4d8 0%, #0077b6 35%, #023e8a 65%, transparent 80%)',
          filter: 'blur(55px)',
          opacity: 0.95,
        }}
      />

      {/* 3. Subtle Cyan Core Flare */}
      <div
        style={{
          position: 'absolute',
          width: '450px',
          height: '280px',
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, #48cae4 0%, #0096c7 50%, transparent 80%)',
          filter: 'blur(40px)',
          opacity: 0.85,
        }}
      />

      {/* 4. Subtle Distant Tiny Stars from screenshot 1 & 2 */}
      {stars.map((s, idx) => (
        <div
          key={`star-${idx}`}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            backgroundColor: idx % 2 === 0 ? '#bbf2ff' : '#ffffff',
            opacity: s.opacity,
            boxShadow: `0 0 4px ${idx % 2 === 0 ? '#00e5ff' : '#ffffff'}`,
          }}
        />
      ))}
    </div>
  );
}
