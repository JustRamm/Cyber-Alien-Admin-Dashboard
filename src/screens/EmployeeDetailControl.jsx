import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/EmployeeDetailControl.css';

export const EmployeeDetailControl = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, tasks, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('telemetry'); // telemetry | sprints | kpis | security

  const employee = employees.find(e => e.id === id || e.code === id) || employees[0];
  const assignedTasks = tasks.filter(t => t.assignedTo.includes(employee.name));

  return (
    <div className="page-wrapper">
      {/* Back button */}
      <button
        type="button"
        className="btn-ghost"
        style={{ marginBottom: 'var(--space-md)' }}
        onClick={() => navigate('/admin/personnel')}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
        <span>Back to Personnel Roster</span>
      </button>

      {/* Hero Header Monolith */}
      <div className="emp-detail-hero">
        <div className="emp-detail-hero-content">
          <div className="emp-hero-left">
            <img src={employee.avatar} alt={employee.name} className="emp-hero-avatar" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 className="font-headline-lg" style={{ color: '#ffffff' }}>{employee.name}</h1>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--color-secondary)' }}>
                  verified
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 4 }}>
                <span className="telemetry-chip live" style={{ background: 'var(--color-secondary-container)' }}>
                  {employee.level}
                </span>
                <span className="font-label-caps" style={{ color: 'var(--color-primary-fixed-dim)' }}>
                  {employee.code} // {employee.node}
                </span>
              </div>
              <div style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '13px', marginTop: 6 }}>
                {employee.title} • {employee.email}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ backgroundColor: 'var(--color-primary-container)', border: '1px solid rgba(255,255,255,0.2)' }}
              onClick={() => showToast(`Audit token refreshed for ${employee.name}`, 'info')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>key</span>
              <span>Generate Audit Token</span>
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => showToast(`Permissions updated for ${employee.name}`, 'success')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>security</span>
              <span>Edit Permissions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="emp-detail-tabs-nav">
        <button
          type="button"
          className={`emp-tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
          onClick={() => setActiveTab('telemetry')}
        >
          Telemetry & Attendance
        </button>
        <button
          type="button"
          className={`emp-tab-btn ${activeTab === 'sprints' ? 'active' : ''}`}
          onClick={() => setActiveTab('sprints')}
        >
          Sprints & Assigned Tasks ({assignedTasks.length})
        </button>
        <button
          type="button"
          className={`emp-tab-btn ${activeTab === 'kpis' ? 'active' : ''}`}
          onClick={() => setActiveTab('kpis')}
        >
          Craft Mastery & KPIs
        </button>
        <button
          type="button"
          className={`emp-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security & Hardware Keys
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'telemetry' && (
        <div className="emp-detail-grid">
          <div className="emp-info-card">
            <h3 className="font-headline-sm" style={{ marginBottom: 'var(--space-md)' }}>
              Geofence & Hardware Punch Telemetry
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
              <div style={{ background: 'var(--color-surface-container-low)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Last Clock In</div>
                <div style={{ fontSize: '18px', fontWeight: '800', marginTop: 4 }}>{employee.clockInTime}</div>
                <div style={{ fontSize: '11px', color: '#059669', marginTop: 2 }}>Pier 14 Studio</div>
              </div>
              <div style={{ background: 'var(--color-surface-container-low)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Current Variance</div>
                <div style={{ fontSize: '18px', fontWeight: '800', marginTop: 4 }}>{employee.currentDistanceMeters}m</div>
                <div style={{ fontSize: '11px', color: 'var(--color-secondary)', marginTop: 2 }}>{employee.accuracyVariance}</div>
              </div>
              <div style={{ background: 'var(--color-surface-container-low)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Punctuality Rate</div>
                <div style={{ fontSize: '18px', fontWeight: '800', marginTop: 4 }}>{employee.onTimeRate}</div>
                <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: 2 }}>30-day index</div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-md)', background: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: '700', marginBottom: 4 }}>Hardware Beacon Binding</div>
              <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '13px' }}>
                Bound to Apple Silicon Secure Enclave via ARUBA_PIER14_PRO_04 mesh. Cryptographic signature verified against node consensus.
              </p>
            </div>
          </div>

          <div className="emp-info-card">
            <h3 className="font-headline-sm" style={{ marginBottom: 'var(--space-md)' }}>
              Assigned Craft Skills
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {employee.skills.map((skill, i) => (
                <span key={i} className="telemetry-chip" style={{ background: 'var(--color-surface-container-high)', fontSize: '12px' }}>
                  {skill}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-surface-container-high)' }}>
              <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Weekly Allocation</div>
              <div style={{ fontSize: '24px', fontWeight: '800', margin: '4px 0' }}>{employee.workloadPercent}%</div>
              <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-container)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${employee.workloadPercent}%`, height: '100%', backgroundColor: 'var(--color-secondary)' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sprints' && (
        <div className="emp-info-card">
          <h3 className="font-headline-sm" style={{ marginBottom: 'var(--space-md)' }}>
            Active Tasks for {employee.name}
          </h3>
          {assignedTasks.length === 0 ? (
            <p style={{ color: 'var(--color-on-surface-variant)' }}>No active sprint tickets assigned.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {assignedTasks.map(task => (
                <div key={task.id} style={{ background: 'var(--color-surface-container-low)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '14px' }}>{task.title}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: 2 }}>{task.project}</div>
                  </div>
                  <span className="accuracy-pill">{task.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'kpis' && (
        <div className="emp-info-card">
          <h3 className="font-headline-sm" style={{ marginBottom: 'var(--space-md)' }}>
            Quarterly Performance Matrix
          </h3>
          <div className="kpi-metric-row">
            <span>Sprint Velocity Index</span>
            <strong>{employee.kpis.sprintVelocity} / 100</strong>
          </div>
          <div className="kpi-metric-row">
            <span>Code / Architecture Review Score</span>
            <strong>{employee.kpis.codeQuality} / 100</strong>
          </div>
          <div className="kpi-metric-row">
            <span>Studio Mentorship Hours</span>
            <strong>{employee.kpis.mentorshipHours} hrs</strong>
          </div>
          <div className="kpi-metric-row">
            <span>Speculative Innovation Index</span>
            <strong style={{ color: 'var(--color-secondary)' }}>{employee.kpis.innovationIndex} / 100</strong>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="emp-info-card">
          <h3 className="font-headline-sm" style={{ marginBottom: 'var(--space-md)' }}>
            Security, Passkeys & Hardware MFA
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ padding: 'var(--space-md)', background: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-md)' }}>
              <strong>FIDO2 / WebAuthn Passkey:</strong> Enabled (MacBook Pro M3 Max)
            </div>
            <div style={{ padding: 'var(--space-md)', background: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-md)' }}>
              <strong>WireGuard Mesh Node:</strong> Allowed (Peer 10.88.14.2)
            </div>
            <button
              type="button"
              className="btn-secondary"
              style={{ width: 'fit-content' }}
              onClick={() => showToast('Revocation initiated: node will require re-authentication', 'error')}
            >
              Revoke Session & Force Re-Auth
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

