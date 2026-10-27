import React, { useState, useMemo } from 'react';
import { AwardIcon, CheckCircleIcon, AlertTriangleIcon } from '../icons/SvgIcons.jsx';

export default function StudentScoreboard({ results = {}, quizzes = {} }) {
  const [selectedQuiz, setSelectedQuiz] = useState('all');
  const [sortOrder, setSortOrder] = useState('high_score'); // 'high_score' | 'low_score' | 'az' | 'za'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pass' | 'fail'

  const resultList = Object.values(results);

  // Extract unique quiz titles from results or available quizzes
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

  // Filter and Sort results
  const filteredResults = useMemo(() => {
    return resultList
      .filter(r => {
        // Quiz filter
        if (selectedQuiz !== 'all' && r.quizTitle !== selectedQuiz) {
          return false;
        }
        // Pass / Fail filter (passing threshold is 35%)
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

  const selectStyle = {
    background: 'rgba(0, 0, 0, 0.45)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '8px 14px',
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    outline: 'none',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: '26px',
      boxShadow: '0 16px 44px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
      overflow: 'hidden'
    }}>
      {/* ── CARD HEADER TOOLBAR WITH THE 3 CONTROLS ON THE RIGHT EDGE ── */}
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

        {/* Right Edge: 3 Teacher Filter Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          
          {/* Option 1: Choose Quiz Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase' }}>
              Quiz:
            </span>
            <select
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
              style={selectStyle}
            >
              <option value="all" style={{ background: '#0f172a', color: '#ffffff' }}>All Examination Sets</option>
              {quizTitles.map((title) => (
                <option key={title} value={title} style={{ background: '#0f172a', color: '#ffffff' }}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Option 2: Sort (A-Z / Z-A / 100%-0% / 0%-100%) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase' }}>
              Sort:
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={selectStyle}
            >
              <option value="high_score" style={{ background: '#0f172a', color: '#ffffff' }}>Score: 100% → 0%</option>
              <option value="low_score" style={{ background: '#0f172a', color: '#ffffff' }}>Score: 0% → 100%</option>
              <option value="az" style={{ background: '#0f172a', color: '#ffffff' }}>Candidate: A → Z</option>
              <option value="za" style={{ background: '#0f172a', color: '#ffffff' }}>Candidate: Z → A</option>
            </select>
          </div>

          {/* Option 3: Pass and Fail Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase' }}>
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={selectStyle}
            >
              <option value="all" style={{ background: '#0f172a', color: '#ffffff' }}>All (Pass & Fail)</option>
              <option value="pass" style={{ background: '#0f172a', color: '#4ade80' }}>✓ Pass Only (≥ 35%)</option>
              <option value="fail" style={{ background: '#0f172a', color: '#f87171' }}>✕ Fail Only (&lt; 35%)</option>
            </select>
          </div>
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
        <div style={{ overflowX: 'auto' }}>
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
