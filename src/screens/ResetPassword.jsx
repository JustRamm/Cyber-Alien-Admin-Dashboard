import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/PlatformLogin.css';
import '../styles/FirstLoginSetup.css';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('alex@cyberaliens.in');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendToken = (e) => {
    e.preventDefault();
    setStep(2);
    showToast(`Verification challenge code sent to ${email}`, 'success');
  };

  const handleVerifyToken = (e) => {
    e.preventDefault();
    setStep(3);
    showToast('Security challenge verified. Set new studio passphrase.', 'success');
  };

  const handleFinalReset = (e) => {
    e.preventDefault();
    showToast('Credentials successfully updated. Redirecting to login...', 'success');
    navigate('/login');
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
        <section className="hero-dark-card" aria-label="Credential Recovery Overview">
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
            <div className="hero-protocol-tag">SYS // RECOVERY VAULT</div>
            <h1 className="hero-main-headline">
              Passkey &amp;<br />
              credential<br />
              vault.
            </h1>
            <p className="hero-sub-copy">
              Encrypted biometric challenge to restore studio access across all distributed nodes.
            </p>

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
                <span className="telemetry-meta-label">VAULT RECOVERY PIPELINE</span>
                <span className="telemetry-meta-value">256-Bit SSL Handshake</span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="hero-card-bottom-row">
            <div className="hero-session-pill">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>lock_reset</span>
              <span>NODE RECOVERY // ENCRYPTED CHALLENGE</span>
            </div>
            <span className="hero-sys-id">VAULT: SEC-99</span>
          </div>
        </section>

        {/* 2B. Right Card: Recovery Card */}
        <section className="auth-white-card" aria-label="Password Reset Form">
          <div>
            {/* Top Tag Row */}
            <div className="auth-card-top-row">
              <div className="auth-header-pill">
                <span>RECOVERY // CHALLENGE</span>
              </div>
              <div className="auth-secured-indicator">
                <span className="top-node-dot" style={{ width: 6, height: 6 }}></span>
                <span>STEP 0{step} OF 03</span>
              </div>
            </div>

            {/* Title Block */}
            <div className="auth-title-block">
              <h2 className="auth-main-title">
                Reset<br />passphrase
              </h2>
              <p className="auth-subhead">
                Restore studio platform access via verified cryptographic token exchange.
              </p>
            </div>

            {/* Step Progress Capsule Bar */}
            <div className="setup-wizard-steps-bar">
              <div className={`setup-step-pill ${step === 1 ? 'active' : ''}`}>
                <span className="setup-step-num">1</span>
                <span>Email</span>
              </div>
              <div className={`setup-step-pill ${step === 2 ? 'active' : ''}`}>
                <span className="setup-step-num">2</span>
                <span>Challenge</span>
              </div>
              <div className={`setup-step-pill ${step === 3 ? 'active' : ''}`}>
                <span className="setup-step-num">3</span>
                <span>Passphrase</span>
              </div>
            </div>

            {/* Step 1: Email Challenge */}
            {step === 1 && (
              <form onSubmit={handleSendToken} className="auth-form-wrap">
                <div className="auth-input-group">
                  <div className="auth-label-row">
                    <label className="auth-field-label">Registered Studio Email</label>
                    <span className="auth-label-right verified">✓ ACTIVE NODE</span>
                  </div>
                  <div className="auth-pill-input-box">
                    <span className="input-icon-glyph">@</span>
                    <input
                      type="email"
                      className="auth-text-field"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="alex@cyberaliens.in"
                    />
                  </div>
                </div>

                <button type="submit" className="auth-submit-black-pill">
                  <span className="submit-red-dot"></span>
                  <span>SEND RECOVERY CODE →</span>
                </button>
              </form>
            )}

            {/* Step 2: Challenge Code */}
            {step === 2 && (
              <form onSubmit={handleVerifyToken} className="auth-form-wrap">
                <div className="auth-input-group">
                  <div className="auth-label-row">
                    <label className="auth-field-label">6-Digit Security Challenge Code</label>
                    <span className="auth-label-right">Check your inbox</span>
                  </div>
                  <div className="auth-pill-input-box">
                    <span className="material-symbols-outlined input-icon-glyph">security</span>
                    <input
                      type="text"
                      className="auth-text-field"
                      placeholder="e.g. 849-201"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="auth-submit-black-pill">
                  <span className="submit-red-dot"></span>
                  <span>VERIFY CHALLENGE CODE →</span>
                </button>
              </form>
            )}

            {/* Step 3: New Passphrase */}
            {step === 3 && (
              <form onSubmit={handleFinalReset} className="auth-form-wrap">
                <div className="auth-input-group">
                  <div className="auth-label-row">
                    <label className="auth-field-label">New Passphrase</label>
                    <span className="auth-label-right">Min. 12 characters</span>
                  </div>
                  <div className="auth-pill-input-box">
                    <span className="material-symbols-outlined input-icon-glyph">vpn_key</span>
                    <input
                      type="password"
                      className="auth-text-field"
                      placeholder="Minimum 12 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="auth-submit-black-pill">
                  <span className="submit-red-dot"></span>
                  <span>SAVE PASSPHRASE & RETURN →</span>
                </button>
              </form>
            )}
          </div>

          {/* Card Footer Link */}
          <div className="auth-card-footer-link">
            Remembered your credentials? <Link to="/login">Back to Sign In</Link>
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
