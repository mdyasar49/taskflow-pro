# 🎨 Task Management System - Frontend (React 19)

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)
![MUI](https://img.shields.io/badge/Material_UI-v5-007FFF?style=for-the-badge&logo=mui)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)

> **A premium "Cyber Intelligence" themed operational dashboard for enterprise task management.**

---

## 🌟 Executive Summary

The **Task Management System Frontend** is a cutting-edge Single Page Application (SPA) built with **React 19** and **Vite**. It features a specialized **"Cyber Intelligence"** UI theme optimized for high-stakes operational environments, reducing eye strain during long shifts while providing high-density data visualization.

This frontend seamlessly integrates with the Spring Boot backend via **JWT Authentication**, ensuring secure, stateless interaction for all operations.

---

## ✨ Key Features (Interview Highlights)

### 🎨 Cyber-Intelligence Design System

- **Ergonomic Dark Mode**: Custom **Indigo & Cobalt** palette reducing blue-light fatigue.
- **Glassmorphism**: High-performance backdrop blurs for depth and hierarchy.
- **Visual Status Indicators**: Color-coded badges for instant status recognition (e.g., 🔴 HIGH Priority, 🔵 RUNNING).

### ⚡ Technical Excellence

- **React 19 & Vite**: Lightning-fast HMR (Hot Module Replacement) and optimized production builds.
- **Material UI (MUI) v5**: Custom-themed component library for consistent design.
- **Responsive Layout**: Fluid grid system adapting from desktop command centers to mobile devices.

### 🛡️ Security & Integrity

- **JWT Handling**: Secure storage and automatic header injection via Axios interceptors.
- **Session Resilience**: Response interceptors automatically handle **401 Unauthorized** and **Network Errors** (e.g., backend crash) by logging out the user.
- **Navigation Safety**: Protected routes use `replace: true` logic to prevent "Back Button Loops" after logout.
- **Defensive UI**: Graceful handling of empty states, loading skeletons, and error boundaries.

---

## 🎤 Key Interview Talking Points

> **Quick Pitches for Technical Screening**

### **1. Why React 19?**

"I chose React 19 to leverage the latest concurrency features and automatic batching, ensuring disjoint state updates don't cause unnecessary re-renders. Combined with **Vite**, this provides a sub-100ms startup time."

### **2. Security First**

"The application implements **secure JWT handling** using Axios interceptors. This ensures every request is authenticated by default, eliminating the risk of developers forgetting to add authorization headers manually."

### **3. Scalable Architecture**

"I structured the project by **feature modules** (e.g., `sections/tasks/`) rather than technical type. This means all logic, styles, and tests for a feature live together, making the codebase highly maintainable as it scales."

---

## 🛠️ Technology Stack

| Category           | Technology               | Usage                  |
| ------------------ | ------------------------ | ---------------------- |
| **Core Framework** | React 19.2.0             | UI Components & State  |
| **Build Tool**     | Vite 5.4.11              | Dev Server & Bundling  |
| **Styling**        | Material UI (MUI)        | Design System          |
| **HTTP Client**    | Axios                    | API Communication      |
| **Routing**        | React Router DOM         | Client-side Navigation |
| **Icons**          | Lucide React / MUI Icons | Visual Elements        |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **npm 9+**

### Installation & Run

1. **Clone & Install**

   ```bash
   git clone <repository-url>
   cd "task manager"
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm start
   ```

   > **Note:** We have optimized the start command. `npm start` is now an alias for `vite` (same as `npm run dev`).

   The application will launch at `http://localhost:5173`.

3. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

A scalable, feature-first directory structure:

```
src/
├── components/        # 🧩 Reusable UI atoms (Buttons, Cards)
├── pages/            # 📱 Route-level views (Dashboard, Login)
├── sections/         # 📦 Feature-specific modules (Tasks)
│   └── tasks/
│       ├── TaskForm.js    # Create/Edit logic
│       └── TaskList.js    # Data grid & filtering
├── services/         # 🔌 API Integration Layer
│   ├── authService.js     # Login/Register strategies
│   └── taskService.js     # CRUD endpoints
├── utils/            # 🛠️ Helpers (Date formatting, Validation)
└── App.js            # 🚦 Routing & Layout Configuration
```

---

## 🔌 API Integration

The application communicates with the backend at `http://localhost:8080/api`.

**Authentication Flow:**

1. User logs in → Server verifies credentials.
2. Server returns **JWT Token**.
3. Frontend caches token in `localStorage`.
4. **Axios Interceptor** attaches `Authorization: Bearer <token>` to every subsequent request.

---

## 🧪 Testing & Validation

**Pre-Interview Checklist:**

- [ ] **Login Flow**: Verify admin/admin123 logs in successfully.
- [ ] **Task Creation**: Create a task with "HIGH" priority (should appear Red).
- [ ] **Responsiveness**: Resize window to check mobile view.
- [ ] **Error Handling**: Try logging in with wrong password (should show red alert).

---

## 🚨 Troubleshooting

| Issue               | Solution                                                             |
| ------------------- | -------------------------------------------------------------------- |
| **App won't start** | Ensure no other process is using port 5173. Kill terminal and retry. |
| **"Network Error"** | Verify Backend is running on port 8080.                              |
| **Login Fails**     | Check `localStorage` in DevTools to ensure token is being saved.     |
| **Styles Broken**   | Run `npm install` again to ensure MUI dependencies are correct.      |

---

## 👨‍💻 Author

**Mohamed Yasar A.**
_Full Stack Developer | React & Spring Boot Specialist_

---

_Last Updated: February 2026_
