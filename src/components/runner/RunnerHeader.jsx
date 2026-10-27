import React from 'react';
import { ClockIcon, ShieldIcon, AlertTriangleIcon } from '../icons/SvgIcons.jsx';

export default function RunnerHeader({ quizTitle, currentIndex, totalQuestions, timeLeft, violations, onSubmitExam, isSubmitting }) {
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeft < 120;

  return (
    <header style={{ height: '60px', background: '#181818', borderBottom: '1px solid #272727', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff0000' }} />
        <div>
          <h1 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f1f1', margin: 0 }}>{quizTitle}</h1>
          <div style={{ fontSize: '11px', color: '#aaaaaa' }}>
            Question {currentIndex + 1} of {totalQuestions}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: violations > 0 ? '#3b1212' : '#1f2937', color: violations > 0 ? '#fca5a5' : '#3ea6ff', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: `1px solid ${violations > 0 ? '#7f1d1d' : '#374151'}` }}>
          {violations > 0 ? <AlertTriangleIcon size={14} /> : <ShieldIcon size={14} />}
          <span>{violations === 0 ? 'Proctor Active' : `${violations} Security Warning${violations > 1 ? 's' : ''}`}</span>
        </div>

        <div style={{ background: isTimeCritical ? '#7f1d1d' : '#272727', color: isTimeCritical ? '#fee2e2' : '#f1f1f1', padding: '6px 14px', borderRadius: '6px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #3f3f3f' }}>
          <ClockIcon size={16} color={isTimeCritical ? '#ff6b6b' : '#3ea6ff'} />
          <span style={{ fontFamily: 'monospace' }}>{formatTime(timeLeft)}</span>
        </div>

        <button
          onClick={onSubmitExam}
          disabled={isSubmitting}
          style={{ background: '#ff0000', color: '#fff', padding: '8px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 700 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Exam'}
        </button>
      </div>
    </header>
  );
}
