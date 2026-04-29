import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Wrench,
  Search,
  CheckCircle,
  Car,
  Loader2,
} from "lucide-react";
import api from "../../services/api";

function AppointmentBooking() {
  const [activeTab, setActiveTab] = useState("appointment");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [bookingData, setBookingData] = useState({
    vehicleId: "",
    date: "",
    time: "",
    serviceType: "Maintenance",
    notes: "",
  });

  const [partsData, setPartsData] = useState({
    partName: "",
    vehicleMake: "",
    description: "",
  });

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const { data } = await api.get("/customer-profile/me");
        const list = data.vehicles || [];
        setVehicles(list);

        if (list.length > 0) {
          setBookingData((prev) => ({
            ...prev,
            vehicleId: list[0].id,
          }));
        }
      } catch {
        setError("Failed to load your vehicles.");
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.post("/appointments", {
        vehicleId: Number(bookingData.vehicleId),
        appointmentDate: `${bookingData.date}T${bookingData.time}`,
        serviceType: bookingData.serviceType,
        description: bookingData.notes,
      });

      setIsSuccess(true);
      setBookingData((prev) => ({
        ...prev,
        date: "",
        time: "",
        notes: "",
      }));

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book appointment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePartsSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.post("/part-requests", {
        partName: partsData.partName,
        vehicleMake: partsData.vehicleMake,
        description: partsData.description,
      });

      setIsSuccess(true);
      setPartsData({
        partName: "",
        vehicleMake: "",
        description: "",
      });

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit part request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 size={36} className="animate-spin text-slate-700" />
      </div>
    );
  }

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Booking & Requests</h2>
          <p className="text-sm text-slate-500 mt-1">
            Schedule services or request unavailable parts
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          {isSuccess && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm">
              <CheckCircle className="text-emerald-500" size={28} />
              <div>
                <p className="font-bold text-lg">Request Submitted Successfully!</p>
                <p className="text-sm text-emerald-600 mt-0.5">
                  Our team will get back to you shortly.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab("appointment")}
                className={`flex-1 py-4 font-bold text-sm sm:text-base flex justify-center items-center gap-2 transition-colors ${
                  activeTab === "appointment"
                    ? "bg-slate-100 text-slate-900 border-b-2 border-slate-900"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Calendar size={18} /> Book Appointment
              </button>

              <button
                onClick={() => setActiveTab("parts")}
                className={`flex-1 py-4 font-bold text-sm sm:text-base flex justify-center items-center gap-2 transition-colors ${
                  activeTab === "parts"
                    ? "bg-slate-100 text-slate-900 border-b-2 border-slate-900"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Search size={18} /> Request Specific Part
              </button>
            </div>

            <div className="p-6 sm:p-10">
              {activeTab === "appointment" ? (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Car size={16} className="text-slate-600" /> Select Vehicle
                      </label>

                      <select
                        required
                        value={bookingData.vehicleId}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, vehicleId: e.target.value })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-700 outline-none"
                      >
                        {vehicles.length === 0 ? (
                          <option value="">No vehicle registered</option>
                        ) : (
                          vehicles.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.vehicleBrand} {v.vehicleModel} ({v.vehicleNumber})
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Wrench size={16} className="text-slate-600" /> Service Type
                      </label>

                      <select
                        value={bookingData.serviceType}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, serviceType: e.target.value })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-700 outline-none"
                      >
                        <option value="Maintenance">General Maintenance</option>
                        <option value="Repair">Mechanical Repair</option>
                        <option value="Inspection">Vehicle Inspection</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Calendar size={16} className="text-slate-600" /> Preferred Date
                      </label>

                      <input
                        type="date"
                        required
                        value={bookingData.date}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, date: e.target.value })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-700 outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Clock size={16} className="text-slate-600" /> Preferred Time
                      </label>

                      <input
                        type="time"
                        required
                        value={bookingData.time}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, time: e.target.value })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-700 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Additional Notes / Symptoms
                      </label>

                      <textarea
                        rows="4"
                        placeholder="Please describe any issues or specific requests..."
                        value={bookingData.notes}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, notes: e.target.value })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-700 outline-none resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || vehicles.length === 0}
                    className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Confirm Appointment Request"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePartsSubmit} className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6">
                    <p className="text-sm text-amber-800 font-medium">
                      Can't find a part in our standard inventory? Fill out this form and our team will locate it for you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Part Name or Number
                      </label>

                      <input
                        type="text"
                        required
                        placeholder="e.g. Alternator"
                        value={partsData.partName}
                        onChange={(e) =>
                          setPartsData({ ...partsData, partName: e.target.value })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-700 outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Vehicle Make / Model
                      </label>

                      <input
                        type="text"
                        required
                        placeholder="e.g. Toyota Corolla"
                        value={partsData.vehicleMake}
                        onChange={(e) =>
                          setPartsData({ ...partsData, vehicleMake: e.target.value })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-700 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Detailed Description
                      </label>

                      <textarea
                        rows="4"
                        required
                        placeholder="Please provide any relevant details..."
                        value={partsData.description}
                        onChange={(e) =>
                          setPartsData({ ...partsData, description: e.target.value })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-700 outline-none resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit Part Request"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentBooking;