import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';

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
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto', background: 'rgba(22, 26, 38, 0.85)', backdropFilter: 'blur(36px) saturate(200%)', border: '1px solid rgba(10, 132, 255, 0.35)', borderRadius: '24px', padding: '32px', boxShadow: '0 24px 60px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>
            {isEditing ? 'Edit Question & Key' : 'Create New Question'}
          </h3>
          <button onClick={onClose} style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'rgba(255,255,255,0.7)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px' }}>✕ Close</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px' }}>Question Prompt</label>
            <textarea rows={3} required value={statement} onChange={(e) => setStatement(e.target.value)} placeholder="Enter question statement..." style={{ width: '100%', resize: 'none' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)' }}>Select Correct Option (Radio) & Edit Text</label>
            {options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="radio" name="edit_correct" checked={correctIdx === i} onChange={() => setCorrectIdx(i)} style={{ accentColor: '#30d158', width: '18px', height: '18px' }} />
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

          <button type="submit" disabled={saving} style={{ background: 'linear-gradient(135deg, #0a84ff 0%, #0066cc 100%)', color: '#fff', padding: '12px 22px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', alignSelf: 'flex-start', marginTop: '6px', boxShadow: '0 4px 18px rgba(10, 132, 255, 0.35)' }}>
            {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Question'}
          </button>
        </form>
      </div>
    </div>
  );
}
