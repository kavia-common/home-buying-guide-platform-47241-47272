const DEFAULT_BASE = 'http://localhost:3001';

/**
 * PUBLIC_INTERFACE
 * Returns the API base URL from env or default localhost:3001
 */
export function getApiBase() {
  // CRA exposes env vars prefixed with REACT_APP_
  const envBase = process.env.REACT_APP_API_BASE_URL;
  return (envBase && envBase.trim()) ? envBase.trim() : DEFAULT_BASE;
}

/**
 * PUBLIC_INTERFACE
 * Basic wrapper around fetch with JSON handling and error propagation.
 */
export async function apiFetch(path, options = {}) {
  const base = getApiBase();
  const url = `${base}${path}`;
  const opts = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };
  const res = await fetch(url, opts);
  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      message = data.error || data.message || message;
    } catch {
      // ignore json parse errors
    }
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return res.text();
}

/**
 * PUBLIC_INTERFACE
 * API calls used by the app.
 */
export const api = {
  getSteps: () => apiFetch('/api/steps'),
  getStep: (id) => apiFetch(`/api/steps/${encodeURIComponent(id)}`),
  toggleChecklist: (stepId, itemId) =>
    apiFetch(`/api/steps/${encodeURIComponent(stepId)}/checklist/${encodeURIComponent(itemId)}/toggle`, {
      method: 'POST',
    }),
  getResources: () => apiFetch('/api/resources'),
  getProgress: () => apiFetch('/api/progress'),
};
