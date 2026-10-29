import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/PlatformLogin.css';

export const PlatformLogin = () => {
  const navigate = useNavigate();
  const { showToast, setCurrentRole } = useApp();

  const [identifier, setIdentifier] = useState('alex.mercer@cyberaliens.studio');
  const [passphrase, setPassphrase] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    showToast('Node session authenticated: Welcome back Alex Mercer', 'success');
    setCurrentRole('ADMIN');
    navigate('/admin/mission-control');
  };

  const handlePasskeyAuth = () => {
    showToast('FIDO2 WebAuthn Passkey confirmed: Pier 14 Node verified', 'success');
    setCurrentRole('ADMIN');
    navigate('/admin/mission-control');
  };

  return (
    <div className="auth-screen-layout">
      <div className="auth-background-grid"></div>

      <div className="auth-monolith-card">
        <div className="auth-header-block">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot pulse"></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              CA CYBER ALIENS // CORE
            </span>
          </div>
          <h1 className="font-headline-md" style={{ color: '#ffffff' }}>Studio Platform Access</h1>
          <p style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '13px' }}>
            Enter your registered studio node credentials or tap your hardware security passkey.
          </p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-field-group">
            <label className="auth-label">Studio Identifier / Node Hash</label>
            <input
              type="text"
              className="auth-input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. name@cyberaliens.studio"
              required
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label">Encrypted Passphrase</label>
            <input
              type="password"
              className="auth-input"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          <div className="auth-options-row">
            <label className="auth-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--color-secondary)' }}
              />
              <span>Remember hardware node</span>
            </label>
            <Link to="/reset-password" className="auth-link">
              Forgot key?
            </Link>
          </div>

          <button type="submit" className="auth-submit-btn">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>lock_open</span>
            <span>Authenticate Node</span>
          </button>

          <button
            type="button"
            className="auth-passkey-btn"
            onClick={handlePasskeyAuth}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>fingerprint</span>
            <span>Authenticate via Passkey / WebAuthn</span>
          </button>
        </form>

        <div className="auth-footer-links">
          <span>
            New team member? <Link to="/setup-wizard" className="auth-link">Setup First Login</Link>
          </span>
          <span style={{ fontSize: '11px', opacity: 0.6 }}>
            Pier 14 HQ SFO // 37.7925° N, 122.3920° W
          </span>
        </div>
      </div>
    </div>
  );
};

