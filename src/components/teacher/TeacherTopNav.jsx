import React from 'react';
import { LogOutIcon, AwardIcon, BookOpenIcon, ClockIcon } from '../icons/SvgIcons.jsx';

export default function TeacherTopNav({ admin, activeTab, onSelectTab, onLogout }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: ClockIcon },
    { id: 'questions', label: 'Question Bank', icon: BookOpenIcon },
    { id: 'results', label: 'Results', icon: AwardIcon },
  ];

  return (
    <header style={{
      height: '64px',
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(48px) saturate(200%)',
      WebkitBackdropFilter: 'blur(48px) saturate(200%)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', position: 'sticky', top: 0, zIndex: 40,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(255,255,255,0.06)'
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        <span style={{ fontSize:'19px', fontWeight:800, color:'#fff', letterSpacing:'-0.3px' }}>GPTK Quiz</span>
        <span style={{ fontSize:'10px', color:'rgba(190,220,255,0.85)', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)', padding:'2px 8px', borderRadius:'10px', textTransform:'uppercase', letterSpacing:'0.6px', fontWeight:700 }}>
          TEACHER
        </span>
      </div>

      <div style={{ display:'flex', background:'rgba(255,255,255,0.04)', borderRadius:'14px', padding:'4px', border:'1px solid rgba(255,255,255,0.08)' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              style={{
                display:'flex', alignItems:'center', gap:'7px',
                padding:'7px 16px', borderRadius:'10px', fontSize:'13px',
                fontWeight: isActive ? 700 : 500,
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(200,220,255,0.55)',
                border: isActive ? '1px solid rgba(255,255,255,0.16)' : '1px solid transparent',
                boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)' : 'none',
              }}
            >
              <Icon size={14} color={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(200,220,255,0.5)'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
        <div style={{ fontSize:'12px', color:'rgba(200,220,255,0.45)' }}>{admin?.email}</div>
        <button
          onClick={onLogout}
          style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,220,255,0.7)', padding:'6px 14px', borderRadius:'10px', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px' }}
        >
          <LogOutIcon size={13} /><span>Exit</span>
        </button>
      </div>
    </header>
  );
}
