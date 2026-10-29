import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/GeofenceRadar.css';

export const GeofenceRadar = ({ showSwitcher = true, compact = false }) => {
  const { employees, studioStats, showToast } = useApp();
  const [activeHub, setActiveHub] = useState('SFO');
  const [mapTheme, setMapTheme] = useState('dark'); // 'dark', 'standard', 'satellite'
  const [interactiveMode, setInteractiveMode] = useState(false); // false = radar lock, true = pan/zoom map

  const handlePinClick = (emp) => {
    showToast(
      `${emp.name}: ${emp.currentDistanceMeters}m from hub (${emp.geofenceStatus}) - Last Punch: ${emp.clockInTime}`,
      emp.geofenceStatus === 'BREACH_FLAGGED' ? 'error' : 'info'
    );
  };

  const alex = employees.find(e => e.name.includes('Alex')) || employees[0];
  const sarah = employees.find(e => e.name.includes('Sarah')) || employees[4];
  const kenji = employees.find(e => e.name.includes('Kenji')) || employees[3];

  // Actual Google Map embed parameters per hub
  const hubConfigs = {
    SFO: {
      name: 'Pier 14 Studio Waterfront, San Francisco',
      coords: `SFO_NODE: ${studioStats.hubLat || 37.7925}° N, ${Math.abs(studioStats.hubLng || -122.3920)}° W`,
      query: 'Pier+14+San+Francisco+CA',
      zoom: 15,
      mesh: 'ARUBA_PIER14_PRO_04',
      insideCount: 14,
      outsideCount: 3
    },
    TYO: {
      name: 'Tokyo Shibuya Hub, Tokyo',
      coords: 'TYO_NODE: 35.6595° N, 139.7005° E',
      query: 'Shibuya+Crossing+Tokyo+Japan',
      zoom: 15,
      mesh: 'MESH_SHIBUYA_09',
      insideCount: 4,
      outsideCount: 0
    },
    LDN: {
      name: 'London Soho Hub, London',
      coords: 'LDN_NODE: 51.5138° N, 0.1362° W',
      query: 'Soho+Square+London+UK',
      zoom: 15,
      mesh: 'SOHO_ENCLAVE_NET',
      insideCount: 2,
      outsideCount: 1
    }
  };

  const currentHub = hubConfigs[activeHub] || hubConfigs.SFO;

  // Compute Google Map URL
  const mapTypeParam = mapTheme === 'satellite' ? 'k' : 'm';
  const googleMapUrl = `https://maps.google.com/maps?q=${currentHub.query}&t=${mapTypeParam}&z=${currentHub.zoom}&output=embed`;

  return (
    <div className={`geofence-radar-monolith ${compact ? 'compact' : ''}`}>
      {/* Top Monolith HUD Header */}
      <div className="radar-monolith-header">
        <div className="monolith-header-left">
          <div className="monolith-geofence-pill">
            <span className="live-dot pulse"></span>
            <span>PIER 14 STUDIO GEOFENCE // 150M CORE RADIUS</span>
          </div>
          <div className="monolith-coords">
            {currentHub.coords}
          </div>
        </div>

        {/* Right HUD Controls: Hub Switcher + Map Style Toggles */}
        <div className="radar-header-controls">
          {/* Map Layer Mode Switcher */}
          <div className="radar-map-mode-pill">
            <button
              type="button"
              className={`mode-btn ${mapTheme === 'dark' ? 'active' : ''}`}
              onClick={() => setMapTheme('dark')}
              title="Tactical Dark Google Map"
            >
              🌘 Dark Map
            </button>
            <button
              type="button"
              className={`mode-btn ${mapTheme === 'standard' ? 'active' : ''}`}
              onClick={() => setMapTheme('standard')}
              title="Standard Google Map"
            >
              🗺 Standard
            </button>
            <button
              type="button"
              className={`mode-btn ${mapTheme === 'satellite' ? 'active' : ''}`}
              onClick={() => setMapTheme('satellite')}
              title="Google Satellite View"
            >
              🛰 Satellite
            </button>
          </div>

          {/* Interactive Pan/Zoom Toggle */}
          <button
            type="button"
            className={`map-interact-toggle ${interactiveMode ? 'interactive' : ''}`}
            onClick={() => setInteractiveMode(!interactiveMode)}
            title={interactiveMode ? 'Map interactive (pan/zoom enabled)' : 'Radar locked (click operative pins)'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
              {interactiveMode ? 'pan_tool' : 'lock'}
            </span>
            <span>{interactiveMode ? 'Pan Mode' : 'Radar Lock'}</span>
          </button>

          {/* Hub Switcher Tabs */}
          {showSwitcher && (
            <div className="monolith-hub-tabs">
              <button
                type="button"
                className={`hub-tab-btn ${activeHub === 'SFO' ? 'active' : ''}`}
                onClick={() => setActiveHub('SFO')}
              >
                SFO Pier 14 (Active: 14)
              </button>
              <button
                type="button"
                className={`hub-tab-btn ${activeHub === 'TYO' ? 'active' : ''}`}
                onClick={() => setActiveHub('TYO')}
              >
                Tokyo Shibuya Hub (4)
              </button>
              <button
                type="button"
                className={`hub-tab-btn ${activeHub === 'LDN' ? 'active' : ''}`}
                onClick={() => setActiveHub('LDN')}
              >
                London Soho (2)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Radar Map Canvas */}
      <div className="radar-hud-canvas">
        {/* ========================================================= */}
        {/* ACTUAL GOOGLE MAP LAYER (NO DRAWN SCHEMATIC SVG MAP)     */}
        {/* ========================================================= */}
        <div className="radar-google-map-layer">
          <iframe
            key={`${activeHub}-${mapTheme}`}
            title={`Google Map - ${currentHub.name}`}
            className={`radar-google-map-frame ${mapTheme} ${interactiveMode ? 'pointer-active' : ''}`}
            src={googleMapUrl}
            loading="lazy"
          />
          {/* Ambient tint overlay for seamless HUD blend in dark theme */}
          {mapTheme === 'dark' && <div className="radar-dark-vignette" />}
        </div>

        {/* ========================================================= */}
        {/* TACTICAL RADAR HUD OVERLAY (CONCENTRIC RINGS & BEAM)       */}
        {/* ========================================================= */}
        <div className={`radar-hud-overlay-container ${interactiveMode ? 'pass-through' : ''}`}>
          <svg
            className="radar-concentric-svg"
            viewBox="0 0 1000 560"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="hubCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#b90538" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#b90538" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#b90538" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b90538" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#b90538" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Radar Coordinates Center: exactly centered at Pier 14 */}
            <g transform="translate(500, 280)">
              {/* Outer 500m Distance Ring */}
              <circle
                r="360"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
                strokeDasharray="6 6"
              />

              {/* Outer 300m Distance Ring */}
              <circle
                r="260"
                fill="none"
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />

              {/* 150M CORE GEOFENCE PERIMETER RING (Red Glow) */}
              <circle
                r="150"
                fill="rgba(185, 5, 56, 0.14)"
                stroke="#b90538"
                strokeWidth="2"
              />

              {/* Inner 75m Distance Ring */}
              <circle
                r="75"
                fill="none"
                stroke="rgba(255, 255, 255, 0.18)"
                strokeWidth="1"
              />

              {/* Rotating Animated Radar Sweeper Beam */}
              <g className="radar-rotating-sweep">
                <path
                  d="M 0,0 L 260,0 A 260,260 0 0,1 210,150 Z"
                  fill="url(#sweepGradient)"
                />
                <line x1="0" y1="0" x2="260" y2="0" stroke="#b90538" strokeWidth="1.8" />
              </g>

              {/* Dashed Telemetry Vector Line to Kenji's Breach Position */}
              <line
                x1="0"
                y1="0"
                x2="230"
                y2="-100"
                stroke="#b90538"
                strokeWidth="1.6"
                strokeDasharray="5 4"
                strokeOpacity="0.85"
              />

              {/* Hub Core Center Glow */}
              <circle r="32" fill="url(#hubCoreGlow)" />
              <circle r="6" fill="#b90538" />
              <circle r="2.5" fill="#ffffff" />

              {/* Pinned Pill: 150M HUB GEOFENCE PERIMETER */}
              <g transform="translate(0, -150)">
                <rect
                  x="-96"
                  y="-12"
                  width="192"
                  height="24"
                  rx="12"
                  fill="#b90538"
                  filter="drop-shadow(0 2px 8px rgba(185,5,56,0.6))"
                />
                <text
                  x="0"
                  y="4"
                  fill="#ffffff"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontSize="9.5"
                  fontWeight="800"
                  letterSpacing="0.08em"
                  textAnchor="middle"
                >
                  150M HUB GEOFENCE PERIMETER
                </text>
              </g>
            </g>
          </svg>

          {/* ========================================================= */}
          {/* INTERACTIVE LIVE SPECIALIST CALLOUT BADGES (ON MAP)      */}
          {/* ========================================================= */}

          {/* 1. Alex Mercer (42m from hub core) */}
          {alex && (
            <div
              className="specialist-callout-item alex-callout"
              style={{ top: '48%', left: '46%' }}
              onClick={() => handlePinClick(alex)}
              title="Alex Mercer: 42m from hub (Inside perimeter)"
            >
              <div className="callout-avatar-wrap">
                <img src={alex.avatar} alt={alex.name} className="callout-avatar-img" />
              </div>
              <div className="callout-text-pill">
                Alex M. 42m from hub
              </div>
              <span className="beacon-anchor-dot alex-anchor"></span>
            </div>
          )}

          {/* 2. Sarah Jenkins (120m from hub, perimeter boundary) */}
          {sarah && (
            <div
              className="specialist-callout-item sarah-callout"
              style={{ top: '39%', left: '58.5%' }}
              onClick={() => handlePinClick(sarah)}
              title="Sarah Jenkins: 120m from hub (Within perimeter)"
            >
              <div className="callout-avatar-wrap">
                <img src={sarah.avatar} alt={sarah.name} className="callout-avatar-img" />
              </div>
              <div className="callout-text-pill">
                Sarah J. 120m from hub
              </div>
              <span className="beacon-anchor-dot sarah-anchor"></span>
            </div>
          )}

          {/* 3. Kenji Takahashi (3.4km Outside Hub - Geofence Breach Card) */}
          {kenji && (
            <div
              className="breach-monolith-callout"
              style={{ top: '16%', left: '69%' }}
              onClick={() => handlePinClick(kenji)}
              title="Kenji Takahashi: 3.4km Outside Hub (Geofence Breach Flagged)"
            >
              <div className="breach-card-top-row">
                <div className="breach-avatar-frame">
                  <img src={kenji.avatar} alt={kenji.name} className="breach-avatar-img" />
                </div>
                <span className="breach-warning-icon">!</span>
              </div>
              <div className="breach-label-pill">
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>
                  near_me
                </span>
                <span>Kenji T. // 3.4km Outside Hub</span>
              </div>
              <span className="beacon-anchor-dot kenji-anchor"></span>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* CORNER TELEMETRY HUD OVERLAYS                             */}
        {/* ========================================================= */}

        {/* Top-Left Box: Real-Time GPS Trace */}
        <div className="hud-trace-box">
          <div className="trace-tag-crimson">// REAL-TIME GPS TRACE</div>
          <div className="trace-variance-line">
            Accuracy variance: <span className="variance-val">± 4.2m</span>
          </div>
          <div className="trace-mesh-line">
            Mesh: {currentHub.mesh}
          </div>
        </div>

        {/* Bottom-Left Pill: Inside Bounds vs Outside Geofence */}
        <div className="hud-bounds-summary-pill">
          <span className="bounds-stat">
            <span className="status-dot-active"></span> {currentHub.insideCount} Inside Bounds
          </span>
          <span className="bounds-separator">|</span>
          <span className="bounds-stat alert">
            <span className="status-dot-alert"></span> {currentHub.outsideCount} Outside Geofence
          </span>
        </div>
      </div>
    </div>
  );
};
