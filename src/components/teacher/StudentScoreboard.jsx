import React from 'react';
import { AwardIcon, CheckCircleIcon, AlertTriangleIcon } from '../icons/SvgIcons.jsx';

export default function StudentScoreboard({ results = {} }) {
  const resultList = Object.values(results);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f1f1', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AwardIcon size={18} color="#2ba640" />
          <span>Real-Time Student Scoreboard & Integrity Logs</span>
        </h3>
        <p style={{ fontSize: '12px', color: '#aaaaaa' }}>
          Live examination submissions automatically updated from Firebase Realtime Database.
        </p>
      </div>

      {resultList.length === 0 ? (
        <div style={{ background: '#212121', border: '1px solid #272727', borderRadius: '12px', padding: '36px', textAlign: 'center', color: '#aaaaaa' }}>
          No student submissions received yet for this window.
        </div>
      ) : (
        <div style={{ overflowX: 'auto', background: '#212121', border: '1px solid #272727', borderRadius: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #272727', background: '#181818', color: '#aaaaaa', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Roll Number</th>
                <th style={{ padding: '12px 16px' }}>Student Name</th>
                <th style={{ padding: '12px 16px' }}>Score</th>
                <th style={{ padding: '12px 16px' }}>Percentage</th>
                <th style={{ padding: '12px 16px' }}>Proctor Integrity</th>
                <th style={{ padding: '12px 16px' }}>Submission Time</th>
              </tr>
            </thead>
            <tbody>
              {resultList.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #272727', color: '#f1f1f1' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#3ea6ff', fontWeight: 600 }}>
                    {r.rollNo}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{r.studentName}</td>
                  <td style={{ padding: '12px 16px' }}>{r.score} / {r.total}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontWeight: 700, color: r.percentage >= 60 ? '#2ba640' : '#ef4444' }}>
                      {r.percentage}%
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: r.violations === 0 ? '#2ba640' : '#f59e0b', fontSize: '12px' }}>
                      {r.violations === 0 ? <CheckCircleIcon size={14} /> : <AlertTriangleIcon size={14} />}
                      <span>{r.violations === 0 ? 'Clean Record' : `${r.violations} Alert${r.violations > 1 ? 's' : ''}`}</span>
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#aaaaaa' }}>
                    {r.attendedDate} {r.attendedTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
