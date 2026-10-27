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
    <div style={{ ...glassDeep, borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}>
      {/* 16:9 Aspect Ratio Thumbnail */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '50%', background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(240,244,248,0.7) 100%)', borderBottom: '1px solid rgba(255, 255, 255, 0.8)' }}>
        <div style={{ position: 'absolute', inset: 0, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ ...glassInner, color: '#0f172a', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {quiz.course || 'CSE Department'}
            </span>
            <span style={{
              background: isAttended ? 'rgba(34, 197, 94, 0.15)' : isOpen ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.05)',
              color: isAttended ? '#16a34a' : '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.95)',
              fontSize: '10px',
              fontWeight: 800,
              padding: '4px 9px',
              borderRadius: '8px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}>
              {isAttended ? 'COMPLETED' : isOpen ? '● LIVE' : 'SCHEDULED'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ ...glassInner, color: '#0f172a', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ClockIcon size={10} color="rgba(255,255,255,0.95)" />
              </div>
              <span>{quiz.durationMinutes || 15} Mins</span>
            </div>
            <div style={{ ...glassInner, color: 'rgba(30,41,59,0.7)', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 600 }}>
              {quiz.windowStart || '10:00 AM'} - {quiz.windowEnd || '05:00 PM'}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', lineHeight: '1.4', fontFamily: 'var(--font-ny)', margin: 0 }}>
          {quiz.title}
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(30, 41, 59, 0.65)', lineHeight: '1.5', flex: 1 }}>
          {quiz.description || 'Proctored test with instant grading and real-time student sync.'}
        </p>

        {/* Action Button / Lock Status */}
        <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.7)' }}>
          {isAttended ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircleIcon size={11} color="#ffffff" />
                </div>
                <span>Attended ({attendedResult.score}/{attendedResult.total})</span>
              </div>
              <button
                onClick={() => onViewResult(attendedResult)}
                style={{ ...glassBtn, padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 700 }}
              >
                View Result
              </button>
            </div>
          ) : isOpen ? (
            <button
              onClick={() => onStartExam(quiz)}
              style={{ width: '100%', ...glassBtn, padding: '12px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlayIcon size={11} color="rgba(255,255,255,0.95)" />
              </div>
              <span>Start Quiz Now</span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...glassInner, padding: '10px 14px', borderRadius: '10px' }}>
              <span style={{ fontSize: '12px', color: 'rgba(30, 41, 59, 0.6)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LockIcon size={11} color="rgba(255,255,255,0.95)" />
                </div>
                <span>{label}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
