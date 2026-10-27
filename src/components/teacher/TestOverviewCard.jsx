import React, { useState } from 'react';
import { ClockIcon, ShieldIcon, CheckCircleIcon } from '../icons/SvgIcons.jsx';
import { ref, update } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';

export default function TestOverviewCard({ currentQuiz, resultsCount = 0 }) {
  const [showEdit, setShowEdit] = useState(false);
  const [start, setStart] = useState(currentQuiz?.windowStart || '10:00 AM');
  const [end, setEnd] = useState(currentQuiz?.windowEnd || '05:00 PM');
  const [duration, setDuration] = useState(currentQuiz?.durationMinutes || 15);
  const [saved, setSaved] = useState(false);

  const handleQuickSave = async (e) => {
    e.preventDefault();
    const quizId = currentQuiz?.id || 'quiz_fsd_01';
    try {
      await update(ref(rtdb, `quizzes/${quizId}`), {
        windowStart: start,
        windowEnd: end,
        durationMinutes: Number(duration)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      setShowEdit(false);
    } catch (err) {
      console.warn("RTDB update fallback:", err);
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.045)',
      backdropFilter: 'blur(36px) saturate(200%)',
      WebkitBackdropFilter: 'blur(36px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.14)',
      borderRadius: '24px',
      padding: '30px',
      boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <span style={{ fontSize: '11px', color: '#0a84ff', background: 'rgba(10, 132, 255, 0.15)', border: '1px solid rgba(10, 132, 255, 0.3)', padding: '3px 8px', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 700 }}>
            Active Department Assessment
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '8px', marginBottom: '4px' }}>
            {currentQuiz?.title || 'Full Stack Development Assessment'}
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.55)' }}>
            {currentQuiz?.course || 'Computer Science and Engineering'} • Proctor Protocol Active
          </p>
        </div>

        <button
          onClick={() => setShowEdit(!showEdit)}
          style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.14)', color: '#ffffff', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ClockIcon size={14} color="#0a84ff" />
          <span>{showEdit ? 'Close Settings' : 'Edit Window Timing'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase' }}>Time Window</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>{currentQuiz?.windowStart || '10:00 AM'} – {currentQuiz?.windowEnd || '05:00 PM'}</div>
        </div>

        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase' }}>Individual Duration</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0a84ff', marginTop: '4px' }}>{currentQuiz?.durationMinutes || 15} Minutes</div>
        </div>

        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase' }}>Candidates Tested</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#30d158', marginTop: '4px' }}>{resultsCount} Submissions</div>
        </div>
      </div>

      {showEdit && (
        <form onSubmit={handleQuickSave} style={{ marginTop: '22px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Start Time</label>
            <input type="text" value={start} onChange={(e) => setStart(e.target.value)} style={{ width: '120px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>End Time</label>
            <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} style={{ width: '120px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Duration (Mins)</label>
            <input type="number" min="1" max="180" value={duration} onChange={(e) => setDuration(e.target.value)} style={{ width: '100px' }} />
          </div>
          <button type="submit" style={{ background: 'linear-gradient(135deg, #0a84ff, #0066cc)', color: '#fff', padding: '11px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '13px' }}>
            Update Window
          </button>
        </form>
      )}

      {saved && <div style={{ color: '#30d158', fontSize: '12px', marginTop: '10px' }}>✓ Window successfully synchronized!</div>}
    </div>
  );
}
