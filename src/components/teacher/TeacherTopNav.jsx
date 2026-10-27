import React from 'react';
import { ShieldIcon, LogOutIcon, AwardIcon, BookOpenIcon, ClockIcon } from '../icons/SvgIcons.jsx';

export default function TeacherTopNav({ admin, activeTab, onSelectTab, onLogout }) {
  const tabs = [
    { id: 'scoreboard', label: 'Student Scoreboard', icon: AwardIcon },
    { id: 'questions', label: 'Question Bank', icon: BookOpenIcon },
    { id: 'schedule', label: 'Exam Window (10-5)', icon: ClockIcon },
  ];

  return (
    <header style={{ height: '56px', background: '#181818', borderBottom: '1px solid #272727', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '32px', height: '22px', background: '#3ea6ff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f0f0f' }}>
          <ShieldIcon size={14} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '17px', fontWeight: 800, color: '#f1f1f1' }}>GPTK<span style={{ color: '#3ea6ff' }}>Studio</span></span>
          <span style={{ fontSize: '11px', color: '#3ea6ff', background: '#1e3a5f', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>TEACHER</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
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
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                background: isActive ? '#272727' : 'transparent',
                color: isActive ? '#3ea6ff' : '#aaaaaa'
              }}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ fontSize: '12px', color: '#aaaaaa' }}>{admin?.email}</div>
        <button
          onClick={onLogout}
          style={{ background: '#272727', color: '#aaaaaa', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
        >
          <LogOutIcon size={13} />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
