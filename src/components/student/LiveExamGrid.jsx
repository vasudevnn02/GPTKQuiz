import React from 'react';
import QuizCardItem from './QuizCardItem.jsx';
import { PlayIcon } from '../icons/SvgIcons.jsx';

export default function LiveExamGrid({ quizzes = {}, results = {}, student, onStartExam, onViewResult }) {
  const quizList = Object.values(quizzes);

  return (
    <div>
      <div style={{ marginBottom: '22px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#0a84ff' }}><PlayIcon size={20} /></span>
          <span>Today's Examination Window (10:00 AM – 05:00 PM)</span>
        </h2>
        <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '4px' }}>
          Tests can be attended any time inside the 10:00 AM – 5:00 PM window. Your personal 15-minute timer begins when you start.
        </p>
      </div>

      {quizList.length === 0 ? (
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '48px 24px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
          No assessments currently open for this window.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
          {quizList.map((quiz) => {
            const key = `${student?.rollNo}_${quiz.id}`;
            const attendedResult = results[key] || null;
            return (
              <QuizCardItem
                key={quiz.id}
                quiz={quiz}
                attendedResult={attendedResult}
                onStartExam={onStartExam}
                onViewResult={onViewResult}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
