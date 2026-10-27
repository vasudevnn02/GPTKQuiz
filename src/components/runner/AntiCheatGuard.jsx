import React, { useEffect } from 'react';
import { ShieldIcon } from '../icons/SvgIcons.jsx';

export default function AntiCheatGuard({ onViolation }) {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && ['c', 'v', 'u', 's', 'p'].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
        onViolation('Disallowed key combination detected');
      }
    };
    const handleVisibility = () => {
      if (document.hidden) onViolation('Candidate navigated away from the exam tab');
    };
    const handleBlur = () => onViolation('Browser window focus lost');
    const handleFullscreen = () => {
      if (!document.fullscreenElement) onViolation('Exited mandatory full-screen mode');
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('fullscreenchange', handleFullscreen);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('fullscreenchange', handleFullscreen);
    };
  }, [onViolation]);

  const requestFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldIcon size={14} color="#0a84ff" />
        <span>GPTK Proctor Integrity Monitor Active • Full-Screen Lockdown Monitored</span>
      </div>
      <button
        onClick={requestFullscreen}
        style={{ background: 'rgba(10, 132, 255, 0.15)', border: '1px solid rgba(10, 132, 255, 0.3)', color: '#0a84ff', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}
      >
        Lock Fullscreen
      </button>
    </div>
  );
}
