import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '../icons/SvgIcons.jsx';
import { ref, set } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import QuestionEditModal from './QuestionEditModal.jsx';
import AiQuestionImporter from './AiQuestionImporter.jsx';

export default function QuestionManager({ currentQuiz, answerKeys = {}, onUpdated }) {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  const handleDelete = async (e, questionId) => {
    e.stopPropagation();
    const quizId = currentQuiz?.id || 'quiz_fsd_01';
    const updated = (currentQuiz?.questions || []).filter((q) => q.id !== questionId);
    try {
      await set(ref(rtdb, `quizzes/${quizId}/questions`), updated);
    } catch (err) {
      console.warn("RTDB delete question fallback:", err);
    }
    if (onUpdated) onUpdated();
  };

  const questions = currentQuiz?.questions || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>Question Bank & Key Vault</h3>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '4px' }}>Click any question card to edit text, change options, or update answer keys.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowAiModal(true)}
            style={{ background: 'linear-gradient(135deg, #bf5af2 0%, #8944ab 100%)', color: '#ffffff', padding: '9px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 16px rgba(191, 90, 242, 0.35)' }}
          >
            <span>✦</span>
            <span>AI Prompt Import</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            style={{ background: 'linear-gradient(135deg, #0a84ff 0%, #0066cc 100%)', color: '#ffffff', padding: '9px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 16px rgba(10, 132, 255, 0.35)' }}
          >
            <PlusIcon size={14} />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {questions.length === 0 ? (
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '40px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
          No questions in bank. Click "Add Question" or "AI Prompt Import" to create questions.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {questions.map((q, idx) => {
            const correctKey = answerKeys[q.id] ?? 0;
            const statement = q.text || q.question || q.statement || `Question ${idx + 1}`;
            return (
              <div
                key={q.id || idx}
                onClick={() => setEditingQuestion(q)}
                style={{
                  background: 'rgba(255, 255, 255, 0.045)',
                  backdropFilter: 'blur(32px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(10, 132, 255, 0.18)', border: '1px solid rgba(10, 132, 255, 0.35)', color: '#0a84ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {statement}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', background: 'rgba(48, 209, 88, 0.15)', border: '1px solid rgba(48, 209, 88, 0.35)', color: '#30d158', padding: '3px 8px', borderRadius: '8px', fontWeight: 600 }}>
                    Key: Option {String.fromCharCode(65 + correctKey)}
                  </span>
                  <span style={{ fontSize: '11px', background: 'rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.6)', padding: '3px 8px', borderRadius: '8px' }}>
                    4 Options
                  </span>
                  <span style={{ fontSize: '11px', color: '#0a84ff', fontWeight: 600 }}>
                    Edit ✎
                  </span>
                  <button onClick={(e) => handleDelete(e, q.id)} title="Delete Question" style={{ background: 'rgba(255, 69, 58, 0.12)', border: '1px solid rgba(255, 69, 58, 0.25)', color: '#ff453a', padding: '6px 8px', borderRadius: '8px' }}>
                    <TrashIcon size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAddModal && (
        <QuestionEditModal currentQuiz={currentQuiz} answerKeys={answerKeys} onClose={() => setShowAddModal(false)} onSaved={onUpdated} />
      )}

      {editingQuestion && (
        <QuestionEditModal question={editingQuestion} correctKey={answerKeys[editingQuestion.id]} currentQuiz={currentQuiz} answerKeys={answerKeys} onClose={() => setEditingQuestion(null)} onSaved={onUpdated} />
      )}

      {showAiModal && (
        <AiQuestionImporter currentQuiz={currentQuiz} answerKeys={answerKeys} onClose={() => setShowAiModal(false)} onImported={onUpdated} />
      )}
    </div>
  );
}
