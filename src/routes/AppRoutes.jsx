import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Auth Screens
import { PlatformLogin } from '../screens/PlatformLogin';
import { ResetPassword } from '../screens/ResetPassword';
import { FirstLoginSetup } from '../screens/FirstLoginSetup';

// Admin Core Screens
import { AdminMissionControl } from '../screens/AdminMissionControl';
import { StudioOperationsDashboard } from '../screens/StudioOperationsDashboard';
import { AttendanceGeolocationCommand } from '../screens/AttendanceGeolocationCommand';
import { PersonnelDirectory } from '../screens/PersonnelDirectory';
import { EmployeeDetailControl } from '../screens/EmployeeDetailControl';

// Specialist Portal Screens
import { EmployeeHomeClockIn } from '../screens/EmployeeHomeClockIn';
import { AttendanceTimesheets } from '../screens/AttendanceTimesheets';
import { LeaveManagement } from '../screens/LeaveManagement';
import { EmployeeProfileKPIs } from '../screens/EmployeeProfileKPIs';
import { TasksSprintBoard } from '../screens/TasksSprintBoard';
import { NotificationsCenter } from '../screens/NotificationsCenter';

export const AppRoutes = () => {
  const { currentPreset, currentRole } = useApp();
  const isDefaultAdminRoute = currentPreset?.defaultRoute?.startsWith('/admin');
  const defaultLanding = currentRole === 'ADMIN'
    ? (currentPreset?.defaultRoute || '/admin/mission-control')
    : (isDefaultAdminRoute ? '/portal/home' : (currentPreset?.defaultRoute || '/portal/home'));

  return (
    <Routes>
      {/* Root & Defaults */}
      <Route path="/" element={<Navigate to={defaultLanding} replace />} />
      <Route path="/admin" element={<Navigate to="/admin/mission-control" replace />} />
      <Route path="/portal" element={<Navigate to="/portal/home" replace />} />

      {/* Authentication */}
      <Route path="/login" element={<PlatformLogin />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/setup-wizard" element={<FirstLoginSetup />} />

      {/* Command Suite (Admin Core - Only Admin gets Geofence Radar & Mission Control) */}
      <Route
        path="/admin/mission-control"
        element={currentRole === 'ADMIN' ? <AdminMissionControl /> : <Navigate to="/portal/home" replace />}
      />
      <Route path="/admin/operations" element={<StudioOperationsDashboard />} />
      <Route
        path="/admin/attendance"
        element={currentRole === 'ADMIN' ? <AttendanceGeolocationCommand /> : <Navigate to="/portal/home" replace />}
      />
      <Route path="/admin/personnel" element={<PersonnelDirectory />} />
      <Route path="/admin/employee/:id" element={<EmployeeDetailControl />} />

      {/* Specialist Workspace (Portal) */}
      <Route path="/portal/home" element={<EmployeeHomeClockIn />} />
      <Route path="/portal/attendance" element={<AttendanceTimesheets />} />
      <Route path="/portal/leaves" element={<LeaveManagement />} />
      <Route path="/portal/profile" element={<EmployeeProfileKPIs />} />
      <Route path="/portal/tasks" element={<TasksSprintBoard />} />

      {/* Notifications Center */}
      <Route path="/notifications" element={<NotificationsCenter />} />
      <Route path="/admin/notifications" element={<NotificationsCenter />} />
      <Route path="/portal/notifications" element={<NotificationsCenter />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={defaultLanding} replace />} />
    </Routes>
  );
};

