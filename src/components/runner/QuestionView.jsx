import React from 'react';
import { ChevronRightIcon } from '../icons/SvgIcons.jsx';
import { glassDeep, glassBtn } from '../../glass.js';

export default function QuestionView({ question, selectedOption, onSelectOption, currentIndex, totalQuestions, onNext, onPrev }) {
  if (!question) return null;

  return (
    <div style={{ maxWidth: '840px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ ...glassDeep, borderRadius: '20px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.65)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)' }}>
            1 Mark
          </span>
        </div>
        <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#ffffff', lineHeight: '1.5', fontFamily: 'var(--font-ny)', margin: 0 }}>
          {question.text || question.question || question.statement || `Question ${currentIndex + 1}`}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {(question.options || []).map((opt, idx) => {
          const optText = typeof opt === 'string' ? opt : (opt?.text || opt?.label || '');
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
                background: isSelected ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                border: `1.5px solid ${isSelected ? 'rgba(255, 255, 255, 0.38)' : 'rgba(255, 255, 255, 0.1)'}`,
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '14px',
                textAlign: 'left',
                color: '#ffffff',
                boxShadow: isSelected ? '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.35)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
                color: isSelected ? '#000000' : 'rgba(255, 255, 255, 0.7)',
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
          style={{ ...glassBtn, padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, opacity: currentIndex === 0 ? 0.4 : 1 }}
        >
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          style={{ ...glassBtn, padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', opacity: currentIndex === totalQuestions - 1 ? 0.4 : 1 }}
        >
          <span>Next Question</span>
          <ChevronRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}
