import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './theme.css';

import Dashboard from './pages/Dashboard';
import StepDetail from './pages/StepDetail';
import ResourcesPage from './pages/Resources';
import ProgressPage from './pages/Progress';

/**
 * PUBLIC_INTERFACE
 * App renders the application shell with header and routes.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/steps/:stepId" element={<StepDetail />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function Header() {
  return (
    <header className="header" role="navigation" aria-label="Top navigation">
      <div className="brand">
        <div className="brand-badge" aria-hidden="true" />
        <span>Home Buying Guide</span>
      </div>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link className="btn" to="/">Home</Link>
        <Link className="btn" to="/resources">Resources</Link>
        <Link className="btn" to="/progress">Progress</Link>
      </nav>
    </header>
  );
}

export default App;
