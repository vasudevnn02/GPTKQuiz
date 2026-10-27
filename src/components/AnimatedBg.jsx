import React from 'react';

// Large glowing orbs that drift slowly — glass panels show them through blur
export default function AnimatedBg() {
  const blobs = [
    // bright cobalt — top left
    {
      style: {
        width: '700px', height: '700px',
        top: '-180px', left: '-160px',
        background: 'radial-gradient(circle at 40% 40%, #1a56f5 0%, #1d4ed8 35%, transparent 70%)',
        animation: 'blob1 18s ease-in-out infinite',
        opacity: 0.9,
      }
    },
    // bright electric blue — top right
    {
      style: {
        width: '600px', height: '600px',
        top: '-100px', right: '-120px',
        background: 'radial-gradient(circle at 55% 45%, #3b82f6 0%, #2563eb 30%, transparent 68%)',
        animation: 'blob2 22s ease-in-out infinite',
        opacity: 0.85,
      }
    },
    // deeper navy — center
    {
      style: {
        width: '800px', height: '800px',
        top: '30%', left: '20%',
        background: 'radial-gradient(circle at 50% 50%, #1e40af 0%, #1e3a8a 40%, transparent 70%)',
        animation: 'blob3 26s ease-in-out infinite',
        opacity: 0.7,
      }
    },
    // bright cyan accent — bottom left
    {
      style: {
        width: '500px', height: '500px',
        bottom: '-80px', left: '5%',
        background: 'radial-gradient(circle at 45% 55%, #60a5fa 0%, #2563eb 30%, transparent 65%)',
        animation: 'blob4 20s ease-in-out infinite',
        opacity: 0.75,
      }
    },
    // mid-blue — bottom right
    {
      style: {
        width: '550px', height: '550px',
        bottom: '-120px', right: '0%',
        background: 'radial-gradient(circle at 55% 50%, #3b82f6 0%, #1d4ed8 35%, transparent 68%)',
        animation: 'blob5 24s ease-in-out infinite',
        opacity: 0.8,
      }
    },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      overflow: 'hidden', pointerEvents: 'none',
      background: '#020818',
    }}>
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(80px)',
            willChange: 'transform',
            ...b.style,
          }}
        />
      ))}
    </div>
  );
}
