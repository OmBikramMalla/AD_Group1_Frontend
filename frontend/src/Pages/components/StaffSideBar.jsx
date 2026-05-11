import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  UserPlus,
  ShoppingCart,
  Settings,
  LogOut,
  Mail,
} from "lucide-react";
import { CalendarDays } from "lucide-react";

function StaffSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-800 text-slate-300 shadow-xl z-10">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          AutoLogistics
        </h1>
        <p className="text-sm text-indigo-400 mt-1">Staff Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <NavItem
          to="/staff/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={location.pathname === "/staff/dashboard"}
        />

        <NavItem
          to="/staff/customers"
          icon={<Search size={20} />}
          label="Customer Search"
          active={location.pathname.startsWith("/staff/customers")}
        />

        <NavItem
          to="/staff/register"
          icon={<UserPlus size={20} />}
          label="Register Customer"
          active={location.pathname === "/staff/register"}
        />

        <NavItem
          to="/staff/appointments"
          icon={<CalendarDays size={20} />}
          label="Appointments"
          active={location.pathname === "/staff/appointments"}
        />
        
        <NavItem
          to="/staff/sales"
          icon={<ShoppingCart size={20} />}
          label="Sales Invoice"
          active={location.pathname === "/staff/sales"}
        />

        <NavItem
          to="/staff/invoice"
          icon={<Mail size={20} />}
          label="Email Invoices"
          active={location.pathname === "/staff/invoice"}
        />

        <NavItem
          to="/staff/reports"
          icon={<Settings size={20} />}
          label="Customer Reports"
          active={location.pathname === "/staff/reports"}
        />
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

const NavItem = ({ icon, label, active, to }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
      active
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
        : "text-slate-400 hover:bg-slate-700 hover:text-white"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export default StaffSidebar;