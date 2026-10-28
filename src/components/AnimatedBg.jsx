import React, { useMemo } from 'react';

export default function AnimatedBg() {
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 75; i++) {
      const duration = 7 + (i % 8) * 2; // 7s to 21s
      const delay = -(i % 15) * 1.2;
      const size = i % 4 === 0 ? 2.5 : i % 2 === 0 ? 1.8 : 1.2;
      list.push({
        top: `${(i * 19 + 7) % 100}%`,
        left: `${(i * 31 + 13) % 100}%`,
        size,
        duration: `${duration}s`,
        delay: `${delay}s`,
        isSlow: i % 2 === 0,
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
      backgroundColor: '#020714',
    }}>
      {/* 1. Deep Navy & Midnight Space Canvas */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, #07152e 0%, #040d1e 50%, #01050f 100%)',
      }} />

      {/* 2. Very Subtle Dark Ambient Navy Glow (Deep, not bright neon blue) */}
      <div style={{
        position: 'absolute',
        width: '800px',
        height: '450px',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(15, 45, 105, 0.22) 0%, rgba(8, 25, 65, 0.12) 50%, transparent 80%)',
        filter: 'blur(80px)',
        opacity: 0.6,
      }} />

      {/* 4. Animated Floating Stars */}
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
            backgroundColor: idx % 3 === 0 ? '#93c5fd' : '#ffffff',
            boxShadow: `0 0 6px ${idx % 3 === 0 ? '#60a5fa' : '#ffffff'}`,
            animation: `${s.isSlow ? 'starDriftSlow' : 'starDrift'} ${s.duration} ease-in-out infinite alternate`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
