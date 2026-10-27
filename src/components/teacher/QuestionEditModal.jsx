import React, { useState } from 'react';
import { saveQuizQuestions } from '../../services/firebase.js';
import { glassDeep, glassInner, glassBtn } from '../../glass.js';
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
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '700px', width: '100%', maxHeight: '92vh', overflowY: 'auto', ...glassDeep, borderRadius: '28px', padding: '32px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              {isEditing ? 'Edit Question' : 'Add Questions'}
            </h3>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '3px' }}>
              {currentQuiz?.title}
            </div>
          </div>
          <button onClick={onClose} style={{ ...glassBtn, padding: '7px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700 }}>✕ Close</button>
        </div>

        {/* Mode Switcher (only when adding, not editing) */}
        {!isEditing && (
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '4px', border: '1px solid rgba(255,255,255,0.1)', gap: '4px', marginBottom: '22px' }}>
            {[
              { id: 'single', label: '+ Single Question' },
              { id: 'multi',  label: '+ Multiple Questions' },
              { id: 'ai',     label: '✦ AI Import' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: mode === m.id ? 800 : 600,
                  background: mode === m.id ? 'rgba(56,189,248,0.25)' : 'transparent',
                  color: mode === m.id ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  border: mode === m.id ? '1px solid rgba(56,189,248,0.4)' : '1px solid transparent',
                  boxShadow: mode === m.id ? 'inset 0 1px 0 rgba(255,255,255,0.25)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}

        {/* ── MODE: SINGLE ── */}
        {(mode === 'single' || isEditing) && (
          <form onSubmit={handleSaveSingle} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>Question Prompt</label>
              <textarea rows={3} required value={statement} onChange={e => setStatement(e.target.value)} placeholder="Enter question statement..." style={{ width: '100%', resize: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>Options — select correct answer</label>
              {options.map((opt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="radio" name="correct" checked={correctIdx === i} onChange={() => setCorrectIdx(i)} style={{ accentColor: '#38bdf8', width: '18px', height: '18px' }} />
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 700, width: '22px' }}>{String.fromCharCode(65+i)}.</span>
                  <input type="text" required value={opt} onChange={e => { const c=[...options]; c[i]=e.target.value; setOptions(c); }} placeholder={`Option ${String.fromCharCode(65+i)}`} style={{ flex: 1 }} />
                </div>
              ))}
            </div>
            <button type="submit" disabled={saving} style={{ ...glassBtn, padding: '12px 24px', borderRadius: '14px', fontWeight: 800, fontSize: '14px', alignSelf: 'flex-start', marginTop: '6px' }}>
              {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Question'}
            </button>
          </form>
        )}

        {/* ── MODE: MULTI ── */}
        {mode === 'multi' && !isEditing && (
          <form onSubmit={handleSaveMulti} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {multiQs.map((q, qi) => (
              <div key={qi} style={{ ...glassInner, borderRadius: '18px', padding: '20px', border: '1px solid rgba(255,255,255,0.14)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#38bdf8' }}>Q{qi + 1}</span>
                  {multiQs.length > 1 && (
                    <button type="button" onClick={() => removeRow(qi)} style={{ ...glassBtn, padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, color: '#fca5a5' }}>✕ Remove</button>
                  )}
                </div>
                <textarea
                  rows={2}
                  required
                  value={q.text}
                  onChange={e => updateRow(qi, 'text', e.target.value)}
                  placeholder={`Question ${qi+1} statement...`}
                  style={{ width: '100%', resize: 'none', marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {q.options.map((opt, oi) => (
                    <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="radio" name={`correct_q${qi}`} checked={q.correctIdx === oi} onChange={() => updateRow(qi, 'correctIdx', oi)} style={{ accentColor: '#38bdf8', width: '16px', height: '16px' }} />
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, width: '20px' }}>{String.fromCharCode(65+oi)}.</span>
                      <input
                        type="text"
                        value={opt}
                        onChange={e => updateOption(qi, oi, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65+oi)}`}
                        style={{ flex: 1 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button type="button" onClick={addRow} style={{ ...glassBtn, padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                + Add Another Question
              </button>
              <button type="submit" disabled={saving} style={{ background: 'linear-gradient(135deg,#0284c7,#0369a1)', border: '1px solid rgba(56,189,248,0.5)', color: '#fff', padding: '10px 24px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, boxShadow: '0 4px 16px rgba(2,132,199,0.4)', cursor: 'pointer' }}>
                {saving ? 'Saving...' : `Save All ${multiQs.length} Question${multiQs.length > 1 ? 's' : ''}`}
              </button>
            </div>
          </form>
        )}

        {/* ── MODE: AI ── */}
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
