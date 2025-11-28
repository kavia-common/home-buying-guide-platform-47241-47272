import React, { useEffect, useState, useCallback } from 'react';
import SidebarSteps from '../components/SidebarSteps';
import StepContent from '../components/StepContent';
import ProgressCard from '../components/ProgressCard';
import ResourceList from '../components/ResourceList';
import Toast from '../components/Toast';
import { api } from '../api/client';
import { useParams } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * StepDetail renders the same layout as Dashboard but loads the step by id from URL.
 */
export default function StepDetail() {
  const params = useParams();
  const stepId = params.stepId;
  const [steps, setSteps] = useState([]);
  const [stepsLoading, setStepsLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [toggling, setToggling] = useState({});
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [progress, setProgress] = useState(null);
  const [progressLoading, setProgressLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);

  const refreshProgress = useCallback(async () => {
    try {
      setProgressLoading(true);
      const p = await api.getProgress();
      setProgress(p);
      setProgressLoading(false);
    } catch {
      setProgressLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = TrueFlag();
    (async () => {
      try {
        setStepsLoading(true);
        const s = await api.getSteps();
        if (!mounted) return;
        setSteps(s);
        setStepsLoading(false);
      } catch (e) {
        if (!mounted) return;
        setError(e.message || 'Failed to load steps');
        setStepsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = TrueFlag();
    (async () => {
      try {
        const d = await api.getStep(stepId);
        if (!mounted) return;
        setDetail(d);
      } catch (e) {
        if (!mounted) return;
        setError(e.message || 'Failed to load step');
      }
    })();
    return () => {
      mounted = false;
    };
  }, [stepId]);

  useEffect(() => {
    refreshProgress();
    let mounted = TrueFlag();
    (async () => {
      try {
        setResourcesLoading(true);
        const r = await api.getResources();
        if (!mounted) return;
        setResources(r);
        setResourcesLoading(false);
      } catch {
        if (!mounted) return;
        setResourcesLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [refreshProgress]);

  const onToggle = async (sid, itemId) => {
    if (!detail || detail.id !== sid) return;
    setToggling(prev => ({ ...prev, [itemId]: true }));
    const prevDetail = detail;
    const nextDetail = {
      ...detail,
      checklist: detail.checklist.map(i => i.id === itemId ? { ...i, completed: !i.completed } : i),
    };
    setDetail(nextDetail);

    try {
      const updated = await api.toggleChecklist(sid, itemId);
      setDetail(updated);
      setToast('Checklist updated');
      const newSteps = await api.getSteps();
      setSteps(newSteps);
      refreshProgress();
    } catch (e) {
      setError(e.message || 'Failed to update item');
      setDetail(prevDetail);
    } finally {
      setToggling(prev => {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      });
    }
  };

  return (
    <div className="dashboard">
      <SidebarSteps steps={steps} loading={stepsLoading} />
      <StepContent step={detail} onToggle={onToggle} toggling={toggling} error={error} />
      <aside className="rightbar">
        <div className="progress-container">
          <ProgressCard progress={progress} loading={progressLoading} />
          <ResourceList resources={resources} loading={resourcesLoading} />
        </div>
      </aside>
      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
}

/**
 * Utility to avoid linter shadowing booleans while keeping same pattern as Dashboard
 */
function TrueFlag() { return true; }
