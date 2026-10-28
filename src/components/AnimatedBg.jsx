import React, { useMemo } from 'react';

export default function AnimatedBg() {
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 120; i++) {
      const duration = 6 + (i % 8) * 2; // 6s to 20s
      const delay = -(i % 16) * 1.1;
      const size = i % 5 === 0 ? 3 : i % 3 === 0 ? 2.2 : 1.5;
      list.push({
        top: `${(i * 17 + 5) % 100}%`,
        left: `${(i * 29 + 11) % 100}%`,
        size,
        duration: `${duration}s`,
        delay: `${delay}s`,
        isSlow: i % 2 === 0,
        isBlue: i % 4 === 0,
      });
    }
    return list;
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      backgroundColor: '#00030a',
    }}>
      {/* 1. Deep Navy & Normal Blue Combination Canvas */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, #071840 0%, #030d22 50%, #010509 80%, #00030a 100%)',
      }} />

      {/* 2. Soft Ambient Deep Blue Cloud */}
      <div style={{
        position: 'absolute',
        width: '900px',
        height: '500px',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(14, 48, 111, 0.35) 0%, rgba(7, 28, 69, 0.15) 50%, transparent 80%)',
        filter: 'blur(70px)',
        opacity: 0.7,
      }} />

      {/* 3. Animated Floating Stars (Visible through glass) */}
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
            backgroundColor: s.isBlue ? '#93c5fd' : '#ffffff',
            boxShadow: `0 0 8px ${s.isBlue ? '#60a5fa' : '#ffffff'}`,
            animation: `${s.isSlow ? 'starDriftSlow' : 'starDrift'} ${s.duration} ease-in-out infinite alternate`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
