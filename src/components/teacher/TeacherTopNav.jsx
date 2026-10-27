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
        <span style={{ fontSize:'20px', fontWeight:800, color:'#0f172a', letterSpacing:'-0.4px' }}>GPTK Quiz</span>
        <span style={{ fontSize:'10px', color:'#0f172a', background:'rgba(255, 255, 255, 0.75)', border:'1px solid rgba(255, 255, 255, 0.95)', padding:'3px 9px', borderRadius:'10px', textTransform:'uppercase', letterSpacing:'0.6px', fontWeight:700, boxShadow:'0 2px 6px rgba(0,0,0,0.03)' }}>
          TEACHER
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', background:'rgba(0, 0, 0, 0.04)', borderRadius:'14px', padding:'4px', border:'1px solid rgba(255,255,255,0.8)', backdropFilter:'blur(20px)' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const on = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => onSelectTab(tab.id)} style={{
              display:'flex', alignItems:'center', gap:'7px',
              padding:'7px 16px', borderRadius:'10px', fontSize:'13px',
              fontWeight: on ? 700 : 500,
              background: on ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
              color: on ? '#0f172a' : 'rgba(15, 23, 42, 0.6)',
              border: on ? '1px solid rgba(255, 255, 255, 1)' : '1px solid transparent',
              boxShadow: on ? '0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)' : 'none',
            }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={13} color="rgba(255,255,255,0.95)" />
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right */}
      <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
        <div style={{ fontSize:'12px', color:'rgba(15, 23, 42, 0.65)', fontWeight: 500 }}>{admin?.email}</div>
        <button onClick={onLogout} style={{ ...glassBtn, padding:'7px 14px', borderRadius:'10px', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogOutIcon size={11} color="rgba(255,255,255,0.95)" />
          </div>
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
