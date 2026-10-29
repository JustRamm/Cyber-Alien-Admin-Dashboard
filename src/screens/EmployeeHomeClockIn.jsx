import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GeofenceRadar } from '../components/GeofenceRadar';
import '../styles/EmployeeHomeClockIn.css';

export const EmployeeHomeClockIn = () => {
  const {
    currentUser,
    isClockedIn,
    handleClockOut,
    setClockInModalOpen,
    tasks,
    showToast,
    toggleRole
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
              SPECIALIST NODE // WORKSPACE
            </span>
          </div>
          <h1 className="font-headline-lg">Good morning, {currentUser.name.split(' ')[0]}</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '15px' }}>
            Pier 14 Studio Waterfront • Mesh connection: ARUBA_PRO_04 (14ms latency)
          </p>
        </div>

        <button
          type="button"
          className="btn-ghost"
          onClick={toggleRole}
          title="Switch to Admin Core"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>admin_panel_settings</span>
          <span>Switch to Admin Core</span>
        </button>
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
              <>Clocked in at <strong>{currentUser.clockInTime}</strong> • Verified at Pier 14 Hub ({currentUser.currentDistanceMeters}m from hub core)</>
            ) : (
              <>Ready to punch in. Connect to studio beacon or verify location coordinates within 150m perimeter.</>
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
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>radar</span>
              <span>Verify Geofence & Clock In</span>
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

        {/* Right Column: Pier 14 Geofence Radar Mini */}
        <div>
          <GeofenceRadar showSwitcher={false} compact={true} />
        </div>
      </div>
    </div>
  );
};

