import React, { useState } from 'react';
import { UserIcon, IdCardIcon, LockIcon } from '../icons/SvgIcons.jsx';

const COURSES = [
  { id: 'CSE', label: 'Computer Science & Engineering' },
  { id: 'ECE', label: 'Electronics & Communication Engineering' },
  { id: 'EEE', label: 'Electrical & Electronics Engineering' },
  { id: 'ME',  label: 'Mechanical Engineering' },
];

export default function BasicInfoForm({ onSubmit, loading, error }) {
  const [name, setName]     = useState('');
  const [rollNo, setRollNo] = useState('');
  const [course, setCourse] = useState('CSE');
  const [localErr, setLocalErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalErr('');
    if (!name.trim()) { setLocalErr('Please enter your full name.'); return; }
    if (!rollNo.trim()) { setLocalErr('Please enter your register number.'); return; }
    onSubmit(name.trim(), rollNo.trim().toUpperCase(), course);
  };

  const displayError = localErr || error;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

      {/* Step indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '2px'
      }}>
        <div style={{
          width: '24px', height: '24px',
          borderRadius: '50%',
          background: '#38bdf8',
          color: '#020617',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', fontWeight: 800, flexShrink: 0
        }}>2</div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>Basic Information</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>Complete your student profile</div>
        </div>
      </div>

      {/* Full Name */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '7px' }}>
          Candidate Full Name
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '14px', top: '13px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserIcon size={16} color="#38bdf8" />
          </span>
          <input
            type="text"
            required
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            style={{ width: '100%', paddingLeft: '44px' }}
          />
        </div>
      </div>

      {/* Register Number */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '7px' }}>
          Register Number / Roll No
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '14px', top: '13px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IdCardIcon size={16} color="#38bdf8" />
          </span>
          <input
            type="text"
            required
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value.toUpperCase())}
            placeholder="e.g. 197CS001"
            style={{ width: '100%', paddingLeft: '44px' }}
          />
        </div>
      </div>

      {/* Course Selection */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '10px' }}>
          Select Your Course
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {COURSES.map((c) => {
            const isActive = course === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCourse(c.id)}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: isActive ? 800 : 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: isActive ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.55)' : '1px solid rgba(255, 255, 255, 0.12)',
                  color: isActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {/* Radio dot */}
                <div style={{
                  width: '16px', height: '16px',
                  borderRadius: '50%',
                  border: isActive ? '2px solid #38bdf8' : '2px solid rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.15s ease'
                }}>
                  {isActive && (
                    <div style={{
                      width: '8px', height: '8px',
                      borderRadius: '50%',
                      background: '#38bdf8'
                    }} />
                  )}
                </div>
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error */}
      {displayError && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: '10px',
          padding: '10px 14px',
          color: '#fca5a5',
          fontSize: '12px',
          fontWeight: 600
        }}>
          {displayError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          color: '#ffffff',
          fontWeight: 800,
          padding: '13px',
          borderRadius: '14px',
          fontSize: '15px',
          marginTop: '4px',
          opacity: loading ? 0.7 : 1,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          width: '100%'
        }}
      >
        {loading ? 'Saving Profile...' : 'Enter Student Portal →'}
      </button>
    </form>
  );
}
