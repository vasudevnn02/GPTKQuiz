import React, { useState } from 'react';
import { ref, set, update } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { PlusIcon, TrashIcon, EditIcon, SparkleIcon, CalendarIcon, ClockIcon, ChevronDownIcon, PackageIcon } from '../icons/SvgIcons.jsx';

const G = {
  background: 'rgba(255,255,255,0.045)',
  backdropFilter: 'blur(48px) saturate(200%)',
  WebkitBackdropFilter: 'blur(48px) saturate(200%)',
  border: '1px solid rgba(255,255,255,0.11)',
  borderRadius: '24px',
  boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18)',
};

const GBTN = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.13)',
  backdropFilter: 'blur(30px)',
  color: '#fff',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  padding: '8px 16px',
  cursor: 'pointer',
};

const TAG = { fontSize:'11px', padding:'3px 9px', borderRadius:'8px', fontWeight:600 };

export default function PackCard({ quiz, onEditQuestion, onAddQuestion, onAiImport, onUpdated }) {
  const [open, setOpen] = useState(true);
  const [editSched, setEditSched] = useState(false);
  const [start, setStart] = useState(quiz.windowStart || '10:00 AM');
  const [end, setEnd] = useState(quiz.windowEnd || '05:00 PM');
  const [dur, setDur] = useState(quiz.durationMinutes || 15);
  const [saved, setSaved] = useState(false);

  const questions = Array.isArray(quiz.questions)
    ? quiz.questions
    : Object.values(quiz.questions || {});

  const saveSched = async (e) => {
    e.preventDefault();
    try { await update(ref(rtdb, `quizzes/${quiz.id}`), { windowStart: start, windowEnd: end, durationMinutes: Number(dur) }); } catch {}
    setEditSched(false); setSaved(true); setTimeout(() => setSaved(false), 2500);
    if (onUpdated) onUpdated();
  };

  const deleteQuestion = async (e, qid) => {
    e.stopPropagation();
    const updated = questions.filter(q => q.id !== qid);
    try { await set(ref(rtdb, `quizzes/${quiz.id}/questions`), updated); } catch {}
    if (onUpdated) onUpdated();
  };

  return (
    <div style={G}>
      {/* ── Pack Header ── */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding:'20px 24px', cursor:'pointer', display:'flex', alignItems:'center', gap:'16px', justifyContent:'space-between' }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:'14px', flex:1, minWidth:0 }}>
          <div style={{ width:'42px', height:'42px', borderRadius:'14px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.2)' }}>
            <PackageIcon size={20} color="rgba(255,255,255,0.88)" />
          </div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:'17px', fontWeight:700, color:'#fff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {quiz.title}
            </div>
            <div style={{ fontSize:'12px', color:'rgba(200,220,255,0.5)', marginTop:'3px' }}>
              {quiz.course} · {questions.length} question{questions.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>
          <span style={{ ...TAG, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(220,235,255,0.8)', display:'flex', alignItems:'center', gap:'5px' }}>
            <ClockIcon size={11} color="rgba(255,255,255,0.65)" />
            {quiz.windowStart || '10:00 AM'} – {quiz.windowEnd || '05:00 PM'}
          </span>
          <span style={{ ...TAG, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,220,255,0.65)' }}>
            {quiz.durationMinutes || 15} min
          </span>
          <ChevronDownIcon size={18} color="rgba(255,255,255,0.4)" style={{ transition:'transform 0.25s', transform: open ? 'rotate(180deg)' : 'none' }} />
        </div>
      </div>

      {/* ── Expanded Body ── */}
      {open && (
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', padding:'0 24px 22px' }}>

          {/* Action Row */}
          <div style={{ display:'flex', gap:'10px', paddingTop:'16px', paddingBottom:'14px', flexWrap:'wrap' }}>
            <button style={GBTN} onClick={onAddQuestion}><PlusIcon size={13} /> Add Question</button>
            <button style={GBTN} onClick={onAiImport}><SparkleIcon size={13} /> AI Import</button>
            <button style={GBTN} onClick={() => setEditSched(s => !s)}>
              <CalendarIcon size={13} /> {editSched ? 'Close Schedule' : 'Schedule'}
            </button>
            {saved && <span style={{ fontSize:'12px', color:'rgba(200,230,255,0.75)', alignSelf:'center' }}>✓ Saved</span>}
          </div>

          {/* Schedule Editor */}
          {editSched && (
            <form onSubmit={saveSched} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:'16px', padding:'18px 20px', marginBottom:'14px', display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'flex-end', backdropFilter:'blur(30px)' }}>
              {[['Window Start', start, setStart, '120px'], ['Window End', end, setEnd, '120px']].map(([lbl, val, setter, w]) => (
                <div key={lbl}>
                  <label style={{ display:'block', fontSize:'10px', color:'rgba(200,220,255,0.5)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px' }}>{lbl}</label>
                  <input type="text" value={val} onChange={e => setter(e.target.value)} style={{ width:w }} />
                </div>
              ))}
              <div>
                <label style={{ display:'block', fontSize:'10px', color:'rgba(200,220,255,0.5)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px' }}>Duration (min)</label>
                <input type="number" min="1" max="180" value={dur} onChange={e => setDur(e.target.value)} style={{ width:'90px' }} />
              </div>
              <button type="submit" style={{ background:'rgba(59,130,246,0.28)', border:'1px solid rgba(96,165,250,0.4)', color:'#fff', padding:'11px 18px', borderRadius:'12px', fontWeight:700, fontSize:'12px', backdropFilter:'blur(30px)' }}>
                Save
              </button>
            </form>
          )}

          {/* Question Rows */}
          {questions.length === 0 ? (
            <div style={{ textAlign:'center', padding:'28px', color:'rgba(200,220,255,0.3)', fontSize:'13px', background:'rgba(255,255,255,0.025)', borderRadius:'14px', border:'1px dashed rgba(255,255,255,0.08)' }}>
              No questions yet — add manually or use AI Import.
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {questions.map((q, idx) => {
                const text = q.text || q.question || q.statement || `Question ${idx + 1}`;
                return (
                  <div key={q.id || idx} style={{
                    background: 'rgba(255,255,255,0.035)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: '14px',
                    padding: '13px 18px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px',
                    backdropFilter: 'blur(24px)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'12px', flex:1, minWidth:0 }}>
                      <div style={{ width:'28px', height:'28px', borderRadius:'9px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', color:'rgba(220,235,255,0.85)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'12px', flexShrink:0 }}>
                        {idx + 1}
                      </div>
                      <span style={{ fontSize:'14px', fontWeight:500, color:'rgba(230,240,255,0.9)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {text}
                      </span>
                    </div>
                    <div style={{ display:'flex', gap:'8px', flexShrink:0 }}>
                      <button
                        onClick={() => onEditQuestion(q)}
                        style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)', color:'rgba(255,255,255,0.85)', padding:'7px 11px', borderRadius:'9px', display:'flex', alignItems:'center', gap:'5px', fontSize:'11px', fontWeight:600 }}
                      >
                        <EditIcon size={13} /> Edit
                      </button>
                      <button
                        onClick={(e) => deleteQuestion(e, q.id)}
                        style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.45)', padding:'7px 9px', borderRadius:'9px', display:'flex', alignItems:'center' }}
                      >
                        <TrashIcon size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
