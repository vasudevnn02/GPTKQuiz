import React, { useState } from 'react';
import StudentLoginForm from './StudentLoginForm.jsx';
import TeacherLoginForm from './TeacherLoginForm.jsx';

export default function AuthCard({ onStudentLogin, onTeacherLogin, loading, error, setError }) {
  const [role, setRole] = useState('student');

  const handleRoleChange = (newRole) => {
    setError('');
    setRole(newRole);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'radial-gradient(ellipse at 50% 20%, #1e2638 0%, #0c0e14 70%)' }}>
      <div style={{ maxWidth: '440px', width: '100%', background: 'rgba(24, 27, 36, 0.72)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '36px 32px', boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px', color: '#ffffff', margin: 0 }}>
            GPTK Quiz
          </h1>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '6px' }}>
            Proctored Examination Portal
          </p>
        </div>

        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.35)', borderRadius: '10px', padding: '4px', marginBottom: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => handleRoleChange('student')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              background: role === 'student' ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
              color: role === 'student' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'
            }}
          >
            Student Portal
          </button>
          <button
            onClick={() => handleRoleChange('teacher')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              background: role === 'teacher' ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
              color: role === 'teacher' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'
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
