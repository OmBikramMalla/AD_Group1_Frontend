import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Car, User, Phone, Mail, CheckCircle, Lock } from "lucide-react";
import StaffSidebar from "../components/StaffSidebar";

function CustomerRegistration() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    vehicleMake: "",
    vehicleModel: "",
    licensePlate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      vehicleMake: "",
      vehicleModel: "",
      licensePlate: "",
    });
  };

  const goBackToPersonalInfo = () => {
    setError(null);
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      setStep(2);
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        password: formData.password,
        vehicleNumber: formData.licensePlate.trim(),
        vehicleModel: formData.vehicleModel.trim(),
        vehicleBrand: formData.vehicleMake.trim(),
      };

      await api.post("/customers/register", payload);

      setIsSuccess(true);
      resetForm();

      setTimeout(() => {
        navigate("/staff/customers");
      }, 1500);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "An error occurred during registration.";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <StaffSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Walk-in Registration
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Register customer account with vehicle details
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-bold text-sm">
            Step {step} of 2
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-3xl mx-auto">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0 font-bold">
                  !
                </div>

                <div>
                  <p className="font-bold">Registration Failed</p>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            )}

            {isSuccess && (
              <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm">
                <CheckCircle className="text-emerald-500" size={28} />

                <div>
                  <p className="font-bold text-lg">
                    Customer Registered Successfully!
                  </p>
                  <p className="text-sm text-emerald-600 mt-0.5">
                    Login account, customer profile, and vehicle have been
                    saved.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
              <div className="h-1.5 w-full bg-slate-100 absolute top-0 left-0">
                <div
                  className="h-full bg-indigo-600 transition-all duration-500"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                />
              </div>

              <div className="p-8 sm:p-10">
                <form onSubmit={handleSubmit}>
                  {step === 1 ? (
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                          <User size={20} />
                        </div>

                        <h3 className="text-xl font-bold text-slate-800">
                          Customer Account Details
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />

                        <InputField
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />

                        <InputField
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          icon={<Mail size={16} className="text-slate-400" />}
                        />

                        <InputField
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          icon={<Phone size={16} className="text-slate-400" />}
                        />

                        <div className="sm:col-span-2">
                          <InputField
                            label="Temporary Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            icon={<Lock size={16} className="text-slate-400" />}
                          />
                        </div>
                      </div>

                      <div className="pt-6 flex justify-end">
                        <button
                          type="submit"
                          className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20"
                        >
                          Continue to Vehicle Details &rarr;
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                          <Car size={20} />
                        </div>

                        <h3 className="text-xl font-bold text-slate-800">
                          Vehicle Details
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField
                          label="Vehicle Brand"
                          name="vehicleMake"
                          value={formData.vehicleMake}
                          onChange={handleInputChange}
                          placeholder="e.g. Toyota"
                          required
                        />

                        <InputField
                          label="Vehicle Model"
                          name="vehicleModel"
                          value={formData.vehicleModel}
                          onChange={handleInputChange}
                          placeholder="e.g. Camry"
                          required
                        />

                        <div className="sm:col-span-2">
                          <InputField
                            label="Vehicle Number / License Plate"
                            name="licensePlate"
                            value={formData.licensePlate}
                            onChange={handleInputChange}
                            placeholder="e.g. BA-12-PA-1234"
                            required
                            uppercase
                          />
                        </div>
                      </div>

                      <div className="pt-6 flex justify-between gap-4">
                        <button
                          type="button"
                          onClick={goBackToPersonalInfo}
                          disabled={isSubmitting}
                          className="px-6 py-3.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition disabled:opacity-50"
                        >
                          &larr; Back
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            "Processing..."
                          ) : (
                            <>
                              <CheckCircle size={18} />
                              Complete Registration
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  uppercase = false,
}) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
      {icon}
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition ${
        uppercase ? "uppercase font-mono" : ""
      }`}
    />
  </div>
);

export default CustomerRegistration;