import React from 'react';
import { ChevronRightIcon } from '../icons/SvgIcons.jsx';

export default function QuestionView({ question, selectedOption, onSelectOption, currentIndex, totalQuestions, onNext, onPrev }) {
  if (!question) return null;

  return (
    <div style={{ maxWidth: '840px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'rgba(24, 27, 36, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
            1 Mark
          </span>
        </div>
        <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#ffffff', lineHeight: '1.5', fontFamily: 'var(--font-ny)', margin: 0 }}>
          {question.text}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {question.options.map((optText, idx) => {
          const isSelected = selectedOption === idx;
          const letter = String.fromCharCode(65 + idx);
          return (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
                background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(24, 27, 36, 0.6)',
                border: `1.5px solid ${isSelected ? '#3b82f6' : 'rgba(255, 255, 255, 0.08)'}`,
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                textAlign: 'left',
                color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isSelected ? '#3b82f6' : 'rgba(255, 255, 255, 0.08)',
                color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '13px',
                flexShrink: 0
              }}>
                {letter}
              </div>
              <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{optText}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.7)', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, opacity: currentIndex === 0 ? 0.4 : 1 }}
        >
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', opacity: currentIndex === totalQuestions - 1 ? 0.4 : 1 }}
        >
          <span>Next Question</span>
          <ChevronRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}
