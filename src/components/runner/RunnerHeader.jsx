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
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #22c55e' }} />
        <div>
          <h1 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: 0 }}>{quizTitle}</h1>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
            Question {currentIndex + 1} of {totalQuestions}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ background: violations > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)', color: violations > 0 ? '#fca5a5' : '#ffffff', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '7px', border: `1px solid ${violations > 0 ? 'rgba(239, 68, 68, 0.35)' : 'rgba(255, 255, 255, 0.18)'}` }}>
          {violations > 0 ? <AlertTriangleIcon size={13} color="#fca5a5" /> : <ShieldIcon size={13} color="rgba(255,255,255,0.95)" />}
          <span>{violations === 0 ? 'Proctor Active' : `${violations} Warning${violations > 1 ? 's' : ''}`}</span>
        </div>

        <div style={{ background: isTimeCritical ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.08)', border: `1px solid ${isTimeCritical ? '#ef4444' : 'rgba(255, 255, 255, 0.18)'}`, color: isTimeCritical ? '#fca5a5' : '#ffffff', padding: '7px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ClockIcon size={14} color="rgba(255,255,255,0.95)" />
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
