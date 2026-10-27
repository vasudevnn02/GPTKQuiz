import React, { useState } from 'react';
import { ref, set, update } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { PlusIcon, PackageIcon, CalendarIcon, SparkleIcon } from '../icons/SvgIcons.jsx';
import { glass, glassDeep, glassBtn } from '../../glass.js';
import PackCard from './PackCard.jsx';
import QuestionEditModal from './QuestionEditModal.jsx';
import AiQuestionImporter from './AiQuestionImporter.jsx';

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
    const pack = { id, title: newPackTitle.trim(), course: newPackCourse.trim() || 'General', windowStart:'10:00 AM', windowEnd:'05:00 PM', durationMinutes:15, status:'active', questions:[] };
    try { await set(ref(rtdb, `quizzes/${id}`), pack); } catch {}
    setNewPackTitle(''); setNewPackCourse(''); setShowNewPack(false);
    if (onUpdated) onUpdated();
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <h3 style={{ fontSize:'21px', fontWeight:700, color:'#fff' }}>Question Bank</h3>
          <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.38)', marginTop:'4px' }}>Each pack has its own questions and schedule.</p>
        </div>
        <button onClick={() => setShowNewPack(true)} style={{ ...glassBtn, padding:'9px 18px', borderRadius:'13px', fontSize:'13px', fontWeight:700, display:'flex', alignItems:'center', gap:'8px' }}>
          <PlusIcon size={14} /> New Pack
        </button>
      </div>

      {/* New Pack Form */}
      {showNewPack && (
        <form onSubmit={handleCreatePack} style={{ ...glass, borderRadius:'20px', padding:'22px', marginBottom:'22px', display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'flex-end' }}>
          <div>
            <label style={{ display:'block', fontSize:'10px', color:'rgba(255,255,255,0.45)', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.5px' }}>Pack Title</label>
            <input value={newPackTitle} onChange={e=>setNewPackTitle(e.target.value)} placeholder="e.g. Unit 1 — Data Structures" style={{ width:'250px' }} required />
          </div>
          <div>
            <label style={{ display:'block', fontSize:'10px', color:'rgba(255,255,255,0.45)', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.5px' }}>Course</label>
            <input value={newPackCourse} onChange={e=>setNewPackCourse(e.target.value)} placeholder="e.g. Computer Science" style={{ width:'190px' }} />
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            <button type="submit" style={{ ...glassBtn, padding:'10px 20px', borderRadius:'11px', fontWeight:700, fontSize:'13px' }}>Create</button>
            <button type="button" onClick={() => setShowNewPack(false)} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.55)', padding:'10px 16px', borderRadius:'11px', fontSize:'13px' }}>Cancel</button>
          </div>
        </form>
      )}

      {/* Pack List */}
      {packList.length === 0 ? (
        <div style={{ ...glassDeep, borderRadius:'20px', padding:'56px', textAlign:'center', color:'rgba(255,255,255,0.3)' }}>
          <PackageIcon size={38} color="rgba(255,255,255,0.2)" />
          <p style={{ marginTop:'14px', fontSize:'14px' }}>No packs yet. Create your first question pack.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {packList.map(quiz => (
            <PackCard key={quiz.id} quiz={quiz}
              onEditQuestion={(q) => { setEditQ(q); setEditQuizId(quiz.id); }}
              onAddQuestion={() => { setAddTargetQuiz(quiz); setShowAddModal(true); }}
              onAiImport={() => { setAiTargetQuiz(quiz); setShowAi(true); }}
              onUpdated={onUpdated}
            />
          ))}
        </div>
      )}

      {showAddModal && addTargetQuiz && <QuestionEditModal currentQuiz={addTargetQuiz} answerKeys={{}} onClose={()=>setShowAddModal(false)} onSaved={onUpdated} />}
      {editQ && editQuizId && <QuestionEditModal question={editQ} currentQuiz={quizzes[editQuizId]} answerKeys={{}} onClose={()=>setEditQ(null)} onSaved={onUpdated} />}
      {showAi && aiTargetQuiz && <AiQuestionImporter currentQuiz={aiTargetQuiz} answerKeys={{}} onClose={()=>setShowAi(false)} onImported={onUpdated} />}
    </div>
  );
}
