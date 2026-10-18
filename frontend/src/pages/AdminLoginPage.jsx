import React, { useState } from 'react';
import { loginAdmin } from '../services/api';
import { Shield, Lock, User, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage({ onLoginSuccess, onBackToPortfolio, showToast }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('AdminPassword@2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginAdmin(username, password);
      if (res && res.success) {
        if (showToast) showToast('Authenticated successfully as Portfolio Administrator!');
        onLoginSuccess();
      } else {
        setError(res?.message || 'Invalid administrator credentials.');
      }
    } catch (err) {
      setError('Authentication failed. Check your network or credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative'
      }}
    >
      <div
        className="glow-orb"
        style={{
          top: '25%',
          left: '30%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)'
        }}
      />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 10 }}>
        {/* Back Link */}
        <button
          onClick={onBackToPortfolio}
          className="btn btn-secondary"
          style={{ marginBottom: '1.5rem', padding: '0.45rem 0.95rem', fontSize: '0.825rem' }}
        >
          <ArrowLeft size={15} />
          <span>Back to Public Portfolio</span>
        </button>

        <div className="glass-card" style={{ padding: '2.5rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                marginBottom: '1rem',
                boxShadow: '0 8px 20px rgba(56, 189, 248, 0.3)'
              }}
            >
              <Shield size={26} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              Portfolio Admin Portal
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Authenticated management for Duba Lokesh Kumar
            </p>
          </div>

          {error && (
            <div
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#fb7185',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <User
                  size={16}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={16}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            {/* Quick credentials hint note */}
            <div
              style={{
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                fontSize: '0.775rem',
                color: 'var(--text-secondary)'
              }}
            >
              <strong>Default Admin Credentials:</strong>
              <div>Username: <code className="font-mono" style={{ color: 'var(--accent-cyan)' }}>admin</code></div>
              <div>Password: <code className="font-mono" style={{ color: 'var(--accent-cyan)' }}>AdminPassword@2026</code></div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
