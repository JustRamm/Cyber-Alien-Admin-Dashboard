import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/Header.css';

export const Header = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    currentRole,
    currentPreset,
    studioStats,
    isClockedIn,
    setClockInModalOpen,
    isSidebarMobileOpen,
    setIsSidebarMobileOpen,
    showToast,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    logout
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileSidebar = () => {
    setIsSidebarMobileOpen(!isSidebarMobileOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      showToast(`Query telemetry initiated: "${searchTerm}"`, 'info');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header-container">
      {/* Left side: Mobile Toggle + Telemetry & Search */}
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={toggleMobileSidebar}
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="header-mobile-brand">
          <img src="/brand-logo.png" alt="Brand Logo" className="header-mobile-brand-img" />
        </div>

        <div className="header-telemetry-badge">
          <div className="telemetry-item">
            <span className="material-symbols-outlined telemetry-icon-red">satellite_alt</span>
            <span className="font-label-caps">LATENCY: {studioStats.latencyMs}MS</span>
          </div>
          <div className="telemetry-divider"></div>
          <div className="telemetry-item">
            <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>memory</span>
            <span className="font-label-caps">CLUSTER: {studioStats.cluster}</span>
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="header-search-box">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>search</span>
          <input
            type="text"
            className="header-search-input"
            placeholder="Global telemetry search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="kbd-chip">⌘K</span>
        </form>
      </div>

      {/* Right side: Clock-in CTA (Admin only), Notifications, Profile Avatar Dropdown */}
      <div className="header-right">
        {currentRole === 'ADMIN' ? (
          <button
            type="button"
            className={`clock-punch-header-btn ${isClockedIn ? 'clocked-in' : 'clocked-out'}`}
            onClick={() => setClockInModalOpen(true)}
            title="Open Geofence & Punch Verification dialog"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              {isClockedIn ? 'radar' : 'fingerprint'}
            </span>
            <span>{isClockedIn ? 'Geofence Active' : 'Punch Clock-In'}</span>
          </button>
        ) : (
          <div className="header-specialist-sprint-pill">
            <span className="live-dot pulse" style={{ width: 6, height: 6, backgroundColor: '#10b981' }}></span>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
              {currentUser.activeSprint || 'SPRINT ACTIVE'}
            </span>
          </div>
        )}

        {/* Interactive Notifications Trigger & Flyout */}
        <div className="header-notifications-container" ref={notifRef}>
          <button
            type="button"
            className="notifications-trigger"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="Notifications"
            title={`${unreadNotificationsCount} unread studio notifications`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
            {unreadNotificationsCount > 0 ? (
              <span className="notification-count-badge">{unreadNotificationsCount}</span>
            ) : (
              <span className="notification-dot" style={{ backgroundColor: '#10b981' }}></span>
            )}
          </button>

          {notificationsOpen && (
            <div className="header-notifications-flyout">
              <div className="notif-flyout-header">
                <span className="notif-flyout-title">Notifications ({unreadNotificationsCount})</span>
                {unreadNotificationsCount > 0 && (
                  <button
                    type="button"
                    className="notif-flyout-mark-read"
                    onClick={markAllNotificationsAsRead}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="notif-flyout-list">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    className={`notif-flyout-item ${notif.unread ? 'unread' : ''}`}
                    onClick={() => {
                      markNotificationAsRead(notif.id);
                      setNotificationsOpen(false);
                      if (notif.actionRoute) {
                        navigate(notif.actionRoute);
                      } else {
                        navigate('/notifications');
                      }
                    }}
                  >
                    <span className="material-symbols-outlined notif-flyout-icon">
                      {notif.icon || 'notifications'}
                    </span>
                    <div className="notif-flyout-text">
                      <span className="notif-flyout-item-title">{notif.title}</span>
                      <span className="notif-flyout-item-time">{notif.timestamp} • {notif.category}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="notif-flyout-footer">
                <button
                  type="button"
                  className="notif-flyout-view-all"
                  style={{ background: 'none', border: 'none', width: '100%' }}
                  onClick={() => {
                    setNotificationsOpen(false);
                    navigate('/notifications');
                  }}
                >
                  View All in Notification Center →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Clean Profile Menu (No redundant text LOGOUT button) */}
        <div className="header-profile-menu-container" ref={dropdownRef}>
          <button
            type="button"
            className="header-avatar-btn"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            title={`${currentUser.name} (${currentPreset?.roleTitle || currentUser.title})`}
            aria-label="User Profile Menu"
          >
            <img src={currentUser.avatar} alt={currentUser.name} className="header-avatar-img" />
          </button>

          {profileDropdownOpen && (
            <div className="header-profile-dropdown">
              <div className="dropdown-user-header">
                <img src={currentUser.avatar} alt={currentUser.name} className="dropdown-avatar-img" />
                <div className="dropdown-user-info">
                  <div className="dropdown-user-name">{currentUser.name}</div>
                  <div className="dropdown-user-role">{currentPreset?.roleTitle || currentUser.title}</div>
                  <div className="dropdown-user-node">{currentUser.node}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigate('/portal/profile');
                }}
              >
                <span className="material-symbols-outlined dropdown-icon">badge</span>
                <span>View Profile & KPIs</span>
              </button>
              <button
                type="button"
                className="dropdown-item danger"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  handleLogout();
                }}
              >
                <span className="material-symbols-outlined dropdown-icon">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
