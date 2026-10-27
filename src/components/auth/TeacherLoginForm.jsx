import React, { useState } from 'react';
import { ShieldIcon, LockIcon } from '../icons/SvgIcons.jsx';
import { glassBtn } from '../../glass.js';

export default function TeacherLoginForm({ onLogin, loading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '7px' }}>
          Teacher Email / Admin ID
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '14px', top: '13px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldIcon size={16} color="#38bdf8" />
          </span>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email (admin@gptkquiz.edu)"
            style={{ width: '100%', paddingLeft: '44px' }}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '7px' }}>
          Passcode
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
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          border: '1px solid rgba(56, 189, 248, 0.6)',
          color: '#ffffff',
          fontWeight: 800,
          padding: '13px',
          borderRadius: '14px',
          fontSize: '15px',
          marginTop: '8px',
          boxShadow: '0 4px 20px rgba(2, 132, 199, 0.5)',
          opacity: loading ? 0.7 : 1,
          cursor: 'pointer'
        }}
      >
        {loading ? 'Verifying...' : 'Access Teacher Studio'}
      </button>
    </form>
  );
}
