import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AwardIcon, CheckCircleIcon, AlertTriangleIcon, TrophyIcon } from '../icons/SvgIcons.jsx';

export default function ResultsTable({ results = {}, student, onViewBreakdown }) {
  const [selectedResult, setSelectedResult] = useState(null);
  const studentResults = Object.values(results).filter((r) => r.rollNo === student?.rollNo);

  const totalExams = studentResults.length;
  const avgPercentage = totalExams > 0
    ? Math.round(studentResults.reduce((sum, r) => sum + (Number(r.percentage) || 0), 0) / totalExams)
    : 0;
  const bestPercentage = totalExams > 0
    ? Math.max(...studentResults.map(r => Number(r.percentage) || 0))
    : 0;
  const cleanCount = studentResults.filter(r => (r.violations || 0) === 0).length;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {totalExams === 0 ? (
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '36px'
        }}>
          <div className="liqglass" style={{
            borderRadius: '24px',
            padding: '48px 36px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            maxWidth: '520px',
            width: '100%'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8'
            }}>
              <AwardIcon size={24} color="#38bdf8" />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                No Completed Examinations
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.6' }}>
                Completed test results and detailed score breakdowns for {student?.name || 'student'} ({student?.rollNo}) will appear here.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* ── BIG CARD: Overall Performance Summary ── */}
          <div
            className="liqglass"
            style={{
              borderRadius: '26px',
              padding: '28px 32px',
              marginBottom: '26px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              background: 'rgba(13, 21, 39, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#38bdf8',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  Official Candidate Performance Card
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.3px' }}>
                  {student?.name || 'Candidate'}
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.65)', marginLeft: '10px' }}>
                    ({student?.rollNo || 'Roll No'})
                  </span>
                </h2>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                  {student?.course || 'Computer Science and Engineering'} • Government Polytechnic, Kadur-197
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  background: 'rgba(34, 197, 94, 0.18)',
                  border: '1px solid rgba(34, 197, 94, 0.45)',
                  color: '#4ade80',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>●</span>
                  <span>VERIFIED PROCTORED RECORD</span>
                </span>
              </div>
            </div>

            {/* 4 Performance Metric Badges in Big Card */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              paddingTop: '6px'
            }}>
              {/* Box 1: Total Completed */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '14px 18px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                  Tests Completed
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>
                  {totalExams}
                </div>
              </div>

              {/* Box 2: Average Score */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '14px 18px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                  Average Score
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: avgPercentage >= 60 ? '#4ade80' : '#38bdf8' }}>
                  {avgPercentage}%
                </div>
              </div>

              {/* Box 3: Highest Score */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '14px 18px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                  Highest Score
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: bestPercentage >= 60 ? '#4ade80' : '#f59e0b' }}>
                  {bestPercentage}%
                </div>
              </div>

              {/* Box 4: Integrity Status */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '14px 18px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                  Integrity Status
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <CheckCircleIcon size={18} color="#4ade80" />
                  <span>{cleanCount === totalExams ? '100% Clean' : `${cleanCount}/${totalExams} Clean`}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── UNDER THIS: SQUARE CARDS GRID ── */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Completed Assessments</span>
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  background: 'rgba(56, 189, 248, 0.16)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.3)'
                }}>
                  {studentResults.length}
                </span>
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '22px'
            }}>
              {studentResults.map((r, i) => {
                const isPass = r.percentage >= 60;
                return (
                  <div
                    key={i}
                    className="liqglass"
                    style={{
                      borderRadius: '26px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '270px',
                      position: 'relative',
                      userSelect: 'none',
                      background: 'rgba(13, 21, 39, 0.65)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.28)'
                    }}
                  >
                    {/* Top: Icon + Department + Completed Tag */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '13px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.22)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#38bdf8'
                        }}>
                          <TrophyIcon size={20} color="#38bdf8" />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '4px 10px',
                            borderRadius: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.4px'
                          }}>
                            {r.course || student?.course || 'CSE'}
                          </span>

                          <span style={{
                            background: 'rgba(34, 197, 94, 0.18)',
                            color: '#4ade80',
                            border: '1px solid rgba(34, 197, 94, 0.4)',
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '4px 9px',
                            borderRadius: '10px',
                            letterSpacing: '0.4px'
                          }}>
                            ● COMPLETED
                          </span>
                        </div>
                      </div>

                      {/* Title & Attended timestamp */}
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '4px', lineHeight: '1.35' }}>
                        {r.quizTitle}
                      </h3>
                      <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginBottom: '16px' }}>
                        Attended on {r.attendedDate} at {r.attendedTime}
                      </p>
                    </div>

                    {/* Score & Integrity Chips */}
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        marginBottom: '14px'
                      }}>
                        <div>
                          <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase' }}>
                            Score Obtained
                          </div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                            {r.score} / {r.total} Marks
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            fontSize: '22px',
                            fontWeight: 800,
                            color: isPass ? '#4ade80' : '#f87171',
                            letterSpacing: '-0.3px'
                          }}>
                            {r.percentage}%
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '11px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          background: r.violations === 0 ? 'rgba(48, 209, 88, 0.15)' : 'rgba(255, 159, 10, 0.15)',
                          color: r.violations === 0 ? '#30d158' : '#ff9f0a',
                          fontWeight: 600
                        }}>
                          {r.violations === 0 ? <CheckCircleIcon size={12} /> : <AlertTriangleIcon size={12} />}
                          <span>{r.violations === 0 ? 'Clean Record' : `${r.violations} Alert${r.violations > 1 ? 's' : ''}`}</span>
                        </span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Proctored: Verified</span>
                      </div>

                      {/* Review Answers Button */}
                      <button
                        type="button"
                        onClick={() => onViewBreakdown ? onViewBreakdown(r) : setSelectedResult(r)}
                        style={{
                          width: '100%',
                          background: 'linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(2,132,199,0.2) 100%)',
                          border: '1px solid rgba(56, 189, 248, 0.45)',
                          color: '#38bdf8',
                          padding: '10px 16px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(56,189,248,0.3) 0%, rgba(2,132,199,0.3) 100%)';
                          e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.7)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(2,132,199,0.2) 100%)';
                          e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.45)';
                        }}
                      >
                        <span>Review Answers</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── ANSWER REVIEW MODAL (Clean Popup) ── */}
      {selectedResult && typeof document !== 'undefined' && createPortal(
        <div
          onClick={() => setSelectedResult(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(2, 6, 23, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              background: '#0d1527',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '24px',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.55)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Detailed Answer Review: {selectedResult.quizTitle}
                </h3>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                  Attended on {selectedResult.attendedDate} • Score: {selectedResult.score}/{selectedResult.total} Marks ({selectedResult.percentage}%)
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                ✕ Close
              </button>
            </div>

            {/* Scrollable Questions List */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {selectedResult.breakdown && selectedResult.breakdown.length > 0 ? (
                selectedResult.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${item.isCorrect ? 'rgba(74, 222, 128, 0.35)' : 'rgba(248, 113, 113, 0.35)'}`,
                      borderRadius: '14px',
                      padding: '16px'
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                      Q{idx + 1}. {item.questionText}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', flexWrap: 'wrap' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        background: item.isCorrect ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                        color: item.isCorrect ? '#4ade80' : '#f87171'
                      }}>
                        Your Choice: Option {item.selected !== null && item.selected !== undefined ? String.fromCharCode(65 + item.selected) : 'Unanswered'} {item.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                      {!item.isCorrect && item.correct !== undefined && (
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Correct Answer: Option {String.fromCharCode(65 + item.correct)}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', padding: '24px' }}>
                  No question-by-question breakdown stored for this completed test. Overall score: {selectedResult.score} / {selectedResult.total} ({selectedResult.percentage}%).
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '14px 24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'flex-end',
              background: 'rgba(2, 6, 23, 0.4)'
            }}>
              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                style={{
                  background: '#0ea5e9',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 20px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
