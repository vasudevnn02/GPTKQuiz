import React, { useState } from 'react';
import { ref, set, update } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { PlusIcon, TrashIcon, EditIcon, SparkleIcon, CalendarIcon, ClockIcon, ChevronDownIcon, PackageIcon } from '../icons/SvgIcons.jsx';

const GLASS = {
  background: 'rgba(8, 20, 60, 0.55)',
  backdropFilter: 'blur(44px) saturate(180%)',
  WebkitBackdropFilter: 'blur(44px) saturate(180%)',
  border: '1px solid rgba(96, 165, 250, 0.2)',
  borderRadius: '24px',
  boxShadow: '0 24px 64px rgba(0, 0, 20, 0.6), inset 0 1px 0 rgba(96, 165, 250, 0.25)',
};
const TAG = { fontSize: '11px', padding: '3px 9px', borderRadius: '8px', fontWeight: 600, letterSpacing: '0.3px' };

export default function PackCard({ quiz, onEditQuestion, onAddQuestion, onAiImport, onUpdated }) {
  const [open, setOpen] = useState(true);
  const [editSched, setEditSched] = useState(false);
  const [start, setStart] = useState(quiz.windowStart || '10:00 AM');
  const [end, setEnd] = useState(quiz.windowEnd || '05:00 PM');
  const [dur, setDur] = useState(quiz.durationMinutes || 15);
  const [savedMsg, setSavedMsg] = useState(false);

  const questions = Array.isArray(quiz.questions) ? quiz.questions : Object.values(quiz.questions || {});

  const saveSched = async (e) => {
    e.preventDefault();
    try { await update(ref(rtdb, `quizzes/${quiz.id}`), { windowStart: start, windowEnd: end, durationMinutes: Number(dur) }); }
    catch {}
    setEditSched(false); setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
    if (onUpdated) onUpdated();
  };

  const deleteQuestion = async (e, qid) => {
    e.stopPropagation();
    const updated = questions.filter(q => q.id !== qid);
    try { await set(ref(rtdb, `quizzes/${quiz.id}/questions`), updated); } catch {}
    if (onUpdated) onUpdated();
  };

  return (
    <div style={GLASS}>
      {/* Pack Header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: '22px 26px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'rgba(37,99,235,0.25)', border: '1px solid rgba(96,165,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <PackageIcon size={20} color="rgba(255,255,255,0.85)" />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {quiz.title}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(150,190,255,0.6)', marginTop: '3px' }}>
              {quiz.course} · {questions.length} question{questions.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Schedule badge */}
          <div style={{ ...TAG, background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(96,165,250,0.3)', color: 'rgba(190,220,255,0.85)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ClockIcon size={11} color="rgba(255,255,255,0.7)" />
            {quiz.windowStart || '10:00 AM'} – {quiz.windowEnd || '05:00 PM'}
          </div>
          <div style={{ ...TAG, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(96,165,250,0.22)', color: 'rgba(190,220,255,0.75)' }}>
            {quiz.durationMinutes || 15} min
          </div>
          <div style={{ color: 'rgba(150,190,255,0.5)', transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'none' }}>
            <ChevronDownIcon size={18} color="rgba(150,190,255,0.6)" />
          </div>
        </div>
      </div>

      {/* Expanded Body */}
      {open && (
        <div style={{ borderTop: '1px solid rgba(96,165,250,0.12)', padding: '0 26px 24px' }}>
          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px', paddingTop: '18px', paddingBottom: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={onAddQuestion}
              style={{ background: 'rgba(37,99,235,0.22)', border: '1px solid rgba(96,165,250,0.32)', color: '#fff', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '7px', backdropFilter: 'blur(20px)' }}
            ><PlusIcon size={13} /> Add Question</button>
            <button
              onClick={onAiImport}
              style={{ background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(96,165,250,0.28)', color: '#fff', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '7px', backdropFilter: 'blur(20px)' }}
            ><SparkleIcon size={13} /> AI Import</button>
            <button
              onClick={() => setEditSched(s => !s)}
              style={{ background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(96,165,250,0.28)', color: '#fff', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '7px', backdropFilter: 'blur(20px)' }}
            ><CalendarIcon size={13} /> {editSched ? 'Close Schedule' : 'Schedule'}</button>
            {savedMsg && <span style={{ fontSize: '12px', color: 'rgba(150,200,255,0.85)', alignSelf: 'center' }}>✓ Saved</span>}
          </div>

          {/* Schedule Editor */}
          {editSched && (
            <form onSubmit={saveSched} style={{ background: 'rgba(10,25,70,0.4)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '16px', padding: '18px 20px', marginBottom: '16px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '10px', color: 'rgba(150,190,255,0.7)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Window Start</label>
                <input type="text" value={start} onChange={e => setStart(e.target.value)} style={{ width: '120px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '10px', color: 'rgba(150,190,255,0.7)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Window End</label>
                <input type="text" value={end} onChange={e => setEnd(e.target.value)} style={{ width: '120px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '10px', color: 'rgba(150,190,255,0.7)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration (min)</label>
                <input type="number" min="1" max="180" value={dur} onChange={e => setDur(e.target.value)} style={{ width: '90px' }} />
              </div>
              <button type="submit" style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', color: '#fff', padding: '11px 18px', borderRadius: '12px', fontWeight: 700, fontSize: '12px', boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}>
                Save Schedule
              </button>
            </form>
          )}

          {/* Question List */}
          {questions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '28px', color: 'rgba(150,190,255,0.4)', fontSize: '13px', background: 'rgba(10,25,70,0.2)', borderRadius: '14px', border: '1px dashed rgba(96,165,250,0.15)' }}>
              No questions yet — add manually or use AI Import.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {questions.map((q, idx) => {
                const text = q.text || q.question || q.statement || `Question ${idx + 1}`;
                return (
                  <div
                    key={q.id || idx}
                    style={{
                      background: 'rgba(15,35,90,0.45)',
                      border: '1px solid rgba(96,165,250,0.15)',
                      borderRadius: '14px',
                      padding: '13px 18px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px',
                      backdropFilter: 'blur(20px)',
                      boxShadow: 'inset 0 1px 0 rgba(96,165,250,0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '9px', background: 'rgba(37,99,235,0.25)', border: '1px solid rgba(96,165,250,0.3)', color: 'rgba(190,220,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>
                        {idx + 1}
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(220,235,255,0.92)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {text}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => onEditQuestion(q)}
                        style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(96,165,250,0.25)', color: 'rgba(255,255,255,0.8)', padding: '7px 10px', borderRadius: '9px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 600 }}
                      ><EditIcon size={13} /> Edit</button>
                      <button
                        onClick={(e) => deleteQuestion(e, q.id)}
                        style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(96,165,250,0.18)', color: 'rgba(200,220,255,0.6)', padding: '7px 9px', borderRadius: '9px', display: 'flex', alignItems: 'center' }}
                      ><TrashIcon size={13} /></button>
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
