import React, { useMemo } from 'react';

// Advanced Cinematic Galaxy Moving Background
// Features 3D rotating spiral arms, radiant starburst nebula core,
// drifting cosmic interstellar gas, and multi-depth pulsing starfields.
export default function AnimatedBg() {
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 110; i++) {
      list.push({
        top: `${(i * 17 + 5) % 100}%`,
        left: `${(i * 37 + 11) % 100}%`,
        size: (i % 6 === 0 ? 2.6 : i % 2 === 0 ? 1.7 : 1.1),
        opacity: 0.2 + ((i % 5) * 0.16),
        duration: 2.2 + (i % 5) * 1.6,
        delay: (i % 8) * 0.45,
        color: i % 4 === 0 ? '#99eeff' : i % 7 === 0 ? '#d0f2ff' : '#ffffff',
      });
    }
    return list;
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      overflow: 'hidden', pointerEvents: 'none',
      backgroundColor: '#010206',
    }}>
      {/* 1. Deep Cosmic Void with Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 95% 85% at 50% 28%, #041029 0%, #010614 45%, #000206 100%)',
      }} />

      {/* 2. Main Rotating Galaxy Spiral Arm 1 (Cyan / Electric Sky Blue) */}
      <div
        style={{
          position: 'absolute',
          width: '950px',
          height: '700px',
          top: '2%',
          left: '50%',
          marginLeft: '-475px',
          borderRadius: '50%',
          background: 'conic-gradient(from 180deg at 50% 50%, rgba(0, 220, 255, 0.42) 0deg, rgba(0, 110, 255, 0.35) 90deg, rgba(12, 38, 120, 0.18) 180deg, rgba(0, 200, 255, 0.4) 270deg, rgba(0, 220, 255, 0.42) 360deg)',
          filter: 'blur(70px)',
          animation: 'galaxySpiral1 45s linear infinite',
          willChange: 'transform',
        }}
      />

      {/* 3. Counter-Rotating Galaxy Spiral Arm 2 (Deep Azure / Cobalt Nebula) */}
      <div
        style={{
          position: 'absolute',
          width: '850px',
          height: '620px',
          top: '12%',
          left: '50%',
          marginLeft: '-425px',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg at 50% 50%, rgba(0, 140, 255, 0.4) 0deg, rgba(20, 60, 180, 0.25) 120deg, rgba(0, 230, 255, 0.35) 240deg, rgba(0, 140, 255, 0.4) 360deg)',
          filter: 'blur(80px)',
          animation: 'galaxySpiral2 55s linear infinite',
          willChange: 'transform',
        }}
      />

      {/* 4. Glowing Starburst Galactic Core (Radiant Center Pulse) */}
      <div
        style={{
          position: 'absolute',
          width: '520px',
          height: '520px',
          top: '16%',
          left: '50%',
          marginLeft: '-260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 50%, rgba(200, 250, 255, 0.65) 0%, rgba(0, 210, 255, 0.45) 28%, rgba(0, 100, 255, 0.22) 55%, transparent 72%)',
          filter: 'blur(45px)',
          animation: 'cosmicCoreBreathing 9s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}
      />

      {/* 5. Interstellar Dust Arm (Lower Left to Top Right Diagonal Stream) */}
      <div
        style={{
          position: 'absolute',
          width: '150%',
          height: '300px',
          top: '32%',
          left: '-25%',
          transform: 'rotate(-22deg)',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 210, 255, 0.18) 0%, rgba(0, 120, 255, 0.12) 40%, transparent 75%)',
          filter: 'blur(50px)',
          animation: 'nebulaFloat 18s ease-in-out infinite',
        }}
      />

      {/* 6. Distant Deep Space Cluster (Bottom Corner) */}
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '500px',
          bottom: '-120px',
          right: '-80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 160, 255, 0.3) 0%, rgba(10, 40, 120, 0.2) 45%, transparent 70%)',
          filter: 'blur(75px)',
          animation: 'nebulaFloat 24s ease-in-out infinite alternate',
        }}
      />

      {/* 7. Twinkling Celestial Starfield */}
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
            backgroundColor: s.color,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
            animation: `starTwinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
