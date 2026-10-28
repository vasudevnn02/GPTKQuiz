import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { PlusIcon } from '../icons/SvgIcons.jsx';
import { glass, glassDeep, glassBtn } from '../../glass.js';
import PackCard from './PackCard.jsx';
import QuestionEditModal from './QuestionEditModal.jsx';
import AiQuestionImporter from './AiQuestionImporter.jsx';

export default function QuestionPackManager({ quizzes = {}, onUpdated, onOpenNewQuizModal }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'today'
  const [editQ, setEditQ] = useState(null);
  const [editQuizId, setEditQuizId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addTargetQuiz, setAddTargetQuiz] = useState(null);
  const [showAi, setShowAi] = useState(false);
  const [aiTargetQuiz, setAiTargetQuiz] = useState(null);
  const [showNewPack, setShowNewPack] = useState(false);
  const [newPackTitle, setNewPackTitle] = useState('');
  const [newPackCourse, setNewPackCourse] = useState('');

  const packList = Object.values(quizzes);
  const todayCount = packList.filter(q => (q.date || '').toLowerCase().includes('today') || q.date === new Date().toISOString().split('T')[0]).length;
  const filteredList = filter === 'today'
    ? packList.filter(q => (q.date || '').toLowerCase().includes('today') || q.date === new Date().toISOString().split('T')[0])
    : packList;

  const handleCreatePack = async (e) => {
    e.preventDefault();
    if (!newPackTitle.trim()) return;
    const id = `quiz_${Date.now()}`;
    const pack = {
      id,
      title: newPackTitle.trim(),
      course: newPackCourse.trim() || 'General',
      date: 'Today',
      windowStart: '10:00 AM',
      windowEnd: '05:00 PM',
      durationMinutes: 15,
      status: 'active',
      questions: []
    };
    try { await set(ref(rtdb, `quizzes/${id}`), pack); } catch {}
    setNewPackTitle('');
    setNewPackCourse('');
    setShowNewPack(false);
    if (onUpdated) onUpdated();
  };

  return (
    <div style={{
      background: 'rgba(11, 19, 38, 0.75)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '26px 28px',
      boxShadow: 'none'
    }}>
      {/* ── Subheader Bar matching Screenshot 1 ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Manage Examination Sets & Questions
          </h2>
          <span style={{
            background: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid #16a34a',
            borderRadius: '6px',
            padding: '3px 8px',
            fontSize: '11px',
            fontWeight: 800,
            color: '#22c55e',
            textTransform: 'uppercase',
            letterSpacing: '0.6px'
          }}>
            FACULTY STUDIO
          </span>
        </div>

        {/* Filter Pills: All (N) | Today (N) (Matching Screenshot 1) */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '3px',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          gap: '3px'
        }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '6px 16px',
              borderRadius: '9px',
              fontSize: '12px',
              fontWeight: filter === 'all' ? 800 : 600,
              background: filter === 'all' ? '#ffffff' : 'transparent',
              color: filter === 'all' ? '#0f172a' : '#ffffff',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            All ({packList.length})
          </button>
          <button
            onClick={() => setFilter('today')}
            style={{
              padding: '6px 16px',
              borderRadius: '9px',
              fontSize: '12px',
              fontWeight: filter === 'today' ? 800 : 600,
              background: filter === 'today' ? '#ffffff' : 'transparent',
              color: filter === 'today' ? '#0f172a' : '#ffffff',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Today ({todayCount})
          </button>
        </div>
      </div>

      {/* New Pack Inline Modal / Form if open */}
      {showNewPack && (
        <form onSubmit={handleCreatePack} style={{ ...glass, borderRadius: '20px', padding: '22px', marginBottom: '22px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Quiz / Set Title</label>
            <input value={newPackTitle} onChange={e => setNewPackTitle(e.target.value)} placeholder="e.g. Unit 1 — Data Structures" style={{ width: '260px' }} required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Course / Department</label>
            <input value={newPackCourse} onChange={e => setNewPackCourse(e.target.value)} placeholder="e.g. Computer Science" style={{ width: '200px' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ ...glassBtn, padding: '10px 22px', borderRadius: '12px', fontWeight: 800, fontSize: '13px' }}>Create Set</button>
            <button type="button" onClick={() => setShowNewPack(false)} style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', padding: '10px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: 600 }}>Cancel</button>
          </div>
        </form>
      )}

      {/* ── Sets Grid with Compact Square Cards ── */}
      {filteredList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(255, 255, 255, 0.55)', fontSize: '14px' }}>
          No quizzes found for this filter.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filteredList.map(quiz => (
            <PackCard
              key={quiz.id}
              quiz={quiz}
              onEditQuestion={(q) => { setEditQ(q); setEditQuizId(quiz.id); }}
              onAddQuestion={() => { setAddTargetQuiz(quiz); setShowAddModal(true); }}
              onAiImport={() => { setAiTargetQuiz(quiz); setShowAi(true); }}
              onUpdated={onUpdated}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showAddModal && addTargetQuiz && (
        <QuestionEditModal currentQuiz={addTargetQuiz} answerKeys={{}} onClose={() => setShowAddModal(false)} onSaved={onUpdated} />
      )}
      {editQ && editQuizId && (
        <QuestionEditModal question={editQ} currentQuiz={quizzes[editQuizId]} answerKeys={{}} onClose={() => setEditQ(null)} onSaved={onUpdated} />
      )}
      {showAi && aiTargetQuiz && (
        <AiQuestionImporter currentQuiz={aiTargetQuiz} answerKeys={{}} onClose={() => setShowAi(false)} onImported={onUpdated} />
      )}
    </div>
  );
}
