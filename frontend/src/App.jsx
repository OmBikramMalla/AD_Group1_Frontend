/*Route Configuration*/
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute, PublicOnlyRoute } from "./pages/components/RouteGuards";
import { AuthProvider } from "./context/AuthContext";
import CustomerLayout from "./pages/components/CustomerLayout";

// Public Pages
import Login from "./Pages/public/Login";
import Register from "./Pages/public/Register";
import Unauthorized from "./Pages/public/Unauthorized";
import About from "./Pages/public/About";
import Home from "./Pages/public/Home";

// Admin Pages
import AdminDashboard from "./Pages/admin/AdminDashboard";
import FinancialReports from "./Pages/admin/FinancialReports";
import StaffManagement from "./Pages/admin/StaffManagement";
import PartsManagement from "./Pages/admin/PartsManagement";
import PurchaseInvoice from "./Pages/admin/PurchaseInvoice";
import VendorManagement from "./Pages/admin/VendorManagement";
import AdminNotifications from "./Pages/admin/AdminNotifications";

// Staff Pages
import StaffDashboard from "./Pages/staff/StaffDashboard";
import CustomerSearch from "./Pages/staff/CustomerSearch";
import EmailInvoice from "./Pages/staff/EmailInvoice";
import CustomerRegistration from "./Pages/staff/CustomerRegistration";
import SalesInvoice from "./Pages/staff/SalesInvoice";
import CustomerDetails from "./Pages/staff/CustomerDetails";
import CustomerReports from "./Pages/staff/CustomerReports";
import StaffAppointments from "./Pages/staff/StaffAppointments";

// Customer Pages
import CustomerDashboard from "./Pages/customer/CustomerDashboard";
import CustomerProfile from "./Pages/customer/CustomerProfile";
import AppointmentBooking from "./Pages/customer/AppointmentBooking";
import SubmitReview from "./Pages/customer/SubmitReview";
import CustomerHistoryLogs from "./Pages/customer/CustomerHistoryLogs";
import ServiceHistory from "./Pages/customer/ServiceHistory";
import PurchaseHistory from "./Pages/customer/PurchaseHistory";
import ChangePassword from "./Pages/customer/ChangePassword";

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

          {/* Admin */}
          <Route element={<ProtectedRoute roles={["Admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/reports" element={<FinancialReports />} />
            <Route path="/admin/staff" element={<StaffManagement />} />
            <Route path="/admin/parts" element={<PartsManagement />} />
            <Route path="/admin/purchase-invoice" element={<PurchaseInvoice />} />
            <Route path="/admin/vendors" element={<VendorManagement />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
          </Route>

          {/* Staff */}
          <Route element={<ProtectedRoute roles={["Staff"]} />}>
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/staff/customers" element={<CustomerSearch />} />

            {/* Feature 8 customer details route */}
            <Route path="/staff/customers/:id" element={<CustomerDetails />} />

            <Route path="/staff/register" element={<CustomerRegistration />} />
            <Route path="/staff/invoice" element={<EmailInvoice />} />
            <Route path="/staff/sales" element={<SalesInvoice />} />
            <Route path="/staff/reports" element={<CustomerReports />} />
            <Route path="/staff/appointments" element={<StaffAppointments />} />
          </Route>

          {/* Customer */}
          <Route element={<ProtectedRoute roles={["Customer"]} />}>
            <Route element={<CustomerLayout />}>
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/customer/appointments" element={<AppointmentBooking />} />
              <Route path="/customer/review" element={<SubmitReview />} />
              <Route path="/customer/history" element={<CustomerHistoryLogs />} />
              <Route path="/customer/purchase-history" element={<PurchaseHistory />} />
              <Route path="/customer/service-history" element={<ServiceHistory />} />
              <Route path="/customer/change-password" element={<ChangePassword />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;