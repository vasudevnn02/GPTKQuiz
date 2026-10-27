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
    <div style={{ ...glassDeep, borderRadius:'24px', padding:'28px' }}>
      {/* Title Row */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'16px', marginBottom:'20px' }}>
        <div>
          <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.6)', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', padding:'3px 9px', borderRadius:'8px', textTransform:'uppercase', letterSpacing:'0.7px', fontWeight:700 }}>
            Active Assessment
          </span>
          <h2 style={{ fontSize:'21px', fontWeight:700, color:'#fff', marginTop:'9px', marginBottom:'4px' }}>
            {currentQuiz?.title || 'Full Stack Development Assessment'}
          </h2>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)' }}>
            {currentQuiz?.course || 'Computer Science'} · Proctor Active
          </p>
        </div>
        <button onClick={() => setShowEdit(!showEdit)} style={{ ...glassBtn, padding:'8px 16px', borderRadius:'12px', fontSize:'12px', fontWeight:600, display:'flex', alignItems:'center', gap:'7px' }}>
          <CalendarIcon size={14} />{showEdit ? 'Close' : 'Edit Window'}
        </button>
      </div>

      {/* Stat Boxes */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))', gap:'10px', paddingTop:'16px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
        {[
          { label:'Time Window',  value:`${currentQuiz?.windowStart||'10:00 AM'} – ${currentQuiz?.windowEnd||'05:00 PM'}` },
          { label:'Duration',     value:`${currentQuiz?.durationMinutes||15} Minutes` },
          { label:'Submissions',  value:`${resultsCount} Candidates` },
        ].map(s => (
          <div key={s.label} style={{ ...glassInner, borderRadius:'14px', padding:'14px 18px' }}>
            <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.5px' }}>{s.label}</div>
            <div style={{ fontSize:'15px', fontWeight:700, color:'#fff', marginTop:'5px' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Schedule Form */}
      {showEdit && (
        <form onSubmit={handleSave} style={{ marginTop:'18px', borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:'18px', display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'flex-end' }}>
          {[['Start',start,setStart,'120px'],['End',end,setEnd,'120px']].map(([lbl,val,fn,w])=>(
            <div key={lbl}>
              <label style={{ display:'block', fontSize:'10px', color:'rgba(255,255,255,0.45)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px' }}>{lbl}</label>
              <input type="text" value={val} onChange={e=>fn(e.target.value)} style={{ width:w }} />
            </div>
          ))}
          <div>
            <label style={{ display:'block', fontSize:'10px', color:'rgba(255,255,255,0.45)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.5px' }}>Duration (min)</label>
            <input type="number" min="1" max="180" value={duration} onChange={e=>setDuration(e.target.value)} style={{ width:'88px' }} />
          </div>
          <button type="submit" style={{ ...glassBtn, padding:'11px 20px', borderRadius:'12px', fontWeight:700, fontSize:'13px' }}>Update</button>
        </form>
      )}
      {saved && <div style={{ color:'rgba(200,230,255,0.8)', fontSize:'12px', marginTop:'10px' }}>✓ Synchronized</div>}
    </div>
  );
}
