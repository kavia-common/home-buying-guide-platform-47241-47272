import React, { useEffect } from 'react';

/**
 * PUBLIC_INTERFACE
 * Toast shows ephemeral alerts.
 */
export default function Toast({ message, type = 'info', onClose, duration = 2500 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;
  return (
    <div className={`toast ${type === 'error' ? 'error' : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
