import React, { useState } from 'react';
import { ref, set, update, remove } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import {
  PlusIcon,
  TrashIcon,
  EditIcon,
  SparkleIcon,
  CalendarIcon,
  ClockIcon,
  PackageIcon,
  CheckIcon,
  XIcon
} from '../icons/SvgIcons.jsx';
import { glassDeep, glassInner, glassBtn } from '../../glass.js';

export default function PackCard({ quiz, onEditQuestion, onAddQuestion, onAiImport, onUpdated }) {
  const [showModal, setShowModal] = useState(false);
  const [editSched, setEditSched] = useState(false);
  const [expandedQId, setExpandedQId] = useState(null);
  const [start, setStart] = useState(quiz.windowStart || '10:00 AM');
  const [end, setEnd] = useState(quiz.windowEnd || '05:00 PM');
  const [examDate, setExamDate] = useState(quiz.date || 'Today');
  const [dur, setDur] = useState(quiz.durationMinutes || 15);
  const [saved, setSaved] = useState(false);

  const questions = Array.isArray(quiz.questions)
    ? quiz.questions : Object.values(quiz.questions || {});

  const saveSched = async (e) => {
    e.preventDefault();
    try {
      await update(ref(rtdb, `quizzes/${quiz.id}`), {
        windowStart: start,
        windowEnd: end,
        date: examDate,
        durationMinutes: Number(dur)
      });
    } catch {}
    setEditSched(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    if (onUpdated) onUpdated();
  };

  const deleteQuestion = async (e, qid) => {
    e.stopPropagation();
    const updated = questions.filter(q => q.id !== qid);
    try { await set(ref(rtdb, `quizzes/${quiz.id}/questions`), updated); } catch {}
    if (onUpdated) onUpdated();
  };

  const deletePack = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete quiz set "${quiz.title}" and all its questions?`)) return;
    try {
      await remove(ref(rtdb, `quizzes/${quiz.id}`));
      if (onUpdated) onUpdated();
    } catch {}
  };

  return (
    <>
      {/* ── SQUARE CARD (Teacher Quiz Set Card) ── */}
      <div
        onClick={() => setShowModal(true)}
        style={{
          ...glassDeep,
          borderRadius: '26px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '340px',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.25s ease',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          userSelect: 'none'
        }}
      >
        {/* Top: Icon + Status badges + Delete button */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{
              ...glassInner,
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}>
              <PackageIcon size={22} color="#ffffff" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                color: '#4ade80',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.4px'
              }}>
                ● ACTIVE
              </span>

              <button
                onClick={deletePack}
                title="Delete Quiz Set"
                style={{
                  ...glassBtn,
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0
                }}
              >
                <TrashIcon size={13} color="rgba(255, 255, 255, 0.75)" />
              </button>
            </div>
          </div>

          {/* Title & Department */}
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: '4px', lineHeight: '1.3' }}>
            {quiz.title}
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '18px' }}>
            {quiz.course || 'CSE Department'} • {quiz.date || 'Today'}
          </div>
        </div>

        {/* 2x2 Meta Matrix Chips */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '20px'
        }}>
          {/* Chip 1: Time Window */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.32)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            padding: '10px 12px'
          }}>
            <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.55)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
              Time Window
            </div>
            <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {quiz.windowStart || '10:00 AM'} – {quiz.windowEnd || '05:00 PM'}
            </div>
          </div>

          {/* Chip 2: Duration */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.32)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            padding: '10px 12px'
          }}>
            <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.55)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
              Duration
            </div>
            <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: 700 }}>
              {quiz.durationMinutes || 15} Minutes
            </div>
          </div>

          {/* Chip 3: Questions */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.32)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            padding: '10px 12px'
          }}>
            <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.55)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
              Questions
            </div>
            <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: 700 }}>
              {questions.length} Items
            </div>
          </div>

          {/* Chip 4: Exam Date */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.32)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            padding: '10px 12px'
          }}>
            <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.55)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
              Date
            </div>
            <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: 700 }}>
              {quiz.date || 'Oct 28, 2026'}
            </div>
          </div>
        </div>

        {/* Bottom Action Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              ...glassBtn,
              flex: 1,
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 800,
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>Manage Questions ({questions.length})</span>
            <span>→</span>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onAddQuestion(); }}
            title="Add Question"
            style={{ ...glassBtn, width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
          >
            <PlusIcon size={14} color="#ffffff" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onAiImport(); }}
            title="AI Import"
            style={{ ...glassBtn, width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
          >
            <SparkleIcon size={14} color="#ffffff" />
          </button>
        </div>
      </div>

      {/* ── QUESTION & OPTIONS INSPECTOR MODAL ── */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(2, 6, 17, 0.78)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              ...glassDeep,
              borderRadius: '26px',
              maxWidth: '920px',
              width: '100%',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)'
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '22px 28px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {quiz.title}
                  </h3>
                  <span style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    color: '#38bdf8',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {quiz.course || 'CSE Department'}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '4px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span>📅 {quiz.date || 'Today'}</span>
                  <span>•</span>
                  <span>⏰ {quiz.windowStart || '10:00 AM'} – {quiz.windowEnd || '05:00 PM'}</span>
                  <span>•</span>
                  <span>⏳ {quiz.durationMinutes || 15} min</span>
                  <span>•</span>
                  <span>📝 {questions.length} questions</span>
                </div>
              </div>

              {/* Action Buttons in Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={onAddQuestion}
                  style={{ ...glassBtn, padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <PlusIcon size={13} color="#ffffff" />
                  <span>Add Question</span>
                </button>

                <button
                  onClick={onAiImport}
                  style={{ ...glassBtn, padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <SparkleIcon size={13} color="#ffffff" />
                  <span>AI Import</span>
                </button>

                <button
                  onClick={() => setEditSched(s => !s)}
                  style={{ ...glassBtn, padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <CalendarIcon size={13} color="#ffffff" />
                  <span>{editSched ? 'Close Schedule' : 'Schedule'}</span>
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    ...glassBtn,
                    width: '36px',
                    height: '36px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0
                  }}
                >
                  <XIcon size={14} color="#ffffff" />
                </button>
              </div>
            </div>

            {/* Inline Schedule Form */}
            {editSched && (
              <form onSubmit={saveSched} style={{ ...glassInner, margin: '20px 28px 0', borderRadius: '16px', padding: '18px 20px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Exam Date</label>
                  <input type="text" value={examDate} onChange={e=>setExamDate(e.target.value)} placeholder="e.g. Oct 28, 2026" style={{ width: '130px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Window Start</label>
                  <input type="text" value={start} onChange={e=>setStart(e.target.value)} style={{ width: '110px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Window End</label>
                  <input type="text" value={end} onChange={e=>setEnd(e.target.value)} style={{ width: '110px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Duration (min)</label>
                  <input type="number" min="1" max="180" value={dur} onChange={e=>setDur(e.target.value)} style={{ width: '85px' }} />
                </div>
                <button type="submit" style={{ ...glassBtn, padding: '11px 20px', borderRadius: '12px', fontWeight: 800, fontSize: '12px' }}>Save Schedule</button>
                {saved && <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: 700, alignSelf: 'center' }}>✓ Saved!</span>}
              </form>
            )}

            {/* Question List Area */}
            <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {questions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 20px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '18px', border: '1px dashed rgba(255,255,255,0.15)' }}>
                  No questions in this set yet. Click "+ Add Question" or "☆ AI Import" to populate questions.
                </div>
              ) : (
                questions.map((q, idx) => {
                  const text = q.text || q.question || q.statement || `Question ${idx + 1}`;
                  const options = q.options || [];
                  const correctIdx = q.correctIndex !== undefined ? q.correctIndex : q.correctAnswer;

                  return (
                    <div
                      key={q.id || idx}
                      style={{
                        ...glassInner,
                        borderRadius: '18px',
                        padding: '18px 22px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      {/* Question Top Row: Number + Statement + Edit & Delete buttons */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.22)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '13px',
                            flexShrink: 0
                          }}>
                            {idx + 1}
                          </div>

                          <div style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', lineHeight: '1.45', paddingTop: '4px' }}>
                            {text}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                          <button
                            onClick={() => onEditQuestion(q)}
                            style={{
                              ...glassBtn,
                              padding: '6px 14px',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '12px',
                              fontWeight: 700
                            }}
                          >
                            <EditIcon size={12} color="#ffffff" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={(e) => deleteQuestion(e, q.id)}
                            title="Delete Question"
                            style={{
                              ...glassBtn,
                              padding: '6px 10px',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <TrashIcon size={13} color="rgba(255, 255, 255, 0.85)" />
                          </button>
                        </div>
                      </div>

                      {/* Options Grid (A, B, C, D) */}
                      {options.length > 0 && (
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '10px',
                          paddingTop: '6px'
                        }}>
                          {options.map((opt, optIdx) => {
                            const optText = typeof opt === 'string' ? opt : (opt?.text || '');
                            const isCorrect = correctIdx !== undefined && (correctIdx === optIdx || correctIdx === String(optIdx));
                            const letter = String.fromCharCode(65 + optIdx);

                            return (
                              <div
                                key={optIdx}
                                style={{
                                  background: isCorrect ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                                  border: isCorrect ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(255, 255, 255, 0.12)',
                                  borderRadius: '12px',
                                  padding: '10px 14px',
                                  fontSize: '13px',
                                  color: isCorrect ? '#4ade80' : '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px'
                                }}
                              >
                                <span style={{
                                  fontWeight: 800,
                                  color: isCorrect ? '#4ade80' : 'rgba(255,255,255,0.6)',
                                  fontSize: '12px'
                                }}>
                                  {letter}.
                                </span>
                                <span style={{ flex: 1 }}>{optText}</span>
                                {isCorrect && <CheckIcon size={12} color="#4ade80" />}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
