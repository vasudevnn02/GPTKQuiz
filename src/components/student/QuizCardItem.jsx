import React from 'react';
import { useQuizWindow } from '../../hooks/useQuizWindow.js';
import { PlayIcon, ClockIcon, CheckCircleIcon, LockIcon, BookOpenIcon } from '../icons/SvgIcons.jsx';
import { glassBtn } from '../../glass.js';

export default function QuizCardItem({ quiz, attendedResult, onStartExam, onViewResult }) {
  const { status, isOpen, label } = useQuizWindow(
    quiz.windowStart || '10:00 AM',
    quiz.windowEnd || '05:00 PM',
    quiz.durationMinutes || 15
  );

  const isAttended = Boolean(attendedResult);

  return (
    <div
      style={{
        border: '3px solid hsl(0, 0%, 100%, 0.3)',
        background: 'hsl(0, 0%, 100%, 0.2)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
        borderRadius: '24px',
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '230px',
        transition: 'all 0.25s ease',
        position: 'relative',
        userSelect: 'none'
      }}
    >
      {/* ── CARD HEADER (Icon + Course + Status Badge) ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '13px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}>
            <BookOpenIcon size={20} color="#38bdf8" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.4px'
            }}>
              {quiz.course || 'CSE Department'}
            </span>

            <span style={{
              background: isAttended ? 'rgba(34, 197, 94, 0.18)' : isOpen ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              color: isAttended ? '#4ade80' : isOpen ? '#38bdf8' : 'rgba(255, 255, 255, 0.85)',
              border: isAttended ? '1px solid rgba(34, 197, 94, 0.4)' : isOpen ? '1px solid rgba(56, 189, 248, 0.45)' : '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '10px',
              fontWeight: 800,
              padding: '4px 9px',
              borderRadius: '10px',
              letterSpacing: '0.4px'
            }}>
              {isAttended ? '● COMPLETED' : isOpen ? '● LIVE' : '● SCHEDULED'}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '4px', lineHeight: '1.35', fontFamily: 'var(--font-ny)' }}>
          {quiz.title}
        </h3>
        <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.45', marginBottom: '14px' }}>
          {quiz.description || 'Proctored assessment with instant automated evaluation.'}
        </p>
      </div>

      {/* ── META CHIPS (Even, Pure Transparent Glass) ── */}
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '10px',
            padding: '7px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            color: '#ffffff',
            fontWeight: 700
          }}>
            <ClockIcon size={12} color="#38bdf8" />
            <span>{quiz.durationMinutes || 15} Mins</span>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '10px',
            padding: '7px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.85)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            <span>{quiz.windowStart || '10:00 AM'} – {quiz.windowEnd || '05:00 PM'}</span>
          </div>
        </div>

        {/* ── ACTION BUTTON / STATUS ── */}
        {isAttended ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircleIcon size={14} color="#4ade80" />
              <span>Attended ({attendedResult.score}/{attendedResult.total})</span>
            </span>
            <button
              onClick={() => onViewResult(attendedResult)}
              style={{
                ...glassBtn,
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              View Result
            </button>
          </div>
        ) : isOpen ? (
          <button
            onClick={() => onStartExam(quiz)}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              border: '1px solid rgba(56, 189, 248, 0.6)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 18px rgba(2, 132, 199, 0.4)',
              cursor: 'pointer'
            }}
          >
            <PlayIcon size={13} color="#ffffff" />
            <span>Start Assessment Now</span>
          </button>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            padding: '10px 14px',
            borderRadius: '12px',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.65)',
            fontWeight: 700
          }}>
            <LockIcon size={13} color="rgba(255, 255, 255, 0.65)" />
            <span>{label || 'Starts at 10:00 AM'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
