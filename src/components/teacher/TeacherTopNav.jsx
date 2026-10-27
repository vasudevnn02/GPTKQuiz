import React from 'react';
import { LogOutIcon, AwardIcon, BookOpenIcon, ClockIcon } from '../icons/SvgIcons.jsx';

export default function TeacherTopNav({ admin, activeTab, onSelectTab, onLogout }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard',     icon: ClockIcon    },
    { id: 'questions', label: 'Question Bank', icon: BookOpenIcon },
    { id: 'results',   label: 'Results',       icon: AwardIcon    },
  ];

  return (
    <header style={{
      background: 'rgba(7, 14, 28, 0.65)',
      backdropFilter: 'blur(28px) saturate(180%)',
      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', position: 'sticky', top: 0, zIndex: 50,
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
    }}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        <span style={{ fontSize:'20px', fontWeight:800, color:'#ffffff', letterSpacing:'-0.4px' }}>GPTK Quiz</span>
        <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.85)', background:'rgba(255, 255, 255, 0.1)', border:'1px solid rgba(255, 255, 255, 0.18)', padding:'3px 9px', borderRadius:'10px', textTransform:'uppercase', letterSpacing:'0.6px', fontWeight:700 }}>
          TEACHER
        </span>
      </div>

      {/* Tabs matching screenshot 2 */}
      <div style={{
        display:'flex',
        background:'rgba(10, 22, 48, 0.65)',
        backdropFilter:'blur(20px)',
        borderRadius:'22px',
        padding:'4px',
        border:'1px solid rgba(255, 255, 255, 0.15)',
        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.3)'
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const on = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => onSelectTab(tab.id)} style={{
              display:'flex', alignItems:'center', gap:'8px',
              padding:'8px 18px', borderRadius:'18px', fontSize:'13px',
              fontWeight: on ? 700 : 500,
              background: on ? 'rgba(38, 62, 105, 0.75)' : 'transparent',
              color: on ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
              border: on ? '1px solid rgba(255, 255, 255, 0.28)' : '1px solid transparent',
              boxShadow: on ? 'inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 2px 8px rgba(0,0,0,0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}>
              <Icon size={14} color={on ? '#ffffff' : 'rgba(255,255,255,0.65)'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right */}
      <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
        <div style={{ fontSize:'12px', color:'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>{admin?.email}</div>
        <button onClick={onLogout} style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          color: '#ffffff',
          padding:'7px 14px', borderRadius:'10px',
          display:'flex', alignItems:'center', gap:'6px', fontSize:'12px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
        }}>
          <LogOutIcon size={13} color="rgba(255,255,255,0.9)" />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
