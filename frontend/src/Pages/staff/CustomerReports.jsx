import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  UserPlus,
  ShoppingCart,
  LayoutDashboard,
  Settings,
  Award,
  Clock,
  AlertCircle,
} from "lucide-react";

function CustomerReports() {
  const location = useLocation();
  const [activeReport, setActiveReport] = useState("high_spenders");

  const [highSpenders, setHighSpenders] = useState([]);
  const [frequentCustomers, setFrequentCustomers] = useState([]);
  const [pendingCredits, setPendingCredits] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:5093/api";

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("jwtToken") ||
        localStorage.getItem("authToken");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [topRes, frequentRes, pendingRes] = await Promise.all([
        fetch(`${API_BASE}/staff/reports/top-spenders`, { headers }),
        fetch(`${API_BASE}/staff/reports/frequent-customers`, { headers }),
        fetch(`${API_BASE}/staff/reports/pending-payments`, { headers }),
      ]);

      if (!topRes.ok || !frequentRes.ok || !pendingRes.ok) {
        throw new Error("Failed to fetch one or more reports");
      }

      const topData = await topRes.json();
      const frequentData = await frequentRes.json();
      const pendingData = await pendingRes.json();

      setHighSpenders(Array.isArray(topData) ? topData : []);
      setFrequentCustomers(Array.isArray(frequentData) ? frequentData : []);
      setPendingCredits(Array.isArray(pendingData) ? pendingData : []);
    } catch (error) {
      console.error("Reports fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const money = (amount) => `Rs. ${Number(amount || 0).toFixed(2)}`;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center text-slate-500 font-medium">
          Loading reports...
        </div>
      );
    }

    if (activeReport === "high_spenders") {
      return (
        <ReportCard
          title="VIP Customers (High Spenders)"
          subtitle="Customers ranked by total paid amount"
          icon={<Award className="text-indigo-600" size={20} />}
          headerClass="bg-indigo-50/50"
        >
          <ReportTable
            headers={["Customer", "Total Spent", "Appointments", "Pending Amount"]}
            emptyText="No high spender data found."
            rows={highSpenders}
            renderRow={(c) => (
              <tr key={c.customerId} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-bold text-slate-900">{c.fullName}</div>
                  <div className="text-xs text-slate-500 font-mono">
                    CUS-{c.customerId}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-bold text-emerald-600">
                  {money(c.totalSpent)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center text-slate-700 font-medium">
                  {c.totalAppointments || 0}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-bold text-rose-600">
                  {money(c.pendingAmount)}
                </td>
              </tr>
            )}
          />
        </ReportCard>
      );
    }

    if (activeReport === "frequent_customers") {
      return (
        <ReportCard
          title="Frequent Customers"
          subtitle="Customers ranked by number of service appointments"
          icon={<Clock className="text-emerald-600" size={20} />}
          headerClass="bg-emerald-50/50"
        >
          <ReportTable
            headers={["Customer", "Total Appointments", "Total Spent", "Pending Amount"]}
            emptyText="No frequent customer data found."
            rows={frequentCustomers}
            renderRow={(c) => (
              <tr key={c.customerId} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-bold text-slate-900">{c.fullName}</div>
                  <div className="text-xs text-slate-500 font-mono">
                    CUS-{c.customerId}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-emerald-600">
                  {c.totalAppointments || 0}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-bold text-slate-700">
                  {money(c.totalSpent)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-bold text-rose-600">
                  {money(c.pendingAmount)}
                </td>
              </tr>
            )}
          />
        </ReportCard>
      );
    }

    if (activeReport === "pending_credits") {
      return (
        <ReportCard
          title="Outstanding Credit Payments"
          subtitle="Customers with unpaid credit balances"
          icon={<AlertCircle className="text-rose-600" size={20} />}
          headerClass="bg-rose-50/50"
        >
          <ReportTable
            headers={["Customer", "Pending Amount", "Total Spent", "Appointments"]}
            emptyText="No pending credit data found."
            rows={pendingCredits}
            renderRow={(c) => (
              <tr key={c.customerId} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-bold text-slate-900">{c.fullName}</div>
                  <div className="text-xs text-slate-500 font-mono">
                    CUS-{c.customerId}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-bold text-rose-600">
                  {money(c.pendingAmount)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-bold text-slate-700">
                  {money(c.totalSpent)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center text-slate-700 font-medium">
                  {c.totalAppointments || 0}
                </td>
              </tr>
            )}
          />
        </ReportCard>
      );
    }

    return null;
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
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
            active={location.pathname === "/staff/customers"}
          />
          <NavItem
            to="/staff/register"
            icon={<UserPlus size={20} />}
            label="Register Customer"
            active={location.pathname === "/staff/register"}
          />
          <NavItem
            to="/staff/sales"
            icon={<ShoppingCart size={20} />}
            label="Point of Sale"
            active={location.pathname === "/staff/sales"}
          />
          <NavItem
            to="/staff/reports"
            icon={<Settings size={20} />}
            label="Customer Reports"
            active={location.pathname === "/staff/reports"}
          />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Customer Intelligence
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Generate customer reports and track staff-side analytics
            </p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-3">
              <ReportButton
                active={activeReport === "high_spenders"}
                onClick={() => setActiveReport("high_spenders")}
                activeClass="bg-indigo-600 border-indigo-600 shadow-indigo-600/20 text-white"
                inactiveClass="bg-white border-slate-200 hover:border-indigo-300 text-slate-700"
                iconBoxClass={
                  activeReport === "high_spenders"
                    ? "bg-white/20"
                    : "bg-indigo-50 text-indigo-600"
                }
                icon={<Award size={24} />}
                title="High Spenders"
                subtitle="Top revenue customers"
                activeSubtitleClass="text-indigo-100"
              />

              <ReportButton
                active={activeReport === "frequent_customers"}
                onClick={() => setActiveReport("frequent_customers")}
                activeClass="bg-emerald-600 border-emerald-600 shadow-emerald-600/20 text-white"
                inactiveClass="bg-white border-slate-200 hover:border-emerald-300 text-slate-700"
                iconBoxClass={
                  activeReport === "frequent_customers"
                    ? "bg-white/20"
                    : "bg-emerald-50 text-emerald-600"
                }
                icon={<Clock size={24} />}
                title="Frequent Customers"
                subtitle="Regular service visitors"
                activeSubtitleClass="text-emerald-100"
              />

              <ReportButton
                active={activeReport === "pending_credits"}
                onClick={() => setActiveReport("pending_credits")}
                activeClass="bg-rose-600 border-rose-600 shadow-rose-600/20 text-white"
                inactiveClass="bg-white border-slate-200 hover:border-rose-300 text-slate-700"
                iconBoxClass={
                  activeReport === "pending_credits"
                    ? "bg-white/20"
                    : "bg-rose-50 text-rose-600"
                }
                icon={<AlertCircle size={24} />}
                title="Pending Credits"
                subtitle="Unpaid balances"
                activeSubtitleClass="text-rose-100"
              />
            </div>

            <div className="lg:col-span-3">{renderContent()}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

const ReportButton = ({
  active,
  onClick,
  activeClass,
  inactiveClass,
  iconBoxClass,
  icon,
  title,
  subtitle,
  activeSubtitleClass,
}) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-2xl flex flex-col gap-3 transition-all border shadow-md ${
      active ? activeClass : inactiveClass
    }`}
  >
    <div className={`p-2 rounded-xl w-max ${iconBoxClass}`}>{icon}</div>

    <div className="text-left">
      <h4 className="font-bold">{title}</h4>
      <p
        className={`text-xs mt-1 ${
          active ? activeSubtitleClass : "text-slate-500"
        }`}
      >
        {subtitle}
      </p>
    </div>
  </button>
);

const ReportCard = ({ title, subtitle, icon, headerClass, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
    <div className={`p-6 border-b border-slate-100 ${headerClass}`}>
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
    {children}
  </div>
);

const ReportTable = ({ headers, rows, emptyText, renderRow }) => {
  if (!rows || rows.length === 0) {
    return (
      <div className="p-10 text-center text-slate-500 font-medium">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">{rows.map(renderRow)}</tbody>
      </table>
    </div>
  );
};

const NavItem = ({ icon, label, active, to }) => (
  <Link
    to={to || "#"}
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

export default CustomerReports;