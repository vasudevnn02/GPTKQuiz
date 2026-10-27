import React from 'react';
import { BookOpenIcon, AwardIcon, ShieldIcon, ClockIcon } from '../icons/SvgIcons.jsx';

export default function TeacherStats({ questionsCount = 0, results = {}, currentQuiz }) {
  const resultList = Object.values(results);
  const totalSubmissions = resultList.length;

  const avgScore = totalSubmissions > 0
    ? Math.round(resultList.reduce((acc, r) => acc + (r.percentage || 0), 0) / totalSubmissions)
    : 0;

  const stats = [
    { label: 'Question Bank', value: questionsCount, sub: 'Active questions', icon: BookOpenIcon, color: '#3ea6ff' },
    { label: 'Exams Completed', value: totalSubmissions, sub: 'Candidate submissions', icon: AwardIcon, color: '#2ba640' },
    { label: 'Class Average', value: `${avgScore}%`, sub: 'Overall performance', icon: ShieldIcon, color: '#f59e0b' },
    { label: 'Exam Window', value: currentQuiz?.windowStart ? `${currentQuiz.windowStart}-${currentQuiz.windowEnd}` : '10 AM - 5 PM', sub: `${currentQuiz?.durationMinutes || 15} Mins Timer`, icon: ClockIcon, color: '#ff0000' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div key={idx} style={{ background: '#212121', border: '1px solid #272727', borderRadius: '10px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#181818', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
              <Icon size={20} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#aaaaaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#f1f1f1', margin: '2px 0' }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: '#717171' }}>{s.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
