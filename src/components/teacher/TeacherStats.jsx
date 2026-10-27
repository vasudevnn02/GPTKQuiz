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
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:'12px', marginBottom:'24px' }}>
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={i} style={{ ...glass, borderRadius:'20px', padding:'18px', display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{ ...glassInner, width:'42px', height:'42px', borderRadius:'12px', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon size={20} color="rgba(255,255,255,0.9)" />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:'0.6px', fontWeight:600 }}>{s.label}</div>
              <div style={{ fontSize:'18px', fontWeight:700, color:'#fff', margin:'2px 0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.value}</div>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)' }}>{s.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
