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
      height: '62px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>GPTK Quiz</span>
        <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.75)', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.18)', padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>STUDENT</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', maxWidth: '380px', width: '100%', margin: '0 20px', position: 'relative' }}>
        <input
          type="text"
          value={searchQuery || ''}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          placeholder="Search assessments..."
          style={{ width: '100%', paddingRight: '42px' }}
        />
        <span style={{ position: 'absolute', right: '14px', color: 'rgba(255, 255, 255, 0.45)', pointerEvents: 'none' }}>
          <SearchIcon size={16} />
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>{user?.name || 'Student'}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>{user?.rollNo}</div>
          </div>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.12)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', border: '1px solid rgba(255, 255, 255, 0.25)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }}>
            {initial}
          </div>
        </div>

        <button
          onClick={onLogout}
          title="Sign Out"
          style={{ ...glassBtn, padding: '6px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
        >
          <LogOutIcon size={13} />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
