import React from 'react';
import { PlayIcon, ClockIcon, AwardIcon, ShieldIcon } from '../icons/SvgIcons.jsx';
import { glassInner } from '../../glass.js';

export default function StudentSidebar({ activeTab, onSelectTab }) {
  const items = [
    { id: 'live', label: 'Live Exams (10-5)', icon: PlayIcon },
    { id: 'upcoming', label: 'Upcoming Schedule', icon: ClockIcon },
    { id: 'results', label: 'My Scores & History', icon: AwardIcon },
    { id: 'rules', label: 'Honor Code & Rules', icon: ShieldIcon },
  ];

  return (
    <aside style={{
      width: '240px',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '24px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      flexShrink: 0
    }}>
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
              fontWeight: isActive ? 800 : 600,
              color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
              background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              border: isActive ? '1px solid rgba(255, 255, 255, 0.28)' : '1px solid transparent',
              boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)' : 'none',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon size={14} color="rgba(255,255,255,0.98)" />
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}

      <div style={{ marginTop: 'auto', padding: '16px', ...glassInner, borderRadius: '16px' }}>
        <div style={{ fontSize: '10px', color: '#ffffff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '5px' }}>
          Proctored System
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)', lineHeight: '1.5' }}>
          Lockdown & instant Firebase real-time verification active.
        </div>
      </div>
    </aside>
  );
}
