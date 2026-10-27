import React from 'react';
import QuizCardItem from './QuizCardItem.jsx';
import { PlayIcon } from '../icons/SvgIcons.jsx';

export default function LiveExamGrid({ quizzes = {}, results = {}, student, onStartExam, onViewResult }) {
  const quizList = Object.values(quizzes);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#f1f1f1', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#ff0000' }}><PlayIcon size={18} /></span>
            <span>Today's Examination Window (10:00 AM – 05:00 PM)</span>
          </h2>
          <p style={{ fontSize: '12px', color: '#aaaaaa', marginTop: '4px' }}>
            Tests can be started any time inside the 10:00 AM – 5:00 PM window. Your individual 15-minute countdown starts when you begin.
          </p>
        </div>
      </div>

      {quizList.length === 0 ? (
        <div style={{ background: '#212121', border: '1px solid #272727', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#aaaaaa' }}>
          No assessments currently scheduled for this window.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
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
