import React, { useState } from 'react';
import { AwardIcon, CheckCircleIcon, AlertTriangleIcon } from '../icons/SvgIcons.jsx';

export default function ResultsTable({ results = {}, student, onViewBreakdown }) {
  const [selectedResult, setSelectedResult] = useState(null);
  const studentResults = Object.values(results).filter((r) => r.rollNo === student?.rollNo);

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <span style={{ color: '#ff9f0a' }}><AwardIcon size={22} /></span>
        <span>My Assessment Transcript</span>
      </h2>
      <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginBottom: '22px' }}>
        Verified examination record, score percentage, and proctor integrity status.
      </p>

      {studentResults.length === 0 ? (
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '40px 24px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
          No completed examinations on record for {student?.name} ({student?.rollNo}).
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {studentResults.map((r, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: '1px solid rgba(255, 255, 255, 0.28)',
              boxShadow: '0 20px 48px rgba(0,0,0,0.38), inset 0 1.5px 1px 0 rgba(255,255,255,0.65), inset 0 -1px 1px 0 rgba(255,255,255,0.12)',
              borderRadius: '24px',
              padding: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>{r.quizTitle}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>
                    Attended on {r.attendedDate} at {r.attendedTime}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: r.percentage >= 60 ? '#30d158' : '#ff453a' }}>
                      {r.percentage}%
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>
                      {r.score} / {r.total} Marks
                    </div>
                  </div>

                  <button
                    onClick={() => onViewBreakdown ? onViewBreakdown(r) : setSelectedResult(selectedResult === r ? null : r)}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#0a84ff', padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 700 }}
                  >
                    {selectedResult === r ? 'Hide Review' : 'Review Answers'}
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', gap: '12px', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 8px', borderRadius: '8px', background: r.violations === 0 ? 'rgba(48, 209, 88, 0.15)' : 'rgba(255, 159, 10, 0.15)', color: r.violations === 0 ? '#30d158' : '#ff9f0a', fontWeight: 600, fontSize: '11px' }}>
                  {r.violations === 0 ? <CheckCircleIcon size={13} /> : <AlertTriangleIcon size={13} />}
                  <span>{r.violations === 0 ? 'Clean Record' : `${r.violations} Alert${r.violations > 1 ? 's' : ''}`}</span>
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Proctored Status: Verified</span>
              </div>

              {selectedResult === r && r.breakdown && (
                <div style={{ marginTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Detailed Answer Key:</div>
                  {r.breakdown.map((item, idx) => (
                    <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.25)', border: `1px solid ${item.isCorrect ? 'rgba(48, 209, 88, 0.3)' : 'rgba(255, 69, 58, 0.3)'}`, padding: '12px 16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '13px', color: '#ffffff', marginBottom: '4px' }}>
                        Q{idx + 1}. {item.questionText}
                      </div>
                      <div style={{ fontSize: '12px', color: item.isCorrect ? '#30d158' : '#ff857d' }}>
                        Selected: Option {item.selected !== null ? String.fromCharCode(65 + item.selected) : 'None'} {item.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
