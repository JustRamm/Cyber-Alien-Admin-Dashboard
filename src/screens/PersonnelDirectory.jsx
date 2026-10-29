import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/PersonnelDirectory.css';

export const PersonnelDirectory = () => {
  const { employees, addEmployee, showToast } = useApp();
  const navigate = useNavigate();

  const [selectedDiscipline, setSelectedDiscipline] = useState('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // New Employee Form State
  const [newEmpForm, setNewEmpForm] = useState({
    name: '',
    title: '',
    roleCategory: 'Engineering',
    node: 'SFO NODE',
    hub: 'Pier 14 Studio',
    level: 'LEVEL 3 SPECIALIST',
    email: '',
    skills: 'WebGL, Three.js, React'
  });

  const filteredEmployees = employees.filter(emp => {
    if (selectedDiscipline !== 'ALL' && emp.roleCategory !== selectedDiscipline) return false;
    if (
      searchFilter.trim() &&
      !emp.name.toLowerCase().includes(searchFilter.toLowerCase()) &&
      !emp.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
      !emp.code.toLowerCase().includes(searchFilter.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newEmpForm.name || !newEmpForm.title) {
      showToast('Please provide employee name and title', 'error');
      return;
    }
    addEmployee(newEmpForm);
    setIsDrawerOpen(false);
    setNewEmpForm({
      name: '',
      title: '',
      roleCategory: 'Engineering',
      node: 'SFO NODE',
      hub: 'Pier 14 Studio',
      level: 'LEVEL 3 SPECIALIST',
      email: '',
      skills: 'WebGL, Three.js, React'
    });
  };

  return (
    <div className="page-wrapper">
      {/* Top Headline & Actions */}
      <div className="personnel-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot pulse"></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              // TALENT ECOSYSTEM & ORCHESTRATION
            </span>
          </div>
          <h1 className="font-headline-lg">Studio Personnel & Engineering Nodes</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '15px' }}>
            Manage studio craft leads, engineers, and specialists across distributed hubs with verified geofencing telemetry.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="telemetry-chip" style={{ padding: '8px 16px', background: 'var(--color-surface-container)' }}>
            <span className="status-dot"></span>
            <span>28 Syncing • 98.2% Allocation</span>
          </div>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setIsDrawerOpen(true)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person_add</span>
            <span>+ Add New Employee</span>
          </button>
        </div>
      </div>

      {/* Filter & Control Toolbar */}
      <div className="personnel-toolbar-card">
        <div className="personnel-search-row">
          <div className="personnel-search-wrap">
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-on-surface-variant)', fontSize: '20px' }}>
              search
            </span>
            <input
              type="text"
              className="personnel-search-input"
              placeholder="Filter by name, skill, tech stack, email, or node hash..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn-ghost"
            onClick={() => showToast('Roster exported (CSV)', 'info')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>file_download</span>
            <span>Export Roster</span>
          </button>
        </div>

        {/* Discipline Tag Filters */}
        <div className="discipline-chips-row">
          <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)', marginRight: 4 }}>
            Discipline:
          </span>
          {['ALL', 'Engineering', 'Design & Systems', '3D Motion & Spatial'].map(cat => (
            <button
              key={cat}
              type="button"
              className={`discipline-chip-btn ${selectedDiscipline === cat ? 'active' : ''}`}
              onClick={() => setSelectedDiscipline(cat)}
            >
              {cat === 'ALL' ? `All Roles (${employees.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Personnel Grid */}
      <div className="personnel-grid">
        {filteredEmployees.map(emp => {
          const isLead = emp.level.includes('ARCHITECT') || emp.level.includes('DIRECTOR');
          return (
            <div key={emp.id} className={`personnel-card ${isLead ? 'lead-monolith' : ''}`}>
              <div className="personnel-card-header">
                <div className="personnel-avatar-group">
                  <div className="personnel-avatar-wrap">
                    <img src={emp.avatar} alt={emp.name} className="personnel-avatar-img" />
                    <span
                      className="status-dot"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: emp.geofenceStatus === 'INSIDE_PERIMETER' ? '#10b981' : '#f59e0b',
                        border: '2px solid #ffffff'
                      }}
                    ></span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h3 className="personnel-name">{emp.name}</h3>
                      {emp.verified && (
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-secondary)' }}>
                          verified
                        </span>
                      )}
                    </div>
                    <div className="font-label-caps" style={{ color: isLead ? 'var(--color-on-primary-container)' : 'var(--color-on-surface-variant)' }}>
                      {emp.code} • {emp.level}
                    </div>
                  </div>
                </div>

                <span className="accuracy-pill" style={{ background: isLead ? 'var(--color-tertiary-container)' : 'var(--color-surface-container)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>location_on</span>
                  {emp.node}
                </span>
              </div>

              {/* Roles and metrics */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 4 }}>
                <span className="telemetry-chip" style={{ background: isLead ? 'var(--color-tertiary-container)' : 'var(--color-surface-container)', color: isLead ? '#ffffff' : 'var(--color-on-surface)' }}>
                  {emp.title}
                </span>
                <span className="telemetry-chip" style={{ background: 'var(--color-secondary-container)', color: '#ffffff' }}>
                  {emp.onTimeRate} ON-TIME
                </span>
              </div>

              {/* Active Sprint Box */}
              <div className="personnel-sprint-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span className="font-label-caps" style={{ color: isLead ? 'var(--color-on-primary-container)' : 'var(--color-on-surface-variant)' }}>
                    ACTIVE SPRINT
                  </span>
                  <strong>{emp.activeSprint}</strong>
                </div>
                <div style={{ width: '100%', height: 4, backgroundColor: isLead ? 'rgba(255,255,255,0.1)' : 'var(--color-surface-container-high)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${emp.workloadPercent}%`, height: '100%', backgroundColor: 'var(--color-secondary)' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: isLead ? 'var(--color-on-primary-container)' : 'var(--color-on-surface-variant)' }}>
                  <span>Weekly Workload</span>
                  <span>{emp.workloadPercent}% Allocated</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => showToast(`Direct mesh ping sent to ${emp.name}`, 'success')}
                    title="Direct Ping"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>forum</span>
                  </button>
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => showToast(`Workload rebalancer opened for ${emp.name}`, 'info')}
                    title="Reassign Workload"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>sync_alt</span>
                  </button>
                </div>

                <button
                  type="button"
                  className={isLead ? 'btn-ghost' : 'btn-primary'}
                  style={{ padding: '6px 16px', fontSize: '12px', color: isLead ? '#ffffff' : undefined, borderColor: isLead ? 'rgba(255,255,255,0.2)' : undefined }}
                  onClick={() => navigate(`/admin/employee/${emp.id}`)}
                >
                  View Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-over Onboarding Drawer */}
      {isDrawerOpen && (
        <div className="drawer-backdrop" onClick={() => setIsDrawerOpen(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                <div>
                  <div className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                    // TALENT PROVISIONING
                  </div>
                  <h2 className="font-headline-sm" style={{ color: '#ffffff', marginTop: 4 }}>Add New Employee Node</h2>
                </div>
                <button
                  type="button"
                  className="btn-icon"
                  style={{ backgroundColor: 'var(--color-primary-container)', color: '#ffffff' }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="drawer-form-group">
                  <label className="drawer-label">Full Name</label>
                  <input
                    type="text"
                    className="drawer-input"
                    placeholder="e.g. Maya Patel"
                    value={newEmpForm.name}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="drawer-form-group">
                  <label className="drawer-label">Title / Role</label>
                  <input
                    type="text"
                    className="drawer-input"
                    placeholder="e.g. Senior Procedural Artist"
                    value={newEmpForm.title}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, title: e.target.value })}
                    required
                  />
                </div>

                <div className="drawer-form-group">
                  <label className="drawer-label">Discipline Category</label>
                  <select
                    className="drawer-input"
                    value={newEmpForm.roleCategory}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, roleCategory: e.target.value })}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design & Systems">Design & Systems</option>
                    <option value="3D Motion & Spatial">3D Motion & Spatial</option>
                  </select>
                </div>

                <div className="drawer-form-group">
                  <label className="drawer-label">Assigned Hub Node</label>
                  <select
                    className="drawer-input"
                    value={newEmpForm.hub}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, hub: e.target.value })}
                  >
                    <option value="Pier 14 Studio">Pier 14 Studio (San Francisco)</option>
                    <option value="London Soho Hub">London Soho Hub</option>
                    <option value="Tokyo Shibuya Hub">Tokyo Shibuya Hub</option>
                  </select>
                </div>

                <div className="drawer-form-group">
                  <label className="drawer-label">Key Craft Skills (comma-separated)</label>
                  <input
                    type="text"
                    className="drawer-input"
                    placeholder="e.g. GLSL Shaders, WebGPU, Houdini"
                    value={newEmpForm.skills}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, skills: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-secondary"
                  style={{ width: '100%', marginTop: 'var(--space-md)', padding: 12 }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
                  <span>Provision & Onboard Node</span>
                </button>
              </form>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--color-primary-fixed-dim)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
              Onboarding will generate an encrypted cryptographic beacon token and send geofence permission prompts to their registered device.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

