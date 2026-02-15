# 🎨 Task Management System - Frontend (React)

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![Material UI](https://img.shields.io/badge/Material_UI-v5-007FFF?style=for-the-badge&logo=mui)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)

## 🌟 Overview

The **Task Management System Frontend** is a modern React 19 application with a specialized **"Cyber Intelligence"** UI theme, designed for enterprise application support teams. It features deep-linked routing, real-time filtering, and forensic audit trail visualization.

## 🎨 UI Theme: "Cyber Intelligence"

Transitioning from standard emerald green to a specialized **Indigo & Cobalt Blue** palette:

- **Reduced Eye Strain**: Dark-mode optimized for 8+ hour shifts
- **Glassmorphism**: High-blur cards with depth effects
- **Micro-Interactions**: Subtle glows and hover states on all interactive elements
- **Unified Aesthetic**: Consistent gradient headers and high-contrast typography

## ⚡ Key Features

### 1. **Modular Architecture**

```
src/
├── components/        # Reusable UI components
├── pages/            # Route-level pages (Login, Dashboard)
├── sections/         # Feature-specific sections (Tasks)
├── services/         # API & business logic
└── utils/            # Helper utilities
```

### 2. **Deep-Linked Routing**

- URL-driven navigation (`/dashboard/analysis`, `/dashboard/table`)
- Browser "Back" button works seamlessly
- Bookmarkable views for sharing with team members

### 3. **Smart Data Handling**

- **Word-Break Logic**: Zero-layout shift even with massive error logs/JSON strings
- **Real-time Search**: Filter tasks by title, description, or status
- **Pagination**: MUI Table Pagination for performance

### 4. **Visual Intelligence**

- **Color-Coded Status**: Instant recognition of task states
- **Priority Indicators**: High (Red), Medium (Amber), Low (Blue)
- **Overdue Warnings**: Automatic highlighting of past-due tasks

## 🛠️ Technology Stack

- **Framework**: React 19.0.0
- **Build Tool**: Vite 5.0
- **UI Library**: Material-UI (MUI) v5
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Authentication**: JWT (JSON Web Tokens)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd "task manager"
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure API endpoint** (if needed):
   Edit `src/config.js`:

   ```javascript
   export const API_BASE_URL = "http://localhost:8080/api";
   ```

4. **Run development server**:

   ```bash
   npm run dev
   ```

   Application will be available at `http://localhost:5173`

5. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
task manager/
├── public/
│   └── assets/              # SVG mockups and static assets
│       ├── analysis-view.svg
│       ├── task-list-view.svg
│       └── profile-view.svg
├── src/
│   ├── components/          # Reusable components
│   ├── pages/
│   │   ├── auth/           # Login & Register
│   │   └── dashboard/      # Main dashboard
│   ├── sections/
│   │   └── tasks/          # Task-specific components
│   │       ├── TaskForm.js
│   │       └── TaskList.js
│   ├── services/
│   │   ├── api.js          # Axios instance & auth service
│   │   └── taskService.js  # Task CRUD operations
│   ├── utils/
│   │   └── dateUtils.js    # Date formatting utilities
│   ├── App.js              # Root component with routing
│   ├── index.css           # Global styles & theme tokens
│   └── main.js             # Application entry point
├── index.html
├── vite.config.js
└── package.json
```

## 🔌 API Integration

### Authentication

**Login:**

```javascript
const response = await authService.login(username, password);
// Stores: token, username, role in localStorage
```

**Register:**

```javascript
const response = await authService.register(username, password, role);
```

**Logout:**

```javascript
authService.logout(); // Clears all auth data
```

### Task Operations

**Get All Tasks:**

```javascript
const tasks = await taskService.getAllTasks(page, size, status);
```

**Create Task:**

```javascript
const newTask = await taskService.createTask({
  title: "Deploy Backend API v2",
  description: "Refactor key auth endpoints",
  status: "Open",
  priority: "HIGH",
  dueDate: "2026-02-18T14:30:00",
});
```

**Update Task:**

```javascript
const updatedTask = await taskService.updateTask(taskId, updatedData);
```

**Delete Task:**

```javascript
await taskService.deleteTask(taskId);
```

## 🎨 Theming & Styling

### CSS Custom Properties

Global theme tokens defined in `index.css`:

```css
:root {
  --primary-indigo: #6366f1;
  --primary-blue: #3b82f6;
  --success-green: #10b981;
  --warning-amber: #f59e0b;
  --danger-red: #ef4444;
  --bg-dark: #0a0f1e;
  --surface-dark: #0f172a;
}
```

### Status Colors

- **PENDING** (Open): `#94a3b8` (Gray)
- **RUNNING** (In Progress): `#3b82f6` (Blue)
- **REVIEW**: `#a855f7` (Purple)
- **ON HOLD**: `#f59e0b` (Amber)
- **COMPLETED**: `#6366f1` (Indigo)
- **CANCELED**: `#ef4444` (Red)

### Priority Colors

- **HIGH**: `#ef4444` (Red)
- **MEDIUM**: `#f59e0b` (Amber)
- **LOW**: `#3b82f6` (Blue)

## 🔐 Authentication Flow

1. **User submits credentials** → `authService.login()`
2. **Backend validates** → Returns JWT + user data
3. **Frontend stores**:
   - `localStorage.setItem('token', jwt)`
   - `localStorage.setItem('username', user)`
   - `localStorage.setItem('role', role)`
4. **Axios interceptor** → Adds `Authorization: Bearer <token>` to all requests
5. **Protected routes** → Check for token existence

## 📸 Application Screenshots

### 1. **Operations Dashboard**

_High-level situational awareness with Velocity Charts and Critical Team Activity Logs._

![Analysis Dashboard](./public/assets/analysis-view.svg)

### 2. **Tactical Task Console**

_Data-dense grid with specialized 'Word-Break' logic for error logs and real-time status/priority indicators._

![Task List](./public/assets/task-list-view.svg)

### 3. **Neural Identity Profile**

_Personalized command center with session security controls and individual efficiency metrics._

![User Profile](./public/assets/profile-view.svg)

## 🧪 Testing Workflow

### Manual Testing Checklist

**Authentication:**

- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should show error)
- [ ] Logout clears localStorage
- [ ] Token persists after page refresh

**Task Management:**

- [ ] Create new task with all fields
- [ ] Create task with only required fields (title)
- [ ] Update task status
- [ ] Update task priority
- [ ] Delete task
- [ ] Search tasks by title
- [ ] Filter tasks by status
- [ ] Pagination works correctly

**UI/UX:**

- [ ] Dark mode renders correctly
- [ ] Long descriptions wrap without breaking layout
- [ ] Priority colors display correctly
- [ ] Status badges show correct icons
- [ ] Overdue tasks highlighted in red

## 🚨 Common Issues & Solutions

### Issue: "CORS Error"

**Solution:** Ensure backend has CORS enabled:

```java
@CrossOrigin(origins = "*")
```

### Issue: "401 Unauthorized on API calls"

**Solution:** Check if token exists in localStorage:

```javascript
console.log(localStorage.getItem("token"));
```

### Issue: "Tasks not loading"

**Solution:**

1. Verify backend is running on `http://localhost:8080`
2. Check Network tab in browser DevTools
3. Ensure API_BASE_URL in `config.js` is correct

### Issue: "Priority colors not showing"

**Solution:** Ensure task data has uppercase priority values (`HIGH`, `MEDIUM`, `LOW`)

## 📦 Build & Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
# Output: dist/ folder
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Static Hosting

The `dist/` folder can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🎯 Performance Optimizations

1. **Lazy Loading**: Components loaded on-demand
2. **Pagination**: Only 10 tasks fetched per request
3. **Memoization**: Expensive computations cached
4. **Tree Shaking**: Vite removes unused code automatically

## 🔧 Environment Variables

Create a `.env` file (optional):

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Code Quality

### ESLint Configuration

```bash
npm run lint
```

### Format Code

```bash
npm run format  # (if Prettier is configured)
```

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

MIT License

Copyright (c) 2026 Mohamed Yasar A.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

**Developed by**: Mohamed Yasar A.
**Last Updated**: February 15, 2026
