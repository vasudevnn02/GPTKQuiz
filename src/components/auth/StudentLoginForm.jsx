import React, { useState } from 'react';
import { UserIcon, LockIcon } from '../icons/SvgIcons.jsx';

export default function StudentLoginForm({ onLogin, loading, error }) {
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rollNo || !name || !password) return;
    onLogin(rollNo, name, password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px' }}>
          Register Number
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'rgba(255, 255, 255, 0.4)' }}>
            <UserIcon size={16} />
          </span>
          <input
            type="text"
            required
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value.toUpperCase())}
            placeholder="Register Number"
            style={{ width: '100%', paddingLeft: '38px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#ffffff' }}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px' }}>
          Student Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          style={{ width: '100%', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#ffffff' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '6px' }}>
          Password
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'rgba(255, 255, 255, 0.4)' }}>
            <LockIcon size={16} />
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: '100%', paddingLeft: '38px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#ffffff' }}
          />
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '8px', padding: '10px', color: '#fca5a5', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          color: '#ffffff',
          fontWeight: 700,
          padding: '12px',
          borderRadius: '10px',
          fontSize: '14px',
          marginTop: '6px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 15px rgba(37, 99, 235, 0.35)',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Authenticating...' : 'Enter Student Portal'}
      </button>
    </form>
  );
}
