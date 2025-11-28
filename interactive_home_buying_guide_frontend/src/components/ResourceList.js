import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ResourceList shows a list of helpful links.
 */
export default function ResourceList({ resources, loading }) {
  return (
    <section className="card" style={{ padding: 16 }}>
      <div className="section-title">Resources</div>
      {loading ? (
        <div style={{ display: 'grid', gap: 8 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ height: 14, background: '#e5e7eb', borderRadius: 6, width: `${70 - i * 10}%` }} />
          ))}
        </div>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {resources.map(r => (
            <li key={r.id} style={{ marginBottom: 8 }}>
              <a className="link" href={r.url} target="_blank" rel="noopener noreferrer">
                {r.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
