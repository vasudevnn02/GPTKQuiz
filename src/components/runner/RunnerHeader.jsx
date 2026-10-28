import React from 'react';
import { ClockIcon, ShieldIcon, AlertTriangleIcon, CheckCircleIcon } from '../icons/SvgIcons.jsx';
import { glass } from '../../glass.js';

export default function RunnerHeader({ quizTitle, currentIndex, totalQuestions, timeLeft, violations, onSubmitExam, isSubmitting }) {
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeft < 120;

  return (
    <header className="liqglass" style={{
      borderRadius: 0,
      outline: 'none !important',
      borderBottom: '1px solid rgba(255,255,255,0.18)',
      height: '66px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      {/* Left: Live Indicator + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#4ade80',
          boxShadow: '0 0 10px #22c55e'
        }} />
        <div>
          <h1 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.3px' }}>
            {quizTitle}
          </h1>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600 }}>
            Question {currentIndex + 1} of {totalQuestions}
          </div>
        </div>
      </div>

      {/* Right: Anti-cheat Status + Countdown Timer + Submit Exam Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Anti-cheat status pill */}
        <div style={{
          background: violations > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.07)',
          color: violations > 0 ? '#fca5a5' : '#ffffff',
          padding: '7px 14px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          border: `1px solid ${violations > 0 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.18)'}`,
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}>
          {violations > 0 ? <AlertTriangleIcon size={14} color="#fca5a5" /> : <ShieldIcon size={14} color="#38bdf8" />}
          <span>{violations === 0 ? 'Proctor Active' : `${violations} Warning${violations > 1 ? 's' : ''}`}</span>
        </div>

        {/* Countdown timer pill */}
        <div style={{
          background: isTimeCritical ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.08)',
          border: `1px solid ${isTimeCritical ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
          color: isTimeCritical ? '#fca5a5' : '#ffffff',
          padding: '7px 16px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.25)'
        }}>
          <ClockIcon size={14} color="#38bdf8" />
          <span>{formatTime(timeLeft)}</span>
        </div>

        {/* Submit Exam Button */}
        <button
          onClick={onSubmitExam}
          disabled={isSubmitting}
          style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            border: '1px solid rgba(56, 189, 248, 0.6)',
            color: '#ffffff',
            padding: '9px 20px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 18px rgba(2, 132, 199, 0.4), inset 0 1.5px 1px rgba(255, 255, 255, 0.4)',
            cursor: 'pointer'
          }}
        >
          <CheckCircleIcon size={14} color="#ffffff" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Exam'}</span>
        </button>
      </div>
    </header>
  );
}
