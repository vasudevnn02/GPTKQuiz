import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ref, set } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import {
  CalendarIcon,
  SparkleIcon,
  PlusIcon,
  TrashIcon,
  XIcon
} from '../icons/SvgIcons.jsx';
import AiQuestionImporter from './AiQuestionImporter.jsx';

function computeEndTime(startTime, durationMinutes = 15) {
  if (!startTime) return '10:15 AM';
  try {
    const match = startTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (!match) return '10:15 AM';
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const meridiem = (match[3] || 'AM').toUpperCase();
    if (meridiem === 'PM' && h !== 12) h += 12;
    if (meridiem === 'AM' && h === 12) h = 0;
    const totalMinutes = h * 60 + m + Number(durationMinutes || 15);
    const endH24 = Math.floor(totalMinutes / 60) % 24;
    const endM = totalMinutes % 60;
    const endMeridiem = endH24 >= 12 ? 'PM' : 'AM';
    const endH12 = endH24 % 12 === 0 ? 12 : endH24 % 12;
    const pad = (n) => String(n).padStart(2, '0');
    return `${endH12}:${pad(endM)} ${endMeridiem}`;
  } catch {
    return '10:15 AM';
  }
}

function getTodayFormatted() {
  const d = new Date();
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function CreateQuizModal({ onClose, onSaved }) {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('Computer Science');
  const [date, setDate] = useState(getTodayFormatted());
  const [start, setStart] = useState('10:00 AM');
  const [duration, setDuration] = useState(15);
  const [saving, setSaving] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [validationError, setValidationError] = useState('');

  const [questionsList, setQuestionsList] = useState([
    {
      id: `q_${Date.now()}_0`,
      text: '',
      options: ['', '', '', ''],
      correctIdx: 0,
      explanation: ''
    }
  ]);

  const computedEnd = computeEndTime(start, duration);

  const handleAddQuestion = () => {
    setValidationError('');
    setQuestionsList(prev => [
      ...prev,
      {
        id: `q_${Date.now()}_${prev.length}`,
        text: '',
        options: ['', '', '', ''],
        correctIdx: 0,
        explanation: ''
      }
    ]);
  };

  const handleRemoveQuestion = (idxToRemove) => {
    if (questionsList.length <= 1) {
      setQuestionsList([{
        id: `q_${Date.now()}_0`,
        text: '',
        options: ['', '', '', ''],
        correctIdx: 0,
        explanation: ''
      }]);
      return;
    }
    setQuestionsList(prev => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleUpdateQuestionText = (idx, text) => {
    setValidationError('');
    setQuestionsList(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], text };
      return copy;
    });
  };

  const handleUpdateOption = (qIdx, optIdx, val) => {
    setValidationError('');
    setQuestionsList(prev => {
      const copy = [...prev];
      const opts = [...copy[qIdx].options];
      opts[optIdx] = val;
      copy[qIdx] = { ...copy[qIdx], options: opts };
      return copy;
    });
  };

  const handleSetCorrectOption = (qIdx, optIdx) => {
    setQuestionsList(prev => {
      const copy = [...prev];
      copy[qIdx] = { ...copy[qIdx], correctIdx: optIdx };
      return copy;
    });
  };

  const handleUpdateExplanation = (qIdx, explanation) => {
    setQuestionsList(prev => {
      const copy = [...prev];
      copy[qIdx] = { ...copy[qIdx], explanation };
      return copy;
    });
  };

  const handleImportedFromAi = (importedQuestions) => {
    if (!importedQuestions || importedQuestions.length === 0) return;
    setValidationError('');
    const formatted = importedQuestions.map((q, idx) => ({
      id: q.id || `q_ai_${Date.now()}_${idx}`,
      text: q.text || q.question || '',
      options: Array.isArray(q.options) && q.options.length >= 4
        ? q.options.slice(0, 4)
        : [q.options?.[0] || '', q.options?.[1] || '', q.options?.[2] || '', q.options?.[3] || ''],
      correctIdx: typeof q.correct === 'number' ? q.correct : 0,
      explanation: q.explanation || ''
    }));

    setQuestionsList(prev => {
      // If there's only 1 question and it's empty, replace it
      if (prev.length === 1 && !prev[0].text.trim() && !prev[0].options.some(o => o.trim())) {
        return formatted;
      }
      return [...prev, ...formatted];
    });
    setShowAiModal(false);
  };

  const handleSaveQuiz = async (e) => {
    e?.preventDefault();
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Please enter a Quiz Title.');
      return;
    }

    // Filter valid questions: must have question text and at least 2 non-empty options
    const validQuestions = questionsList.filter(q => {
      const hasText = Boolean(q.text && q.text.trim().length > 0);
      const filledOptions = (q.options || []).filter(opt => {
        const str = typeof opt === 'string' ? opt : (opt?.text || '');
        return str.trim().length > 0;
      });
      return hasText && filledOptions.length >= 2;
    });

    if (validQuestions.length === 0) {
      setValidationError('Cannot save quiz without questions: Please enter at least 1 complete question (with question prompt and at least 2 options), or use "Import from AI".');
      return;
    }

    setSaving(true);
    const quizId = `quiz_${Date.now()}`;
    const newQuizPayload = {
      id: quizId,
      title: title.trim(),
      course: course.trim() || 'Computer Science',
      date: date.trim() || getTodayFormatted(),
      windowStart: start.trim() || '10:00 AM',
      windowEnd: computedEnd,
      durationMinutes: Number(duration) || 15,
      status: 'active',
      questions: validQuestions.map((q, idx) => ({
        id: q.id || `q_${quizId}_${idx}`,
        text: q.text.trim(),
        question: q.text.trim(),
        options: q.options.map((opt, oIdx) => {
          const str = typeof opt === 'string' ? opt.trim() : (opt?.text?.trim() || '');
          return str || `Option ${String.fromCharCode(65 + oIdx)}`;
        }),
        correctIndex: typeof q.correctIdx === 'number' ? q.correctIdx : 0,
        explanation: q.explanation?.trim() || ''
      }))
    };

    const answerKeys = {};
    newQuizPayload.questions.forEach(q => {
      answerKeys[q.id] = q.correctIndex;
    });

    try {
      await set(ref(rtdb, `quizzes/${quizId}`), newQuizPayload);
      await set(ref(rtdb, `quiz_keys/${quizId}`), answerKeys);
    } catch (err) {
      console.warn('RTDB save error, saving to localStorage:', err);
    }

    // Always update localStorage
    const local = JSON.parse(localStorage.getItem('gptk_quizzes') || '{}');
    local[quizId] = newQuizPayload;
    localStorage.setItem('gptk_quizzes', JSON.stringify(local));

    const localKeys = JSON.parse(localStorage.getItem('gptk_quiz_keys') || '{}');
    localKeys[quizId] = answerKeys;
    localStorage.setItem('gptk_quiz_keys', JSON.stringify(localKeys));

    setSaving(false);
    if (onSaved) onSaved();
    onClose();
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 800,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '7px',
    letterSpacing: '0.4px',
    textTransform: 'uppercase'
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.16)',
    borderRadius: '12px',
    padding: '11px 14px',
    color: '#ffffff',
    fontSize: '13px',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const modalNode = (
    <>
      <div
        onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        background: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          borderRadius: '24px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          background: '#0d1527',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          margin: 'auto'
        }}
      >
        {/* ── Modal Header (Matching Screenshot 2) ── */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.2px' }}>
            Create New Examination Set
          </h2>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <XIcon size={18} color="#ffffff" />
          </button>
        </div>

        {/* ── Modal Scrollable Body ── */}
        <div style={{
          padding: '24px 28px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '22px'
        }}>
          {/* Top Settings Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Row 1: QUIZ TITLE | SUBJECT / TOPIC | SCHEDULE DATE */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}>QUIZ TITLE</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Cloud Computing &..."
                  style={inputStyle}
                  autoFocus
                />
              </div>

              <div>
                <label style={labelStyle}>SUBJECT / TOPIC</label>
                <input
                  type="text"
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                  placeholder="Computer Science"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>SCHEDULE DATE</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    placeholder="Oct 29, 2026"
                    style={{ ...inputStyle, paddingRight: '40px' }}
                  />
                  <span style={{ position: 'absolute', right: '14px', top: '13px', pointerEvents: 'none' }}>
                    <CalendarIcon size={16} color="rgba(255, 255, 255, 0.6)" />
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: START TIMING | DURATION (MINUTES) | END TIME (AUTO) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}>START TIMING</label>
                <input
                  type="text"
                  value={start}
                  onChange={e => setStart(e.target.value)}
                  placeholder="10:00 AM"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>DURATION (MINUTES)</label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  placeholder="15"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>END TIME (AUTO)</label>
                <div style={{
                  ...inputStyle,
                  border: '1px solid #0284c7',
                  color: '#38bdf8',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {computedEnd}
                </div>
              </div>
            </div>
          </div>

          {/* ── Questions Section Header (Matching Screenshot 2) ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
              Questions ({questionsList.length})
            </h3>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowAiModal(true)}
                style={{
                  background: 'rgba(99, 102, 241, 0.18)',
                  border: '1px solid rgba(129, 140, 248, 0.4)',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '11px',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
              >
                <SparkleIcon size={14} color="#a5b4fc" />
                <span>Import from AI</span>
              </button>

              <button
                type="button"
                onClick={handleAddQuestion}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '11px',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
              >
                <PlusIcon size={14} color="#ffffff" />
                <span>Add Question</span>
              </button>
            </div>
          </div>

          {/* ── Question Cards (Matching Screenshot 2) ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {questionsList.map((q, idx) => (
              <div
                key={q.id || idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  padding: '20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                {/* Question Header: Question #N + Trash */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                    Question #{idx + 1}
                  </span>

                  {questionsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(idx)}
                      title="Remove Question"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(239, 68, 68, 0.7)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex'
                      }}
                    >
                      <TrashIcon size={15} color="#f87171" />
                    </button>
                  )}
                </div>

                {/* Question Prompt */}
                <textarea
                  rows={2}
                  value={q.text}
                  onChange={e => handleUpdateQuestionText(idx, e.target.value)}
                  placeholder={`Enter question #${idx + 1}...`}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    color: '#ffffff',
                    fontSize: '13px',
                    resize: 'none',
                    boxSizing: 'border-box',
                    outline: 'none',
                    lineHeight: '1.4'
                  }}
                />

                {/* Options 2x2 Grid with Clickable A/B/C/D Buttons */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}>
                  {['A', 'B', 'C', 'D'].map((letter, optIdx) => {
                    const isCorrect = q.correctIdx === optIdx;
                    return (
                      <div
                        key={letter}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: isCorrect ? '1.5px solid #10b981' : '1px solid rgba(255, 255, 255, 0.14)',
                          borderRadius: '12px',
                          padding: '4px 8px 4px 6px',
                          transition: 'border-color 0.15s ease'
                        }}
                      >
                        {/* Option Letter Button — Click to mark correct answer (emerald green) */}
                        <button
                          type="button"
                          onClick={() => handleSetCorrectOption(idx, optIdx)}
                          title={`Click to mark option ${letter} as correct`}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '8px',
                            background: isCorrect ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                            color: isCorrect ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                            border: isCorrect ? 'none' : '1px solid rgba(255, 255, 255, 0.16)',
                            fontSize: '12px',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {letter}
                        </button>

                        {/* Option Text Input */}
                        <input
                          type="text"
                          value={q.options[optIdx] || ''}
                          onChange={e => handleUpdateOption(idx, optIdx, e.target.value)}
                          placeholder={`Option ${letter}`}
                          style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            color: '#ffffff',
                            fontSize: '13px',
                            outline: 'none',
                            padding: '6px 4px'
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Tip */}
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', fontStyle: 'italic', marginTop: '-4px' }}>
                  Tip: Click the letter button (A, B, C, D) to mark the correct answer.
                </div>

                {/* Explanation Input */}
                <input
                  type="text"
                  value={q.explanation || ''}
                  onChange={e => handleUpdateExplanation(idx, e.target.value)}
                  placeholder="Answer Explanation (optional — shown during Answer Review)..."
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '9px 12px',
                    color: '#ffffff',
                    fontSize: '12px',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div style={{
            margin: '0 28px 12px',
            padding: '12px 18px',
            borderRadius: '12px',
            background: 'rgba(239, 68, 68, 0.16)',
            border: '1px solid rgba(239, 68, 68, 0.45)',
            color: '#fca5a5',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '16px' }}>⚠️</span>
            <span>{validationError}</span>
          </div>
        )}

        {/* ── Modal Footer (Matching Screenshot 2) ── */}
        <div style={{
          padding: '16px 28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px',
          background: 'rgba(2, 6, 23, 0.4)'
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#ffffff',
              padding: '10px 22px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveQuiz}
            disabled={saving}
            style={{
              background: '#0ea5e9',
              border: 'none',
              color: '#ffffff',
              padding: '10px 26px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              opacity: saving ? 0.7 : 1,
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0284c7')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0ea5e9')}
          >
            {saving ? 'Saving...' : 'Save Quiz'}
          </button>
        </div>
      </div>
    </div>

    {/* ── AI Import Submodal (Sibling Portal: No click bubbling to quiz backdrop) ── */}
    {showAiModal && (
      <AiQuestionImporter
        currentQuiz={{ title: title || 'Examination Set' }}
        onClose={() => setShowAiModal(false)}
        onImportQuestions={handleImportedFromAi}
      />
    )}
  </>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalNode, document.body)
    : modalNode;
}
