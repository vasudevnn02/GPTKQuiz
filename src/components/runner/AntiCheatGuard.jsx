import React, { useEffect } from 'react';
import { AlertTriangleIcon, ShieldIcon } from '../icons/SvgIcons.jsx';

export default function AntiCheatGuard({ onViolation, violationCount }) {
  useEffect(() => {
    // Prevent Context Menu
    const handleContextMenu = (e) => e.preventDefault();

    // Prevent DevTools & Copy-Paste Shortcuts
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

    // Tab Switch / Visibility Change
    const handleVisibility = () => {
      if (document.hidden) {
        onViolation('Candidate navigated away from the exam tab');
      }
    };

    // Window Blur
    const handleBlur = () => {
      onViolation('Browser window focus lost');
    };

    // Fullscreen Exit
    const handleFullscreen = () => {
      if (!document.fullscreenElement) {
        onViolation('Exited mandatory full-screen mode');
      }
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
    <div style={{ background: '#121212', borderBottom: '1px solid #272727', padding: '6px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#aaaaaa' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldIcon size={14} color="#3ea6ff" />
        <span>GPTK Proctor Integrity Monitor Active • Anti-Cheat Enforcement Enabled</span>
      </div>
      <button
        onClick={requestFullscreen}
        style={{ background: '#272727', color: '#3ea6ff', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}
      >
        Lock Fullscreen
      </button>
    </div>
  );
}
