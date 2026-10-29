import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/Header.css';

export const Header = () => {
  const {
    currentUser,
    studioStats,
    isClockedIn,
    setClockInModalOpen,
    isSidebarMobileOpen,
    setIsSidebarMobileOpen,
    showToast
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');

  const toggleMobileSidebar = () => {
    setIsSidebarMobileOpen(!isSidebarMobileOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      showToast(`Query telemetry initiated: "${searchTerm}"`, 'info');
    }
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

      {/* Right side: Clock-in CTA, Notifications, Profile Avatar */}
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

        <div className="header-avatar-btn" title={`${currentUser.name} (${currentUser.node})`}>
          <img src={currentUser.avatar} alt={currentUser.name} className="header-avatar-img" />
        </div>
      </div>
    </header>
  );
};

