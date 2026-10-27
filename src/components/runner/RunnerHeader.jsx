import React from 'react';
import { ClockIcon, ShieldIcon, AlertTriangleIcon } from '../icons/SvgIcons.jsx';
import { glass, glassBtn } from '../../glass.js';

export default function RunnerHeader({ quizTitle, currentIndex, totalQuestions, timeLeft, violations, onSubmitExam, isSubmitting }) {
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeft < 120;

  return (
    <header style={{
      ...glass,
      borderRadius: 0,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', position: 'sticky', top: 0, zIndex: 40,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 10px #22c55e' }} />
        <div>
          <h1 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{quizTitle}</h1>
          <div style={{ fontSize: '11px', color: 'rgba(30, 41, 59, 0.6)', fontWeight: 600 }}>
            Question {currentIndex + 1} of {totalQuestions}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ background: violations > 0 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255, 255, 255, 0.8)', color: violations > 0 ? '#dc2626' : '#0f172a', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '7px', border: `1px solid ${violations > 0 ? 'rgba(239, 68, 68, 0.35)' : 'rgba(255, 255, 255, 0.95)'}` }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {violations > 0 ? <AlertTriangleIcon size={11} color="rgba(255,255,255,0.95)" /> : <ShieldIcon size={11} color="rgba(255,255,255,0.95)" />}
          </div>
          <span>{violations === 0 ? 'Proctor Active' : `${violations} Warning${violations > 1 ? 's' : ''}`}</span>
        </div>

        <div style={{ background: isTimeCritical ? 'rgba(239, 68, 68, 0.18)' : 'rgba(255, 255, 255, 0.8)', border: `1px solid ${isTimeCritical ? '#ef4444' : 'rgba(255, 255, 255, 0.95)'}`, color: isTimeCritical ? '#dc2626' : '#0f172a', padding: '7px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ClockIcon size={11} color="rgba(255,255,255,0.95)" />
          </div>
          <span>{formatTime(timeLeft)}</span>
        </div>

        <button
          onClick={onSubmitExam}
          disabled={isSubmitting}
          style={{ ...glassBtn, padding: '9px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 800 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Exam'}
        </button>
      </div>
    </header>
  );
}
