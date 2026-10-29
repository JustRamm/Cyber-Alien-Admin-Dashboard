// Comprehensive Grounded Mock Data extracted from Stitch Designs

export const INITIAL_STUDIO_STATS = {
  clockedInCount: 28,
  totalEmployees: 34,
  occupancyRate: 82,
  remoteSyncCount: 6,
  tasksDueToday: 19,
  tasksCompletionRate: 68,
  criticalPathItems: 4,
  newBookingsCount: 7,
  pipelineValue: '$145,000',
  activeProjectsCount: 8,
  overdueTasksCount: 2,
  revenueUSD: '$348,500',
  revenueChangePercent: '+18.4%',
  velocityScore: '94.2%',
  socialImpactUSD: '$52,275',
  geofenceRadiusMeters: 150,
  hubLat: 37.7925,
  hubLng: -122.3920,
  hubName: 'Pier 14 Studio Waterfront, San Francisco',
  cluster: 'US-EAST-ALN',
  latencyMs: 14
};

export const INITIAL_EMPLOYEES = [
  {
    id: 'emp-8821',
    name: 'Alex Mercer',
    code: 'EMP-8821',
    node: 'SFO NODE',
    hub: 'Pier 14 Studio',
    title: 'Staff Systems Architect',
    roleCategory: 'Engineering',
    level: 'LEVEL 4 ARCHITECT',
    email: 'alex.mercer@cyberaliens.studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    status: 'ACTIVE_ONLINE',
    geofenceStatus: 'INSIDE_PERIMETER',
    currentDistanceMeters: 42,
    accuracyVariance: '± 3.8m',
    clockInTime: '09:12 AM',
    clockOutTime: '18:45 PM',
    activeSprint: 'Project Obsidian',
    workloadPercent: 88,
    onTimeRate: '96.4%',
    verified: true,
    skills: ['Frontend Architecture', 'WebGL Shaders', 'WebAssembly', 'Distributed Nodes'],
    kpis: {
      sprintVelocity: 94,
      codeQuality: 98,
      mentorshipHours: 24,
      innovationIndex: 91
    }
  },
  {
    id: 'emp-041',
    name: 'Elena Rostova',
    code: 'EMP-041',
    node: 'SFO NODE',
    hub: 'Pier 14 Studio',
    title: 'Senior UI/UX & Spatial Lead',
    roleCategory: 'Design & Systems',
    level: 'LEVEL 3 SPATIAL',
    email: 'elena.rostova@cyberaliens.studio',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    status: 'ON_LEAVE',
    geofenceStatus: 'REMOTE_APPROVED',
    currentDistanceMeters: 12,
    accuracyVariance: '± 2.4m',
    clockInTime: '09:14 AM',
    clockOutTime: '--',
    activeSprint: 'Vision Pro Spatial Kit',
    workloadPercent: 15,
    onTimeRate: '98.1%',
    verified: true,
    skills: ['VisionOS UI', 'Procedural Shaders', 'Figma Tokens', 'Micro-Interactions'],
    kpis: {
      sprintVelocity: 88,
      codeQuality: 95,
      mentorshipHours: 18,
      innovationIndex: 96
    }
  },
  {
    id: 'emp-012',
    name: 'Marcus Vance',
    code: 'EMP-012',
    node: 'LONDON NODE',
    hub: 'London Soho Hub',
    title: 'Creative Director & 3D Motion',
    roleCategory: '3D Motion & Spatial',
    level: 'LEVEL 5 DIRECTOR',
    email: 'marcus.vance@cyberaliens.studio',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    status: 'ACTIVE_ONLINE',
    geofenceStatus: 'OUT_OF_BOUNDS',
    currentDistanceMeters: 1800,
    accuracyVariance: '± 5.1m',
    clockInTime: '10:02 AM',
    clockOutTime: '--',
    activeSprint: 'Monolith Identity 2026',
    workloadPercent: 92,
    onTimeRate: '91.2%',
    verified: true,
    skills: ['Unreal Engine 5', 'Houdini Simulation', 'Art Direction', 'Kinetic Typography'],
    kpis: {
      sprintVelocity: 96,
      codeQuality: 92,
      mentorshipHours: 32,
      innovationIndex: 99
    }
  },
  {
    id: 'emp-094',
    name: 'Kenji Takahashi',
    code: 'EMP-094',
    node: 'TOKYO NODE',
    hub: 'Tokyo Shibuya Hub',
    title: 'Senior WebGL & Three.js Engineer',
    roleCategory: 'Engineering',
    level: 'LEVEL 4 ENGINEER',
    email: 'kenji.takahashi@cyberaliens.studio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    status: 'ACTIVE_ONLINE',
    geofenceStatus: 'BREACH_FLAGGED',
    currentDistanceMeters: 3400,
    accuracyVariance: '± 6.4m',
    clockInTime: '08:58 AM',
    clockOutTime: '--',
    activeSprint: 'Procedural Globe v4',
    workloadPercent: 79,
    onTimeRate: '89.4%',
    verified: true,
    skills: ['GLSL Shaders', 'Three.js Core', 'WebGPU', 'Math Optimization'],
    kpis: {
      sprintVelocity: 91,
      codeQuality: 99,
      mentorshipHours: 12,
      innovationIndex: 94
    }
  },
  {
    id: 'emp-9034',
    name: 'Sarah Jenkins',
    code: 'EMP-9034',
    node: 'SFO NODE',
    hub: 'Pier 14 Studio',
    title: 'Principal Motion & Brand Designer',
    roleCategory: 'Design & Systems',
    level: 'LEVEL 3 STRATEGY',
    email: 'sarah.jenkins@cyberaliens.studio',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    status: 'ACTIVE_ONLINE',
    geofenceStatus: 'INSIDE_PERIMETER',
    currentDistanceMeters: 120,
    accuracyVariance: '± 4.2m',
    clockInTime: '09:38 AM',
    clockOutTime: '--',
    activeSprint: 'Project Obsidian',
    workloadPercent: 95,
    onTimeRate: '94.0%',
    verified: true,
    skills: ['Brand Architecture', 'Motion Design', 'Cinema 4D', 'Design Systems'],
    kpis: {
      sprintVelocity: 93,
      codeQuality: 96,
      mentorshipHours: 20,
      innovationIndex: 93
    }
  },
  {
    id: 'emp-042',
    name: 'Kaito Tanaka',
    code: 'EMP-042',
    node: 'SFO NODE',
    hub: 'Pier 14 Studio',
    title: '3D Motion Lead',
    roleCategory: '3D Motion & Spatial',
    level: 'STAFF LEAD',
    email: 'kaito.tanaka@cyberaliens.studio',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    status: 'ACTIVE_ONLINE',
    geofenceStatus: 'INSIDE_PERIMETER',
    currentDistanceMeters: 8,
    accuracyVariance: '± 1.2m',
    clockInTime: '08:58 AM',
    clockOutTime: '--',
    activeSprint: 'Chrono Vault',
    workloadPercent: 84,
    onTimeRate: '99.0%',
    verified: true,
    skills: ['3D Modeling', 'Character Rigging', 'Spline 3D', 'Keyframe Polish'],
    kpis: {
      sprintVelocity: 90,
      codeQuality: 94,
      mentorshipHours: 15,
      innovationIndex: 89
    }
  },
  {
    id: 'emp-110',
    name: 'Amara Thorne',
    code: 'EMP-110',
    node: 'REMOTE NODE SFO',
    hub: 'Pier 14 Studio',
    title: 'Brand Systems Lead',
    roleCategory: 'Design & Systems',
    level: 'LEAD',
    email: 'amara.thorne@cyberaliens.studio',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    status: 'ACTIVE_ONLINE',
    geofenceStatus: 'REMOTE_APPROVED',
    currentDistanceMeters: 8200,
    accuracyVariance: 'WireGuard Mesh',
    clockInTime: '09:30 AM',
    clockOutTime: '--',
    activeSprint: 'STARLET 5.0',
    workloadPercent: 78,
    onTimeRate: '95.5%',
    verified: true,
    skills: ['Design Tokens', 'Typography Systems', 'Accessibility AAA', 'Creative Writing'],
    kpis: {
      sprintVelocity: 95,
      codeQuality: 97,
      mentorshipHours: 26,
      innovationIndex: 92
    }
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-obsidian',
    title: 'Project Obsidian',
    client: 'Obsidian Cloud Inc.',
    discipline: 'WebGL & Shaders',
    leads: ['Sarah J.', 'Marcus V.'],
    progressPercent: 82,
    etaDate: 'Feb 28',
    status: 'IN_PROGRESS',
    health: 'OPTIMAL',
    budgetUSD: '$120,000',
    description: 'High-density spatial compute explorer with real-time GLSL noise simulations and procedural voxel mesh.'
  },
  {
    id: 'proj-starlet',
    title: 'STARLET 5.0',
    client: 'Mind Empowered Foundation',
    discipline: 'Transmedia EdTech (Impact)',
    leads: ['Alex M.', 'Elena R.'],
    progressPercent: 95,
    etaDate: 'Mar 04',
    status: 'CLIENT_REVIEW',
    health: 'OPTIMAL',
    budgetUSD: '$52,275 (Subsidized)',
    description: 'Empowering underprivileged youth through interactive browser-based spatial storytelling and creative coding.'
  },
  {
    id: 'proj-neo',
    title: 'Neo-Kinetic Studio',
    client: 'Robotics Incubator',
    discipline: '3D Hardware Design',
    leads: ['Kenji T.'],
    progressPercent: 45,
    etaDate: 'Mar 18',
    status: 'IN_PROGRESS',
    health: 'NEEDS_ATTENTION',
    budgetUSD: '$85,000',
    description: 'Interactive digital twin for bipedal robotic telemetry and automated actuator calibration visualizer.'
  },
  {
    id: 'proj-chrono',
    title: 'Chrono Vault',
    client: 'Munich Biennial',
    discipline: 'Unreal Engine 5 Film',
    leads: ['Maya P.', 'Marcus V.'],
    progressPercent: 100,
    etaDate: 'Completed',
    status: 'DELIVERED',
    health: 'OPTIMAL',
    budgetUSD: '$95,000',
    description: 'Speculative architectural exhibition rendered at 8K with volumetric lighting and binaural audio.'
  },
  {
    id: 'proj-hyperion',
    title: 'Hyperion Audio',
    client: 'Modular Synthesizer Co.',
    discipline: 'Rust / WebAssembly DSP',
    leads: ['Liam K.'],
    progressPercent: 60,
    etaDate: 'API Dependent',
    status: 'BLOCKED',
    health: 'CRITICAL',
    budgetUSD: '$64,000',
    description: 'Low-latency browser sound generation engine utilizing custom Rust audio nodes and polyphonic patch cables.'
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: 'inq-01',
    company: 'Aura Botanica',
    projectScope: 'Rebrand & E-Commerce WebGL',
    email: 'hello@aurabotanica.com',
    budgetTier: '$50k–$100k',
    receivedAt: '2 hours ago',
    urgency: 'HIGH_PRIORITY',
    status: 'NEEDS_TRIAGE'
  },
  {
    id: 'inq-02',
    company: 'Kinetix AI',
    projectScope: 'Realtime Voice Interface & Spatial 3D',
    email: 'founders@kinetix.ai',
    budgetTier: '$80k–$120k',
    receivedAt: '5 hours ago',
    urgency: 'HIGH_PRIORITY',
    status: 'UNDER_REVIEW'
  },
  {
    id: 'inq-03',
    company: 'Voxel Works',
    projectScope: 'Procedural Architecture Generator',
    email: 'studio@voxelworks.io',
    budgetTier: '$30k–$60k',
    receivedAt: 'Yesterday',
    urgency: 'NORMAL',
    status: 'SCHEDULED_CALL'
  }
];

export const INITIAL_TASKS = [
  {
    id: 'task-101',
    title: 'Refactor GLSL fragment shader for volumetric fog',
    project: 'Project Obsidian',
    assignedTo: 'Alex Mercer',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    estimateHours: 6,
    loggedHours: 4.5
  },
  {
    id: 'task-102',
    title: 'Design character interaction states for episode 3',
    project: 'STARLET 5.0',
    assignedTo: 'Sarah Jenkins',
    status: 'REVIEW',
    priority: 'HIGH',
    estimateHours: 8,
    loggedHours: 8
  },
  {
    id: 'task-103',
    title: 'Fix WebGPU memory leak on frame resize',
    project: 'Neo-Kinetic Studio',
    assignedTo: 'Kenji Takahashi',
    status: 'BLOCKED',
    priority: 'CRITICAL',
    estimateHours: 12,
    loggedHours: 5
  },
  {
    id: 'task-104',
    title: 'Export 8K keyframes for Munich Biennial press kit',
    project: 'Chrono Vault',
    assignedTo: 'Kaito Tanaka',
    status: 'DONE',
    priority: 'NORMAL',
    estimateHours: 4,
    loggedHours: 3.5
  },
  {
    id: 'task-105',
    title: 'Setup WebAssembly thread worker pooling',
    project: 'Hyperion Audio',
    assignedTo: 'Alex Mercer',
    status: 'BACKLOG',
    priority: 'HIGH',
    estimateHours: 10,
    loggedHours: 0
  }
];

export const INITIAL_LEAVE_BALANCES = {
  annualLeave: { total: 20, used: 6, remaining: 14 },
  sickLeave: { total: 10, used: 2, remaining: 8 },
  sabbatical: { total: 5, used: 0, remaining: 5 }
};

