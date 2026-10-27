import React from 'react';
import { SearchIcon, LogOutIcon } from '../icons/SvgIcons.jsx';
import { glass, glassBtn } from '../../glass.js';

export default function StudentTopNav({ user, onLogout, searchQuery, setSearchQuery }) {
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'S';

  return (
    <header style={{
      ...glass,
      borderRadius: 0,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px' }}>GPTK Quiz</span>
        <span style={{ fontSize: '10px', color: '#0f172a', background: 'rgba(255, 255, 255, 0.75)', border: '1px solid rgba(255, 255, 255, 0.95)', padding: '3px 9px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 700 }}>STUDENT</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', maxWidth: '380px', width: '100%', margin: '0 20px', position: 'relative' }}>
        <input
          type="text"
          value={searchQuery || ''}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          placeholder="Search assessments..."
          style={{ width: '100%', paddingRight: '42px' }}
        />
        <span style={{ position: 'absolute', right: '14px', width: '20px', height: '20px', borderRadius: '5px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <SearchIcon size={12} color="rgba(255,255,255,0.95)" />
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{user?.name || 'Student'}</div>
            <div style={{ fontSize: '11px', color: 'rgba(30, 41, 59, 0.55)' }}>{user?.rollNo}</div>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(30,41,59,0.55) 0%, rgba(15,23,42,0.75) 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', border: '1px solid rgba(255, 255, 255, 0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            {initial}
          </div>
        </div>

        <button
          onClick={onLogout}
          title="Sign Out"
          style={{ ...glassBtn, padding: '7px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
        >
          <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogOutIcon size={11} color="rgba(255,255,255,0.95)" />
          </div>
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
