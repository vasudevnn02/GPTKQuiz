import React from 'react';
import { AwardIcon, CheckCircleIcon, AlertTriangleIcon } from '../icons/SvgIcons.jsx';
import { glassDeep } from '../../glass.js';

export default function StudentScoreboard({ results = {} }) {
  const resultList = Object.values(results);

  return (
    <div>
      <div style={{ marginBottom: '22px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, rgba(30,41,59,0.55) 0%, rgba(15,23,42,0.75) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AwardIcon size={16} color="rgba(255,255,255,0.98)" />
          </div>
          <span>Student Scoreboard & Integrity Records</span>
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(30, 41, 59, 0.65)', marginTop: '4px' }}>
          Real-time candidate submissions synchronized via Firebase engine.
        </p>
      </div>

      {resultList.length === 0 ? (
        <div style={{
          ...glassDeep,
          borderRadius: '24px',
          padding: '52px 24px',
          textAlign: 'center',
        }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'linear-gradient(135deg, rgba(30,41,59,0.55) 0%, rgba(15,23,42,0.75) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <AwardIcon size={26} color="rgba(255,255,255,0.98)" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
            No candidate submissions yet
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(30, 41, 59, 0.6)', marginTop: '4px' }}>
            When students submit their assessments, their scores and integrity logs appear here instantly.
          </div>
        </div>
      ) : (
        <div style={{
          overflowX: 'auto',
          ...glassDeep,
          borderRadius: '24px',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.8)', background: 'rgba(255, 255, 255, 0.4)', color: 'rgba(30, 41, 59, 0.65)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 800 }}>
                <th style={{ padding: '16px 20px' }}>Register No</th>
                <th style={{ padding: '16px 20px' }}>Student Name</th>
                <th style={{ padding: '16px 20px' }}>Score</th>
                <th style={{ padding: '16px 20px' }}>Percentage</th>
                <th style={{ padding: '16px 20px' }}>Proctor Integrity</th>
                <th style={{ padding: '16px 20px' }}>Submission Time</th>
              </tr>
            </thead>
            <tbody>
              {resultList.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.6)', color: '#0f172a' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 700 }}>{r.rollNo}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 700 }}>{r.studentName}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>{r.score} / {r.total}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontWeight: 800, color: r.percentage >= 60 ? '#16a34a' : '#dc2626' }}>
                      {r.percentage}%
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '8px', background: r.violations === 0 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)', color: r.violations === 0 ? '#16a34a' : '#d97706', fontSize: '11px', fontWeight: 700 }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {r.violations === 0 ? <CheckCircleIcon size={10} color="rgba(255,255,255,0.95)" /> : <AlertTriangleIcon size={10} color="rgba(255,255,255,0.95)" />}
                      </div>
                      <span>{r.violations === 0 ? 'Clean Record' : `${r.violations} Alert${r.violations > 1 ? 's' : ''}`}</span>
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '12px', color: 'rgba(30, 41, 59, 0.6)', fontWeight: 600 }}>
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
