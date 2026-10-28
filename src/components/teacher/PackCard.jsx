import React, { useState } from 'react';
import { ref, set, update } from 'firebase/database';
import { rtdb, deleteQuizPack, saveQuizQuestions } from '../../services/firebase.js';
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
    await saveQuizQuestions(quiz.id, updated, {});
    if (onUpdated) onUpdated();
  };

  const deletePack = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete quiz set "${quiz.title}" and all its questions?`)) return;
    await deleteQuizPack(quiz.id);
    if (onUpdated) onUpdated();
  };

  return (
    <>
      {/* ── COMPACT TRANSPARENT GLASS SQUARE CARD ── */}
      <div
        onClick={() => setShowModal(true)}
        style={{
          border: '3px solid hsl(0, 0%, 100%, 0.3)',
          background: 'hsl(0, 0%, 100%, 0.2)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          borderRadius: '24px',
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '220px',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.25s ease',
          userSelect: 'none'
        }}
      >
        {/* Top: Icon + Status badge + Delete button */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '13px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}>
              <PackageIcon size={18} color="#ffffff" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                color: '#4ade80',
                padding: '3px 9px',
                borderRadius: '10px',
                fontSize: '10px',
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
                  width: '30px',
                  height: '30px',
                  borderRadius: '9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0
                }}
              >
                <TrashIcon size={12} color="rgba(255, 255, 255, 0.75)" />
              </button>
            </div>
          </div>

          {/* Title & Department */}
          <div style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '2px', lineHeight: '1.3' }}>
            {quiz.title}
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '14px' }}>
            {quiz.course || 'CSE Department'} • {quiz.date || 'Today'}
          </div>
        </div>

        {/* Compact Meta Chips (Pure Transparent Glass) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          marginBottom: '14px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '10px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#ffffff'
          }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>Time Window</span>
            <span style={{ fontWeight: 700 }}>{quiz.windowStart || '10:00 AM'} – {quiz.windowEnd || '05:00 PM'}</span>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '10px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#ffffff'
          }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>Questions & Time</span>
            <span style={{ fontWeight: 700 }}>{questions.length} Qs • {quiz.durationMinutes || 15} min</span>
          </div>
        </div>

        {/* Bottom Action Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 800,
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 2px 10px rgba(2, 132, 199, 0.25)',
              cursor: 'pointer'
            }}
          >
            <span>Questions ({questions.length})</span>
            <span>→</span>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onAddQuestion(); }}
            title="Add Question"
            style={{ ...glassBtn, width: '32px', height: '32px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
          >
            <PlusIcon size={13} color="#ffffff" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onAiImport(); }}
            title="AI Import"
            style={{ ...glassBtn, width: '32px', height: '32px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
          >
            <SparkleIcon size={13} color="#ffffff" />
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
            background: 'rgba(2, 6, 23, 0.58)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
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
              overflow: 'hidden'
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
