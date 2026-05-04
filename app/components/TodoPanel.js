'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function TodoPanel() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadTodos(); }, []);

  async function loadTodos() {
    setLoading(true);
    if (supabase) {
      const { data } = await supabase.from('todos').select('*').order('created_at', { ascending: false });
      setTodos(data || []);
    } else {
      const stored = localStorage.getItem('oracle_todos');
      setTodos(stored ? JSON.parse(stored) : []);
    }
    setLoading(false);
  }

  async function save(updated) {
    setTodos(updated);
    if (!supabase) localStorage.setItem('oracle_todos', JSON.stringify(updated));
  }

  async function addTodo() {
    if (!input.trim()) return;
    if (supabase) {
      const { data } = await supabase.from('todos').insert({ text: input.trim(), done: false }).select().single();
      if (data) setTodos(prev => [data, ...prev]);
    } else {
      save([{ id: Date.now(), text: input.trim(), done: false, created_at: new Date().toISOString() }, ...todos]);
    }
    setInput('');
  }

  async function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    if (supabase) {
      await supabase.from('todos').update({ done: !todo.done, updated_at: new Date().toISOString() }).eq('id', id);
    }
    save(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  async function deleteTodo(id) {
    if (supabase) await supabase.from('todos').delete().eq('id', id);
    save(todos.filter(t => t.id !== id));
  }

  const pending = todos.filter(t => !t.done).length;

  return (
    <div className="panel" id="todos">
      <div className="panel__header">
        <div className="panel__title"><span className="panel__title-icon">✅</span> Todo Ops</div>
        <span className="panel__badge panel__badge--live">{pending} PENDING</span>
      </div>
      <div className="panel__body">
        <div className="todo-input-row">
          <input className="todo-input" placeholder="Add new directive..." value={input}
            onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTodo()} />
          <button className="todo-btn" onClick={addTodo}>Add</button>
        </div>
        <div className="todo-list">
          {loading && <div className="empty-state"><div className="empty-state__text">Loading...</div></div>}
          {!loading && todos.length === 0 && (
            <div className="empty-state">
              <div className="empty-state__icon">📋</div>
              <div className="empty-state__text">No directives. Add your first task above.</div>
            </div>
          )}
          {todos.map(todo => (
            <div className="todo-item" key={todo.id}>
              <div className={`todo-item__checkbox ${todo.done ? 'todo-item__checkbox--checked' : ''}`}
                onClick={() => toggleTodo(todo.id)}>{todo.done ? '✓' : ''}</div>
              <span className={`todo-item__text ${todo.done ? 'todo-item__text--done' : ''}`}>{todo.text}</span>
              <button className="todo-item__delete" onClick={() => deleteTodo(todo.id)}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
