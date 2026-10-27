import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '../icons/SvgIcons.jsx';
import { ref, set } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';

export default function QuestionManager({ currentQuiz, answerKeys = {}, onUpdated }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [qText, setQText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctIdx, setCorrectIdx] = useState(0);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!qText.trim()) return;

    const quizId = currentQuiz?.id || 'quiz_fsd_01';
    const newId = `q_${Date.now()}`;
    const newQuestion = { id: newId, text: qText, question: qText, options };
    const updatedQuestions = [...(currentQuiz?.questions || []), newQuestion];
    const updatedKeys = { ...answerKeys, [newId]: correctIdx };

    try {
      await set(ref(rtdb, `quizzes/${quizId}/questions`), updatedQuestions);
      await set(ref(rtdb, `quiz_keys/${quizId}`), updatedKeys);
    } catch (err) {
      console.warn("RTDB question update fallback:", err);
    }

    setQText('');
    setOptions(['', '', '', '']);
    setShowAddForm(false);
    if (onUpdated) onUpdated();
  };

  const handleDelete = async (questionId) => {
    const quizId = currentQuiz?.id || 'quiz_fsd_01';
    const updated = (currentQuiz?.questions || []).filter((q) => q.id !== questionId);
    try {
      await set(ref(rtdb, `quizzes/${quizId}/questions`), updated);
    } catch (err) {
      console.warn("RTDB delete question fallback:", err);
    }
    if (onUpdated) onUpdated();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>Question Bank & Key Vault</h3>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '4px' }}>Answer keys are isolated securely from student viewports.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ background: 'linear-gradient(135deg, #0a84ff, #0066cc)', color: '#ffffff', padding: '9px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 16px rgba(10, 132, 255, 0.35)' }}
        >
          <PlusIcon size={14} />
          <span>{showAddForm ? 'Cancel' : 'Add Question'}</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddQuestion} style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(30px)', border: '1px solid rgba(10, 132, 255, 0.35)', borderRadius: '20px', padding: '24px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <input
            type="text"
            required
            value={qText}
            onChange={(e) => setQText(e.target.value)}
            placeholder="Enter question statement..."
            style={{ width: '100%' }}
          />
          {options.map((opt, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="radio"
                name="correct"
                checked={correctIdx === i}
                onChange={() => setCorrectIdx(i)}
                style={{ accentColor: '#0a84ff', width: '18px', height: '18px' }}
              />
              <input
                type="text"
                required
                value={opt}
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
          <button type="submit" style={{ background: 'linear-gradient(135deg, #0a84ff, #0066cc)', color: '#fff', padding: '10px 18px', borderRadius: '10px', fontWeight: 700, alignSelf: 'flex-start' }}>
            Save Question
          </button>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {(currentQuiz?.questions || []).map((q, idx) => {
          const correctKey = answerKeys[q.id];
          const statement = q.text || q.question || q.statement || q.prompt || `Question ${idx + 1}`;
          return (
            <div key={q.id || idx} style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', lineHeight: '1.4' }}>
                  {idx + 1}. {statement}
                </span>
                <button onClick={() => handleDelete(q.id)} title="Delete Question" style={{ background: 'rgba(255, 69, 58, 0.12)', border: '1px solid rgba(255, 69, 58, 0.25)', color: '#ff453a', padding: '6px', borderRadius: '8px' }}>
                  <TrashIcon size={14} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {(q.options || []).map((opt, optIdx) => {
                  const optVal = typeof opt === 'string' ? opt : (opt?.text || opt?.label || '');
                  const isCorrect = correctKey === optIdx;
                  return (
                    <div key={optIdx} style={{ fontSize: '13px', color: isCorrect ? '#30d158' : 'rgba(255, 255, 255, 0.7)', background: isCorrect ? 'rgba(48, 209, 88, 0.12)' : 'rgba(0, 0, 0, 0.25)', border: `1px solid ${isCorrect ? 'rgba(48, 209, 88, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`, padding: '8px 12px', borderRadius: '10px' }}>
                      {String.fromCharCode(65 + optIdx)}. {optVal} {isCorrect && '✓ (Key)'}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
