import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/PlatformLogin.css';

export const PlatformLogin = () => {
  const navigate = useNavigate();
  const { PRESET_ROLES, loginWithPreset } = useApp();

  const [selectedPreset, setSelectedPreset] = useState(PRESET_ROLES[0]);
  const [identifier, setIdentifier] = useState(PRESET_ROLES[0].email);
  const [passphrase, setPassphrase] = useState(PRESET_ROLES[0].password);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSelectRole = (role) => {
    setSelectedPreset(role);
    setIdentifier(role.email);
    setPassphrase(role.password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const loggedInRole = loginWithPreset(selectedPreset.id);
    navigate(loggedInRole.defaultRoute);
  };

  const handlePasskeyAuth = () => {
    const loggedInRole = loginWithPreset(selectedPreset.id);
    navigate(loggedInRole.defaultRoute);
  };

  return (
    <div className="auth-screen-layout">
      <div className="auth-background-grid"></div>

      <div className="auth-workspace-container">
        {/* Top Header Bar */}
        <div className="auth-header-bar">
          <div className="auth-brand-row">
            <img src="/brand-logo.png" alt="Brand Logo" className="auth-brand-logo" />
            <span className="auth-core-badge">// ROLE-BASED ACCESS GATEWAY</span>
          </div>
          <div className="auth-system-status">
            <span className="status-dot pulse"></span>
            <span className="font-label-caps">PIER 14 CLUSTER ONLINE // SFO</span>
          </div>
        </div>

        <div className="auth-dual-grid">
          {/* Left Column: Preset Job Roles & Powers Dossier */}
          <div className="auth-roles-panel">
            <div className="auth-panel-heading">
              <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                PRESET COMPANY JOB ROLES
              </span>
              <h2 className="font-headline-sm" style={{ color: '#ffffff', marginTop: 2 }}>
                Select Role Persona to Auto-Fill
              </h2>
              <p style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '12px' }}>
                Click any role to load authentic credentials, preview granted authority, and route to that role’s workspace.
              </p>
            </div>

            {/* Clickable Preset Role Cards List */}
            <div className="preset-roles-list">
              {PRESET_ROLES.map((role) => {
                const isSelected = selectedPreset.id === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    className={`preset-role-card ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectRole(role)}
                  >
                    <img src={role.avatar} alt={role.name} className="preset-role-avatar" />
                    <div className="preset-role-info">
                      <div className="preset-role-name-row">
                        <span className="preset-role-name">{role.name}</span>
                        <span
                          className="preset-tier-tag"
                          style={{ borderColor: role.badgeColor, color: role.badgeColor }}
                        >
                          {role.role === 'ADMIN' ? 'ADMIN CORE' : 'SPECIALIST'}
                        </span>
                      </div>
                      <div className="preset-role-title">{role.roleTitle}</div>
                      <div className="preset-role-dept">{role.department} • {role.node}</div>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined preset-check-icon">
                        check_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Selected Role Responsibilities & Powers Dossier */}
            <div className="selected-role-dossier">
              <div className="dossier-header-row">
                <div>
                  <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                    MANDATE & PRIVILEGES
                  </span>
                  <div className="dossier-role-title">{selectedPreset.roleTitle}</div>
                </div>
                <div className="dossier-route-pill">
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>near_me</span>
                  <span>Routes to: {selectedPreset.defaultRoute}</span>
                </div>
              </div>

              <div className="dossier-sections-grid">
                {/* Responsibilities */}
                <div className="dossier-box">
                  <div className="dossier-box-title">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-secondary)' }}>
                      task_alt
                    </span>
                    <span>Role Responsibilities</span>
                  </div>
                  <ul className="dossier-list">
                    {selectedPreset.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                {/* Granted Powers */}
                <div className="dossier-box">
                  <div className="dossier-box-title">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#10B981' }}>
                      verified_user
                    </span>
                    <span>Authorized Powers & Capabilities</span>
                  </div>
                  <ul className="dossier-list powers-list">
                    {selectedPreset.powers.map((power, idx) => (
                      <li key={idx}>{power}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Node Credentials & Sign In Form */}
          <div className="auth-form-panel">
            <div className="auth-form-header">
              <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                NODE CREDENTIALS
              </span>
              <h2 className="font-headline-sm" style={{ color: '#ffffff', marginTop: 2 }}>
                Authenticate Node
              </h2>
              <p style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '12px' }}>
                Pre-populated from selected role: <strong style={{ color: '#ffffff' }}>{selectedPreset.name}</strong>
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
                  <span>Remember hardware enclave</span>
                </label>
                <Link to="/reset-password" className="auth-link">
                  Forgot key?
                </Link>
              </div>

              <button type="submit" className="auth-submit-btn">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>lock_open</span>
                <span>Enter as {selectedPreset.name}</span>
              </button>

              <button
                type="button"
                className="auth-passkey-btn"
                onClick={handlePasskeyAuth}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>fingerprint</span>
                <span>Authenticate via FIDO2 Passkey</span>
              </button>
            </form>

            <div className="auth-footer-links">
              <span>
                New operative? <Link to="/setup-wizard" className="auth-link">Setup First Login</Link>
              </span>
              <span style={{ fontSize: '11px', opacity: 0.6 }}>
                Pier 14 HQ SFO // 37.7925° N, 122.3920° W // Cluster US-EAST-ALN
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
