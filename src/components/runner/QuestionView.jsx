import React from 'react';
import { ChevronRightIcon } from '../icons/SvgIcons.jsx';
import { glassDeep, glassBtn } from '../../glass.js';

export default function QuestionView({ question, selectedOption, onSelectOption, currentIndex, totalQuestions, onNext, onPrev }) {
  if (!question) return null;

  return (
    <div style={{ maxWidth: '840px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ ...glassDeep, borderRadius: '26px', padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.6px', background: 'rgba(255,255,255,0.12)', padding: '4px 10px', borderRadius: '8px' }}>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', fontWeight: 600 }}>
            1 Mark
          </span>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', lineHeight: '1.5', fontFamily: 'var(--font-ny)', margin: 0 }}>
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
                background: isSelected ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                border: `1.5px solid ${isSelected ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.14)'}`,
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                borderRadius: '18px',
                textAlign: 'left',
                color: '#ffffff',
                boxShadow: isSelected ? '0 6px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
                color: isSelected ? '#000000' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '13px',
                flexShrink: 0
              }}>
                {letter}
              </div>
              <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '1.4' }}>{optText}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          style={{ ...glassBtn, padding: '10px 20px', borderRadius: '14px', fontSize: '13px', fontWeight: 700, opacity: currentIndex === 0 ? 0.4 : 1 }}
        >
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          style={{ ...glassBtn, padding: '10px 22px', borderRadius: '14px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', opacity: currentIndex === totalQuestions - 1 ? 0.4 : 1 }}
        >
          <span>Next Question</span>
          <ChevronRightIcon size={14} color="rgba(255,255,255,0.95)" />
        </button>
      </div>
    </div>
  );
}
