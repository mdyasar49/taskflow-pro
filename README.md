# 🌌 TaskFlow Pro - Premium Management Console

TaskFlow Pro is a state-of-the-art Task Management System designed with a **Cyber Emerald** aesthetic. It provides a high-performance, futuristic interface for tracking initiatives, analyzing operational metrics, and managing secure user sessions.

![Theme](https://img.shields.io/badge/Theme-Cyber%20Emerald-10b981?style=for-the-badge)
![Tech](https://img.shields.io/badge/Built%20With-React%20%26%20MUI-61dafb?style=for-the-badge)

---

## ✨ Premium Features

### 📊 System Intelligence Dashboard

- **Real-time Metrics**: Track total inventory, initial phases, execution status, and completed goals.
- **Neural Link Performance**: Visual progress tracking with gradient linear bars and sync completion percentages.
- **Operational Analysis**: Summary of productivity based on completed milestones vs open initiatives.

### 📋 Operations Console (Task List)

- **Advanced CRUD**: Create, Update, and Delete tasks with a clean, grid-based interface.
- **Status Cycling**: Quick-action status updates (Pending -> Running -> Completed).
- **Audit Trails**: Detailed "Created By" and "Last Modified" badges with time tracking.
- **Universal Search**: Fast lookup by title, ID, or description.
- **Status Filtering**: Categorize views by initiative phases.

### 👤 Secure Data Center (User Profile)

- **Identity Modification**: Dynamic username updates.
- **Security Matrix**: Masked password display with visibility toggles.
- **Session Management**: Secure logout and credential update (Neural Matrix) dialogs.

### 🎨 Design Philosophy

- **Cyber Emerald Theme**: Vibrant emerald accents on deep onyx backgrounds.
- **Glassmorphism**: Backdrop blur effects on cards and dialogs.
- **Micro-animations**: Smooth fade-in transitions and interactive hover states.

---

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Material UI (MUI)](https://mui.com/) & Vanilla CSS variables
- **Routing**: [React Router Dom](https://reactrouter.com/)
- **API Handling**: [Axios](https://axios-http.com/)
- **Icons**: [MUI Icons](https://mui.com/material-ui/material-icons/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest Stable)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mdyasar49/taskflow-pro.git
   cd taskflow-pro
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root and add your backend API URL:

   ```env
   VITE_API_BASE_URL=your_api_url_here
   ```

4. **Launch Application**:
   ```bash
   npm run dev
   ```

---

## 🏗️ Project Structure

```text
src/
├── components/          # Reusable UI elements
│   ├── dashboard/       # Specialized dashboard sub-components
│   ├── TaskForm.js      # Task creation hub
│   └── TaskList.js      # Main data table
├── pages/               # Main view containers
│   ├── Dashboard.js     # Core application logic
│   ├── Login.js         # Security gateway
│   └── Register.js      # Identity creation
├── services/            # API & Auth middleware
├── utils/               # Formatting & Date helpers
└── index.css            # Cyber Emerald global design system
```

---

## 🛡️ Security

The application uses **Neural Encryption Credentials** (Simulated) and JWT routing guards to ensure all operational data remains confined to authorized sessions.

---

**Developed with 💚 by [mdyasar49](https://github.com/mdyasar49)**
