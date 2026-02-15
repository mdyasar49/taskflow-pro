# 🖼️ Frontend Architecture Documentation - Task Management System

This document provides a comprehensive overview of the Task Management System frontend, detailing its **Cyber Intelligence** design system, component architecture, and operational logic.

---

## 🎨 1. Design System: Cyber Intelligence

The Task Management System features a premium **Indigo & Cobalt Blue** theme optimized for long-term operational use in enterprise environments.

### 🔵 Color Palette

**Primary Colors:**

- **Primary Indigo**: `#6366f1` - Active states, primary actions, completed tasks
- **Cobalt Blue**: `#3b82f6` - Running tasks, secondary information
- **Background (Deep Space)**: `#0a0f1e` / `#0f172a` - Main surfaces
- **Surface (Glass)**: `rgba(15, 23, 42, 0.7)` with `backdrop-filter: blur(20px)`

**Status Colors:**

- **PENDING** (Open): `#94a3b8` (Slate Gray)
- **RUNNING** (In Progress): `#3b82f6` (Blue)
- **REVIEW** (In Review): `#a855f7` (Purple)
- **ON HOLD**: `#f59e0b` (Amber)
- **COMPLETED** (Done): `#6366f1` (Indigo)
- **CANCELED**: `#ef4444` (Red)

**Priority Colors:**

- **HIGH**: `#ef4444` (Red) - Critical urgency
- **MEDIUM**: `#f59e0b` (Amber) - Standard priority
- **LOW**: `#3b82f6` (Blue) - Low urgency

### 🕯️ Visual Features

- **Glassmorphism Effects**: Semi-transparent cards with high blur (`backdrop-filter: blur(20px)`)
- **Micro-Animations**:
  - Hover transforms on cards (`translateY(-5px)`)
  - Smooth transitions on all interactive elements
  - Icon color changes on state transitions
- **Typography**: System UI fonts with high font weights (700-900) for headers, creating a "Command Center" aesthetic
- **Gradient Headers**: Linear gradients from `#020617` to `#0f172a` for depth

---

## 🏗️ 2. Component Architecture

The application follows a modular, feature-driven architecture.

### 📂 Directory Structure

```
src/
├── components/         # Reusable UI components
├── pages/
│   ├── auth/          # Authentication pages
│   │   ├── Login.js
│   │   └── Register.js
│   └── dashboard/     # Main application views
│       └── Dashboard.js
├── sections/          # Feature-specific sections
│   └── tasks/
│       ├── TaskList.js      # Data-dense task table
│       └── TaskForm.js      # Task creation/editing modal
├── services/          # API and business logic
│   ├── api.js               # Axios instance & auth service
│   └── taskService.js       # Task CRUD operations
└── utils/             # Helper utilities
    └── dateUtils.js         # Date formatting
```

### 📂 Core Components

#### **`pages/auth/Login.js`**

- JWT-based authentication
- Form validation with Material-UI
- Stores token, username, and role in localStorage
- Cyber-themed glassmorphic design

#### **`pages/auth/Register.js`**

- New user registration
- Optional role assignment
- Password strength validation (optional)
- Matches login page aesthetic

#### **`pages/dashboard/Dashboard.js`**

- Main application shell
- Tab-based navigation (Analysis, Tasks, Profile)
- Responsive layout with MUI Grid
- Real-time task statistics

### 📂 Feature Modules

#### **`sections/tasks/TaskList.js`**

A high-performance, data-dense task table with:

**Features:**

- **Word-Break Logic**: Handles long descriptions/error logs without layout disruption
- **Priority Badges**: Color-coded chips (HIGH=Red, MEDIUM=Amber, LOW=Blue)
- **Status Indicators**: Icon + text combinations for quick scanning
- **Overdue Detection**: Automatic highlighting of past-due tasks
- **Pagination**: MUI TablePagination for performance
- **Smart Filtering**: Real-time status-based filtering
- **Action Buttons**: Edit, Delete, and Restart (for completed/canceled tasks)

**Key Component:**

```javascript
const TaskList = {
  tasks,
  onUpdateStatus,
  onDeleteTask,
  onEditTask,
  onRestartTask,
};
```

#### **`sections/tasks/TaskForm.js`**

A tactical modal for task creation and editing:

**Features:**

- **Slide-in Animation**: Material-UI transitions
- **Smart Defaults**: Status="Open", Priority="MEDIUM"
- **Read-Only Mode**: For completed/canceled tasks
- **Field Validation**: Required title, optional description
- **Date Picker**: `datetime-local` input for due dates
- **Priority Selector**: Dropdown with visual color indicators
- **Status Selector**: All operational phases (PENDING, RUNNING, REVIEW, ON HOLD, COMPLETED, CANCELED)

**Key States:**

```javascript
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [status, setStatus] = useState("Open");
const [priority, setPriority] = useState("MEDIUM");
const [dueDate, setDueDate] = useState("");
```

---

## ⚙️ 3. State Management & Data Flow

### 🔄 State Architecture

**Local Component State:**

- Uses React `useState` hooks for form inputs and UI toggles
- No global state management (Redux/Context) - keeps it simple

**Server State:**

- Tasks fetched via REST API calls
- Optimistic UI updates on mutations
- Re-fetches data after create/update/delete operations

### 🌐 API Integration

**Authentication Flow:**

```javascript
// Login
const { token, username, role } = await authService.login(username, password);
localStorage.setItem("token", token);
localStorage.setItem("username", username);
localStorage.setItem("role", role);

// All subsequent requests include JWT
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
```

**Task Operations:**

```javascript
// Fetch tasks with pagination & filtering
const tasks = await taskService.getAllTasks(page, size, status);

// Create new task
const newTask = await taskService.createTask({
  title,
  description,
  status,
  priority,
  dueDate,
});

// Update task
const updated = await taskService.updateTask(taskId, updatedData);

// Delete task
await taskService.deleteTask(taskId);
```

### 🔒 Data Resilience

**Restart Logic:**

- Completed/Canceled tasks cannot be directly edited
- "Restart" button creates a new task with copied data
- Preserves audit trail of original task

**Error Handling:**

- Try-catch blocks on all API calls
- User-friendly error messages
- Auto-retry logic (optional)

---

## 🚀 4. Technical Stack

| Category        | Technology        | Version | Purpose                               |
| :-------------- | :---------------- | :------ | :------------------------------------ |
| **Framework**   | React             | 19.0.0  | UI Core & Component Logic             |
| **Styles**      | Material-UI (MUI) | v5      | Layout System & Pre-styled Components |
| **Icons**       | MUI Icons         | v5      | Visual indicators and action buttons  |
| **Routing**     | React Router DOM  | v6      | Client-side navigation                |
| **HTTP Client** | Axios             | Latest  | API communication with interceptors   |
| **Build Tool**  | Vite              | 5.0     | Fast HMR & optimized builds           |
| **Date Utils**  | Native JavaScript | -       | Date formatting and validation        |

---

## 🎯 5. Key Features & Patterns

### 📊 Smart Table Features

**Priority Styling:**

```javascript
const getPriorityStyle = (priority) => {
  switch (priority) {
    case "HIGH":
      return { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444" };
    case "MEDIUM":
      return { bg: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" };
    case "LOW":
      return { bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" };
  }
};
```

**Overdue Detection:**

```javascript
const isOverdue = (dateString, status) => {
  if (!dateString || status === "Done") return false;
  return new Date(dateString) < new Date();
};
```

### 🎨 Theming System

**Global CSS Variables** (`src/index.css`):

```css
:root {
  --primary-indigo: #6366f1;
  --primary-blue: #3b82f6;
  --bg-dark: #0a0f1e;
  --surface-dark: #0f172a;
}
```

**Material-UI Theme Customization:**

```javascript
sx={{
  bgcolor: '#0a0f1e',
  color: 'white',
  borderRadius: 4,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
}}
```

### 🔄 Real-time Filtering

**Status Filter:**

```javascript
<TextField
  select
  value={filterStatus}
  onChange={(e) => setFilterStatus(e.target.value)}
>
  <MenuItem value="All">All Tasks</MenuItem>
  <MenuItem value="Open">Pending</MenuItem>
  <MenuItem value="In Progress">Running</MenuItem>
  <MenuItem value="Done">Completed</MenuItem>
</TextField>
```

---

## 🛠️ 6. Development Workflow

### Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure API endpoint** (`src/config.js`):

   ```javascript
   export const API_BASE_URL = "http://localhost:8080/api";
   ```

3. **Run dev server:**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`

### Build & Deploy

1. **Production build:**

   ```bash
   npm run build
   ```

   Output: `dist/` folder

2. **Preview build:**
   ```bash
   npm run preview
   ```

---

## 📐 Design Principles

### 1. **Visual Hierarchy**

- Important actions (Create Task) use primary Indigo color
- Destructive actions (Delete) use red with confirmation
- High-contrast text for readability in low-light environments

### 2. **Information Density**

- Table view optimized for displaying 10+ tasks simultaneously
- Compact badges and chips for status/priority
- Truncated descriptions with tooltips

### 3. **Operational Efficiency**

- Single-click actions where possible
- Keyboard shortcuts support (optional enhancement)
- Fast search and filtering

### 4. **Error Prevention**

- Disabled states for invalid operations
- Confirmation dialogs for destructive actions
- Read-only mode for completed tasks

---

## 🧪 Testing Recommendations

### Manual Testing Checklist

**Authentication:**

- [ ] Login with valid credentials
- [ ] Login fails with invalid credentials
- [ ] Token persists after refresh
- [ ] Logout clears session

**Task Operations:**

- [ ] Create task with all fields
- [ ] Create task with minimal fields
- [ ] Update task status
- [ ] Delete task (with confirmation)
- [ ] Restart completed/canceled task

**UI/UX:**

- [ ] Priority colors display correctly
- [ ] Status badges show correct icons
- [ ] Long descriptions don't break layout
- [ ] Overdue tasks highlighted
- [ ] Responsive layout on mobile

---

## 📊 Performance Optimizations

1. **Pagination**: Only loads 10 tasks per page
2. **Lazy Loading**: Components loaded on-demand
3. **Memoization**: Expensive computations cached
4. **Optimistic Updates**: UI responds instantly, syncs in background

---

**Task Management System Frontend - Precision-Engineered for Enterprise Operations.**

**Developed by**: Mohamed Yasar A.
**Last Updated**: February 15, 2026
