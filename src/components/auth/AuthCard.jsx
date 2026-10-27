import React, { useState } from 'react';
import StudentLoginForm from './StudentLoginForm.jsx';
import TeacherLoginForm from './TeacherLoginForm.jsx';
import { glassDeep } from '../../glass.js';

export default function AuthCard({ onStudentLogin, onTeacherLogin, loading, error, setError }) {
  const [role, setRole] = useState('student');

  const handleRoleChange = (newRole) => {
    setError('');
    setRole(newRole);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{
        maxWidth: '430px',
        width: '100%',
        ...glassDeep,
        borderRadius: '26px',
        padding: '38px 32px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', color: '#0f172a', margin: 0, fontFamily: 'var(--font-ny)' }}>
            GPTK Quiz
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(30, 41, 59, 0.65)', marginTop: '6px', fontFamily: 'var(--font-ny)', fontStyle: 'italic' }}>
            Proctored Examination Portal
          </p>
        </div>

        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.04)', borderRadius: '14px', padding: '4px', marginBottom: '24px', border: '1px solid rgba(255, 255, 255, 0.8)' }}>
          <button
            onClick={() => handleRoleChange('student')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              background: role === 'student' ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
              color: role === 'student' ? '#0f172a' : 'rgba(30, 41, 59, 0.6)',
              boxShadow: role === 'student' ? '0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)' : 'none',
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
              background: role === 'teacher' ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
              color: role === 'teacher' ? '#0f172a' : 'rgba(30, 41, 59, 0.6)',
              boxShadow: role === 'teacher' ? '0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)' : 'none',
            }}
          >
            Teacher Studio
          </button>
        </div>

        {role === 'student' ? (
          <StudentLoginForm onLogin={onStudentLogin} loading={loading} error={error} />
        ) : (
          <TeacherLoginForm onLogin={onTeacherLogin} loading={loading} error={error} />
        )}
      </div>
    </div>
  );
}
