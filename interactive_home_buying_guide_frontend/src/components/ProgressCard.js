import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ProgressCard shows overall progress and simple stats.
 */
export default function ProgressCard({ progress, loading }) {
  const overall = loading ? 0 : (progress?.overallCompletion || 0);
  const comp = loading ? 0 : (progress?.completedSteps || 0);
  const total = loading ? 0 : (progress?.totalSteps || 0);

  return (
    <section className="card" aria-live="polite" aria-busy={loading ? 'true' : 'false'} style={{ padding: 16 }}>
      <div className="section-title">Progress</div>
      <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={overall}>
        <div className="progress-fill" style={{ width: `${overall}%` }} />
      </div>
      <div style={{ marginTop: 8, fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
        <div><strong>{overall}%</strong> complete</div>
        <div><strong>{comp}</strong> of {total} steps</div>
      </div>
    </section>
  );
}
