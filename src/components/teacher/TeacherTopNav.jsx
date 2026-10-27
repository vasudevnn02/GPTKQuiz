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
      background: 'rgba(8, 20, 60, 0.65)',
      backdropFilter: 'blur(40px) saturate(180%)',
      WebkitBackdropFilter: 'blur(40px) saturate(180%)',
      borderBottom: '1px solid rgba(96, 165, 250, 0.18)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', position: 'sticky', top: 0, zIndex: 40,
      boxShadow: '0 8px 30px rgba(0, 0, 20, 0.4)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '19px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>GPTK Quiz</span>
        <span style={{ fontSize: '10px', color: 'rgba(150,210,255,0.9)', background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(96,165,250,0.35)', padding: '2px 8px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 700 }}>
          TEACHER
        </span>
      </div>

      <div style={{ display: 'flex', background: 'rgba(10,25,70,0.5)', borderRadius: '14px', padding: '4px', border: '1px solid rgba(96,165,250,0.15)' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '7px 16px', borderRadius: '10px', fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                background: isActive ? 'rgba(37,99,235,0.4)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(150,190,255,0.65)',
                border: isActive ? '1px solid rgba(96,165,250,0.35)' : '1px solid transparent',
                boxShadow: isActive ? '0 4px 14px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.15)' : 'none',
              }}
            >
              <Icon size={14} color={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(150,190,255,0.6)'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ fontSize: '12px', color: 'rgba(150,190,255,0.6)' }}>{admin?.email}</div>
        <button
          onClick={onLogout}
          style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(96,165,250,0.25)', color: 'rgba(190,220,255,0.8)', padding: '6px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
        >
          <LogOutIcon size={13} /><span>Exit</span>
        </button>
      </div>
    </header>
  );
}
