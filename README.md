# Cyber Aliens Studio Admin & Specialist Portal

Avant-garde Admin Operations and Specialist Workspace built with **React**, **Vite**, and **Kinetic Void** design tokens directly imported from **Stitch** (`projects/13418672454072631669`).

---

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Launch development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Production build:**
   ```bash
   npm run build
   ```

---

## 🗂 Architecture & Specifications

- **Design System Tokens:** [`DESIGN.md`](./DESIGN.md)
- **14 Aligned Screens Specification:** [`SCREENS_SPEC.md`](./SCREENS_SPEC.md)
- **Component & Style Architecture:** [`ARCHITECTURE.md`](./ARCHITECTURE.md)

---

## 🌐 Routes Overview

### 🔐 Authentication Suite
- `/login` — Studio Platform Login with passkey WebAuthn simulation
- `/reset-password` — Multi-step cryptographic enclave challenge
- `/setup-wizard` — First login onboarding & geofence authorization

### 🛸 Command Suite (Super Admin Core)
- `/admin/mission-control` — Real-time Studio Matrix, live pulse, and sprint burndown
- `/admin/operations` — Active client pipelines, revenue sparkline, craft capacity
- `/admin/attendance` — Pier 14 Geofence Radar Monolith, breach triage & punch ledger
- `/admin/personnel` — Studio personnel directory with slide-over onboarding drawer
- `/admin/employee/:id` — Individual specialist control & security permissions

### ⚡ Specialist Workspace (Portal)
- `/portal/home` — Daily specialist hub with active hardware punch widget
- `/portal/attendance` — Bi-weekly timesheet punch ledger & adjustment requests
- `/portal/tasks` — Kanban sprint board with real-time drag/move status updates
- `/portal/leaves` — Leave balances, blackout schedule & time-off submissions
- `/portal/profile` — Role-aware craft matrix & verifiable accolades

---

## 🎨 Design System: Kinetic Void

- **Typography:**
  - Headlines & Display: `Syne` (Weight: 700, 800)
  - Body & Telemetry: `Plus Jakarta Sans` (Weight: 400, 500, 600, 700)
  - Icons: `Material Symbols Outlined`
- **Colors:**
  - Base ground: Warm Cream `#FAF9F5`
  - Monoliths & Sidebar: Obsidian Black `#000000` / `#0A0A0A`
  - Kinetic Accents: Studio Crimson / Hot Coral `#B90538` & `#DC2C4F`
- **Modularity:**
  - Dedicated screen component for each view under `src/screens/`
  - Dedicated CSS file for each view under `src/styles/`
  - Centralized responsive styles in `src/styles/responsive.css`
  - Centralized routing in `src/routes/AppRoutes.jsx`

