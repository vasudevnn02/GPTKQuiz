import React from 'react';
import { LogOutIcon, AwardIcon, BookOpenIcon, ClockIcon } from '../icons/SvgIcons.jsx';

export default function TeacherTopNav({ admin, activeTab, onSelectTab, onLogout }) {
  const tabs = [
    { id: 'scoreboard', label: 'Scoreboard', icon: AwardIcon },
    { id: 'questions', label: 'Question Bank', icon: BookOpenIcon },
    { id: 'schedule', label: 'Exam Window', icon: ClockIcon },
  ];

  return (
    <header style={{ height: '64px', background: 'rgba(255, 255, 255, 0.035)', backdropFilter: 'blur(30px) saturate(190%)', WebkitBackdropFilter: 'blur(30px) saturate(190%)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>GPTK Quiz</span>
        <span style={{ fontSize: '10px', color: '#0a84ff', background: 'rgba(10, 132, 255, 0.15)', border: '1px solid rgba(10, 132, 255, 0.3)', padding: '2px 8px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 700 }}>TEACHER</span>
      </div>

      <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '14px', padding: '4px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                background: isActive ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 'none'
              }}
            >
              <Icon size={15} color={isActive ? '#0a84ff' : 'currentColor'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>{admin?.email}</div>
        <button
          onClick={onLogout}
          style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', color: 'rgba(255, 255, 255, 0.75)', padding: '6px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)' }}
        >
          <LogOutIcon size={13} />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
