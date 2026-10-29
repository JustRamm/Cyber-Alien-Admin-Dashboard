import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/NotificationsCenter.css';

export const NotificationsCenter = () => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
    addNotification
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = [
    { key: 'ALL', label: 'All Alerts' },
    { key: 'GEOFENCE', label: 'Geofence & Radar' },
    { key: 'INQUIRY', label: 'RFPs & Inquiries' },
    { key: 'SPRINT', label: 'Sprints & QA' },
    { key: 'SYSTEM', label: 'System Nodes' }
  ];

  const filteredNotifications = notifications.filter(n => {
    if (activeCategory === 'ALL') return true;
    return n.category === activeCategory;
  });

  const handleSimulateAlert = () => {
    addNotification({
      category: 'GEOFENCE',
      title: 'Geofence Radar Scan Completed',
      description: 'Pier 14 Studio mesh refreshed. 14 operatives confirmed inside 150m core boundary.',
      severity: 'NORMAL',
      icon: 'radar',
      actionRoute: '/admin/attendance'
    });
  };

  return (
    <div className="page-wrapper">
      {/* Header Section */}
      <section className="notif-header-section">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot pulse"></span>
            <span className="font-label-caps" style={{ color: 'var(--color-secondary)' }}>
              LIVE TELEMETRY MATRIX // REAL-TIME EVENT STREAM
            </span>
          </div>
          <h1 className="font-headline-lg">Studio Notifications</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '15px' }}>
            Real-time geofence breaches, commercial RFP inquiries, sprint ticket milestones, and node status alerts.
          </p>
        </div>

        <div className="notif-actions-bar">
          <span className="accuracy-pill" style={{
            background: unreadNotificationsCount > 0 ? '#fee2e2' : '#ecfdf5',
            color: unreadNotificationsCount > 0 ? '#b90538' : '#047857',
            padding: '8px 14px',
            fontSize: '12px'
          }}>
            {unreadNotificationsCount} Unread Alerts
          </span>

          {unreadNotificationsCount > 0 && (
            <button
              type="button"
              className="btn-ghost"
              onClick={markAllNotificationsAsRead}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>mark_email_read</span>
              <span>Mark All Read</span>
            </button>
          )}

          <button
            type="button"
            className="btn-ghost"
            onClick={clearAllNotifications}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete_sweep</span>
            <span>Clear Stream</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={handleSimulateAlert}
            title="Trigger mock real-time studio telemetry alert"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_alert</span>
            <span>Test Telemetry Alert</span>
          </button>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="notif-filter-tabs">
        {categories.map((cat) => {
          const count = cat.key === 'ALL'
            ? notifications.length
            : notifications.filter(n => n.category === cat.key).length;
          return (
            <button
              key={cat.key}
              type="button"
              className={`notif-tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              <span>{cat.label}</span>
              <span className="notif-tab-badge">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Notifications Stream */}
      <div className="notif-stream-list">
        {filteredNotifications.length === 0 ? (
          <div className="notif-empty-state">
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#10b981' }}>
              check_circle
            </span>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: '20px' }}>
              All Clear! No alerts in this category
            </h3>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '14px', margin: 0 }}>
              Studio nodes and sprint pipelines are operating at nominal baseline.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`notif-card-item ${notif.unread ? 'unread' : ''}`}
            >
              <div className="notif-card-left">
                <div className={`notif-icon-circle ${notif.severity?.toLowerCase() || 'normal'}`}>
                  <span className="material-symbols-outlined">
                    {notif.icon || 'notifications'}
                  </span>
                </div>

                <div className="notif-content-block">
                  <div className="notif-tag-row">
                    <span className="notif-category-tag">// {notif.category}</span>
                    <span>•</span>
                    <span className="notif-timestamp">{notif.timestamp}</span>
                    {notif.unread && (
                      <span className="status-dot pulse" style={{ width: 6, height: 6, background: '#B90538' }}></span>
                    )}
                  </div>
                  <h3 className="notif-item-title">{notif.title}</h3>
                  <p className="notif-item-desc">{notif.description}</p>
                </div>
              </div>

              <div className="notif-card-right">
                {notif.actionRoute && (
                  <button
                    type="button"
                    className="notif-action-btn"
                    onClick={() => {
                      markNotificationAsRead(notif.id);
                      navigate(notif.actionRoute);
                    }}
                  >
                    <span>Inspect</span>
                    <span>→</span>
                  </button>
                )}

                <button
                  type="button"
                  className="notif-read-toggle-btn"
                  onClick={() => markNotificationAsRead(notif.id)}
                  title={notif.unread ? 'Mark as read' : 'Read'}
                  aria-label="Toggle Read"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    {notif.unread ? 'drafts' : 'check'}
                  </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
