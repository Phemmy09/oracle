'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const CATEGORIES = [
  { id: 'learning', label: '📖 Learning', color: 'var(--accent-cyan)' },
  { id: 'job-done', label: '✅ Job Done', color: 'var(--accent-green)' },
  { id: 'reflection', label: '💭 Reflection', color: 'var(--accent-amber)' },
  { id: 'strategy', label: '♟️ Strategy', color: 'var(--accent-purple)' },
  { id: 'general', label: '📝 General', color: 'var(--text-secondary)' },
];

export default function NotesPanel() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('learning');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadNotes(); }, []);

  async function loadNotes() {
    setLoading(true);
    if (supabase) {
      const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false }).limit(50);
      setNotes(data || []);
    } else {
      const stored = localStorage.getItem('oracle_notes');
      setNotes(stored ? JSON.parse(stored) : []);
    }
    setLoading(false);
  }

  async function addNote() {
    if (!input.trim()) return;
    const note = { content: input.trim(), category, created_at: new Date().toISOString() };
    if (supabase) {
      const { data } = await supabase.from('notes').insert(note).select().single();
      if (data) setNotes(prev => [data, ...prev]);
    } else {
      const withId = { ...note, id: Date.now() };
      const updated = [withId, ...notes];
      setNotes(updated);
      localStorage.setItem('oracle_notes', JSON.stringify(updated));
    }
    setInput('');
  }

  async function deleteNote(id) {
    if (supabase) {
      await supabase.from('notes').delete().eq('id', id);
    }
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    if (!supabase) localStorage.setItem('oracle_notes', JSON.stringify(updated));
  }

  const catInfo = (id) => CATEGORIES.find(c => c.id === id) || CATEGORIES[4];

  return (
    <div className="panel" id="notes">
      <div className="panel__header">
        <div className="panel__title"><span className="panel__title-icon">📓</span> Field Notes</div>
        <span className="panel__badge panel__badge--live">{notes.length} ENTRIES</span>
      </div>
      <div className="panel__body">
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 10px',
              border: `1px solid ${category === c.id ? c.color : 'var(--border-dim)'}`,
              background: category === c.id ? `${c.color}15` : 'transparent',
              color: category === c.id ? c.color : 'var(--text-muted)',
              borderRadius: 2, cursor: 'pointer', letterSpacing: '0.05em',
            }}>{c.label}</button>
          ))}
        </div>
        <div className="todo-input-row">
          <textarea
            className="todo-input"
            placeholder="Log your insight, learning, or completed work..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote(); } }}
            style={{ minHeight: 60, resize: 'vertical' }}
          />
          <button className="todo-btn" onClick={addNote} style={{ alignSelf: 'flex-end' }}>Log</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
          {loading && <div className="empty-state"><div className="empty-state__text">Loading notes...</div></div>}
          {!loading && notes.length === 0 && (
            <div className="empty-state">
              <div className="empty-state__icon">📓</div>
              <div className="empty-state__text">No entries yet. Start logging your intelligence.</div>
            </div>
          )}
          {notes.map(note => {
            const ci = catInfo(note.category);
            return (
              <div key={note.id} className="intel-item" style={{ borderLeftColor: ci.color }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: ci.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {ci.label} — {new Date(note.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <button className="todo-item__delete" style={{ opacity: 1 }} onClick={() => deleteNote(note.id)}>✕</button>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{note.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
