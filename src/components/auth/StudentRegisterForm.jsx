import React, { useState } from 'react';
import { UserIcon, LockIcon } from '../icons/SvgIcons.jsx';
import { glassBtn } from '../../glass.js';

export default function StudentRegisterForm({ onRegister, loading, error, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localErr, setLocalErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalErr('');
    if (!name.trim() || !rollNo.trim() || !password || !confirmPassword) {
      setLocalErr('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setLocalErr('Passwords do not match. Please re-enter your password.');
      return;
    }
    if (password.length < 4) {
      setLocalErr('Password must be at least 4 characters.');
      return;
    }
    onRegister(rollNo, name, password, confirmPassword);
  };

  const displayError = localErr || error;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Student Name */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '7px' }}>
          Candidate Full Name
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '14px', top: '13px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserIcon size={16} color="#38bdf8" />
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            style={{ width: '100%', paddingLeft: '44px' }}
          />
        </div>
      </div>

      {/* Register Number */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '7px' }}>
          Register Number / Roll No
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '14px', top: '13px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserIcon size={16} color="#38bdf8" />
          </span>
          <input
            type="text"
            required
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value.toUpperCase())}
            placeholder="Register Number (e.g. 197CS...)"
            style={{ width: '100%', paddingLeft: '44px' }}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '7px' }}>
          Create Password
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '14px', top: '13px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LockIcon size={16} color="#38bdf8" />
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: '100%', paddingLeft: '44px' }}
          />
        </div>
      </div>

      {/* Re-enter Password */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '7px' }}>
          Re-enter Password
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '14px', top: '13px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LockIcon size={16} color="#38bdf8" />
          </span>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            style={{ width: '100%', paddingLeft: '44px' }}
          />
        </div>
      </div>

      {/* Error Banner */}
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          color: '#ffffff',
          fontWeight: 800,
          padding: '13px',
          borderRadius: '14px',
          fontSize: '15px',
          marginTop: '8px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.45)',
          opacity: loading ? 0.7 : 1,
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        {loading ? 'Registering...' : 'Register & Enter Portal'}
      </button>
    </form>
  );
}
