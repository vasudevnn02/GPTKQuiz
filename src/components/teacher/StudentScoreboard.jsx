import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AwardIcon, CheckCircleIcon, AlertTriangleIcon } from '../icons/SvgIcons.jsx';

// Custom Frosted Glass Dropdown matching the app's glassmorphism UI
function GlassDropdown({ label, value, options = [], onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const current = options.find(o => o.value === value) || options[0] || { label: value, value };

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      {label && (
        <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
          {label}
        </span>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        style={{
          background: open ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: open ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '13px',
          padding: '8px 14px',
          fontSize: '12px',
          fontWeight: 700,
          color: current.color || '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
          transition: 'all 0.18s ease',
          userSelect: 'none'
        }}
      >
        <span>{current.label}</span>
        <span style={{
          fontSize: '10px',
          color: 'rgba(255, 255, 255, 0.65)',
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s ease'
        }}>
          ▼
        </span>
      </button>

      {/* Floating Glass Dropdown Menu */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          zIndex: 1000,
          minWidth: '210px',
          background: 'rgba(10, 18, 38, 0.85)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '16px',
          padding: '6px',
          boxShadow: '0 18px 48px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          animation: 'fadeIn 0.15s ease'
        }}>
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                style={{
                  padding: '9px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: isSelected ? 800 : 600,
                  color: isSelected ? '#38bdf8' : (opt.color || '#ffffff'),
                  background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'transparent',
                  border: isSelected ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span>{opt.label}</span>
                {isSelected && <span style={{ color: '#38bdf8', fontSize: '11px', fontWeight: 800 }}>✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function StudentScoreboard({ results = {}, quizzes = {} }) {
  const [selectedQuiz, setSelectedQuiz] = useState('all');
  const [sortOrder, setSortOrder] = useState('high_score'); // 'high_score' | 'low_score' | 'az' | 'za'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pass' | 'fail'

  const resultList = Object.values(results);

  // Extract unique quiz titles
  const quizTitles = useMemo(() => {
    const set = new Set();
    resultList.forEach(r => {
      if (r.quizTitle) set.add(r.quizTitle);
    });
    Object.values(quizzes).forEach(q => {
      if (q.title) set.add(q.title);
    });
    return Array.from(set);
  }, [resultList, quizzes]);

  // Options arrays for custom GlassDropdowns
  const quizOptions = useMemo(() => {
    return [
      { value: 'all', label: 'All Examination Sets' },
      ...quizTitles.map(t => ({ value: t, label: t }))
    ];
  }, [quizTitles]);

  const sortOptions = [
    { value: 'high_score', label: 'Score: 100% → 0%' },
    { value: 'low_score', label: 'Score: 0% → 100%' },
    { value: 'az', label: 'Candidate: A → Z' },
    { value: 'za', label: 'Candidate: Z → A' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All (Pass & Fail)' },
    { value: 'pass', label: '✓ Pass Only (≥ 35%)', color: '#4ade80' },
    { value: 'fail', label: '✕ Fail Only (< 35%)', color: '#f87171' },
  ];

  // Filter and Sort results
  const filteredResults = useMemo(() => {
    return resultList
      .filter(r => {
        // Quiz filter
        if (selectedQuiz !== 'all' && r.quizTitle !== selectedQuiz) {
          return false;
        }
        // Pass / Fail filter (threshold 35%)
        const pct = Number(r.percentage || 0);
        const isPass = pct >= 35;
        if (statusFilter === 'pass' && !isPass) return false;
        if (statusFilter === 'fail' && isPass) return false;
        return true;
      })
      .sort((a, b) => {
        const pctA = Number(a.percentage || 0);
        const pctB = Number(b.percentage || 0);
        const nameA = (a.studentName || '').toLowerCase();
        const nameB = (b.studentName || '').toLowerCase();

        switch (sortOrder) {
          case 'high_score':
            return pctB - pctA;
          case 'low_score':
            return pctA - pctB;
          case 'az':
            return nameA.localeCompare(nameB);
          case 'za':
            return nameB.localeCompare(nameA);
          default:
            return 0;
        }
      });
  }, [resultList, selectedQuiz, sortOrder, statusFilter]);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: '26px',
      boxShadow: '0 16px 44px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
      overflow: 'visible'
    }}>
      {/* ── CARD HEADER TOOLBAR WITH GLASS DROPDOWNS ON THE RIGHT EDGE ── */}
      <div style={{
        padding: '20px 26px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Left: Scoreboard Count Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '11px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AwardIcon size={18} color="#ffffff" />
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
            Candidate Submissions
            <span style={{
              marginLeft: '8px',
              fontSize: '12px',
              color: '#38bdf8',
              background: 'rgba(56, 189, 248, 0.12)',
              padding: '2px 8px',
              borderRadius: '8px',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}>
              {filteredResults.length} / {resultList.length}
            </span>
          </div>
        </div>

        {/* Right Edge: Custom Frosted Glass Dropdowns */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* Option 1: Choose Quiz Title */}
          <GlassDropdown
            label="Quiz:"
            value={selectedQuiz}
            options={quizOptions}
            onChange={setSelectedQuiz}
          />

          {/* Option 2: Sort (A-Z / Z-A / 100%-0% / 0%-100%) */}
          <GlassDropdown
            label="Sort:"
            value={sortOrder}
            options={sortOptions}
            onChange={setSortOrder}
          />

          {/* Option 3: Pass and Fail Filter */}
          <GlassDropdown
            label="Status:"
            value={statusFilter}
            options={statusOptions}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {/* ── CARD BODY: EMPTY STATE OR SUBMISSIONS TABLE ── */}
      {filteredResults.length === 0 ? (
        <div style={{
          padding: '60px 24px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <AwardIcon size={26} color="rgba(255,255,255,0.95)" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
            {resultList.length === 0 ? 'No candidate submissions yet' : 'No submissions matching selected filters'}
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '4px' }}>
            {resultList.length === 0
              ? 'When students submit their assessments, their scores and integrity logs appear here instantly.'
              : 'Try changing the quiz set, sorting order, or pass/fail filter.'}
          </div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', borderBottomLeftRadius: '26px', borderBottomRightRadius: '26px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: 'rgba(255, 255, 255, 0.65)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                fontWeight: 800
              }}>
                <th style={{ padding: '16px 20px' }}>Register No</th>
                <th style={{ padding: '16px 20px' }}>Candidate Name</th>
                <th style={{ padding: '16px 20px' }}>Quiz Set</th>
                <th style={{ padding: '16px 20px' }}>Score</th>
                <th style={{ padding: '16px 20px' }}>Percentage</th>
                <th style={{ padding: '16px 20px' }}>Result</th>
                <th style={{ padding: '16px 20px' }}>Proctor Integrity</th>
                <th style={{ padding: '16px 20px' }}>Submitted Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((r, i) => {
                const pct = Number(r.percentage || 0);
                const isPass = pct >= 35;

                return (
                  <tr
                    key={i}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.9)' }}>
                      {r.rollNo}
                    </td>
                    <td style={{ padding: '16px 20px', fontWeight: 700 }}>
                      {r.studentName}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.75)' }}>
                      {r.quizTitle || 'Computer Science'}
                    </td>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>
                      {r.score} / {r.total}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ fontWeight: 800, color: isPass ? '#4ade80' : '#f87171' }}>
                        {pct}%
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.4px',
                        background: isPass ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        border: isPass ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(239, 68, 68, 0.35)',
                        color: isPass ? '#4ade80' : '#f87171'
                      }}>
                        {isPass ? 'PASS' : 'FAIL'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: (r.violations || 0) === 0 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        border: (r.violations || 0) === 0 ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(245, 158, 11, 0.35)',
                        color: (r.violations || 0) === 0 ? '#4ade80' : '#fbbf24',
                        fontSize: '11px',
                        fontWeight: 700
                      }}>
                        {(r.violations || 0) === 0 ? <CheckCircleIcon size={12} color="#4ade80" /> : <AlertTriangleIcon size={12} color="#fbbf24" />}
                        <span>{(r.violations || 0) === 0 ? 'Clean Record' : `${r.violations} Alert${r.violations > 1 ? 's' : ''}`}</span>
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', fontWeight: 600 }}>
                      {r.attendedDate || 'Today'} {r.attendedTime || ''}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
