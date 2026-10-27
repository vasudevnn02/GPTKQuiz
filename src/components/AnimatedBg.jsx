import React, { useMemo } from 'react';

// Ethereal monochrome / white starlight & glowing pearl orbs background
// Drifts gently behind the frosted glass cards with zero blue tint.
export default function AnimatedBg() {
  // Generate random static/subtle twinkling stardust particles
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 48; i++) {
      arr.push({
        top: `${(i * 17 + 23) % 100}%`,
        left: `${(i * 29 + 11) % 100}%`,
        size: (i % 3 === 0 ? 2.5 : i % 2 === 0 ? 2 : 1.2),
        opacity: 0.25 + ((i % 5) * 0.15),
        duration: 3 + (i % 4) * 2,
      });
    }
    return arr;
  }, []);

  const orbs = [
    // Soft pearl white luminous sphere — top left
    {
      width: '640px', height: '640px',
      top: '-140px', left: '-120px',
      background: 'radial-gradient(circle at 45% 45%, rgba(255, 255, 255, 0.22) 0%, rgba(240, 245, 255, 0.08) 45%, transparent 70%)',
      animation: 'blob1 20s ease-in-out infinite',
      filter: 'blur(75px)',
    },
    // Silvery moonlit orb — top right
    {
      width: '580px', height: '580px',
      top: '-80px', right: '-100px',
      background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.18) 0%, rgba(235, 240, 250, 0.07) 40%, transparent 68%)',
      animation: 'blob2 24s ease-in-out infinite',
      filter: 'blur(80px)',
    },
    // Soft luminous white center aura
    {
      width: '760px', height: '760px',
      top: '32%', left: '22%',
      background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.14) 0%, rgba(230, 235, 245, 0.05) 45%, transparent 70%)',
      animation: 'blob3 28s ease-in-out infinite',
      filter: 'blur(90px)',
    },
    // Lower left soft white caustic
    {
      width: '520px', height: '520px',
      bottom: '-60px', left: '8%',
      background: 'radial-gradient(circle at 45% 55%, rgba(255, 255, 255, 0.17) 0%, rgba(240, 240, 250, 0.06) 42%, transparent 65%)',
      animation: 'blob4 22s ease-in-out infinite',
      filter: 'blur(75px)',
    },
    // Lower right silver orb
    {
      width: '560px', height: '560px',
      bottom: '-100px', right: '4%',
      background: 'radial-gradient(circle at 55% 50%, rgba(255, 255, 255, 0.16) 0%, rgba(235, 235, 245, 0.05) 40%, transparent 68%)',
      animation: 'blob5 26s ease-in-out infinite',
      filter: 'blur(85px)',
    },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      overflow: 'hidden', pointerEvents: 'none',
      background: '#07080b',
    }}>
      {/* Drifting soft white glowing pearl orbs */}
      {orbs.map((o, i) => (
        <div
          key={`orb-${i}`}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            willChange: 'transform',
            ...o,
          }}
        />
      ))}

      {/* Subtle white stardust / starry specks */}
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
            backgroundColor: '#ffffff',
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2}px rgba(255, 255, 255, 0.8)`,
            animation: `starPulse ${s.duration}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
