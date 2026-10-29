import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/PlatformLogin.css';

export const SignUp = () => {
  const navigate = useNavigate();
  const { addEmployee, showToast, setCurrentRole, setCurrentUser } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [roleTitle, setRoleTitle] = useState('Senior WebGL & Three.js Engineer');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSignUp = (e) => {
    if (e) e.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      showToast('Please fill in all operative registration fields', 'error');
      return;
    }

    const isSuperAdminRole = roleTitle.includes('Super Admin');
    const assignedRoleCategory = isSuperAdminRole ? 'Executive' : (roleTitle.includes('Design') || roleTitle.includes('UI') ? 'Design & Systems' : 'Engineering');

    // Register new employee node
    const newOperative = {
      name: fullName,
      title: roleTitle,
      email: email,
      roleCategory: assignedRoleCategory,
      node: 'SFO NODE 01 // PIER 14 HQ',
      hub: 'Pier 14 Studio Waterfront',
      level: isSuperAdminRole ? 'LEVEL 5 ROOT' : 'LEVEL 3 SPECIALIST',
      skills: 'WebGL, Three.js, Shaders, Spatial UI',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
    };

    addEmployee(newOperative);
    setCurrentRole(isSuperAdminRole ? 'ADMIN' : 'SPECIALIST');

    showToast(`Operative registration confirmed for ${fullName}! Welcome to Cyber Aliens Studio.`, 'success');

    if (isSuperAdminRole) {
      navigate('/admin/mission-control');
    } else {
      navigate('/portal/home');
    }
  };

  const handleSSORegistration = (provider) => {
    showToast(`Authenticated via ${provider} OAuth Enclave`, 'info');
    navigate('/portal/home');
  };

  return (
    <div className="login-page-root">
      {/* 1. Top Header Bar */}
      <header className="login-top-bar">
        <div className="brand-capsule-pill">
          <div className="brand-hex-icon">
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>view_in_ar</span>
          </div>
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
              Join the<br />
              studio<br />
              cadence.
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
                <span className="telemetry-meta-label">STUDIO ENCLAVE THROUGHPUT</span>
                <span className="telemetry-meta-value">128.4 Gb/s • Nominal</span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="hero-card-bottom-row">
            <div className="hero-session-pill">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>lock</span>
              <span>NODE US-WEST-01 // REGISTRATION ENCLAVE</span>
            </div>
            <span className="hero-sys-id">SYS_ID: 808-ALPHA</span>
          </div>
        </section>

        {/* 2B. Right Card: Sign Up Portal Card */}
        <section className="auth-white-card" aria-label="Operative Registration">
          <div>
            {/* Top Tag Row */}
            <div className="auth-card-top-row">
              <div className="auth-header-pill">
                <span>STUDIO ONBOARDING // CREATE ACCOUNT</span>
              </div>
              <div className="auth-secured-indicator">
                <span className="top-node-dot" style={{ width: 6, height: 6 }}></span>
                <span>SECURED</span>
              </div>
            </div>

            {/* Title Block */}
            <div className="auth-title-block">
              <h2 className="auth-main-title">
                Create<br />account
              </h2>
              <p className="auth-subhead">
                Register your studio credentials to access active sprints and engineering hubs.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSignUp} className="auth-form-wrap">
              {/* Full Name */}
              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label htmlFor="signup-name-input" className="auth-field-label">Full Name</label>
                  <span className="auth-label-right">LEGAL IDENTITY</span>
                </div>
                <div className="auth-pill-input-box">
                  <span className="material-symbols-outlined input-icon-glyph">person</span>
                  <input
                    id="signup-name-input"
                    type="text"
                    className="auth-text-field"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="e.g. Kenji Takahashi"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label htmlFor="signup-email-input" className="auth-field-label">Work Email</label>
                  <span className="auth-label-right verified">✓ DOMAIN VERIFIED</span>
                </div>
                <div className="auth-pill-input-box">
                  <span className="input-icon-glyph">@</span>
                  <input
                    id="signup-email-input"
                    type="email"
                    className="auth-text-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@cyberaliens.in"
                  />
                </div>
              </div>

              {/* Role Title Selector */}
              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label htmlFor="signup-role-select" className="auth-field-label">Craft Discipline</label>
                  <span className="auth-label-right">STUDIO MANDATE</span>
                </div>
                <div className="auth-pill-input-box">
                  <span className="material-symbols-outlined input-icon-glyph">badge</span>
                  <select
                    id="signup-role-select"
                    className="auth-text-field auth-select-field"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    style={{ cursor: 'pointer', background: 'transparent' }}
                  >
                    <option value="Senior WebGL & Three.js Engineer">Senior WebGL & Three.js Engineer</option>
                    <option value="Senior UI/UX & Spatial Lead">Senior UI/UX & Spatial Lead</option>
                    <option value="Creative Director & 3D Motion">Creative Director & 3D Motion</option>
                    <option value="Head of People & Operations">Head of People & Operations</option>
                    <option value="Studio Principal & Super Admin">Studio Principal & Super Admin</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label htmlFor="signup-password-input" className="auth-field-label">Password</label>
                  <span className="auth-label-right">Min. 12 characters</span>
                </div>
                <div className="auth-pill-input-box">
                  <span className="material-symbols-outlined input-icon-glyph">vpn_key</span>
                  <input
                    id="signup-password-input"
                    type={showPassword ? 'text' : 'password'}
                    className="auth-text-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Agreement */}
              <div className="auth-options-row">
                <label className="remember-checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span className="remember-custom-check"></span>
                  <span style={{ fontSize: '12px' }}>Agree to studio security protocol & enclave</span>
                </label>
              </div>

              {/* Submit Pill Button */}
              <button type="submit" className="auth-submit-black-pill">
                <span className="submit-red-dot"></span>
                <span>CREATE ACCOUNT →</span>
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
                onClick={() => handleSSORegistration('Google Workspace')}
              >
                <span style={{ fontWeight: 800, fontSize: '13px' }}>G</span>
                <span>Workspace SSO</span>
              </button>
              <button
                type="button"
                className="auth-sso-btn"
                onClick={() => handleSSORegistration('Hardware Passkey')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>passkey</span>
                <span>Hardware Passkey</span>
              </button>
            </div>
          </div>

          {/* Card Footer Link */}
          <div className="auth-card-footer-link">
            Already have an operative node? <Link to="/login">Sign in here</Link>
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

