import React from 'react';
import QuizCardItem from './QuizCardItem.jsx';
import { checkQuizAvailability } from '../../hooks/useQuizWindow.js';
import { glassBtn } from '../../glass.js';
import { CalendarIcon } from '../icons/SvgIcons.jsx';

export default function LiveExamGrid({ quizzes = {}, results = {}, student, onStartExam, onViewResult, onGoToUpcoming }) {
  const quizList = Object.values(quizzes);

  // Exam Center ONLY shows tests that are available to attend RIGHT NOW (not attended, open window)
  const liveAvailableQuizzes = quizList.filter((quiz) => {
    const key = `${student?.rollNo}_${quiz.id}`;
    const isAttended = Boolean(results[key]);
    if (isAttended) return false;

    const { isOpen } = checkQuizAvailability(quiz);
    return isOpen;
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {liveAvailableQuizzes.length === 0 ? (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 160px)'
        }}>
          <div className="liqglass" style={{
            borderRadius: '24px',
            padding: '48px 36px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            maxWidth: '520px',
            width: '100%'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8'
            }}>
              <CalendarIcon size={24} color="#38bdf8" />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                No Assessments Available Right Now
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.6' }}>
                All tests outside the current active time window are listed under the Scheduled section.
              </div>
            </div>
            {onGoToUpcoming && (
              <button
                onClick={onGoToUpcoming}
                style={{
                  ...glassBtn,
                  background: 'rgba(56, 189, 248, 0.18)',
                  border: '1px solid rgba(56, 189, 248, 0.45)',
                  color: '#38bdf8',
                  padding: '10px 22px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginTop: '6px',
                  cursor: 'pointer'
                }}
              >
                View Scheduled Tests →
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '22px' }}>
          {liveAvailableQuizzes.map((quiz) => {
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
