import React from 'react';
import { CheckIcon } from '../icons/SvgIcons.jsx';

export default function QuestionRail({ questions = [], answers = {}, currentIndex, onJumpToQuestion }) {
  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length;

  return (
    <aside style={{ width: '270px', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', borderLeft: '1px solid rgba(255, 255, 255, 0.1)', padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: '18px', flexShrink: 0 }}>
      <div>
        <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
          Question Palette
        </h3>
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', fontWeight: 600 }}>
          {answeredCount} of {totalCount} Answered
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = answers[q.id] !== undefined;

          let bg = 'rgba(255, 255, 255, 0.05)';
          let border = 'rgba(255, 255, 255, 0.12)';
          let color = 'rgba(255, 255, 255, 0.7)';

          if (isAnswered) {
            bg = 'rgba(34, 197, 94, 0.22)';
            border = '#4ade80';
            color = '#ffffff';
          }
          if (isCurrent) {
            border = '#ffffff';
            color = '#ffffff';
            bg = 'rgba(255, 255, 255, 0.22)';
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
                boxShadow: isCurrent ? '0 0 16px rgba(255, 255, 255, 0.4)' : 'none'
              }}
            >
              <span>{idx + 1}</span>
              {isAnswered && (
                <span style={{ position: 'absolute', top: '3px', right: '4px' }}>
                  <CheckIcon size={10} color="#ffffff" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)', fontWeight: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: 'rgba(34, 197, 94, 0.3)', border: '1px solid #4ade80', borderRadius: '4px' }} />
          <span>Answered ({answeredCount})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '4px' }} />
          <span>Unanswered ({totalCount - answeredCount})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', border: '1.5px solid #ffffff', borderRadius: '4px' }} />
          <span>Current Active</span>
        </div>
      </div>
    </aside>
  );
}
