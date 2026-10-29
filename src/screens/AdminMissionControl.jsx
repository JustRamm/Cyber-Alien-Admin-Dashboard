import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GeofenceRadar } from '../components/GeofenceRadar';
import '../styles/AdminMissionControl.css';

export const AdminMissionControl = () => {
  const { studioStats, employees, showToast } = useApp();
  const [pulseFilter, setPulseFilter] = useState('ALL');

  const filteredEmployees = employees.filter(emp => {
    if (pulseFilter === 'ALL') return true;
    if (pulseFilter === 'STUDIO') return emp.geofenceStatus === 'INSIDE_PERIMETER';
    if (pulseFilter === 'REMOTE') return emp.geofenceStatus === 'REMOTE_APPROVED';
    if (pulseFilter === 'LEAVE') return emp.status === 'ON_LEAVE';
    return true;
  });

  return (
    <div className="page-wrapper">
      {/* Top Header Row */}
      <div className="mission-control-header">
        <div className="mission-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="telemetry-chip live">
              <span className="status-dot pulse"></span>
              TELEMETRY NODE 01
            </span>
            <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
              // LIVE ORBIT SFO
            </span>
          </div>
          <h1 className="font-headline-lg">Studio Matrix</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '13px' }}>
            Pier 14 HQ + Global Distributed Nodes Synchronization
          </p>
        </div>

        <div className="mission-header-actions">
          <div className="telemetry-chip" style={{ padding: '8px 16px', background: 'var(--color-surface-container-high)' }}>
            <span className="status-dot"></span>
            <span>GEOFENCE ACTIVE: 150M RADIUS</span>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={() => showToast('Triage feed loaded: 0 critical pipeline faults', 'info')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>tune</span>
            <span>Triage Feed</span>
          </button>
        </div>
      </div>

      {/* Bento 5-Metric Strip */}
      <div className="bento-metrics-grid">
        {/* Metric 1 */}
        <div className="bento-card">
          <div className="bento-top-row">
            <span className="bento-card-title">Clocked In Today</span>
            <div className="bento-card-icon-wrap">
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-secondary)' }}>
                radar
              </span>
            </div>
          </div>
          <div className="bento-card-body">
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="metric-big-num">{studioStats.clockedInCount}</span>
              <span className="metric-sub-label">/ {studioStats.totalEmployees}</span>
            </div>
            <div style={{ color: 'var(--color-secondary-container)', fontSize: '12px', fontWeight: '700', marginTop: '4px' }}>
              {studioStats.occupancyRate}% studio occupancy
            </div>
          </div>
          <div className="bento-card-footer">
            <span>+{studioStats.remoteSyncCount} remote mesh sync</span>
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>verified_user</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bento-card">
          <div className="bento-top-row">
            <span className="bento-card-title">Tasks Due Today</span>
            <div className="bento-card-icon-wrap">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>task_alt</span>
            </div>
          </div>
          <div className="bento-card-body">
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="metric-big-num">{studioStats.tasksDueToday}</span>
              <span className="metric-sub-label">Tasks</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-surface-container)', borderRadius: '999px', marginTop: '8px', overflow: 'hidden' }}>
              <div style={{ width: `${studioStats.tasksCompletionRate}%`, height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
            </div>
          </div>
          <div className="bento-card-footer">
            <span>{studioStats.criticalPathItems} critical path items</span>
            <strong style={{ color: 'var(--color-on-surface)' }}>{studioStats.tasksCompletionRate}%</strong>
          </div>
        </div>

        {/* Metric 3: Monolith Obsidian */}
        <div className="bento-card dark-monolith">
          <div className="bento-top-row">
            <span className="bento-card-title">New Inquiries</span>
            <span className="telemetry-chip" style={{ background: 'var(--color-secondary)', color: '#ffffff' }}>
              3 NEW
            </span>
          </div>
          <div className="bento-card-body">
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="metric-big-num">{studioStats.newBookingsCount}</span>
              <span className="metric-sub-label">Inquiries</span>
            </div>
            <div style={{ color: 'var(--color-secondary-fixed)', fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>
              {studioStats.pipelineValue} Pipeline
            </div>
          </div>
          <div className="bento-card-footer">
            <span>+3 incoming today</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-secondary)' }}>trending_up</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bento-card">
          <div className="bento-top-row">
            <span className="bento-card-title">Active Projects</span>
            <div className="bento-card-icon-wrap">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>view_in_ar</span>
            </div>
          </div>
          <div className="bento-card-body">
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="metric-big-num">{studioStats.activeProjectsCount}</span>
              <span className="metric-sub-label">Live</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
              Commercial & Lab Mesh
            </div>
          </div>
          <div className="bento-card-footer">
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Obsidian, Starlet, Neo
            </span>
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_forward</span>
          </div>
        </div>

        {/* Metric 5: Error Alert */}
        <div className="bento-card alert-card">
          <div className="bento-top-row">
            <span className="bento-card-title">Overdue Tasks</span>
            <span className="telemetry-chip" style={{ background: 'var(--color-error)', color: '#ffffff' }}>
              BLOCKERS
            </span>
          </div>
          <div className="bento-card-body">
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="metric-big-num">{studioStats.overdueTasksCount}</span>
              <span className="metric-sub-label">Blocked</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-on-error-container)', marginTop: '4px' }}>
              Shader memory & legal NDA
            </div>
          </div>
          <div className="bento-card-footer">
            <span
              style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: '700' }}
              onClick={() => showToast('Escalated triage alert dispatched to Studio Lead', 'info')}
            >
              Escalate Triage
            </span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-error)' }}>error</span>
          </div>
        </div>
      </div>

      {/* Two-Column Matrix Layout */}
      <div className="mission-control-two-col">
        {/* Left Column: Studio Pulse Table & Geofence Radar */}
        <div>
          {/* Live Studio Pulse: Who is in */}
          <div className="pulse-table-monolith">
            <div className="pulse-header-row">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="brand-dot"></span>
                  <h2 className="font-headline-sm">Live Studio Pulse: Who is In</h2>
                </div>
                <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '13px', marginTop: '4px' }}>
                  Real-time biometric & geofence network registration
                </p>
              </div>

              <div className="table-filter-pills">
                <button
                  type="button"
                  className={`pulse-filter-btn ${pulseFilter === 'ALL' ? 'active' : ''}`}
                  onClick={() => setPulseFilter('ALL')}
                >
                  All ({employees.length})
                </button>
                <button
                  type="button"
                  className={`pulse-filter-btn ${pulseFilter === 'STUDIO' ? 'active' : ''}`}
                  onClick={() => setPulseFilter('STUDIO')}
                >
                  Studio (4)
                </button>
                <button
                  type="button"
                  className={`pulse-filter-btn ${pulseFilter === 'REMOTE' ? 'active' : ''}`}
                  onClick={() => setPulseFilter('REMOTE')}
                >
                  Remote (2)
                </button>
                <button
                  type="button"
                  className={`pulse-filter-btn ${pulseFilter === 'LEAVE' ? 'active' : ''}`}
                  onClick={() => setPulseFilter('LEAVE')}
                >
                  Leave (1)
                </button>
              </div>
            </div>

            <div className="pulse-table-container">
              <table className="pulse-table">
                <thead>
                  <tr>
                    <th>Specialist</th>
                    <th>Domain Role</th>
                    <th>Clock In</th>
                    <th>Geofence Status</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map(emp => (
                    <tr key={emp.id}>
                      <td>
                        <div className="pulse-specialist-cell">
                          <img src={emp.avatar} alt={emp.name} className="pulse-avatar" />
                          <div>
                            <div className="pulse-specialist-name">{emp.name}</div>
                            <div className="pulse-specialist-code">{emp.code} • {emp.level}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="telemetry-chip">{emp.title}</span>
                      </td>
                      <td>{emp.clockInTime}</td>
                      <td>
                        {emp.geofenceStatus === 'INSIDE_PERIMETER' ? (
                          <span className="accuracy-pill">
                            <span className="status-dot"></span>
                            {emp.hub} • {emp.currentDistanceMeters}m
                          </span>
                        ) : emp.geofenceStatus === 'BREACH_FLAGGED' ? (
                          <span className="accuracy-pill" style={{ background: 'var(--color-error-container)', color: 'var(--color-error)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>warning</span>
                            Out of Bounds ({emp.currentDistanceMeters}m)
                          </span>
                        ) : (
                          <span className="telemetry-chip">
                            Remote Node • {emp.accuracyVariance}
                          </span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-icon"
                          onClick={() => showToast(`Actions for ${emp.name}`, 'info')}
                          aria-label="More actions"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>more_horiz</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tactical Geodesic: Radar Monolith */}
          <GeofenceRadar showSwitcher={true} />
        </div>

        {/* Right Column: Burndown Runtime & Quick Milestones */}
        <div>
          <div className="sprint-velocity-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
                // BURNDOWN RUNTIME
              </span>
              <span className="accuracy-pill">88% TARGET</span>
            </div>
            <h3 className="font-headline-sm" style={{ marginTop: '8px' }}>Sprint Velocity</h3>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '12px' }}>
              Mon–Sun execution schedule vs delivered milestones
            </p>

            <div className="velocity-bar-chart">
              <div className="velocity-bar-column">
                <div className="velocity-bar-fill" style={{ height: '45%' }}></div>
                <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>M</span>
              </div>
              <div className="velocity-bar-column">
                <div className="velocity-bar-fill" style={{ height: '60%' }}></div>
                <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>T</span>
              </div>
              <div className="velocity-bar-column">
                <div className="velocity-bar-fill" style={{ height: '80%' }}></div>
                <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>W</span>
              </div>
              <div className="velocity-bar-column">
                <div className="velocity-bar-fill active" style={{ height: '92%' }}></div>
                <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>T</span>
              </div>
              <div className="velocity-bar-column">
                <div className="velocity-bar-fill primary" style={{ height: '70%' }}></div>
                <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>F</span>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-surface-container-high)', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: 'var(--color-on-surface-variant)' }}>Active Sprints Velocity</span>
              <strong>+3.4% this cycle</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

