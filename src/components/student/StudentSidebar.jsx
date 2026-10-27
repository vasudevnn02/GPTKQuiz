import React from 'react';
import { PlayIcon, ClockIcon, AwardIcon, ShieldIcon } from '../icons/SvgIcons.jsx';

export default function StudentSidebar({ activeTab, onSelectTab }) {
  const items = [
    { id: 'live', label: 'Live Exams (10-5)', icon: PlayIcon },
    { id: 'upcoming', label: 'Upcoming Schedule', icon: ClockIcon },
    { id: 'results', label: 'My Scores & History', icon: AwardIcon },
    { id: 'rules', label: 'Honor Code & Rules', icon: ShieldIcon },
  ];

  return (
    <aside style={{ width: '220px', background: '#0f0f0f', borderRight: '1px solid #272727', padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#f1f1f1' : '#aaaaaa',
              background: isActive ? '#272727' : 'transparent',
              textAlign: 'left',
              width: '100%',
              transition: 'background 0.15s ease'
            }}
          >
            <span style={{ color: isActive ? '#ff0000' : 'inherit' }}>
              <Icon size={18} />
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}

      <div style={{ marginTop: 'auto', padding: '12px', background: '#181818', borderRadius: '8px', border: '1px solid #222222' }}>
        <div style={{ fontSize: '11px', color: '#3ea6ff', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
          Proctored System
        </div>
        <div style={{ fontSize: '11px', color: '#717171', lineHeight: '1.4' }}>
          Full-screen locked & real-time sync monitored by GPTK engine.
        </div>
      </div>
    </aside>
  );
}
