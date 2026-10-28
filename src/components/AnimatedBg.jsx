import React, { useMemo } from 'react';

export default function AnimatedBg() {
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 65; i++) {
      const duration = 6 + (i % 7) * 2.5; // 6s to 21s
      const delay = -(i % 12) * 1.5;
      const size = i % 4 === 0 ? 2.5 : i % 2 === 0 ? 1.8 : 1.2;
      list.push({
        top: `${(i * 17 + 5) % 100}%`,
        left: `${(i * 29 + 11) % 100}%`,
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
      backgroundColor: '#030816',
    }}>
      {/* 1. Deep Navy & Normal Blue Combination Canvas */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, #0c2b66 0%, #07183e 40%, #030a1c 80%, #01040e 100%)',
      }} />

      {/* 2. Subtler Darker Ambient Blue Glow (not bright cyan) */}
      <div style={{
        position: 'absolute',
        width: '900px',
        height: '500px',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(29, 78, 216, 0.4) 0%, rgba(30, 58, 138, 0.22) 45%, transparent 75%)',
        filter: 'blur(60px)',
        opacity: 0.8,
        animation: 'cosmicCoreBreathing 12s ease-in-out infinite',
      }} />

      {/* 3. Subtle secondary soft blue floor glow */}
      <div style={{
        position: 'absolute',
        width: '1100px',
        height: '400px',
        bottom: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(29, 78, 216, 0.25) 0%, rgba(15, 23, 42, 0.15) 50%, transparent 80%)',
        filter: 'blur(70px)',
        opacity: 0.7,
      }} />

      {/* 4. Animated Moving Stars */}
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
