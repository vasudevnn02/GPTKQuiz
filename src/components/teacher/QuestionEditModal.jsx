import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { glassDeep, glassBtn } from '../../glass.js';

export default function QuestionEditModal({ question, correctKey = 0, currentQuiz, answerKeys = {}, onClose, onSaved }) {
  const isEditing = Boolean(question);
  const [statement, setStatement] = useState(question?.text || question?.question || '');
  const [options, setOptions] = useState(question?.options || ['', '', '', '']);
  const [correctIdx, setCorrectIdx] = useState(correctKey ?? 0);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!statement.trim()) return;
    setSaving(true);

    const quizId = currentQuiz?.id || 'quiz_fsd_01';
    const qId = question?.id || `q_${Date.now()}`;
    const questionPayload = { id: qId, text: statement, question: statement, options };

    let updatedQuestions;
    if (isEditing) {
      updatedQuestions = (currentQuiz?.questions || []).map((q) => (q.id === question.id ? questionPayload : q));
    } else {
      updatedQuestions = [...(currentQuiz?.questions || []), questionPayload];
    }

    const updatedKeys = { ...answerKeys, [qId]: correctIdx };

    try {
      await set(ref(rtdb, `quizzes/${quizId}/questions`), updatedQuestions);
      await set(ref(rtdb, `quiz_keys/${quizId}`), updatedKeys);
    } catch (err) {
      console.warn("RTDB modal save fallback:", err);
    }

    setSaving(false);
    if (onSaved) onSaved();
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto', ...glassDeep, borderRadius: '26px', padding: '34px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
            {isEditing ? 'Edit Question & Key' : 'Create New Question'}
          </h3>
          <button onClick={onClose} style={{ ...glassBtn, padding: '7px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700 }}>✕ Close</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Question Prompt</label>
            <textarea rows={3} required value={statement} onChange={(e) => setStatement(e.target.value)} placeholder="Enter question statement..." style={{ width: '100%', resize: 'none' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>Select Correct Option (Radio) & Edit Text</label>
            {options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="radio" name="edit_correct" checked={correctIdx === i} onChange={() => setCorrectIdx(i)} style={{ accentColor: '#0f172a', width: '18px', height: '18px' }} />
                <input
                  type="text"
                  required
                  value={typeof opt === 'string' ? opt : (opt?.text || '')}
                  onChange={(e) => {
                    const copy = [...options];
                    copy[i] = e.target.value;
                    setOptions(copy);
                  }}
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  style={{ flex: 1 }}
                />
              </div>
            ))}
          </div>

          <button type="submit" disabled={saving} style={{ ...glassBtn, padding: '12px 24px', borderRadius: '12px', fontWeight: 800, fontSize: '14px', alignSelf: 'flex-start', marginTop: '6px', background: '#0f172a', color: '#ffffff' }}>
            {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Question'}
          </button>
        </form>
      </div>
    </div>
  );
}
