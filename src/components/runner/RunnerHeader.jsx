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
    <header style={{ height: '64px', background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(30px) saturate(190%)', WebkitBackdropFilter: 'blur(30px) saturate(190%)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30d158', boxShadow: '0 0 10px #30d158' }} />
        <div>
          <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', margin: 0 }}>{quizTitle}</h1>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)' }}>
            Question {currentIndex + 1} of {totalQuestions}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: violations > 0 ? 'rgba(255, 69, 58, 0.18)' : 'rgba(10, 132, 255, 0.15)', color: violations > 0 ? '#ff857d' : '#0a84ff', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: `1px solid ${violations > 0 ? 'rgba(255, 69, 58, 0.35)' : 'rgba(10, 132, 255, 0.3)'}` }}>
          {violations > 0 ? <AlertTriangleIcon size={14} /> : <ShieldIcon size={14} />}
          <span>{violations === 0 ? 'Proctor Active' : `${violations} Security Warning${violations > 1 ? 's' : ''}`}</span>
        </div>

        <div style={{ background: isTimeCritical ? 'rgba(255, 69, 58, 0.25)' : 'rgba(255, 255, 255, 0.08)', border: `1px solid ${isTimeCritical ? '#ff453a' : 'rgba(255, 255, 255, 0.15)'}`, color: isTimeCritical ? '#ff857d' : '#ffffff', padding: '7px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)' }}>
          <ClockIcon size={16} color={isTimeCritical ? '#ff453a' : '#0a84ff'} />
          <span>{formatTime(timeLeft)}</span>
        </div>

        <button
          onClick={onSubmitExam}
          disabled={isSubmitting}
          style={{ background: 'linear-gradient(135deg, #0a84ff, #0066cc)', color: '#fff', padding: '9px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, boxShadow: '0 4px 16px rgba(10, 132, 255, 0.35)' }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Exam'}
        </button>
      </div>
    </header>
  );
}
