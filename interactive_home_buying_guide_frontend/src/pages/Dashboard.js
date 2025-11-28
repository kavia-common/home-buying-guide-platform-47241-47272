import React, { useEffect, useState, useCallback } from 'react';
import SidebarSteps from '../components/SidebarSteps';
import StepContent from '../components/StepContent';
import ProgressCard from '../components/ProgressCard';
import ResourceList from '../components/ResourceList';
import Toast from '../components/Toast';
import { api } from '../api/client';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Dashboard assembles the three-column layout and loads initial data.
 */
export default function Dashboard() {
  const [steps, setSteps] = useState([]);
  const [stepsLoading, setStepsLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [progressLoading, setProgressLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [currentDetail, setCurrentDetail] = useState(null);
  const [toggling, setToggling] = useState({});
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  // Load steps list and pick first step detail
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setStepsLoading(true);
        const data = await api.getSteps();
        if (!mounted) return;
        setSteps(data);
        setStepsLoading(false);
        if (data && data.length > 0) {
          // Load first step detail
          const first = data.sort((a, b) => a.order - b.order)[0];
          const detail = await api.getStep(first.id);
          if (!mounted) return;
          setCurrentDetail(detail);
          navigate(`/steps/${first.id}`, { replace: true });
        }
      } catch (e) {
        if (!mounted) return;
        setStepsLoading(false);
        setError(e.message || 'Failed to load steps');
      }
    })();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  // Load resources
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setResourcesLoading(true);
        const r = await api.getResources();
        if (!mounted) return;
        setResources(r);
        setResourcesLoading(false);
      } catch (e) {
        if (!mounted) return;
        setResourcesLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Load progress
  const refreshProgress = useCallback(async () => {
    try {
      setProgressLoading(true);
      const p = await api.getProgress();
      setProgress(p);
      setProgressLoading(false);
    } catch (e) {
      setProgressLoading(false);
    }
  }, []);
  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  // Toggle checklist item with optimistic update
  const handleToggle = async (stepId, itemId) => {
    if (!currentDetail || currentDetail.id !== stepId) return;
    setToggling(prev => ({ ...prev, [itemId]: true }));
    // optimistic change
    const prevDetail = currentDetail;
    const nextDetail = {
      ...currentDetail,
      checklist: currentDetail.checklist.map(i =>
        i.id === itemId ? { ...i, completed: !i.completed } : i
      ),
    };
    setCurrentDetail(nextDetail);

    try {
      const updated = await api.toggleChecklist(stepId, itemId);
      setCurrentDetail(updated);
      setToast('Checklist updated');
      // Also refresh steps list to get updated completion percents
      const newSteps = await api.getSteps();
      setSteps(newSteps);
      refreshProgress();
    } catch (e) {
      setError(e.message || 'Failed to update item');
      // rollback
      setCurrentDetail(prevDetail);
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
      <StepContent
        step={currentDetail}
        onToggle={handleToggle}
        toggling={toggling}
        error={error}
      />
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
