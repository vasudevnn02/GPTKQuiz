import React from 'react';
import { ChevronRightIcon } from '../icons/SvgIcons.jsx';
import { glassDeep, glassBtn } from '../../glass.js';

export default function QuestionView({ question, selectedOption, onSelectOption, currentIndex, totalQuestions, onNext, onPrev }) {
  if (!question) return null;

  return (
    <div style={{ maxWidth: '840px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ ...glassDeep, borderRadius: '22px', padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.6px', background: 'rgba(255,255,255,0.85)', padding: '3px 8px', borderRadius: '6px' }}>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(30, 41, 59, 0.6)', fontWeight: 600 }}>
            1 Mark
          </span>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', lineHeight: '1.5', fontFamily: 'var(--font-ny)', margin: 0 }}>
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
                background: isSelected ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.45)',
                border: `1.5px solid ${isSelected ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)'}`,
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '16px',
                textAlign: 'left',
                color: '#0f172a',
                boxShadow: isSelected ? '0 6px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)' : '0 2px 6px rgba(0,0,0,0.02)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isSelected ? '#0f172a' : 'rgba(0, 0, 0, 0.08)',
                color: isSelected ? '#ffffff' : '#0f172a',
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
          style={{ ...glassBtn, padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, opacity: currentIndex === 0 ? 0.4 : 1 }}
        >
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          style={{ ...glassBtn, padding: '10px 22px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', opacity: currentIndex === totalQuestions - 1 ? 0.4 : 1 }}
        >
          <span>Next Question</span>
          <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRightIcon size={11} color="rgba(255,255,255,0.95)" />
          </div>
        </button>
      </div>
    </div>
  );
}
