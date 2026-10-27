import React from 'react';
import { CheckIcon } from '../icons/SvgIcons.jsx';

export default function QuestionRail({ questions = [], answers = {}, currentIndex, onJumpToQuestion }) {
  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length;

  return (
    <aside style={{ width: '270px', background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', borderLeft: '1px solid rgba(255, 255, 255, 0.7)', padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: '18px', flexShrink: 0 }}>
      <div>
        <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
          Question Palette
        </h3>
        <div style={{ fontSize: '12px', color: 'rgba(30, 41, 59, 0.65)', fontWeight: 600 }}>
          {answeredCount} of {totalCount} Answered
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = answers[q.id] !== undefined;

          let bg = 'rgba(255, 255, 255, 0.55)';
          let border = 'rgba(255, 255, 255, 0.85)';
          let color = '#0f172a';

          if (isAnswered) {
            bg = 'rgba(34, 197, 94, 0.15)';
            border = '#22c55e';
            color = '#15803d';
          }
          if (isCurrent) {
            border = '#0f172a';
            color = '#ffffff';
            bg = '#0f172a';
          }

          return (
            <button
              key={q.id}
              onClick={() => onJumpToQuestion(idx)}
              style={{
                height: '44px',
                borderRadius: '12px',
                background: bg,
                border: `1.5px solid ${border}`,
                color,
                fontWeight: 800,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: isCurrent ? '0 4px 14px rgba(0, 0, 0, 0.15)' : 'none'
              }}
            >
              <span>{idx + 1}</span>
              {isAnswered && (
                <span style={{ position: 'absolute', top: '3px', right: '4px' }}>
                  <CheckIcon size={10} color={isCurrent ? '#ffffff' : '#16a34a'} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.7)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: 'rgba(30, 41, 59, 0.7)', fontWeight: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid #16a34a', borderRadius: '4px' }} />
          <span>Answered ({answeredCount})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(0, 0, 0, 0.15)', borderRadius: '4px' }} />
          <span>Unanswered ({totalCount - answeredCount})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: '#0f172a', border: '1.5px solid #0f172a', borderRadius: '4px' }} />
          <span>Current Active</span>
        </div>
      </div>
    </aside>
  );
}
