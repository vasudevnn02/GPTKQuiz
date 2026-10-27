import React, { useState } from 'react';
import { ref, set, update } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { PlusIcon, TrashIcon, EditIcon, SparkleIcon, CalendarIcon, ClockIcon, ChevronDownIcon, PackageIcon } from '../icons/SvgIcons.jsx';
import { glassDeep, glassInner, glassBtn } from '../../glass.js';

const TAG = { fontSize:'11px', padding:'4px 10px', borderRadius:'8px', fontWeight:700 };

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
    <div style={{ ...glassDeep, borderRadius:'24px' }}>
      {/* Header */}
      <div onClick={() => setOpen(o => !o)} style={{ padding:'22px 26px', cursor:'pointer', display:'flex', alignItems:'center', gap:'16px', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'14px', flex:1, minWidth:0 }}>
          <div style={{ ...glassInner, width:'42px', height:'42px', borderRadius:'14px', background:'linear-gradient(135deg, rgba(30,41,59,0.45) 0%, rgba(15,23,42,0.65) 100%)', border:'1px solid rgba(255,255,255,0.85)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(0,0,0,0.06)' }}>
            <PackageIcon size={20} color="rgba(255,255,255,0.98)" />
          </div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:'17px', fontWeight:800, color:'#0f172a', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{quiz.title}</div>
            <div style={{ fontSize:'12px', color:'rgba(30,41,59,0.6)', marginTop:'2px' }}>{quiz.course} · {questions.length} question{questions.length!==1?'s':''}</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>
          <span style={{ ...TAG, ...glassInner, color:'#0f172a', display:'flex', alignItems:'center', gap:'6px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ClockIcon size={10} color="rgba(255,255,255,0.95)" />
            </div>
            {quiz.windowStart||'10:00 AM'} – {quiz.windowEnd||'05:00 PM'}
          </span>
          <span style={{ ...TAG, ...glassInner, color:'#0f172a' }}>
            {quiz.durationMinutes||15} min
          </span>
          <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition:'transform 0.25s', transform: open ? 'rotate(180deg)' : 'none' }}>
            <ChevronDownIcon size={13} color="rgba(255,255,255,0.95)" />
          </div>
        </div>
      </div>

      {/* Body */}
      {open && (
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.7)', padding:'0 26px 24px' }}>
          {/* Action Row */}
          <div style={{ display:'flex', gap:'10px', paddingTop:'16px', paddingBottom:'14px', flexWrap:'wrap' }}>
            {[
              { label:'Add Question', icon:<PlusIcon size={12}/>, fn: onAddQuestion },
              { label:'AI Import',    icon:<SparkleIcon size={12}/>, fn: onAiImport },
              { label: editSched ? 'Close Schedule' : 'Schedule', icon:<CalendarIcon size={12}/>, fn:()=>setEditSched(s=>!s) },
            ].map(b => (
              <button key={b.label} onClick={b.fn} style={{ ...glassBtn, padding:'8px 16px', borderRadius:'12px', fontSize:'12px', fontWeight:700, display:'flex', alignItems:'center', gap:'7px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {b.icon}
                </div>
                {b.label}
              </button>
            ))}
            {saved && <span style={{ fontSize:'12px', color:'#0f172a', alignSelf:'center', fontWeight:600 }}>✓ Saved</span>}
          </div>

          {/* Schedule Editor */}
          {editSched && (
            <form onSubmit={saveSched} style={{ ...glassInner, borderRadius:'16px', padding:'18px 20px', marginBottom:'14px', display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'flex-end' }}>
              {[['Window Start',start,setStart,'120px'],['Window End',end,setEnd,'120px']].map(([lbl,val,fn,w])=>(
                <div key={lbl}>
                  <label style={{ display:'block', fontSize:'11px', color:'rgba(30,41,59,0.65)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:700 }}>{lbl}</label>
                  <input type="text" value={val} onChange={e=>fn(e.target.value)} style={{ width:w }} />
                </div>
              ))}
              <div>
                <label style={{ display:'block', fontSize:'11px', color:'rgba(30,41,59,0.65)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:700 }}>Duration (min)</label>
                <input type="number" min="1" max="180" value={dur} onChange={e=>setDur(e.target.value)} style={{ width:'85px' }} />
              </div>
              <button type="submit" style={{ ...glassBtn, padding:'11px 18px', borderRadius:'12px', fontWeight:800, fontSize:'12px' }}>Save</button>
            </form>
          )}

          {/* Questions */}
          {questions.length === 0 ? (
            <div style={{ textAlign:'center', padding:'28px', color:'rgba(30,41,59,0.5)', fontSize:'13px', background:'rgba(255,255,255,0.3)', borderRadius:'14px', border:'1px dashed rgba(255,255,255,0.9)' }}>
              No questions yet — add manually or use AI Import.
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {questions.map((q, idx) => {
                const text = q.text || q.question || q.statement || `Question ${idx+1}`;
                return (
                  <div key={q.id||idx} style={{ ...glassInner, borderRadius:'15px', padding:'13px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'14px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'12px', flex:1, minWidth:0 }}>
                      <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:'linear-gradient(135deg, rgba(30,41,59,0.45) 0%, rgba(15,23,42,0.65) 100%)', border:'1px solid rgba(255,255,255,0.85)', color:'#ffffff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'12px', flexShrink:0 }}>
                        {idx+1}
                      </div>
                      <span style={{ fontSize:'14px', fontWeight:600, color:'#0f172a', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{text}</span>
                    </div>
                    <div style={{ display:'flex', gap:'8px', flexShrink:0 }}>
                      <button onClick={() => onEditQuestion(q)} style={{ ...glassBtn, padding:'6px 12px', borderRadius:'10px', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:700 }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <EditIcon size={11} color="rgba(255,255,255,0.95)" />
                        </div>
                        Edit
                      </button>
                      <button onClick={e => deleteQuestion(e, q.id)} style={{ ...glassBtn, padding:'6px 10px', borderRadius:'10px', display:'flex', alignItems:'center' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <TrashIcon size={11} color="rgba(255,255,255,0.95)" />
                        </div>
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
