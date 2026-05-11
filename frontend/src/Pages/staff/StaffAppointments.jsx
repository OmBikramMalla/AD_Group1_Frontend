import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  AlertCircle,
  Search,
  RefreshCw,
  Car,
  User,
} from "lucide-react";
import StaffSidebar from "../components/StaffSideBar";
import api from "../../services/api";

function StaffAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/appointments/staff/all");
      setAppointments(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const keyword = searchTerm.toLowerCase();

      const matchesSearch =
        String(a.id).includes(keyword) ||
        (a.customerName || "").toLowerCase().includes(keyword) ||
        (a.customerPhone || "").toLowerCase().includes(keyword) ||
        (a.vehicleNumber || "").toLowerCase().includes(keyword) ||
        (a.vehicleBrand || "").toLowerCase().includes(keyword) ||
        (a.vehicleModel || "").toLowerCase().includes(keyword) ||
        (a.serviceType || "").toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All" || a.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  const updateStatus = async (appointmentId, status) => {
    try {
      setUpdatingId(appointmentId);
      setError("");
      setSuccess("");

      await api.put(`/appointments/${appointmentId}/status`, { status });

      setSuccess("Appointment status updated successfully.");
      await fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadge = (status) => {
    const styles = {
      Pending: "bg-amber-50 text-amber-700 border-amber-200",
      Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
      Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Cancelled: "bg-red-50 text-red-700 border-red-200",
    };

    return styles[status] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <StaffSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Appointment Management
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              View customer appointments and update service status.
            </p>
          </div>

          <button
            onClick={fetchAppointments}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <CheckCircle size={20} />
                <span>{success}</span>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <CalendarDays className="text-indigo-500" size={20} />
                    Staff Appointment Queue
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Pending, confirmed, completed, and cancelled appointments.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-3 w-full sm:w-80">
                    <Search className="text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search customer, vehicle, service..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm text-slate-700"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none"
                  >
                    <option value="All">All Status</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="p-8 text-center text-slate-500">
                  Loading appointments...
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="p-10 text-center text-slate-500">
                  <CalendarDays size={42} className="mx-auto mb-3 text-slate-300" />
                  No appointments found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Appointment
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Customer
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Vehicle
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Service
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Status
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Update
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-slate-50">
                          <td className="px-5 py-4">
                            <p className="font-bold text-slate-800">
                              #{appointment.id}
                            </p>
                            <p className="text-xs text-slate-500">
                              {appointment.appointmentDate
                                ? new Date(
                                    appointment.appointmentDate
                                  ).toLocaleString()
                                : "-"}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-semibold text-slate-800 flex items-center gap-2">
                              <User size={15} />
                              {appointment.customerName || "Unknown"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {appointment.customerPhone}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-semibold text-slate-800 flex items-center gap-2">
                              <Car size={15} />
                              {appointment.vehicleNumber || "-"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {appointment.vehicleBrand} {appointment.vehicleModel}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-semibold text-slate-800">
                              {appointment.serviceType}
                            </p>
                            <p className="text-xs text-slate-500 max-w-xs truncate">
                              {appointment.description}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full border ${statusBadge(
                                appointment.status
                              )}`}
                            >
                              {appointment.status}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <select
                              value={appointment.status}
                              disabled={updatingId === appointment.id}
                              onChange={(e) =>
                                updateStatus(appointment.id, e.target.value)
                              }
                              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:border-indigo-500 disabled:opacity-60"
                            >
                              {statuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StaffAppointments;