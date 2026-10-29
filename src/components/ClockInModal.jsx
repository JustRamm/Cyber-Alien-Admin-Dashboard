import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/ClockInModal.css';

export const ClockInModal = () => {
  const {
    clockInModalOpen,
    setClockInModalOpen,
    isClockedIn,
    handleClockIn,
    handleClockOut,
    currentUser
  } = useApp();

  const [simulatedDistance, setSimulatedDistance] = useState(28);

  if (!clockInModalOpen) return null;

  const isWithin = simulatedDistance <= 150;

  return (
    <div className="modal-backdrop-overlay" onClick={() => setClockInModalOpen(false)}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={() => setClockInModalOpen(false)}
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
        </button>

        <div className="modal-header-block">
          <div className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
            // BIOMETRIC & GEOFENCE TELEMETRY
          </div>
          <h2 className="modal-title">
            {isClockedIn ? 'Active Punch Verification' : 'Punch Clock-In Request'}
          </h2>
          <p className="modal-subtitle">
            Validating hardware beacon and location coordinates against the Pier 14 Waterfront Hub.
          </p>
        </div>

        {/* Verification Status Card */}
        <div className="modal-radar-mini">
          <div className="verification-status-banner">
            <span className="status-dot pulse"></span>
            <span>
              {isWithin
                ? `WITHIN PERIMETER: ${simulatedDistance}M FROM HUB CORE`
                : `GEOFENCE BREACH: ${simulatedDistance}M EXCEEDS 150M`}
            </span>
          </div>

          <div className="telemetry-rows-grid">
            <div className="telemetry-data-card">
              <div className="telemetry-data-title">Target Hub</div>
              <div className="telemetry-data-val">Pier 14 SFO</div>
            </div>
            <div className="telemetry-data-card">
              <div className="telemetry-data-title">Perimeter Limit</div>
              <div className="telemetry-data-val">150.0 Meters</div>
            </div>
            <div className="telemetry-data-card">
              <div className="telemetry-data-title">GPS Accuracy</div>
              <div className="telemetry-data-val">± 2.4 Meters</div>
            </div>
            <div className="telemetry-data-card">
              <div className="telemetry-data-title">Hardware Beacon</div>
              <div className="telemetry-data-val">ARUBA_PRO_04</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions-footer">
          {!isClockedIn ? (
            <button
              type="button"
              className="modal-punch-confirm-btn"
              onClick={() => handleClockIn({ distance: simulatedDistance, accuracy: '± 2.4m', verified: isWithin })}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>fingerprint</span>
              <span>Confirm Biometric Clock-In</span>
            </button>
          ) : (
            <button
              type="button"
              className="modal-punch-confirm-btn"
              style={{ backgroundColor: 'var(--color-primary-container)', border: '1px solid var(--color-secondary)' }}
              onClick={handleClockOut}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
              <span>Clock Out & Sign Off Timesheet</span>
            </button>
          )}

          <button
            type="button"
            className="modal-secondary-action-btn"
            onClick={() => {
              // Simulate walking outside geofence for testing
              setSimulatedDistance(simulatedDistance === 28 ? 190 : 28);
            }}
          >
            Simulate Distance ({simulatedDistance === 28 ? 'Toggle Outside Bounds' : 'Toggle Inside 28m'})
          </button>
        </div>
      </div>
    </div>
  );
};

