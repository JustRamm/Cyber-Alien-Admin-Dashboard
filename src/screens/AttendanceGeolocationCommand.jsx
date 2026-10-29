import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GeofenceRadar } from '../components/GeofenceRadar';
import '../styles/AttendanceGeolocationCommand.css';

export const AttendanceGeolocationCommand = () => {
  const { employees, studioStats, showToast, setClockInModalOpen } = useApp();
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'table' | 'monthly'
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPunches = employees.filter(emp => {
    if (roleFilter !== 'ALL' && emp.roleCategory !== roleFilter) return false;
    if (statusFilter === 'ON_TIME' && emp.geofenceStatus !== 'INSIDE_PERIMETER') return false;
    if (statusFilter === 'BREACH' && emp.geofenceStatus !== 'BREACH_FLAGGED') return false;
    if (searchQuery.trim() && !emp.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-wrapper">
      {/* Top Command Telemetry Header */}
      <div className="attendance-cmd-header">
        <div className="attendance-cmd-header-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                ADMIN CORE
              </span>
              <span style={{ color: 'var(--color-outline-variant)' }}>//</span>
              <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
                TELEMETRY & GEOLOCATION NODE
              </span>
            </div>
            <h1 className="font-headline-lg">Attendance & Geolocation Telemetry</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => showToast('3 pending punch corrections approved across SFO Node', 'success')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>verified_user</span>
              <span>Approve Pending Corrections</span>
              <span style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff', fontSize: '10px', fontWeight: '800', padding: '2px 6px', borderRadius: '999px', marginLeft: 4 }}>
                3
              </span>
            </button>

            <button
              type="button"
              className="btn-ghost"
              onClick={() => showToast('Exporting attendance ledger to CSV/PDF...', 'info')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>file_download</span>
              <span>Export</span>
            </button>

            {/* View Mode Switcher */}
            <div className="attendance-view-controller">
              <button
                type="button"
                className={`attendance-view-btn ${viewMode === 'split' ? 'active' : ''}`}
                onClick={() => setViewMode('split')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>splitscreen</span>
                <span>Split Map</span>
              </button>
              <button
                type="button"
                className={`attendance-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>table_rows</span>
                <span>Table Only</span>
              </button>
            </div>
          </div>
        </div>

        {/* Telemetry Filter Console */}
        <div className="attendance-filter-console">
          <div className="filter-controls-left">
            <div className="date-range-pill">
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-secondary)' }}>
                date_range
              </span>
              <span>Mar 23 – Mar 29, 2026</span>
              <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)', marginLeft: 6 }}>
                // SPRINT WK 12
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <select
                className="filter-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="ALL">All Roles (18)</option>
                <option value="Engineering">Engineering (8)</option>
                <option value="Design & Systems">Design & Systems (6)</option>
                <option value="3D Motion & Spatial">3D Motion & Spatial (4)</option>
              </select>
              <span className="material-symbols-outlined" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '16px', color: 'var(--color-on-surface-variant)' }}>
                expand_more
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">Status: All Telemetry</option>
                <option value="ON_TIME">On Time (Inside Geofence)</option>
                <option value="BREACH">Outside Bounds (Breaches)</option>
              </select>
              <span className="material-symbols-outlined" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '16px', color: 'var(--color-on-surface-variant)' }}>
                filter_alt
              </span>
            </div>
          </div>

          <div style={{ position: 'relative', minWidth: 260 }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: 'var(--color-on-surface-variant)' }}>
              person_search
            </span>
            <input
              type="text"
              placeholder="Search by name, ID, node..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'var(--color-surface-container-lowest)',
                color: 'var(--color-on-surface)',
                border: 'none',
                outline: 'none',
                padding: '8px 16px 8px 38px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
              }}
            />
          </div>
        </div>
      </div>

      {/* 4-Bento Key Metrics */}
      <div className="attendance-kpi-grid">
        <div className="attendance-kpi-card">
          <div className="bento-top-row">
            <span className="bento-card-title">Total Logged Hours</span>
            <div className="bento-card-icon-wrap">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>timelapse</span>
            </div>
          </div>
          <div style={{ margin: 'var(--space-sm) 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span className="metric-big-num">1,142.5</span>
              <span className="metric-sub-label">hrs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-secondary)', fontSize: '12px', fontWeight: '700', marginTop: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_upward</span>
              <span>+4.2%</span>
              <span style={{ color: 'var(--color-on-surface-variant)', fontWeight: '400' }}>vs Sprint 11 avg</span>
            </div>
          </div>
        </div>

        <div className="attendance-kpi-card">
          <div className="bento-top-row">
            <span className="bento-card-title">Punctuality Adherence</span>
            <div className="bento-card-icon-wrap">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>radar</span>
            </div>
          </div>
          <div style={{ margin: 'var(--space-sm) 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span className="metric-big-num">94.8</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-secondary)' }}>%</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-surface-container)', borderRadius: '999px', marginTop: '10px', overflow: 'hidden' }}>
              <div style={{ width: '94.8%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
            </div>
          </div>
        </div>

        {/* Coral Alert Monolith */}
        <div className="attendance-kpi-card breach-monolith">
          <div className="bento-top-row">
            <span className="bento-card-title" style={{ color: 'var(--color-primary-fixed-dim)' }}>
              Geofence Breaches
            </span>
            <span className="status-dot pulse"></span>
          </div>
          <div style={{ margin: 'var(--space-sm) 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span className="metric-big-num" style={{ color: '#ffffff' }}>03</span>
              <span className="metric-sub-label" style={{ color: 'var(--color-secondary-fixed-dim)' }}>flagged today</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
              <span className="accuracy-pill" style={{ background: 'var(--color-secondary)', color: '#ffffff' }}>
                ACTION REQUIRED
              </span>
              <span className="font-label-caps" style={{ color: 'var(--color-primary-fixed-dim)' }}>Outside 150m hub radius</span>
            </div>
          </div>
        </div>

        <div className="attendance-kpi-card">
          <div className="bento-top-row">
            <span className="bento-card-title">Avg Check-In Time</span>
            <div className="bento-card-icon-wrap">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>alarm_on</span>
            </div>
          </div>
          <div style={{ margin: 'var(--space-sm) 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span className="metric-big-num">09:28</span>
              <span className="metric-sub-label">AM EST</span>
            </div>
            <div style={{ color: 'var(--color-on-surface-variant)', fontSize: '12px', marginTop: '6px' }}>
              Standard threshold: 09:30 AM
            </div>
          </div>
        </div>
      </div>

      {/* Geofence Radar Section */}
      {viewMode === 'split' && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <GeofenceRadar showSwitcher={true} />
        </div>
      )}

      {/* Telemetry Punch Ledger Table */}
      <div className="punch-ledger-monolith">
        <div className="punch-ledger-header">
          <div>
            <h2 className="font-headline-sm">Telemetry Punch Ledger</h2>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '13px' }}>
              Validated hardware punches, cryptographic beacon signatures & perimeter variances.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
              Showing {filteredPunches.length} Active Punch Logs
            </span>
            <button
              type="button"
              className="btn-icon"
              onClick={() => showToast('Refreshed telemetry ledger', 'info')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>refresh</span>
            </button>
          </div>
        </div>

        <div className="ledger-table-wrap">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Employee / Identifier</th>
                <th>Role</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Total</th>
                <th>Verified Address / Node</th>
                <th>Distance</th>
                <th>Variance</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPunches.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={emp.avatar} alt={emp.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--color-on-surface)' }}>{emp.name}</div>
                        <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>{emp.code} // {emp.node}</div>
                      </div>
                    </div>
                  </td>
                  <td>{emp.title}</td>
                  <td style={{ fontWeight: '600' }}>{emp.clockInTime}</td>
                  <td style={{ color: 'var(--color-on-surface-variant)' }}>{emp.clockOutTime}</td>
                  <td style={{ fontWeight: '700' }}>8h 33m</td>
                  <td style={{ color: 'var(--color-on-surface-variant)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {emp.hub} Embarcadero
                  </td>
                  <td>
                    <strong>{emp.currentDistanceMeters}m</strong>
                  </td>
                  <td style={{ color: 'var(--color-on-surface-variant)' }}>{emp.accuracyVariance}</td>
                  <td>
                    {emp.geofenceStatus === 'INSIDE_PERIMETER' ? (
                      <span className="accuracy-pill">
                        <span className="status-dot"></span>
                        ON TIME
                      </span>
                    ) : emp.geofenceStatus === 'BREACH_FLAGGED' ? (
                      <span className="accuracy-pill" style={{ background: 'var(--color-error-container)', color: 'var(--color-error)' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>warning</span>
                        BREACH FLAG
                      </span>
                    ) : (
                      <span className="telemetry-chip">REMOTE SYNC</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => showToast(`Audit details opened for ${emp.name}`, 'info')}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

