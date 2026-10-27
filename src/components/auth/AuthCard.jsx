import React, { useState } from 'react';
import StudentLoginForm from './StudentLoginForm.jsx';
import TeacherLoginForm from './TeacherLoginForm.jsx';
import { PlayIcon } from '../icons/SvgIcons.jsx';

export default function AuthCard({ onStudentLogin, onTeacherLogin, loading, error, setError }) {
  const [role, setRole] = useState('student');

  const handleRoleChange = (newRole) => {
    setError('');
    setRole(newRole);
  };

  return (
    <div style={{ maxWidth: '440px', width: '92%', margin: '60px auto', background: '#212121', borderRadius: '12px', border: '1px solid #272727', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', justifyContent: 'center' }}>
        <div style={{ width: '38px', height: '26px', background: '#ff0000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <PlayIcon size={14} />
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', color: '#f1f1f1' }}>
          GPTK<span style={{ color: '#ff0000' }}>Quiz</span>
        </h1>
      </div>

      <div style={{ display: 'flex', background: '#121212', borderRadius: '8px', padding: '4px', marginBottom: '24px', border: '1px solid #272727' }}>
        <button
          onClick={() => handleRoleChange('student')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
            background: role === 'student' ? '#272727' : 'transparent',
            color: role === 'student' ? '#f1f1f1' : '#aaaaaa'
          }}
        >
          Student Portal
        </button>
        <button
          onClick={() => handleRoleChange('teacher')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
            background: role === 'teacher' ? '#272727' : 'transparent',
            color: role === 'teacher' ? '#f1f1f1' : '#aaaaaa'
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
  );
}
