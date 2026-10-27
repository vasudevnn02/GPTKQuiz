import React, { useState, useEffect } from 'react';
import { useStudentAuth } from './hooks/useStudentAuth.js';
import { useQuizRunner } from './hooks/useQuizRunner.js';
import { initializeDatabaseSeed, subscribeToQuizzes, subscribeToResults } from './services/firebase.js';

import AnimatedBg from './components/AnimatedBg.jsx';

import AuthCard from './components/auth/AuthCard.jsx';
import StudentTopNav from './components/student/StudentTopNav.jsx';
import StudentSidebar from './components/student/StudentSidebar.jsx';
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
  const { currentUser, loading, error, setError, loginStudent, loginTeacher, logout } = useStudentAuth();
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
          <AuthCard onStudentLogin={loginStudent} onTeacherLogin={loginTeacher} loading={loading} error={error} setError={setError} />
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
              <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '14px', padding: '4px', border: '1px solid rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(20px)' }}>
                <button
                  onClick={() => setTeacherTab('quizzes')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 800,
                    background: teacherTab === 'quizzes' ? '#ffffff' : 'transparent',
                    color: teacherTab === 'quizzes' ? '#000000' : 'rgba(255, 255, 255, 0.7)',
                    boxShadow: teacherTab === 'quizzes' ? '0 4px 14px rgba(0,0,0,0.35)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Quizzes & Question Sets ({quizList.length})
                </button>

                <button
                  onClick={() => setTeacherTab('results')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 800,
                    background: teacherTab === 'results' ? '#ffffff' : 'transparent',
                    color: teacherTab === 'results' ? '#000000' : 'rgba(255, 255, 255, 0.7)',
                    boxShadow: teacherTab === 'results' ? '0 4px 14px rgba(0,0,0,0.35)' : 'none',
                    transition: 'all 0.15s ease',
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
              <StudentScoreboard results={results} />
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
        <StudentTopNav user={currentUser} onLogout={logout} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div style={{ display: 'flex', flex: 1 }}>
          <StudentSidebar activeTab={studentTab} onSelectTab={setStudentTab} />
          <main style={{ flex: 1, padding: '28px 36px', overflowY: 'auto' }}>
            {studentTab === 'live'     && <LiveExamGrid quizzes={quizzes} results={results} student={currentUser} onStartExam={setActiveQuiz} onViewResult={() => setStudentTab('results')} />}
            {studentTab === 'upcoming' && <UpcomingExamGrid />}
            {studentTab === 'results'  && <ResultsTable results={results} student={currentUser} />}
            {studentTab === 'rules'    && (
              <div style={{ background:'rgba(12,20,38,0.52)', backdropFilter:'blur(32px)', WebkitBackdropFilter:'blur(32px)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:'24px', padding:'32px', maxWidth:'720px', boxShadow:'0 24px 60px rgba(0,0,0,0.55)' }}>
                <h2 style={{ fontSize:'20px', fontWeight:800, color:'#ffffff', marginBottom:'14px' }}>Examination Regulations & Honor Code</h2>
                <ul style={{ color:'rgba(255,255,255,0.7)', fontSize:'13px', lineHeight:'1.9', paddingLeft:'22px' }}>
                  <li>Assessments must be attended within the scheduled window (10:00 AM – 05:00 PM).</li>
                  <li>Your countdown timer begins upon clicking "Start Quiz Now". Time is capped if joined near 5:00 PM.</li>
                  <li>Full-screen lockdown is enforced. Tab-switches generate proctor alerts.</li>
                  <li>Each candidate is allowed exactly ONE verified submission per assessment.</li>
                </ul>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
