import React, { useMemo } from 'react';

// Blue Galaxy Cosmic Background
// Features deep cosmic nebula gas clouds (cyan, deep sapphire, electric blue, indigo)
// with twinkling stars and cosmic dust drifting behind the frosted glass cards.
export default function AnimatedBg() {
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 90; i++) {
      list.push({
        top: `${(i * 19 + 7) % 100}%`,
        left: `${(i * 31 + 13) % 100}%`,
        size: (i % 5 === 0 ? 2.5 : i % 2 === 0 ? 1.8 : 1),
        opacity: 0.25 + ((i % 6) * 0.12),
        duration: 2.5 + (i % 5) * 1.5,
        delay: (i % 7) * 0.6,
      });
    }
    return list;
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      overflow: 'hidden', pointerEvents: 'none',
      backgroundColor: '#02040a',
    }}>
      {/* Deep Space Cosmic Base Glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 90% 75% at 50% 25%, #07193f 0%, #030a1c 55%, #01040a 100%)',
      }} />

      {/* Main Galaxy Core / Blue Nebula Cloud 1 (Electric Blue & Bright Cyan Center) */}
      <div
        style={{
          position: 'absolute',
          width: '900px',
          height: '650px',
          top: '5%',
          left: '50%',
          marginLeft: '-450px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 45% 45%, rgba(0, 217, 255, 0.45) 0%, rgba(0, 119, 255, 0.35) 30%, rgba(10, 42, 138, 0.28) 60%, transparent 75%)',
          filter: 'blur(65px)',
          animation: 'galaxyDrift1 26s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Galaxy Arm / Deep Sapphire Nebula (Upper Right) */}
      <div
        style={{
          position: 'absolute',
          width: '750px',
          height: '600px',
          top: '-120px',
          right: '-100px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(30, 144, 255, 0.38) 0%, rgba(0, 70, 200, 0.25) 45%, transparent 70%)',
          filter: 'blur(75px)',
          animation: 'galaxyDrift2 30s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Glowing Starburst Nebula Core (Cyan / White Highlight) */}
      <div
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          top: '20%',
          left: '42%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 50%, rgba(180, 245, 255, 0.5) 0%, rgba(0, 195, 255, 0.3) 35%, transparent 68%)',
          filter: 'blur(45px)',
          animation: 'galaxyPulse 8s ease-in-out infinite alternate',
          willChange: 'transform, opacity',
        }}
      />

      {/* Lower Nebula Cluster (Cobalt & Indigo) */}
      <div
        style={{
          position: 'absolute',
          width: '800px',
          height: '600px',
          bottom: '-120px',
          left: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 102, 255, 0.3) 0%, rgba(15, 30, 95, 0.22) 50%, transparent 72%)',
          filter: 'blur(80px)',
          animation: 'galaxyDrift1 32s ease-in-out infinite reverse',
          willChange: 'transform',
        }}
      />

      {/* Distant Star Dust Stream / Milky Way Diagonal Band */}
      <div
        style={{
          position: 'absolute',
          width: '140%',
          height: '240px',
          top: '35%',
          left: '-20%',
          transform: 'rotate(-16deg)',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 180, 255, 0.12) 30%, rgba(130, 220, 255, 0.18) 50%, rgba(0, 130, 255, 0.12) 70%, transparent 100%)',
          filter: 'blur(45px)',
          opacity: 0.85,
        }}
      />

      {/* Twinkling Galaxy Stars */}
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
            backgroundColor: idx % 3 === 0 ? '#bbf2ff' : '#ffffff',
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2.5}px ${idx % 3 === 0 ? 'rgba(0, 220, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)'}`,
            animation: `starBlink ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
