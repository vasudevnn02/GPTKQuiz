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
        <span style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>GPTK Quiz</span>
        <span style={{ fontSize: '10px', color: '#ffffff', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.22)', padding: '3px 9px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 700 }}>STUDENT</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', maxWidth: '380px', width: '100%', margin: '0 20px', position: 'relative' }}>
        <input
          type="text"
          value={searchQuery || ''}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          placeholder="Search assessments..."
          style={{ width: '100%', paddingRight: '42px' }}
        />
        <span style={{ position: 'absolute', right: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <SearchIcon size={16} color="rgba(255,255,255,0.6)" />
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{user?.name || 'Student'}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)' }}>{user?.rollNo}</div>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)' }}>
            {initial}
          </div>
        </div>

        <button
          onClick={onLogout}
          title="Sign Out"
          style={{ ...glassBtn, padding: '7px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
        >
          <LogOutIcon size={13} color="rgba(255,255,255,0.95)" />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
