import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { PlusIcon, PackageIcon } from '../icons/SvgIcons.jsx';
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
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'26px', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <h3 style={{ fontSize:'22px', fontWeight:800, color:'#0f172a' }}>Question Bank</h3>
          <p style={{ fontSize:'13px', color:'rgba(30,41,59,0.6)', marginTop:'4px' }}>Each pack has its own questions and schedule.</p>
        </div>
        <button onClick={() => setShowNewPack(true)} style={{ ...glassBtn, padding:'10px 20px', borderRadius:'14px', fontSize:'13px', fontWeight:700, display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PlusIcon size={12} color="rgba(255,255,255,0.95)" />
          </div>
          New Pack
        </button>
      </div>

      {/* New Pack Form */}
      {showNewPack && (
        <form onSubmit={handleCreatePack} style={{ ...glass, borderRadius:'22px', padding:'24px', marginBottom:'24px', display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'flex-end' }}>
          <div>
            <label style={{ display:'block', fontSize:'11px', color:'rgba(30,41,59,0.65)', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:700 }}>Pack Title</label>
            <input value={newPackTitle} onChange={e=>setNewPackTitle(e.target.value)} placeholder="e.g. Unit 1 — Data Structures" style={{ width:'260px' }} required />
          </div>
          <div>
            <label style={{ display:'block', fontSize:'11px', color:'rgba(30,41,59,0.65)', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:700 }}>Course</label>
            <input value={newPackCourse} onChange={e=>setNewPackCourse(e.target.value)} placeholder="e.g. Computer Science" style={{ width:'200px' }} />
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            <button type="submit" style={{ ...glassBtn, padding:'11px 22px', borderRadius:'12px', fontWeight:800, fontSize:'13px' }}>Create</button>
            <button type="button" onClick={() => setShowNewPack(false)} style={{ ...glass, padding:'11px 18px', borderRadius:'12px', fontSize:'13px', fontWeight:600, color:'#0f172a' }}>Cancel</button>
          </div>
        </form>
      )}

      {/* Pack List */}
      {packList.length === 0 ? (
        <div style={{ ...glassDeep, borderRadius:'24px', padding:'60px', textAlign:'center', color:'rgba(30,41,59,0.5)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'linear-gradient(135deg, rgba(30,41,59,0.45) 0%, rgba(15,23,42,0.65) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <PackageIcon size={26} color="rgba(255,255,255,0.95)" />
          </div>
          <p style={{ fontSize:'15px', fontWeight:600, color:'#0f172a' }}>No packs yet. Create your first question pack.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
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
