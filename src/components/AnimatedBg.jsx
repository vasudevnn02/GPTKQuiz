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
      {/* 1. Deep Navy & Normal Blue Combination Canvas */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 10%, #0d3278 0%, #071c47 30%, #040f28 65%, #010512 100%)',
      }} />

      {/* 2. Ambient Normal Blue Cosmic Aura (Shining through the glass cards) */}
      <div style={{
        position: 'absolute',
        width: '980px',
        height: '560px',
        top: '18%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(29, 78, 216, 0.42) 0%, rgba(37, 99, 235, 0.28) 35%, rgba(15, 23, 42, 0.12) 70%, transparent 85%)',
        filter: 'blur(75px)',
        opacity: 0.9,
        animation: 'cosmicCoreBreathing 12s ease-in-out infinite',
      }} />

      {/* 3. Gentle Secondary Blue Flow Accent */}
      <div style={{
        position: 'absolute',
        width: '650px',
        height: '350px',
        top: '30%',
        left: '42%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.25) 0%, rgba(29, 78, 216, 0.15) 50%, transparent 80%)',
        filter: 'blur(60px)',
        opacity: 0.75,
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
