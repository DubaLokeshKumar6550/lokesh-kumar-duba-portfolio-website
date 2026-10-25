import React, { useState, useEffect } from 'react';
import { loginAdmin, forgotPassword, resetPassword, checkBackendHealth } from '../services/api';
import { Shield, Lock, User, ArrowLeft, AlertCircle, CheckCircle2, KeyRound, Mail, RefreshCw } from 'lucide-react';

export default function AdminLoginPage({ onLoginSuccess, onBackToPortfolio, showToast }) {
  // Mode: 'login' | 'forgot' | 'reset'
  const [mode, setMode] = useState('login');

  // Login form state (Empty by default - no hardcoded credentials shown)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Password reset form state
  const [resetEmail, setResetEmail] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpHint, setOtpHint] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Backend connection status
  const [backendStatus, setBackendStatus] = useState(null); // null | 'online' | 'offline'
  const [checkingBackend, setCheckingBackend] = useState(false);

  const verifyBackend = async () => {
    setCheckingBackend(true);
    try {
      const health = await checkBackendHealth();
      setBackendStatus(health.isOnline ? 'online' : 'offline');
    } catch {
      setBackendStatus('offline');
    } finally {
      setCheckingBackend(false);
    }
  };

  useEffect(() => {
    verifyBackend();
  }, []);

  // --- Handlers ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!username.trim() || !password) {
      setError('Please enter your administrator username or email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin(username.trim(), password);
      if (res && res.success) {
        setBackendStatus('online');
        if (showToast) showToast('Authenticated successfully as Portfolio Administrator!');
        onLoginSuccess();
      } else {
        if (res?.message?.includes('8080')) {
          setBackendStatus('offline');
        }
        setError(res?.message || 'Invalid administrator credentials. Access restricted to portfolio owner.');
      }
    } catch (err) {
      setBackendStatus('offline');
      setError('Authentication failed. Check your network or credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!resetEmail.trim()) {
      setError('Please enter your registered administrator email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword(resetEmail.trim());
      if (res && res.success) {
        setSuccessMsg(res.message || 'Verification code generated successfully.');
        if (res.data?.otp) {
          setOtpHint(res.data.otp);
          setResetOtp(res.data.otp); // auto-fill for convenience
        }
        setMode('reset');
      } else {
        setError(res?.message || 'Unable to request password recovery. Ensure this email belongs to the administrator.');
      }
    } catch (err) {
      setError('Failed to contact authentication service.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!resetOtp.trim()) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match. Please re-type carefully.');
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(resetEmail.trim(), resetOtp.trim(), newPassword);
      if (res && res.success) {
        setSuccessMsg('Password successfully updated! You can now log in with your new password.');
        setPassword('');
        setUsername(resetEmail.trim());
        setMode('login');
        setOtpHint(null);
        if (showToast) showToast('Password reset successful! Please sign in.');
      } else {
        setError(res?.message || 'Invalid or expired verification code.');
      }
    } catch (err) {
      setError('Password reset failed. Please try requesting a new code.');
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
        paddingTop: '6.5rem',
        paddingBottom: '3.5rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
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
        <div className="glass-card" style={{ padding: '2.5rem', position: 'relative' }}>
          {/* Top-left Quick Back Icon Button */}
          <button
            type="button"
            onClick={onBackToPortfolio}
            title="Return to Public Portfolio"
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 2
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent-cyan)';
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.background = 'rgba(56, 189, 248, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            <ArrowLeft size={17} />
          </button>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: mode === 'login'
                  ? 'linear-gradient(135deg, #0284c7, #2563eb)'
                  : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                marginBottom: '1rem',
                boxShadow: '0 8px 20px rgba(56, 189, 248, 0.3)'
              }}
            >
              {mode === 'login' ? <Shield size={26} /> : <KeyRound size={26} />}
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              {mode === 'login' && 'Admin Portal'}
              {mode === 'forgot' && 'Reset Password'}
              {mode === 'reset' && 'Set New Password'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {mode === 'login' && 'Authorized access for Duba Lokesh Kumar'}
              {mode === 'forgot' && 'Enter your registered email to receive a reset code'}
              {mode === 'reset' && 'Verify your code and create a secure password'}
            </p>

            {/* Backend Connectivity Status Badge */}
            <div style={{ marginTop: '0.75rem' }}>
              <button
                type="button"
                onClick={verifyBackend}
                disabled={checkingBackend}
                title="Click to check backend connection"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  background: backendStatus === 'online'
                    ? 'rgba(16, 185, 129, 0.12)'
                    : backendStatus === 'offline'
                    ? 'rgba(239, 68, 68, 0.12)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${
                    backendStatus === 'online'
                      ? 'rgba(16, 185, 129, 0.3)'
                      : backendStatus === 'offline'
                      ? 'rgba(239, 68, 68, 0.3)'
                      : 'rgba(255, 255, 255, 0.1)'
                  }`,
                  color: backendStatus === 'online'
                    ? '#34d399'
                    : backendStatus === 'offline'
                    ? '#f87171'
                    : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: backendStatus === 'online' ? '#10b981' : backendStatus === 'offline' ? '#ef4444' : '#94a3b8',
                    boxShadow: backendStatus === 'online' ? '0 0 8px #10b981' : 'none'
                  }}
                />
                <span>
                  {checkingBackend
                    ? 'Testing connection...'
                    : backendStatus === 'online'
                    ? 'Backend Online (Port 8080)'
                    : backendStatus === 'offline'
                    ? 'Backend Offline (Port 8080)'
                    : 'Checking connection...'}
                </span>
                <RefreshCw
                  size={11}
                  style={{
                    opacity: 0.7,
                    animation: checkingBackend ? 'spin 1s linear infinite' : 'none'
                  }}
                />
              </button>
            </div>
          </div>

          {/* Success Message Banner */}
          {successMsg && (
            <div
              style={{
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error Message Banner */}
          {error && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(244, 63, 94, 0.12)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#fb7185',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
              {error.includes('8080') && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '0.35rem' }}>
                    💡 How to start the backend:
                  </div>
                  <div style={{ marginBottom: '0.25rem' }}>
                    • Double-click <code style={{ color: 'var(--accent-cyan)' }}>run-portfolio.bat</code> in the project folder
                  </div>
                  <div>
                    • Or run in terminal: <code style={{ color: 'var(--accent-cyan)' }}>npm run backend</code>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OTP Development / Server Notification Banner */}
          {otpHint && mode === 'reset' && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                fontSize: '0.8rem'
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.2rem' }}>
                🔑 Verification Code Generated
              </div>
              <div>
                Code: <code className="font-mono" style={{ fontSize: '1rem', color: '#fff', background: 'rgba(0,0,0,0.3)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{otpHint}</code> (Valid for 15 mins)
              </div>
            </div>
          )}

          {/* VIEW 1: LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Administrator Username or Email
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
                    autoFocus
                    placeholder="Enter admin username or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.775rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="password"
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </form>
          )}

          {/* VIEW 2: FORGOT PASSWORD (REQUEST CODE) */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Registered Administrator Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="email"
                    required
                    autoFocus
                    placeholder="e.g. dubalokeshkumar6550@gmail.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  A 6-digit security code will be generated for your registered administrator address.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                {loading ? 'Generating Code...' : 'Send Verification Code'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="btn btn-secondary"
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}
              >
                Back to Login
              </button>
            </form>
          )}

          {/* VIEW 3: RESET PASSWORD (ENTER OTP + NEW PASSWORD) */}
          {mode === 'reset' && (
            <form onSubmit={handleResetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  6-Digit Verification Code
                </label>
                <div style={{ position: 'relative' }}>
                  <KeyRound
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit OTP code"
                    value={resetOtp}
                    onChange={(e) => setResetOtp(e.target.value)}
                    className="form-input font-mono"
                    style={{ paddingLeft: '2.5rem', letterSpacing: '0.2rem', fontSize: '1rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  New Password
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
                    minLength={6}
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Confirm New Password
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
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                {loading ? 'Updating Password...' : 'Reset Password & Proceed'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="btn btn-secondary"
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}
              >
                Back to Login
              </button>
            </form>
          )}

          {/* Return to Public Portfolio Footer Link */}
          <div
            style={{
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}
          >
            <button
              type="button"
              onClick={onBackToPortfolio}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.825rem',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-cyan)';
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Public Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
