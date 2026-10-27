import React from 'react';
import { BookOpenIcon, AwardIcon, ShieldIcon, ClockIcon } from '../icons/SvgIcons.jsx';
import { glass, glassInner } from '../../glass.js';

export default function TeacherStats({ questionsCount = 0, results = {}, currentQuiz }) {
  const resultList = Object.values(results);
  const totalSubmissions = resultList.length;
  const avgScore = totalSubmissions > 0
    ? Math.round(resultList.reduce((a, r) => a + (r.percentage || 0), 0) / totalSubmissions) : 0;

  const stats = [
    { label: 'Question Bank',   value: questionsCount,       sub: 'Active questions',   icon: BookOpenIcon },
    { label: 'Exams Completed', value: totalSubmissions,      sub: 'Verified candidates',icon: AwardIcon    },
    { label: 'Class Average',   value: `${avgScore}%`,        sub: 'Performance index',  icon: ShieldIcon   },
    {
      label: 'Exam Window', icon: ClockIcon,
      value: currentQuiz?.windowStart
        ? `${currentQuiz.windowStart} – ${currentQuiz.windowEnd}`
        : '10:00 AM – 5:00 PM',
      sub: `${currentQuiz?.durationMinutes || 15} min countdown`
    }
  ];

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(210px,1fr))', gap:'14px', marginBottom:'26px' }}>
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={i} style={{ ...glass, borderRadius:'22px', padding:'20px', display:'flex', alignItems:'center', gap:'15px' }}>
            <div style={{
              ...glassInner,
              width:'46px',
              height:'46px',
              borderRadius:'14px',
              flexShrink:0,
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.45) 0%, rgba(15, 23, 42, 0.65) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            }}>
              <Icon size={21} color="rgba(255,255,255,0.98)" />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'11px', color:'rgba(30, 41, 59, 0.55)', textTransform:'uppercase', letterSpacing:'0.6px', fontWeight:700 }}>{s.label}</div>
              <div style={{ fontSize:'20px', fontWeight:800, color:'#0f172a', margin:'2px 0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.value}</div>
              <div style={{ fontSize:'11px', color:'rgba(30, 41, 59, 0.45)' }}>{s.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
