import React, { useEffect, useState } from 'react';
import SidebarSteps from '../components/SidebarSteps';
import ProgressCard from '../components/ProgressCard';
import { api } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * Progress page shows overall progress and per-step completion.
 */
export default function ProgressPage() {
  const [steps, setSteps] = useState([]);
  const [stepsLoading, setStepsLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [progressLoading, setProgressLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setStepsLoading(true);
        const s = await api.getSteps();
        if (!mounted) return;
        setSteps(s);
        setStepsLoading(false);
      } catch {
        if (!mounted) return;
        setStepsLoading(false);
      }
    })();
    (async () => {
      try {
        setProgressLoading(true);
        const p = await api.getProgress();
        if (!mounted) return;
        setProgress(p);
        setProgressLoading(false);
      } catch {
        if (!mounted) return;
        setProgressLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="dashboard">
      <SidebarSteps steps={steps} loading={stepsLoading} />
      <section className="card main" style={{ padding: 16 }}>
        <h2 className="section-title">Progress Overview</h2>
        <ProgressCard progress={progress} loading={progressLoading} />
        <div className="section-title" style={{ marginTop: 16 }}>By Step</div>
        <div style={{ display: 'grid', gap: 10 }}>
          {steps.map(s => (
            <div key={s.id} className="card" style={{ padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 600 }}>{s.title}</div>
                <div style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>{s.completion}%</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <aside className="rightbar" />
    </div>
  );
}
