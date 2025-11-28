import React from 'react';

/**
 * PUBLIC_INTERFACE
 * StepContent renders a step details view with description and checklist.
 */
export default function StepContent({ step, onToggle, toggling, error }) {
  if (!step) {
    return (
      <section className="card main" role="status" aria-live="polite" aria-busy="true">
        <div className="section-title">Loading...</div>
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ height: 18, width: '60%', background: '#e5e7eb', borderRadius: 6 }} />
          <div style={{ height: 14, width: '80%', background: '#e5e7eb', borderRadius: 6 }} />
          <div style={{ height: 14, width: '70%', background: '#e5e7eb', borderRadius: 6 }} />
        </div>
      </section>
    );
  }

  return (
    <section className="card main" aria-labelledby="step-title">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h2 id="step-title" className="section-title" style={{ margin: 0 }}>{step.title}</h2>
        <div style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>{step.completion}%</div>
      </div>
      <p style={{ marginTop: 0, opacity: 0.85 }}>{step.description}</p>

      <div className="section-title" style={{ marginTop: 16 }}>Checklist</div>
      <div className="checklist">
        {step.checklist.map(item => {
          const disabled = toggling[item.id] === true;
          return (
            <label key={item.id} className="check-item">
              <input
                type="checkbox"
                checked={!!item.completed}
                disabled={disabled}
                onChange={() => onToggle(step.id, item.id)}
                aria-label={`Mark "${item.label}" as ${item.completed ? 'incomplete' : 'complete'}`}
              />
              <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.label}
              </span>
            </label>
          );
        })}
      </div>
      {error ? (
        <div role="alert" style={{ marginTop: 12, color: 'var(--color-error)', fontWeight: 600 }}>
          {error}
        </div>
      ) : null}
    </section>
  );
}
