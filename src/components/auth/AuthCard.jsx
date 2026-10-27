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
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '14px',
          padding: '4px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <button
            onClick={() => handleRoleChange('student')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              background: role === 'student' ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
              color: role === 'student' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
              boxShadow: role === 'student' ? '0 4px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)' : 'none',
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
              padding: '9px 12px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              background: role === 'teacher' ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
              color: role === 'teacher' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
              boxShadow: role === 'teacher' ? '0 4px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)' : 'none',
              transition: 'all 0.15s ease',
              cursor: 'pointer'
            }}
          >
            Teacher Studio
          </button>
        </div>

        {/* Student Sub-segmented Switcher: Sign In vs Register */}
        {role === 'student' && (
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '11px',
            padding: '3px',
            marginBottom: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <button
              onClick={() => handleStudentModeChange('login')}
              style={{
                flex: 1,
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                background: studentMode === 'login' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: studentMode === 'login' ? '#38bdf8' : 'rgba(255, 255, 255, 0.65)',
                border: studentMode === 'login' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
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
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                background: studentMode === 'register' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: studentMode === 'register' ? '#38bdf8' : 'rgba(255, 255, 255, 0.65)',
                border: studentMode === 'register' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
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
