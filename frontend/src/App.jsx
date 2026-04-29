/**
 * App.jsx — Route Configuration
 *
 * Route groups:
 *  1. PUBLIC-ONLY  (/login, /register)  → redirect to dashboard if already logged in
 *  2. ADMIN        (/admin/*)           → require role "Admin"
 *  3. STAFF        (/staff/*)           → require role "Staff"
 *  4. CUSTOMER     (/customer/*)        → require role "Customer"
 *  5. OPEN PUBLIC  (/unauthorized, /about, /home)  → no auth required
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ── Route Guards ─────────────────────────────────────────────────────────
import { ProtectedRoute, PublicOnlyRoute } from "./components/RouteGuards";
import { AuthProvider } from "./context/AuthContext";
import CustomerLayout from "./components/CustomerLayout";

// ── Public Pages ──────────────────────────────────────────────────────────
import Login          from "./Pages/public/Login";
import Register       from "./Pages/public/Register";
import Unauthorized   from "./Pages/public/Unauthorized";
import About          from "./Pages/public/About";
import Home           from "./Pages/public/Home";

// ── Admin Pages ───────────────────────────────────────────────────────────
import AdminDashboard     from "./Pages/admin/AdminDashboard";
import AdminProfile       from "./Pages/admin/AdminProfile";
import FinancialReports   from "./Pages/admin/FinancialReports";
import StaffManagement    from "./Pages/admin/StaffManagement";
import PartsManagement    from "./Pages/admin/PartsManagement";
import PurchaseInvoice    from "./Pages/admin/PurchaseInvoice";
import VendorManagement   from "./Pages/admin/VendorManagement";
import AdminNotifications from "./Pages/admin/AdminNotifications";

// ── Staff Pages ───────────────────────────────────────────────────────────
import StaffDashboard       from "./Pages/staff/StaffDashboard";
import CustomerSearch       from "./Pages/staff/CustomerSearch";
import EmailInvoice         from "./Pages/staff/EmailInvoice";
import CustomerRegistration from "./Pages/staff/CustomerRegistration";
import SalesInvoice         from "./Pages/staff/SalesInvoice";
import CustomerDetails      from "./Pages/staff/CustomerDetails";
import CustomerReports      from "./Pages/staff/CustomerReports";

// ── Customer Pages ────────────────────────────────────────────────────────
import CustomerDashboard     from "./Pages/customer/CustomerDashboard";
import CustomerProfile       from "./Pages/customer/CustomerProfile";
import AppointmentBooking    from "./Pages/customer/AppointmentBooking";
import SubmitReview          from "./Pages/customer/SubmitReview";
import CustomerHistoryLogs   from "./Pages/customer/CustomerHistoryLogs";
import CustomerNotifications from "./Pages/customer/CustomerNotifications";
import ServiceHistory from "./pages/customer/ServiceHistory";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* ── Root: Marketing Landing Page ── */}
          <Route path="/" element={<Home />} />

          {/* ════════════════════════════════════════════════════════
              PUBLIC-ONLY: redirect away if already authenticated
          ════════════════════════════════════════════════════════ */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
               <Route path="/staff/register"  element={<CustomerRegistration />} />
          </Route>

          {/* ════════════════════════════════════════════════════════
              OPEN PUBLIC: anyone can visit (no auth check)
          ════════════════════════════════════════════════════════ */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/about"        element={<About />} />

          {/* ════════════════════════════════════════════════════════
              ADMIN ROUTES  (role: Admin)
          ════════════════════════════════════════════════════════ */}
          <Route element={<ProtectedRoute roles={["Admin"]} />}>
            <Route path="/admin/dashboard"        element={<AdminDashboard />} />
            <Route path="/admin/profile"          element={<AdminProfile />} />
            <Route path="/admin/reports"          element={<FinancialReports />} />
            <Route path="/admin/staff"            element={<StaffManagement />} />
            <Route path="/admin/parts"            element={<PartsManagement />} />
            <Route path="/admin/purchase-invoice" element={<PurchaseInvoice />} />
            <Route path="/admin/vendors"          element={<VendorManagement />} />
            <Route path="/admin/notifications"    element={<AdminNotifications />} />
          </Route>

          {/* ════════════════════════════════════════════════════════
              STAFF ROUTES  (role: Staff)
          ════════════════════════════════════════════════════════ */}
          <Route element={<ProtectedRoute roles={["Staff"]} />}>
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/staff/customers" element={<CustomerSearch />} />
            <Route path="/staff/invoice"   element={<EmailInvoice />} />
         
            <Route path="/staff/sales"     element={<SalesInvoice />} />
            <Route path="/staff/details"   element={<CustomerDetails />} />
            <Route path="/staff/reports"   element={<CustomerReports />} />
          </Route>

          {/* ════════════════════════════════════════════════════════
              CUSTOMER ROUTES  (role: Customer)
          ════════════════════════════════════════════════════════ */}
          <Route element={<ProtectedRoute roles={["Customer"]} />}>
            <Route element={<CustomerLayout />}>
              <Route path="/customer/dashboard"     element={<CustomerDashboard />} />
              <Route path="/customer/profile"       element={<CustomerProfile />} />
              <Route path="/customer/appointments"  element={<AppointmentBooking />} />
              <Route path="/customer/review"        element={<SubmitReview />} />
              <Route path="/customer/history"       element={<CustomerHistoryLogs />} />
              <Route path="/customer/notifications" element={<CustomerNotifications />} />
              <Route path="/customer/service-history" element={<ServiceHistory />} />
            </Route>
          </Route>

          {/* ── 404 fallback ── */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;