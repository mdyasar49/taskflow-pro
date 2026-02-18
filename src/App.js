import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { ColorModeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ColorModeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/:view" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={<Navigate to="/dashboard/analysis" />} />
          <Route path="/" element={<Navigate to="/dashboard/analysis" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ColorModeProvider>
  );
}

export default App;
