/* Route Configuration — Features 2, 3, 4 & 15: Admin Staff, Parts,
   Purchase Invoices & Notifications */
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
import PurchaseInvoice from "./Pages/admin/PurchaseInvoice";
import AdminNotifications from "./Pages/admin/AdminNotifications";

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
                      Feature 3: Parts management (purchase, edit, delete)
                      Feature 4: Purchase invoices for stock updates
                      Feature 15: Low-stock alerts & unpaid-credit reminders */}
          <Route element={<ProtectedRoute roles={["Admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/staff" element={<StaffManagement />} />
            <Route path="/admin/parts" element={<PartsManagement />} />
            <Route path="/admin/purchase-invoice" element={<PurchaseInvoice />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
