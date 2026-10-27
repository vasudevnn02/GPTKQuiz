import React from 'react';
import { useQuizWindow } from '../../hooks/useQuizWindow.js';
import { PlayIcon, ClockIcon, CheckCircleIcon, LockIcon } from '../icons/SvgIcons.jsx';
import { glassDeep, glassBtn, glassInner } from '../../glass.js';

export default function QuizCardItem({ quiz, attendedResult, onStartExam, onViewResult }) {
  const { status, isOpen, label } = useQuizWindow(
    quiz.windowStart || '10:00 AM',
    quiz.windowEnd || '05:00 PM',
    quiz.durationMinutes || 15
  );

  const isAttended = Boolean(attendedResult);

  return (
    <div style={{ ...glassDeep, borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}>
      {/* 16:9 Aspect Ratio Thumbnail */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '50%', background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ position: 'absolute', inset: 0, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ ...glassInner, color: 'rgba(255,255,255,0.75)', fontSize: '11px', padding: '4px 10px', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {quiz.course || 'CSE Department'}
            </span>
            <span style={{
              background: isAttended ? 'rgba(255, 255, 255, 0.15)' : isOpen ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '10px',
              fontWeight: 700,
              padding: '4px 9px',
              borderRadius: '8px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              {isAttended ? 'COMPLETED' : isOpen ? '● LIVE' : 'SCHEDULED'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ ...glassInner, color: '#ffffff', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ClockIcon size={13} color="#ffffff" />
              <span>{quiz.durationMinutes || 15} Mins</span>
            </div>
            <div style={{ ...glassInner, color: 'rgba(255,255,255,0.65)', padding: '4px 10px', borderRadius: '8px', fontSize: '11px' }}>
              {quiz.windowStart || '10:00 AM'} - {quiz.windowEnd || '05:00 PM'}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', lineHeight: '1.4', fontFamily: 'var(--font-ny)', margin: 0 }}>
          {quiz.title}
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', lineHeight: '1.5', flex: 1 }}>
          {quiz.description || 'Proctored test with instant grading and real-time student sync.'}
        </p>

        {/* Action Button / Lock Status */}
        <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {isAttended ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.85)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CheckCircleIcon size={14} color="#ffffff" />
                <span>Attended ({attendedResult.score}/{attendedResult.total})</span>
              </div>
              <button
                onClick={() => onViewResult(attendedResult)}
                style={{ ...glassBtn, padding: '7px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 600 }}
              >
                View Result
              </button>
            </div>
          ) : isOpen ? (
            <button
              onClick={() => onStartExam(quiz)}
              style={{ width: '100%', ...glassBtn, padding: '11px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <PlayIcon size={14} />
              <span>Start Quiz Now</span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...glassInner, padding: '8px 12px', borderRadius: '10px' }}>
              <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LockIcon size={14} />
                <span>{label}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
