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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showMandateModal, setShowMandateModal] = useState(false);

  const handleSelectRole = (role) => {
    setSelectedPreset(role);
    setIdentifier(role.email);
    setPassphrase(role.password);
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    const loggedInRole = loginWithPreset(selectedPreset.id);
    navigate(loggedInRole.defaultRoute);
  };

  const handleSSOLogin = (providerName) => {
    const loggedInRole = loginWithPreset(selectedPreset.id);
    navigate(loggedInRole.defaultRoute);
  };

  return (
    <div className="login-page-root">
      {/* 1. Top Header Bar */}
      <header className="login-top-bar">
        <div className="brand-capsule-pill">
          <div className="brand-hex-icon">⬡</div>
          <span className="brand-capsule-title">CYBER ALIENS</span>
          <span className="brand-version-tag">v2.4</span>
        </div>

        <div className="top-node-status">
          <span className="top-node-dot"></span>
          <span>STUDIO NODE ACTIVE</span>
        </div>
      </header>

      {/* 2. Main Dual-Card Split Grid */}
      <main className="login-dual-grid">
        {/* 2A. Left Card: Hero Telemetry Card */}
        <section className="hero-dark-card" aria-label="Studio Overview">
          <div className="hero-card-atmosphere"></div>

          {/* Top Tag Row */}
          <div className="hero-card-top-row">
            <div className="hero-platform-pill">
              <span className="top-node-dot" style={{ width: 6, height: 6 }}></span>
              <span>CYBER ALIENS // STUDIO PLATFORM</span>
            </div>
            <span className="hero-est-tag">• EST. 2025</span>
          </div>

          {/* Mid Content Block */}
          <div className="hero-content-block">
            <div className="hero-protocol-tag">SYS // PROTOCOL 01</div>
            <h1 className="hero-main-headline">
              Your studio,<br />
              in one<br />
              place.
            </h1>
            <p className="hero-sub-copy">
              Tactile project telemetry, client deliverables, and creative systems command. Engineered for extreme cadence.
            </p>

            {/* Sparkline Throughput Telemetry */}
            <div className="hero-telemetry-row">
              <svg className="sparkline-svg" width="94" height="28" viewBox="0 0 94 28" fill="none">
                <path
                  d="M1 14 H24 L32 24 L40 4 L48 20 L55 10 L62 16 L68 14 H93"
                  stroke="#FF2D55"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="telemetry-meta">
                <span className="telemetry-meta-label">STUDIO STREAM THROUGHPUT</span>
                <span className="telemetry-meta-value">128.4 Gb/s • Nominal</span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="hero-card-bottom-row">
            <div className="hero-session-pill">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>lock</span>
              <span>NODE US-WEST-01 // ENCRYPTED SESSION</span>
            </div>
            <span className="hero-sys-id">SYS_ID: 808-XRAY</span>
          </div>
        </section>

        {/* 2B. Right Card: Auth Portal Card */}
        <section className="auth-white-card" aria-label="Portal Authentication">
          <div>
            {/* Top Tag Row */}
            <div className="auth-card-top-row">
              <div className="auth-header-pill">
                <span>STUDIO ACCESS // PORTAL AUTH</span>
              </div>
              <div className="auth-secured-indicator">
                <span className="top-node-dot" style={{ width: 6, height: 6 }}></span>
                <span>SECURED</span>
              </div>
            </div>

            {/* Title Block */}
            <div className="auth-title-block">
              <h2 className="auth-main-title">
                Welcome<br />back
              </h2>
              <p className="auth-subhead">
                Sign in with your studio credentials to access active sprints and operations.
              </p>
            </div>

            {/* 1-Click Role Persona Quick Auto-Fill Selector */}
            <div className="role-quick-selector">
              <div className="role-selector-header">
                <span className="role-selector-label">1-Click Auto-Fill Job Role</span>
                <span style={{ fontSize: '10.5px', color: '#888' }}>Select to fill</span>
              </div>

              <div className="role-chips-scroll">
                {PRESET_ROLES.map((role) => {
                  const isSelected = selectedPreset.id === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      className={`role-select-chip ${isSelected ? 'active' : ''}`}
                      onClick={() => handleSelectRole(role)}
                      title={`Auto-fill credentials as ${role.name}`}
                    >
                      <span>{role.name.split(' ')[0]} {role.name.split(' ')[1]?.[0]}.</span>
                      <span className="role-chip-badge">{role.roleBadge}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Selected Role Preview Banner */}
              <div className="active-mandate-banner">
                <div className="mandate-summary">
                  <strong>{selectedPreset.name}</strong>
                  <span className="mandate-route-tag">{selectedPreset.roleBadge}</span>
                </div>
                <button
                  type="button"
                  className="mandate-info-btn"
                  onClick={() => setShowMandateModal(true)}
                >
                  View Powers & Mandate
                </button>
              </div>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleLogin} className="auth-form-wrap">
              {/* Work Email Field */}
              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label htmlFor="auth-email-input" className="auth-field-label">Work Email</label>
                  <span className="auth-label-right verified">✓ DOMAIN VERIFIED</span>
                </div>
                <div className="auth-pill-input-box">
                  <span className="input-icon-glyph">@</span>
                  <input
                    id="auth-email-input"
                    type="email"
                    className="auth-text-field"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    placeholder="name@cyberaliens.in"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label htmlFor="auth-password-input" className="auth-field-label">Password</label>
                  <span className="auth-label-right">Min. 12 characters</span>
                </div>
                <div className="auth-pill-input-box">
                  <span className="material-symbols-outlined input-icon-glyph">vpn_key</span>
                  <input
                    id="auth-password-input"
                    type={showPassword ? 'text' : 'password'}
                    className="auth-text-field"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    required
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    className="input-action-glyph"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label="Toggle password visibility"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="auth-options-row">
                <label className="remember-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="remember-custom-check"></span>
                  <span>Remember me</span>
                </label>

                <Link to="/reset-password" className="forgot-password-link">
                  Forgot password?
                </Link>
              </div>

              {/* Big Black Pill Submit Button */}
              <button type="submit" className="auth-submit-black-pill">
                <span className="submit-red-dot"></span>
                <span>SIGN IN →</span>
              </button>
            </form>

            {/* SSO Divider */}
            <div className="auth-or-divider">
              <span>OR CONTINUE WITH</span>
            </div>

            {/* SSO Action Buttons */}
            <div className="auth-sso-grid">
              <button
                type="button"
                className="auth-sso-btn"
                onClick={() => handleSSOLogin('Google Workspace')}
              >
                <span style={{ fontWeight: 800, fontSize: '13px' }}>G</span>
                <span>Workspace SSO</span>
              </button>
              <button
                type="button"
                className="auth-sso-btn"
                onClick={() => handleSSOLogin('Hardware Passkey')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>passkey</span>
                <span>Hardware Passkey</span>
              </button>
            </div>
          </div>

          {/* Card Footer Link */}
          <div className="auth-card-footer-link">
            Need studio credentials? <Link to="/first-login">Contact your administrator</Link>
          </div>
        </section>
      </main>

      {/* 3. Bottom Footer Bar */}
      <footer className="login-bottom-bar">
        <div className="footer-compliance-row">
          <span className="material-symbols-outlined" style={{ fontSize: '15px', color: '#10b981' }}>verified_user</span>
          <span>SOC2 TYPE II • 256-BIT SSL ENCRYPTED</span>
        </div>

        <div className="footer-links-row">
          <a href="#support" className="footer-link-item">Studio Support</a>
          <span>•</span>
          <a href="#privacy" className="footer-link-item">Privacy Telemetry</a>
          <span>•</span>
          <span>© 2025 Cyber Aliens Studio Inc.</span>
        </div>
      </footer>

      {/* 4. Mandate & Powers Inspector Modal */}
      {showMandateModal && (
        <div className="mandate-modal-backdrop" onClick={() => setShowMandateModal(false)}>
          <div className="mandate-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="mandate-modal-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={selectedPreset.avatar}
                  alt={selectedPreset.name}
                  className="mandate-modal-avatar"
                />
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-headline)' }}>
                    {selectedPreset.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#ffb2b7', fontWeight: 700, marginTop: 2 }}>
                    {selectedPreset.roleBadge} // {selectedPreset.roleTitle}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                    {selectedPreset.department} • {selectedPreset.node}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="mandate-modal-close"
                onClick={() => setShowMandateModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="mandate-list-section">
              <h4>// Mandate & Responsibilities</h4>
              <ul className="mandate-list-items">
                {selectedPreset.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mandate-list-section">
              <h4>// Authorized Powers & Capabilities</h4>
              <ul className="mandate-list-items">
                {selectedPreset.powers.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14 }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                Target route: <code style={{ color: '#FF3B69' }}>{selectedPreset.defaultRoute}</code>
              </span>
              <button
                type="button"
                className="auth-submit-black-pill"
                style={{ width: 'auto', height: '38px', padding: '0 20px', fontSize: '12px', background: '#FF2D55' }}
                onClick={() => {
                  setShowMandateModal(false);
                  handleLogin();
                }}
              >
                Sign In As {selectedPreset.name.split(' ')[0]} →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
