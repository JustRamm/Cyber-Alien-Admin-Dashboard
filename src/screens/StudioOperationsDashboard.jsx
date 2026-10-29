import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/StudioOperationsDashboard.css';

export const StudioOperationsDashboard = () => {
  const { studioStats, projects, inquiries, showToast } = useApp();
  const [selectedTimeline, setSelectedTimeline] = useState('Q1');

  return (
    <div className="page-wrapper">
      {/* Operations Telemetry Header */}
      <section className="ops-header-section">
        <div className="ops-header-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot pulse"></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              LIVE STUDIO OPERATIONS // CORE ENGINE
            </span>
            <span style={{ color: 'var(--color-outline-variant)' }}>•</span>
            <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
              NODE US-WEST-01
            </span>
          </div>
          <h1 className="font-headline-lg">Operations Overview</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '15px' }}>
            Good morning, Alex. <strong style={{ color: 'var(--color-on-surface)' }}>4 active sprints</strong> on track,{' '}
            <strong style={{ color: 'var(--color-secondary)' }}>2 incoming RFPs</strong> await triage, and pipeline clearance is 94.2%.
          </p>
        </div>

        {/* Date Filter & Utilities */}
        <div className="ops-filter-pill-bar">
          <div className="ops-filter-active-pill">
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-secondary)' }}>
              tune
            </span>
            <span>Q1 2026 // Real-time Telemetry</span>
          </div>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: '6px 14px', border: 'none' }}
            onClick={() => showToast('Filtered to Last 30 Days', 'info')}
          >
            Last 30 Days
          </button>
          <button
            type="button"
            className="btn-primary"
            style={{ padding: '6px 14px' }}
            onClick={() => showToast('Exporting studio audit ledger (CSV/PDF)...', 'success')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>file_download</span>
            <span>Export Audit</span>
          </button>
        </div>
      </section>

      {/* Top 4 KPI Metric Cards */}
      <section className="ops-kpi-grid">
        {/* Card 1: Revenue */}
        <div className="ops-kpi-card">
          <div className="bento-top-row">
            <span className="bento-card-title">Active Studio Revenue</span>
            <span className="accuracy-pill" style={{ background: 'var(--color-surface-container)', color: 'var(--color-on-surface)' }}>
              On Target
            </span>
          </div>
          <div style={{ margin: 'var(--space-md) 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span className="metric-big-num">{studioStats.revenueUSD}</span>
              <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>USD</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_outward</span>
              <span>{studioStats.revenueChangePercent}</span>
              <span style={{ color: 'var(--color-on-surface-variant)', fontWeight: '400', fontSize: '12px' }}>vs last cycle</span>
            </div>
          </div>
          {/* Sparkline SVG */}
          <svg className="sparkline-svg" fill="none" viewBox="0 0 160 32">
            <path d="M0 24L24 18L48 22L72 10L96 14L120 6L144 12L160 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            <path d="M0 24L24 18L48 22L72 10L96 14L120 6L144 12L160 2V32H0Z" fill="currentColor" fillOpacity="0.08" />
          </svg>
        </div>

        {/* Card 2: Production Velocity */}
        <div className="ops-kpi-card">
          <div className="bento-top-row">
            <span className="bento-card-title">Production Velocity</span>
            <div className="telemetry-chip" style={{ background: '#ecfdf5', color: '#047857' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10b981' }}></span>
              <span>98.4% Uptime</span>
            </div>
          </div>
          <div style={{ margin: 'var(--space-md) 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span className="metric-big-num">{studioStats.velocityScore}</span>
              <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>HEALTH</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>trending_up</span>
              <span>+3.1% velocity score</span>
            </div>
          </div>
          <div className="bento-card-footer">
            <span>12 Active Milestones</span>
            <strong style={{ color: 'var(--color-on-surface)' }}>0 Critical Delays</strong>
          </div>
        </div>

        {/* Card 3: Pipeline & RFPs */}
        <div className="ops-kpi-card">
          <div className="bento-top-row">
            <span className="bento-card-title">Pipeline & RFPs</span>
            <span className="accuracy-pill" style={{ background: 'var(--color-secondary-fixed)', color: 'var(--color-on-secondary-fixed-variant)' }}>
              High Priority
            </span>
          </div>
          <div style={{ margin: 'var(--space-md) 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span className="metric-big-num">8 Inquiries</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-secondary)', fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>
              <span>$185k potential</span>
              <span style={{ color: 'var(--color-on-surface-variant)', fontWeight: '400', fontSize: '12px' }}>• 2 pending review</span>
            </div>
          </div>
          <div className="bento-card-footer">
            <span>Win Probability</span>
            <strong style={{ color: 'var(--color-secondary)' }}>78% AVG</strong>
          </div>
        </div>

        {/* Card 4: Social Impact (Mind Empowered Foundation) */}
        <div className="ops-kpi-card impact-monolith">
          <div className="bento-top-row">
            <span className="bento-card-title" style={{ color: 'var(--color-primary-fixed-dim)' }}>
              Social Impact Subsidized
            </span>
            <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: 'var(--color-tertiary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-secondary)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>favorite</span>
            </div>
          </div>
          <div style={{ margin: 'var(--space-md) 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span className="metric-big-num" style={{ color: '#ffffff' }}>{studioStats.socialImpactUSD}</span>
              <span className="font-label-caps" style={{ color: 'var(--color-primary-fixed-dim)' }}>15% ALLOCATED</span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-primary-fixed-dim)', marginTop: '4px' }}>
              Mind Empowered Foundation
            </div>
          </div>
          <div className="bento-card-footer" style={{ color: 'var(--color-primary-fixed-dim)' }}>
            <span>48+ Youth Reach Hours</span>
            <strong style={{ color: '#ffffff' }}>STARLET 5.0</strong>
          </div>
        </div>
      </section>

      {/* Two-Column Architecture */}
      <div className="ops-two-col-grid">
        {/* Left Column: Client Engagements Table & Resource Allocation */}
        <div>
          {/* Active Client Engagements */}
          <div className="engagements-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
                    SPRINT CYCLE 09 // Q1
                  </span>
                  <span style={{ color: 'var(--color-outline-variant)' }}>•</span>
                  <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
                    5 Active Streams
                  </span>
                </div>
                <h2 className="font-headline-sm" style={{ marginTop: '4px' }}>Active Client Engagements</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="telemetry-chip">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#3b82f6' }}></span>
                  Live Deployment Sync
                </span>
              </div>
            </div>

            <div className="pulse-table-container">
              <table className="pulse-table">
                <thead>
                  <tr>
                    <th>Client & Project</th>
                    <th>Discipline</th>
                    <th>Lead / Team</th>
                    <th>Sprint ETA</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(proj => (
                    <tr key={proj.id}>
                      <td>
                        <div style={{ fontWeight: '700', color: 'var(--color-on-surface)' }}>{proj.title}</div>
                        <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>{proj.client}</div>
                      </td>
                      <td>
                        <span className="telemetry-chip">{proj.discipline}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '13px', fontWeight: '600' }}>{proj.leads.join(' & ')}</span>
                      </td>
                      <td>
                        <div style={{ width: 120 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                            <span>{proj.progressPercent}%</span>
                            <span>{proj.etaDate}</span>
                          </div>
                          <div style={{ width: '100%', height: 4, backgroundColor: 'var(--color-surface-container)', borderRadius: 999, overflow: 'hidden', marginTop: 3 }}>
                            <div
                              style={{
                                width: `${proj.progressPercent}%`,
                                height: '100%',
                                backgroundColor: proj.status === 'BLOCKED' ? 'var(--color-error)' : proj.status === 'DELIVERED' ? '#10b981' : '#3b82f6'
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className="accuracy-pill"
                          style={{
                            background: proj.status === 'BLOCKED' ? 'var(--color-error-container)' : 'var(--color-surface-container)',
                            color: proj.status === 'BLOCKED' ? 'var(--color-error)' : 'var(--color-on-surface)'
                          }}
                        >
                          {proj.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-icon"
                          onClick={() => showToast(`Project details: ${proj.title}`, 'info')}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Craft Resource Allocation */}
          <div className="craft-allocation-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
                  ENGINEERING & CREATIVE CAPACITY
                </span>
                <h3 className="font-headline-sm" style={{ marginTop: '4px' }}>Resource Craft Allocation</h3>
              </div>
              <span className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
                8 FTE Studio Core
              </span>
            </div>

            <div className="craft-bars-grid">
              <div className="craft-bar-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                  <span>Creative Code & WebGL</span>
                  <span>88% Load</span>
                </div>
                <div className="craft-bar-track">
                  <div className="craft-bar-fill" style={{ width: '88%' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                  <span>3 Staff Allocated</span>
                  <span style={{ color: 'var(--color-secondary)', fontWeight: '600' }}>Near Peak Velocity</span>
                </div>
              </div>

              <div className="craft-bar-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                  <span>3D Motion & Unreal Engine 5</span>
                  <span style={{ color: 'var(--color-secondary)' }}>94% Load</span>
                </div>
                <div className="craft-bar-track">
                  <div className="craft-bar-fill secondary" style={{ width: '94%' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                  <span>2 Staff Allocated</span>
                  <span style={{ color: 'var(--color-secondary)', fontWeight: '700' }}>Capacity Cap Alert</span>
                </div>
              </div>

              <div className="craft-bar-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                  <span>Kinetic Brand Architecture</span>
                  <span>72% Load</span>
                </div>
                <div className="craft-bar-track">
                  <div className="craft-bar-fill" style={{ width: '72%' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                  <span>2 Staff Allocated</span>
                  <span style={{ color: '#059669', fontWeight: '600' }}>Healthy Margin</span>
                </div>
              </div>

              <div className="craft-bar-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                  <span>Strategic Systems & UX</span>
                  <span>65% Load</span>
                </div>
                <div className="craft-bar-track">
                  <div className="craft-bar-fill" style={{ width: '65%' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                  <span>1 Staff Allocated</span>
                  <span style={{ color: '#059669', fontWeight: '600' }}>Available for Triage</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Incoming Inquiries & Pitch Triage */}
        <div>
          <div className="inquiries-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="status-dot"></span>
                <h3 className="font-headline-sm">Incoming Inquiries</h3>
              </div>
              <span className="telemetry-chip live" style={{ background: 'var(--color-secondary)', color: '#ffffff' }}>
                3 New
              </span>
            </div>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '12px', marginTop: '6px' }}>
              Live feed from public proposal portal. Two prospects require partner review within 24h.
            </p>

            <div className="inquiries-list">
              {inquiries.map(inq => (
                <div key={inq.id} className="inquiry-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ fontSize: '14px', color: 'var(--color-on-surface)' }}>{inq.company}</strong>
                      <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
                        {inq.projectScope}
                      </div>
                    </div>
                    <span className="telemetry-chip" style={{ background: 'var(--color-primary)', color: '#ffffff', fontSize: '10px' }}>
                      {inq.budgetTier}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--color-outline)', marginTop: '4px' }}>
                    <span>{inq.email}</span>
                    <span>{inq.receivedAt}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button
                      type="button"
                      className="btn-primary"
                      style={{ padding: '4px 12px', fontSize: '11px' }}
                      onClick={() => showToast(`Reviewing inquiry for ${inq.company}`, 'info')}
                    >
                      Review RFP
                    </button>
                    <button
                      type="button"
                      className="btn-ghost"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                      onClick={() => showToast(`Assigned ${inq.company} to Alex Mercer`, 'success')}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

