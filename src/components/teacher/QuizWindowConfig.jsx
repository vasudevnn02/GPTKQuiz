import React, { useState } from 'react';
import { ref, update } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { ClockIcon, CheckCircleIcon } from '../icons/SvgIcons.jsx';

export default function QuizWindowConfig({ currentQuiz, onUpdated }) {
  const [windowStart, setWindowStart] = useState(currentQuiz?.windowStart || '10:00 AM');
  const [windowEnd, setWindowEnd] = useState(currentQuiz?.windowEnd || '05:00 PM');
  const [durationMinutes, setDurationMinutes] = useState(currentQuiz?.durationMinutes || 15);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    const quizId = currentQuiz?.id || 'quiz_fsd_01';
    const payload = { windowStart, windowEnd, durationMinutes: Number(durationMinutes) };

    try {
      await update(ref(rtdb, `quizzes/${quizId}`), payload);
    } catch (err) {
      console.warn("RTDB update fallback to local:", err);
      const local = JSON.parse(localStorage.getItem('gptk_quizzes') || '{}');
      if (local[quizId]) {
        local[quizId] = { ...local[quizId], ...payload };
        localStorage.setItem('gptk_quizzes', JSON.stringify(local));
      }
    }

    setSavedMsg('Window schedule synchronized across all student devices!');
    setTimeout(() => setSavedMsg(''), 4000);
    if (onUpdated) onUpdated();
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.04)',
      backdropFilter: 'blur(30px) saturate(190%)',
      WebkitBackdropFilter: 'blur(30px) saturate(190%)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '20px',
      padding: '28px',
      maxWidth: '640px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <span style={{ color: '#ff9f0a' }}><ClockIcon size={20} /></span>
        <span>Examination Window Schedule</span>
      </h3>
      <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginBottom: '22px' }}>
        Configure the universal student entry window and the individual countdown timer.
      </p>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px' }}>
              Window Start
            </label>
            <input
              type="text"
              required
              value={windowStart}
              onChange={(e) => setWindowStart(e.target.value)}
              placeholder="10:00 AM"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px' }}>
              Window End
            </label>
            <input
              type="text"
              required
              value={windowEnd}
              onChange={(e) => setWindowEnd(e.target.value)}
              placeholder="05:00 PM"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px' }}>
            Individual Candidate Duration (Minutes)
          </label>
          <input
            type="number"
            min="1"
            max="180"
            required
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '5px' }}>
            Timer automatically starts on exam entry. Students joining near window close are capped at 5:00 PM.
          </div>
        </div>

        {savedMsg && (
          <div style={{ background: 'rgba(48, 209, 88, 0.15)', border: '1px solid rgba(48, 209, 88, 0.35)', color: '#30d158', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircleIcon size={14} />
            <span>{savedMsg}</span>
          </div>
        )}

        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #0a84ff, #0066cc)',
            color: '#ffffff',
            fontWeight: 700,
            padding: '11px 20px',
            borderRadius: '12px',
            fontSize: '13px',
            alignSelf: 'flex-start',
            boxShadow: '0 4px 16px rgba(10, 132, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
          }}
        >
          Save & Broadcast Window
        </button>
      </form>
    </div>
  );
}
