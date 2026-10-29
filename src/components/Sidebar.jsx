import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/Sidebar.css';

export const Sidebar = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    currentRole,
    currentPreset,
    isSidebarMobileOpen,
    setIsSidebarMobileOpen,
    logout
  } = useApp();

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
        <div className="sidebar-top-section">
          {/* Top Brand Header Block */}
          <div className="sidebar-brand-row">
            <div className="sidebar-brand-left">
              <div className="sidebar-ca-badge">CA</div>
              <div className="sidebar-brand-text">
                <span className="brand-title">CYBER ALIENS</span>
                <span className="brand-subtitle">STUDIO PLATFORM</span>
              </div>
            </div>
            <div className="sidebar-live-badge">
              <span className="live-dot pulse"></span>
              <span>LIVE</span>
            </div>
          </div>

          {/* Navigation Links List */}
          {currentRole === 'ADMIN' ? (
            <nav className="sidebar-nav-list">
              <NavLink
                to="/admin/mission-control"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">grid_view</span>
                  <span className="nav-item-label">Dashboard</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/portal/tasks"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">grid_on</span>
                  <span className="nav-item-label">Projects</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/admin/operations"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">mark_email_unread</span>
                  <span className="nav-item-label">Proposals & Inquiries</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/admin/attendance"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">account_balance_wallet</span>
                  <span className="nav-item-label">Financials & Invoices</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/admin/personnel"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">supervised_user_circle</span>
                  <span className="nav-item-label">Team & Velocity</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/portal/profile"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">inventory_2</span>
                  <span className="nav-item-label">Assets & Deliverables</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/admin/employee/emp-8821"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">tune</span>
                  <span className="nav-item-label">Settings</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>
            </nav>
          ) : (
            <nav className="sidebar-nav-list">
              <NavLink
                to="/portal/home"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">grid_view</span>
                  <span className="nav-item-label">Dashboard</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/portal/tasks"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">grid_on</span>
                  <span className="nav-item-label">Projects</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/portal/attendance"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">account_balance_wallet</span>
                  <span className="nav-item-label">Timesheets & Punches</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/portal/leaves"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">mark_email_unread</span>
                  <span className="nav-item-label">Leave & Time-Off</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/admin/personnel"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">supervised_user_circle</span>
                  <span className="nav-item-label">Team & Velocity</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/portal/profile"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">inventory_2</span>
                  <span className="nav-item-label">Assets & Deliverables</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>

              <NavLink
                to="/setup-wizard"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebarMobile}
              >
                <div className="nav-item-content">
                  <span className="material-symbols-outlined nav-item-icon">tune</span>
                  <span className="nav-item-label">Settings</span>
                </div>
                <span className="nav-active-dot"></span>
              </NavLink>
            </nav>
          )}
        </div>

        {/* Bottom Profile Capsule Card (matching screenshot) */}
        <div className="sidebar-user-capsule">
          <div className="capsule-user-left">
            <div className="capsule-avatar-wrap">
              <span className="material-symbols-outlined capsule-person-icon">person</span>
              <span className="capsule-status-dot"></span>
            </div>
            <div className="capsule-user-text">
              <div className="capsule-user-name">{currentUser.name}</div>
              <div className="capsule-user-title">
                {currentPreset?.roleTitle ? currentPreset.roleTitle.split('&')[0].trim() : (currentUser.title || 'Studio Principal')}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="capsule-action-btn"
            onClick={handleLogout}
            title="Switch Persona / Logout"
            aria-label="Switch Persona / Logout"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>swap_horiz</span>
          </button>
        </div>
      </aside>
    </>
  );
};
