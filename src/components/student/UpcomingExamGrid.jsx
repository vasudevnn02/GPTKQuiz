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
      <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#f1f1f1', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <ClockIcon size={18} color="#3ea6ff" />
        <span>Upcoming Examination Schedule</span>
      </h2>
      <p style={{ fontSize: '12px', color: '#aaaaaa', marginBottom: '20px' }}>
        Check scheduled window times for upcoming department assessments.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {upcomingList.map((item) => (
          <div key={item.id} style={{ background: '#212121', border: '1px solid #272727', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#3ea6ff', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                {item.department}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#f1f1f1', marginBottom: '4px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '12px', color: '#aaaaaa', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ClockIcon size={13} />
                <span>{item.date}</span>
              </div>
            </div>
            <div style={{ background: '#121212', border: '1px solid #272727', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', color: '#aaaaaa', fontWeight: 600 }}>
              {item.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
