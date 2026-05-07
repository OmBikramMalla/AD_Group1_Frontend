import React, { useEffect, useState } from "react";
import {
  Star,
  MessageSquare,
  Loader2,
  ThumbsUp,
  AlertCircle,
  Wrench,
} from "lucide-react";
import api from "../../services/api";

function SubmitReview() {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServiceHistory = async () => {
      try {
        const { data } = await api.get("/customers/my-history");

        const completedServices = (data.serviceHistory || []).filter(
          (s) => (s.status || "").toLowerCase() === "completed"
        );

        setServices(completedServices);

        if (completedServices.length > 0) {
          setSelectedServiceId(
            completedServices[0].appointmentId ||
              completedServices[0].id ||
              ""
          );
        }
      } catch (err) {
        console.error("Failed to load services:", err);
        setError("Failed to load completed services.");
      } finally {
        setPageLoading(false);
      }
    };

    loadServiceHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedServiceId) {
      setError("Please select a completed service.");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await api.post("/reviews", {
        serviceAppointmentId: Number(selectedServiceId),
        rating,
        comment: feedback,
      });

      setIsSuccess(true);
      setRating(0);
      setFeedback("");
    } catch (err) {
      console.error("Review submission failed:", err);
      setError(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 size={36} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-slate-800">
          Feedback & Reviews
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Submit a review for your completed service.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50 flex items-center justify-center">
        <div className="max-w-xl w-full">
          {isSuccess ? (
            <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-10 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ThumbsUp size={40} className="text-emerald-500" />
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Thank you for your feedback!
              </h3>

              <p className="text-slate-500">
                Your review has been submitted successfully.
              </p>

              <button
                onClick={() => setIsSuccess(false)}
                className="mt-8 px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition"
              >
                Submit Another Review
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                  <MessageSquare size={24} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Service Review
                  </h3>
                  <p className="text-sm text-slate-500">
                    Select a completed service and rate your experience.
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {services.length === 0 ? (
                <div className="text-center py-12">
                  <Wrench size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-lg font-bold text-slate-700">
                    No Completed Services Found
                  </h3>
                  <p className="text-slate-500 mt-2">
                    You can submit a review after a service is completed.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">
                      Select Completed Service
                    </label>

                    <select
                      required
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      {services.map((service, index) => {
                        const id = service.appointmentId || service.id;

                        return (
                          <option key={id || index} value={id}>
                            {service.serviceType || "Service"} -{" "}
                            {service.appointmentDate
                              ? new Date(
                                  service.appointmentDate
                                ).toLocaleDateString()
                              : "No date"}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="text-center space-y-4 py-4">
                    <p className="text-lg font-bold text-slate-700">
                      How would you rate this service?
                    </p>

                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-2 transition-transform hover:scale-110 focus:outline-none"
                        >
                          <Star
                            size={40}
                            className={`transition-colors ${
                              (hoverRating || rating) >= star
                                ? "fill-amber-400 text-amber-400"
                                : "fill-transparent text-slate-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">
                      Comments
                    </label>

                    <textarea
                      rows="5"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Write your feedback..."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting && (
                      <Loader2 size={20} className="animate-spin" />
                    )}
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SubmitReview;