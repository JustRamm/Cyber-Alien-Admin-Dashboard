import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/Header.css';

export const Header = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    currentPreset,
    studioStats,
    isClockedIn,
    setClockInModalOpen,
    isSidebarMobileOpen,
    setIsSidebarMobileOpen,
    showToast,
    logout
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
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

      {/* Right side: Clock-in CTA, Notifications, Profile Avatar Dropdown */}
      <div className="header-right">
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

        <button
          type="button"
          className="notifications-trigger"
          onClick={() => showToast('Studio Matrix Alert: 3 incoming RFPs awaiting review', 'info')}
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
          <span className="notification-dot"></span>
        </button>

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
