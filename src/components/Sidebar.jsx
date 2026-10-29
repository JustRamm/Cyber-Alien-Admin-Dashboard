import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/Sidebar.css';

export const Sidebar = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    currentRole,
    toggleRole,
    isSidebarMobileOpen,
    setIsSidebarMobileOpen,
    tasks,
    inquiries,
    logout
  } = useApp();

  const pendingInquiriesCount = inquiries.length;
  const activeTasksCount = tasks.filter(t => t.status === 'IN_PROGRESS').length;

  const closeSidebarMobile = () => {
    if (setIsSidebarMobileOpen) {
      setIsSidebarMobileOpen(false);
    }
  };

  const handleLogout = () => {
    closeSidebarMobile();
    logout();
    navigate('/login');
  };

  return (
    <>
      {isSidebarMobileOpen && (
        <div className="sidebar-backdrop" onClick={closeSidebarMobile}></div>
      )}
      <aside className={`sidebar-container ${isSidebarMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Brand & Node telemetry */}
          <div className="sidebar-brand-block">
            <div className="brand-title-row">
              <span className="brand-dot pulse"></span>
              <span className="brand-text">CYBER ALIENS</span>
            </div>
            <span className="brand-subtitle">
              // {currentRole === 'ADMIN' ? 'ADMIN CORE' : 'SPECIALIST PORTAL'}
            </span>
          </div>

          <div className="system-node-pill">
            <span className="material-symbols-outlined node-pulse-icon">sensors</span>
            <span className="node-label">SYS_ONLINE // SFO NODE 01</span>
          </div>

          {/* Nav Links */}
          {currentRole === 'ADMIN' ? (
            <nav className="sidebar-nav">
              <div className="nav-section-title">COMMAND SUITE</div>
              <NavLink
                to="/admin/mission-control"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon">grid_view</span>
                  <span>Mission Control</span>
                </div>
              </NavLink>

              <NavLink
                to="/admin/attendance"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon">location_on</span>
                  <span>Attendance & Radar</span>
                </div>
              </NavLink>

              <NavLink
                to="/admin/operations"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon">tune</span>
                  <span>Studio Operations</span>
                </div>
              </NavLink>

              <NavLink
                to="/admin/personnel"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon">badge</span>
                  <span>Personnel Directory</span>
                </div>
              </NavLink>

              <div className="nav-section-title">WORKFLOWS & SPRINT</div>
              <NavLink
                to="/portal/tasks"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon">assignment</span>
                  <span>Tasks & Sprint Board</span>
                </div>
                <span className="nav-badge">{activeTasksCount}</span>
              </NavLink>

              <NavLink
                to="/admin/employee/emp-8821"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon">admin_panel_settings</span>
                  <span>Admin Control Spec</span>
                </div>
              </NavLink>

              <div className="nav-section-title">SESSION</div>
              <button
                type="button"
                className="nav-item-link sidebar-logout-action"
                onClick={handleLogout}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon" style={{ color: 'var(--color-secondary)' }}>logout</span>
                  <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>Logout</span>
                </div>
              </button>
            </nav>
          ) : (
            <nav className="sidebar-nav">
              <div className="nav-section-title">SPECIALIST WORKSPACE</div>
              <NavLink
                to="/portal/home"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon">home</span>
                  <span>Specialist Hub & Clock</span>
                </div>
              </NavLink>

              <NavLink
                to="/portal/attendance"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon">schedule</span>
                  <span>Timesheets & Punches</span>
                </div>
              </NavLink>

              <NavLink
                to="/portal/tasks"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon">view_kanban</span>
                  <span>My Tasks & Sprint</span>
                </div>
                <span className="nav-badge">{activeTasksCount}</span>
              </NavLink>

              <NavLink
                to="/portal/leaves"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon">event_available</span>
                  <span>Leave & Time-Off</span>
                </div>
              </NavLink>

              <NavLink
                to="/portal/profile"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon">psychology</span>
                  <span>Profile & Skill KPIs</span>
                </div>
              </NavLink>

              <div className="nav-section-title">SESSION</div>
              <button
                type="button"
                className="nav-item-link sidebar-logout-action"
                onClick={handleLogout}
              >
                <div className="nav-link-left">
                  <span className="material-symbols-outlined nav-icon" style={{ color: 'var(--color-secondary)' }}>logout</span>
                  <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>Logout</span>
                </div>
              </button>
            </nav>
          )}
        </div>

        {/* Footer profile & Role Switcher */}
        <div className="sidebar-footer-card">
          <div className="user-profile-row">
            <div className="user-avatar-wrap">
              <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar-img" />
              <div>
                <div className="user-name-text">{currentUser.name}</div>
                <div className="user-role-badge">
                  {currentRole === 'ADMIN' ? 'SUPER ADMIN' : 'STAFF ARCHITECT'}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="sidebar-quick-logout-btn"
              onClick={handleLogout}
              title="Logout / Terminate Session"
              aria-label="Logout"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
            </button>
          </div>

          <button
            type="button"
            className="role-switcher-btn"
            onClick={toggleRole}
            title="Click to toggle between Super Admin and Specialist view"
          >
            <span>Switch to {currentRole === 'ADMIN' ? 'Specialist View' : 'Admin Core'}</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>swap_horiz</span>
          </button>
        </div>
      </aside>
    </>
  );
};

