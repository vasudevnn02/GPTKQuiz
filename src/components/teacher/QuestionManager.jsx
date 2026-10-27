import React, { useState } from 'react';
import { PlusIcon, TrashIcon, CheckCircleIcon } from '../icons/SvgIcons.jsx';
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
    const newQuestion = { id: newId, text: qText, options };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f1f1' }}>Question Bank & Answer Keys</h3>
          <p style={{ fontSize: '12px', color: '#aaaaaa' }}>Answer keys are stored securely on the teacher channel.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ background: '#3ea6ff', color: '#0f0f0f', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <PlusIcon size={14} />
          <span>{showAddForm ? 'Cancel' : 'Add Question'}</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddQuestion} style={{ background: '#212121', border: '1px solid #3ea6ff', borderRadius: '10px', padding: '18px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            required
            value={qText}
            onChange={(e) => setQText(e.target.value)}
            placeholder="Enter question statement..."
            style={{ width: '100%' }}
          />
          {options.map((opt, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="radio"
                name="correct"
                checked={correctIdx === i}
                onChange={() => setCorrectIdx(i)}
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
          <button type="submit" style={{ background: '#3ea6ff', color: '#000', padding: '10px', borderRadius: '6px', fontWeight: 700, alignSelf: 'flex-start' }}>
            Save Question
          </button>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {(currentQuiz?.questions || []).map((q, idx) => {
          const correctKey = answerKeys[q.id];
          return (
            <div key={q.id} style={{ background: '#212121', border: '1px solid #272727', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#f1f1f1' }}>
                  {idx + 1}. {q.text}
                </span>
                <button onClick={() => handleDelete(q.id)} title="Delete Question" style={{ background: 'transparent', color: '#ef4444', padding: '4px' }}>
                  <TrashIcon size={16} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {q.options.map((opt, optIdx) => {
                  const isCorrect = correctKey === optIdx;
                  return (
                    <div key={optIdx} style={{ fontSize: '12px', color: isCorrect ? '#86efac' : '#aaaaaa', background: isCorrect ? '#143823' : '#181818', padding: '6px 10px', borderRadius: '4px' }}>
                      {String.fromCharCode(65 + optIdx)}. {opt} {isCorrect && '✓ (Key)'}
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
