// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AttendancePage from "./pages/AttendancePage";
import ManageStudents from "./pages/ManageStudents";
import AttendanceHistory from "./pages/AttendanceHistory";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";

// Auth wrapper
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/signup" element={<AdminSignup />} />

        {/* Private routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Navbar />
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <PrivateRoute>
              <Navbar />
              <AttendancePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/students"
          element={
            <PrivateRoute>
              <Navbar />
              <ManageStudents />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <Navbar />
              <AttendanceHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
