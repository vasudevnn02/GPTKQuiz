import React from 'react';
import { LogOutIcon, AwardIcon, BookOpenIcon, ClockIcon } from '../icons/SvgIcons.jsx';
import { glass, glassBtn } from '../../glass.js';

export default function TeacherTopNav({ admin, activeTab, onSelectTab, onLogout }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard',     icon: ClockIcon    },
    { id: 'questions', label: 'Question Bank', icon: BookOpenIcon },
    { id: 'results',   label: 'Results',       icon: AwardIcon    },
  ];

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
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        <span style={{ fontSize:'20px', fontWeight:800, color:'#ffffff', letterSpacing:'-0.4px' }}>GPTK Quiz</span>
        <span style={{ fontSize:'10px', color:'#ffffff', background:'rgba(255, 255, 255, 0.12)', border:'1px solid rgba(255, 255, 255, 0.22)', padding:'3px 9px', borderRadius:'10px', textTransform:'uppercase', letterSpacing:'0.6px', fontWeight:700 }}>
          TEACHER
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', background:'rgba(0, 0, 0, 0.35)', borderRadius:'14px', padding:'4px', border:'1px solid rgba(255,255,255,0.12)', backdropFilter:'blur(20px)' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const on = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => onSelectTab(tab.id)} style={{
              display:'flex', alignItems:'center', gap:'7px',
              padding:'7px 16px', borderRadius:'10px', fontSize:'13px',
              fontWeight: on ? 700 : 500,
              background: on ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
              color: on ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
              border: on ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
              boxShadow: on ? '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.35)' : 'none',
            }}>
              <Icon size={14} color={on ? '#ffffff' : 'rgba(255,255,255,0.7)'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right */}
      <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
        <div style={{ fontSize:'12px', color:'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>{admin?.email}</div>
        <button onClick={onLogout} style={{ ...glassBtn, padding:'7px 14px', borderRadius:'10px', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px' }}>
          <LogOutIcon size={13} color="rgba(255,255,255,0.95)" />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
