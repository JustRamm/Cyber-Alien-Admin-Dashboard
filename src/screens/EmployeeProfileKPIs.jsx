import React from 'react';
import { useApp } from '../context/AppContext';
import '../styles/EmployeeProfileKPIs.css';

export const EmployeeProfileKPIs = () => {
  const { currentUser, showToast } = useApp();

  return (
    <div className="page-wrapper">
      {/* Profile Header Hero */}
      <div className="profile-kpi-hero">
        <div className="profile-hero-user">
          <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar-large" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 className="font-headline-lg">{currentUser.name}</h1>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--color-secondary)' }}>
                verified
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 4 }}>
              <span className="telemetry-chip live" style={{ background: 'var(--color-primary)', color: '#ffffff' }}>
                {currentUser.level}
              </span>
              <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
                {currentUser.code} // {currentUser.node}
              </span>
            </div>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '13px', marginTop: 6 }}>
              {currentUser.title} • {currentUser.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => showToast('Skill endorsement beacon dispatched', 'success')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>military_tech</span>
          <span>Endorse Craft Competency</span>
        </button>
      </div>

      {/* Grid: Skill Matrix & Accolades */}
      <div className="skills-tree-grid">
        {/* Skill Matrix */}
        <div className="skill-matrix-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
            <div>
              <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                CRAFT MASTERY
              </span>
              <h2 className="font-headline-sm" style={{ marginTop: 2 }}>Specialist Skill Architecture</h2>
            </div>
            <span className="accuracy-pill">Level 4 Staff Core</span>
          </div>

          <div className="skill-bar-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
              <span>Creative Code & WebGL</span>
              <span>98% / 100</span>
            </div>
            <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-container)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '98%', height: '100%', backgroundColor: 'var(--color-secondary)' }}></div>
            </div>
          </div>

          <div className="skill-bar-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
              <span>Distributed Node Systems</span>
              <span>94% / 100</span>
            </div>
            <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-container)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '94%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
            </div>
          </div>

          <div className="skill-bar-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
              <span>WebAssembly / Rust Audio</span>
              <span>90% / 100</span>
            </div>
            <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-container)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '90%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
            </div>
          </div>

          <div className="skill-bar-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
              <span>Speculative Art Direction</span>
              <span>85% / 100</span>
            </div>
            <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-container)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
            </div>
          </div>
        </div>

        {/* Accolades Card */}
        <div className="accolade-card">
          <div className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
            // VERIFIED RECOGNITION
          </div>
          <h2 className="font-headline-sm" style={{ color: '#ffffff', margin: '4px 0 var(--space-lg) 0' }}>
            Studio Accolades & Milestones
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ background: 'var(--color-tertiary-container)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: '700' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary)' }}>emoji_events</span>
                <span>Awwwards Site of the Month 2025</span>
              </div>
              <p style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '12px', marginTop: 4 }}>
                Lead Creative Technologist on Project Obsidian Volumetric WebGL.
              </p>
            </div>

            <div style={{ background: 'var(--color-tertiary-container)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: '700' }}>
                <span className="material-symbols-outlined" style={{ color: '#f59e0b' }}>star</span>
                <span>Studio Master Mentor Badge</span>
              </div>
              <p style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '12px', marginTop: 4 }}>
                Over 120 hours allocated to Junior Creative Code apprenticeships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

