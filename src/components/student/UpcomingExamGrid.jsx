import React from 'react';
import { ClockIcon } from '../icons/SvgIcons.jsx';

export default function UpcomingExamGrid() {
  const upcomingList = [
    {
      id: 'up_01',
      title: 'Database Management Systems (DBMS) - SQL & Normalization',
      date: 'Tomorrow, 10:00 AM – 05:00 PM',
      duration: '20 Mins',
      department: 'Computer Science and Engineering'
    },
    {
      id: 'up_02',
      title: 'Operating Systems - Process Scheduling & Deadlocks',
      date: 'Friday, 10:00 AM – 05:00 PM',
      duration: '15 Mins',
      department: 'Computer Science and Engineering'
    }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <span style={{ color: '#0a84ff' }}><ClockIcon size={22} /></span>
        <span>Scheduled Examination Roster</span>
      </h2>
      <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginBottom: '22px' }}>
        Upcoming window timetable for department academic evaluations.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {upcomingList.map((item) => (
          <div key={item.id} style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
            backdropFilter: 'blur(28px) saturate(190%)',
            WebkitBackdropFilter: 'blur(28px) saturate(190%)',
            border: '1px solid rgba(255, 255, 255, 0.28)',
            boxShadow: '0 20px 48px rgba(0,0,0,0.38), inset 0 1.5px 1px 0 rgba(255,255,255,0.65), inset 0 -1px 1px 0 rgba(255,255,255,0.12)',
            borderRadius: '24px',
            padding: '22px 26px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#0a84ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
                {item.department}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ClockIcon size={14} />
                <span>{item.date}</span>
              </div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '6px 14px', borderRadius: '10px', fontSize: '12px', color: '#ffffff', fontWeight: 600 }}>
              {item.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
