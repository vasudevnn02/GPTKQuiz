import React from 'react';
import { AwardIcon, CheckCircleIcon, AlertTriangleIcon } from '../icons/SvgIcons.jsx';

export default function StudentScoreboard({ results = {} }) {
  const resultList = Object.values(results);

  return (
    <div>
      <div style={{ marginBottom: '22px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#30d158' }}><AwardIcon size={20} /></span>
          <span>Student Scoreboard & Integrity Records</span>
        </h3>
        <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '4px' }}>
          Real-time candidate submissions synchronized via Firebase engine.
        </p>
      </div>

      {resultList.length === 0 ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(30px) saturate(190%)',
          WebkitBackdropFilter: 'blur(30px) saturate(190%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          padding: '48px 24px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
        }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'rgba(255, 255, 255, 0.4)' }}>
            <AwardIcon size={26} />
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)' }}>
            No candidate submissions yet
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)', marginTop: '4px' }}>
            When students submit their assessments, their scores and integrity logs appear here instantly.
          </div>
        </div>
      ) : (
        <div style={{
          overflowX: 'auto',
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(30px) saturate(190%)',
          WebkitBackdropFilter: 'blur(30px) saturate(190%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.03)', color: 'rgba(255, 255, 255, 0.55)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                <th style={{ padding: '14px 20px' }}>Register No</th>
                <th style={{ padding: '14px 20px' }}>Student Name</th>
                <th style={{ padding: '14px 20px' }}>Score</th>
                <th style={{ padding: '14px 20px' }}>Percentage</th>
                <th style={{ padding: '14px 20px' }}>Proctor Integrity</th>
                <th style={{ padding: '14px 20px' }}>Submission Time</th>
              </tr>
            </thead>
            <tbody>
              {resultList.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', color: '#ffffff' }}>
                  <td style={{ padding: '14px 20px', color: '#ffffff', fontWeight: 600 }}>{r.rollNo}</td>
                  <td style={{ padding: '14px 20px', fontWeight: 600 }}>{r.studentName}</td>
                  <td style={{ padding: '14px 20px' }}>{r.score} / {r.total}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontWeight: 700, color: r.percentage >= 60 ? '#30d158' : '#ff453a' }}>
                      {r.percentage}%
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 8px', borderRadius: '8px', background: r.violations === 0 ? 'rgba(48, 209, 88, 0.15)' : 'rgba(255, 159, 10, 0.15)', color: r.violations === 0 ? '#30d158' : '#ff9f0a', fontSize: '11px', fontWeight: 600 }}>
                      {r.violations === 0 ? <CheckCircleIcon size={13} /> : <AlertTriangleIcon size={13} />}
                      <span>{r.violations === 0 ? 'Clean Record' : `${r.violations} Alert${r.violations > 1 ? 's' : ''}`}</span>
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)' }}>
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
