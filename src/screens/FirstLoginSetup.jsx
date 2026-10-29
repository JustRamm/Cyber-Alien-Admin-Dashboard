import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/PlatformLogin.css';
import '../styles/FirstLoginSetup.css';

export const FirstLoginSetup = () => {
  const navigate = useNavigate();
  const { showToast, setCurrentRole, PRESET_ROLES, loginWithPreset } = useApp();

  const [wizardStep, setWizardStep] = useState(1);
  const [operatorName, setOperatorName] = useState('Alex Mercer');
  const [selectedRole, setSelectedRole] = useState(PRESET_ROLES[0].id);
  const [geofenceAgreed, setGeofenceAgreed] = useState(true);

  const handleNext = () => {
    if (wizardStep < 3) {
      setWizardStep(wizardStep + 1);
    } else {
      showToast('Node setup completed! Welcome to Cyber Aliens Studio Platform.', 'success');
      const role = loginWithPreset(selectedRole);
      navigate(role.defaultRoute);
    }
  };

  const handleBack = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
    }
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
        {/* 2A. Left Card: Hero Card */}
        <section className="hero-dark-card" aria-label="Studio Onboarding Overview">
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
            <div className="hero-protocol-tag">SYS // PROTOCOL 02</div>
            <h1 className="hero-main-headline">
              Set up your<br />
              studio<br />
              node.
            </h1>
            <p className="hero-sub-copy">
              Tactile workstation onboarding, biometric geofence perimeter registration, and FIDO2 secure enclave enrollment.
            </p>

            {/* Sparkline Telemetry */}
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
                <span className="telemetry-meta-label">STUDIO ONBOARDING LINK</span>
                <span className="telemetry-meta-value">Enclave Active • Mesh Ready</span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="hero-card-bottom-row">
            <div className="hero-session-pill">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>security</span>
              <span>NODE US-WEST-01 // ONBOARDING ENCLAVE</span>
            </div>
            <span className="hero-sys-id">SYS_ID: 808-SETUP</span>
          </div>
        </section>

        {/* 2B. Right Card: Setup Form Card */}
        <section className="auth-white-card" aria-label="Setup Wizard Steps">
          <div>
            {/* Top Tag Row */}
            <div className="auth-card-top-row">
              <div className="auth-header-pill">
                <span>STUDIO ONBOARDING // PROTOCOL</span>
              </div>
              <div className="auth-secured-indicator">
                <span className="top-node-dot" style={{ width: 6, height: 6 }}></span>
                <span>STEP 0{wizardStep} OF 03</span>
              </div>
            </div>

            {/* Title Block */}
            <div className="auth-title-block">
              <h2 className="auth-main-title">
                Operator<br />setup
              </h2>
              <p className="auth-subhead">
                Configure your identity, geofence radius consent, and hardware enclave credentials.
              </p>
            </div>

            {/* Steps Progress Capsule Bar */}
            <div className="setup-wizard-steps-bar">
              <div className={`setup-step-pill ${wizardStep === 1 ? 'active' : ''}`}>
                <span className="setup-step-num">1</span>
                <span>Identity</span>
              </div>
              <div className={`setup-step-pill ${wizardStep === 2 ? 'active' : ''}`}>
                <span className="setup-step-num">2</span>
                <span>Geofence</span>
              </div>
              <div className={`setup-step-pill ${wizardStep === 3 ? 'active' : ''}`}>
                <span className="setup-step-num">3</span>
                <span>Enclave</span>
              </div>
            </div>

            {/* STEP 1: Operator Identity & Job Role Track */}
            {wizardStep === 1 && (
              <div className="setup-box-card">
                <div className="setup-avatar-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    alt="Avatar"
                    className="setup-avatar-img"
                  />
                  <div>
                    <strong style={{ fontSize: '14px', color: '#111' }}>Operator Node Handle</strong>
                    <div style={{ fontSize: '11px', color: '#777', marginTop: 2 }}>
                      Pier 14 Studio HQ • Aruba Mesh 04
                    </div>
                  </div>
                </div>

                <div className="auth-input-group">
                  <label className="auth-field-label">Display Operator Name</label>
                  <div className="auth-pill-input-box" style={{ background: '#ffffff' }}>
                    <span className="input-icon-glyph">@</span>
                    <input
                      type="text"
                      className="auth-text-field"
                      value={operatorName}
                      onChange={(e) => setOperatorName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label className="auth-field-label">Assigned Job Role Track</label>
                  <select
                    className="auth-text-field"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #E8E6DF',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    {PRESET_ROLES.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} — {r.roleBadge} ({r.roleTitle})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* STEP 2: Geofence Telemetry Registration */}
            {wizardStep === 2 && (
              <div className="setup-box-card">
                <div>
                  <strong style={{ fontSize: '14px', color: '#111' }}>Pier 14 Geofence Registration</strong>
                  <p style={{ fontSize: '12.5px', color: '#666', marginTop: 4, lineHeight: 1.4 }}>
                    To enable automatic biometric punch verification and local workstation mesh sync, verify studio proximity.
                  </p>
                </div>

                <div className="setup-geofence-spec">
                  <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#B90538' }}>radar</span>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: '#111' }}>Hub Perimeter: 150.0m Core Radius</strong>
                    <div style={{ fontSize: '11.5px', color: '#777' }}>
                      Pier 14 Embarcadero, SF (37.7925° N, 122.3920° W)
                    </div>
                  </div>
                </div>

                <label className="remember-checkbox-label" style={{ alignItems: 'flex-start' }}>
                  <input
                    type="checkbox"
                    checked={geofenceAgreed}
                    onChange={(e) => setGeofenceAgreed(e.target.checked)}
                  />
                  <span className="remember-custom-check" style={{ marginTop: 2 }}></span>
                  <span style={{ fontSize: '12.5px', color: '#444', lineHeight: 1.4 }}>
                    I authorize Cyber Aliens Studio to verify my device coordinates exclusively during active punch-in operations.
                  </span>
                </label>
              </div>
            )}

            {/* STEP 3: Hardware Enclave & WebAuthn */}
            {wizardStep === 3 && (
              <div className="setup-box-card">
                <div className="setup-enclave-box">
                  <span className="material-symbols-outlined" style={{ fontSize: '44px', color: '#B90538' }}>
                    fingerprint
                  </span>
                  <strong style={{ fontSize: '15px', color: '#000000' }}>Hardware Secure Enclave Detected</strong>
                  <div style={{ fontSize: '12.5px', color: '#666' }}>
                    Touch ID / Windows Hello FIDO2 cryptographic key ready to pair with studio mesh.
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              {wizardStep > 1 && (
                <button
                  type="button"
                  className="auth-sso-btn"
                  onClick={handleBack}
                  style={{ width: '120px' }}
                >
                  ← Back
                </button>
              )}
              <button
                type="button"
                className="auth-submit-black-pill"
                onClick={handleNext}
                style={{ flex: 1, marginTop: 0 }}
              >
                <span className="submit-red-dot"></span>
                <span>{wizardStep === 3 ? 'COMPLETE SETUP & LAUNCH →' : 'CONTINUE TO NEXT STEP →'}</span>
              </button>
            </div>
          </div>

          {/* Card Footer Link */}
          <div className="auth-card-footer-link">
            Already have credentials? <Link to="/login">Sign in to your workspace</Link>
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
    </div>
  );
};
