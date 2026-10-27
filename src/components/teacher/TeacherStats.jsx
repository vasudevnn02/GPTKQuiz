import React from 'react';
import { BookOpenIcon, AwardIcon, ShieldIcon, ClockIcon } from '../icons/SvgIcons.jsx';

export default function TeacherStats({ questionsCount = 0, results = {}, currentQuiz }) {
  const resultList = Object.values(results);
  const totalSubmissions = resultList.length;
  const avgScore = totalSubmissions > 0
    ? Math.round(resultList.reduce((acc, r) => acc + (r.percentage || 0), 0) / totalSubmissions)
    : 0;

  const stats = [
    { label: 'Question Bank', value: questionsCount, sub: 'Active questions', icon: BookOpenIcon },
    { label: 'Exams Completed', value: totalSubmissions, sub: 'Verified candidates', icon: AwardIcon },
    { label: 'Class Average', value: `${avgScore}%`, sub: 'Performance index', icon: ShieldIcon },
    {
      label: 'Exam Window', icon: ClockIcon,
      value: currentQuiz?.windowStart ? `${currentQuiz.windowStart} – ${currentQuiz.windowEnd}` : '10:00 AM – 5:00 PM',
      sub: `${currentQuiz?.durationMinutes || 15} min countdown`
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '28px' }}>
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div key={idx} style={{
            background: 'rgba(8,20,60,0.55)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(96,165,250,0.18)',
            borderRadius: '20px', padding: '20px',
            display: 'flex', alignItems: 'center', gap: '14px',
            boxShadow: '0 12px 30px rgba(0,0,20,0.4), inset 0 1px 0 rgba(96,165,250,0.18)'
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '13px', flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(37,99,235,0.5), rgba(29,78,216,0.7))',
              border: '1px solid rgba(96,165,250,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(37,99,235,0.35), inset 0 1px 1px rgba(255,255,255,0.2)'
            }}>
              <Icon size={21} color="rgba(255,255,255,0.92)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '11px', color: 'rgba(150,190,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: '19px', fontWeight: 700, color: '#fff', margin: '2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: 'rgba(150,190,255,0.4)' }}>{s.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
