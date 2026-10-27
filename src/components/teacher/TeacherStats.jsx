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
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(210px, 1fr))', gap:'14px', marginBottom:'28px' }}>
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div key={idx} style={{
            background: 'rgba(255,255,255,0.045)',
            backdropFilter: 'blur(48px) saturate(200%)',
            WebkitBackdropFilter: 'blur(48px) saturate(200%)',
            border: '1px solid rgba(255,255,255,0.11)',
            borderRadius: '20px', padding: '20px',
            display: 'flex', alignItems: 'center', gap: '14px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)'
          }}>
            <div style={{
              width:'44px', height:'44px', borderRadius:'13px', flexShrink:0,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.14)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
            }}>
              <Icon size={21} color="rgba(255,255,255,0.88)" />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'11px', color:'rgba(200,220,255,0.45)', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:600 }}>{s.label}</div>
              <div style={{ fontSize:'19px', fontWeight:700, color:'#fff', margin:'2px 0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.value}</div>
              <div style={{ fontSize:'11px', color:'rgba(200,220,255,0.35)' }}>{s.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
