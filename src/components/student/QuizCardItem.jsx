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
    <div style={{ background: '#212121', border: '1px solid #272727', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, border-color 0.2s' }}>
      {/* 16:9 Aspect Ratio Thumbnail */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: 'linear-gradient(135deg, #1e1e1e 0%, #121212 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ background: 'rgba(0,0,0,0.7)', color: '#aaaaaa', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {quiz.course || 'CSE Department'}
            </span>
            <span style={{ background: isAttended ? '#065f46' : isOpen ? '#7f1d1d' : '#272727', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {isAttended ? 'COMPLETED' : isOpen ? '● LIVE' : 'SCHEDULED'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ background: 'rgba(0,0,0,0.85)', color: '#f1f1f1', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ClockIcon size={14} color="#3ea6ff" />
              <span>{quiz.durationMinutes || 15} Mins</span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.85)', color: '#aaaaaa', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>
              Window: {quiz.windowStart || '10:00 AM'} - {quiz.windowEnd || '05:00 PM'}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f1f1', lineHeight: '1.3' }}>
          {quiz.title}
        </h3>
        <p style={{ fontSize: '12px', color: '#aaaaaa', lineHeight: '1.4', flex: 1 }}>
          {quiz.description || 'Proctored test with instant grading and real-time student sync.'}
        </p>

        {/* Action Button / Lock Status */}
        <div style={{ paddingTop: '8px', borderTop: '1px solid #272727' }}>
          {isAttended ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '11px', color: '#2ba640', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircleIcon size={14} />
                <span>Attended ({attendedResult.score}/{attendedResult.total})</span>
              </div>
              <button
                onClick={() => onViewResult(attendedResult)}
                style={{ background: '#272727', color: '#3ea6ff', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}
              >
                View Result
              </button>
            </div>
          ) : isOpen ? (
            <button
              onClick={() => onStartExam(quiz)}
              style={{ width: '100%', background: '#ff0000', color: '#ffffff', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <PlayIcon size={14} />
              <span>Start Quiz Now</span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#181818', padding: '8px 12px', borderRadius: '6px' }}>
              <span style={{ fontSize: '12px', color: '#717171', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
