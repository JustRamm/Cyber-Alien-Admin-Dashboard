import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/PlatformLogin.css';
import '../styles/FirstLoginSetup.css';

export const FirstLoginSetup = () => {
  const navigate = useNavigate();
  const { showToast, setCurrentRole } = useApp();

  const [wizardStep, setWizardStep] = useState(1);
  const [nickname, setNickname] = useState('Alex Mercer');
  const [geofenceAgreed, setGeofenceAgreed] = useState(true);

  const handleNext = () => {
    if (wizardStep < 3) {
      setWizardStep(wizardStep + 1);
    } else {
      showToast('Node setup completed! Welcome to Studio Platform.', 'success');
      setCurrentRole('ADMIN');
      navigate('/admin/mission-control');
    }
  };

  return (
    <div className="auth-screen-layout">
      <div className="auth-background-grid"></div>

      <div className="wizard-container">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
          <img src="/brand-logo.png" alt="Brand Logo" style={{ maxHeight: 28, maxWidth: 200, objectFit: 'contain' }} />
        </div>

        {/* Wizard Header */}
        <div className="wizard-steps-header">
          <div className={`wizard-step-item ${wizardStep === 1 ? 'active' : ''}`}>
            <span className="wizard-step-num">1</span>
            <span>Identity</span>
          </div>
          <div className={`wizard-step-item ${wizardStep === 2 ? 'active' : ''}`}>
            <span className="wizard-step-num">2</span>
            <span>Geofence</span>
          </div>
          <div className={`wizard-step-item ${wizardStep === 3 ? 'active' : ''}`}>
            <span className="wizard-step-num">3</span>
            <span>Hardware Enclave</span>
          </div>
        </div>

        {/* Wizard Step 1: Profile & Identity */}
        {wizardStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <div className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                // STEP 01: OPERATOR PROFILE
              </div>
              <h2 className="font-headline-md" style={{ color: '#ffffff', marginTop: 4 }}>
                Confirm Operator Credentials
              </h2>
              <p style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '13px' }}>
                Your cryptographic studio node handle is linked to Pier 14 Studio HQ.
              </p>
            </div>

            <div className="wizard-content-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'var(--space-md)' }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                  alt="Avatar"
                  style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-secondary)' }}
                />
                <div>
                  <button type="button" className="btn-ghost" style={{ padding: '6px 14px', fontSize: '11px', color: '#ffffff' }}>
                    Upload High-Res Portrait
                  </button>
                  <div style={{ fontSize: '10px', color: 'var(--color-primary-fixed-dim)', marginTop: 4 }}>
                    Min 400x400px • Architectural lighting preferred
                  </div>
                </div>
              </div>

              <div className="auth-field-group">
                <label className="auth-label">Display Operator Name</label>
                <input
                  type="text"
                  className="auth-input"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Wizard Step 2: Geofence Consent */}
        {wizardStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <div className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                // STEP 02: TELEMETRY & GEOFENCE
              </div>
              <h2 className="font-headline-md" style={{ color: '#ffffff', marginTop: 4 }}>
                Pier 14 Geofence Registration
              </h2>
              <p style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '13px' }}>
                To enable automatic biometric punch verification and local workstation mesh sync, enable GPS telemetry.
              </p>
            </div>

            <div className="wizard-content-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-md)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--color-secondary)' }}>
                  radar
                </span>
                <div>
                  <strong style={{ fontSize: '14px' }}>Hub Perimeter: 150.0m</strong>
                  <div style={{ fontSize: '12px', color: 'var(--color-primary-fixed-dim)' }}>
                    Pier 14 Embarcadero, SF (37.7925° N, 122.3920° W)
                  </div>
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--color-primary-fixed-dim)' }}>
                <input
                  type="checkbox"
                  checked={geofenceAgreed}
                  onChange={(e) => setGeofenceAgreed(e.target.checked)}
                  style={{ accentColor: 'var(--color-secondary)', marginTop: 3 }}
                />
                <span>
                  I authorize the Studio to verify my device coordinates exclusively during active punch-in operations.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Wizard Step 3: Hardware Enclave & WebAuthn */}
        {wizardStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <div className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                // STEP 03: ENCLAVE PAIRING
              </div>
              <h2 className="font-headline-md" style={{ color: '#ffffff', marginTop: 4 }}>
                Hardware Passkey Pairing
              </h2>
              <p style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '13px' }}>
                Bind this workstation node to the studio consensus network using FIDO2 WebAuthn.
              </p>
            </div>

            <div className="wizard-content-box" style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-secondary)', marginBottom: '8px' }}>
                fingerprint
              </span>
              <div style={{ fontWeight: '700', fontSize: '15px' }}>Hardware Secure Enclave Detected</div>
              <p style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '12px', marginTop: 4 }}>
                Apple Silicon Touch ID / Windows Hello Passkey Ready
              </p>
            </div>
          </div>
        )}

        {/* Wizard Next Button */}
        <button
          type="button"
          className="auth-submit-btn"
          onClick={handleNext}
        >
          <span>{wizardStep === 3 ? 'Complete Setup & Launch Matrix' : 'Continue to Next Step'}</span>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

