import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/ClockOutModal.css';

export const ClockOutModal = () => {
  const {
    isClockOutModalOpen,
    setIsClockOutModalOpen,
    currentUser,
    currentPreset,
    tasks,
    submitDailyWorkLog,
    showToast
  } = useApp();

  const [accomplishments, setAccomplishments] = useState('');
  const [hoursLogged, setHoursLogged] = useState(8);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [blockers, setBlockers] = useState('');

  if (!isClockOutModalOpen) return null;

  // Filter tasks assigned to current user
  const myTasks = tasks.filter(t => t.assignedTo.includes(currentUser.name));

  const toggleTaskSelection = (taskTitle) => {
    if (selectedTasks.includes(taskTitle)) {
      setSelectedTasks(selectedTasks.filter(t => t !== taskTitle));
    } else {
      setSelectedTasks([...selectedTasks, taskTitle]);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!accomplishments.trim()) {
      showToast('Please provide a brief summary of what you accomplished today', 'error');
      return;
    }

    submitDailyWorkLog({
      accomplishments,
      hoursLogged,
      tasksWorkedOn: selectedTasks.length > 0 ? selectedTasks : (myTasks[0] ? [myTasks[0].title] : ['Sprint Development']),
      blockers
    });

    setAccomplishments('');
    setSelectedTasks([]);
    setBlockers('');
  };

  return (
    <div className="clockout-backdrop-overlay" onClick={() => setIsClockOutModalOpen(false)}>
      <div className="clockout-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="clockout-close-btn"
          onClick={() => setIsClockOutModalOpen(false)}
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
        </button>

        {/* Header Block */}
        <div className="clockout-header-block">
          <div className="clockout-badge-row">
            <span className="live-dot pulse" style={{ width: 7, height: 7, backgroundColor: '#f59e0b' }}></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              SHIFT CONCLUSION // DAILY WORK LOG
            </span>
          </div>
          <h2 className="clockout-dialog-title">Daily Work Accomplishment Log</h2>
          <p className="clockout-dialog-subtitle">
            Every team role logs what they completed today before clocking out for transparent sprint velocity.
          </p>

          <div className="clockout-user-strip">
            <img src={currentUser.avatar} alt={currentUser.name} className="clockout-avatar" />
            <div>
              <div className="clockout-user-name">{currentUser.name}</div>
              <div className="clockout-user-role">
                {currentPreset?.roleBadge || 'OPERATIVE'} • {currentUser.title}
              </div>
            </div>
          </div>
        </div>

        {/* Work Log Form */}
        <form onSubmit={handleSubmit} className="clockout-form">
          {/* Accomplishments */}
          <div className="clockout-field-group">
            <div className="clockout-label-row">
              <label htmlFor="clockout-work-input" className="clockout-field-label">
                What did you accomplish today? <span style={{ color: 'var(--color-secondary)' }}>*</span>
              </label>
              <span className="clockout-field-hint">MANDATORY RECORD</span>
            </div>
            <textarea
              id="clockout-work-input"
              rows="3"
              className="clockout-textarea"
              placeholder="e.g. Implemented WebGL shader pass for volumetric fog, resolved Three.js memory leak, and coordinated API buffers in Project Obsidian chat."
              value={accomplishments}
              onChange={(e) => setAccomplishments(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Tasks Progressed */}
          {myTasks.length > 0 && (
            <div className="clockout-field-group">
              <label className="clockout-field-label">Select Sprint Tasks Progressed Today</label>
              <div className="clockout-tasks-chip-grid">
                {myTasks.map((t) => {
                  const isSelected = selectedTasks.includes(t.title);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`clockout-task-chip ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleTaskSelection(t.title)}
                    >
                      <span className="material-symbols-outlined chip-check-icon">
                        {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>{t.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Hours Logged & Blockers Row */}
          <div className="clockout-two-col-row">
            <div className="clockout-field-group">
              <label htmlFor="clockout-hours-input" className="clockout-field-label">Hours Logged Today</label>
              <div className="clockout-pill-input">
                <span className="material-symbols-outlined input-icon">schedule</span>
                <input
                  id="clockout-hours-input"
                  type="number"
                  step="0.5"
                  min="1"
                  max="16"
                  className="clockout-text-input"
                  value={hoursLogged}
                  onChange={(e) => setHoursLogged(e.target.value)}
                />
                <span style={{ fontSize: '12px', color: '#888', fontWeight: 600 }}>hrs</span>
              </div>
            </div>

            <div className="clockout-field-group">
              <label htmlFor="clockout-blockers-input" className="clockout-field-label">Blockers or Notes for Tomorrow</label>
              <div className="clockout-pill-input">
                <span className="material-symbols-outlined input-icon">flag</span>
                <input
                  id="clockout-blockers-input"
                  type="text"
                  className="clockout-text-input"
                  placeholder="None / Awaiting client sign-off"
                  value={blockers}
                  onChange={(e) => setBlockers(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="clockout-actions-row">
            <button
              type="button"
              className="clockout-cancel-btn"
              onClick={() => setIsClockOutModalOpen(false)}
            >
              Cancel & Stay Clocked In
            </button>
            <button
              type="submit"
              className="clockout-submit-btn"
            >
              <span className="live-dot pulse" style={{ width: 6, height: 6, backgroundColor: '#ffffff' }}></span>
              <span>Submit Daily Work Log & Sign Off</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

