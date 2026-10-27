import React, { useState } from 'react';
import { ClockIcon, CalendarIcon } from '../icons/SvgIcons.jsx';
import { ref, update } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';

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

  const statStyle = {
    background: 'rgba(15,35,90,0.4)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(96,165,250,0.15)',
    borderRadius: '16px',
    padding: '16px 20px',
  };

  return (
    <div style={{ background: 'rgba(8,20,60,0.55)', backdropFilter: 'blur(44px) saturate(180%)', WebkitBackdropFilter: 'blur(44px) saturate(180%)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '24px', padding: '30px', boxShadow: '0 24px 60px rgba(0,0,20,0.6), inset 0 1px 0 rgba(96,165,250,0.22)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
        <div>
          <span style={{ fontSize: '11px', color: 'rgba(150,210,255,0.85)', background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(96,165,250,0.3)', padding: '3px 9px', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 700 }}>
            Active Assessment
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginTop: '8px', marginBottom: '4px' }}>
            {currentQuiz?.title || 'Full Stack Development Assessment'}
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(150,190,255,0.6)' }}>
            {currentQuiz?.course || 'Computer Science'} · Proctor Active
          </p>
        </div>
        <button
          onClick={() => setShowEdit(!showEdit)}
          style={{ background: 'rgba(37,99,235,0.22)', border: '1px solid rgba(96,165,250,0.3)', color: '#fff', padding: '9px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '7px', backdropFilter: 'blur(20px)' }}
        >
          <CalendarIcon size={14} />{showEdit ? 'Close' : 'Edit Window'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px', paddingTop: '18px', borderTop: '1px solid rgba(96,165,250,0.1)' }}>
        <div style={statStyle}>
          <div style={{ fontSize: '11px', color: 'rgba(150,190,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time Window</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginTop: '5px' }}>
            {currentQuiz?.windowStart || '10:00 AM'} – {currentQuiz?.windowEnd || '05:00 PM'}
          </div>
        </div>
        <div style={statStyle}>
          <div style={{ fontSize: '11px', color: 'rgba(150,190,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(150,210,255,0.9)', marginTop: '5px' }}>
            {currentQuiz?.durationMinutes || 15} Minutes
          </div>
        </div>
        <div style={statStyle}>
          <div style={{ fontSize: '11px', color: 'rgba(150,190,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Submissions</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(190,220,255,0.9)', marginTop: '5px' }}>
            {resultsCount} Candidates
          </div>
        </div>
      </div>

      {showEdit && (
        <form onSubmit={handleSave} style={{ marginTop: '20px', borderTop: '1px solid rgba(96,165,250,0.1)', paddingTop: '20px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {[['Start', start, setStart, '120px'], ['End', end, setEnd, '120px']].map(([lbl, val, setter, w]) => (
            <div key={lbl}>
              <label style={{ display: 'block', fontSize: '11px', color: 'rgba(150,190,255,0.7)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{lbl}</label>
              <input type="text" value={val} onChange={e => setter(e.target.value)} style={{ width: w }} />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'rgba(150,190,255,0.7)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration (min)</label>
            <input type="number" min="1" max="180" value={duration} onChange={e => setDuration(e.target.value)} style={{ width: '90px' }} />
          </div>
          <button type="submit" style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', color: '#fff', padding: '11px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>
            Update
          </button>
        </form>
      )}
      {saved && <div style={{ color: 'rgba(150,210,255,0.85)', fontSize: '12px', marginTop: '10px' }}>✓ Window synchronized</div>}
    </div>
  );
}
