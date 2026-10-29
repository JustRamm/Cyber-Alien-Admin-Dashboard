import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/TasksSprintBoard.css';

export const TasksSprintBoard = () => {
  const navigate = useNavigate();
  const {
    tasks,
    projects,
    updateTaskStatus,
    deleteTask,
    canAssignTasks,
    canDeleteTasks,
    currentRole,
    setIsNewTaskModalOpen,
    setIsNewProjectModalOpen,
    showToast
  } = useApp();
  const [projectFilter, setProjectFilter] = useState('ALL');

  const filteredTasks = tasks.filter(t => {
    if (projectFilter !== 'ALL' && t.project !== projectFilter) return false;
    return true;
  });

  const columns = [
    { key: 'BACKLOG', label: 'Backlog Queue' },
    { key: 'IN_PROGRESS', label: 'In Progress' },
    { key: 'REVIEW', label: 'Review & QA' },
    { key: 'DONE', label: 'Delivered / Done' }
  ];

  const moveTask = (taskId, direction) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const colOrder = ['BACKLOG', 'IN_PROGRESS', 'REVIEW', 'DONE'];
    const currentIndex = colOrder.indexOf(task.status);
    const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (targetIndex >= 0 && targetIndex < colOrder.length) {
      updateTaskStatus(taskId, colOrder[targetIndex]);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="kanban-header-strip">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot"></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              SPRINT CYCLE 09 // Q1 2026
            </span>
          </div>
          <h1 className="font-headline-lg">Tasks & Sprint Board</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '15px' }}>
            Active engineering sprints, shader milestones, and client review tickets.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-outline-variant)', background: 'var(--color-surface-container-low)', fontSize: '13px' }}
          >
            <option value="ALL">All Projects ({tasks.length} tasks)</option>
            {projects.map(p => (
              <option key={p.id} value={p.title}>{p.title}</option>
            ))}
          </select>

          <button
            type="button"
            className="btn-ghost"
            onClick={() => setIsNewProjectModalOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>create_new_folder</span>
            <span>+ New Project</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsNewTaskModalOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_task</span>
            <span>+ New Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="kanban-columns-grid">
        {columns.map(col => {
          const colTasks = filteredTasks.filter(t => t.status === col.key);
          return (
            <div key={col.key} className="kanban-col">
              <div className="kanban-col-header">
                <span className="kanban-col-title">{col.label}</span>
                <span className="accuracy-pill" style={{ fontSize: '11px', padding: '2px 8px' }}>
                  {colTasks.length}
                </span>
              </div>

              {colTasks.map(task => (
                <div key={task.id} className="kanban-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-label-caps" style={{ color: 'var(--color-secondary)', fontSize: '10px' }}>
                      {task.project}
                    </span>
                    <span
                      className="accuracy-pill"
                      style={{
                        fontSize: '9px',
                        padding: '2px 6px',
                        background: task.priority === 'CRITICAL' ? 'var(--color-error-container)' : 'var(--color-surface-container)',
                        color: task.priority === 'CRITICAL' ? 'var(--color-error)' : 'var(--color-on-surface)'
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className="kanban-card-title">{task.title}</div>

                  <div className="kanban-card-footer">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 600 }}>{task.assignedTo}</span>
                      {task.role && (
                        <span style={{ fontSize: '9px', padding: '1px 5px', borderRadius: 4, background: 'var(--color-surface-container)', color: 'var(--color-on-surface-variant)', fontWeight: 700 }}>
                          {task.role.split('_')[0]}
                        </span>
                      )}
                    </div>

                    <div className="kanban-move-group">
                      <button
                        type="button"
                        className="kanban-move-btn"
                        onClick={() => navigate(`/portal/discussions?project=${encodeURIComponent(task.project)}`)}
                        title={`Discuss in #${task.project} Chatroom`}
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chat</span>
                      </button>

                      {canDeleteTasks && (
                        <button
                          type="button"
                          className="kanban-move-btn"
                          onClick={() => {
                            if (window.confirm(`Delete task "${task.title}"?`)) {
                              deleteTask(task.id);
                            }
                          }}
                          title="Delete Ticket (Admin Only)"
                          style={{ color: 'var(--color-error)' }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>delete_outline</span>
                        </button>
                      )}

                      {col.key !== 'BACKLOG' && (
                        <button
                          type="button"
                          className="kanban-move-btn"
                          onClick={() => moveTask(task.id, 'prev')}
                          title="Move Left"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
                        </button>
                      )}
                      {col.key !== 'DONE' && (
                        <button
                          type="button"
                          className="kanban-move-btn"
                          onClick={() => moveTask(task.id, 'next')}
                          title="Move Right"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

