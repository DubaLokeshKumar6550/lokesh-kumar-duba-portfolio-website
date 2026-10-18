import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--accent-cyan)',
        borderRadius: 'var(--radius-md)',
        padding: '0.9rem 1.25rem',
        color: 'var(--text-primary)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.9rem',
        maxWidth: '420px',
        animation: 'slideUp 0.25s ease'
      }}
    >
      {type === 'success' ? (
        <CheckCircle2 size={18} color="#10b981" />
      ) : type === 'error' ? (
        <AlertCircle size={18} color="#f43f5e" />
      ) : (
        <Info size={18} color="#38bdf8" />
      )}
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '0.2rem'
        }}
      >
        <X size={15} />
      </button>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
