import React, { useState } from 'react';
import StudentLoginForm from './StudentLoginForm.jsx';
import StudentRegisterForm from './StudentRegisterForm.jsx';
import TeacherLoginForm from './TeacherLoginForm.jsx';
import { glassDeep } from '../../glass.js';

export default function AuthCard({ onStudentLogin, onStudentRegister, onTeacherLogin, loading, error, setError }) {
  const [role, setRole] = useState('student'); // 'student' | 'teacher'
  const [studentMode, setStudentMode] = useState('login'); // 'login' | 'register'

  const handleRoleChange = (newRole) => {
    setError('');
    setRole(newRole);
  };

  const handleStudentModeChange = (mode) => {
    setError('');
    setStudentMode(mode);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        borderRadius: '28px',
        padding: '38px 32px',
      }}>
        {/* Portal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', color: '#ffffff', margin: 0, fontFamily: 'var(--font-ny)' }}>
            GPTK Quiz
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '4px', fontFamily: 'var(--font-ny)', fontStyle: 'italic' }}>
            Government Polytechnic, Kadur-197
          </p>
        </div>

        {/* Primary Role Switcher: Student vs Teacher */}
        <div style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.55)',
          borderRadius: '14px',
          padding: '4px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)'
        }}>
          <button
            onClick={() => handleRoleChange('student')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 800,
              background: role === 'student' ? '#ffffff' : 'transparent',
              color: role === 'student' ? '#000000' : 'rgba(255, 255, 255, 0.85)',
              boxShadow: role === 'student' ? '0 4px 14px rgba(0,0,0,0.45)' : 'none',
              transition: 'all 0.15s ease',
              cursor: 'pointer'
            }}
          >
            Student Portal
          </button>
          <button
            onClick={() => handleRoleChange('teacher')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 800,
              background: role === 'teacher' ? '#ffffff' : 'transparent',
              color: role === 'teacher' ? '#000000' : 'rgba(255, 255, 255, 0.85)',
              boxShadow: role === 'teacher' ? '0 4px 14px rgba(0,0,0,0.45)' : 'none',
              transition: 'all 0.15s ease',
              cursor: 'pointer'
            }}
          >
            Teacher Studio
          </button>
        </div>

        {/* Student Sub-segmented Switcher: Sign In vs Register (Ultra Bright & High Contrast) */}
        {role === 'student' && (
          <div style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '13px',
            padding: '4px',
            marginBottom: '22px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)'
          }}>
            <button
              onClick={() => handleStudentModeChange('login')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '9px',
                fontSize: '12px',
                fontWeight: 800,
                background: studentMode === 'login' ? '#38bdf8' : 'transparent',
                color: studentMode === 'login' ? '#021024' : '#ffffff',
                boxShadow: studentMode === 'login' ? '0 2px 10px rgba(56, 189, 248, 0.45)' : 'none',
                transition: 'all 0.15s ease',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => handleStudentModeChange('register')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '9px',
                fontSize: '12px',
                fontWeight: 800,
                background: studentMode === 'register' ? '#38bdf8' : 'transparent',
                color: studentMode === 'register' ? '#021024' : '#ffffff',
                boxShadow: studentMode === 'register' ? '0 2px 10px rgba(56, 189, 248, 0.45)' : 'none',
                transition: 'all 0.15s ease',
                cursor: 'pointer'
              }}
            >
              Register (New Candidate)
            </button>
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
          ) : (
            <StudentRegisterForm
              onRegister={onStudentRegister}
              loading={loading}
              error={error}
              onSwitchToLogin={() => handleStudentModeChange('login')}
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
