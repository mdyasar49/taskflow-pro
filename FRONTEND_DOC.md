# 🖼️ Frontend Architecture Documentation - TaskFlow Pro

This document provides a deep dive into the frontend implementation of TaskFlow Pro, detailing its design system, component architecture, and operational logic.

---

## 🎨 1. Design System: Cyber Emerald

TaskFlow Pro uses a custom-built design system defined in `src/index.css` using CSS variables for high flexibility.

### 🟢 Color Palette

- **Primary (Emerald)**: `#10b981` (Glows and focus states)
- **Background (Onyx)**: `#020617` (Deep dark mode foundation)
- **Card/Glass**: `rgba(15, 23, 42, 0.8)` with `backdrop-filter: blur(10px)`
- **Success/Done**: `#34d399`
- **Error/Exit**: `#f87171`

### 🕯️ Visual Features

- **Glassmorphism**: Applied to all Paper components and Dialogs to create a multi-layered futuristic feel.
- **Vibrant Gradients**: Used in the Main Dashboard and primary action buttons for a premium "Cyber" aesthetic.
- **Dynamic Scrollbars**: Customized thin emerald scrollbars for a non-intrusive navigation experience.

---

## 🏗️ 2. Component Architecture

The application follows a modular component-based architecture for better maintainability.

### 📂 Core Components (`src/components/`)

- **`TaskList.js`**: A high-performance data table using MUI's `Table` components. Features include:
  - Status cycling logic.
  - Custom audit trail badges.
  - Sticky headers and hover transitions.
- **`TaskForm.js`**: A modal-based task creator (`MUI Dialog`) with full dark theme integration and real-time validation.

### 📂 Dashboard Modules (`src/components/dashboard/`)

- **`AnalysisView.js`**: The intelligence hub. Uses `useMemo` to process task statistics and displays them via circular progress and stat cards.
- **`UserProfile.js`**: Manages the user's "Neural Presence." It handles profile editing, password visibility toggles, and session termination.
- **`StatCard.js`**: A reusable micro-component for displaying individual metrics with icons and theme-aware colors.

---

## ⚙️ 3. State & Operational Logic

### 🔄 State Management

- **Local State**: Managed via React's `useState`.
- **Side Effects**: `useEffect` handles initial data fetching and authentication checks.
- **Performance Optimization**: `useCallback` is used for the `fetchTasks` function to prevent unnecessary re-renders in child components.

### 🌐 API Integration (`src/services/`)

- **Axios Middleware**: A centralized service layer handles all HTTP requests.
- **Interceptors**: Future-ready for adding request/response interceptors (like adding Auth headers).
- **Service Layer Pattern**: Separates business logic (API calls) from UI components.

---

## 🚀 4. Technical Stack

| Category       | Technology       | Purpose                                    |
| :------------- | :--------------- | :----------------------------------------- |
| **Framework**  | React 19         | UI Core & Component Logic                  |
| **Styles**     | Material UI 7    | Component Library & Theming                |
| **Logic**      | Javascript (ESM) | Modern module-based script execution       |
| **Routing**    | React Router 7   | Client-side navigation & Route protection  |
| **Build Tool** | Vite             | Ultra-fast development server and bundling |

---

## 🛠️ 5. Development Workflow

1. **Theming**: Edit `src/index.css` variables to change the global look.
2. **Components**: Build new UI elements in `src/components/` and integrate them into `pages/Dashboard.js`.
3. **Logic**: Add new API methods in `src/services/taskService.js`.
4. **Styles**: Use the `sx` prop in MUI components for component-level styling and `index.css` for global utilities.

---

**TaskFlow Pro Frontend - Engineered for Excellence.**
