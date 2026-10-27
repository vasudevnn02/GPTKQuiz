import React, { useState } from 'react';
import { ref, set, update } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { PlusIcon, PackageIcon, CalendarIcon, SparkleIcon } from '../icons/SvgIcons.jsx';
import PackCard from './PackCard.jsx';
import QuestionEditModal from './QuestionEditModal.jsx';
import AiQuestionImporter from './AiQuestionImporter.jsx';

const GLASS = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(48px) saturate(200%)',
  WebkitBackdropFilter: 'blur(48px) saturate(200%)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '22px',
  boxShadow: '0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18)',
};

export default function QuestionPackManager({ quizzes = {}, onUpdated }) {
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

  const handleCreatePack = async (e) => {
    e.preventDefault();
    if (!newPackTitle.trim()) return;
    const id = `quiz_${Date.now()}`;
    const pack = {
      id, title: newPackTitle.trim(),
      course: newPackCourse.trim() || 'General',
      windowStart: '10:00 AM', windowEnd: '05:00 PM',
      durationMinutes: 15, status: 'active', questions: []
    };
    try { await set(ref(rtdb, `quizzes/${id}`), pack); } catch {}
    setNewPackTitle(''); setNewPackCourse(''); setShowNewPack(false);
    if (onUpdated) onUpdated();
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <h3 style={{ fontSize:'22px', fontWeight:700, color:'#fff' }}>Question Bank</h3>
          <p style={{ fontSize:'12px', color:'rgba(200,220,255,0.5)', marginTop:'4px' }}>
            Each pack is a self-contained set with its own schedule.
          </p>
        </div>
        <button
          onClick={() => setShowNewPack(true)}
          style={{ ...GLASS, padding:'10px 20px', fontSize:'13px', fontWeight:700, color:'#fff', display:'flex', alignItems:'center', gap:'8px', borderRadius:'14px', cursor:'pointer' }}
        >
          <PlusIcon size={14} /> New Pack
        </button>
      </div>

      {/* New Pack Form */}
      {showNewPack && (
        <form onSubmit={handleCreatePack} style={{ ...GLASS, padding:'24px', marginBottom:'24px', display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'flex-end' }}>
          <div>
            <label style={{ display:'block', fontSize:'11px', color:'rgba(200,220,255,0.55)', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.5px' }}>Pack Title</label>
            <input value={newPackTitle} onChange={e => setNewPackTitle(e.target.value)} placeholder="e.g. Unit 1 — Data Structures" style={{ width:'260px' }} required />
          </div>
          <div>
            <label style={{ display:'block', fontSize:'11px', color:'rgba(200,220,255,0.55)', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.5px' }}>Course</label>
            <input value={newPackCourse} onChange={e => setNewPackCourse(e.target.value)} placeholder="e.g. Computer Science" style={{ width:'200px' }} />
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            <button type="submit" style={{ background:'rgba(59,130,246,0.3)', border:'1px solid rgba(96,165,250,0.45)', color:'#fff', padding:'11px 22px', borderRadius:'12px', fontWeight:700, fontSize:'13px', backdropFilter:'blur(30px)' }}>
              Create Pack
            </button>
            <button type="button" onClick={() => setShowNewPack(false)} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.65)', padding:'11px 18px', borderRadius:'12px', fontSize:'13px' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Pack List */}
      {packList.length === 0 ? (
        <div style={{ ...GLASS, padding:'60px', textAlign:'center', color:'rgba(200,220,255,0.35)' }}>
          <PackageIcon size={40} color="rgba(255,255,255,0.2)" />
          <p style={{ marginTop:'16px', fontSize:'15px' }}>No packs yet — create your first question pack.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
          {packList.map(quiz => (
            <PackCard
              key={quiz.id} quiz={quiz}
              onEditQuestion={(q) => { setEditQ(q); setEditQuizId(quiz.id); }}
              onAddQuestion={() => { setAddTargetQuiz(quiz); setShowAddModal(true); }}
              onAiImport={() => { setAiTargetQuiz(quiz); setShowAi(true); }}
              onUpdated={onUpdated}
            />
          ))}
        </div>
      )}

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
