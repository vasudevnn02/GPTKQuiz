import React, { useState } from 'react';
import { CalendarIcon } from '../icons/SvgIcons.jsx';
import { ref, update } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { glassDeep, glassInner, glassBtn } from '../../glass.js';

export default function TestOverviewCard({ currentQuiz, resultsCount = 0 }) {
  const [showEdit, setShowEdit] = useState(false);
  const [start, setStart] = useState(currentQuiz?.windowStart || '10:00 AM');
  const [end, setEnd] = useState(currentQuiz?.windowEnd || '05:00 PM');
  const [duration, setDuration] = useState(currentQuiz?.durationMinutes || 15);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await update(ref(rtdb, `quizzes/${currentQuiz?.id || 'quiz_fsd_01'}`), {
        windowStart: start, windowEnd: end, durationMinutes: Number(duration)
      });
    } catch {}
    setSaved(true); setTimeout(() => setSaved(false), 3000);
    setShowEdit(false);
  };

  return (
    <div style={{ ...glassDeep, borderRadius:'28px', padding:'32px' }}>
      {/* Title Row */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'16px', marginBottom:'22px' }}>
        <div>
          <span style={{ fontSize:'10px', color:'#ffffff', background:'rgba(255, 255, 255, 0.12)', border:'1px solid rgba(255, 255, 255, 0.22)', padding:'4px 10px', borderRadius:'10px', textTransform:'uppercase', letterSpacing:'0.7px', fontWeight:800 }}>
            Active Assessment
          </span>
          <h2 style={{ fontSize:'23px', fontWeight:800, color:'#ffffff', marginTop:'10px', marginBottom:'4px' }}>
            {currentQuiz?.title || 'Full Stack Development Assessment'}
          </h2>
          <p style={{ fontSize:'13px', color:'rgba(255, 255, 255, 0.65)' }}>
            {currentQuiz?.course || 'Computer Science'} · Proctor Active
          </p>
        </div>
        <button onClick={() => setShowEdit(!showEdit)} style={{ ...glassBtn, padding:'9px 18px', borderRadius:'14px', fontSize:'12px', fontWeight:700, display:'flex', alignItems:'center', gap:'8px' }}>
          <CalendarIcon size={14} color="rgba(255,255,255,0.95)" />
          <span>{showEdit ? 'Close' : 'Edit Window'}</span>
        </button>
      </div>

      {/* Stat Boxes */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(170px,1fr))', gap:'14px', paddingTop:'18px', borderTop:'1px solid rgba(255,255,255,0.12)' }}>
        {[
          { label:'Time Window',  value:`${currentQuiz?.windowStart||'10:00 AM'} – ${currentQuiz?.windowEnd||'05:00 PM'}` },
          { label:'Duration',     value:`${currentQuiz?.durationMinutes||15} Minutes` },
          { label:'Submissions',  value:`${resultsCount} Candidates` },
        ].map(s => (
          <div key={s.label} style={{ ...glassInner, borderRadius:'18px', padding:'16px 20px' }}>
            <div style={{ fontSize:'10px', color:'rgba(255, 255, 255, 0.55)', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:700 }}>{s.label}</div>
            <div style={{ fontSize:'16px', fontWeight:800, color:'#ffffff', marginTop:'6px' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Schedule Form */}
      {showEdit && (
        <form onSubmit={handleSave} style={{ marginTop:'20px', borderTop:'1px solid rgba(255,255,255,0.12)', paddingTop:'20px', display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'flex-end' }}>
          {[['Start',start,setStart,'120px'],['End',end,setEnd,'120px']].map(([lbl,val,fn,w])=>(
            <div key={lbl}>
              <label style={{ display:'block', fontSize:'11px', color:'rgba(255, 255, 255, 0.65)', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:700 }}>{lbl}</label>
              <input type="text" value={val} onChange={e=>fn(e.target.value)} style={{ width:w }} />
            </div>
          ))}
          <div>
            <label style={{ display:'block', fontSize:'11px', color:'rgba(255, 255, 255, 0.65)', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:700 }}>Duration (min)</label>
            <input type="number" min="1" max="180" value={duration} onChange={e=>setDuration(e.target.value)} style={{ width:'88px' }} />
          </div>
          <button type="submit" style={{ ...glassBtn, padding:'11px 22px', borderRadius:'12px', fontWeight:800, fontSize:'13px' }}>Update</button>
        </form>
      )}
      {saved && <div style={{ color:'#ffffff', fontSize:'12px', marginTop:'10px', fontWeight:600 }}>✓ Synchronized</div>}
    </div>
  );
}
