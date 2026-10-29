import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root & Defaults */}
      <Route path="/" element={<Navigate to="/admin/mission-control" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/mission-control" replace />} />
      <Route path="/portal" element={<Navigate to="/portal/home" replace />} />

      {/* Authentication */}
      <Route path="/login" element={<PlatformLogin />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/setup-wizard" element={<FirstLoginSetup />} />

      {/* Command Suite (Admin Core) */}
      <Route path="/admin/mission-control" element={<AdminMissionControl />} />
      <Route path="/admin/operations" element={<StudioOperationsDashboard />} />
      <Route path="/admin/attendance" element={<AttendanceGeolocationCommand />} />
      <Route path="/admin/personnel" element={<PersonnelDirectory />} />
      <Route path="/admin/employee/:id" element={<EmployeeDetailControl />} />

      {/* Specialist Workspace (Portal) */}
      <Route path="/portal/home" element={<EmployeeHomeClockIn />} />
      <Route path="/portal/attendance" element={<AttendanceTimesheets />} />
      <Route path="/portal/leaves" element={<LeaveManagement />} />
      <Route path="/portal/profile" element={<EmployeeProfileKPIs />} />
      <Route path="/portal/tasks" element={<TasksSprintBoard />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin/mission-control" replace />} />
    </Routes>
  );
};

