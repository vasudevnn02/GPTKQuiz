import React from 'react';
import { ChevronRightIcon } from '../icons/SvgIcons.jsx';

export default function QuestionView({ question, selectedOption, onSelectOption, currentIndex, totalQuestions, onNext, onPrev }) {
  if (!question) return null;

  return (
    <div style={{ maxWidth: '840px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: '#212121', border: '1px solid #272727', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#3ea6ff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Single Choice Question
          </span>
          <span style={{ fontSize: '12px', color: '#aaaaaa' }}>
            1 Mark
          </span>
        </div>
        <h2 style={{ fontSize: '17px', fontWeight: 600, color: '#f1f1f1', lineHeight: '1.5' }}>
          {currentIndex + 1}. {question.text}
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
                background: isSelected ? '#2a2a2a' : '#212121',
                border: `1.5px solid ${isSelected ? '#3ea6ff' : '#272727'}`,
                borderRadius: '10px',
                textAlign: 'left',
                color: isSelected ? '#ffffff' : '#e0e0e0',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isSelected ? '#3ea6ff' : '#181818',
                color: isSelected ? '#000000' : '#aaaaaa',
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
          style={{ background: '#272727', color: '#aaaaaa', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, opacity: currentIndex === 0 ? 0.4 : 1 }}
        >
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          style={{ background: '#272727', color: '#f1f1f1', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', opacity: currentIndex === totalQuestions - 1 ? 0.4 : 1 }}
        >
          <span>Next Question</span>
          <ChevronRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}
