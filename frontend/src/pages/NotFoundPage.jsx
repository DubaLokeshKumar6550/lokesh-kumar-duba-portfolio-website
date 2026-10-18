import React from 'react';
import { Terminal, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage({ onGoHome }) {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center'
      }}
    >
      <div className="glass-card" style={{ maxWidth: '500px', padding: '3.5rem 2rem' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fb7185',
            marginBottom: '1.5rem'
          }}
        >
          <Terminal size={32} />
        </div>

        <div className="font-mono" style={{ fontSize: '0.9rem', color: '#fb7185', marginBottom: '0.5rem' }}>
          HTTP 404: RESOURCE_NOT_FOUND
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
          Page Not Found
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The requested portfolio endpoint or route does not exist. Please navigate back to the main portfolio overview.
        </p>

        <button onClick={onGoHome} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
          <Home size={18} />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
}
