import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/NewTaskModal.css';

export const NewTaskModal = () => {
  const {
    isNewTaskModalOpen,
    setIsNewTaskModalOpen,
    projects,
    employees,
    addTask,
    canAssignTasks,
    currentRole
  } = useApp();

  const [title, setTitle] = useState('');
  const [selectedProject, setSelectedProject] = useState(projects[0]?.title || 'Project Obsidian');
  const [assignedMember, setAssignedMember] = useState(employees[0]?.name || 'Alex Mercer');
  const [priority, setPriority] = useState('NORMAL');
  const [columnStatus, setColumnStatus] = useState('BACKLOG');
  const [estimateHours, setEstimateHours] = useState('6');
  const [description, setDescription] = useState('');

  if (!isNewTaskModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (!canAssignTasks) {
      alert('Only Admin (Alex Mercer) has root authority to assign tasks to individual members.');
      return;
    }

    addTask({
      title: title.trim(),
      project: selectedProject,
      assignedTo: assignedMember,
      priority,
      status: columnStatus,
      estimateHours: Number(estimateHours) || 6,
      description
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setIsNewTaskModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsNewTaskModalOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-header-tag">// SPRINT TICKETS • TEAM ASSIGNMENT</div>
            <h2 className="modal-title">Assign New Task</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setIsNewTaskModalOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} id="new-task-form" className="modal-body">
          {!canAssignTasks && (
            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(185, 5, 56, 0.08)', border: '1px solid rgba(185, 5, 56, 0.25)', color: '#b90538', fontSize: '12px', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>shield</span>
              <span><strong>RBAC Policy:</strong> As a {currentRole}, task creation is read-only. Alex Mercer (Admin) holds task assignment authority.</span>
            </div>
          )}

          {/* Task Title */}
          <div className="form-group">
            <label className="form-label">
              <span>Task Objective / Title</span>
              <span style={{ fontSize: '11px', color: '#B90538' }}>Required</span>
            </label>
            <input
              type="text"
              className="form-input-text"
              placeholder="e.g. Optimize WebGL fragment shader for procedural terrain"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Project & Sprint Column */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Associated Project</label>
              <select
                className="form-select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.title}>
                    {proj.title} ({proj.client})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Initial Sprint Column</label>
              <select
                className="form-select"
                value={columnStatus}
                onChange={(e) => setColumnStatus(e.target.value)}
              >
                <option value="BACKLOG">Backlog Queue</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="REVIEW">Review & QA</option>
                <option value="DONE">Delivered / Done</option>
              </select>
            </div>
          </div>

          {/* Member Assignee Radio Picker */}
          <div className="form-group">
            <label className="form-label">
              <span>Assign to Specialist Operative (5 Discrete Roles)</span>
              <span style={{ fontSize: '11px', color: '#888' }}>Individual Assignment</span>
            </label>
            <div className="member-radio-grid">
              {employees.slice(0, 5).map((emp) => {
                const isSelected = assignedMember === emp.name;
                return (
                  <div
                    key={emp.id}
                    className={`member-radio-pill ${isSelected ? 'active' : ''}`}
                    onClick={() => setAssignedMember(emp.name)}
                  >
                    <img src={emp.avatar} alt={emp.name} className="member-pill-avatar" />
                    <div className="member-pill-info">
                      <span className="member-pill-name">{emp.name}</span>
                      <span className="member-pill-role" style={{ color: 'var(--color-secondary)', fontWeight: 700, fontSize: '10.5px' }}>
                        {emp.roleCategory || emp.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Priority & Estimated Hours */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Priority Level</label>
              <div className="priority-pill-row">
                {['NORMAL', 'HIGH', 'CRITICAL'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    className={`priority-chip-btn ${priority === lvl ? `active ${lvl.toLowerCase()}` : ''}`}
                    onClick={() => setPriority(lvl)}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Est. Hours</label>
              <input
                type="number"
                min="1"
                max="100"
                className="form-input-text"
                value={estimateHours}
                onChange={(e) => setEstimateHours(e.target.value)}
              />
            </div>
          </div>

          {/* Scope / Notes */}
          <div className="form-group">
            <label className="form-label">Sprint Notes & Acceptance Criteria</label>
            <textarea
              className="form-textarea"
              placeholder="Outline specific deliverables, benchmark requirements, and pull request checklist..."
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
            onClick={() => setIsNewTaskModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="new-task-form"
            className="btn-modal-submit"
            disabled={!canAssignTasks}
            style={!canAssignTasks ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#B90538' }}></span>
            <span>{canAssignTasks ? 'ASSIGN TICKET →' : 'ADMIN PERMISSION REQUIRED'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

