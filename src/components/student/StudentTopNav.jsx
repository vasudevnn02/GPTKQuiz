import React from 'react';
import { LogOutIcon } from '../icons/SvgIcons.jsx';
import { glass, glassBtn } from '../../glass.js';

const TABS = [
  { id: 'live',     label: '🎯  Exam Center' },
  { id: 'upcoming', label: '📅  Upcoming Tests' },
  { id: 'results',  label: '🏆  My Results' },
];

export default function StudentTopNav({ user, onLogout, activeTab, onSelectTab }) {
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'S';

  return (
    <header className="liqglass" style={{
      borderRadius: 0,
      position: 'sticky',
      top: 0,
      zIndex: 50,
      animation: 'none',
    }}>
      {/* ── ROW 1: Brand + User + Exit ── */}
      <div style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>GPTK Quiz</span>
          <span style={{
            fontSize: '10px', color: '#ffffff',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.22)',
            padding: '3px 9px', borderRadius: '10px',
            textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 700
          }}>STUDENT</span>
        </div>

        {/* User + Exit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{user?.name || 'Student'}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>{user?.rollNo}</div>
            </div>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(56,189,248,0.25)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '14px',
              border: '1px solid rgba(56,189,248,0.5)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'
            }}>
              {initial}
            </div>
          </div>
          <button onClick={onLogout} style={{
            ...glassBtn, padding: '7px 14px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px'
          }}>
            <LogOutIcon size={13} color="rgba(255,255,255,0.95)" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* ── ROW 2: Tab Snackbar ── */}
      <div style={{
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 28px',
        gap: '6px',
      }}>
        <div style={{
          display: 'inline-flex',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '16px',
          padding: '4px',
          gap: '4px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                style={{
                  padding: '7px 22px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(56,189,248,0.35) 0%, rgba(2,132,199,0.35) 100%)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(56,189,248,0.5)'
                    : '1px solid transparent',
                  boxShadow: isActive ? '0 2px 12px rgba(56,189,248,0.25), inset 0 1px 0 rgba(255,255,255,0.25)' : 'none',
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.2px',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
