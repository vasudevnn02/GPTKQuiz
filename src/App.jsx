import React, { useState, useEffect } from 'react';
import { useStudentAuth } from './hooks/useStudentAuth.js';
import { useQuizRunner } from './hooks/useQuizRunner.js';
import { initializeDatabaseSeed, subscribeToQuizzes, subscribeToResults } from './services/firebase.js';

import AnimatedBg from './components/AnimatedBg.jsx';

import AuthCard from './components/auth/AuthCard.jsx';
import StudentTopNav from './components/student/StudentTopNav.jsx';

import LiveExamGrid from './components/student/LiveExamGrid.jsx';
import UpcomingExamGrid from './components/student/UpcomingExamGrid.jsx';
import ResultsTable from './components/student/ResultsTable.jsx';

import RunnerHeader from './components/runner/RunnerHeader.jsx';
import QuestionView from './components/runner/QuestionView.jsx';
import QuestionRail from './components/runner/QuestionRail.jsx';
import AntiCheatGuard from './components/runner/AntiCheatGuard.jsx';

import TeacherTopNav from './components/teacher/TeacherTopNav.jsx';
import StudentScoreboard from './components/teacher/StudentScoreboard.jsx';
import QuestionPackManager from './components/teacher/QuestionPackManager.jsx';
import QuestionEditModal from './components/teacher/QuestionEditModal.jsx';

const PAGE = { position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' };

export default function App() {
  const { currentUser, loading, error, setError, loginStudent, registerStudent, loginTeacher, logout } = useStudentAuth();
  const [quizzes, setQuizzes] = useState({});
  const [results, setResults] = useState({});
  const [studentTab, setStudentTab] = useState('live');
  const [teacherTab, setTeacherTab] = useState('quizzes'); // 'quizzes' | 'results' | 'dashboard'
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    initializeDatabaseSeed();
    const unsubQuizzes = subscribeToQuizzes(setQuizzes);
    const unsubResults = subscribeToResults(setResults);
    return () => { unsubQuizzes?.(); unsubResults?.(); };
  }, []);

  const quizList = Object.values(quizzes);
  const currentQuiz = quizList[0] || null;

  const runner = useQuizRunner(activeQuiz, currentUser, (activeQuiz?.durationMinutes || 15) * 60, () => {
    setActiveQuiz(null);
    setStudentTab('results');
  });

  const Bg = <AnimatedBg />;

  if (!currentUser) {
    return (
      <>
        {Bg}
        <div style={PAGE}>
          <AuthCard onStudentLogin={loginStudent} onStudentRegister={registerStudent} onTeacherLogin={loginTeacher} loading={loading} error={error} setError={setError} />
        </div>
      </>
    );
  }

  if (currentUser.role === 'teacher') {
    return (
      <>
        {Bg}
        <div style={PAGE}>
          <TeacherTopNav admin={currentUser} activeTab={teacherTab} onSelectTab={setTeacherTab} onLogout={logout} />

          <main style={{ maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '28px 24px', flex: 1 }}>
            
            {/* Top Toolbar matching Screenshot 1 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
              
              {/* Left Segmented Switcher: Quizzes & Question Sets (N) | Student Results & WhatsApp Hub (N) */}
              <div style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '4px',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                backdropFilter: 'blur(20px)',
                gap: '4px'
              }}>
                <button
                  onClick={() => setTeacherTab('quizzes')}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: teacherTab === 'quizzes' ? 800 : 600,
                    background: teacherTab === 'quizzes'
                      ? 'linear-gradient(135deg, rgba(56,189,248,0.35) 0%, rgba(2,132,199,0.35) 100%)'
                      : 'transparent',
                    color: teacherTab === 'quizzes' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                    border: teacherTab === 'quizzes' ? '1px solid rgba(56,189,248,0.55)' : '1px solid transparent',
                    boxShadow: teacherTab === 'quizzes' ? '0 2px 12px rgba(56,189,248,0.25), inset 0 1px 0 rgba(255,255,255,0.3)' : 'none',
                    transition: 'all 0.18s ease'
                  }}
                >
                  Quizzes & Question Sets ({quizList.length})
                </button>

                <button
                  onClick={() => setTeacherTab('results')}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: teacherTab === 'results' ? 800 : 600,
                    background: teacherTab === 'results'
                      ? 'linear-gradient(135deg, rgba(56,189,248,0.35) 0%, rgba(2,132,199,0.35) 100%)'
                      : 'transparent',
                    color: teacherTab === 'results' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                    border: teacherTab === 'results' ? '1px solid rgba(56,189,248,0.55)' : '1px solid transparent',
                    boxShadow: teacherTab === 'results' ? '0 2px 12px rgba(56,189,248,0.25), inset 0 1px 0 rgba(255,255,255,0.3)' : 'none',
                    transition: 'all 0.18s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>💬</span>
                  <span>Student Results & WhatsApp Hub ({Object.keys(results).length})</span>
                </button>
              </div>

              {/* Right: + Create New Quiz button */}
              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.5)',
                  color: '#ffffff',
                  padding: '10px 22px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 20px rgba(2, 132, 199, 0.45)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '15px' }}>+</span>
                <span>Create New Quiz</span>
              </button>
            </div>

            {/* Main Content Area based on Tab */}
            {teacherTab === 'quizzes' && (
              <QuestionPackManager
                quizzes={quizzes}
                onUpdated={() => setRefreshKey(k => k + 1)}
                onOpenNewQuizModal={() => setShowCreateModal(true)}
              />
            )}

            {teacherTab === 'results' && (
              <StudentScoreboard results={results} quizzes={quizzes} />
            )}
          </main>

          {/* Footer matching Screenshot 1 */}
          <footer style={{ textAlign: 'center', padding: '24px 16px', color: 'rgba(255, 255, 255, 0.45)', fontSize: '11px', lineHeight: '1.6', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div><strong>Government Polytechnic, Kadur-197</strong> — Vedha Park Opp Kadur Taluk, Karnataka 577548, India</div>
            <div style={{ marginTop: '4px' }}>
              <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span> | <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms & Conditions</span> | <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cookies Policy</span> | © 2025–2026 GPTKQuiz. All rights reserved.
            </div>
          </footer>

          {showCreateModal && (
            <QuestionEditModal
              currentQuiz={currentQuiz}
              answerKeys={{}}
              onClose={() => setShowCreateModal(false)}
              onSaved={() => setRefreshKey(k => k + 1)}
            />
          )}
        </div>
      </>
    );
  }

  if (activeQuiz) {
    const currentQuestion = activeQuiz.questions?.[runner.currentIndex];
    return (
      <>
        {Bg}
        <div style={{ ...PAGE, display: 'flex', flexDirection: 'column' }}>
          <RunnerHeader quizTitle={activeQuiz.title} currentIndex={runner.currentIndex} totalQuestions={activeQuiz.questions?.length || 1} timeLeft={runner.timeLeft} violations={runner.violations} onSubmitExam={() => runner.handleFinalSubmit('manual')} isSubmitting={runner.isSubmitting} />
          <AntiCheatGuard onViolation={(reason) => runner.addViolation(reason)} />
          <div style={{ display: 'flex', flex: 1 }}>
            <main style={{ flex: 1, padding: '36px 28px', overflowY: 'auto' }}>
              <QuestionView question={currentQuestion} selectedOption={runner.answers[currentQuestion?.id]} onSelectOption={(idx) => runner.selectAnswer(currentQuestion.id, idx)} currentIndex={runner.currentIndex} totalQuestions={activeQuiz.questions?.length || 1} onNext={() => runner.setCurrentIndex(p => Math.min((activeQuiz.questions?.length||1)-1, p+1))} onPrev={() => runner.setCurrentIndex(p => Math.max(0, p-1))} />
            </main>
            <QuestionRail questions={activeQuiz.questions || []} answers={runner.answers} currentIndex={runner.currentIndex} onJumpToQuestion={runner.setCurrentIndex} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {Bg}
      <div style={{ ...PAGE, display: 'flex', flexDirection: 'column' }}>
        <StudentTopNav user={currentUser} onLogout={logout} activeTab={studentTab} onSelectTab={setStudentTab} />
        <main style={{ flex: 1, padding: '32px 36px', overflowY: 'auto', maxWidth: '1240px', width: '100%', margin: '0 auto', alignSelf: 'stretch' }}>
          {studentTab === 'live'     && <LiveExamGrid quizzes={quizzes} results={results} student={currentUser} onStartExam={setActiveQuiz} onViewResult={() => setStudentTab('results')} />}
          {studentTab === 'upcoming' && <UpcomingExamGrid />}
          {studentTab === 'results'  && <ResultsTable results={results} student={currentUser} />}
        </main>
      </div>
    </>
  );
}
