import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ref, set, update } from 'firebase/database';
import { rtdb, deleteQuizPack, saveQuizQuestions } from '../../services/firebase.js';
import {
  PlusIcon,
  TrashIcon,
  EditIcon,
  SparkleIcon,
  CalendarIcon,
  ClockIcon,
  CopyIcon,
  ListIcon,
  CheckIcon,
  XIcon
} from '../icons/SvgIcons.jsx';
import { glassDeep, glassInner, glassBtn } from '../../glass.js';

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

export default function PackCard({ quiz, onEditQuestion, onAddQuestion, onAiImport, onUpdated }) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  // Editable fields in modal
  const [title, setTitle] = useState(quiz.title || '');
  const [course, setCourse] = useState(quiz.course || 'Computer Science');
  const [date, setDate] = useState(quiz.date || 'Today');
  const [start, setStart] = useState(quiz.windowStart || '10:00 AM');
  const [duration, setDuration] = useState(quiz.durationMinutes || 15);
  const [questionsList, setQuestionsList] = useState([]);

  // Sync state when quiz prop changes or modal opens
  useEffect(() => {
    setTitle(quiz.title || '');
    setCourse(quiz.course || 'Computer Science');
    setDate(quiz.date || 'Today');
    setStart(quiz.windowStart || '10:00 AM');
    setDuration(quiz.durationMinutes || 15);

    const raw = Array.isArray(quiz.questions)
      ? quiz.questions
      : Object.values(quiz.questions || {});

    setQuestionsList(
      raw.map((q, idx) => ({
        id: q.id || `q_${idx}_${Date.now()}`,
        text: q.text || q.question || '',
        options: Array.isArray(q.options)
          ? q.options.map(o => (typeof o === 'string' ? o : o?.text || ''))
          : ['', '', '', ''],
        correctIdx: q.correctIndex !== undefined ? q.correctIndex : (q.correctAnswer ?? 0),
        explanation: q.explanation || ''
      }))
    );
  }, [quiz, showModal]);

  const questionsCount = Array.isArray(quiz.questions)
    ? quiz.questions.length
    : Object.keys(quiz.questions || {}).length;

  const computedEnd = computeEndTime(start, duration);

  const isToday = (quiz.date || '').toLowerCase().includes('today') ||
    quiz.date === new Date().toISOString().split('T')[0];

  // Clone Quiz Set
  const handleClone = async (e) => {
    e.stopPropagation();
    const newId = `quiz_${Date.now()}`;
    const cloned = {
      ...quiz,
      id: newId,
      title: `${quiz.title} (Copy)`,
      createdAt: Date.now()
    };
    try {
      await set(ref(rtdb, `quizzes/${newId}`), cloned);
    } catch (err) {
      console.warn("Clone RTDB fallback:", err);
    }
    const local = JSON.parse(localStorage.getItem('gptk_quizzes') || '{}');
    local[newId] = cloned;
    localStorage.setItem('gptk_quizzes', JSON.stringify(local));
    if (onUpdated) onUpdated();
  };

  // Delete Quiz Set
  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteQuizPack(quiz.id);
    } catch (err) {
      console.warn("Delete error:", err);
    }
    setDeleting(false);
    setShowDeleteConfirm(false);
    if (onUpdated) onUpdated();
  };

  // Save Modal Edits
  const handleSaveModal = async (e) => {
    e?.preventDefault();
    setSaving(true);
    const updatedPayload = {
      ...quiz,
      title: title.trim(),
      course: course.trim(),
      date,
      windowStart: start,
      windowEnd: computedEnd,
      durationMinutes: Number(duration),
      questions: questionsList.map(q => ({
        id: q.id,
        text: q.text,
        question: q.text,
        options: q.options,
        correctIndex: q.correctIdx,
        explanation: q.explanation
      }))
    };

    try {
      await update(ref(rtdb, `quizzes/${quiz.id}`), updatedPayload);
      const answerKeys = {};
      questionsList.forEach(q => { answerKeys[q.id] = q.correctIdx; });
      await set(ref(rtdb, `quiz_keys/${quiz.id}`), answerKeys);
    } catch (err) {
      console.warn("RTDB update error:", err);
    }

    const local = JSON.parse(localStorage.getItem('gptk_quizzes') || '{}');
    local[quiz.id] = updatedPayload;
    localStorage.setItem('gptk_quizzes', JSON.stringify(local));

    setSaving(false);
    setShowModal(false);
    if (onUpdated) onUpdated();
  };

  // Add question inside modal
  const handleAddQuestionLocal = () => {
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

  const handleRemoveQuestionLocal = (qid) => {
    setQuestionsList(prev => prev.filter(q => q.id !== qid));
  };

  const handleUpdateQuestionField = (qid, field, val) => {
    setQuestionsList(prev =>
      prev.map(q => (q.id === qid ? { ...q, [field]: val } : q))
    );
  };

  const handleUpdateOptionLocal = (qid, optIdx, val) => {
    setQuestionsList(prev =>
      prev.map(q => {
        if (q.id !== qid) return q;
        const opts = [...q.options];
        opts[optIdx] = val;
        return { ...q, options: opts };
      })
    );
  };

  const chipStyle = {
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '4px 9px',
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.85)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: 600
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 800,
    color: 'rgba(255, 255, 255, 0.65)',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.16)',
    borderRadius: '12px',
    padding: '11px 14px',
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: 600,
    outline: 'none'
  };

  return (
    <>
      {/* ── CARD (Matching Screenshot 1 exactly) ── */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: isToday ? '1px solid #0284c7' : '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '215px',
          position: 'relative',
          userSelect: 'none',
          transition: 'all 0.2s ease'
        }}
      >
        {/* Top: Title + Department + Date Chip */}
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px', gap: '8px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: '1.3' }}>
              {quiz.title}
            </h3>

            {/* Date Pill (Yellow or Red) */}
            <span style={{
              fontSize: '10px',
              fontWeight: 800,
              padding: '3px 9px',
              borderRadius: '7px',
              background: isToday ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.16)',
              color: isToday ? '#f87171' : '#facc15',
              border: isToday ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(234, 179, 8, 0.35)',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              flexShrink: 0
            }}>
              {isToday ? 'TODAY' : (quiz.date || '2026-10-27')}
            </span>
          </div>

          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.55)', marginBottom: '14px' }}>
            {quiz.course || 'Computer Science'}
          </div>

          {/* Row 1 Chips: Date + Start Time */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <div style={chipStyle}>
              <CalendarIcon size={12} color="rgba(255, 255, 255, 0.65)" />
              <span>{quiz.date || 'Today'}</span>
            </div>
            <div style={chipStyle}>
              <ClockIcon size={12} color="rgba(255, 255, 255, 0.65)" />
              <span>Start: {quiz.windowStart || '10:00 AM'}</span>
            </div>
          </div>

          {/* Row 2 Chips: End Time + Duration + Questions */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <div style={chipStyle}>
              <ClockIcon size={12} color="rgba(255, 255, 255, 0.65)" />
              <span>End: {quiz.windowEnd || computedEnd}</span>
            </div>
            <div style={chipStyle}>
              <ClockIcon size={12} color="rgba(255, 255, 255, 0.65)" />
              <span>{quiz.durationMinutes || 15} Mins</span>
            </div>
            <div style={chipStyle}>
              <ListIcon size={12} color="rgba(255, 255, 255, 0.65)" />
              <span>{questionsCount} Qs</span>
            </div>
          </div>
        </div>

        {/* Row 3 Buttons: Edit | Clone | Trash */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '11px',
              fontSize: '13px',
              fontWeight: 700,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <EditIcon size={13} color="#ffffff" />
            <span>Edit</span>
          </button>

          <button
            onClick={handleClone}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '11px',
              fontSize: '13px',
              fontWeight: 700,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <CopyIcon size={13} color="#ffffff" />
            <span>Clone</span>
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            title="Delete Quiz Set"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '11px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <TrashIcon size={14} color="#f87171" />
          </button>
        </div>
      </div>

      {/* ── EDIT QUIZ & QUESTIONS MODAL (Matching Screenshot 2 exactly) ── */}
      {showModal && typeof document !== 'undefined' && createPortal(
        <div
          onClick={() => setShowModal(false)}
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
            onClick={(e) => e.stopPropagation()}
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
            {/* Modal Header */}
            <div style={{
              padding: '20px 28px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Edit Quiz & Questions
              </h2>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <XIcon size={18} color="#ffffff" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* Top Settings Rows (Matching Screenshot 2 Row 1 & Row 2) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Row 1: QUIZ TITLE | SUBJECT / TOPIC | SCHEDULE DATE */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>QUIZ TITLE</label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Quiz Title"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>SUBJECT / TOPIC</label>
                    <input
                      type="text"
                      value={course}
                      onChange={e => setCourse(e.target.value)}
                      placeholder="Subject / Topic"
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
                        placeholder="Oct 27, 2026"
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
                      placeholder="11:50 PM"
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

              {/* Questions Section Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                  Questions ({questionsList.length})
                </h3>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onAiImport) onAiImport();
                    }}
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
                      cursor: 'pointer'
                    }}
                  >
                    <SparkleIcon size={14} color="#a5b4fc" />
                    <span>Import from AI</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddQuestionLocal}
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
                      cursor: 'pointer'
                    }}
                  >
                    <PlusIcon size={14} color="#ffffff" />
                    <span>Add Question</span>
                  </button>
                </div>
              </div>

              {/* Questions List */}
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
                    {/* Question Header: Question #N + Remove */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                        Question #{idx + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleRemoveQuestionLocal(q.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#f87171',
                          fontSize: '13px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <TrashIcon size={14} color="#f87171" />
                        <span>Remove</span>
                      </button>
                    </div>

                    {/* Question Statement Input */}
                    <input
                      type="text"
                      value={q.text}
                      onChange={e => handleUpdateQuestionField(q.id, 'text', e.target.value)}
                      placeholder="Type question prompt here..."
                      style={{
                        ...inputStyle,
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        fontSize: '15px'
                      }}
                    />

                    {/* Options Grid (A, B, C, D) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {['A', 'B', 'C', 'D'].map((letter, optIdx) => {
                        const isCorrect = q.correctIdx === optIdx;
                        return (
                          <div
                            key={letter}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              background: 'rgba(255, 255, 255, 0.04)',
                              border: isCorrect ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.12)',
                              borderRadius: '12px',
                              overflow: 'hidden'
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => handleUpdateQuestionField(q.id, 'correctIdx', optIdx)}
                              title={`Set ${letter} as correct answer`}
                              style={{
                                width: '38px',
                                height: '38px',
                                background: isCorrect ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                                border: 'none',
                                color: isCorrect ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                                fontWeight: 800,
                                fontSize: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                flexShrink: 0
                              }}
                            >
                              {letter}
                            </button>

                            <input
                              type="text"
                              value={q.options[optIdx] || ''}
                              onChange={e => handleUpdateOptionLocal(q.id, optIdx, e.target.value)}
                              placeholder={`Option ${letter}`}
                              style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                padding: '10px 12px',
                                color: '#ffffff',
                                fontSize: '13px',
                                fontWeight: 600,
                                outline: 'none'
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Helper text */}
                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', fontStyle: 'italic' }}>
                      Tip: Click the letter button (A, B, C, D) to mark the correct answer.
                    </div>

                    {/* Explanation Input */}
                    <input
                      type="text"
                      value={q.explanation || ''}
                      onChange={e => handleUpdateQuestionField(q.id, 'explanation', e.target.value)}
                      placeholder="Answer Explanation (optional — shown during Answer Review)..."
                      style={{
                        ...inputStyle,
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        background: 'rgba(255, 255, 255, 0.02)'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Footer Actions */}
            <div style={{
              padding: '16px 28px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              background: 'rgba(10, 16, 31, 0.8)'
            }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#ffffff',
                  padding: '10px 20px',
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
                onClick={handleSaveModal}
                disabled={saving}
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  border: '1px solid #38bdf8',
                  color: '#ffffff',
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  opacity: saving ? 0.7 : 1
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── IN-APP DELETE CONFIRMATION MODAL ── */}
      {showDeleteConfirm && typeof document !== 'undefined' && createPortal(
        <div
          onClick={() => setShowDeleteConfirm(false)}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999999,
            background: 'rgba(2, 6, 23, 0.8)',
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
              maxWidth: '420px',
              width: '100%',
              borderRadius: '24px',
              padding: '28px',
              textAlign: 'center',
              margin: 'auto',
              background: '#0d1527',
              border: '1px solid rgba(255, 255, 255, 0.16)'
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#f87171'
            }}>
              <TrashIcon size={22} color="#f87171" />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Delete Quiz Set?
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.5', marginBottom: '22px' }}>
              Are you sure you want to permanently delete <strong style={{ color: '#ffffff' }}>"{quiz.title}"</strong> and all its {questionsCount} questions from the database?
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  border: '1px solid rgba(248, 113, 113, 0.6)',
                  color: '#ffffff',
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {deleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
