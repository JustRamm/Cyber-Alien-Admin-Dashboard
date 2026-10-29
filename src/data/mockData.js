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
    title: 'Studio Principal & Super Admin',
    roleCategory: 'Admin',
    level: 'LEVEL 5 ADMIN',
    email: 'alex@cyberaliens.in',
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
    skills: ['Studio Direction', 'Task Assignment & Governance', 'Budget Control', 'Personnel Operations'],
    kpis: {
      sprintVelocity: 94,
      codeQuality: 98,
      mentorshipHours: 24,
      innovationIndex: 91
    }
  },
  {
    id: 'emp-094',
    name: 'Kenji Takahashi',
    code: 'EMP-094',
    node: 'TOKYO NODE',
    hub: 'Tokyo Shibuya Hub',
    title: 'Senior Frontend & WebGL Engineer',
    roleCategory: 'Frontend Developer',
    level: 'LEVEL 4 FRONTEND',
    email: 'kenji.takahashi@cyberaliens.in',
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
    skills: ['Three.js & WebGL', 'GLSL Custom Shaders', 'React 19 & TypeScript', 'Performance Profiling'],
    kpis: {
      sprintVelocity: 91,
      codeQuality: 99,
      mentorshipHours: 12,
      innovationIndex: 94
    }
  },
  {
    id: 'emp-012',
    name: 'Marcus Vance',
    code: 'EMP-012',
    node: 'LONDON NODE',
    hub: 'London Soho Hub',
    title: 'Senior Backend & Systems Engineer',
    roleCategory: 'Backend Developer',
    level: 'LEVEL 4 BACKEND',
    email: 'marcus.vance@cyberaliens.in',
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
    skills: ['Distributed Microservices', 'WebSocket & gRPC', 'PostgreSQL & Redis', 'Node/Go Pipelines'],
    kpis: {
      sprintVelocity: 96,
      codeQuality: 92,
      mentorshipHours: 32,
      innovationIndex: 99
    }
  },
  {
    id: 'emp-041',
    name: 'Elena Rostova',
    code: 'EMP-041',
    node: 'SFO NODE',
    hub: 'Pier 14 Studio',
    title: 'Lead UI/UX & Spatial Designer',
    roleCategory: 'Designer',
    level: 'LEVEL 4 DESIGN',
    email: 'elena.rostova@cyberaliens.in',
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
    skills: ['Figma Design Systems', 'Spatial UX / visionOS', 'Design Tokens', 'Interactive Prototypes'],
    kpis: {
      sprintVelocity: 88,
      codeQuality: 95,
      mentorshipHours: 18,
      innovationIndex: 96
    }
  },
  {
    id: 'emp-9034',
    name: 'Sarah Jenkins',
    code: 'EMP-9034',
    node: 'SFO NODE',
    hub: 'Pier 14 Studio',
    title: 'Head of Client Partnerships & Sales',
    roleCategory: 'Sales',
    level: 'LEVEL 4 COMMERCIAL',
    email: 'sarah.jenkins@cyberaliens.in',
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
    skills: ['Client Acquisitions', 'Commercial Proposals', 'Enterprise RFPs', 'Pipeline Growth'],
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
    title: 'Build WebGL volumetric fog shader pass',
    project: 'Project Obsidian',
    assignedTo: 'Kenji Takahashi',
    roleTag: 'FRONTEND_DEV',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    estimateHours: 6,
    loggedHours: 4.5,
    description: 'Implement raymarching volumetric density fog with custom GLSL uniforms.'
  },
  {
    id: 'task-102',
    title: 'Deploy GraphQL microservice for telemetry buffer',
    project: 'Project Obsidian',
    assignedTo: 'Marcus Vance',
    roleTag: 'BACKEND_DEV',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    estimateHours: 8,
    loggedHours: 6,
    description: 'Provide high-throughput Float32Array binary streams via WebSocket.'
  },
  {
    id: 'task-103',
    title: 'Design spatial UI tokens and VisionOS component kit',
    project: 'STARLET 5.0',
    assignedTo: 'Elena Rostova',
    roleTag: 'DESIGNER',
    status: 'REVIEW',
    priority: 'HIGH',
    estimateHours: 10,
    loggedHours: 9.5,
    description: 'Export spatial typography tokens, lighting materials, and micro-interactions.'
  },
  {
    id: 'task-104',
    title: 'Draft commercial RFP proposal for Aura Botanica ($120k)',
    project: 'STARLET 5.0',
    assignedTo: 'Sarah Jenkins',
    roleTag: 'SALES',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    estimateHours: 8,
    loggedHours: 5,
    description: 'Prepare multi-tier budget scope and schedule client alignment pitch.'
  },
  {
    id: 'task-105',
    title: 'Supervise multi-node cluster synchronization & review milestones',
    project: 'Project Obsidian',
    assignedTo: 'Alex Mercer',
    roleTag: 'ADMIN',
    status: 'IN_PROGRESS',
    priority: 'NORMAL',
    estimateHours: 5,
    loggedHours: 3,
    description: 'Audit SFO Pier 14 HQ and London node cluster latency and milestone delivery.'
  },
  {
    id: 'task-106',
    title: 'Fix Three.js canvas memory leak on viewport resize',
    project: 'Neo-Kinetic Studio',
    assignedTo: 'Kenji Takahashi',
    roleTag: 'FRONTEND_DEV',
    status: 'BACKLOG',
    priority: 'HIGH',
    estimateHours: 8,
    loggedHours: 1,
    description: 'Dispose unreferenced geometry buffers during browser viewport transitions.'
  },
  {
    id: 'task-107',
    title: 'Database migration for commercial proposal ledger',
    project: 'Neo-Kinetic Studio',
    assignedTo: 'Marcus Vance',
    roleTag: 'BACKEND_DEV',
    status: 'REVIEW',
    priority: 'NORMAL',
    estimateHours: 6,
    loggedHours: 6,
    description: 'Migrate contract amendment tables and add audit hash stamps.'
  },
  {
    id: 'task-108',
    title: 'Export 3D volumetric assets & Figma design library',
    project: 'Project Obsidian',
    assignedTo: 'Elena Rostova',
    roleTag: 'DESIGNER',
    status: 'DONE',
    priority: 'NORMAL',
    estimateHours: 4,
    loggedHours: 4,
    description: 'Synced 8K keyframe textures and normal maps to the studio asset vault.'
  },
  {
    id: 'task-109',
    title: 'Negotiate contract extension for Munich Biennial',
    project: 'Chrono Vault',
    assignedTo: 'Sarah Jenkins',
    roleTag: 'SALES',
    status: 'DONE',
    priority: 'HIGH',
    estimateHours: 6,
    loggedHours: 6,
    description: 'Secured full delivery acceptance and $95k final milestone wire.'
  }
];

export const INITIAL_LEAVE_BALANCES = {
  annualLeave: { total: 20, used: 6, remaining: 14 },
  sickLeave: { total: 10, used: 2, remaining: 8 },
  sabbatical: { total: 5, used: 0, remaining: 5 }
};

export const PRESET_ROLES = [
  {
    id: 'super-admin',
    employeeId: 'emp-8821',
    name: 'Alex Mercer',
    email: 'alex@cyberaliens.in',
    password: 'SuperAdminPass#2026',
    role: 'ADMIN',
    isSuperAdmin: true,
    roleBadge: 'ADMIN',
    roleTitle: 'Studio Principal & Super Admin',
    department: 'Studio Executive & Systems Architecture',
    node: 'SFO NODE 01 // PIER 14 HQ',
    tier: 'LEVEL 5 ROOT PRIVILEGES',
    badgeColor: '#B90538',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    defaultRoute: '/admin/mission-control',
    responsibilities: [
      'Assign sprint tasks to each individual operative across all projects.',
      'Supervise total studio occupancy, system latency, and multi-node cluster health.',
      'Authorize annual production budgets ($348.5k) and commercial client contracts.',
      'Enforce geofence boundary parameters and review security breach escalations.'
    ],
    powers: [
      'Full Administrative Root Access: Create, Edit, Assign, and Delete all tasks & projects',
      'Geofence radius configuration & manual punch override authority',
      'Employee onboarding, role tier elevation, and suspension protocol',
      'Access to financial telemetry, client pipelines, and billing balance sheets',
      'Participate in all project chatrooms with verified root administrator authority'
    ]
  },
  {
    id: 'frontend-dev',
    employeeId: 'emp-094',
    name: 'Kenji Takahashi',
    email: 'kenji.takahashi@cyberaliens.in',
    password: 'FrontendDevPass#2026',
    role: 'FRONTEND_DEV',
    isSuperAdmin: false,
    roleBadge: 'FRONTEND DEVELOPER',
    roleTitle: 'Senior Frontend & WebGL Engineer',
    department: 'Creative Engineering & UI Systems',
    node: 'TOKYO NODE 03 // SHIBUYA',
    tier: 'LEVEL 4 SPECIALIST',
    badgeColor: '#06B6D4',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    defaultRoute: '/portal/home',
    responsibilities: [
      'Develop low-latency WebGL, WebGPU, and Three.js shader pipelines for browser installations.',
      'Execute assigned frontend tasks and log daily hours upon clocking out.',
      'Ask and answer technical frontend queries in project-specific chatrooms.',
      'Maintain 60fps frame rate benchmarks and optimize GLSL shader memory.'
    ],
    powers: [
      'View and advance assigned frontend sprint tasks (Backlog → In Progress → Review → Done)',
      'Participate in project chatrooms to ask questions and clarify technical requirements with teammates and Admin',
      'Submit daily shift clock-out handover logs detailing daily accomplishments',
      'Access personal Craft Mastery, sprint velocity, and technical benchmark telemetry'
    ]
  },
  {
    id: 'backend-dev',
    employeeId: 'emp-012',
    name: 'Marcus Vance',
    email: 'marcus.vance@cyberaliens.in',
    password: 'BackendDevPass#2026',
    role: 'BACKEND_DEV',
    isSuperAdmin: false,
    roleBadge: 'BACKEND DEVELOPER',
    roleTitle: 'Senior Backend & Systems Engineer',
    department: 'Distributed Infrastructure & APIs',
    node: 'LONDON NODE 02 // SOHO HUB',
    tier: 'LEVEL 4 SPECIALIST',
    badgeColor: '#8B5CF6',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    defaultRoute: '/portal/home',
    responsibilities: [
      'Engineer distributed GraphQL microservices, Redis caching, and WebSocket streams.',
      'Maintain 14ms cluster latency and 128.4 Gb/s stream throughput.',
      'Execute assigned backend tasks and submit daily work accomplishment logs upon clocking out.',
      'Coordinate API contracts and database schema updates in project chatrooms.'
    ],
    powers: [
      'View and advance assigned backend sprint tickets and API endpoints',
      'Participate in project chatrooms to ask questions and resolve API schemas with Frontend, Design, and Admin',
      'Submit daily shift clock-out handover logs detailing daily accomplishments',
      'Inspect cluster telemetry, server node health, and endpoint response times'
    ]
  },
  {
    id: 'designer',
    employeeId: 'emp-041',
    name: 'Elena Rostova',
    email: 'elena.rostova@cyberaliens.in',
    password: 'DesignerPass#2026',
    role: 'DESIGNER',
    isSuperAdmin: false,
    roleBadge: 'DESIGNER',
    roleTitle: 'Lead UI/UX & Spatial Designer',
    department: 'Design Systems & VisionOS Spatial 3D',
    node: 'SFO NODE 01 // PIER 14 HQ',
    tier: 'LEVEL 4 SPECIALIST',
    badgeColor: '#10B981',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    defaultRoute: '/portal/home',
    responsibilities: [
      'Design spatial UI design tokens, micro-interactions, and VisionOS component kits.',
      'Maintain Figma design system token parity and procedural 3D assets.',
      'Execute assigned design deliverables and log daily accomplishments when clocking out.',
      'Collaborate on art direction and visual specs in project chatrooms.'
    ],
    powers: [
      'View and advance assigned design sprint tickets and spatial assets',
      'Participate in project chatrooms to review design tokens and clarify UI requirements with Engineers and Admin',
      'Submit daily shift clock-out handover logs detailing daily accomplishments',
      'Manage design asset vault, review critiques, and maintain visual tokens'
    ]
  },
  {
    id: 'sales-lead',
    employeeId: 'emp-9034',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@cyberaliens.in',
    password: 'SalesLeadPass#2026',
    role: 'SALES',
    isSuperAdmin: false,
    roleBadge: 'SALES',
    roleTitle: 'Head of Client Partnerships & Sales',
    department: 'Commercial Engagements & Growth',
    node: 'SFO NODE 01 // PIER 14 HQ',
    tier: 'LEVEL 4 COMMERCIAL',
    badgeColor: '#F59E0B',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    defaultRoute: '/portal/home',
    responsibilities: [
      'Drive commercial sales pipeline ($348.5k), client proposals, and RFP reviews.',
      'Engage prospective clients (Aura Botanica, Kinetix AI, Voxel Works) and close contracts.',
      'Execute assigned commercial tasks and log client deliverables upon clocking out.',
      'Relay client feedback and milestone timelines in project chatrooms.'
    ],
    powers: [
      'Create, edit, and update client proposals, inquiries, and commercial RFP deals',
      'Participate in project chatrooms to align client requirements with Engineers, Designers, and Admin',
      'Submit daily shift clock-out handover logs detailing client deal progress',
      'Inspect studio operations pipeline, commercial win probabilities, and contract values'
    ]
  }
];

export const INITIAL_PROJECT_CHATS = {
  'proj-obsidian': [
    {
      id: 'chat-obs-1',
      senderId: 'emp-012',
      senderName: 'Marcus Vance',
      role: 'BACKEND_DEV',
      roleTitle: 'Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      timestamp: 'Today at 09:30 AM',
      text: 'Hey @Kenji, the GraphQL endpoint for volumetric shader buffers has landed on staging: `/api/v2/obsidian/particles`.',
      taskId: 'task-be-1',
      taskTitle: 'GraphQL microservice for telemetry buffer'
    },
    {
      id: 'chat-obs-2',
      senderId: 'emp-094',
      senderName: 'Kenji Takahashi',
      role: 'FRONTEND_DEV',
      roleTitle: 'Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      timestamp: 'Today at 09:42 AM',
      text: 'Awesome Marcus! Query on #task-fe-1: Is the stream returning ArrayBuffer or JSON Float32Array? Need to know for the WebGL uniform binding.',
      taskId: 'task-fe-1',
      taskTitle: 'Build WebGL volumetric fog shader pass'
    },
    {
      id: 'chat-obs-3',
      senderId: 'emp-012',
      senderName: 'Marcus Vance',
      role: 'BACKEND_DEV',
      roleTitle: 'Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      timestamp: 'Today at 09:48 AM',
      text: 'It streams raw Float32Array directly through the WebSocket to keep the 60fps frame rate without JSON serialization overhead.',
      taskId: 'task-be-1',
      taskTitle: 'GraphQL microservice for telemetry buffer'
    },
    {
      id: 'chat-obs-4',
      senderId: 'emp-041',
      senderName: 'Elena Rostova',
      role: 'DESIGNER',
      roleTitle: 'Designer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      timestamp: 'Today at 10:15 AM',
      text: '@Alex Mercer, the new dark mode tokens and 3D spatial viewport lighting rigs are updated in the asset vault for Project Obsidian. Ready for admin sign-off!',
      taskId: 'task-ds-2',
      taskTitle: 'Export 3D volumetric assets'
    },
    {
      id: 'chat-obs-5',
      senderId: 'emp-8821',
      senderName: 'Alex Mercer',
      role: 'ADMIN',
      roleTitle: 'Studio Principal & Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      timestamp: 'Today at 10:30 AM',
      text: 'Reviewed and approved Elena! Lighting values look phenomenal. @Sarah Jenkins, we can now present the interactive demo to Obsidian Cloud leadership.',
      taskId: 'task-ad-1',
      taskTitle: 'Supervise multi-node cluster synchronization'
    },
    {
      id: 'chat-obs-6',
      senderId: 'emp-9034',
      senderName: 'Sarah Jenkins',
      role: 'SALES',
      roleTitle: 'Sales & Partnerships',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      timestamp: 'Today at 10:45 AM',
      text: 'Super! I have scheduled the client review call for 3:00 PM EST. Will share the meeting link in the channel.',
      taskId: 'task-sl-3',
      taskTitle: 'Finalize client deliverable sign-off'
    }
  ],
  'proj-starlet': [
    {
      id: 'chat-str-1',
      senderId: 'emp-9034',
      senderName: 'Sarah Jenkins',
      role: 'SALES',
      roleTitle: 'Sales & Partnerships',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      timestamp: 'Today at 08:30 AM',
      text: 'Mind Empowered Foundation loved the latest transmedia chapter! They asked if we can add subtitles in 4 languages for the next sprint release.',
      taskId: 'task-sl-1',
      taskTitle: 'Draft commercial RFP proposal'
    },
    {
      id: 'chat-str-2',
      senderId: 'emp-041',
      senderName: 'Elena Rostova',
      role: 'DESIGNER',
      roleTitle: 'Designer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      timestamp: 'Today at 08:50 AM',
      text: 'Yes! I have prepared the spatial kinetic subtitle typography tokens in Figma. @Kenji can bind them directly to the player.',
      taskId: 'task-ds-1',
      taskTitle: 'Design spatial UI tokens'
    },
    {
      id: 'chat-str-3',
      senderId: 'emp-8821',
      senderName: 'Alex Mercer',
      role: 'ADMIN',
      roleTitle: 'Studio Principal & Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      timestamp: 'Today at 09:10 AM',
      text: 'Approved to include in Sprint Week 12. @Kenji, estimate is 4 hours, added to your backlog.',
      taskId: 'task-ad-1',
      taskTitle: 'Task Allocation'
    }
  ],
  'proj-neo': [
    {
      id: 'chat-neo-1',
      senderId: 'emp-094',
      senderName: 'Kenji Takahashi',
      role: 'FRONTEND_DEV',
      roleTitle: 'Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      timestamp: 'Yesterday at 16:20 PM',
      text: 'Query for @Marcus: The robotic telemetry socket is dropping frames when the actuator does a 360-degree sweep. Can we enable backpressure throttling?',
      taskId: 'task-fe-2',
      taskTitle: 'Fix Three.js canvas memory leak'
    },
    {
      id: 'chat-neo-2',
      senderId: 'emp-012',
      senderName: 'Marcus Vance',
      role: 'BACKEND_DEV',
      roleTitle: 'Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      timestamp: 'Yesterday at 16:45 PM',
      text: 'Done! Deployed throttling patch with 20ms debounce on the WebSocket listener. Test again on staging.',
      taskId: 'task-be-3',
      taskTitle: 'Database migration for proposal ledger'
    }
  ],
  'proj-chrono': [
    {
      id: 'chat-chr-1',
      senderId: 'emp-9034',
      senderName: 'Sarah Jenkins',
      role: 'SALES',
      roleTitle: 'Sales & Partnerships',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      timestamp: '2 days ago',
      text: 'Munich Biennial confirmed final delivery acceptance. All 8K keyframes and binaural audio stems validated. Project marked 100% complete!',
      taskId: 'task-sl-2',
      taskTitle: 'Negotiate contract extension'
    }
  ]
};

export const INITIAL_DAILY_WORK_LOGS = [
  {
    id: 'log-1',
    employeeId: 'emp-094',
    employeeName: 'Kenji Takahashi',
    role: 'FRONTEND_DEV',
    roleTitle: 'Senior Frontend & WebGL Engineer',
    date: 'Today',
    time: '18:30 PM',
    hoursLogged: 8,
    accomplishments: 'Implemented WebGPU particle buffer fallback for Project Obsidian and resolved canvas memory leak on viewport resize in Neo-Kinetic Studio.',
    tasksWorkedOn: ['Build WebGL volumetric fog shader pass', 'Fix Three.js canvas memory leak on viewport resize'],
    blockers: 'None. All WebGL frame render loops steady at 60fps.'
  },
  {
    id: 'log-2',
    employeeId: 'emp-012',
    employeeName: 'Marcus Vance',
    role: 'BACKEND_DEV',
    roleTitle: 'Senior Backend & Systems Engineer',
    date: 'Today',
    time: '18:45 PM',
    hoursLogged: 8.5,
    accomplishments: 'Deployed GraphQL microservice endpoint for particle stream and optimized Redis caching across London Soho node.',
    tasksWorkedOn: ['Deploy GraphQL microservice for telemetry buffer'],
    blockers: 'Awaiting client API key verification for live production deployment.'
  },
  {
    id: 'log-3',
    employeeId: 'emp-041',
    employeeName: 'Elena Rostova',
    role: 'DESIGNER',
    roleTitle: 'Lead UI/UX & Spatial Designer',
    date: 'Today',
    time: '18:15 PM',
    hoursLogged: 7.5,
    accomplishments: 'Completed VisionOS spatial design tokens and updated lighting shaders in Figma library.',
    tasksWorkedOn: ['Design spatial UI tokens and VisionOS component kit', 'Export 3D volumetric assets'],
    blockers: 'None. Ready for sprint milestone sign-off.'
  },
  {
    id: 'log-4',
    employeeId: 'emp-9034',
    employeeName: 'Sarah Jenkins',
    role: 'SALES',
    roleTitle: 'Head of Client Partnerships & Sales',
    date: 'Today',
    time: '19:00 PM',
    hoursLogged: 8,
    accomplishments: 'Finalized $120k commercial RFP scope for Aura Botanica and coordinated milestone review meeting with Obsidian Cloud.',
    tasksWorkedOn: ['Draft commercial RFP proposal for Aura Botanica ($120k)'],
    blockers: 'Awaiting contract legal sign-off from executive council.'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    category: 'GEOFENCE',
    title: 'Perimeter Breach Flagged',
    description: 'Kenji Takahashi clocked in 3.4km outside Pier 14 Hub perimeter. Action required or manual clearance.',
    timestamp: '8m ago',
    unread: true,
    severity: 'CRITICAL',
    icon: 'warning',
    actionRoute: '/admin/attendance'
  },
  {
    id: 'notif-2',
    category: 'INQUIRY',
    title: 'New Commercial Proposal Received',
    description: 'Aura Botanica submitted $80k–$120k scope for Rebrand & E-Commerce WebGL.',
    timestamp: '25m ago',
    unread: true,
    severity: 'HIGH',
    icon: 'mark_email_unread',
    actionRoute: '/admin/operations'
  },
  {
    id: 'notif-3',
    category: 'SPRINT',
    title: 'Milestone Review Ready',
    description: 'Kaito Tanaka marked "Export 8K keyframes for Chrono Vault" as ready for review.',
    timestamp: '1h ago',
    unread: true,
    severity: 'NORMAL',
    icon: 'task_alt',
    actionRoute: '/portal/tasks'
  },
  {
    id: 'notif-4',
    category: 'SYSTEM',
    title: 'Node Latency Nominal',
    description: 'SFO Pier 14 Mesh cluster operating at 14ms latency across 34 connected workstations.',
    timestamp: '2h ago',
    unread: false,
    severity: 'LOW',
    icon: 'dns',
    actionRoute: '/admin/mission-control'
  },
  {
    id: 'notif-5',
    category: 'PERSONNEL',
    title: 'Leave Request Pending Approval',
    description: 'Elena Rostova submitted Annual Leave request for Mar 12–15 (3 days).',
    timestamp: '4h ago',
    unread: false,
    severity: 'NORMAL',
    icon: 'event',
    actionRoute: '/portal/leaves'
  },
  {
    id: 'notif-6',
    category: 'SECURITY',
    title: 'FIDO2 Hardware Passkey Synced',
    description: 'Encrypted hardware enclave paired successfully for London Soho Node 02.',
    timestamp: 'Yesterday',
    unread: false,
    severity: 'LOW',
    icon: 'verified_user',
    actionRoute: '/portal/profile'
  }
];


