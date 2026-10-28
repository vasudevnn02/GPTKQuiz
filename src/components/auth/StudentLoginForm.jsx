import React, { useState } from 'react';
import { UserIcon, LockIcon } from '../icons/SvgIcons.jsx';
import { glassBtn } from '../../glass.js';

export default function StudentLoginForm({ onLogin, loading, error, onSwitchToRegister }) {
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rollNo || !name || !password) return;
    onLogin(rollNo, name, password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '7px' }}>
          Register Number
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
            placeholder="Register Number"
            style={{ width: '100%', paddingLeft: '44px' }}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '7px' }}>
          Student Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '7px' }}>
          Password
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

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '10px', color: '#fca5a5', fontSize: '13px', fontWeight: 600 }}>
          {error}
        </div>
      )}

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
        {loading ? 'Authenticating...' : 'Enter Student Portal'}
      </button>
    </form>
  );
}
