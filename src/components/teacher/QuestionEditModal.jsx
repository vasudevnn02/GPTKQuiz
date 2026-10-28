import React, { useState } from 'react';
import { saveQuizQuestions } from '../../services/firebase.js';
import { glassDeep, glassBtn } from '../../glass.js';
import AiQuestionImporter from './AiQuestionImporter.jsx';

const BLANK_Q = () => ({ text: '', options: ['', '', '', ''], correctIdx: 0 });

export default function QuestionEditModal({ question, currentQuiz, answerKeys = {}, onClose, onSaved }) {
  const isEditing = Boolean(question);

  // Single-edit mode state
  const [statement, setStatement] = useState(question?.text || question?.question || '');
  const [options, setOptions] = useState(question?.options?.map(o => typeof o === 'string' ? o : o?.text || '') || ['', '', '', '']);
  const [correctIdx, setCorrectIdx] = useState(question ? (answerKeys[question.id] ?? 0) : 0);

  // Multi-add mode state
  const [mode, setMode] = useState('single'); // 'single' | 'multi' | 'ai'
  const [multiQs, setMultiQs] = useState([BLANK_Q()]);

  const [saving, setSaving] = useState(false);

  // ── Save single question ──
  const handleSaveSingle = async (e) => {
    e.preventDefault();
    if (!statement.trim()) return;
    setSaving(true);
    const quizId = currentQuiz?.id;
    const qId = question?.id || `q_${Date.now()}`;
    const payload = { id: qId, text: statement, question: statement, options };
    let updatedQs;
    if (isEditing) {
      updatedQs = (currentQuiz?.questions || []).map(q => q.id === question.id ? payload : q);
    } else {
      updatedQs = [...(currentQuiz?.questions || []), payload];
    }
    const updatedKeys = { ...answerKeys, [qId]: correctIdx };
    await saveQuizQuestions(quizId, updatedQs, updatedKeys);
    setSaving(false);
    if (onSaved) onSaved();
    onClose();
  };

  // ── Save multiple questions ──
  const handleSaveMulti = async (e) => {
    e.preventDefault();
    const valid = multiQs.filter(q => q.text.trim() && q.options.filter(o => o.trim()).length >= 2);
    if (valid.length === 0) return;
    setSaving(true);
    const quizId = currentQuiz?.id;
    const existing = currentQuiz?.questions || [];
    const newQs = valid.map((q, i) => ({
      id: `q_${Date.now()}_${i}`,
      text: q.text,
      question: q.text,
      options: q.options,
    }));
    const updatedQs = [...existing, ...newQs];
    const updatedKeys = { ...answerKeys };
    newQs.forEach((q, i) => { updatedKeys[q.id] = valid[i].correctIdx; });
    await saveQuizQuestions(quizId, updatedQs, updatedKeys);
    setSaving(false);
    if (onSaved) onSaved();
    onClose();
  };

  const addRow = () => setMultiQs(prev => [...prev, BLANK_Q()]);
  const removeRow = (idx) => setMultiQs(prev => prev.filter((_, i) => i !== idx));
  const updateRow = (idx, field, val) => setMultiQs(prev => {
    const copy = [...prev];
    copy[idx] = { ...copy[idx], [field]: val };
    return copy;
  });
  const updateOption = (qIdx, optIdx, val) => setMultiQs(prev => {
    const copy = [...prev];
    const opts = [...copy[qIdx].options];
    opts[optIdx] = val;
    copy[qIdx] = { ...copy[qIdx], options: opts };
    return copy;
  });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(2, 6, 23, 0.58)',
      backdropFilter: 'blur(22px)',
      WebkitBackdropFilter: 'blur(22px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '720px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        ...glassDeep,
        borderRadius: '26px',
        padding: '32px'
      }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.3px' }}>
              {isEditing ? 'Edit Question' : 'Add Questions'}
            </h3>
            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '3px' }}>
              {currentQuiz?.title || 'Examination Set'}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              ...glassBtn,
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        {!isEditing && (
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '4px',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            gap: '4px',
            marginBottom: '24px'
          }}>
            {[
              { id: 'single', label: '+ Single Question' },
              { id: 'multi',  label: '+ Multiple Questions' },
              { id: 'ai',     label: '✦ AI Import' },
            ].map(m => {
              const isActive = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  style={{
                    flex: 1,
                    padding: '9px 14px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: isActive ? 800 : 600,
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(56,189,248,0.35) 0%, rgba(2,132,199,0.35) 100%)'
                      : 'transparent',
                    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                    border: isActive ? '1px solid rgba(56,189,248,0.55)' : '1px solid transparent',
                    boxShadow: isActive ? '0 2px 10px rgba(56,189,248,0.25), inset 0 1px 0 rgba(255,255,255,0.3)' : 'none',
                    transition: 'all 0.18s ease',
                  }}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        )}

        {/* ── MODE: SINGLE QUESTION ── */}
        {(mode === 'single' || isEditing) && (
          <form onSubmit={handleSaveSingle} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.2px' }}>
                Question Prompt
              </label>
              <textarea
                rows={3}
                required
                value={statement}
                onChange={e => setStatement(e.target.value)}
                placeholder="Enter question statement..."
                style={{
                  width: '100%',
                  resize: 'none',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  color: '#ffffff',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.2px' }}>
                Options — click to select correct answer
              </label>

              {options.map((opt, i) => {
                const isSelected = correctIdx === i;
                const letter = String.fromCharCode(65 + i);
                return (
                  <div
                    key={i}
                    onClick={() => setCorrectIdx(i)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: isSelected ? 'rgba(56, 189, 248, 0.14)' : 'rgba(255, 255, 255, 0.05)',
                      border: isSelected ? '1px solid rgba(56, 189, 248, 0.55)' : '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: '16px',
                      padding: '8px 14px',
                      boxShadow: isSelected
                        ? '0 4px 16px rgba(2, 132, 199, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                        : 'inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                      transition: 'all 0.18s ease',
                      cursor: 'pointer'
                    }}
                  >
                    {/* Custom Radio Button */}
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: isSelected ? '2px solid #38bdf8' : '2px solid rgba(255, 255, 255, 0.35)',
                      background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.18s ease'
                    }}>
                      {isSelected && (
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: '#38bdf8',
                          boxShadow: '0 0 8px #38bdf8'
                        }} />
                      )}
                    </div>

                    <span style={{
                      fontSize: '13px',
                      fontWeight: 800,
                      color: isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.85)',
                      width: '22px',
                      flexShrink: 0
                    }}>
                      {letter}.
                    </span>

                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={e => {
                        const c = [...options];
                        c[i] = e.target.value;
                        setOptions(c);
                      }}
                      placeholder={`Option ${letter}`}
                      onClick={e => e.stopPropagation()}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        padding: '8px 4px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#ffffff'
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={saving}
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                border: '1px solid rgba(56, 189, 248, 0.6)',
                color: '#ffffff',
                padding: '12px 28px',
                borderRadius: '14px',
                fontWeight: 800,
                fontSize: '14px',
                boxShadow: '0 4px 18px rgba(2, 132, 199, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                alignSelf: 'flex-start',
                marginTop: '6px'
              }}
            >
              {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Question'}
            </button>
          </form>
        )}

        {/* ── MODE: MULTIPLE QUESTIONS ── */}
        {mode === 'multi' && !isEditing && (
          <form onSubmit={handleSaveMulti} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {multiQs.map((q, qi) => (
              <div
                key={qi}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '20px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.18)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#38bdf8',
                    background: 'rgba(56, 189, 248, 0.14)',
                    padding: '3px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(56, 189, 248, 0.35)'
                  }}>
                    Question {qi + 1}
                  </span>
                  {multiQs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(qi)}
                      style={{
                        ...glassBtn,
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#f87171',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>

                <textarea
                  rows={2}
                  required
                  value={q.text}
                  onChange={e => updateRow(qi, 'text', e.target.value)}
                  placeholder={`Question ${qi + 1} statement...`}
                  style={{
                    width: '100%',
                    resize: 'none',
                    marginBottom: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {q.options.map((opt, oi) => {
                    const isSelected = q.correctIdx === oi;
                    const letter = String.fromCharCode(65 + oi);
                    return (
                      <div
                        key={oi}
                        onClick={() => updateRow(qi, 'correctIdx', oi)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                          border: isSelected ? '1px solid rgba(56, 189, 248, 0.45)' : '1px solid rgba(255, 255, 255, 0.14)',
                          borderRadius: '14px',
                          padding: '6px 12px',
                          cursor: 'pointer',
                          transition: 'all 0.18s ease'
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: isSelected ? '2px solid #38bdf8' : '2px solid rgba(255, 255, 255, 0.3)',
                          background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }} />}
                        </div>

                        <span style={{
                          fontSize: '12px',
                          fontWeight: 800,
                          color: isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.75)',
                          width: '18px',
                          flexShrink: 0
                        }}>
                          {letter}.
                        </span>

                        <input
                          type="text"
                          value={opt}
                          onChange={e => updateOption(qi, oi, e.target.value)}
                          placeholder={`Option ${letter}`}
                          onClick={e => e.stopPropagation()}
                          style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                            padding: '6px 4px',
                            fontSize: '13px',
                            color: '#ffffff'
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={addRow}
                style={{
                  ...glassBtn,
                  padding: '11px 20px',
                  borderRadius: '14px',
                  fontSize: '13px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                + Add Another Question
              </button>

              <button
                type="submit"
                disabled={saving}
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.6)',
                  color: '#ffffff',
                  padding: '11px 26px',
                  borderRadius: '14px',
                  fontSize: '13px',
                  fontWeight: 800,
                  boxShadow: '0 4px 18px rgba(2, 132, 199, 0.4)',
                  cursor: 'pointer'
                }}
              >
                {saving ? 'Saving...' : `Save All ${multiQs.length} Question${multiQs.length > 1 ? 's' : ''}`}
              </button>
            </div>
          </form>
        )}

        {/* ── MODE: AI IMPORT ── */}
        {mode === 'ai' && !isEditing && (
          <AiQuestionImporter
            currentQuiz={currentQuiz}
            answerKeys={answerKeys}
            onClose={onClose}
            onImported={() => { if (onSaved) onSaved(); onClose(); }}
            embedded
          />
        )}
      </div>
    </div>
  );
}
