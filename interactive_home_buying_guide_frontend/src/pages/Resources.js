import React, { useEffect, useState } from 'react';
import SidebarSteps from '../components/SidebarSteps';
import ResourceList from '../components/ResourceList';
import { api } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * Resources page shows general resources with the same layout shell.
 */
export default function ResourcesPage() {
  const [steps, setSteps] = useState([]);
  const [stepsLoading, setStepsLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);

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
        setResourcesLoading(true);
        const r = await api.getResources();
        setResources(r);
        setResourcesLoading(false);
      } catch {
        setResourcesLoading(false);
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
        <h2 className="section-title">Resources</h2>
        <ResourceList resources={resources} loading={resourcesLoading} />
      </section>
      <aside className="rightbar" />
    </div>
  );
}
