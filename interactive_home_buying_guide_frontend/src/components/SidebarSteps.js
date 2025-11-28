import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * SidebarSteps lists the steps and highlights the active one.
 */
export default function SidebarSteps({ steps, loading }) {
  const location = useLocation();
  const activeId = location.pathname.startsWith('/steps/')
    ? location.pathname.replace('/steps/', '')
    : null;

  if (loading) {
    return (
      <div className="card sidebar" role="status" aria-live="polite" aria-busy="true">
        <div className="section-title">Steps</div>
        <div className="steps-list">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="step-item" style={{ opacity: 0.5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 999, background: '#d1d5db' }} />
              <div style={{ height: 14, width: '70%', background: '#e5e7eb', borderRadius: 6 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <nav className="card sidebar" aria-label="Guide steps">
      <div className="section-title">Steps</div>
      <div className="steps-list">
        {steps.map((s) => (
          <Link
            key={s.id}
            to={`/steps/${s.id}`}
            className={`step-item ${activeId === s.id ? 'active' : ''}`}
            aria-current={activeId === s.id ? 'page' : undefined}
          >
            <div
              aria-hidden="true"
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: s.completion >= 100 ? 'var(--color-secondary)' : 'var(--color-primary)',
              }}
            />
            <div style={{ display: 'grid', gap: 4 }}>
              <div style={{ fontWeight: 600 }}>{s.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{s.summary}</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700 }}>{s.completion}%</div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
