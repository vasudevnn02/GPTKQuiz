import React from 'react';
import { BookOpenIcon, AwardIcon, ShieldIcon, ClockIcon } from '../icons/SvgIcons.jsx';

export default function TeacherStats({ questionsCount = 0, results = {}, currentQuiz }) {
  const resultList = Object.values(results);
  const totalSubmissions = resultList.length;

  const avgScore = totalSubmissions > 0
    ? Math.round(resultList.reduce((acc, r) => acc + (r.percentage || 0), 0) / totalSubmissions)
    : 0;

  const stats = [
    { label: 'Question Bank', value: questionsCount, sub: 'Active repository', icon: BookOpenIcon, bg: 'linear-gradient(135deg, #0a84ff, #0066cc)', glow: 'rgba(10, 132, 255, 0.35)' },
    { label: 'Exams Completed', value: totalSubmissions, sub: 'Verified candidates', icon: AwardIcon, bg: 'linear-gradient(135deg, #30d158, #22993f)', glow: 'rgba(48, 209, 88, 0.35)' },
    { label: 'Class Average', value: `${avgScore}%`, sub: 'Standard performance', icon: ShieldIcon, bg: 'linear-gradient(135deg, #5e5ce6, #4240b0)', glow: 'rgba(94, 92, 230, 0.35)' },
    { label: 'Exam Window', value: currentQuiz?.windowStart ? `${currentQuiz.windowStart} - ${currentQuiz.windowEnd}` : '10:00 AM - 5:00 PM', sub: `${currentQuiz?.durationMinutes || 15} Mins countdown`, icon: ClockIcon, bg: 'linear-gradient(135deg, #ff9f0a, #d48100)', glow: 'rgba(255, 159, 10, 0.35)' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', marginBottom: '28px' }}>
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div
            key={idx}
            style={{
              background: 'rgba(255, 255, 255, 0.045)',
              backdropFilter: 'blur(30px) saturate(190%)',
              WebkitBackdropFilter: 'blur(30px) saturate(190%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            {/* iOS Style Squircle Icon */}
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '13px',
              background: s.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              flexShrink: 0,
              boxShadow: `0 8px 18px ${s.glow}, inset 0 1px 1px rgba(255, 255, 255, 0.35)`
            }}>
              <Icon size={22} color="#ffffff" />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 600 }}>
                {s.label}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>
                {s.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
