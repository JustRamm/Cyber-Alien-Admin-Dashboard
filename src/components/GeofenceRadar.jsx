import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/GeofenceRadar.css';

export const GeofenceRadar = ({ showSwitcher = true, compact = false }) => {
  const { employees, studioStats, showToast } = useApp();
  const [activeHub, setActiveHub] = useState('SFO');

  const handlePinClick = (emp) => {
    showToast(
      `${emp.name}: ${emp.currentDistanceMeters}m from hub (${emp.geofenceStatus}) - Last Punch: ${emp.clockInTime}`,
      emp.geofenceStatus === 'BREACH_FLAGGED' ? 'error' : 'info'
    );
  };

  const alex = employees.find(e => e.name.includes('Alex')) || employees[0];
  const sarah = employees.find(e => e.name.includes('Sarah')) || employees[4];
  const kenji = employees.find(e => e.name.includes('Kenji')) || employees[3];

  return (
    <div className={`geofence-radar-monolith ${compact ? 'compact' : ''}`}>
      {/* HUD Header */}
      <div className="radar-hud-header">
        <div className="hud-header-left">
          <div className="geofence-pill-active">
            <span className="status-dot pulse"></span>
            <span className="font-label-caps" style={{ color: '#ffffff' }}>
              PIER 14 GEOFENCE // 150M CORE RADIUS
            </span>
          </div>
          <span className="hud-coordinates">
            SFO_NODE: {studioStats.hubLat}° N, {Math.abs(studioStats.hubLng)}° W
          </span>
        </div>

        {showSwitcher && (
          <div className="hub-switcher-group">
            <button
              type="button"
              className={`hub-switch-btn ${activeHub === 'SFO' ? 'active' : ''}`}
              onClick={() => setActiveHub('SFO')}
            >
              SFO Pier 14 (14)
            </button>
            <button
              type="button"
              className={`hub-switch-btn ${activeHub === 'TYO' ? 'active' : ''}`}
              onClick={() => setActiveHub('TYO')}
            >
              Tokyo Hub (4)
            </button>
            <button
              type="button"
              className={`hub-switch-btn ${activeHub === 'LDN' ? 'active' : ''}`}
              onClick={() => setActiveHub('LDN')}
            >
              London Soho (2)
            </button>
          </div>
        )}
      </div>

      {/* Interactive Radar Visual Canvas */}
      <div className="radar-hud-canvas">
        <div className="radar-map-background"></div>

        {/* Concentric Geofence Rings */}
        <div className="ring-200m">
          <div className="ring-150m-perimeter">
            <span className="perimeter-tag">150M HUB PERIMETER</span>
            <div className="ring-75m-core">
              <div className="hub-center-icon" title="Pier 14 Studio Waterfront Core">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>domain</span>
              </div>
            </div>
            {/* Radar Beam */}
            <div className="radar-sweep-beam"></div>
          </div>
        </div>

        {/* Live Specialist Pins */}
        {alex && (
          <div
            className="specialist-pin alex"
            onClick={() => handlePinClick(alex)}
            title="Alex Mercer (Inside perimeter)"
          >
            <div className="pin-avatar-wrap">
              <img src={alex.avatar} alt={alex.name} className="pin-avatar-img" />
              <span className="pin-status-badge"></span>
            </div>
            <span className="pin-micro-label">
              Alex M. <span style={{ color: '#ffb2b7' }}>42m</span>
            </span>
          </div>
        )}

        {sarah && (
          <div
            className="specialist-pin sarah"
            onClick={() => handlePinClick(sarah)}
            title="Sarah Jenkins (Inside perimeter)"
          >
            <div className="pin-avatar-wrap">
              <img src={sarah.avatar} alt={sarah.name} className="pin-avatar-img" />
              <span className="pin-status-badge"></span>
            </div>
            <span className="pin-micro-label">
              Sarah J. <span style={{ color: '#ffb2b7' }}>120m</span>
            </span>
          </div>
        )}

        {kenji && (
          <div
            className="specialist-pin kenji-breach"
            onClick={() => handlePinClick(kenji)}
            title="Kenji Takahashi (Geofence Breach!)"
          >
            <div
              className="pin-avatar-wrap"
              style={{ borderColor: 'var(--color-secondary-container)' }}
            >
              <img src={kenji.avatar} alt={kenji.name} className="pin-avatar-img" />
              <span className="status-dot pulse" style={{ position: 'absolute', top: 0, right: 0 }}></span>
            </div>
            <span className="pin-micro-label breach-alert-label">
              <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>warning</span>
              Kenji T. // 3.4km Breach
            </span>
          </div>
        )}

        {/* HUD Telemetry Corner Overlays */}
        <div className="hud-corner-top-left">
          <div className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
            // REAL-TIME GPS TRACE
          </div>
          <div>Accuracy: <strong style={{ color: 'var(--color-secondary)' }}>± 4.2m</strong></div>
          <div className="font-label-caps" style={{ color: 'var(--color-on-primary-container)' }}>
            Mesh: ARUBA_PIER14_PRO_04
          </div>
        </div>

        <div className="hud-corner-bottom-left">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="status-dot"></span> 14 Inside Bounds
          </span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ color: 'var(--color-secondary-fixed-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#dc2c4f' }}></span> 3 Outside Geofence
          </span>
        </div>
      </div>
    </div>
  );
};

