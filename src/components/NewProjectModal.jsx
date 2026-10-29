import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/NewTaskModal.css';
import '../styles/NewProjectModal.css';

export const NewProjectModal = () => {
  const {
    isNewProjectModalOpen,
    setIsNewProjectModalOpen,
    employees,
    addProject
  } = useApp();

  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [discipline, setDiscipline] = useState('WebGL & Shaders');
  const [budgetUSD, setBudgetUSD] = useState('$120,000');
  const [etaDate, setEtaDate] = useState('End Q2 2026');
  const [status, setStatus] = useState('IN_PROGRESS');
  const [health, setHealth] = useState('OPTIMAL');
  const [selectedLeads, setSelectedLeads] = useState(['Alex M.', 'Marcus V.']);
  const [description, setDescription] = useState('');

  if (!isNewProjectModalOpen) return null;

  const disciplines = [
    'WebGL & Shaders',
    '3D Motion & Spatial',
    'VisionOS UI & Tokens',
    'Unreal Engine 5',
    'Transmedia EdTech',
    'Rust / Wasm DSP'
  ];

  const candidateLeads = [
    { id: 'alex', label: 'Alex M.' },
    { id: 'sarah', label: 'Sarah J.' },
    { id: 'marcus', label: 'Marcus V.' },
    { id: 'kenji', label: 'Kenji T.' },
    { id: 'elena', label: 'Elena R.' }
  ];

  const toggleLead = (leadLabel) => {
    if (selectedLeads.includes(leadLabel)) {
      if (selectedLeads.length > 1) {
        setSelectedLeads(selectedLeads.filter(l => l !== leadLabel));
      }
    } else {
      setSelectedLeads([...selectedLeads, leadLabel]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !client.trim()) return;

    addProject({
      title: title.trim(),
      client: client.trim(),
      discipline,
      budgetUSD,
      etaDate,
      status,
      health,
      leads: selectedLeads,
      progressPercent: 12,
      description
    });

    // Reset and close
    setTitle('');
    setClient('');
    setDescription('');
    setIsNewProjectModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsNewProjectModalOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-header-tag">// CLIENT ENGAGEMENT • SPRINT PROVISIONING</div>
            <h2 className="modal-title">Initialize New Project</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setIsNewProjectModalOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} id="new-project-form" className="modal-body">
          {/* Project Title & Client Name */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">
                <span>Project Name</span>
                <span style={{ fontSize: '11px', color: '#B90538' }}>Required</span>
              </label>
              <input
                type="text"
                className="form-input-text"
                placeholder="e.g. Project Aethelgard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Client / Partner</span>
                <span style={{ fontSize: '11px', color: '#B90538' }}>Required</span>
              </label>
              <input
                type="text"
                className="form-input-text"
                placeholder="e.g. Aethelgard Spatial Inc."
                value={client}
                onChange={(e) => setClient(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Discipline Tags */}
          <div className="form-group">
            <label className="form-label">Primary Discipline</label>
            <div className="discipline-tags-row">
              {disciplines.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`discipline-tag-chip ${discipline === d ? 'active' : ''}`}
                  onClick={() => setDiscipline(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Project Leads */}
          <div className="form-group">
            <label className="form-label">
              <span>Sprint Craft Leads</span>
              <span style={{ fontSize: '11px', color: '#888' }}>Select 1 or more</span>
            </label>
            <div className="leads-selection-row">
              {candidateLeads.map((cand) => {
                const isActive = selectedLeads.includes(cand.label);
                return (
                  <div
                    key={cand.id}
                    className={`lead-checkbox-pill ${isActive ? 'active' : ''}`}
                    onClick={() => toggleLead(cand.label)}
                  >
                    <span>{isActive ? '✓' : '+'}</span>
                    <span>{cand.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Budget & Target Delivery */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Authorized Contract (USD)</label>
              <input
                type="text"
                className="form-input-text"
                placeholder="$95,000"
                value={budgetUSD}
                onChange={(e) => setBudgetUSD(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Delivery / Sprint ETA</label>
              <input
                type="text"
                className="form-input-text"
                placeholder="End Q2 2026"
                value={etaDate}
                onChange={(e) => setEtaDate(e.target.value)}
              />
            </div>
          </div>

          {/* Health & Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Initial Health Status</label>
              <select
                className="form-select"
                value={health}
                onChange={(e) => setHealth(e.target.value)}
              >
                <option value="OPTIMAL">OPTIMAL (Nominal)</option>
                <option value="NEEDS_ATTENTION">NEEDS_ATTENTION</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Workflow Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="PLANNING">PLANNING</option>
                <option value="CLIENT_REVIEW">CLIENT_REVIEW</option>
              </select>
            </div>
          </div>

          {/* Scope description */}
          <div className="form-group">
            <label className="form-label">Deliverable Scope & Brief</label>
            <textarea
              className="form-textarea"
              placeholder="High-density spatial compute explorer with real-time GLSL noise simulations and procedural voxel mesh..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal-cancel"
            onClick={() => setIsNewProjectModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="new-project-form"
            className="btn-modal-submit"
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#B90538' }}></span>
            <span>LAUNCH PROJECT →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
