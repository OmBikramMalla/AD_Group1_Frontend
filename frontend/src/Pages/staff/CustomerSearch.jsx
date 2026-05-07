import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search, Users, Car, Phone, Fingerprint, ChevronDown, Filter,
  FileText, Eye, Mail, LayoutDashboard, UserPlus, ShoppingCart, Settings,
} from "lucide-react";
import StaffSidebar from "../components/StaffSideBar";

function CustomerSearch() {
  const location = useLocation();
  const navigate = useNavigate();

  const API_BASE = "http://localhost:5093/api";

  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchCustomers = async (term = "") => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("jwtToken") ||
        localStorage.getItem("authToken");

      let url = `${API_BASE}/staff/customers`;

      if (term.trim() !== "") {
        url = `${API_BASE}/staff/customers/search?query=${encodeURIComponent(
          term.trim()
        )}`;
      }

      console.log("Calling:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Status:", response.status);

      if (!response.ok) {
        setCustomers([]);
        return;
      }

      const data = await response.json();
      console.log("Customers:", data);

      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Customer fetch error:", error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const vehicles = customer.vehicles || [];

    if (searchFilter === "name") {
      return customer.fullName?.toLowerCase().includes(term);
    }

    if (searchFilter === "phone") {
      return customer.phone?.toLowerCase().includes(term);
    }

    if (searchFilter === "id") {
      return customer.id?.toString().includes(term);
    }

    if (searchFilter === "vehicle") {
      return vehicles.some(
        (v) =>
          v.vehicleNumber?.toLowerCase().includes(term) ||
          v.vehicleBrand?.toLowerCase().includes(term) ||
          v.vehicleModel?.toLowerCase().includes(term)
      );
    }

    return (
      customer.fullName?.toLowerCase().includes(term) ||
      customer.phone?.toLowerCase().includes(term) ||
      customer.id?.toString().includes(term) ||
      vehicles.some(
        (v) =>
          v.vehicleNumber?.toLowerCase().includes(term) ||
          v.vehicleBrand?.toLowerCase().includes(term) ||
          v.vehicleModel?.toLowerCase().includes(term)
      )
    );
  });

  const getFilterIcon = () => {
    switch (searchFilter) {
      case "name":
        return <Users size={16} />;
      case "phone":
        return <Phone size={16} />;
      case "id":
        return <Fingerprint size={16} />;
      case "vehicle":
        return <Car size={16} />;
      default:
        return <Filter size={16} />;
    }
  };

  const getFilterLabel = () => {
    switch (searchFilter) {
      case "name":
        return "Name";
      case "phone":
        return "Phone";
      case "id":
        return "Customer ID";
      case "vehicle":
        return "Vehicle No.";
      default:
        return "All Fields";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <StaffSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-800">Customer Directory</h2>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-700">Staff Member</p>
              <p className="text-xs text-gray-500">Service Dept</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
              SM
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="h-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-3 text-gray-700 font-medium hover:bg-gray-100 transition min-w-[160px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-500">{getFilterIcon()}</span>
                      {getFilterLabel()}
                    </div>
                    <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-20">
                      {[
                        { id: "all", label: "All Fields", icon: <Filter size={16} /> },
                        { id: "name", label: "Name", icon: <Users size={16} /> },
                        { id: "phone", label: "Phone", icon: <Phone size={16} /> },
                        { id: "id", label: "Customer ID", icon: <Fingerprint size={16} /> },
                        { id: "vehicle", label: "Vehicle No.", icon: <Car size={16} /> },
                      ].map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => {
                            setSearchFilter(filter.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-indigo-50 transition ${
                            searchFilter === filter.id
                              ? "bg-indigo-50/50 text-indigo-600 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          <span className={searchFilter === filter.id ? "text-indigo-500" : "text-gray-400"}>
                            {filter.icon}
                          </span>
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Search customers by ${getFilterLabel().toLowerCase()}...`}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {loading && <div className="p-6 text-center text-gray-500">Loading customers...</div>}

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer Info</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vehicle</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50/50 transition">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                {customer.fullName?.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{customer.fullName}</div>
                                <div className="text-xs text-gray-500">CUS-{customer.id}</div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 flex items-center gap-1.5">
                              <Phone size={14} className="text-gray-400" />
                              {customer.phone}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                              <Mail size={14} className="text-gray-400" />
                              {customer.email}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                              {customer.vehicles?.length > 0
                                ? `${customer.vehicles[0].vehicleBrand} ${customer.vehicles[0].vehicleModel} (${customer.vehicles[0].vehicleNumber})`
                                : "No Vehicle"}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button
                              onClick={() => navigate(`/staff/customers/${customer.id}`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition shadow-sm"
                            >
                              <Eye size={16} />
                              <span className="hidden sm:inline">View</span>
                            </button>

                            <button
                              onClick={() => navigate(`/staff/sales?customerId=${customer.id}`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-100 transition shadow-sm"
                            >
                              <FileText size={16} />
                              <span className="hidden sm:inline">Invoice</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      !loading && (
                        <tr>
                          <td colSpan="4" className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <Search size={48} className="text-gray-300 mb-4" />
                              <p className="text-lg font-medium text-gray-900">No customers found</p>
                              <p className="text-sm mt-1">Try adjusting your search settings.</p>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredCustomers.length}</span> results
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const NavItem = ({ icon, label, active, to }) => (
  <Link
    to={to || "#"}
    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
      active
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
        : "text-slate-400 hover:bg-slate-700 hover:text-white"
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  </Link>
);

export default CustomerSearch;