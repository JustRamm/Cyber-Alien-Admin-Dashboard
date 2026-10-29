import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/AttendanceTimesheets.css';

export const AttendanceTimesheets = () => {
  const { currentUser, showToast } = useApp();

  const mockLogs = [
    { date: 'Today (Mar 29)', in: currentUser.clockInTime, out: currentUser.clockOutTime, hours: '8h 15m', hub: 'Pier 14 Studio (28m)', status: 'VALIDATED' },
    { date: 'Yesterday (Mar 28)', in: '09:05 AM', out: '18:45 PM', hours: '8h 40m', hub: 'Pier 14 Studio (34m)', status: 'VALIDATED' },
    { date: 'Wed (Mar 27)', in: '09:12 AM', out: '19:10 PM', hours: '8h 58m', hub: 'Pier 14 Studio (42m)', status: 'VALIDATED' },
    { date: 'Tue (Mar 26)', in: '09:40 AM', out: '18:30 PM', hours: '7h 50m', hub: 'Remote Mesh WireGuard', status: 'REMOTE_SYNC' },
    { date: 'Mon (Mar 25)', in: '08:55 AM', out: '18:00 PM', hours: '8h 05m', hub: 'Pier 14 Studio (12m)', status: 'VALIDATED' },
  ];

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot"></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              SPECIALIST HARDWARE LEDGER
            </span>
          </div>
          <h1 className="font-headline-lg">My Attendance & Timesheet Logs</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '15px' }}>
            Sprint Week 12 punch records with cryptographic beacon and geofence stamps.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => showToast('Discrepancy adjustment ticket submitted to Studio Operations', 'success')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit_calendar</span>
          <span>Request Punch Adjustment</span>
        </button>
      </div>

      {/* KPI Bar */}
      <div className="timesheet-kpi-bar">
        <div className="timesheet-kpi-card">
          <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Bi-Weekly Total</div>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: 4 }}>76.5 hrs</div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: 2 }}>+4.2h overtime banked</div>
        </div>
        <div className="timesheet-kpi-card">
          <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>On-Time Rating</div>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: 4 }}>{currentUser.onTimeRate}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-secondary)', marginTop: 2 }}>Punctuality index high</div>
        </div>
        <div className="timesheet-kpi-card">
          <div className="font-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Approved Hub</div>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: 4 }}>Pier 14 HQ</div>
          <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: 2 }}>150m perimeter radius</div>
        </div>
      </div>

      {/* Timesheet Data Table */}
      <div className="timesheet-card-monolith">
        <div className="ledger-table-wrap">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Date / Work Session</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Total Session</th>
                <th>Verified Hub / Geofence</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map((log, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: '700', color: 'var(--color-on-surface)' }}>{log.date}</td>
                  <td>{log.in}</td>
                  <td>{log.out}</td>
                  <td><strong>{log.hours}</strong></td>
                  <td>{log.hub}</td>
                  <td>
                    <span className="accuracy-pill">
                      <span className="status-dot"></span>
                      {log.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => showToast(`Opening audit snapshot for ${log.date}`, 'info')}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>receipt_long</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

