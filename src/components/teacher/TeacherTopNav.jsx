import React from 'react';
import { LogOutIcon } from '../icons/SvgIcons.jsx';

export default function TeacherTopNav({ admin, activeTab, onSelectTab, onLogout }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <header style={{
      height: '64px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 4px 24px rgba(0,0,0,0.25)'
    }}>
      {/* 1. Left: Brand Logo & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#ffffff', fontWeight: 800, fontSize: '13px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'
        }}>
          G
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>GPTK</span>
          <span style={{ fontSize: '19px', fontWeight: 800, color: '#38bdf8', letterSpacing: '-0.3px' }}>Quiz</span>
        </div>
      </div>

      {/* 2. Center: Live Date & Time Stamp Badge */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        borderRadius: '12px',
        padding: '7px 16px',
        fontSize: '12px',
        fontWeight: 600,
        color: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
      }}>
        <span>📅</span>
        <span>{dateStr} • {timeStr}</span>
      </div>

      {/* 3. Right: Lecturer / Faculty Tag & Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          background: 'rgba(56, 189, 248, 0.15)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '12px',
          padding: '7px 14px',
          fontSize: '12px',
          fontWeight: 700,
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
        }}>
          <span>👤</span>
          <span>Lecturer: {admin?.name || 'Faculty Administrator'}</span>
        </div>

        <button
          onClick={onLogout}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            borderRadius: '12px',
            padding: '7px 14px',
            fontSize: '12px',
            fontWeight: 700,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
            transition: 'all 0.15s ease'
          }}
        >
          <LogOutIcon size={13} color="#ffffff" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
