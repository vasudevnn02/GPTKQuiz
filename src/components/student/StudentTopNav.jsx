import React from 'react';
import { SearchIcon, LogOutIcon } from '../icons/SvgIcons.jsx';

export default function StudentTopNav({ user, onLogout, searchQuery, setSearchQuery }) {
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'S';

  return (
    <header style={{ height: '58px', background: 'rgba(18, 21, 30, 0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>GPTK Quiz</span>
        <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)', background: 'rgba(255, 255, 255, 0.08)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>STUDENT</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', maxWidth: '400px', width: '100%', margin: '0 20px', position: 'relative' }}>
        <input
          type="text"
          value={searchQuery || ''}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          placeholder="Search assessments..."
          style={{ width: '100%', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px 0 0 20px', padding: '8px 16px', fontSize: '13px', color: '#ffffff' }}
        />
        <button style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)', borderLeft: 'none', borderRadius: '0 20px 20px 0', padding: '8px 18px', color: 'rgba(255, 255, 255, 0.6)' }}>
          <SearchIcon size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>{user?.name || 'Student'}</div>
            <div style={{ fontSize: '11px', color: '#60a5fa', fontFamily: 'monospace' }}>{user?.rollNo}</div>
          </div>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            {initial}
          </div>
        </div>

        <button
          onClick={onLogout}
          title="Sign Out"
          style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.7)', padding: '7px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
        >
          <LogOutIcon size={14} />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
