import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/EmployeeHomeClockIn.css';

export const EmployeeHomeClockIn = () => {
  const {
    currentUser,
    currentPreset,
    isClockedIn,
    handleClockOut,
    setClockInModalOpen,
    tasks,
    showToast
  } = useApp();

  const [onBreak, setOnBreak] = useState(false);

  const myTasks = tasks.filter(t => t.assignedTo.includes(currentUser.name));

  const handleBreakToggle = () => {
    setOnBreak(!onBreak);
    showToast(onBreak ? 'Resumed active sprint session' : 'Break registered (30 min max)', 'info');
  };

  return (
    <div className="page-wrapper">
      {/* Welcome header */}
      <div className="portal-welcome-strip">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot pulse"></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              {currentPreset?.roleBadge || 'SPECIALIST'} // OPERATIVE WORKSPACE
            </span>
          </div>
          <h1 className="font-headline-lg">Good morning, {currentUser.name.split(' ')[0]}</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '15px' }}>
            {currentUser.hub || 'Pier 14 Studio Waterfront'} • {currentUser.title}
          </p>
        </div>

        <div className="role-spec-badge-pill" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '999px',
          background: '#0a0a0a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          fontSize: '12px',
          fontFamily: 'var(--font-headline)',
          fontWeight: 600
        }}>
          <span className="live-dot pulse" style={{ width: 8, height: 8, background: '#10b981' }}></span>
          <span>{currentPreset?.roleBadge || 'SPECIALIST'}</span>
        </div>
      </div>

      {/* Main Interactive Clock-in Monolith */}
      <div className="portal-clock-monolith">
        <div className="clock-monolith-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="status-dot"
              style={{ backgroundColor: isClockedIn ? '#10b981' : '#f59e0b' }}
            ></span>
            <span className="font-label-caps" style={{ color: 'var(--color-primary-fixed-dim)' }}>
              {isClockedIn ? 'ACTIVE HARDWARE PUNCH SESSION' : 'OFFLINE // STANDBY MODE'}
            </span>
          </div>

          <div className="punch-live-timer">
            {isClockedIn ? '05h 22m 14s' : '00h 00m 00s'}
          </div>

          <div style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '13px' }}>
            {isClockedIn ? (
              <>Clocked in at <strong>{currentUser.clockInTime || '09:12 AM'}</strong> • Studio mesh node verified</>
            ) : (
              <>Ready to punch in. Connect to studio beacon or verify location coordinates.</>
            )}
          </div>
        </div>

        <div className="punch-monolith-actions">
          {!isClockedIn ? (
            <button
              type="button"
              className="punch-main-action-btn"
              onClick={() => setClockInModalOpen(true)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>fingerprint</span>
              <span>Clock In & Begin Shift</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                className="punch-break-btn"
                onClick={handleBreakToggle}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>coffee</span>
                <span>{onBreak ? 'Resume Work' : 'Take Break'}</span>
              </button>
              <button
                type="button"
                className="punch-main-action-btn"
                onClick={handleClockOut}
                style={{ backgroundColor: 'var(--color-secondary-container)' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
                <span>Clock Out & Sign Off</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Two-Column Workspace Layout */}
      <div className="portal-grid-two-col">
        {/* Left Column: Assigned Sprint Tasks */}
        <div className="portal-task-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
            <div>
              <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                SPRINT TICKETS
              </span>
              <h2 className="font-headline-sm" style={{ marginTop: '2px' }}>My Active Priorities Today</h2>
            </div>
            <span className="accuracy-pill">{myTasks.length} Assigned</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {myTasks.length === 0 ? (
              <p style={{ color: 'var(--color-on-surface-variant)', padding: 12 }}>
                All clear! No pending tasks assigned for today.
              </p>
            ) : (
              myTasks.map(task => (
                <div key={task.id} className="portal-task-item">
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--color-on-surface)' }}>
                      {task.title}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: 4 }}>
                      <span>{task.project}</span>
                      <span>•</span>
                      <span>{task.loggedHours}h / {task.estimateHours}h estimated</span>
                    </div>
                  </div>
                  <span
                    className="telemetry-chip"
                    style={{
                      background: task.priority === 'CRITICAL' ? 'var(--color-error-container)' : 'var(--color-surface-container-high)',
                      color: task.priority === 'CRITICAL' ? 'var(--color-error)' : 'var(--color-on-surface)'
                    }}
                  >
                    {task.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Shift Telemetry & Craft KPIs (Radar removed for specialist) */}
        <div className="portal-task-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                SHIFT METRICS
              </span>
              <h2 className="font-headline-sm" style={{ marginTop: '2px' }}>Daily Telemetry & Hours</h2>
            </div>
            <span className="accuracy-pill" style={{ background: '#ecfdf5', color: '#047857' }}>
              ✓ On Target
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{
              background: 'var(--color-surface)',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid var(--color-surface-container-high)'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Shift Progress
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-headline)', color: 'var(--color-primary)', marginTop: 4 }}>
                5.4 <span style={{ fontSize: '14px', fontWeight: 600 }}>/ 8.0h</span>
              </div>
              <div style={{
                height: 6,
                background: 'var(--color-surface-container-high)',
                borderRadius: 4,
                overflow: 'hidden',
                marginTop: 8
              }}>
                <div style={{ width: '68%', height: '100%', background: 'var(--color-primary)' }}></div>
              </div>
            </div>

            <div style={{
              background: 'var(--color-surface)',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid var(--color-surface-container-high)'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Sprint Velocity
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-headline)', color: 'var(--color-secondary)', marginTop: 4 }}>
                {currentUser.kpis?.sprintVelocity || 94}%
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: 8 }}>
                ↑ 3.2% vs sprint average
              </div>
            </div>
          </div>

          {/* Craft Skills */}
          <div>
            <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Specialist Craft Competencies
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(currentUser.skills || ['WebGL Shaders', 'Three.js Core', 'GLSL Optimization']).map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'var(--color-surface-container-low)',
                    border: '1px solid var(--color-surface-container-high)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: 'var(--color-on-surface)',
                    fontWeight: 500
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Studio Enclave Status */}
          <div style={{
            background: '#0a0a0a',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '16px',
            marginTop: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.05em', color: '#ffb2b7', textTransform: 'uppercase', fontWeight: 600 }}>
                HARDWARE MESH LINK
              </span>
              <span style={{ fontSize: '11px', color: '#10b981' }}>● ENCRYPTED</span>
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)' }}>
              Connected to <strong>{currentUser.hub || 'Pier 14 Studio Waterfront'}</strong> via WireGuard Hardware Enclave.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

