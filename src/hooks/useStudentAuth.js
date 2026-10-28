import { useState } from 'react';
import { ref, get, child, set } from 'firebase/database';
import { rtdb, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../services/firebase.js';
import { DEFAULT_STUDENTS } from '../services/seedData.js';

export function useStudentAuth() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gptk_student_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ────────────────────────────────────────────────────────────────
  // STUDENT LOGIN  (roll-no + name + password via virtual email)
  // ────────────────────────────────────────────────────────────────
  const loginStudent = async (rollNo, name, password) => {
    setLoading(true);
    setError('');
    const cleanRollNo = rollNo.trim().toUpperCase();
    const cleanName   = name.trim().toLowerCase();
    const cleanPass   = password.trim();
    const virtualEmail = `${cleanRollNo}@gptk.internal`;

    try {
      // Try Firebase Auth sign-in
      try {
        await signInWithEmailAndPassword(auth, virtualEmail, cleanPass);
      } catch (authErr) {
        console.warn('Auth sign-in:', authErr.code);
      }

      // Fetch student record from RTDB
      let student = null;
      try {
        const snap = await get(child(ref(rtdb), `students/${cleanRollNo}`));
        if (snap.exists()) student = snap.val();
      } catch {}

      if (!student) {
        const local = JSON.parse(localStorage.getItem('gptk_students') || '{}');
        student = local[cleanRollNo] || DEFAULT_STUDENTS[cleanRollNo];
      }

      if (!student) throw new Error('Register number not registered. Please contact your proctor.');
      if (student.name.trim().toLowerCase() !== cleanName) throw new Error('Full name does not match registered identity.');
      if (student.passwordHash !== cleanPass) throw new Error('Invalid authentication password.');

      const session = {
        role: 'student',
        rollNo: student.rollNo,
        name: student.name,
        course: student.course || 'Computer Science and Engineering',
        email: student.email || '',
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

  // ────────────────────────────────────────────────────────────────
  // STUDENT REGISTER — 2 steps
  //   Step 1: email + password + (name/rollNo/course all null)
  //           → Firebase Auth account created
  //           → throws { code: 'NEEDS_BASIC_INFO', step: 2 }
  //   Step 2: email + password + name + rollNo + course
  //           → saves student to RTDB + auto-login
  // ────────────────────────────────────────────────────────────────
  const registerStudent = async (email, password, name, rollNo, course) => {
    setLoading(true);
    setError('');

    // ── STEP 1: email + password only ──────────────────────────────
    if (!name && !rollNo) {
      try {
        if (!email || !password) throw new Error('Email and password are required.');
        if (password.length < 6)  throw new Error('Password must be at least 6 characters.');

        // Create Firebase Auth user with real email
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (authErr) {
          if (authErr.code === 'auth/email-already-in-use') {
            throw new Error('An account with this email already exists. Please sign in instead.');
          }
          if (authErr.code === 'auth/invalid-email') {
            throw new Error('Please enter a valid email address.');
          }
          throw new Error(authErr.message || 'Account creation failed.');
        }

        // Signal AuthCard to move to Step 2
        const err = new Error('Please complete your student profile.');
        err.code  = 'NEEDS_BASIC_INFO';
        err.step  = 2;
        throw err;
      } finally {
        setLoading(false);
      }
    }

    // ── STEP 2: save full profile ──────────────────────────────────
    try {
      const cleanRollNo = rollNo.trim().toUpperCase();
      const cleanName   = name.trim();
      const cleanCourse = course || 'Computer Science and Engineering';
      const virtualEmail = `${cleanRollNo}@gptk.internal`;

      if (!cleanRollNo || !cleanName) throw new Error('Name and Register Number are required.');

      // Check duplicate roll number
      let exists = false;
      try {
        const snap = await get(child(ref(rtdb), `students/${cleanRollNo}`));
        if (snap.exists()) exists = true;
      } catch {}
      if (!exists) {
        const local = JSON.parse(localStorage.getItem('gptk_students') || '{}');
        if (local[cleanRollNo] || DEFAULT_STUDENTS[cleanRollNo]) exists = true;
      }
      if (exists) throw new Error('This register number is already registered. Please sign in.');

      // Also link a virtual email to the same Firebase Auth account (best effort)
      try {
        await createUserWithEmailAndPassword(auth, virtualEmail, password);
      } catch (e) {
        // ignore — the real email account was already created in step 1
      }

      const newStudent = {
        rollNo:       cleanRollNo,
        name:         cleanName,
        email:        email,
        passwordHash: password,
        course:       cleanCourse,
        createdAt:    Date.now(),
        status:       'active'
      };

      // Save to RTDB
      try {
        await set(ref(rtdb, `students/${cleanRollNo}`), newStudent);
      } catch (e) {
        console.warn('RTDB save failed, using localStorage:', e);
      }

      // Save to localStorage
      const local = JSON.parse(localStorage.getItem('gptk_students') || '{}');
      local[cleanRollNo] = newStudent;
      localStorage.setItem('gptk_students', JSON.stringify(local));

      // Auto-login
      const session = {
        role:       'student',
        rollNo:     newStudent.rollNo,
        name:       newStudent.name,
        course:     newStudent.course,
        email:      newStudent.email,
        loggedInAt: Date.now()
      };
      localStorage.setItem('gptk_student_session', JSON.stringify(session));
      setCurrentUser(session);
      return session;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ────────────────────────────────────────────────────────────────
  // TEACHER LOGIN
  // ────────────────────────────────────────────────────────────────
  const loginTeacher = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if ((cleanEmail === 'admin@gptkquiz.edu' || cleanEmail === 'admin') && password === 'CSE@2026') {
      const session = {
        role:       'teacher',
        email:      cleanEmail,
        name:       'Head Proctor / Course Admin',
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

  return { currentUser, loading, error, setError, loginStudent, registerStudent, loginTeacher, logout };
}
