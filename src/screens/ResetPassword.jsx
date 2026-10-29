import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/PlatformLogin.css';
import '../styles/ResetPassword.css';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('alex.mercer@cyberaliens.studio');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendToken = (e) => {
    e.preventDefault();
    setStep(2);
    showToast(`Verification code sent to ${email}`, 'success');
  };

  const handleVerifyToken = (e) => {
    e.preventDefault();
    setStep(3);
    showToast('Token verified. Please choose new passphrase', 'success');
  };

  const handleFinalReset = (e) => {
    e.preventDefault();
    showToast('Credentials successfully updated. Please login.', 'success');
    navigate('/login');
  };

  return (
    <div className="auth-screen-layout">
      <div className="auth-background-grid"></div>

      <div className="auth-monolith-card">
        <div className="auth-header-block">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot"></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              SECURITY & CREDENTIAL VAULT
            </span>
          </div>
          <h1 className="font-headline-md" style={{ color: '#ffffff' }}>Passkey Recovery</h1>
          <p style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '13px' }}>
            Restore node authentication via verified enclave cryptographic challenge.
          </p>
        </div>

        {/* Step progress indicators */}
        <div className="reset-steps-bar">
          <div className={`reset-step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="reset-step-line"></div>
          <div className={`reset-step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className="reset-step-line"></div>
          <div className={`reset-step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendToken} className="auth-form">
            <div className="auth-field-group">
              <label className="auth-label">Registered Studio Email</label>
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-submit-btn">
              <span>Send Recovery Challenge Token</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyToken} className="auth-form">
            <div className="auth-field-group">
              <label className="auth-label">6-Digit Security Challenge Code</label>
              <input
                type="text"
                className="auth-input"
                placeholder="e.g. 849-201"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-submit-btn">
              <span>Verify Security Token</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>verified</span>
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleFinalReset} className="auth-form">
            <div className="auth-field-group">
              <label className="auth-label">New Passphrase</label>
              <input
                type="password"
                className="auth-input"
                placeholder="Minimum 12 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-submit-btn">
              <span>Update Credentials & Return</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>lock_reset</span>
            </button>
          </form>
        )}

        <div className="auth-footer-links">
          <Link to="/login" className="auth-link">
            ← Return to Studio Platform Login
          </Link>
        </div>
      </div>
    </div>
  );
};

