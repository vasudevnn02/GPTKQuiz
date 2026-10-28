import React from 'react';
import { CheckIcon, CheckCircleIcon } from '../icons/SvgIcons.jsx';
import { glassDeep } from '../../glass.js';

export default function QuestionRail({
  questions = [],
  answers = {},
  currentIndex,
  onJumpToQuestion,
  onSubmitExam,
  isSubmitting
}) {
  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length;
  const allAnswered = totalCount > 0 && answeredCount === totalCount;

  return (
    <aside style={{
      width: '280px',
      ...glassDeep,
      borderRadius: '28px',
      padding: '26px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      flexShrink: 0,
      alignSelf: 'flex-start',
      position: 'sticky',
      top: '84px',
      boxShadow: '0 20px 48px rgba(0, 0, 0, 0.35), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.45), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1)'
    }}>
      {/* ── HEADER ── */}
      <div>
        <h3 style={{
          fontSize: '12px',
          fontWeight: 800,
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          marginBottom: '4px'
        }}>
          Question Palette
        </h3>
        <div style={{
          fontSize: '12px',
          color: allAnswered ? '#4ade80' : 'rgba(255, 255, 255, 0.7)',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {allAnswered && <CheckCircleIcon size={13} color="#4ade80" />}
          <span>{answeredCount} of {totalCount} Answered</span>
        </div>
      </div>

      {/* ── QUESTION NUMBERS GRID ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = answers[q.id] !== undefined;

          let bg = 'rgba(255, 255, 255, 0.05)';
          let border = 'rgba(255, 255, 255, 0.18)';
          let color = 'rgba(255, 255, 255, 0.8)';
          let shadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.15)';

          if (isAnswered) {
            bg = 'rgba(34, 197, 94, 0.2)';
            border = 'rgba(74, 222, 128, 0.75)';
            color = '#ffffff';
            shadow = '0 2px 10px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
          }

          if (isCurrent) {
            border = '#ffffff';
            color = '#ffffff';
            bg = isAnswered ? 'rgba(34, 197, 94, 0.35)' : 'rgba(255, 255, 255, 0.22)';
            shadow = '0 0 16px rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
          }

          return (
            <button
              key={q.id || idx}
              type="button"
              onClick={() => onJumpToQuestion(idx)}
              style={{
                height: '46px',
                borderRadius: '14px',
                background: bg,
                border: `1.5px solid ${border}`,
                color,
                fontWeight: 800,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: shadow,
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              <span>{idx + 1}</span>
              {isAnswered && (
                <span style={{ position: 'absolute', top: '3px', right: '4px' }}>
                  <CheckIcon size={10} color="#4ade80" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── LEGEND ── */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontSize: '11px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: 600
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: 'rgba(34, 197, 94, 0.3)', border: '1px solid #4ade80', borderRadius: '4px' }} />
          <span>Answered ({answeredCount})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '4px' }} />
          <span>Unanswered ({totalCount - answeredCount})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', border: '1.5px solid #ffffff', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.2)' }} />
          <span>Current Active</span>
        </div>
      </div>

      {/* ── SUBMIT BUTTON IN PALETTE CARD ── */}
      {onSubmitExam && (
        <button
          type="button"
          onClick={onSubmitExam}
          disabled={isSubmitting}
          style={{
            marginTop: '4px',
            width: '100%',
            padding: '13px',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: 800,
            background: allAnswered
              ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
              : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            border: allAnswered
              ? '1px solid rgba(74, 222, 128, 0.7)'
              : '1px solid rgba(56, 189, 248, 0.6)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: allAnswered
              ? '0 6px 22px rgba(22, 163, 74, 0.45), inset 0 1.5px 1px rgba(255, 255, 255, 0.45)'
              : '0 6px 20px rgba(2, 132, 199, 0.4), inset 0 1.5px 1px rgba(255, 255, 255, 0.45)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <CheckCircleIcon size={15} color="#ffffff" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Assessment'}</span>
        </button>
      )}
    </aside>
  );
}
