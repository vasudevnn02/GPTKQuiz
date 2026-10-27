import React from 'react';
import { PlayIcon, ClockIcon, AwardIcon, ShieldIcon } from '../icons/SvgIcons.jsx';

export default function StudentSidebar({ activeTab, onSelectTab }) {
  const items = [
    { id: 'live', label: 'Live Exams (10-5)', icon: PlayIcon, color: '#0a84ff' },
    { id: 'upcoming', label: 'Upcoming Schedule', icon: ClockIcon, color: '#ff9f0a' },
    { id: 'results', label: 'My Scores & History', icon: AwardIcon, color: '#30d158' },
    { id: 'rules', label: 'Honor Code & Rules', icon: ShieldIcon, color: '#5e5ce6' },
  ];

  return (
    <aside style={{ width: '230px', background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', borderRight: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
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
              gap: '12px',
              padding: '11px 14px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
              background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)' : 'none',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: isActive ? item.color : 'rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' }}>
              <Icon size={14} color="currentColor" />
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}

      <div style={{ marginTop: 'auto', padding: '14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ fontSize: '11px', color: '#0a84ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
          Proctored System
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', lineHeight: '1.4' }}>
          Lockdown & instant Firebase real-time verification active.
        </div>
      </div>
    </aside>
  );
}
