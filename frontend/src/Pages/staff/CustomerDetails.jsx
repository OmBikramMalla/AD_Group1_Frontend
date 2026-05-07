import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Mail,
  Phone,
  Car,
  Clock,
  FileText,
  ShoppingCart,
  Search,
  UserPlus,
  Settings,
  Calendar,
  LayoutDashboard,
  Package,
  Star,
  MessageSquare,
} from "lucide-react";
import StaffSidebar from "../components/StaffSideBar";

function CustomerDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const API_BASE = "http://localhost:5093/api";

  const [activeTab, setActiveTab] = useState("invoices");
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomerDetails();
  }, [id]);

  const fetchCustomerDetails = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("jwtToken") ||
        localStorage.getItem("authToken");

      const response = await fetch(`${API_BASE}/staff/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customer details");
      }

      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error("Customer details error:", error);
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  const money = (amount) => {
    return `Rs. ${Number(amount || 0).toFixed(2)}`;
  };

  const totalSpent =
    customer?.invoices?.reduce((sum, inv) => sum + Number(inv.paidAmount || 0), 0) || 0;

  const pendingCredit =
    customer?.invoices?.reduce(
      (sum, inv) => sum + (Number(inv.totalAmount || 0) - Number(inv.paidAmount || 0)),
      0
    ) || 0;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-medium">Loading customer details...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-xl font-bold text-slate-800">Customer not found</p>
          <Link to="/staff/customers" className="text-indigo-600 font-semibold mt-3 inline-block">
            Back to Customer Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <StaffSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Link to="/staff/customers" className="text-slate-400 hover:text-indigo-600 transition font-bold">
              &larr; Back
            </Link>
            <h2 className="text-2xl font-bold text-slate-800">Customer Details</h2>
          </div>

          <button
            onClick={() => navigate(`/staff/sales?customerId=${customer.id}`)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20 text-sm flex items-center gap-2"
          >
            <ShoppingCart size={16} /> New Sale
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
              <div className="p-8 md:w-1/3 bg-slate-900 text-white flex flex-col items-center text-center justify-center">
                <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-indigo-400 mb-4">
                  {customer.fullName?.charAt(0)}
                </div>

                <h3 className="text-2xl font-bold">{customer.fullName}</h3>

                <span className="mt-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
                  ID: CUS-{customer.id}
                </span>
              </div>

              <div className="p-8 md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <InfoRow icon={<Mail size={16} />} text={customer.email} />
                  <InfoRow icon={<Phone size={16} />} text={customer.phone} />
                  <InfoRow icon={<Car size={16} />} text={`${customer.vehicles?.length || 0} vehicle(s) registered`} />
                </div>

                <div className="space-y-4 sm:pl-8 sm:border-l border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-slate-400">Total Paid Amount</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1 font-mono">
                      {money(totalSpent)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-400 flex items-center gap-1.5">
                      <Clock size={14} /> Pending Credit Balance
                    </p>
                    <p className="text-xl font-bold text-rose-500 mt-1 font-mono">
                      {money(pendingCredit)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 border-b border-slate-200 overflow-x-auto">
              <TabButton active={activeTab === "invoices"} onClick={() => setActiveTab("invoices")} icon={<FileText size={18} />} label="Purchase History" />
              <TabButton active={activeTab === "vehicles"} onClick={() => setActiveTab("vehicles")} icon={<Car size={18} />} label="Vehicles" />
              <TabButton active={activeTab === "appointments"} onClick={() => setActiveTab("appointments")} icon={<Calendar size={18} />} label="Service History" />
              <TabButton active={activeTab === "requests"} onClick={() => setActiveTab("requests")} icon={<Package size={18} />} label="Part Requests" />
              <TabButton active={activeTab === "reviews"} onClick={() => setActiveTab("reviews")} icon={<Star size={18} />} label="Reviews" />
            </div>

            <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-sm border border-slate-200 border-t-0 p-6">
              {activeTab === "invoices" && (
                <Table
                  headers={["Invoice ID", "Date", "Total", "Paid", "Due"]}
                  rows={customer.invoices}
                  empty="No purchase history found."
                  renderRow={(invoice) => (
                    <tr key={invoice.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-indigo-600 font-bold">INV-{invoice.id}</td>
                      <td className="px-6 py-4">{formatDate(invoice.invoiceDate)}</td>
                      <td className="px-6 py-4">{money(invoice.totalAmount)}</td>
                      <td className="px-6 py-4 text-emerald-600 font-bold">{money(invoice.paidAmount)}</td>
                      <td className="px-6 py-4 text-rose-600 font-bold">
                        {money(Number(invoice.totalAmount || 0) - Number(invoice.paidAmount || 0))}
                      </td>
                    </tr>
                  )}
                />
              )}

              {activeTab === "vehicles" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {customer.vehicles?.length > 0 ? (
                    customer.vehicles.map((v) => (
                      <div key={v.id} className="border border-slate-200 rounded-2xl p-6 bg-slate-50 flex gap-5">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                          <Car size={32} />
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-slate-800">
                            {v.vehicleBrand} {v.vehicleModel}
                          </h4>
                          <p className="text-sm font-mono text-slate-600 bg-white border border-slate-200 inline-block px-2 py-0.5 rounded mt-2 uppercase">
                            Plate: {v.vehicleNumber}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Empty text="No vehicles found." />
                  )}
                </div>
              )}

              {activeTab === "appointments" && (
                <Table
                  headers={["Appointment ID", "Date", "Service Type", "Description", "Status"]}
                  rows={customer.appointments}
                  empty="No service history found."
                  renderRow={(a) => (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-indigo-600 font-bold">APP-{a.id}</td>
                      <td className="px-6 py-4">{formatDate(a.appointmentDate)}</td>
                      <td className="px-6 py-4">{a.serviceType || "N/A"}</td>
                      <td className="px-6 py-4">{a.description || "N/A"}</td>
                      <td className="px-6 py-4">{a.status || "N/A"}</td>
                    </tr>
                  )}
                />
              )}

              {activeTab === "requests" && (
                <Table
                  headers={["Request ID", "Part Name", "Description", "Status"]}
                  rows={customer.partRequests}
                  empty="No part requests found."
                  renderRow={(r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-indigo-600 font-bold">REQ-{r.id}</td>
                      <td className="px-6 py-4">
                      {r.requestedPartName || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                      {r.vehicleInfo || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                      {r.status || "Pending"}
                       </td>
                    </tr>
                  )}
                />
              )}

              {activeTab === "reviews" && (
                <Table
                  headers={["Review ID", "Rating", "Comment", "Date"]}
                  rows={customer.reviews}
                  empty="No reviews found."
                  renderRow={(r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-indigo-600 font-bold">REV-{r.id}</td>
                      <td className="px-6 py-4">{r.rating || "N/A"} / 5</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <MessageSquare size={14} className="text-slate-400" />
                        {r.comment || "N/A"}
                      </td>
                      <td className="px-6 py-4">{formatDate(r.reviewDate)}</td>
                    </tr>
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const InfoRow = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-slate-600">
    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
      {icon}
    </div>
    <span className="font-medium">{text || "N/A"}</span>
  </div>
);

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`px-6 py-4 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
      active
        ? "border-indigo-600 text-indigo-600 bg-white rounded-t-xl"
        : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-t-xl"
    }`}
  >
    {icon} {label}
  </button>
);

const Table = ({ headers, rows = [], empty, renderRow }) => {
  if (!rows || rows.length === 0) return <Empty text={empty} />;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-slate-100">
          {rows.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};

const Empty = ({ text }) => (
  <div className="py-12 text-center text-slate-500 font-medium">
    {text}
  </div>
);

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

export default CustomerDetails;