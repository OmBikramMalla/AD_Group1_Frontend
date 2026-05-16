import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, Home } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function StaffSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-800 text-slate-300 shadow-xl z-10 min-h-screen">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          AutoLogistics
        </h1>
        <p className="text-sm text-indigo-400 mt-1">Staff Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <NavItem
          to="/"
          icon={<Home size={20} />}
          label="Home"
          active={location.pathname === "/"}
        />

        <NavItem
          to="/staff/sales"
          icon={<ShoppingCart size={20} />}
          label="Sales Invoice"
          active={location.pathname === "/staff/sales"}
        />
      </nav>

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
