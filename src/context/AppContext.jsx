import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_STUDIO_STATS,
  INITIAL_EMPLOYEES,
  INITIAL_PROJECTS,
  INITIAL_INQUIRIES,
  INITIAL_TASKS,
  INITIAL_LEAVE_BALANCES,
  PRESET_ROLES,
  INITIAL_NOTIFICATIONS,
  INITIAL_PROJECT_CHATS,
  INITIAL_DAILY_WORK_LOGS
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
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [projectChats, setProjectChats] = useState(INITIAL_PROJECT_CHATS);
  const [dailyWorkLogs, setDailyWorkLogs] = useState(INITIAL_DAILY_WORK_LOGS);

  // Modals state
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [clockInModalOpen, setClockInModalOpen] = useState(false);
  const [isClockOutModalOpen, setIsClockOutModalOpen] = useState(false);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

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

  const addTask = (newTaskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskData.title,
      project: newTaskData.project || 'Project Obsidian',
      assignedTo: newTaskData.assignedTo || currentUser.name,
      status: newTaskData.status || 'BACKLOG',
      priority: newTaskData.priority || 'NORMAL',
      estimateHours: Number(newTaskData.estimateHours) || 6,
      loggedHours: 0,
      description: newTaskData.description || ''
    };
    setTasks(prev => [newTask, ...prev]);
    showToast(`Task assigned to ${newTask.assignedTo}: "${newTask.title}"`, 'success');
    return newTask;
  };

  const addProject = (newProjData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: newProjData.title,
      client: newProjData.client || 'Commercial Client Inc.',
      discipline: newProjData.discipline || 'WebGL & Shaders',
      leads: Array.isArray(newProjData.leads) && newProjData.leads.length > 0 ? newProjData.leads : [currentUser.name.split(' ')[0] + ' ' + (currentUser.name.split(' ')[1]?.[0] ? currentUser.name.split(' ')[1][0] + '.' : '')],
      progressPercent: Number(newProjData.progressPercent) || 5,
      etaDate: newProjData.etaDate || 'End Q2',
      status: newProjData.status || 'IN_PROGRESS',
      health: newProjData.health || 'OPTIMAL',
      budgetUSD: newProjData.budgetUSD || '$95,000',
      description: newProjData.description || ''
    };
    setProjects(prev => [newProj, ...prev]);
    setStudioStats(prev => ({
      ...prev,
      activeProjectsCount: prev.activeProjectsCount + 1
    }));
    showToast(`New project initialized: "${newProj.title}"`, 'success');
    return newProj;
  };

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('All notifications marked as read', 'info');
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('Notification center cleared', 'info');
  };

  const addNotification = (newNotif) => {
    const notif = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      unread: true,
      severity: 'NORMAL',
      icon: 'notifications',
      ...newNotif
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(task => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
    showToast(`Task updated to ${newStatus}`, 'info');
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showToast('Task removed from sprint board', 'info');
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    showToast('Project deleted from studio roster', 'info');
  };

  const addProjectMessage = (projectId, messageText, taskId = null) => {
    if (!messageText || !messageText.trim()) return;
    const linkedTask = taskId ? tasks.find(t => t.id === taskId) : null;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: `chat-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      role: currentRole,
      roleTitle: currentPreset?.roleTitle || currentUser.title,
      avatar: currentUser.avatar,
      timestamp: `Today at ${nowTime}`,
      text: messageText,
      taskId: taskId || null,
      taskTitle: linkedTask ? linkedTask.title : null
    };

    setProjectChats(prev => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), newMsg]
    }));
    showToast('Query posted to project discussion room', 'success');
  };

  const submitDailyWorkLog = (logData) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog = {
      id: `log-${Date.now()}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      role: currentRole,
      roleTitle: currentPreset?.roleTitle || currentUser.title,
      date: 'Today',
      time: nowTime,
      hoursLogged: Number(logData.hoursLogged) || 8,
      accomplishments: logData.accomplishments || 'Progressed assigned sprint milestones.',
      tasksWorkedOn: logData.tasksWorkedOn || [],
      blockers: logData.blockers || 'None.'
    };

    setDailyWorkLogs(prev => [newLog, ...prev]);
    setIsClockedIn(false);
    setIsClockOutModalOpen(false);

    setCurrentUser(prev => ({
      ...prev,
      clockOutTime: nowTime
    }));

    setStudioStats(prev => ({
      ...prev,
      clockedInCount: Math.max(0, prev.clockedInCount - 1),
      occupancyRate: Math.round(((prev.clockedInCount - 1) / prev.totalEmployees) * 100)
    }));

    showToast(`Daily shift accomplishment log submitted for ${currentUser.name}. Signed off!`, 'success');
  };

  const submitLeaveRequest = (leaveReq) => {
    showToast(`Leave request submitted for ${leaveReq.startDate} to ${leaveReq.endDate} (${leaveReq.type})`, 'success');
  };

  // RBAC Permission Helpers
  const canAssignTasks = currentRole === 'ADMIN';
  const canDeleteTasks = currentRole === 'ADMIN';
  const canCreateProjects = currentRole === 'ADMIN' || currentRole === 'SALES';
  const canDeleteProjects = currentRole === 'ADMIN';
  const canManagePersonnel = currentRole === 'ADMIN';
  const canEditProposals = currentRole === 'ADMIN' || currentRole === 'SALES';

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
        addProject,
        deleteProject,
        inquiries,
        tasks,
        addTask,
        updateTaskStatus,
        deleteTask,
        projectChats,
        addProjectMessage,
        dailyWorkLogs,
        submitDailyWorkLog,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearAllNotifications,
        addNotification,
        leaveBalances,
        submitLeaveRequest,
        isClockedIn,
        handleClockIn,
        handleClockOut,
        logout,
        clockInModalOpen,
        setClockInModalOpen,
        isClockOutModalOpen,
        setIsClockOutModalOpen,
        isSidebarMobileOpen,
        setIsSidebarMobileOpen,
        isNewTaskModalOpen,
        setIsNewTaskModalOpen,
        isNewProjectModalOpen,
        setIsNewProjectModalOpen,
        canAssignTasks,
        canDeleteTasks,
        canCreateProjects,
        canDeleteProjects,
        canManagePersonnel,
        canEditProposals,
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

