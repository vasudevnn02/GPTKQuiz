import React from 'react';

// Soft, luminous light-white / alabaster ambient aurora background
export default function AnimatedBg() {
  const blobs = [
    // Luminous pearlescent silk glow — top left
    {
      width: '680px', height: '680px',
      top: '-150px', left: '-120px',
      background: 'radial-gradient(circle at 45% 45%, #ffffff 0%, #e2e8f0 35%, transparent 70%)',
      animation: 'blob1 22s ease-in-out infinite',
      filter: 'blur(70px)',
      opacity: 0.85,
    },
    // Soft silver-white glow — top right
    {
      width: '620px', height: '620px',
      top: '-100px', right: '-80px',
      background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #edf2f7 40%, transparent 68%)',
      animation: 'blob2 26s ease-in-out infinite',
      filter: 'blur(75px)',
      opacity: 0.9,
    },
    // Center alabaster luminous circle
    {
      width: '750px', height: '750px',
      top: '30%', left: '25%',
      background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #e8edf3 45%, transparent 70%)',
      animation: 'blob3 30s ease-in-out infinite',
      filter: 'blur(80px)',
      opacity: 0.75,
    },
    // Bottom left soft luminous light
    {
      width: '580px', height: '580px',
      bottom: '-80px', left: '6%',
      background: 'radial-gradient(circle at 45% 55%, #ffffff 0%, #e5e9f0 40%, transparent 65%)',
      animation: 'blob4 24s ease-in-out infinite',
      filter: 'blur(70px)',
      opacity: 0.85,
    },
    // Bottom right pearl white light
    {
      width: '600px', height: '600px',
      bottom: '-120px', right: '4%',
      background: 'radial-gradient(circle at 55% 50%, #ffffff 0%, #edf2f7 38%, transparent 68%)',
      animation: 'blob5 28s ease-in-out infinite',
      filter: 'blur(75px)',
      opacity: 0.85,
    },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      overflow: 'hidden', pointerEvents: 'none',
      background: 'linear-gradient(135deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%)',
    }}>
      {blobs.map((b, i) => (
        <div
          key={`blob-${i}`}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            willChange: 'transform',
            ...b,
          }}
        />
      ))}
    </div>
  );
}
