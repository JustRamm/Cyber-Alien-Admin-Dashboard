import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/EmployeeHomeClockIn.css';

export const EmployeeHomeClockIn = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    currentPreset,
    tasks,
    projects,
    updateTaskStatus,
    setIsNewTaskModalOpen,
    showToast
  } = useApp();

  const [taskFilter, setTaskFilter] = useState('ALL');

  // Filter tasks assigned to current specialist
  const myTasks = tasks.filter(t => t.assignedTo.includes(currentUser.name));

  const filteredTasks = myTasks.filter(task => {
    if (taskFilter === 'ALL') return true;
    return task.status === taskFilter;
  });

  const inProgressCount = myTasks.filter(t => t.status === 'IN_PROGRESS').length;
  const reviewCount = myTasks.filter(t => t.status === 'REVIEW').length;
  const criticalCount = myTasks.filter(t => t.priority === 'CRITICAL').length;

  // Projects relevant to current specialist
  const myProjects = projects.filter(p =>
    p.title === currentUser.activeSprint ||
    p.discipline?.toLowerCase().includes('webgl') ||
    p.discipline?.toLowerCase().includes('spatial') ||
    p.discipline?.toLowerCase().includes('shader')
  ).slice(0, 3);

  const handleQuickAdvance = (task) => {
    let nextStatus = 'IN_PROGRESS';
    if (task.status === 'BACKLOG') nextStatus = 'IN_PROGRESS';
    else if (task.status === 'IN_PROGRESS') nextStatus = 'REVIEW';
    else if (task.status === 'REVIEW') nextStatus = 'DONE';
    else nextStatus = 'DONE';

    updateTaskStatus(task.id, nextStatus);
    showToast(`Task "${task.title}" advanced to ${nextStatus}`, 'success');
  };

  return (
    <div className="page-wrapper specialist-dashboard-wrapper">
      {/* 1. Specialist Header Hero Strip (Zero Radar Attendance) */}
      <div className="specialist-welcome-strip">
        <div className="specialist-title-col">
          <div className="specialist-node-badge-row">
            <span className="live-dot pulse"></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              {currentPreset?.roleBadge || 'SPECIALIST'} // SPRINT CRAFT WORKSPACE
            </span>
            <span className="node-hash-pill">{currentUser.code} • {currentUser.node}</span>
          </div>
          <h1 className="font-headline-lg">Good morning, {currentUser.name.split(' ')[0]}</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '14px', marginTop: 4 }}>
            {currentUser.title} • Active Sprint: <strong style={{ color: 'var(--color-on-surface)' }}>{currentUser.activeSprint}</strong>
          </p>
        </div>

        <div className="specialist-header-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_task</span>
            <span>+ New Task</span>
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/portal/tasks')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>grid_on</span>
            <span>View Kanban Board</span>
          </button>
        </div>
      </div>

      {/* 2. Specialist Craft & Sprint Bento Metric Cards */}
      <div className="specialist-bento-grid">
        {/* Card 1: Assigned Deliverables */}
        <div className="spec-metric-card">
          <div className="spec-card-header">
            <span className="spec-card-label">Assigned Sprint Tickets</span>
            <span className="material-symbols-outlined spec-card-icon" style={{ color: 'var(--color-secondary)' }}>
              task_alt
            </span>
          </div>
          <div className="spec-card-body">
            <div className="spec-stat-large">{myTasks.length}</div>
            <div className="spec-stat-sub">
              <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>{inProgressCount} in progress</span>
              <span> • {reviewCount} in review</span>
            </div>
          </div>
          <div className="spec-card-footer">
            <span>{criticalCount > 0 ? `${criticalCount} critical path priority` : 'Cadence on target'}</span>
          </div>
        </div>

        {/* Card 2: Sprint Velocity */}
        <div className="spec-metric-card">
          <div className="spec-card-header">
            <span className="spec-card-label">Sprint Execution Velocity</span>
            <span className="material-symbols-outlined spec-card-icon" style={{ color: '#10b981' }}>
              speed
            </span>
          </div>
          <div className="spec-card-body">
            <div className="spec-stat-large">{currentUser.kpis?.sprintVelocity || 94}%</div>
            <div className="spec-progress-bar-wrap">
              <div
                className="spec-progress-bar-fill"
                style={{ width: `${currentUser.kpis?.sprintVelocity || 94}%`, backgroundColor: 'var(--color-secondary)' }}
              ></div>
            </div>
          </div>
          <div className="spec-card-footer">
            <span style={{ color: '#059669', fontWeight: 600 }}>↑ +3.2% vs target cycle</span>
          </div>
        </div>

        {/* Card 3: Code & Craft Mastery */}
        <div className="spec-metric-card">
          <div className="spec-card-header">
            <span className="spec-card-label">Craft & Code Quality</span>
            <span className="material-symbols-outlined spec-card-icon" style={{ color: '#8b5cf6' }}>
              verified
            </span>
          </div>
          <div className="spec-card-body">
            <div className="spec-stat-large">{currentUser.kpis?.codeQuality || 98}%</div>
            <div className="spec-stat-sub">
              <span>0 build blockers • 60fps standard</span>
            </div>
          </div>
          <div className="spec-card-footer">
            <span>Verified across active engines</span>
          </div>
        </div>

        {/* Card 4: Active Commercial Sprint */}
        <div className="spec-metric-card highlight-sprint-card">
          <div className="spec-card-header">
            <span className="spec-card-label">Active Sprint Engagement</span>
            <span className="material-symbols-outlined spec-card-icon" style={{ color: '#ffb2b7' }}>
              rocket_launch
            </span>
          </div>
          <div className="spec-card-body">
            <div className="spec-stat-title">{currentUser.activeSprint}</div>
            <div className="spec-stat-sub" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {currentUser.roleCategory} • Milestone Release v3
            </div>
          </div>
          <div className="spec-card-footer" style={{ color: 'rgba(255,255,255,0.85)' }}>
            <span>Target: Sprint Week 12 Final</span>
          </div>
        </div>
      </div>

      {/* 3. Main Two-Column Specialist Content */}
      <div className="specialist-main-grid">
        {/* Left Column: My Active Sprint Priorities & Projects */}
        <div className="specialist-left-col">
          {/* Active Sprint Tickets */}
          <div className="specialist-panel-card">
            <div className="panel-card-header">
              <div>
                <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                  DAILY PRIORITIES
                </span>
                <h2 className="font-headline-sm" style={{ marginTop: 2 }}>My Assigned Sprint Tasks</h2>
              </div>

              {/* Status Filter Tabs */}
              <div className="task-filter-pill-group">
                {['ALL', 'IN_PROGRESS', 'REVIEW', 'BACKLOG'].map((statusKey) => (
                  <button
                    key={statusKey}
                    type="button"
                    className={`task-filter-pill ${taskFilter === statusKey ? 'active' : ''}`}
                    onClick={() => setTaskFilter(statusKey)}
                  >
                    {statusKey === 'ALL' ? 'All' : statusKey.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="specialist-tasks-list">
              {filteredTasks.length === 0 ? (
                <div className="empty-tasks-placeholder">
                  <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-outline)' }}>
                    task_alt
                  </span>
                  <p>No sprint tasks in this column. Create a new task or choose another filter.</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div key={task.id} className="specialist-task-row">
                    <div className="task-main-col">
                      <div className="task-header-line">
                        <span className="task-project-tag">{task.project}</span>
                        <span
                          className={`task-priority-tag ${task.priority.toLowerCase()}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <h3 className="task-title-text">{task.title}</h3>
                      <div className="task-meta-line">
                        <span>{task.loggedHours || 0}h logged of {task.estimateHours}h estimated</span>
                      </div>
                    </div>

                    <div className="task-action-col">
                      <span className={`task-status-chip status-${task.status.toLowerCase()}`}>
                        {task.status.replace('_', ' ')}
                      </span>
                      {task.status !== 'DONE' && (
                        <button
                          type="button"
                          className="task-quick-advance-btn"
                          onClick={() => handleQuickAdvance(task)}
                          title="Advance task to next milestone"
                        >
                          <span>Advance</span>
                          <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_forward</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active Project Engagements */}
          <div className="specialist-panel-card" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="panel-card-header">
              <div>
                <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                  COMMERCIAL SPRINT ENGAGEMENTS
                </span>
                <h2 className="font-headline-sm" style={{ marginTop: 2 }}>Projects I'm Contributing To</h2>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => navigate('/portal/tasks')}
                style={{ fontSize: '12px' }}
              >
                Sprint Board →
              </button>
            </div>

            <div className="specialist-projects-grid">
              {myProjects.map((proj) => (
                <div key={proj.id} className="spec-project-card">
                  <div className="spec-project-top">
                    <div>
                      <div className="spec-project-client">{proj.client}</div>
                      <h4 className="spec-project-title">{proj.title}</h4>
                    </div>
                    <span className="spec-project-discipline">{proj.discipline}</span>
                  </div>

                  <div className="spec-project-progress-wrap">
                    <div className="progress-labels">
                      <span>Delivery Completion</span>
                      <strong>{proj.progressPercent}%</strong>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${proj.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="spec-project-footer">
                    <span>Leads: {proj.leads.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Specialist Craft Competencies & Production Stream */}
        <div className="specialist-right-col">
          {/* Craft Skills & Architecture */}
          <div className="specialist-panel-card">
            <div className="panel-card-header">
              <div>
                <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                  SPECIALIST EXPERTISE
                </span>
                <h3 className="font-headline-sm" style={{ marginTop: 2 }}>Craft Competencies</h3>
              </div>
              <span className="accuracy-pill" style={{ background: 'var(--color-surface-container)' }}>
                {currentUser.level}
              </span>
            </div>

            <div className="specialist-skills-cloud">
              {(currentUser.skills || ['WebGL Shaders', 'Three.js Core', 'WebGPU', 'GLSL Optimization']).map((skill, idx) => (
                <div key={idx} className="spec-skill-chip">
                  <span className="material-symbols-outlined skill-chip-icon">terminal</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            <div className="spec-technical-benchmark-box">
              <div className="benchmark-title-row">
                <span className="font-label-caps" style={{ color: '#ffb2b7' }}>TECHNICAL BENCHMARKS</span>
                <span className="benchmark-badge">NOMINAL</span>
              </div>
              <div className="benchmark-stats-grid">
                <div>
                  <div className="benchmark-label">Frame Budget</div>
                  <div className="benchmark-val">16.6ms // 60fps</div>
                </div>
                <div>
                  <div className="benchmark-label">GPU Memory</div>
                  <div className="benchmark-val">142MB / 512MB</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Sprint Production Stream */}
          <div className="specialist-panel-card" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="panel-card-header">
              <div>
                <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                  PRODUCTION STREAM
                </span>
                <h3 className="font-headline-sm" style={{ marginTop: 2 }}>Recent Sprint Activity</h3>
              </div>
            </div>

            <div className="production-stream-list">
              <div className="stream-item">
                <span className="material-symbols-outlined stream-icon" style={{ color: 'var(--color-secondary)' }}>
                  commit
                </span>
                <div className="stream-content">
                  <div className="stream-text">Shader pipeline optimization deployed to staging build</div>
                  <div className="stream-meta">Today, 10:45 AM • Project Obsidian</div>
                </div>
              </div>

              <div className="stream-item">
                <span className="material-symbols-outlined stream-icon" style={{ color: '#10b981' }}>
                  check_circle
                </span>
                <div className="stream-content">
                  <div className="stream-text">Milestone quality sign-off approved by Creative Lead</div>
                  <div className="stream-meta">Yesterday, 17:15 PM • STARLET 5.0</div>
                </div>
              </div>

              <div className="stream-item">
                <span className="material-symbols-outlined stream-icon" style={{ color: '#8b5cf6' }}>
                  layers
                </span>
                <div className="stream-content">
                  <div className="stream-text">Exported 8K volumetric particle assets to review pipeline</div>
                  <div className="stream-meta">Mar 27 • Chrono Vault</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
