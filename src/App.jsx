import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppRoutes } from './routes/AppRoutes';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ClockInModal } from './components/ClockInModal';
import { NewTaskModal } from './components/NewTaskModal';
import { NewProjectModal } from './components/NewProjectModal';
import './styles/global.css';
import './styles/responsive.css';

const AppLayout = () => {
  const location = useLocation();
  const { toastMessage } = useApp();

  const isAuthRoute =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/reset-password' ||
    location.pathname === '/setup-wizard';

  return (
    <>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: '600',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderLeft: `4px solid ${toastMessage.type === 'error' ? 'var(--color-error)' : 'var(--color-secondary)'}`
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: toastMessage.type === 'error' ? 'var(--color-error)' : 'var(--color-secondary)' }}>
            {toastMessage.type === 'error' ? 'error' : toastMessage.type === 'success' ? 'check_circle' : 'info'}
          </span>
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Global Interactive Clock-In Verification Modal */}
      <ClockInModal />

      {/* Global Interactive Task & Project Creation Modals */}
      <NewTaskModal />
      <NewProjectModal />

      {isAuthRoute ? (
        <main>
          <AppRoutes />
        </main>
      ) : (
        <div className="app-container">
          <Sidebar />
          <div className="main-content-layout">
            <Header />
            <main>
              <AppRoutes />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}

