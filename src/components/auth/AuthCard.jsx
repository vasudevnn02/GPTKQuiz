import React, { useState } from 'react';
import StudentLoginForm from './StudentLoginForm.jsx';
import StudentRegisterForm from './StudentRegisterForm.jsx';
import BasicInfoForm from './BasicInfoForm.jsx';
import TeacherLoginForm from './TeacherLoginForm.jsx';
import { glassDeep } from '../../glass.js';

export default function AuthCard({ onStudentLogin, onStudentRegister, onTeacherLogin, loading, error, setError }) {
  const [role, setRole] = useState('student');         // 'student' | 'teacher'
  const [studentMode, setStudentMode] = useState('login'); // 'login' | 'register' | 'basicinfo'

  // Temp hold email/password after step 1 succeeds
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingPassword, setPendingPassword] = useState('');

  const handleRoleChange = (newRole) => {
    setError('');
    setRole(newRole);
    setStudentMode('login');
  };

  const handleStudentModeChange = (mode) => {
    setError('');
    setStudentMode(mode);
  };

  // Step 1: email + password → triggers Firebase Auth account creation
  const handleStep1Register = async (email, password) => {
    setError('');
    try {
      // We call the hook's step1 which creates the Firebase Auth user,
      // then moves us to step 2 without full login
      await onStudentRegister(email, password, null, null, null); // step1 signal
      // If it sets pending state in hook, catch it — else use local state
    } catch (err) {
      // If we get a "needs_basic_info" signal we move to step 2
      if (err?.code === 'NEEDS_BASIC_INFO' || err?.step === 2) {
        setPendingEmail(email);
        setPendingPassword(password);
        setStudentMode('basicinfo');
        setError('');
      }
      // other real errors stay shown
    }
  };

  // Step 2: name + rollNo + course → completes registration
  const handleStep2BasicInfo = async (name, rollNo, course) => {
    setError('');
    try {
      await onStudentRegister(pendingEmail, pendingPassword, name, rollNo, course);
    } catch (err) {
      // error shown from hook
    }
  };

  const isBasicInfoStep = studentMode === 'basicinfo';

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div
        className="liqglass-deep"
        style={{
          maxWidth: isBasicInfoStep ? '500px' : '440px',
          width: '100%',
          borderRadius: '28px',
          padding: '38px 32px',
          transition: 'max-width 0.3s ease'
        }}
      >
        {/* Portal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', color: '#ffffff', margin: 0, fontFamily: 'var(--font-ny)' }}>
            GPTK Quiz
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '4px', fontFamily: 'var(--font-ny)', fontStyle: 'italic' }}>
            Government Polytechnic, Kadur-197
          </p>
        </div>

        {/* Primary Role Switcher — hide when on Basic Info step */}
        {!isBasicInfoStep && (
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            borderRadius: '14px',
            padding: '4px',
            marginBottom: '20px',
            border: '1px solid rgba(255, 255, 255, 0.22)'
          }}>
            {['student', 'teacher'].map((r) => (
              <button
                key={r}
                onClick={() => handleRoleChange(r)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 800,
                  background: role === r ? 'rgba(255, 255, 255, 0.22)' : 'transparent',
                  color: '#ffffff',
                  border: role === r ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid transparent',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
                }}
              >
                {r === 'student' ? 'Student Portal' : 'Teacher Studio'}
              </button>
            ))}
          </div>
        )}

        {/* Student Sub-mode Switcher — hide on basic info step */}
        {role === 'student' && !isBasicInfoStep && (
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            borderRadius: '13px',
            padding: '4px',
            marginBottom: '22px',
            border: '1px solid rgba(255, 255, 255, 0.22)'
          }}>
            {['login', 'register'].map((m) => {
              const label = m === 'login' ? 'Sign In' : 'Register (New Candidate)';
              const isActive = studentMode === m;
              return (
                <button
                  key={m}
                  onClick={() => handleStudentModeChange(m)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '9px',
                    fontSize: '12px',
                    fontWeight: 800,
                    background: isActive ? 'rgba(56, 189, 248, 0.22)' : 'transparent',
                    color: isActive ? '#38bdf8' : '#ffffff',
                    border: isActive ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid transparent',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer'
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Form Content */}
        {role === 'student' ? (
          studentMode === 'login' ? (
            <StudentLoginForm
              onLogin={onStudentLogin}
              loading={loading}
              error={error}
              onSwitchToRegister={() => handleStudentModeChange('register')}
            />
          ) : studentMode === 'register' ? (
            <StudentRegisterForm
              onRegister={handleStep1Register}
              loading={loading}
              error={error}
              onSwitchToLogin={() => handleStudentModeChange('login')}
            />
          ) : (
            // Step 2: Basic Info page
            <BasicInfoForm
              onSubmit={handleStep2BasicInfo}
              loading={loading}
              error={error}
            />
          )
        ) : (
          <TeacherLoginForm
            onLogin={onTeacherLogin}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}
