import React from 'react';
import { CheckIcon } from '../icons/SvgIcons.jsx';

export default function QuestionRail({ questions = [], answers = {}, currentIndex, onJumpToQuestion }) {
  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length;

  return (
    <aside style={{ width: '260px', background: '#181818', borderLeft: '1px solid #272727', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
      <div>
        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#f1f1f1', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
          Question Palette
        </h3>
        <div style={{ fontSize: '12px', color: '#aaaaaa' }}>
          {answeredCount} of {totalCount} Answered
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = answers[q.id] !== undefined;

          let bg = '#212121';
          let border = '#272727';
          let color = '#aaaaaa';

          if (isAnswered) {
            bg = '#143823';
            border = '#22c55e';
            color = '#86efac';
          }
          if (isCurrent) {
            border = '#3ea6ff';
            color = '#ffffff';
          }

          return (
            <button
              key={q.id}
              onClick={() => onJumpToQuestion(idx)}
              style={{
                height: '42px',
                borderRadius: '8px',
                background: bg,
                border: `1.5px solid ${border}`,
                color,
                fontWeight: 700,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <span>{idx + 1}</span>
              {isAnswered && (
                <span style={{ position: 'absolute', top: '2px', right: '3px' }}>
                  <CheckIcon size={10} color="#22c55e" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid #272727', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#aaaaaa' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: '#143823', border: '1px solid #22c55e', borderRadius: '3px' }} />
          <span>Answered ({answeredCount})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: '#212121', border: '1px solid #272727', borderRadius: '3px' }} />
          <span>Unanswered ({totalCount - answeredCount})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', border: '1px solid #3ea6ff', borderRadius: '3px' }} />
          <span>Current Active</span>
        </div>
      </div>
    </aside>
  );
}
