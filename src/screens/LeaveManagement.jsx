import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/LeaveManagement.css';

export const LeaveManagement = () => {
  const { leaveBalances, submitLeaveRequest } = useApp();

  const [leaveType, setLeaveType] = useState('ANNUAL');
  const [startDate, setStartDate] = useState('2026-04-10');
  const [endDate, setEndDate] = useState('2026-04-14');
  const [reason, setReason] = useState('Annual recharge sabbatical');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLeaveRequest({ type: leaveType, startDate, endDate, reason });
  };

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="status-dot"></span>
          <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
            STUDIO TALENT OPS // TIME-OFF
          </span>
        </div>
        <h1 className="font-headline-lg">Leave Requests & Time-Off Management</h1>
        <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '15px' }}>
          Request sabbatical, sick, or annual time-off with automatic sprint coverage reassignment.
        </p>
      </div>

      {/* Leave Balances Grid */}
      <div className="leave-balances-grid">
        <div className="leave-balance-card">
          <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Annual Leave Balance</div>
          <div style={{ fontSize: '32px', fontWeight: '800', margin: '6px 0' }}>
            {leaveBalances.annualLeave.remaining} <span style={{ fontSize: '16px', fontWeight: '400', color: 'var(--color-on-surface-variant)' }}>/ {leaveBalances.annualLeave.total} days</span>
          </div>
          <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-container)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: `${(leaveBalances.annualLeave.remaining / leaveBalances.annualLeave.total) * 100}%`, height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
          </div>
        </div>

        <div className="leave-balance-card">
          <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Medical / Sick Leave</div>
          <div style={{ fontSize: '32px', fontWeight: '800', margin: '6px 0' }}>
            {leaveBalances.sickLeave.remaining} <span style={{ fontSize: '16px', fontWeight: '400', color: 'var(--color-on-surface-variant)' }}>/ {leaveBalances.sickLeave.total} days</span>
          </div>
          <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-container)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: `${(leaveBalances.sickLeave.remaining / leaveBalances.sickLeave.total) * 100}%`, height: '100%', backgroundColor: '#059669' }}></div>
          </div>
        </div>

        <div className="leave-balance-card">
          <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Creative Sabbatical</div>
          <div style={{ fontSize: '32px', fontWeight: '800', margin: '6px 0' }}>
            {leaveBalances.sabbatical.remaining} <span style={{ fontSize: '16px', fontWeight: '400', color: 'var(--color-on-surface-variant)' }}>/ {leaveBalances.sabbatical.total} days</span>
          </div>
          <div style={{ width: '100%', height: 6, backgroundColor: 'var(--color-surface-container)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: `${(leaveBalances.sabbatical.remaining / leaveBalances.sabbatical.total) * 100}%`, height: '100%', backgroundColor: 'var(--color-secondary)' }}></div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Form & Studio Blackout Schedule */}
      <div className="leave-layout-two-col">
        {/* Request Form */}
        <div className="leave-form-card">
          <h2 className="font-headline-sm" style={{ marginBottom: 'var(--space-md)' }}>Submit Time-Off Request</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <label className="font-label-caps" style={{ display: 'block', marginBottom: 4 }}>Leave Classification</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-outline-variant)', background: 'var(--color-surface-container-low)', fontSize: '14px' }}
              >
                <option value="ANNUAL">Annual Leave</option>
                <option value="SICK">Medical / Emergency</option>
                <option value="SABBATICAL">Creative Sabbatical (5 Days Full Pay)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
              <div>
                <label className="font-label-caps" style={{ display: 'block', marginBottom: 4 }}>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-outline-variant)', background: 'var(--color-surface-container-low)', fontSize: '14px' }}
                  required
                />
              </div>
              <div>
                <label className="font-label-caps" style={{ display: 'block', marginBottom: 4 }}>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-outline-variant)', background: 'var(--color-surface-container-low)', fontSize: '14px' }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-label-caps" style={{ display: 'block', marginBottom: 4 }}>Sprint Coverage & Notes</label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Coverage planned with Sarah Jenkins for WebGL deliverables..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-outline-variant)', background: 'var(--color-surface-container-low)', fontSize: '14px' }}
              />
            </div>

            <button type="submit" className="btn-secondary" style={{ width: '100%', padding: 13 }}>
              <span>Submit Leave for Admin Approval</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
            </button>
          </form>
        </div>

        {/* Blackout Calendar Card */}
        <div className="blackout-card">
          <div className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
            // SPRINT DELIVERY FREEZES
          </div>
          <h3 className="font-headline-sm" style={{ color: '#ffffff', margin: '4px 0 var(--space-md) 0' }}>
            Studio Blackout Dates
          </h3>
          <p style={{ color: 'var(--color-primary-fixed-dim)', fontSize: '13px', marginBottom: 'var(--space-lg)' }}>
            High-consequence client milestones. Time-off requires Super Admin override.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <div style={{ background: 'var(--color-tertiary-container)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                <span>Project Obsidian Mainnet Launch</span>
                <span style={{ color: 'var(--color-secondary)' }}>Feb 26 – Feb 28</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-primary-fixed-dim)', marginTop: 2 }}>
                Critical Shader delivery freeze (Obsidian Cloud Inc.)
              </div>
            </div>

            <div style={{ background: 'var(--color-tertiary-container)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                <span>STARLET 5.0 Foundation Demo</span>
                <span style={{ color: 'var(--color-secondary)' }}>Mar 03 – Mar 05</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-primary-fixed-dim)', marginTop: 2 }}>
                Mind Empowered Foundation annual gala showcase
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

