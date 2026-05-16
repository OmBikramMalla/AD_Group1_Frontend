import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Bell,
  Home,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 shadow-xl z-10 min-h-screen">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          AutoLogistics
        </h1>

        <p className="text-sm text-indigo-400 mt-1">
          Admin Portal
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <NavItem
          to="/"
          icon={<Home size={20} />}
          label="Home"
          active={location.pathname === "/"}
        />

        <NavItem
          to="/admin/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={location.pathname === "/admin/dashboard"}
        />

        <NavItem
          to="/admin/staff"
          icon={<Users size={20} />}
          label="Staff Management"
          active={location.pathname === "/admin/staff"}
        />

        <NavItem
          to="/admin/parts"
          icon={<Package size={20} />}
          label="Parts Inventory"
          active={location.pathname === "/admin/parts"}
        />

        <NavItem
          to="/admin/purchase-invoice"
          icon={<ShoppingCart size={20} />}
          label="Purchase Invoices"
          active={location.pathname === "/admin/purchase-invoice"}
        />

        <NavItem
          to="/admin/notifications"
          icon={<Bell size={20} />}
          label="Notifications"
          active={location.pathname === "/admin/notifications"}
        />
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={20} />

          <span className="font-medium">
            Logout
          </span>
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
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`}
  >
    {icon}

    <span className="font-medium">
      {label}
    </span>
  </Link>
);

export default AdminSidebar;
