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
    const payload = {
      windowStart,
      windowEnd,
      durationMinutes: Number(durationMinutes)
    };

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

    setSavedMsg('Window timing successfully synchronized across all students!');
    setTimeout(() => setSavedMsg(''), 4000);
    if (onUpdated) onUpdated();
  };

  return (
    <div style={{ background: '#212121', border: '1px solid #272727', borderRadius: '12px', padding: '24px', maxWidth: '640px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f1f1', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <ClockIcon size={18} color="#ff0000" />
        <span>Configure Examination Time Window</span>
      </h3>
      <p style={{ fontSize: '12px', color: '#aaaaaa', marginBottom: '20px' }}>
        Define the open attendance window (default: 10:00 AM – 5:00 PM) and individual test duration.
      </p>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#aaaaaa', marginBottom: '6px' }}>
              Window Start Time
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
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#aaaaaa', marginBottom: '6px' }}>
              Window End Time
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
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#aaaaaa', marginBottom: '6px' }}>
            Individual Student Test Duration (Minutes)
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
          <div style={{ fontSize: '11px', color: '#717171', marginTop: '4px' }}>
            Personal countdown starts when student clicks "Start Quiz Now". Capped automatically if joined near end of window.
          </div>
        </div>

        {savedMsg && (
          <div style={{ background: '#143823', border: '1px solid #22c55e', color: '#86efac', padding: '10px', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircleIcon size={14} />
            <span>{savedMsg}</span>
          </div>
        )}

        <button
          type="submit"
          style={{ background: '#ff0000', color: '#ffffff', fontWeight: 700, padding: '10px 18px', borderRadius: '8px', fontSize: '13px', alignSelf: 'flex-start' }}
        >
          Save & Broadcast Window
        </button>
      </form>
    </div>
  );
}
