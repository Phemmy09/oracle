'use client';
import { useState, useEffect } from 'react';

const PASS = 'Femi1234$$';

export default function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('oracle_auth') === 'true') setAuthed(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASS) {
      sessionStorage.setItem('oracle_auth', 'true');
      setAuthed(true);
    } else {
      setError('ACCESS DENIED');
      setTimeout(() => setError(''), 2000);
    }
  };

  if (authed) return children;

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: 'var(--bg-void)',
      fontFamily: 'var(--font-mono)',
    }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>◆</div>
      <div style={{ color: 'var(--accent-amber)', fontSize: 18, letterSpacing: '0.3em', marginBottom: 8 }}>ORACLE</div>
      <div style={{ color: 'var(--text-muted)', fontSize: 10, letterSpacing: '0.2em', marginBottom: 40 }}>SOVEREIGN INTELLIGENCE ENGINE</div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: 300 }}>
        <input
          type="password"
          className="todo-input"
          placeholder="ENTER ACCESS CODE"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
          style={{ textAlign: 'center', letterSpacing: '0.15em' }}
        />
        <button className="todo-btn" type="submit" style={{ width: '100%' }}>Authenticate</button>
        {error && <div style={{ color: 'var(--accent-red)', fontSize: 11, letterSpacing: '0.1em' }}>{error}</div>}
      </form>
    </div>
  );
}
