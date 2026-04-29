import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass =
    "block px-4 py-3 rounded-lg text-sm font-medium transition";

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white flex flex-col p-4">
      
      {/* Logo / Title */}
      <div className="mb-8">
        <h1 className="text-xl font-bold">AutoPart Pro</h1>
        <p className="text-xs text-slate-400">Staff Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/staff/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/staff/customer-search"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
  ? "bg-slate-700 text-white"
  : "text-slate-300 hover:bg-slate-800"
            }`
          }
        >
          Customers
        </NavLink>

        <NavLink
          to="/staff/sales-invoice"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`
          }
        >
          Sales
        </NavLink>

        <NavLink
          to="/staff/customer-reports"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`
          }
        >
          Reports
        </NavLink>
      </nav>

      {/* Bottom */}
      <div className="mt-auto pt-6 border-t border-slate-700 text-sm text-slate-400">
        Logged in as Staff
      </div>
    </div>
  );
};

export default Sidebar;