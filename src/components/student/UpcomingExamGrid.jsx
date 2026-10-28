import React from 'react';
import { ClockIcon, LockIcon, BookOpenIcon } from '../icons/SvgIcons.jsx';
import { checkQuizAvailability } from '../../hooks/useQuizWindow.js';

export default function UpcomingExamGrid({ quizzes = {}, results = {}, student }) {
  const quizList = Object.values(quizzes);

  // Scheduled / upcoming quizzes (those not live right now or date != today)
  const allScheduled = quizList.filter((quiz) => {
    const key = `${student?.rollNo}_${quiz.id}`;
    const isAttended = Boolean(results[key]);
    if (isAttended) return false;

    const { isOpen } = checkQuizAvailability(quiz);
    return !isOpen; // All non-live quizzes belong here
  }).map(q => {
    const { label } = checkQuizAvailability(q);
    return {
      id: q.id,
      title: q.title,
      course: q.course || 'Computer Science and Engineering',
      date: q.date || 'Today',
      timeWindow: `${q.windowStart || '10:00 AM'} – ${q.windowEnd || '05:00 PM'}`,
      duration: `${q.durationMinutes || 15} Mins`,
      questionsCount: Array.isArray(q.questions) ? q.questions.length : Object.keys(q.questions || {}).length,
      statusLabel: label,
    };
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {allScheduled.length === 0 ? (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 140px)'
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
              <ClockIcon size={24} color="#38bdf8" />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                No Scheduled Assessments
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.6' }}>
                All active quizzes are currently available in the Exam Center.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '22px'
        }}>
        {allScheduled.map((item) => (
          <div
            key={item.id}
            className="liqglass"
            style={{
              borderRadius: '26px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '230px',
              position: 'relative',
              userSelect: 'none'
            }}
          >
            {/* Top: Icon + Department + Scheduled Badge */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '13px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}>
                  <BookOpenIcon size={20} color="#38bdf8" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px'
                  }}>
                    {item.course}
                  </span>

                  <span style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '4px 9px',
                    borderRadius: '10px',
                    letterSpacing: '0.4px'
                  }}>
                    ● SCHEDULED
                  </span>
                </div>
              </div>

              {/* Title & Date */}
              <h3 style={{
                fontSize: '17px',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '4px',
                lineHeight: '1.35',
                fontFamily: 'var(--font-ny)'
              }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.4', marginBottom: '14px' }}>
                Evaluation Window: {item.date}
              </p>
            </div>

            {/* Meta Chips */}
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                marginBottom: '14px'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '10px',
                  padding: '7px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: '#ffffff',
                  fontWeight: 700
                }}>
                  <ClockIcon size={12} color="#38bdf8" />
                  <span>{item.duration}</span>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '10px',
                  padding: '7px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  <span>{item.timeWindow}</span>
                </div>
              </div>

              {/* Locked Status Chip */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.65)',
                fontWeight: 700
              }}>
                <LockIcon size={13} color="rgba(255, 255, 255, 0.65)" />
                <span>{item.statusLabel || `Starts on ${item.date}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
