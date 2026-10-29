import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/EmployeeHomeClockIn.css';

export const EmployeeHomeClockIn = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    currentRole,
    currentPreset,
    tasks,
    projects,
    inquiries,
    updateTaskStatus,
    setIsNewTaskModalOpen,
    setIsClockOutModalOpen,
    canAssignTasks,
    showToast
  } = useApp();

  const [taskFilter, setTaskFilter] = useState('ALL');

  // Filter tasks assigned to current user
  const myTasks = tasks.filter(t => t.assignedTo.includes(currentUser.name));

  const filteredTasks = myTasks.filter(task => {
    if (taskFilter === 'ALL') return true;
    return task.status === taskFilter;
  });

  const inProgressCount = myTasks.filter(t => t.status === 'IN_PROGRESS').length;
  const reviewCount = myTasks.filter(t => t.status === 'REVIEW').length;
  const criticalCount = myTasks.filter(t => t.priority === 'CRITICAL').length;

  // Projects relevant to current user
  const myProjects = projects.filter(p =>
    p.title === currentUser.activeSprint ||
    p.leads?.some(lead => lead.toLowerCase().includes(currentUser.name.split(' ')[0].toLowerCase())) ||
    p.discipline?.toLowerCase().includes('webgl') ||
    p.discipline?.toLowerCase().includes('spatial') ||
    p.discipline?.toLowerCase().includes('commercial')
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

  // Role-Specific Configuration
  const isFrontend = currentRole === 'FRONTEND_DEV';
  const isBackend = currentRole === 'BACKEND_DEV';
  const isDesigner = currentRole === 'DESIGNER';
  const isSales = currentRole === 'SALES';
  const isAdmin = currentRole === 'ADMIN';

  return (
    <div className="page-wrapper specialist-dashboard-wrapper">
      {/* 1. Header Welcome Strip (Role-Specific) */}
      <div className="specialist-welcome-strip">
        <div className="specialist-title-col">
          <div className="specialist-node-badge-row">
            <span className="live-dot pulse"></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              {currentPreset?.roleBadge || currentRole} // {isSales ? 'COMMERCIAL PIPELINE' : isDesigner ? 'SPATIAL CRAFT' : isBackend ? 'SYSTEMS ARCHITECTURE' : 'ENGINEERING SPRINT'}
            </span>
            <span className="node-hash-pill">{currentUser.code} • {currentUser.node}</span>
          </div>
          <h1 className="font-headline-lg">Good morning, {currentUser.name.split(' ')[0]}</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '14px', marginTop: 4 }}>
            {currentUser.title} • Active Sprint: <strong style={{ color: 'var(--color-on-surface)' }}>{currentUser.activeSprint}</strong>
          </p>
        </div>

        <div className="specialist-header-actions">
          {/* Clock Out & Log Daily Work CTA */}
          <button
            type="button"
            className="btn-primary"
            style={{ backgroundColor: '#000000', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)' }}
            onClick={() => setIsClockOutModalOpen(true)}
            title="Open Daily Shift Work Log & Clock Out"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#f59e0b' }}>edit_note</span>
            <span>Clock Out & Log Work</span>
          </button>

          {/* Project Chatrooms Shortcut */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/portal/discussions?project=proj-obsidian')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-secondary)' }}>forum</span>
            <span>Project Chatrooms</span>
          </button>

          {/* New Task (Admin can assign to any individual; members create assigned tasks) */}
          {canAssignTasks && (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setIsNewTaskModalOpen(true)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_task</span>
              <span>+ Assign Task</span>
            </button>
          )}

          <button
            type="button"
            className="btn-ghost"
            onClick={() => navigate('/portal/tasks')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>grid_on</span>
            <span>Sprint Board</span>
          </button>
        </div>
      </div>

      {/* 2. Role-Tailored Bento Metric Cards */}
      <div className="specialist-bento-grid">
        {/* Card 1: Role Primary KPI */}
        <div className="spec-metric-card">
          <div className="spec-card-header">
            <span className="spec-card-label">
              {isSales ? 'Commercial Proposals' : isDesigner ? 'Spatial UI Tokens' : isBackend ? 'Backend API Endpoints' : 'Assigned Sprint Tasks'}
            </span>
            <span className="material-symbols-outlined spec-card-icon" style={{ color: 'var(--color-secondary)' }}>
              {isSales ? 'request_quote' : isDesigner ? 'token' : isBackend ? 'api' : 'task_alt'}
            </span>
          </div>
          <div className="spec-card-body">
            <div className="spec-stat-large">
              {isSales ? inquiries.length : myTasks.length}
            </div>
            <div className="spec-stat-sub">
              {isSales ? (
                <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>$348.5k Active Pipeline</span>
              ) : (
                <>
                  <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>{inProgressCount} in progress</span>
                  <span> • {reviewCount} in review</span>
                </>
              )}
            </div>
          </div>
          <div className="spec-card-footer">
            <span>{criticalCount > 0 ? `${criticalCount} critical path priority` : 'Sprint cadence optimal'}</span>
          </div>
        </div>

        {/* Card 2: Role Performance Metric */}
        <div className="spec-metric-card">
          <div className="spec-card-header">
            <span className="spec-card-label">
              {isSales ? 'Deal Win Probability' : isDesigner ? 'Figma Token Parity' : isBackend ? 'Cluster Response Latency' : 'WebGL Frame Budget'}
            </span>
            <span className="material-symbols-outlined spec-card-icon" style={{ color: '#10b981' }}>
              {isSales ? 'trending_up' : isDesigner ? 'sync' : isBackend ? 'speed' : 'desktop_windows'}
            </span>
          </div>
          <div className="spec-card-body">
            <div className="spec-stat-large">
              {isSales ? '84.2%' : isDesigner ? '98.4%' : isBackend ? '14ms' : '16.6ms'}
            </div>
            <div className="spec-progress-bar-wrap">
              <div
                className="spec-progress-bar-fill"
                style={{
                  width: isSales ? '84%' : isDesigner ? '98%' : isBackend ? '92%' : '95%',
                  backgroundColor: '#10b981'
                }}
              ></div>
            </div>
          </div>
          <div className="spec-card-footer">
            <span style={{ color: '#059669', fontWeight: 600 }}>
              {isSales ? '↑ +5.4% conversion rate' : isDesigner ? 'Token sync verified' : isBackend ? 'US-EAST-ALN cluster' : 'Steady 60fps frame rate'}
            </span>
          </div>
        </div>

        {/* Card 3: Quality & Execution Score */}
        <div className="spec-metric-card">
          <div className="spec-card-header">
            <span className="spec-card-label">
              {isSales ? 'RFPs Under Review' : isDesigner ? '3D Asset Fidelity' : isBackend ? 'Microservice Throughput' : 'Code Quality Index'}
            </span>
            <span className="material-symbols-outlined spec-card-icon" style={{ color: '#8b5cf6' }}>
              verified
            </span>
          </div>
          <div className="spec-card-body">
            <div className="spec-stat-large">
              {isSales ? '4 RFPs' : isDesigner ? '99.2%' : isBackend ? '128.4 Gb/s' : `${currentUser.kpis?.codeQuality || 98}%`}
            </div>
            <div className="spec-stat-sub">
              <span>{isSales ? 'Aura Botanica ($120k)' : isBackend ? 'Nominal cluster stream' : '0 blocker faults'}</span>
            </div>
          </div>
          <div className="spec-card-footer">
            <span>Verified in active sprint</span>
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

      {/* 3. Main Two-Column Layout */}
      <div className="specialist-main-grid">
        {/* Left Column: Tasks & Projects */}
        <div className="specialist-left-col">
          {/* Active Tasks Panel */}
          <div className="specialist-panel-card">
            <div className="panel-card-header">
              <div>
                <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                  DAILY PRIORITIES
                </span>
                <h2 className="font-headline-sm" style={{ marginTop: 2 }}>
                  {isSales ? 'Commercial Proposals & RFPs' : 'My Assigned Sprint Tasks'}
                </h2>
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
                  <p>No sprint tasks in this column.</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div key={task.id} className="specialist-task-row">
                    <div className="task-main-col">
                      <div className="task-header-line">
                        <span className="task-project-tag">{task.project}</span>
                        <span className={`task-priority-tag ${task.priority.toLowerCase()}`}>
                          {task.priority}
                        </span>
                      </div>
                      <h3 className="task-title-text">{task.title}</h3>
                      <div className="task-meta-line">
                        <span>{task.loggedHours || 0}h logged of {task.estimateHours}h estimated</span>
                        {task.description && <span> • {task.description}</span>}
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

          {/* Projects Contributing To */}
          <div className="specialist-panel-card" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="panel-card-header">
              <div>
                <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                  COMMERCIAL SPRINT ENGAGEMENTS
                </span>
                <h2 className="font-headline-sm" style={{ marginTop: 2 }}>Projects I'm Crafting On</h2>
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

                  <div className="spec-project-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Leads: {proj.leads.join(', ')}</span>
                    <button
                      type="button"
                      className="spec-chat-link-btn"
                      onClick={() => navigate(`/portal/discussions?project=${proj.id}`)}
                      title="Open project discussion thread"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chat</span>
                      <span>Discuss</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Technical Architecture & Recent Production Activity */}
        <div className="specialist-right-col">
          {/* Craft Skills / Technical Benchmarks */}
          <div className="specialist-panel-card">
            <div className="panel-card-header">
              <div>
                <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                  {isSales ? 'COMMERCIAL COMPETENCIES' : 'TECHNICAL STACK'}
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
                  <span className="material-symbols-outlined skill-chip-icon">
                    {isSales ? 'handshake' : isDesigner ? 'palette' : isBackend ? 'dns' : 'terminal'}
                  </span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            {/* Technical Benchmark Box */}
            <div className="spec-technical-benchmark-box">
              <div className="benchmark-title-row">
                <span className="font-label-caps" style={{ color: '#ffb2b7' }}>
                  {isSales ? 'SALES TELEMETRY' : 'TECHNICAL BENCHMARKS'}
                </span>
                <span className="benchmark-badge">NOMINAL</span>
              </div>
              <div className="benchmark-stats-grid">
                <div>
                  <div className="benchmark-label">{isSales ? 'Pipeline Q2' : isBackend ? 'Cluster Node' : 'Frame Budget'}</div>
                  <div className="benchmark-val">{isSales ? '$348.5k' : isBackend ? 'US-EAST-ALN' : '16.6ms // 60fps'}</div>
                </div>
                <div>
                  <div className="benchmark-label">{isSales ? 'Deals Closed' : isBackend ? 'Stream Speed' : 'GPU Memory'}</div>
                  <div className="benchmark-val">{isSales ? '7 Contracts' : isBackend ? '128.4 Gb/s' : '142MB / 512MB'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Chatrooms Quick Launcher */}
          <div className="specialist-panel-card" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="panel-card-header">
              <div>
                <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                  COLLABORATION
                </span>
                <h3 className="font-headline-sm" style={{ marginTop: 2 }}>Project Chatrooms</h3>
              </div>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--color-on-surface-variant)', lineHeight: 1.45, marginBottom: 14 }}>
              Ask queries about tasks, coordinate API contracts, review design mockups, and get answers from Admin.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {projects.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="quick-chat-nav-row"
                  onClick={() => navigate(`/portal/discussions?project=${p.id}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-secondary)' }}>
                      forum
                    </span>
                    <span style={{ fontWeight: 700, fontSize: '13px' }}>#{p.title}</span>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#888' }}>
                    chevron_right
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
