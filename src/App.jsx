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
import TeacherStats from './components/teacher/TeacherStats.jsx';
import StudentScoreboard from './components/teacher/StudentScoreboard.jsx';
import QuestionPackManager from './components/teacher/QuestionPackManager.jsx';
import TestOverviewCard from './components/teacher/TestOverviewCard.jsx';

const PAGE = { position: 'relative', zIndex: 1, minHeight: '100vh' };

export default function App() {
  const { currentUser, loading, error, setError, loginStudent, loginTeacher, logout } = useStudentAuth();
  const [quizzes, setQuizzes] = useState({});
  const [results, setResults] = useState({});
  const [studentTab, setStudentTab] = useState('live');
  const [teacherTab, setTeacherTab] = useState('dashboard');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    initializeDatabaseSeed();
    const unsubQuizzes = subscribeToQuizzes(setQuizzes);
    const unsubResults = subscribeToResults(setResults);
    return () => { unsubQuizzes?.(); unsubResults?.(); };
  }, []);

  const currentQuiz = Object.values(quizzes)[0] || null;

  const runner = useQuizRunner(activeQuiz, currentUser, (activeQuiz?.durationMinutes || 15) * 60, () => {
    setActiveQuiz(null);
    setStudentTab('results');
  });

  // Always render animated background
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
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
            <TeacherStats questionsCount={currentQuiz?.questions?.length || 0} results={results} currentQuiz={currentQuiz} />
            {teacherTab === 'dashboard' && <TestOverviewCard currentQuiz={currentQuiz} resultsCount={Object.keys(results).length} />}
            {teacherTab === 'questions' && <QuestionPackManager quizzes={quizzes} onUpdated={() => setRefreshKey(k => k + 1)} />}
            {teacherTab === 'results'   && <StudentScoreboard results={results} />}
          </main>
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
              <div style={{ background:'rgba(255,255,255,0.05)', backdropFilter:'blur(40px)', WebkitBackdropFilter:'blur(40px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'20px', padding:'32px', maxWidth:'720px', boxShadow:'0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                <h2 style={{ fontSize:'20px', fontWeight:700, color:'#fff', marginBottom:'14px' }}>Examination Regulations & Honor Code</h2>
                <ul style={{ color:'rgba(255,255,255,0.6)', fontSize:'13px', lineHeight:'1.9', paddingLeft:'22px' }}>
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
