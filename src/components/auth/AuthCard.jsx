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
        borderRadius: '24px',
        padding: '36px 30px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
          <h1 style={{ fontSize: '27px', fontWeight: 700, letterSpacing: '-0.5px', color: '#ffffff', margin: 0, fontFamily: 'var(--font-ny)' }}>
            GPTK Quiz
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.45)', marginTop: '6px', fontFamily: 'var(--font-ny)', fontStyle: 'italic' }}>
            Proctored Examination Portal
          </p>
        </div>

        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '12px', padding: '4px', marginBottom: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => handleRoleChange('student')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '9px',
              fontSize: '13px',
              fontWeight: 600,
              background: role === 'student' ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
              color: role === 'student' ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
              boxShadow: role === 'student' ? 'inset 0 1px 0 rgba(255, 255, 255, 0.25)' : 'none',
            }}
          >
            Student Portal
          </button>
          <button
            onClick={() => handleRoleChange('teacher')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '9px',
              fontSize: '13px',
              fontWeight: 600,
              background: role === 'teacher' ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
              color: role === 'teacher' ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
              boxShadow: role === 'teacher' ? 'inset 0 1px 0 rgba(255, 255, 255, 0.25)' : 'none',
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
