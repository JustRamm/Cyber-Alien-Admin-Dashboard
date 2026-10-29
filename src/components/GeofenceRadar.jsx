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
      {/* Top Monolith HUD Header */}
      <div className="radar-monolith-header">
        <div className="monolith-header-left">
          <div className="monolith-geofence-pill">
            <span className="live-dot pulse"></span>
            <span>PIER 14 STUDIO GEOFENCE // 150M CORE RADIUS</span>
          </div>
          <div className="monolith-coords">
            SFO_NODE: {studioStats.hubLat}° N, {Math.abs(studioStats.hubLng)}° W
          </div>
        </div>

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

      {/* Main Radar Map Canvas */}
      <div className="radar-hud-canvas">
        {/* Full Cartographic Dark San Francisco Tactical Map (SVG) */}
        <svg
          className="radar-sf-vector-map"
          viewBox="0 0 1000 560"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="waterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f131a" />
              <stop offset="100%" stopColor="#080a0d" />
            </radialGradient>
            <linearGradient id="bayBridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3a404d" />
              <stop offset="100%" stopColor="#252a33" />
            </linearGradient>
            <radialGradient id="hubCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#b90538" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#b90538" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#b90538" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep Water Base (Ocean & SF Bay) */}
          <rect width="1000" height="560" fill="url(#waterGlow)" />

          {/* Landmass 1: Marin Headlands (Top-Left) */}
          <path
            d="M 0,0 L 220,0 C 200,60 170,110 130,130 C 90,150 40,165 0,175 Z"
            fill="#12151a"
            stroke="#1f242d"
            strokeWidth="1.5"
          />

          {/* Landmass 2: East Bay (Oakland / Berkeley / Alameda) (Right Half) */}
          <path
            d="M 780,0 L 1000,0 L 1000,560 L 760,560 C 760,500 770,470 790,430 C 820,380 840,340 830,280 C 820,230 790,170 780,120 Z"
            fill="#12151a"
            stroke="#1f242d"
            strokeWidth="1.5"
          />

          {/* Alameda Peninsula Shape */}
          <path
            d="M 830,320 C 870,330 940,350 960,390 C 970,430 930,470 870,480 C 830,480 810,440 820,390 Z"
            fill="#14181f"
            stroke="#232933"
            strokeWidth="1"
          />

          {/* Treasure Island & Yerba Buena Island */}
          <path
            d="M 645,160 C 665,140 690,140 705,165 C 715,190 705,225 680,235 C 655,240 635,215 640,185 Z"
            fill="#161b22"
            stroke="#2a323d"
            strokeWidth="1.2"
          />

          {/* Landmass 3: Main San Francisco Peninsula */}
          <path
            d="M 0,195 
               C 50,190 90,205 130,200 
               C 160,195 190,180 230,185 
               C 270,190 320,180 370,185 
               C 420,190 440,210 470,220 
               C 500,230 520,265 525,295 
               C 530,340 540,385 530,440 
               C 520,490 500,530 480,560 
               L 0,560 Z"
            fill="#14171d"
            stroke="#212731"
            strokeWidth="1.5"
          />

          {/* Golden Gate Bridge Span */}
          <line x1="125" y1="135" x2="160" y2="190" stroke="#3d4452" strokeWidth="2.5" strokeDasharray="3 1" />
          <circle cx="135" cy="150" r="3" fill="#586175" />
          <circle cx="150" cy="175" r="3" fill="#586175" />
          <text x="75" y="145" fill="rgba(255,255,255,0.28)" fontSize="8.5" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.05em">
            Golden Gate Bridge
          </text>

          {/* San Francisco - Oakland Bay Bridge Traces */}
          <path
            d="M 522,290 L 645,215 L 685,210 L 805,240"
            fill="none"
            stroke="url(#bayBridgeGrad)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
          <text x="590" y="240" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
            Bay Bridge
          </text>

          {/* Major SF Street Grids & Highways */}
          <g stroke="#1e232c" strokeWidth="1" fill="none">
            {/* Market Street (Diagonal) */}
            <line x1="330" y1="440" x2="520" y2="290" stroke="#2c3340" strokeWidth="2.2" />
            
            {/* Highway 101 / Van Ness */}
            <path d="M 440,210 L 440,340 L 420,460 L 440,560" stroke="#2c3340" strokeWidth="2" />
            
            {/* Geary Blvd */}
            <line x1="130" y1="280" x2="440" y2="280" stroke="#252b36" strokeWidth="1.6" />
            
            {/* California St / Pine St */}
            <line x1="180" y1="260" x2="490" y2="260" />
            <line x1="180" y1="240" x2="460" y2="240" />
            
            {/* Embarcadero Waterfront Highway */}
            <path d="M 370,185 C 440,205 510,240 525,295 C 535,360 525,430 490,520" stroke="#2f3745" strokeWidth="2" />

            {/* Sunset & Richmond Grid lines */}
            <line x1="140" y1="300" x2="380" y2="300" />
            <line x1="140" y1="320" x2="380" y2="320" />
            <line x1="140" y1="340" x2="360" y2="340" />
            <line x1="140" y1="360" x2="360" y2="360" />
            <line x1="140" y1="380" x2="360" y2="380" />
            <line x1="140" y1="400" x2="380" y2="400" />
            <line x1="140" y1="420" x2="400" y2="420" />

            {/* North-South Avenues */}
            <line x1="180" y1="270" x2="180" y2="440" />
            <line x1="220" y1="270" x2="220" y2="440" />
            <line x1="260" y1="270" x2="260" y2="440" />
            <line x1="300" y1="270" x2="300" y2="440" />
            <line x1="340" y1="270" x2="340" y2="440" />
            <line x1="380" y1="260" x2="380" y2="480" />
            
            {/* East Bay Grid */}
            <line x1="800" y1="160" x2="980" y2="160" stroke="#252b36" strokeWidth="1.5" />
            <line x1="820" y1="220" x2="980" y2="220" stroke="#252b36" strokeWidth="1.5" />
            <line x1="840" y1="290" x2="980" y2="290" stroke="#252b36" strokeWidth="1.5" />
            <line x1="880" y1="360" x2="980" y2="360" />
          </g>

          {/* Cartographic Landmark Labels */}
          <g fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">
            {/* Large City Label */}
            <text x="380" y="405" fill="rgba(255,255,255,0.42)" fontSize="24" letterSpacing="0.02em">
              San Francisco
            </text>

            {/* Neighborhoods & Districts (exact from Image 1) */}
            <text x="420" y="228" fill="rgba(255,255,255,0.32)" fontSize="9" letterSpacing="0.08em">
              FISHERMAN'S WHARF
            </text>
            <text x="435" y="258" fill="rgba(255,255,255,0.32)" fontSize="9" letterSpacing="0.08em">
              NORTH BEACH
            </text>
            <text x="430" y="280" fill="rgba(255,255,255,0.28)" fontSize="8.5" letterSpacing="0.08em">
              CHINATOWN
            </text>
            <text x="430" y="312" fill="rgba(255,255,255,0.28)" fontSize="8.5" letterSpacing="0.08em">
              UNION SQUARE
            </text>
            <text x="245" y="278" fill="rgba(255,255,255,0.26)" fontSize="9" letterSpacing="0.08em">
              PACIFIC HEIGHTS
            </text>
            <text x="85" y="255" fill="rgba(255,255,255,0.26)" fontSize="8.5" letterSpacing="0.08em">
              PRESIDIO OF
            </text>
            <text x="75" y="268" fill="rgba(255,255,255,0.26)" fontSize="8.5" letterSpacing="0.08em">
              SAN FRANCISCO
            </text>
            <text x="145" y="375" fill="rgba(255,255,255,0.26)" fontSize="9" letterSpacing="0.08em">
              GOLDEN GATE PARK
            </text>
            <text x="400" y="445" fill="rgba(255,255,255,0.28)" fontSize="9" letterSpacing="0.08em">
              MISSION DISTRICT
            </text>

            {/* Islands & Bay Features */}
            <text x="655" y="165" fill="rgba(255,255,255,0.32)" fontSize="9" letterSpacing="0.08em">
              TREASURE ISLAND
            </text>
            <text x="705" y="252" fill="rgba(255,255,255,0.28)" fontSize="9.5" letterSpacing="0.05em">
              Hayes Observation Tower
            </text>
            <text x="915" y="315" fill="rgba(255,255,255,0.28)" fontSize="11">
              Alameda
            </text>
            <text x="840" y="430" fill="rgba(255,255,255,0.24)" fontSize="8.5">
              Robert W. Crown
            </text>
            <text x="815" y="442" fill="rgba(255,255,255,0.24)" fontSize="8.5">
              Memorial State Beach
            </text>
          </g>

          {/* Highway Shields & Icons */}
          <g>
            {/* Route 101 Badge */}
            <rect x="290" y="295" width="20" height="15" rx="3" fill="#1b2028" stroke="#363f4e" strokeWidth="1" />
            <text x="300" y="306" fill="rgba(255,255,255,0.5)" fontSize="8" fontWeight="700" textAnchor="middle">101</text>

            <rect x="445" y="465" width="20" height="15" rx="3" fill="#1b2028" stroke="#363f4e" strokeWidth="1" />
            <text x="455" y="476" fill="rgba(255,255,255,0.5)" fontSize="8" fontWeight="700" textAnchor="middle">101</text>

            {/* Route 1 Badge */}
            <rect x="165" y="335" width="16" height="14" rx="3" fill="#1b2028" stroke="#363f4e" strokeWidth="1" />
            <text x="173" y="345" fill="rgba(255,255,255,0.5)" fontSize="8" fontWeight="700" textAnchor="middle">1</text>

            {/* Route 80 Badge near Bay Bridge */}
            <rect x="690" y="215" width="16" height="14" rx="3" fill="#1b2028" stroke="#363f4e" strokeWidth="1" />
            <text x="698" y="225" fill="rgba(255,255,255,0.5)" fontSize="8" fontWeight="700" textAnchor="middle">80</text>
          </g>

          {/* ========================================================= */}
          {/* GEOFENCE RADIALS & PERIMETER OVERLAYS                      */}
          {/* ========================================================= */}

          {/* Outer Dashed 300m / Extended Perimeter Ring */}
          <circle
            cx="505"
            cy="285"
            r="230"
            fill="none"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1.2"
            strokeDasharray="5 5"
          />

          {/* 150M Core Geofence Perimeter Ring */}
          <circle
            cx="505"
            cy="285"
            r="145"
            fill="rgba(185, 5, 56, 0.12)"
            stroke="#b90538"
            strokeWidth="1.6"
          />

          {/* Inner 75m Sub-Ring */}
          <circle
            cx="505"
            cy="285"
            r="75"
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1"
          />

          {/* Dashed Telemetry Vector Line directly to Kenji's Breach Position */}
          <line
            x1="505"
            y1="285"
            x2="735"
            y2="185"
            stroke="#b90538"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            strokeOpacity="0.8"
          />

          {/* Pier 14 Hub Core Beacon Glow */}
          <circle cx="505" cy="285" r="28" fill="url(#hubCoreGlow)" />
          <circle cx="505" cy="285" r="6" fill="#b90538" />
          <circle cx="505" cy="285" r="2.5" fill="#ffffff" />

          {/* Pinned Pill: 150M HUB GEOFENCE PERIMETER */}
          <g transform="translate(505, 140)">
            <rect x="-95" y="-12" width="190" height="23" rx="11.5" fill="#b90538" filter="drop-shadow(0 2px 8px rgba(185,5,56,0.5))" />
            <text
              x="0"
              y="3.5"
              fill="#ffffff"
              font-family="'Plus Jakarta Sans', sans-serif"
              fontSize="9.5"
              fontWeight="800"
              letterSpacing="0.08em"
              textAnchor="middle"
            >
              150M HUB GEOFENCE PERIMETER
            </text>
          </g>
        </svg>

        {/* ========================================================= */}
        {/* INTERACTIVE LIVE SPECIALIST CALLOUT BADGES (OVERLAY)     */}
        {/* ========================================================= */}

        {/* 1. Alex Mercer (42m from hub core) */}
        {alex && (
          <div
            className="specialist-callout-item alex-callout"
            style={{ top: '46.5%', left: '46%' }}
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
            style={{ top: '37.5%', left: '58.5%' }}
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
            style={{ top: '15.5%', left: '69%' }}
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

        {/* ========================================================= */}
        {/* CORNER TELEMETRY HUD OVERLAYS (MATCHING IMAGE 1)           */}
        {/* ========================================================= */}

        {/* Top-Left Box: Real-Time GPS Trace */}
        <div className="hud-trace-box">
          <div className="trace-tag-crimson">// REAL-TIME GPS TRACE</div>
          <div className="trace-variance-line">
            Accuracy variance: <span className="variance-val">± 4.2m</span>
          </div>
          <div className="trace-mesh-line">
            Mesh: ARUBA_PIER14_PRO_04
          </div>
        </div>

        {/* Bottom-Left Pill: 14 Inside Bounds | 3 Outside Geofence */}
        <div className="hud-bounds-summary-pill">
          <span className="bounds-stat">
            <span className="status-dot-active"></span> 14 Inside Bounds
          </span>
          <span className="bounds-separator">|</span>
          <span className="bounds-stat alert">
            <span className="status-dot-alert"></span> 3 Outside Geofence
          </span>
        </div>
      </div>
    </div>
  );
};
