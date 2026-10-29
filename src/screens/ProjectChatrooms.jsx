import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/ProjectChatrooms.css';

export const ProjectChatrooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentUser,
    currentRole,
    currentPreset,
    projects,
    tasks,
    projectChats,
    addProjectMessage,
    showToast
  } = useApp();

  const selectedProjectId = searchParams.get('project') || projects[0]?.id || 'proj-obsidian';
  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const [messageInput, setMessageInput] = useState('');
  const [selectedTaskLink, setSelectedTaskLink] = useState('');
  const messagesEndRef = useRef(null);

  const activeMessages = projectChats[selectedProjectId] || [];
  const projectTasks = tasks.filter(t => t.project === activeProject.title);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages.length, selectedProjectId]);

  const handleSelectProject = (projId) => {
    setSearchParams({ project: projId });
    setSelectedTaskLink('');
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!messageInput.trim()) return;

    addProjectMessage(selectedProjectId, messageInput.trim(), selectedTaskLink || null);
    setMessageInput('');
    setSelectedTaskLink('');
  };

  const insertMention = (mentionTag) => {
    setMessageInput(prev => `${prev} ${mentionTag} `.trimStart());
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'ADMIN': return '#B90538';
      case 'FRONTEND_DEV': return '#06B6D4';
      case 'BACKEND_DEV': return '#8B5CF6';
      case 'DESIGNER': return '#10B981';
      case 'SALES': return '#F59E0B';
      default: return '#666660';
    }
  };

  return (
    <div className="page-wrapper project-chatrooms-page">
      {/* Header Row */}
      <div className="chatrooms-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-dot pulse"></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              PROJECT DISCUSSIONS & QUERY ENCLAVE
            </span>
          </div>
          <h1 className="font-headline-lg">Project Discussion Chatrooms</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '14px', marginTop: 2 }}>
            Real-time queries between Frontend, Backend, Designer, Sales, and Admin across active project deliverables.
          </p>
        </div>

        <div className="chatrooms-user-pill">
          <img src={currentUser.avatar} alt={currentUser.name} className="chatrooms-user-avatar" />
          <div>
            <div style={{ fontSize: '12.5px', fontWeight: 700 }}>{currentUser.name}</div>
            <div style={{ fontSize: '10.5px', color: 'var(--color-secondary)', fontWeight: 600 }}>
              {currentPreset?.roleBadge || currentRole}
            </div>
          </div>
        </div>
      </div>

      {/* Project Selector Tab Strip */}
      <div className="project-tabs-strip">
        {projects.map((proj) => {
          const isSelected = proj.id === selectedProjectId;
          const msgCount = (projectChats[proj.id] || []).length;
          return (
            <button
              key={proj.id}
              type="button"
              className={`project-tab-pill ${isSelected ? 'active' : ''}`}
              onClick={() => handleSelectProject(proj.id)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>folder</span>
              <span>{proj.title}</span>
              <span className="tab-msg-count">{msgCount}</span>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Chat Grid */}
      <div className="chatrooms-grid">
        {/* Left: Chat Stream & Composer */}
        <div className="chatroom-main-panel">
          {/* Room Banner */}
          <div className="chatroom-banner">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 className="chatroom-banner-title">#{activeProject.title} Discussion</h2>
                <span className="chatroom-client-tag">{activeProject.client}</span>
              </div>
              <div className="chatroom-banner-sub">
                Discipline: <strong>{activeProject.discipline}</strong> • Leads: {activeProject.leads.join(', ')}
              </div>
            </div>

            <div className="chatroom-channel-status">
              <span className="live-dot pulse" style={{ width: 6, height: 6, backgroundColor: '#10b981' }}></span>
              <span>LIVE MESH THREAD</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="chatroom-messages-stream">
            {activeMessages.length === 0 ? (
              <div className="empty-thread-placeholder">
                <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--color-outline)' }}>
                  chat_bubble_outline
                </span>
                <p>No queries posted in this project chatroom yet.</p>
                <span>Ask a question or tag a teammate below to start collaborating!</span>
              </div>
            ) : (
              activeMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                const roleBadgeColor = getRoleBadgeColor(msg.role);
                return (
                  <div key={msg.id} className={`chat-message-bubble ${isMe ? 'my-message' : ''}`}>
                    <img src={msg.avatar} alt={msg.senderName} className="msg-sender-avatar" />
                    <div className="msg-content-block">
                      <div className="msg-header-line">
                        <span className="msg-sender-name">{msg.senderName}</span>
                        <span
                          className="msg-role-pill"
                          style={{
                            backgroundColor: `${roleBadgeColor}15`,
                            color: roleBadgeColor,
                            borderColor: `${roleBadgeColor}35`
                          }}
                        >
                          {msg.roleTitle || msg.role}
                        </span>
                        <span className="msg-time">{msg.timestamp}</span>
                      </div>

                      {/* Linked Task Tag if present */}
                      {msg.taskTitle && (
                        <div className="msg-task-link-chip">
                          <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>task_alt</span>
                          <span>Regarding Task: {msg.taskTitle}</span>
                        </div>
                      )}

                      <div className="msg-text-body">{msg.text}</div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Query Composer Box */}
          <form onSubmit={handleSendMessage} className="chatroom-composer-form">
            {/* Quick Mentions & Task Link Row */}
            <div className="composer-tool-row">
              <div className="mention-chips-row">
                <span className="composer-tool-label">Quick Tag:</span>
                <button type="button" className="composer-mention-chip" onClick={() => insertMention('@Admin')}>
                  @Admin
                </button>
                <button type="button" className="composer-mention-chip" onClick={() => insertMention('@Frontend')}>
                  @Frontend
                </button>
                <button type="button" className="composer-mention-chip" onClick={() => insertMention('@Backend')}>
                  @Backend
                </button>
                <button type="button" className="composer-mention-chip" onClick={() => insertMention('@Designer')}>
                  @Designer
                </button>
                <button type="button" className="composer-mention-chip" onClick={() => insertMention('@Sales')}>
                  @Sales
                </button>
              </div>

              {/* Task Linker Dropdown */}
              {projectTasks.length > 0 && (
                <div className="composer-task-linker">
                  <span className="material-symbols-outlined" style={{ fontSize: '15px', color: '#888' }}>link</span>
                  <select
                    className="task-linker-select"
                    value={selectedTaskLink}
                    onChange={(e) => setSelectedTaskLink(e.target.value)}
                  >
                    <option value="">Link a sprint task (Optional)...</option>
                    {projectTasks.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.id}: {t.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Input Row */}
            <div className="composer-input-row">
              <input
                type="text"
                className="composer-input-field"
                placeholder={`Ask a query or update team on #${activeProject.title}...`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                required
              />
              <button
                type="submit"
                className="composer-send-btn"
                title="Dispatch Query"
              >
                <span>Dispatch</span>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Project Context & Linked Backlog Tasks */}
        <div className="chatroom-sidebar-panel">
          {/* Project Overview Card */}
          <div className="chat-side-card">
            <h3 className="side-card-title">Project Telemetry</h3>
            <div className="side-metric-item">
              <span className="side-metric-label">Client</span>
              <strong className="side-metric-val">{activeProject.client}</strong>
            </div>
            <div className="side-metric-item">
              <span className="side-metric-label">Discipline</span>
              <span className="side-metric-val">{activeProject.discipline}</span>
            </div>
            <div className="side-metric-item">
              <span className="side-metric-label">Delivery Health</span>
              <span className="accuracy-pill" style={{ background: '#ecfdf5', color: '#047857' }}>
                ✓ {activeProject.health}
              </span>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-on-surface-variant)', marginBottom: 4 }}>
                <span>Milestone Progress</span>
                <strong>{activeProject.progressPercent}%</strong>
              </div>
              <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-container)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${activeProject.progressPercent}%`, height: '100%', backgroundColor: 'var(--color-secondary)' }}></div>
              </div>
            </div>
          </div>

          {/* Linked Tasks on this Project */}
          <div className="chat-side-card" style={{ marginTop: 'var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h3 className="side-card-title">Sprint Tickets ({projectTasks.length})</h3>
              <span style={{ fontSize: '10px', color: 'var(--color-secondary)', fontWeight: 700 }}>CLICK TO TAG</span>
            </div>

            <div className="side-tasks-list">
              {projectTasks.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', padding: '8px 0' }}>
                  No tasks assigned to this project yet.
                </div>
              ) : (
                projectTasks.map((t) => (
                  <div
                    key={t.id}
                    className="side-task-item"
                    onClick={() => {
                      setSelectedTaskLink(t.id);
                      setMessageInput(prev => `${prev} Regarding #${t.id}: `.trimStart());
                      showToast(`Tagged task #${t.id} in query input`, 'info');
                    }}
                    title="Click to tag in discussion"
                  >
                    <div>
                      <div className="side-task-title">{t.title}</div>
                      <div className="side-task-assigned">Assigned to: {t.assignedTo}</div>
                    </div>
                    <span className={`side-task-status status-${t.status.toLowerCase()}`}>
                      {t.status.replace('_', ' ')}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

