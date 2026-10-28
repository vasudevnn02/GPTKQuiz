import React from 'react';
import { ChevronRightIcon, CheckCircleIcon } from '../icons/SvgIcons.jsx';
import { glassDeep, glassBtn } from '../../glass.js';

export default function QuestionView({
  question,
  selectedOption,
  onSelectOption,
  currentIndex,
  totalQuestions,
  onNext,
  onPrev,
  onSubmitExam,
  isSubmitting
}) {
  if (!question) return null;

  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div style={{ maxWidth: '860px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ── QUESTION STATEMENT GLASS CARD ── */}
      <div style={{
        ...glassDeep,
        borderRadius: '26px',
        padding: '28px 32px',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#38bdf8',
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            padding: '4px 12px',
            borderRadius: '10px',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.65)',
            fontWeight: 700,
            background: 'rgba(255, 255, 255, 0.06)',
            padding: '4px 10px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.14)'
          }}>
            1 Mark
          </span>
        </div>

        <h2 style={{
          fontSize: '21px',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: '1.5',
          fontFamily: 'var(--font-ny)',
          margin: 0
        }}>
          {question.text || question.question || question.statement || `Question ${currentIndex + 1}`}
        </h2>
      </div>

      {/* ── OPTIONS (Apple Liquid Glass Cards) ── */}
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
                gap: '16px',
                padding: '16px 22px',
                border: isSelected ? '3px solid #38bdf8' : '3px solid hsl(0, 0%, 100%, 0.3)',
                background: isSelected ? 'hsla(199, 89%, 48%, 0.25)' : 'hsl(0, 0%, 100%, 0.2)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                borderRadius: '22px',
                textAlign: 'left',
                color: '#ffffff',
                boxShadow: isSelected
                  ? '0 0 16px rgba(56, 189, 248, 0.4), 0 8px 24px rgba(0, 0, 0, 0.2)'
                  : '0 8px 24px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
              }}
            >
              {/* Option Letter Icon Circle */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: isSelected
                  ? '#38bdf8'
                  : 'rgba(255, 255, 255, 0.08)',
                color: isSelected ? '#031525' : '#ffffff',
                border: isSelected
                  ? '2px solid #38bdf8'
                  : '1.5px solid rgba(255, 255, 255, 0.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '14px',
                flexShrink: 0,
                boxShadow: isSelected
                  ? '0 0 14px rgba(56, 189, 248, 0.6)'
                  : 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                transition: 'all 0.18s ease'
              }}>
                {letter}
              </div>

              {/* Option Statement */}
              <span style={{
                fontSize: '15px',
                fontWeight: isSelected ? 700 : 500,
                lineHeight: '1.4',
                color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.92)'
              }}>
                {optText}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── BOTTOM ACTIONS: Previous / Next / Submit Exam ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '10px',
        padding: '6px 0',
        gap: '14px',
        flexWrap: 'wrap'
      }}>
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          style={{
            ...glassBtn,
            padding: '12px 24px',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: 800,
            opacity: currentIndex === 0 ? 0.35 : 1,
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ← Previous
        </button>

        {/* Right Action: Next Question OR Submit Exam on Last Question */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {!isLastQuestion ? (
            <button
              onClick={onNext}
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                border: '1px solid rgba(56, 189, 248, 0.6)',
                color: '#ffffff',
                padding: '12px 26px',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(2, 132, 199, 0.4), inset 0 1.5px 1px rgba(255, 255, 255, 0.4)',
                cursor: 'pointer'
              }}
            >
              <span>Next Question</span>
              <ChevronRightIcon size={14} color="#ffffff" />
            </button>
          ) : (
            <button
              onClick={onSubmitExam}
              disabled={isSubmitting}
              style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                border: '1px solid rgba(74, 222, 128, 0.7)',
                color: '#ffffff',
                padding: '12px 32px',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 24px rgba(22, 163, 74, 0.45), inset 0 1.5px 1px rgba(255, 255, 255, 0.5)',
                cursor: 'pointer'
              }}
            >
              <CheckCircleIcon size={16} color="#ffffff" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Assessment'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
