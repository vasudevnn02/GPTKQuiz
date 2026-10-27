import { useState, useEffect } from 'react';
import { ref, get, child } from 'firebase/database';
import { rtdb } from '../services/firebase.js';
import { DEFAULT_STUDENTS } from '../services/seedData.js';

export function useStudentAuth() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gptk_student_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loginStudent = async (rollNo, name, password) => {
    setLoading(true);
    setError('');
    const cleanRollNo = rollNo.trim().toUpperCase();
    const cleanName = name.trim().toLowerCase();
    const cleanPass = password.trim();

    try {
      let student = null;
      try {
        const snap = await get(child(ref(rtdb), `students/${cleanRollNo}`));
        if (snap.exists()) student = snap.val();
      } catch (e) {
        console.warn("RTDB fetch failed, checking local seed:", e);
      }

      if (!student) {
        const local = JSON.parse(localStorage.getItem('gptk_students') || '{}');
        student = local[cleanRollNo] || DEFAULT_STUDENTS[cleanRollNo];
      }

      if (!student) {
        throw new Error('Register number not registered. Please contact proctor.');
      }

      if (student.name.trim().toLowerCase() !== cleanName) {
        throw new Error('Full name does not match registered identity.');
      }

      if (student.passwordHash !== cleanPass) {
        throw new Error('Invalid authentication password.');
      }

      const session = {
        role: 'student',
        rollNo: student.rollNo,
        name: student.name,
        course: student.course || 'Computer Science and Engineering',
        loggedInAt: Date.now()
      };

      localStorage.setItem('gptk_student_session', JSON.stringify(session));
      setCurrentUser(session);
      return session;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginTeacher = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if ((cleanEmail === 'admin@gptkquiz.edu' || cleanEmail === 'admin') && password === 'CSE@2026') {
      const session = {
        role: 'teacher',
        email: cleanEmail,
        name: 'Head Proctor / Course Admin',
        loggedInAt: Date.now()
      };
      localStorage.setItem('gptk_student_session', JSON.stringify(session));
      setCurrentUser(session);
      return session;
    }
    throw new Error('Invalid teacher credentials. Use admin@gptkquiz.edu / CSE@2026');
  };

  const logout = () => {
    localStorage.removeItem('gptk_student_session');
    setCurrentUser(null);
  };

  return { currentUser, loading, error, setError, loginStudent, loginTeacher, logout };
}
