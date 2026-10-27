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
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 0 10px #ffffff' }} />
        <div>
          <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', margin: 0 }}>{quizTitle}</h1>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>
            Question {currentIndex + 1} of {totalQuestions}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: violations > 0 ? 'rgba(255, 69, 58, 0.18)' : 'rgba(255, 255, 255, 0.08)', color: violations > 0 ? '#ff857d' : '#ffffff', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: `1px solid ${violations > 0 ? 'rgba(255, 69, 58, 0.35)' : 'rgba(255, 255, 255, 0.15)'}` }}>
          {violations > 0 ? <AlertTriangleIcon size={14} /> : <ShieldIcon size={14} />}
          <span>{violations === 0 ? 'Proctor Active' : `${violations} Warning${violations > 1 ? 's' : ''}`}</span>
        </div>

        <div style={{ background: isTimeCritical ? 'rgba(255, 69, 58, 0.25)' : 'rgba(255, 255, 255, 0.08)', border: `1px solid ${isTimeCritical ? '#ff453a' : 'rgba(255, 255, 255, 0.15)'}`, color: isTimeCritical ? '#ff857d' : '#ffffff', padding: '7px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ClockIcon size={16} color="#ffffff" />
          <span>{formatTime(timeLeft)}</span>
        </div>

        <button
          onClick={onSubmitExam}
          disabled={isSubmitting}
          style={{ ...glassBtn, padding: '9px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 700 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Exam'}
        </button>
      </div>
    </header>
  );
}
