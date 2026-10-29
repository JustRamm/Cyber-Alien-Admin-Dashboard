# Cyber Aliens Admin Platform: Architecture Plan

This document outlines the codebase organization, component hierarchy, style architecture, and routing structure adhering to all user specifications.

---

## 1. Directory Structure

```
CA Admin/
├── DESIGN.md                         # Imported Kinetic Void Design Tokens & Guidelines
├── SCREENS_SPEC.md                   # Complete specification for all 14 screens
├── ARCHITECTURE.md                   # Codebase architecture & style hierarchy
├── package.json                      # Dependencies and scripts (React 19, Vite, Lucide/Material)
├── vite.config.js                    # Vite configuration
├── index.html                        # Application entry point with Syne & Plus Jakarta fonts
└── src/
    ├── main.jsx                      # React root entry point
    ├── App.jsx                       # Root wrapper with Layout and Notifications
    ├── routes/
    │   └── AppRoutes.jsx             # Separate centralized routing module
    ├── components/
    │   ├── Sidebar.jsx               # Navigation drawer with Admin/Portal role toggle
    │   ├── Header.jsx                # Top telemetry header (latency, cluster, search, alerts)
    │   ├── GeofenceRadar.jsx         # Live geodesic radar visualization widget
    │   └── ClockInModal.jsx          # Interactive biometric/geofence clock-in popup
    ├── screens/                      # Different file for each screen
    │   ├── PlatformLogin.jsx
    │   ├── ResetPassword.jsx
    │   ├── FirstLoginSetup.jsx
    │   ├── AdminMissionControl.jsx
    │   ├── StudioOperationsDashboard.jsx
    │   ├── AttendanceGeolocationCommand.jsx
    │   ├── PersonnelDirectory.jsx
    │   ├── EmployeeDetailControl.jsx
    │   ├── EmployeeHomeClockIn.jsx
    │   ├── AttendanceTimesheets.jsx
    │   ├── LeaveManagement.jsx
    │   ├── EmployeeProfileKPIs.jsx
    │   └── TasksSprintBoard.jsx
    ├── styles/                       # Dedicated CSS folder with separate files
    │   ├── theme.css                 # Kinetic Void color tokens, radii, shadows, typography
    │   ├── global.css                # Base resets, typography utilities, scrollbars
    │   ├── responsive.css            # Dedicated centralized responsive breakpoint rules
    │   ├── Sidebar.css
    │   ├── Header.css
    │   ├── GeofenceRadar.css
    │   ├── PlatformLogin.css
    │   ├── ResetPassword.css
    │   ├── FirstLoginSetup.css
    │   ├── AdminMissionControl.css
    │   ├── StudioOperationsDashboard.css
    │   ├── AttendanceGeolocationCommand.css
    │   ├── PersonnelDirectory.css
    │   ├── EmployeeDetailControl.css
    │   ├── EmployeeHomeClockIn.css
    │   ├── AttendanceTimesheets.css
    │   ├── LeaveManagement.css
    │   ├── EmployeeProfileKPIs.css
    │   └── TasksSprintBoard.css
    └── data/
        └── mockData.js               # Grounded data extracted from Stitch designs
```

---

## 2. Routing Hierarchy (`src/routes/AppRoutes.jsx`)

| Route Path | Screen Component | Suite | Notes |
| :--- | :--- | :--- | :--- |
| `/login` | `PlatformLogin` | Auth | Studio Platform Login |
| `/reset-password` | `ResetPassword` | Auth | Passkey recovery |
| `/setup-wizard` | `FirstLoginSetup` | Auth | First login onboarding wizard |
| `/` or `/admin` | `AdminMissionControl` | Admin | Default admin landing page |
| `/admin/operations` | `StudioOperationsDashboard` | Admin | Financial, Sprints & Pipeline |
| `/admin/attendance` | `AttendanceGeolocationCommand`| Admin | Pier 14 Geofence & Punch Ledger |
| `/admin/personnel` | `PersonnelDirectory` | Admin | 34 studio craft leads directory |
| `/admin/employee/:id`| `EmployeeDetailControl` | Admin | Single employee control page |
| `/portal` or `/portal/home` | `EmployeeHomeClockIn` | Portal | Employee Hub & One-click Clock-in |
| `/portal/attendance`| `AttendanceTimesheets` | Portal | Punch history & Timesheets |
| `/portal/leaves` | `LeaveManagement` | Portal | Leave balance & requests |
| `/portal/profile` | `EmployeeProfileKPIs` | Portal | Role-aware skill matrix & badges |
| `/portal/tasks` | `TasksSprintBoard` | Portal | Kanban sprint board |

---

## 3. Styling & Responsive Strategy

1. **`theme.css`**: Defines all `:root` CSS variables directly mapped to the Stitch `designMd` specification (colors, spacing, fonts, elevation).
2. **Dedicated Screen Styles**: Every screen imports its own dedicated `.css` file from `src/styles/` ensuring encapsulation and strict modularity.
3. **`responsive.css`**: Central responsive file featuring media queries:
   - **Desktop Large (1440px+)**: Multi-column layouts, expanded split views.
   - **Standard Desktop (1024px - 1439px)**: Full sidebars with collapsible secondary panes.
   - **Tablet (768px - 1023px)**: Sidebar folds into mobile drawer, dense tables scroll horizontally.
   - **Mobile (< 768px)**: Stacked single-column bento cards, mobile bottom sheet navigation, and touch-optimized action targets.

