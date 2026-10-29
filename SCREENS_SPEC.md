# Cyber Aliens Studio Admin Platform: Screens Specification

This document details the functional specifications, visual composition, routes, components, and telemetry data structures for each screen aligned in the Stitch Cyber Aliens system.

---

## 1. Authentication & Onboarding Suite

### 1.1 Platform Login (`/login`)
- **Stitch ID:** `8283ea01236c41d7a0b945d8b38a7ad5`
- **Purpose:** Secure gateway for Super Admins, Studio Principals, and Engineers.
- **Key Elements:**
  - Obsidian monolith centered container with glowing hot coral beacon (`#B90538`).
  - Studio coordinate metadata: `NODE: US-WEST-01 // LAT: 37.7925° N`.
  - Credentials input: Studio ID / Email, Biometric/Password, Remember Device checkbox.
  - Quick action: "Request Node Access", "Forgot Credentials".
  - Ambient kinetic background grid.

### 1.2 Reset Password (`/reset-password`)
- **Stitch ID:** `e073ae979d0e465d83d0f63e1dc70f39`
- **Purpose:** Password recovery and multi-factor node verification.
- **Key Elements:**
  - Cryptographic token verification interface.
  - Step progress: 1. Identification -> 2. Security Token -> 3. Passkey Update.
  - Security audit disclaimer.

### 1.3 First Login Setup Wizard (`/setup-wizard`)
- **Stitch ID:** `750fe6006d0743b7bca2f6273fd343ba`
- **Purpose:** Guide new personnel through biometric registration, geofence permissions, and role provisioning.
- **Key Elements:**
  - Multi-step telemetry setup (Hardware ID, Geofence consent, Workstation pairing).
  - Profile photo upload / avatar calibration.
  - Role-based default view preview.

---

## 2. Command & Mission Control Suite (Admin Core)

### 2.1 Admin Overview & Mission Control (`/admin/mission-control`)
- **Stitch ID:** `acbf15c96a454d7bb72bdff2368f6026`
- **Purpose:** Central operational telemetry, studio pulse, and live node status.
- **Key Elements:**
  - Top Bar: System Latency (14ms), Cluster indicator (`US-EAST-ALN`), global `⌘K` search.
  - Metric Strip (5 Bento Cards):
    1. Clocked In Today: 28 / 34 (82% studio occupancy).
    2. Tasks Due Today: 19 Tasks (68% completion, 4 critical items).
    3. New Booking Requests: 7 Inquiries ($145k pipeline).
    4. Active Projects: 8 Live (Obsidian, Starlet, Neo).
    5. Overdue Tasks: 2 Blocked (Shader memory & legal NDA).
  - Live Studio Pulse Table: Elena Rostova, Kaito Tanaka, Amara Thorne, Marcus Vance with real-time biometric and geofence status.
  - Tactical Geodesic: Pier 14 Geofence Hub visual radar with live pins and radius boundaries (150m).
  - Sprint Velocity Burndown: Mon-Sun bar execution chart.

### 2.2 Studio Operations Dashboard (`/admin/operations`)
- **Stitch ID:** `dac8f0378ec24b85bd0a494a05dc0878`
- **Purpose:** Commercial pipelines, production velocity, financial telemetry, and social impact tracking.
- **Key Elements:**
  - Header: Time zone telemetry (HND 02:45 • SFO 09:45 • LHR 17:45), quick `+ New Project`.
  - Top KPI Metrics:
    - Active Studio Revenue: $348,500 USD (+18.4% with sparkline).
    - Production Velocity: 94.2% Health (98.4% uptime).
    - Pipeline & RFPs: 8 Inquiries ($185k potential, 78% avg win prob).
    - Social Impact Subsidized: $52,275 (15% allocated to Mind Empowered Foundation).
  - Active Client Engagements: Project Obsidian, STARLET 5.0, Neo-Kinetic Studio, Chrono Vault, Hyperion Audio.
  - Resource Craft Allocation: WebGL & Shaders (88%), 3D Motion & UE5 (94%), Kinetic Brand (72%), Strategic UX (65%).
  - Incoming Inquiries Feed: Aura Botanica, Kinetix AI, Voxel Works.

### 2.3 Attendance & Geolocation Command (`/admin/attendance`)
- **Stitch ID:** `dab1f213c0aa40a1bdb877698eed239b`
- **Purpose:** Real-time geofence enforcement, punch verification, distance variance detection, and breach triage.
- **Key Elements:**
  - Actions: "Approve Pending Corrections (3)", "Export (CSV/PDF)", Split Map/Table toggles.
  - Key Bento Metrics:
    - Total Logged Hours: 1,142.5 hrs (+4.2%).
    - Punctuality Adherence: 94.8%.
    - Geofence Breaches: 03 Flagged Today (Action Required).
    - Avg Check-in Time: 09:28 AM EST.
  - Interactive Geofence Radar Monolith:
    - Pier 14 Hub with 150m perimeter, 75m core ring, and 200m outer boundary.
    - Active telemetry pins: Alex Mercer (42m), Sarah Jenkins (120m), Kenji Takahashi (3.4km breach).
    - Real-time GPS accuracy variance display (± 4.2m).
  - Telemetry Punch Ledger: Full data table with clock-in, clock-out, variance, geofence compliance, and actions.

### 2.4 Personnel Directory & Onboarding (`/admin/personnel`)
- **Stitch ID:** `274e1d12432f4d71b7fa953d853f3efc`
- **Purpose:** Comprehensive staff roster, engineering nodes, role allocation, and onboarding drawer.
- **Key Elements:**
  - Talent Ecosystem Header with 28 Syncing, 98.2% Allocation, `+ Add New Employee` action.
  - Filter Console: Search by name/node/skill, Grid vs Dense Table view, Discipline filter, Telemetry filter.
  - Personnel Cards Grid:
    - Alex Mercer (Lead Architect, SFO Node, 88% Workload).
    - Elena Rostova (Spatial Lead, SFO Node, On Leave).
    - Marcus Vance (Creative Director, London Node, 92% Workload).
    - Kenji Takahashi (Senior WebGL, Tokyo Node, 79% Workload).
    - Sarah Jenkins (Brand Strategy, SFO Node).
  - Slide-Over Drawer: Multi-step employee onboarding form (Credentials, Role, Assigned Hub, Geofence Radius).

### 2.5 Employee Detail (Admin Control) (`/admin/employee/:id`)
- **Stitch ID:** `1e5b320be56c4332bec1719bb440bc04`
- **Purpose:** Deep dive into individual specialist metrics, punch histories, task assignments, and permissions.
- **Key Elements:**
  - Specialist Hero: Photo, Node identifier, role badges, active geofence hub link.
  - Tabbed Navigation: Telemetry & Attendance, Sprints & Tasks, KPI Matrix, Security & Permissions.
  - Audit Trail & Geofence Compliance timeline.

---

## 3. Employee Portal & Specialist Hub Suite

### 3.1 Employee Home & Clock-In Hub (`/portal/home`)
- **Stitch ID:** `7d51bee1cacd496c8c2bb26f481e8e50`
- **Purpose:** Daily workflow starting point for individual designers, engineers, and specialists.
- **Key Elements:**
  - One-click Interactive Clock-In / Clock-Out widget with live GPS geofence radar.
  - Current sprint priorities and assigned tickets.
  - Daily hours counter, break toggles, and peer availability status.

### 3.2 Clock-In Verification Flow & Geofence Modal (Interactive Modal)
- **Stitch ID:** `382abdb821bd4d0f81949643ee98aaeb`
- **Purpose:** Real-time location verification dialog during punch-in.
- **Key Elements:**
  - Geofence radial map validation animation.
  - Location verification badge: "Within Pier 14 Perimeter (28m to hub core)".
  - Biometric / passkey confirmation button.

### 3.3 My Attendance & Timesheet Logs (`/portal/attendance`)
- **Stitch ID:** `f30191abf74f4e28ac3653233cfe7d53`
- **Purpose:** Personal timesheet submission, punch history review, and discrepancy adjustments.
- **Key Elements:**
  - Bi-weekly punch breakdown with hours per day and sprint allocation.
  - Geofence stamp badge for each entry.
  - Dispute / Correction request trigger modal.

### 3.4 Leave Requests & Time-Off Management (`/portal/leaves`)
- **Stitch ID:** `ebf266c0223145dcac638c6b52dd9960`
- **Purpose:** Leave balance tracking, request submissions, and studio calendar sync.
- **Key Elements:**
  - Leave balance pills (Annual, Sick, Creative Sabbatical).
  - Studio blackout dates & sprint milestones timeline.
  - Request submission form with automatic coverage reassignment suggestion.

### 3.5 Employee Profile & Role-Aware KPIs (`/portal/profile`)
- **Stitch ID:** `007ffbb816a24eb5a726a4cfcb056620`
- **Purpose:** Specialist craft mastery dashboard, skill trees, and quarterly KPI achievements.
- **Key Elements:**
  - Craft radar chart (WebGL, 3D Shaders, UI Architecture, Sprint Velocity).
  - Completed milestone showcase and client accolades.
  - Personal equipment & cryptographic keys ledger.

### 3.6 My Tasks & Sprint Board (`/portal/tasks`)
- **Stitch ID:** `2e4d5776408348e785df687f838656c7`
- **Purpose:** Kanban sprint board and task prioritization for active projects.
- **Key Elements:**
  - Columns: Backlog, Active Sprint, In Review / QA, Deployed.
  - Task cards with difficulty tags, estimated hours, client chips, and blocking dependencies.
  - Filter by Project (Obsidian, STARLET, Neo, Chrono).

