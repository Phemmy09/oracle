'use client';

import { useState, useEffect, useCallback } from 'react';
import PasswordGate from './components/PasswordGate';
import TodoPanel from './components/TodoPanel';
import NotesPanel from './components/NotesPanel';

// ===== STATUS BAR =====
function StatusBar({ status, briefingDate, onMenuToggle }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="status-bar">
      <div className="status-bar__left">
        <button className="mobile-menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">☰</button>
        <span className="status-bar__logo">◆ ORACLE</span>
        <span className="hide-mobile" style={{ color: 'var(--text-muted)' }}>v1.0</span>
      </div>
      <div className="status-bar__center hide-mobile">
        <span style={{ color: 'var(--text-secondary)' }}>{briefingDate ? `BRIEFING // ${briefingDate}` : 'AWAITING INITIALIZATION'}</span>
      </div>
      <div className="status-bar__right">
        <div className="status-indicator">
          <div className={`status-dot ${status === 'loading' ? 'status-dot--loading' : status === 'error' ? 'status-dot--error' : ''}`} />
          <span className="hide-mobile-sm">{status === 'loading' ? 'GENERATING' : status === 'error' ? 'ERROR' : 'SYSTEM ACTIVE'}</span>
        </div>
        <span style={{ color: 'var(--accent-cyan)' }}>{time}</span>
      </div>
    </div>
  );
}

// ===== SIDEBAR =====
function Sidebar({ activeSection, onNavigate, counts, isOpen, onClose }) {
  const sections = [
    { id: 'jobs', icon: '💼', label: 'Job Matrix', count: counts.jobs },
    { id: 'scholarships', icon: '🎓', label: 'Scholarships', count: counts.scholarships },
    { id: 'opportunities', icon: '🌍', label: 'Elite Opps', count: counts.opportunities },
    { id: 'intel', icon: '🔐', label: 'Inner Brief', count: counts.intel },
    { id: 'economy', icon: '🎯', label: 'Economy of Mind' },
    { id: 'archetypes', icon: '👤', label: 'Archetypes' },
    { id: 'todos', icon: '✅', label: 'Todo Ops' },
    { id: 'notes', icon: '📓', label: 'Field Notes' },
  ];

  const handleNav = (s) => {
    onNavigate(s);
    onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <nav className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__section-label">Intelligence Panels</div>
        {sections.map(s => (
          <a key={s.id} className={`sidebar__item ${activeSection === s.id ? 'sidebar__item--active' : ''}`}
            onClick={() => handleNav(s.id)} href={`#${s.id}`}>
            <span className="sidebar__item-icon">{s.icon}</span><span>{s.label}</span>
            {s.count != null && <span className="sidebar__item-count">{s.count}</span>}
          </a>
        ))}
        <div className="sidebar__section-label" style={{ marginTop: 20 }}>System</div>
        <a className="sidebar__item" onClick={() => handleNav('refresh')} href="#">
          <span className="sidebar__item-icon">🔄</span><span>Regenerate</span>
        </a>
      </nav>
    </>
  );
}

// ===== LOADING OVERLAY =====
function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loading-text">Extracting Intelligence</div>
      <div className="loading-sub">Scanning global data sources...</div>
      <div className="loading-bar"><div className="loading-bar__fill" /></div>
    </div>
  );
}

// ===== MAIN DASHBOARD =====
function Dashboard() {
  const [data, setData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [activeSection, setActiveSection] = useState('jobs');

  const fetchBriefing = useCallback(async (force = false) => {
    if (!force) {
      const cached = localStorage.getItem('oracle_briefing');
      if (cached) {
        const parsed = JSON.parse(cached);
        const cachedDate = new Date(parsed.generatedAt).toDateString();
        if (cachedDate === new Date().toDateString()) { setData(parsed); setStatus('ready'); return; }
      }
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/generate');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const briefing = await res.json();
      setData(briefing);
      localStorage.setItem('oracle_briefing', JSON.stringify(briefing));
      setStatus('ready');
    } catch (e) { console.error('[ORACLE]', e); setStatus('error'); }
  }, []);

  useEffect(() => { fetchBriefing(); }, [fetchBriefing]);

  const handleNavigate = (s) => {
    if (s === 'refresh') { fetchBriefing(true); return; }
    setActiveSection(s);
    document.getElementById(s)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const briefingDate = data?.generatedAt ? new Date(data.generatedAt).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : null;

  const scholarships = data?.scholarships?.filter(s => {
    const t = s.title.toLowerCase();
    return t.includes('scholarship') || t.includes('fellowship') || t.includes('funded') || t.includes('phd') || t.includes('master');
  }) || [];
  const eliteOpps = data?.scholarships?.filter(s => !scholarships.includes(s)) || [];

  const counts = { jobs: data?.jobs?.length || 0, scholarships: scholarships.length, opportunities: eliteOpps.length, intel: data?.intel?.length || 0 };

  return (
    <>
      <StatusBar status={status} briefingDate={briefingDate} onMenuToggle={() => setMenuOpen(o => !o)} />
      {status === 'loading' && <LoadingOverlay />}
      <div className="app-container">
        <Sidebar activeSection={activeSection} onNavigate={handleNavigate} counts={counts} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="main-content">

          {/* JOBS */}
          <div className="panel fade-in" id="jobs">
            <div className="panel__header">
              <div className="panel__title"><span className="panel__title-icon">💼</span> Opportunity Matrix — Jobs</div>
              <span className="panel__badge panel__badge--live">{counts.jobs} FOUND</span>
            </div>
            <div className="panel__body">
              {!data?.jobs?.length ? (
                <div className="empty-state"><div className="empty-state__icon">📡</div><div className="empty-state__text">{status === 'loading' ? 'Scanning...' : 'No jobs found. Regenerate.'}</div></div>
              ) : (
                <div className="opportunity-list">
                  {data.jobs.map((job, i) => (
                    <div className="opportunity-item" key={i}>
                      <div className="opportunity-item__info">
                        <a className="opportunity-item__title" href={job.link} target="_blank" rel="noopener noreferrer">{job.title}</a>
                        <div className="opportunity-item__meta"><span>{job.company}</span><span>📍 {job.location}</span>{job.salary && <span>💰 {job.salary}</span>}</div>
                      </div>
                      <span className={`opportunity-item__tag ${job.type === 'remote' ? 'opportunity-item__tag--remote' : 'opportunity-item__tag--visa'}`}>{job.type === 'remote' ? '⊛ REMOTE' : '✈ VISA'}</span>
                      <a className="opportunity-item__link" href={job.link} target="_blank" rel="noopener noreferrer">Apply →</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SCHOLARSHIPS */}
          <div className="panel fade-in fade-in-delay-1" id="scholarships">
            <div className="panel__header">
              <div className="panel__title"><span className="panel__title-icon">🎓</span> Scholarships & Fellowships</div>
              <span className="panel__badge panel__badge--live">{scholarships.length} FOUND</span>
            </div>
            <div className="panel__body">
              {!scholarships.length ? (
                <div className="empty-state"><div className="empty-state__icon">🎓</div><div className="empty-state__text">Scanning scholarship databases...</div></div>
              ) : (
                <div className="opportunity-list">
                  {scholarships.map((s, i) => (
                    <div className="opportunity-item" key={i}>
                      <div className="opportunity-item__info">
                        <a className="opportunity-item__title" href={s.link} target="_blank" rel="noopener noreferrer">{s.title}</a>
                        <div className="opportunity-item__meta"><span>📌 {s.source}</span>{s.date && <span>📅 {new Date(s.date).toLocaleDateString()}</span>}</div>
                        {s.summary && <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4 }}>{s.summary}</p>}
                      </div>
                      <span className="opportunity-item__tag opportunity-item__tag--funded">FUNDED</span>
                      <a className="opportunity-item__link" href={s.link} target="_blank" rel="noopener noreferrer">Apply →</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ELITE OPPORTUNITIES */}
          <div className="panel fade-in fade-in-delay-2" id="opportunities">
            <div className="panel__header">
              <div className="panel__title"><span className="panel__title-icon">🌍</span> Elite Opportunities — Young Africans</div>
              <span className="panel__badge panel__badge--classified">CLASSIFIED</span>
            </div>
            <div className="panel__body">
              {!eliteOpps.length ? (
                <div className="empty-state"><div className="empty-state__icon">🌍</div><div className="empty-state__text">Scanning hidden channels...</div></div>
              ) : (
                <div className="opportunity-list">
                  {eliteOpps.map((o, i) => (
                    <div className="opportunity-item" key={i}>
                      <div className="opportunity-item__info">
                        <a className="opportunity-item__title" href={o.link} target="_blank" rel="noopener noreferrer">{o.title}</a>
                        <div className="opportunity-item__meta"><span>🏛️ {o.source}</span><span>🎯 {o.focus}</span></div>
                        {o.summary && <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4 }}>{o.summary}</p>}
                      </div>
                      <a className="opportunity-item__link" href={o.link} target="_blank" rel="noopener noreferrer">View →</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* INNER BRIEF */}
          <div className="panel fade-in fade-in-delay-3" id="intel">
            <div className="panel__header">
              <div className="panel__title"><span className="panel__title-icon">🔐</span> Inner Brief — Signal Intel</div>
              <span className="panel__badge panel__badge--classified">CLASSIFIED</span>
            </div>
            <div className="panel__body">
              {!data?.intel?.length ? (
                <div className="empty-state"><div className="empty-state__icon">📡</div><div className="empty-state__text">Intercepting signals...</div></div>
              ) : data.intel.map((item, i) => (
                <div className={`intel-item ${item.urgency === 'high' ? 'intel-item--urgent' : item.urgency === 'medium' ? 'intel-item--action' : ''}`} key={i}>
                  <div className={`intel-item__urgency intel-item__urgency--${item.urgency}`}>
                    {item.urgency === 'high' ? '⚠ HIGH PRIORITY' : item.urgency === 'medium' ? '◆ MEDIUM' : '○ STANDARD'} — {item.source}
                  </div>
                  <div className="intel-item__title">{item.title}</div>
                  <div className="intel-item__summary">{item.summary}</div>
                  <a className="intel-item__link" href={item.link} target="_blank" rel="noopener noreferrer">
                    SOURCE → {(() => { try { return new URL(item.link).hostname; } catch { return 'link'; } })()}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* ECONOMY OF MIND */}
          <div className="panel fade-in fade-in-delay-4" id="economy">
            <div className="panel__header">
              <div className="panel__title"><span className="panel__title-icon">🎯</span> Economy of Mind</div>
              {data?.isMonday && <span className="panel__badge panel__badge--weekly">📚 BOOK DAY</span>}
            </div>
            <div className="panel__body">
              {data?.video ? (
                <div className="media-card">
                  <img className="media-card__thumbnail" src={data.video.thumbnail} alt={data.video.title} />
                  <div className="media-card__content">
                    <div className="media-card__label">Daily Video Intelligence</div>
                    <div className="media-card__title"><a href={data.video.link} target="_blank" rel="noopener noreferrer">{data.video.title}</a></div>
                    <div className="media-card__author">📺 {data.video.channel}</div>
                    <a className="opportunity-item__link" href={data.video.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 8 }}>Watch →</a>
                  </div>
                </div>
              ) : <div className="empty-state" style={{ padding: 20 }}><div className="empty-state__text">Video feed unavailable</div></div>}
              {data?.book && (
                <div className="media-card">
                  <img className="media-card__thumbnail" src={data.book.cover} alt={data.book.title} style={{ width: 120, minWidth: 120, height: 'auto', objectFit: 'contain' }} />
                  <div className="media-card__content">
                    <div className="media-card__label">{data?.isMonday ? "📚 This Week's Reading Directive" : '📚 Weekly Reading'}</div>
                    <div className="media-card__title"><a href={data.book.link} target="_blank" rel="noopener noreferrer">{data.book.title}</a></div>
                    <div className="media-card__author">by {data.book.author}</div>
                    <div className="media-card__summary">{data.book.summary}</div>
                    <a className="opportunity-item__link" href={data.book.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 8 }}>Get Book →</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ARCHETYPES */}
          <div className="panel fade-in fade-in-delay-5" id="archetypes">
            <div className="panel__header">
              <div className="panel__title"><span className="panel__title-icon">👤</span> Archetypal Modeling</div>
            </div>
            <div className="panel__body">
              {data?.rainmaker && (
                <div className="profile-card">
                  <div className="media-card__label">The Rainmaker Profile</div>
                  <div className="profile-card__name">{data.rainmaker.name}</div>
                  <div className="profile-card__era">{data.rainmaker.era}</div>
                  <div className="profile-card__analysis">{data.rainmaker.analysis}</div>
                </div>
              )}
              {data?.nightSchool && (
                <div className="profile-card">
                  <div className="media-card__label">Night School Resonance</div>
                  <div className="profile-card__name">{data.nightSchool.name}</div>
                  <div className="profile-card__analysis">{data.nightSchool.analysis}</div>
                </div>
              )}
            </div>
          </div>

          {/* TODO */}
          <TodoPanel />

          {/* NOTES */}
          <NotesPanel />

          {/* FOOTER */}
          <div style={{ textAlign: 'center', padding: '30px 0', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
            ORACLE v1.0 — SOVEREIGN INTELLIGENCE ENGINE — {new Date().getFullYear()}
            {data?.fetchTimeMs && <span> — GENERATED IN {data.fetchTimeMs}ms</span>}
          </div>
        </main>
      </div>
    </>
  );
}

// ===== ROOT EXPORT WITH PASSWORD GATE =====
export default function OraclePage() {
  return (
    <PasswordGate>
      <Dashboard />
    </PasswordGate>
  );
}
