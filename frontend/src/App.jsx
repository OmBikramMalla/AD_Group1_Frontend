/* Route Configuration — Features 2 & 3: Admin Staff & Parts Management */
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute, PublicOnlyRoute } from "./Pages/components/RouteGuards";
import { AuthProvider } from "./context/AuthContext";

// Public Pages
import Login from "./Pages/public/Login";
import Register from "./Pages/public/Register";
import Unauthorized from "./Pages/public/Unauthorized";
import About from "./Pages/public/About";
import Home from "./Pages/public/Home";

// Admin Pages
import AdminDashboard from "./Pages/admin/AdminDashboard";
import StaffManagement from "./Pages/admin/StaffManagement";
import PartsManagement from "./Pages/admin/PartsManagement";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Public only */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Admin — Feature 2: Staff registration & roles
                      Feature 3: Parts management (purchase, edit, delete) */}
          <Route element={<ProtectedRoute roles={["Admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/staff" element={<StaffManagement />} />
            <Route path="/admin/parts" element={<PartsManagement />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
