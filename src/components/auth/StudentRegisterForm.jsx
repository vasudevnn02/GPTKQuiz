import React, { useState } from 'react';
import { UserIcon, LockIcon } from '../icons/SvgIcons.jsx';
import { glassBtn } from '../../glass.js';

export default function StudentRegisterForm({ onRegister, loading, error, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [localErr, setLocalErr] = useState('');

  const showConfirm = Boolean(password.length > 0 || passwordFocused);
  const isMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

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

      {/* Create Password */}
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '7px' }}>
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
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min. 4 characters)"
            style={{ width: '100%', paddingLeft: '44px' }}
          />
        </div>
      </div>

      {/* Re-enter Password (Reveals dynamically when user clicks or types password) */}
      <div style={{
        maxHeight: showConfirm ? '110px' : '0px',
        opacity: showConfirm ? 1 : 0,
        transform: showConfirm ? 'translateY(0)' : 'translateY(-6px)',
        overflow: 'hidden',
        transition: 'all 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: showConfirm ? 'auto' : 'none',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
          <label style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
            Re-enter Password
          </label>
          {confirmPassword.length > 0 && (
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              color: isMatch ? '#4ade80' : 'rgba(255, 255, 255, 0.55)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              {isMatch ? '✓ Passwords match' : 'Must match'}
            </span>
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '14px', top: '13px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LockIcon size={16} color={isMatch ? '#4ade80' : '#38bdf8'} />
          </span>
          <input
            type="password"
            required={showConfirm}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            style={{
              width: '100%',
              paddingLeft: '44px',
              borderColor: isMatch ? 'rgba(74, 222, 128, 0.6)' : undefined,
              boxShadow: isMatch ? '0 0 12px rgba(74, 222, 128, 0.25)' : undefined
            }}
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
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          color: '#ffffff',
          fontWeight: 800,
          padding: '13px',
          borderRadius: '14px',
          fontSize: '15px',
          marginTop: '8px',
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
