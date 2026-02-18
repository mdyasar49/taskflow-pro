# Task Management System - Frontend

A high-fidelity "Cyber Intelligence" Task Management dashboard built with **React 19**, **Vite**, and **Material UI**. This application is engineered for situational awareness and high-pressure task tracking with a premium, responsive interface.

## 🎨 Design Philosophy: "Operational Resilience"

The UI features a specialized **Indigo & Cobalt** palette designed for high data density and reduced cognitive load.

- **Primary Action**: Indigo (`#6366f1`) - Create, Save, Submit.
- **Active State**: Cobalt (`#3b82f6`) - Running Tasks, Tabs.
- **Glassmorphism**: High-blur surfaces (`backdrop-filter: blur(20px)`) for modern depth.
- **Micro-interactions**: Subtle hover effects and tactile feedback across all interactive elements.

## 🚀 Key Features

- **Dynamic Dashboard**: Interactive task management with multiple view support (Analysis, Tasks, etc.).
- **User Authentication**: Secure JWT-based Login and Registration system.
- **Task Analysis**: Visual insights and status-driven data representation.
- **Responsive Layout**: Fully optimized for mobile and desktop using a modular grid system.
- **Dark/Light Mode**: Custom theming engine powered by MUI and React Context.
- **Smart Task Management**:
  - **Defensive Validation**: Real-time form validation.
  - **Optimistic Updates**: Instant UI feedback on task actions.
  - **State-Aware Actions**: Context-sensitive task controls (e.g., preventing duplicate restarts).

## 🛠️ Technology Stack

- **Core**: React 19, Vite
- **Styling**: Material UI (MUI) v7, Emotion
- **Icons**: Lucide React, MUI Icons
- **Routing**: React Router DOM v7
- **Networking**: Axios with Request Interceptors
- **State Management**: React Context & Hooks

## 📁 Project Structure

```text
src/
├── components/   # Atomic UI components & Private Routes
├── context/      # Theme and Auth context providers
├── pages/        # High-level page modules (Auth, Dashboard)
├── sections/     # Modular dashboard components (TaskList, TaskForm)
├── services/     # API service layers (AuthService, TaskService)
├── utils/        # Tactical helper functions
└── App.js        # Core routing and application entry
```

## ⚙️ Development Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd "taskflow pro"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Environment Configuration:
   Create a `.env` file:

   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. Run Development Server:
   ```bash
   npm run dev
   ```

## 🛡️ Security & Resilience

- **Session Management**: JWT tokens stored in `localStorage`.
- **Axios Interceptors**: Automatic header injection and 401/Network error handling.
- **Route Guards**: Prevents unauthorized access to sensitive dashboard views.

---

_Maintained by the Core Engineering Team_
