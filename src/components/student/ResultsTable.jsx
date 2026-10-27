import React, { useState } from 'react';
import { AwardIcon, CheckCircleIcon, AlertTriangleIcon } from '../icons/SvgIcons.jsx';

export default function ResultsTable({ results = {}, student, onViewBreakdown }) {
  const [selectedResult, setSelectedResult] = useState(null);

  const studentResults = Object.values(results).filter(
    (r) => r.rollNo === student?.rollNo
  );

  return (
    <div>
      <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#f1f1f1', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <AwardIcon size={20} color="#f59e0b" />
        <span>My Assessment Results & Transcript</span>
      </h2>
      <p style={{ fontSize: '12px', color: '#aaaaaa', marginBottom: '20px' }}>
        Official record of attended examinations, proctor security status, and grade performance.
      </p>

      {studentResults.length === 0 ? (
        <div style={{ background: '#212121', border: '1px solid #272727', borderRadius: '12px', padding: '36px', textAlign: 'center', color: '#aaaaaa' }}>
          No completed examinations found for {student?.name} ({student?.rollNo}).
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {studentResults.map((r, i) => (
            <div key={i} style={{ background: '#212121', border: '1px solid #272727', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#f1f1f1' }}>{r.quizTitle}</div>
                  <div style={{ fontSize: '12px', color: '#aaaaaa', marginTop: '4px' }}>
                    Attended on {r.attendedDate} at {r.attendedTime}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: r.percentage >= 60 ? '#2ba640' : '#ef4444' }}>
                      {r.percentage}%
                    </div>
                    <div style={{ fontSize: '11px', color: '#aaaaaa' }}>
                      {r.score} / {r.total} Marks
                    </div>
                  </div>

                  <button
                    onClick={() => onViewBreakdown ? onViewBreakdown(r) : setSelectedResult(selectedResult === r ? null : r)}
                    style={{ background: '#272727', color: '#3ea6ff', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}
                  >
                    {selectedResult === r ? 'Hide Review' : 'Review Answers'}
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', gap: '12px', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: r.violations === 0 ? '#2ba640' : '#f59e0b' }}>
                  {r.violations === 0 ? <CheckCircleIcon size={14} /> : <AlertTriangleIcon size={14} />}
                  <span>{r.violations === 0 ? 'Clean Proctor Record' : `${r.violations} Security Alerts`}</span>
                </span>
                <span style={{ color: '#717171' }}>•</span>
                <span style={{ color: '#aaaaaa' }}>Status: Officially Verified</span>
              </div>

              {selectedResult === r && r.breakdown && (
                <div style={{ marginTop: '16px', borderTop: '1px solid #272727', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f1f1' }}>Question Review:</div>
                  {r.breakdown.map((item, idx) => (
                    <div key={idx} style={{ background: '#181818', padding: '12px', borderRadius: '8px', borderLeft: `3px solid ${item.isCorrect ? '#2ba640' : '#ef4444'}` }}>
                      <div style={{ fontSize: '13px', color: '#f1f1f1', marginBottom: '6px' }}>
                        Q{idx + 1}. {item.questionText}
                      </div>
                      <div style={{ fontSize: '12px', color: item.isCorrect ? '#2ba640' : '#fca5a5' }}>
                        Your Choice: Option {item.selected !== null ? String.fromCharCode(65 + item.selected) : 'None'} {item.isCorrect ? '✓ Correct' : '✗ Incorrect'}
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
