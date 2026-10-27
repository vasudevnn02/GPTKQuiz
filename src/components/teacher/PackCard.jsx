import React, { useState } from 'react';
import { ref, set, update } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { PlusIcon, TrashIcon, EditIcon, SparkleIcon, CalendarIcon, ClockIcon, ChevronDownIcon, PackageIcon, CheckIcon } from '../icons/SvgIcons.jsx';
import { glassDeep, glassInner, glassBtn } from '../../glass.js';

export default function PackCard({ quiz, onEditQuestion, onAddQuestion, onAiImport, onUpdated }) {
  const [open, setOpen] = useState(true);
  const [editSched, setEditSched] = useState(false);
  const [expandedQId, setExpandedQId] = useState(null); // Which question is expanded to show options
  const [start, setStart] = useState(quiz.windowStart || '10:00 AM');
  const [end, setEnd] = useState(quiz.windowEnd || '05:00 PM');
  const [examDate, setExamDate] = useState(quiz.date || 'Today');
  const [dur, setDur] = useState(quiz.durationMinutes || 15);
  const [saved, setSaved] = useState(false);

  const questions = Array.isArray(quiz.questions)
    ? quiz.questions : Object.values(quiz.questions || {});

  const saveSched = async (e) => {
    e.preventDefault();
    try {
      await update(ref(rtdb, `quizzes/${quiz.id}`), {
        windowStart: start,
        windowEnd: end,
        date: examDate,
        durationMinutes: Number(dur)
      });
    } catch {}
    setEditSched(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    if (onUpdated) onUpdated();
  };

  const deleteQuestion = async (e, qid) => {
    e.stopPropagation();
    const updated = questions.filter(q => q.id !== qid);
    try { await set(ref(rtdb, `quizzes/${quiz.id}/questions`), updated); } catch {}
    if (onUpdated) onUpdated();
  };

  const toggleExpandQuestion = (qid) => {
    setExpandedQId(prev => prev === qid ? null : qid);
  };

  return (
    <div style={{ ...glassDeep, borderRadius:'26px', overflow: 'hidden' }}>
      {/* ── CARD HEADER (Title, Question count, Date, Timing, Duration, Toggle) ── */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding:'22px 26px',
          cursor:'pointer',
          display:'flex',
          alignItems:'center',
          gap:'16px',
          justifyContent:'space-between',
          userSelect: 'none'
        }}
      >
        {/* Left: Icon & Title & Meta */}
        <div style={{ display:'flex', alignItems:'center', gap:'14px', flex:1, minWidth:0 }}>
          <div style={{
            ...glassInner,
            width:'44px',
            height:'44px',
            borderRadius:'14px',
            background:'rgba(255, 255, 255, 0.08)',
            border:'1px solid rgba(255, 255, 255, 0.22)',
            flexShrink:0,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.25)'
          }}>
            <PackageIcon size={20} color="rgba(255,255,255,0.95)" />
          </div>

          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:'18px', fontWeight:800, color:'#ffffff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {quiz.title}
            </div>
            <div style={{ fontSize:'12px', color:'rgba(255, 255, 255, 0.65)', marginTop:'3px', display:'flex', alignItems:'center', gap:'8px' }}>
              <span>• {questions.length} question{questions.length !== 1 ? 's' : ''}</span>
              <span>• {quiz.course || 'CSE Department'}</span>
              <span>• {quiz.date || 'Today'}</span>
            </div>
          </div>
        </div>

        {/* Right: Badges & Chevron Toggle (Exact match to screenshot) */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>
          {/* Timing Badge */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            padding: '6px 14px',
            borderRadius: '16px',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ClockIcon size={12} color="rgba(255,255,255,0.9)" />
            <span>{quiz.windowStart || '10:00 AM'} – {quiz.windowEnd || '05:00 PM'}</span>
          </div>

          {/* Duration Badge */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            padding: '6px 12px',
            borderRadius: '16px',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 700,
          }}>
            {quiz.durationMinutes || 15} min
          </div>

          {/* Expand / Collapse Chevron */}
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.25s ease',
            transform: open ? 'rotate(180deg)' : 'none'
          }}>
            <ChevronDownIcon size={14} color="rgba(255,255,255,0.95)" />
          </div>
        </div>
      </div>

      {/* ── EXPANDED BODY (Actions + Question Cards) ── */}
      {open && (
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', padding:'0 26px 26px' }}>

          {/* Action Row: + Add Question | ☆ AI Import | 📅 Schedule */}
          <div style={{ display:'flex', gap:'10px', paddingTop:'16px', paddingBottom:'16px', flexWrap:'wrap', alignItems:'center' }}>
            <button onClick={onAddQuestion} style={{ ...glassBtn, padding:'8px 18px', borderRadius:'14px', fontSize:'13px', fontWeight:700, display:'flex', alignItems:'center', gap:'7px' }}>
              <PlusIcon size={13} color="rgba(255,255,255,0.95)" />
              <span>Add Question</span>
            </button>

            <button onClick={onAiImport} style={{ ...glassBtn, padding:'8px 18px', borderRadius:'14px', fontSize:'13px', fontWeight:700, display:'flex', alignItems:'center', gap:'7px' }}>
              <SparkleIcon size={13} color="rgba(255,255,255,0.95)" />
              <span>AI Import</span>
            </button>

            <button onClick={() => setEditSched(s => !s)} style={{ ...glassBtn, padding:'8px 18px', borderRadius:'14px', fontSize:'13px', fontWeight:700, display:'flex', alignItems:'center', gap:'7px' }}>
              <CalendarIcon size={13} color="rgba(255,255,255,0.95)" />
              <span>{editSched ? 'Close Schedule' : 'Schedule'}</span>
            </button>

            {saved && <span style={{ fontSize:'12px', color:'#ffffff', fontWeight:600, marginLeft:'8px' }}>✓ Schedule Updated!</span>}
          </div>

          {/* Inline Schedule & Timing Editor */}
          {editSched && (
            <form onSubmit={saveSched} style={{ ...glassInner, borderRadius:'18px', padding:'20px 22px', marginBottom:'16px', display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'flex-end' }}>
              <div>
                <label style={{ display:'block', fontSize:'11px', color:'rgba(255, 255, 255, 0.65)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:700 }}>Exam Date</label>
                <input type="text" value={examDate} onChange={e=>setExamDate(e.target.value)} placeholder="e.g. Oct 28, 2026" style={{ width:'130px' }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'11px', color:'rgba(255, 255, 255, 0.65)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:700 }}>Window Start</label>
                <input type="text" value={start} onChange={e=>setStart(e.target.value)} style={{ width:'110px' }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'11px', color:'rgba(255, 255, 255, 0.65)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:700 }}>Window End</label>
                <input type="text" value={end} onChange={e=>setEnd(e.target.value)} style={{ width:'110px' }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'11px', color:'rgba(255, 255, 255, 0.65)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:700 }}>Duration (min)</label>
                <input type="number" min="1" max="180" value={dur} onChange={e=>setDur(e.target.value)} style={{ width:'85px' }} />
              </div>
              <button type="submit" style={{ ...glassBtn, padding:'11px 20px', borderRadius:'12px', fontWeight:800, fontSize:'12px' }}>Save Schedule</button>
            </form>
          )}

          {/* ── QUESTION LIST (Numbered Cards with Click-to-Expand Options & Edit) ── */}
          {questions.length === 0 ? (
            <div style={{ textAlign:'center', padding:'32px', color:'rgba(255,255,255,0.5)', fontSize:'13px', background:'rgba(255,255,255,0.03)', borderRadius:'16px', border:'1px dashed rgba(255,255,255,0.15)' }}>
              No questions in this pack. Click "+ Add Question" or "☆ AI Import" to add questions.
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {questions.map((q, idx) => {
                const text = q.text || q.question || q.statement || `Question ${idx+1}`;
                const isExpanded = expandedQId === (q.id || idx);
                const options = q.options || [];

                return (
                  <div
                    key={q.id || idx}
                    onClick={() => toggleExpandQuestion(q.id || idx)}
                    style={{
                      ...glassInner,
                      borderRadius:'18px',
                      padding:'16px 20px',
                      cursor:'pointer',
                      display:'flex',
                      flexDirection:'column',
                      gap: isExpanded ? '14px' : '0px',
                      transition:'all 0.2s ease',
                      border: isExpanded ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: isExpanded ? '0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)' : 'inset 0 1px 0 rgba(255,255,255,0.12)'
                    }}
                  >
                    {/* Top Row: Number badge + Statement + Edit/Delete Buttons */}
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'14px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'14px', flex:1, minWidth:0 }}>
                        {/* Number badge */}
                        <div style={{
                          width:'30px',
                          height:'30px',
                          borderRadius:'9px',
                          background:'rgba(255, 255, 255, 0.1)',
                          border:'1px solid rgba(255, 255, 255, 0.22)',
                          color:'#ffffff',
                          display:'flex',
                          alignItems:'center',
                          justifyContent:'center',
                          fontWeight:800,
                          fontSize:'13px',
                          flexShrink:0
                        }}>
                          {idx + 1}
                        </div>

                        {/* Statement text */}
                        <span style={{ fontSize:'14px', fontWeight:600, color:'#ffffff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace: isExpanded ? 'normal' : 'nowrap', lineHeight:'1.4' }}>
                          {text}
                        </span>
                      </div>

                      {/* Right buttons: [Edit ✎] and [🗑] */}
                      <div style={{ display:'flex', gap:'8px', flexShrink:0 }} onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => onEditQuestion(q)}
                          style={{
                            ...glassBtn,
                            padding:'6px 14px',
                            borderRadius:'10px',
                            display:'flex',
                            alignItems:'center',
                            gap:'6px',
                            fontSize:'12px',
                            fontWeight:700
                          }}
                        >
                          <EditIcon size={12} color="rgba(255,255,255,0.95)" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={e => deleteQuestion(e, q.id)}
                          title="Delete Question"
                          style={{
                            ...glassBtn,
                            padding:'6px 10px',
                            borderRadius:'10px',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center'
                          }}
                        >
                          <TrashIcon size={13} color="rgba(255,255,255,0.85)" />
                        </button>
                      </div>
                    </div>

                    {/* ── EXPANDED OPTIONS VIEW (When clicked, shows all options & key) ── */}
                    {isExpanded && options.length > 0 && (
                      <div style={{
                        display:'grid',
                        gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',
                        gap:'8px',
                        paddingTop:'12px',
                        borderTop:'1px solid rgba(255, 255, 255, 0.1)',
                      }}>
                        {options.map((opt, optIdx) => {
                          const optText = typeof opt === 'string' ? opt : (opt?.text || '');
                          const letter = String.fromCharCode(65 + optIdx);
                          return (
                            <div
                              key={optIdx}
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '10px',
                                padding: '8px 12px',
                                fontSize: '12px',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                            >
                              <span style={{ fontWeight: 800, color: 'rgba(255,255,255,0.6)' }}>{letter}.</span>
                              <span style={{ flex: 1 }}>{optText}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
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
