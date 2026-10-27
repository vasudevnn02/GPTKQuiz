import React from 'react';
import { useQuizWindow } from '../../hooks/useQuizWindow.js';
import { PlayIcon, ClockIcon, CheckCircleIcon, LockIcon } from '../icons/SvgIcons.jsx';

export default function QuizCardItem({ quiz, attendedResult, onStartExam, onViewResult }) {
  const { status, isOpen, label } = useQuizWindow(
    quiz.windowStart || '10:00 AM',
    quiz.windowEnd || '05:00 PM',
    quiz.durationMinutes || 15
  );

  const isAttended = Boolean(attendedResult);

  return (
    <div style={{ background: 'rgba(24, 27, 36, 0.72)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease', boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}>
      {/* 16:9 Aspect Ratio Thumbnail */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: 'linear-gradient(135deg, #1c2333 0%, #10141f 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.7)', fontSize: '11px', padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {quiz.course || 'CSE Department'}
            </span>
            <span style={{ background: isAttended ? 'rgba(16, 185, 129, 0.2)' : isOpen ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: isAttended ? '#34d399' : isOpen ? '#60a5fa' : 'rgba(255,255,255,0.6)', border: `1px solid ${isAttended ? 'rgba(16, 185, 129, 0.4)' : isOpen ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.15)'}`, fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {isAttended ? 'COMPLETED' : isOpen ? '● LIVE' : 'SCHEDULED'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', color: '#ffffff', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ClockIcon size={14} color="#60a5fa" />
              <span>{quiz.durationMinutes || 15} Mins</span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.7)', padding: '4px 8px', borderRadius: '6px', fontSize: '11px' }}>
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
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5', flex: 1 }}>
          {quiz.description || 'Proctored test with instant grading and real-time student sync.'}
        </p>

        {/* Action Button / Lock Status */}
        <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {isAttended ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '12px', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircleIcon size={14} />
                <span>Attended ({attendedResult.score}/{attendedResult.total})</span>
              </div>
              <button
                onClick={() => onViewResult(attendedResult)}
                style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#60a5fa', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600 }}
              >
                View Result
              </button>
            </div>
          ) : isOpen ? (
            <button
              onClick={() => onStartExam(quiz)}
              style={{ width: '100%', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.35)' }}
            >
              <PlayIcon size={14} />
              <span>Start Quiz Now</span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: '8px' }}>
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
