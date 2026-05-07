import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Wrench,
  Clock,
  CheckCircle,
  Loader2,
  Car,
  FileText,
} from "lucide-react";
import api from "../../services/api";

const STATUS_STYLE = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed: "bg-sky-50 text-sky-700 border-sky-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-red-50 text-red-600 border-red-200",
};

const STATUS_ICON = {
  Pending: <Clock size={14} />,
  Confirmed: <Calendar size={14} />,
  Completed: <CheckCircle size={14} />,
  Cancelled: <Clock size={14} />,
};

function ServiceHistory() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadServiceHistory = async () => {
      try {
        const { data } = await api.get("/customers/my-history");
        setAppointments(data.serviceHistory || []);
      } catch (error) {
        console.error("Failed to load service history:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    loadServiceHistory();
  }, []);

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-slate-800">Service History</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          View your booked service appointments and their current status.
        </p>
      </header>

      <div className="flex-1 p-6 sm:p-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={36} className="animate-spin text-slate-700" />
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center">
              <Wrench size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-700">
                No Service Records
              </h3>
              <p className="text-slate-500 mt-2 mb-6">
                Book your first service appointment to get started.
              </p>

              <Link
                to="/customer/appointments"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
              >
                <Calendar size={18} />
                Book Appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {appointments.map((appt, index) => {
                const status = appt.status || "Pending";

                const statusStyle =
                  STATUS_STYLE[status] ??
                  "bg-slate-50 text-slate-600 border-slate-200";

                const statusIcon = STATUS_ICON[status] ?? <Clock size={14} />;

                return (
                  <div
                    key={appt.appointmentId || appt.id || index}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 flex-shrink-0">
                          <Wrench size={22} />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-bold text-slate-800 text-lg">
                              {appt.serviceType || "Service Appointment"}
                            </h3>

                            <span className="text-xs px-2 py-1 rounded-lg bg-slate-100 text-slate-600 font-semibold">
                              Appointment #{appt.appointmentId || appt.id}
                            </span>
                          </div>

                          <div className="mt-3 grid gap-2 text-sm text-slate-600">
                            <p className="flex items-center gap-2">
                              <Calendar size={15} className="text-slate-400" />
                              {appt.appointmentDate
                                ? new Date(
                                    appt.appointmentDate
                                  ).toLocaleDateString("en-US", {
                                    dateStyle: "long",
                                  })
                                : "Date not set"}
                            </p>

                            {(appt.vehicleName || appt.vehicleNumber) && (
                              <p className="flex items-center gap-2">
                                <Car size={15} className="text-slate-400" />
                                {appt.vehicleName || "Vehicle"}{" "}
                                {appt.vehicleNumber
                                  ? `(${appt.vehicleNumber})`
                                  : ""}
                              </p>
                            )}

                            {appt.description && (
                              <p className="flex items-start gap-2">
                                <FileText
                                  size={15}
                                  className="text-slate-400 mt-0.5"
                                />
                                <span>{appt.description}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border w-fit ${statusStyle}`}
                      >
                        {statusIcon}
                        {status}
                      </span>
                    </div>

                    {status === "Completed" && (
                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <Link
                          to="/customer/review"
                          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
                        >
                          <CheckCircle size={16} />
                          Submit or view review
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ServiceHistory;