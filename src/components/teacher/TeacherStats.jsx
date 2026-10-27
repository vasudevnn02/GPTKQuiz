import React from 'react';
import { BookOpenIcon, AwardIcon, ShieldIcon, ClockIcon } from '../icons/SvgIcons.jsx';
import { glass } from '../../glass.js';

export default function TeacherStats({ questionsCount = 0, results = {}, currentQuiz }) {
  const resultList = Object.values(results);
  const totalSubmissions = resultList.length;
  const avgScore = totalSubmissions > 0
    ? Math.round(resultList.reduce((a, r) => a + (r.percentage || 0), 0) / totalSubmissions) : 0;

  const stats = [
    { label: 'QUESTION BANK',   value: questionsCount,       sub: 'Active questions',   icon: BookOpenIcon },
    { label: 'EXAMS COMPLETED', value: totalSubmissions,      sub: 'Verified candidates',icon: AwardIcon    },
    { label: 'CLASS AVERAGE',   value: `${avgScore}%`,        sub: 'Performance index',  icon: ShieldIcon   },
    {
      label: 'EXAM WINDOW', icon: ClockIcon,
      value: currentQuiz?.windowStart
        ? `${currentQuiz.windowStart} – 5:00 ...`
        : '10:00 AM – 5:00 ...',
      sub: `${currentQuiz?.durationMinutes || 15} min countdown`
    }
  ];

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:'16px', marginBottom:'24px' }}>
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={i} style={{
            ...glass,
            borderRadius:'24px',
            padding:'18px 20px',
            display:'flex',
            alignItems:'center',
            gap:'14px'
          }}>
            <div style={{
              width:'42px',
              height:'42px',
              borderRadius:'13px',
              flexShrink:0,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.25)'
            }}>
              <Icon size={19} color="rgba(255,255,255,0.92)" />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'10px', color:'rgba(255, 255, 255, 0.55)', textTransform:'uppercase', letterSpacing:'0.6px', fontWeight:700 }}>{s.label}</div>
              <div style={{ fontSize:'18px', fontWeight:800, color:'#ffffff', margin:'2px 0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.value}</div>
              <div style={{ fontSize:'11px', color:'rgba(255, 255, 255, 0.45)' }}>{s.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
