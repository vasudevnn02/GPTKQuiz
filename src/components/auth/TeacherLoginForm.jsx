import React, { useState } from 'react';
import { ShieldIcon, LockIcon } from '../icons/SvgIcons.jsx';

export default function TeacherLoginForm({ onLogin, loading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleFillAdmin = () => {
    setEmail('admin@gptkquiz.edu');
    setPassword('CSE@2026');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#aaaaaa', marginBottom: '6px' }}>
          Teacher / Admin Email
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '11px', color: '#717171' }}>
            <ShieldIcon size={18} />
          </span>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@gptkquiz.edu"
            style={{ width: '100%', paddingLeft: '38px' }}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#aaaaaa', marginBottom: '6px' }}>
          Master Passcode
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '11px', color: '#717171' }}>
            <LockIcon size={18} />
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="CSE@2026"
            style={{ width: '100%', paddingLeft: '38px' }}
          />
        </div>
      </div>

      {error && (
        <div style={{ background: '#3b1212', border: '1px solid #7f1d1d', borderRadius: '6px', padding: '10px', color: '#fca5a5', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          background: '#3ea6ff',
          color: '#0f0f0f',
          fontWeight: 700,
          padding: '12px',
          borderRadius: '8px',
          fontSize: '14px',
          marginTop: '6px',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Verifying Admin...' : 'Access Teacher Studio'}
      </button>

      <button
        type="button"
        onClick={handleFillAdmin}
        style={{
          background: '#272727',
          color: '#aaaaaa',
          fontSize: '12px',
          padding: '8px',
          borderRadius: '6px',
          fontWeight: 600
        }}
      >
        ⚡ Pre-fill Admin: admin@gptkquiz.edu / CSE@2026
      </button>
    </form>
  );
}
