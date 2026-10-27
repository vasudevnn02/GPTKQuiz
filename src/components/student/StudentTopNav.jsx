import React from 'react';
import { PlayIcon, SearchIcon, LogOutIcon, UserIcon } from '../icons/SvgIcons.jsx';

export default function StudentTopNav({ user, onLogout, searchQuery, setSearchQuery }) {
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'S';

  return (
    <header style={{ height: '56px', background: 'rgba(15, 15, 15, 0.96)', borderBottom: '1px solid #272727', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '22px', background: '#ff0000', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <PlayIcon size={12} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#f1f1f1' }}>GPTK<span style={{ color: '#ff0000' }}>Quiz</span></span>
          <span style={{ fontSize: '11px', color: '#aaaaaa', background: '#272727', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>STUDENT</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', maxWidth: '420px', width: '100%', margin: '0 20px', position: 'relative' }}>
        <input
          type="text"
          value={searchQuery || ''}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          placeholder="Search assessments, subjects..."
          style={{ width: '100%', background: '#121212', border: '1px solid #303030', borderRadius: '20px 0 0 20px', padding: '8px 16px', fontSize: '13px', color: '#f1f1f1' }}
        />
        <button style={{ background: '#222222', border: '1px solid #303030', borderLeft: 'none', borderRadius: '0 20px 20px 0', padding: '8px 18px', color: '#aaaaaa' }}>
          <SearchIcon size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f1f1f1' }}>{user?.name || 'Student'}</div>
            <div style={{ fontSize: '11px', color: '#3ea6ff', fontFamily: 'monospace' }}>{user?.rollNo}</div>
          </div>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#cc0000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>
            {initial}
          </div>
        </div>

        <button
          onClick={onLogout}
          title="Sign Out"
          style={{ background: '#272727', color: '#aaaaaa', padding: '7px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
        >
          <LogOutIcon size={14} />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
