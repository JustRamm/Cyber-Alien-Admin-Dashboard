import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_STUDIO_STATS,
  INITIAL_EMPLOYEES,
  INITIAL_PROJECTS,
  INITIAL_INQUIRIES,
  INITIAL_TASKS,
  INITIAL_LEAVE_BALANCES,
  PRESET_ROLES
} from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(INITIAL_EMPLOYEES[0]); // Alex Mercer
  const [currentRole, setCurrentRole] = useState('ADMIN'); // 'ADMIN' or 'SPECIALIST'
  const [currentPreset, setCurrentPreset] = useState(PRESET_ROLES[0]);
  const [studioStats, setStudioStats] = useState(INITIAL_STUDIO_STATS);
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [leaveBalances, setLeaveBalances] = useState(INITIAL_LEAVE_BALANCES);

  // Clock-in state for interactive simulation
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [clockInModalOpen, setClockInModalOpen] = useState(false);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const toggleRole = () => {
    const nextRole = currentRole === 'ADMIN' ? 'SPECIALIST' : 'ADMIN';
    setCurrentRole(nextRole);
    showToast(`Switched active view session to ${nextRole === 'ADMIN' ? 'Super Admin Mission Control' : 'Specialist Portal'}`, 'info');
  };

  const handleClockIn = (locationData = { distance: 28, accuracy: '± 2.5m', verified: true }) => {
    setIsClockedIn(true);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Update current user
    setCurrentUser(prev => ({
      ...prev,
      clockInTime: nowTime,
      geofenceStatus: 'INSIDE_PERIMETER',
      currentDistanceMeters: locationData.distance
    }));

    // Update studio occupancy
    setStudioStats(prev => ({
      ...prev,
      clockedInCount: Math.min(prev.totalEmployees, prev.clockedInCount + 1),
      occupancyRate: Math.round(((prev.clockedInCount + 1) / prev.totalEmployees) * 100)
    }));

    showToast(`Successfully verified geofence at Pier 14 Hub! Clocked in at ${nowTime}`, 'success');
    setClockInModalOpen(false);
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setCurrentUser(prev => ({
      ...prev,
      clockOutTime: nowTime
    }));

    setStudioStats(prev => ({
      ...prev,
      clockedInCount: Math.max(0, prev.clockedInCount - 1),
      occupancyRate: Math.round(((prev.clockedInCount - 1) / prev.totalEmployees) * 100)
    }));

    showToast(`Clocked out at ${nowTime}. Timesheet registered.`, 'info');
  };

  const logout = () => {
    setIsClockedIn(false);
    showToast('Secure session terminated. Redirecting to platform login...', 'info');
  };

  const loginWithPreset = (presetIdOrEmail) => {
    const foundPreset = PRESET_ROLES.find(
      p => p.id === presetIdOrEmail || p.email.toLowerCase() === (presetIdOrEmail || '').toLowerCase()
    ) || PRESET_ROLES[0];

    const matchingEmp = employees.find(
      e => e.id === foundPreset.employeeId || e.email.toLowerCase() === foundPreset.email.toLowerCase()
    ) || employees[0];

    setCurrentPreset(foundPreset);
    setCurrentUser(matchingEmp);
    setCurrentRole(foundPreset.role);
    showToast(`Authenticated as ${foundPreset.name} // ${foundPreset.roleTitle}`, 'success');
    return foundPreset;
  };

  const addEmployee = (newEmpData) => {
    const newEmp = {
      id: `emp-${Date.now()}`,
      code: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newEmpData.name,
      title: newEmpData.title,
      roleCategory: newEmpData.roleCategory || 'Engineering',
      node: newEmpData.node || 'SFO NODE',
      hub: newEmpData.hub || 'Pier 14 Studio',
      level: newEmpData.level || 'LEVEL 2 SPECIALIST',
      email: newEmpData.email || `${newEmpData.name.toLowerCase().replace(/\s+/g, '.')}@cyberaliens.studio`,
      avatar: newEmpData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      status: 'ACTIVE_ONLINE',
      geofenceStatus: 'INSIDE_PERIMETER',
      currentDistanceMeters: 45,
      accuracyVariance: '± 3.2m',
      clockInTime: '09:30 AM',
      clockOutTime: '--',
      activeSprint: newEmpData.activeSprint || 'Project Obsidian',
      workloadPercent: 70,
      onTimeRate: '100%',
      verified: true,
      skills: newEmpData.skills ? newEmpData.skills.split(',').map(s => s.trim()) : ['Creative Code', 'WebGL'],
      kpis: { sprintVelocity: 90, codeQuality: 92, mentorshipHours: 10, innovationIndex: 88 }
    };

    setEmployees(prev => [newEmp, ...prev]);
    setStudioStats(prev => ({
      ...prev,
      totalEmployees: prev.totalEmployees + 1
    }));
    showToast(`Personnel node added: ${newEmp.name} (${newEmp.code})`, 'success');
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(task => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
    showToast(`Task updated to ${newStatus}`, 'info');
  };

  const submitLeaveRequest = (leaveReq) => {
    showToast(`Leave request submitted for ${leaveReq.startDate} to ${leaveReq.endDate} (${leaveReq.type})`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentRole,
        setCurrentRole,
        currentPreset,
        setCurrentPreset,
        PRESET_ROLES,
        loginWithPreset,
        toggleRole,
        studioStats,
        employees,
        addEmployee,
        projects,
        inquiries,
        tasks,
        updateTaskStatus,
        leaveBalances,
        submitLeaveRequest,
        isClockedIn,
        handleClockIn,
        handleClockOut,
        logout,
        clockInModalOpen,
        setClockInModalOpen,
        isSidebarMobileOpen,
        setIsSidebarMobileOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

