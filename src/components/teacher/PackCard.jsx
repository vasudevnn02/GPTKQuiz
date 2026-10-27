import React, { useState } from 'react';
import { ref, set, update } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { PlusIcon, TrashIcon, EditIcon, SparkleIcon, CalendarIcon, ClockIcon, ChevronDownIcon, PackageIcon } from '../icons/SvgIcons.jsx';
import { glass, glassDeep, glassInner, glassBtn } from '../../glass.js';

const TAG = { fontSize:'11px', padding:'3px 10px', borderRadius:'8px', fontWeight:600 };

export default function PackCard({ quiz, onEditQuestion, onAddQuestion, onAiImport, onUpdated }) {
  const [open, setOpen] = useState(true);
  const [editSched, setEditSched] = useState(false);
  const [start, setStart] = useState(quiz.windowStart || '10:00 AM');
  const [end, setEnd] = useState(quiz.windowEnd || '05:00 PM');
  const [dur, setDur] = useState(quiz.durationMinutes || 15);
  const [saved, setSaved] = useState(false);

  const questions = Array.isArray(quiz.questions)
    ? quiz.questions : Object.values(quiz.questions || {});

  const saveSched = async (e) => {
    e.preventDefault();
    try { await update(ref(rtdb, `quizzes/${quiz.id}`), { windowStart:start, windowEnd:end, durationMinutes:Number(dur) }); } catch {}
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
    <div style={{ ...glassDeep, borderRadius:'22px' }}>
      {/* Header */}
      <div onClick={() => setOpen(o => !o)} style={{ padding:'20px 22px', cursor:'pointer', display:'flex', alignItems:'center', gap:'14px', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'13px', flex:1, minWidth:0 }}>
          <div style={{ ...glassInner, width:'40px', height:'40px', borderRadius:'13px', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <PackageIcon size={19} color="rgba(255,255,255,0.88)" />
          </div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:'16px', fontWeight:700, color:'#fff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{quiz.title}</div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', marginTop:'2px' }}>{quiz.course} · {questions.length} question{questions.length!==1?'s':''}</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'9px', flexShrink:0 }}>
          <span style={{ ...TAG, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.7)', display:'flex', alignItems:'center', gap:'5px' }}>
            <ClockIcon size={11} color="rgba(255,255,255,0.6)" />
            {quiz.windowStart||'10:00 AM'} – {quiz.windowEnd||'05:00 PM'}
          </span>
          <span style={{ ...TAG, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.55)' }}>
            {quiz.durationMinutes||15} min
          </span>
          <ChevronDownIcon size={17} color="rgba(255,255,255,0.35)"
            style={{ transition:'transform 0.25s', transform: open ? 'rotate(180deg)' : 'none' }} />
        </div>
      </div>

      {/* Body */}
      {open && (
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', padding:'0 22px 20px' }}>
          {/* Action Row */}
          <div style={{ display:'flex', gap:'9px', paddingTop:'14px', paddingBottom:'12px', flexWrap:'wrap' }}>
            {[
              { label:'Add Question', icon:<PlusIcon size={13}/>, fn: onAddQuestion },
              { label:'AI Import',    icon:<SparkleIcon size={13}/>, fn: onAiImport },
              { label: editSched ? 'Close Schedule' : 'Schedule', icon:<CalendarIcon size={13}/>, fn:()=>setEditSched(s=>!s) },
            ].map(b => (
              <button key={b.label} onClick={b.fn} style={{ ...glassBtn, padding:'7px 14px', borderRadius:'11px', fontSize:'12px', fontWeight:600, display:'flex', alignItems:'center', gap:'6px' }}>
                {b.icon}{b.label}
              </button>
            ))}
            {saved && <span style={{ fontSize:'12px', color:'rgba(200,230,255,0.75)', alignSelf:'center' }}>✓ Saved</span>}
          </div>

          {/* Schedule Editor */}
          {editSched && (
            <form onSubmit={saveSched} style={{ ...glassInner, borderRadius:'14px', padding:'16px 18px', marginBottom:'12px', display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'flex-end' }}>
              {[['Window Start',start,setStart,'115px'],['Window End',end,setEnd,'115px']].map(([lbl,val,fn,w])=>(
                <div key={lbl}>
                  <label style={{ display:'block', fontSize:'10px', color:'rgba(255,255,255,0.4)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px' }}>{lbl}</label>
                  <input type="text" value={val} onChange={e=>fn(e.target.value)} style={{ width:w }} />
                </div>
              ))}
              <div>
                <label style={{ display:'block', fontSize:'10px', color:'rgba(255,255,255,0.4)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px' }}>Duration (min)</label>
                <input type="number" min="1" max="180" value={dur} onChange={e=>setDur(e.target.value)} style={{ width:'85px' }} />
              </div>
              <button type="submit" style={{ ...glassBtn, padding:'10px 16px', borderRadius:'11px', fontWeight:700, fontSize:'12px' }}>Save</button>
            </form>
          )}

          {/* Questions */}
          {questions.length === 0 ? (
            <div style={{ textAlign:'center', padding:'24px', color:'rgba(255,255,255,0.28)', fontSize:'13px', background:'rgba(255,255,255,0.025)', borderRadius:'12px', border:'1px dashed rgba(255,255,255,0.08)' }}>
              No questions yet — add manually or use AI Import.
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'7px' }}>
              {questions.map((q, idx) => {
                const text = q.text || q.question || q.statement || `Question ${idx+1}`;
                return (
                  <div key={q.id||idx} style={{ ...glassInner, borderRadius:'13px', padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'11px', flex:1, minWidth:0 }}>
                      <div style={{ width:'26px', height:'26px', borderRadius:'8px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)', color:'rgba(255,255,255,0.8)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'11px', flexShrink:0 }}>
                        {idx+1}
                      </div>
                      <span style={{ fontSize:'13px', fontWeight:500, color:'rgba(240,245,255,0.88)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{text}</span>
                    </div>
                    <div style={{ display:'flex', gap:'7px', flexShrink:0 }}>
                      <button onClick={() => onEditQuestion(q)} style={{ ...glassBtn, padding:'6px 10px', borderRadius:'8px', display:'flex', alignItems:'center', gap:'4px', fontSize:'11px', fontWeight:600 }}>
                        <EditIcon size={12} /> Edit
                      </button>
                      <button onClick={e => deleteQuestion(e, q.id)} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.4)', padding:'6px 8px', borderRadius:'8px', display:'flex', alignItems:'center' }}>
                        <TrashIcon size={12} />
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
