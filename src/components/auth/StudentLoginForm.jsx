import React, { useState } from 'react';
import { UserIcon, LockIcon, CheckCircleIcon } from '../icons/SvgIcons.jsx';

export default function StudentLoginForm({ onLogin, loading, error, onQuickFillDemo }) {
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rollNo || !name || !password) return;
    onLogin(rollNo, name, password);
  };

  const handleFillDemo = () => {
    setRollNo('197CS24045CS');
    setName('Vasu');
    setPassword('Vasu@290908');
    if (onQuickFillDemo) onQuickFillDemo();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#aaaaaa', marginBottom: '6px' }}>
          Register Number (Roll No)
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '11px', color: '#717171' }}>
            <UserIcon size={18} />
          </span>
          <input
            type="text"
            required
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value.toUpperCase())}
            placeholder="e.g. 197CS24045CS"
            style={{ width: '100%', paddingLeft: '38px', textTransform: 'uppercase' }}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#aaaaaa', marginBottom: '6px' }}>
          Student Full Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Vasu"
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#aaaaaa', marginBottom: '6px' }}>
          Authentication Password
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
            placeholder="e.g. Vasu@290908"
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
          background: '#ff0000',
          color: '#ffffff',
          fontWeight: 700,
          padding: '12px',
          borderRadius: '8px',
          fontSize: '14px',
          marginTop: '6px',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Authenticating Candidate...' : 'Enter Student Hub'}
      </button>

      <button
        type="button"
        onClick={handleFillDemo}
        style={{
          background: '#272727',
          color: '#3ea6ff',
          fontSize: '12px',
          padding: '8px',
          borderRadius: '6px',
          fontWeight: 600
        }}
      >
        ⚡ Pre-fill Demo Student: 197CS24045CS (Vasu)
      </button>
    </form>
  );
}
