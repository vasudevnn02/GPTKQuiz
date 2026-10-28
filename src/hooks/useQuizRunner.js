import { useState, useEffect, useRef } from 'react';
import { submitQuizResult, rtdb } from '../services/firebase.js';
import { ref, get, child } from 'firebase/database';
import { DEFAULT_QUIZ_KEYS } from '../services/seedData.js';

export function useQuizRunner(quiz, student, initialSeconds = 900, onComplete) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [violations, setViolations] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (timeLeft <= 0 && !submittedRef.current) {
      handleFinalSubmit('timer_expired');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const selectAnswer = (questionId, optionIdx) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const addViolation = () => {
    setViolations((prev) => prev + 1);
  };

  const handleFinalSubmit = async (reason = 'manual', isDebarred = false) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setIsSubmitting(true);

    let keyMap = DEFAULT_QUIZ_KEYS[quiz?.id] || DEFAULT_QUIZ_KEYS.quiz_fsd_01;
    try {
      if (quiz?.id) {
        const snap = await get(child(ref(rtdb), `quiz_keys/${quiz.id}`));
        if (snap.exists()) keyMap = snap.val();
      }
    } catch (e) {
      console.warn("Keys fetched locally fallback:", e);
    }

    let score = 0;
    const breakdown = (quiz?.questions || []).map((q) => {
      const selected = answers[q.id];
      const correct = keyMap[q.id];
      const isCorrect = selected !== undefined && selected === correct;
      if (isCorrect && !isDebarred) score += 1;
      return {
        questionId: q.id,
        questionText: q.text,
        selected: selected !== undefined ? selected : null,
        correct: correct !== undefined ? correct : 0,
        isCorrect: isDebarred ? false : isCorrect
      };
    });

    const total = quiz?.questions?.length || 1;
    const finalScore = isDebarred ? 0 : score;
    const percentage = isDebarred ? 0 : Math.round((finalScore / total) * 100);

    const resultPayload = {
      quizId: quiz?.id || 'quiz_default',
      quizTitle: quiz?.title || 'Assessment',
      rollNo: student?.rollNo || 'Candidate',
      studentName: student?.name || 'Candidate',
      course: student?.course || 'Computer Science',
      score: finalScore,
      total,
      percentage,
      isDebarred: Boolean(isDebarred),
      status: isDebarred ? 'FAIL' : (percentage >= 35 ? 'PASS' : 'FAIL'),
      violations: isDebarred ? Math.max(violations, 2) : violations,
      completedAt: Date.now(),
      attendedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      attendedTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      reason: isDebarred ? 'Debarred: Tab Switch Violation (Disqualified)' : reason,
      breakdown
    };

    if (student?.rollNo) {
      await submitQuizResult(student.rollNo, resultPayload);
    }
    setIsSubmitting(false);
    if (onComplete) onComplete(resultPayload);
  };

  return {
    currentIndex,
    setCurrentIndex,
    answers,
    selectAnswer,
    timeLeft,
    violations,
    addViolation,
    handleFinalSubmit,
    isSubmitting
  };
}
