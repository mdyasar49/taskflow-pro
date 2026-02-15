# 🖼️ Frontend Architecture Documentation - TaskFlow Pro

This document provides a deep dive into the frontend implementation of TaskFlow Pro, detailing its **Cyber Intelligence** design system, component architecture, and operational logic.

---

## 🎨 1. Design System: Cyber Intelligence

TaskFlow Pro has transitioned to a premium **Indigo & Cobalt Blue** theme defined in `src/index.css`, optimized for long-term operational use (NOC/SOC environments).

### 🔵 Color Palette

- **Primary (Indigo)**: `#6366f1` (Active states, primary buttons, focus rings)
- **Secondary (Cobalt)**: `#3b82f6` (Information, secondary actions)
- **Background (Deep Space)**: `#0f172a` (Main background, preventing eye strain)
- **Surface (Glass)**: `rgba(15, 23, 42, 0.7)` with `backdrop-filter: blur(20px)`
- **Success/Safe**: `#10b981` (Completed tasks)
- **Critical/Alert**: `#ef4444` (High priority, errors)

### 🕯️ Visual Features

- **Glassmorphism 2.0**: High-blur, semi-transparent cards used for `UserProfile`, `StatCard`, and the main `Dashboard` container.
- **Micro-Animations**:
  - Hover effects on cards (`transform: translateY(-5px)`).
  - "Scanning" animations on the performance matrix.
  - Floating avatars in the user profile.
- **Typography**: Uses system-ui/sans-serif with high font weights (800/900) for headers to mimic a "Head-Up Display" (HUD) feel.

---

## 🏗️ 2. Component Architecture

The application follows a modular, domain-driven architecture.

### 📂 Core Components (`src/components/`)

- **`dashboard/AnalysisView.js`**: The command center. Displays high-level metrics using `StatCard` components arranged in a responsive Grid.
- **`dashboard/UserProfile.js`**: The "Neural Identity" module. Features a scanning identity card, password management, and session control.
- **`dashboard/StatCard.js`**: A reusable, glassmorphic widget for displaying individual KPIs (Total, Pending, Done).

### 📂 Feature Modules (`src/sections/`)

- **`tasks/TaskList.js`**: A high-performance data table designed for density.
  - **Word-Break Logic**: Handles massive error logs without breaking layout.
  - **Audit Badges**: Visual indicators for priority and status.
- **`tasks/TaskForm.js`**: A tactical modal for creating/editing tasks.
  - **Smart Validation**: Prevents submission of incomplete operational data.
  - **Styled Inputs**: Custom MUI text fields with indigo focus states.

---

## ⚙️ 3. State & Operational Logic

### 🔄 specialized Routing

- **Deep-Linking**: The dashboard uses URL parameters (`/dashboard/:view`) instead of local state to switch between `analysis`, `table`, and `profile`.
- **Why?** Allows operators to bookmark specific views and use the browser's Back/Forward navigation.

### 🌐 Data Resilience

- **Restart Logic**: Canceled tasks are never "reopened". They are **cloned** into new entities to preserve the historical record of the failure.
- **Live Search**: Real-time filtering implemented via a custom hook pattern `useMemo` to filter tasks by title or description without API thrashing.

---

## 🚀 4. Technical Stack

| Category       | Technology        | Purpose                              |
| :------------- | :---------------- | :----------------------------------- |
| **Framework**  | React 19          | UI Core & Component Logic            |
| **Styles**     | Material UI (MUI) | Operational Layout & Theming         |
| **Icons**      | MUI Icons         | Visual Data Representation           |
| **Routing**    | React Router 6    | Deep-linking & Navigation            |
| **Build Tool** | Vite              | Instant HMR (Hot Module Replacement) |

---

## 🛠️ 5. Development Workflow

1.  **Theming**: controlled via `src/index.css` (CSS Variables) and `MUI ThemeProvider`.
2.  **Layout**: Uses **MUI Grid v2** (`Grid size={{...}}`) for responsive dashboards.
3.  **API**: All backend communication is centralized in `src/services/api.js`.

---

**TaskFlow Pro Frontend - Engineered for High-Availability Operations.**
