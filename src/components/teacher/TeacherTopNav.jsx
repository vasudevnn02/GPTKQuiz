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
      height: '62px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', position: 'sticky', top: 0, zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        <span style={{ fontSize:'19px', fontWeight:800, color:'#fff', letterSpacing:'-0.4px' }}>GPTK Quiz</span>
        <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.75)', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', padding:'2px 8px', borderRadius:'10px', textTransform:'uppercase', letterSpacing:'0.6px', fontWeight:700 }}>
          TEACHER
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', background:'rgba(0,0,0,0.2)', borderRadius:'14px', padding:'4px', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(20px)' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const on = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => onSelectTab(tab.id)} style={{
              display:'flex', alignItems:'center', gap:'7px',
              padding:'7px 16px', borderRadius:'10px', fontSize:'13px',
              fontWeight: on ? 700 : 500,
              background: on ? 'rgba(255,255,255,0.14)' : 'transparent',
              color: on ? '#fff' : 'rgba(255,255,255,0.5)',
              border: on ? '1px solid rgba(255,255,255,0.22)' : '1px solid transparent',
              boxShadow: on ? 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.3)' : 'none',
            }}>
              <Icon size={14} color={on ? '#fff' : 'rgba(255,255,255,0.5)'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right */}
      <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
        <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.38)' }}>{admin?.email}</div>
        <button onClick={onLogout} style={{ ...glassBtn, padding:'6px 14px', borderRadius:'10px', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px' }}>
          <LogOutIcon size={13} /><span>Exit</span>
        </button>
      </div>
    </header>
  );
}
