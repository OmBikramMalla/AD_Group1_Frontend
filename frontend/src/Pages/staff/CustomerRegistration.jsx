import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../services/api";
import {
  UserPlus, Car, User, Phone, Mail,
  MapPin, CheckCircle, LayoutDashboard, Search, Settings
} from "lucide-react";

function CustomerRegistration() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    licensePlate: "",
    vin: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Final Submit
      setIsSubmitting(true);
      setError(null);
      try {
        const payload = {
          fullName: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          email: formData.email,
          vehicleNumber: formData.licensePlate,
          vehicleModel: formData.vehicleModel,
          vehicleBrand: formData.vehicleMake
        };

        await api.post('/customers/register', payload);

        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setStep(1);
          setFormData({
            firstName: "", lastName: "", email: "", phone: "", address: "",
            vehicleMake: "", vehicleModel: "", vehicleYear: "", licensePlate: "", vin: ""
          });
        }, 3000);
      } catch (err) {
        setError(err.response?.data || "An error occurred during registration.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">

      {/* Staff Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-800 text-slate-300 shadow-xl z-10">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white tracking-tight">AutoLogistics</h1>
          <p className="text-sm text-indigo-400 mt-1">Staff Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/staff/customers" icon={<Search size={20} />} label="Customer Search" active={location.pathname === '/staff/customers'} />
          <NavItem to="/staff/register" icon={<UserPlus size={20} />} label="Register Customer" active={location.pathname === '/staff/register'} />
          <NavItem to="/staff/sales" icon={<LayoutDashboard size={20} />} label="Sales & Invoices" active={location.pathname === '/staff/sales'} />
          <NavItem to="/staff/reports" icon={<Settings size={20} />} label="Customer Reports" active={location.pathname === '/staff/reports'} />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">

        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Walk-in Registration</h2>
            <p className="text-sm text-slate-500 mt-1">Register new customers and their vehicles</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-bold text-sm">
            Step {step} of 2
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-3xl mx-auto">

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm animate-in fade-in zoom-in duration-300">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                  !
                </div>
                <div>
                  <p className="font-bold">Registration Failed</p>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            )}

            {isSuccess && (
              <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm animate-in fade-in zoom-in duration-300">
                <CheckCircle className="text-emerald-500" size={28} />
                <div>
                  <p className="font-bold text-lg">Customer Registered Successfully!</p>
                  <p className="text-sm text-emerald-600 mt-0.5">Profile and vehicle have been saved to the database.</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-100 absolute top-0 left-0">
                <div
                  className="h-full bg-indigo-600 transition-all duration-500"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                ></div>
              </div>

              <div className="p-8 sm:p-10">
                <form onSubmit={handleSubmit}>

                  {step === 1 ? (
                    <div className="space-y-8 animate-in slide-in-from-left-4 duration-300">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                          <User size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Personal Information</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">First Name</label>
                          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Last Name</label>
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Mail size={16} className="text-slate-400" /> Email Address</label>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Phone size={16} className="text-slate-400" /> Phone Number</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                        </div>
                        <div className="sm:col-span-2 space-y-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><MapPin size={16} className="text-slate-400" /> Home Address</label>
                          <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                        </div>
                      </div>

                      <div className="pt-6 flex justify-end">
                        <button type="submit" className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20 flex items-center gap-2">
                          Continue to Vehicle Details &rarr;
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                          <Car size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Vehicle Details</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Make (Brand)</label>
                          <input type="text" name="vehicleMake" value={formData.vehicleMake} onChange={handleInputChange} required placeholder="e.g. Toyota" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Model</label>
                          <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleInputChange} required placeholder="e.g. Camry" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Manufacturing Year</label>
                          <input type="number" name="vehicleYear" value={formData.vehicleYear} onChange={handleInputChange} required placeholder="2022" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">License Plate</label>
                          <input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleInputChange} required placeholder="ABC-1234" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition uppercase font-mono" />
                        </div>
                        <div className="sm:col-span-2 space-y-2">
                          <label className="text-sm font-bold text-slate-700">VIN (Vehicle Identification Number)</label>
                          <input type="text" name="vin" value={formData.vin} onChange={handleInputChange} required placeholder="17-character VIN" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition uppercase font-mono" />
                        </div>
                      </div>

                      <div className="pt-6 flex justify-between gap-4">
                        <button type="button" onClick={() => setStep(1)} disabled={isSubmitting} className="px-6 py-3.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition disabled:opacity-50">
                          &larr; Back
                        </button>
                        <button type="submit" disabled={isSubmitting} className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-50">
                          {isSubmitting ? "Processing..." : (
                            <>
                              <CheckCircle size={18} /> Complete Registration
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

const NavItem = ({ icon, label, active, to }) => (
  <Link to={to || "#"} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${active
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
      : "text-slate-400 hover:bg-slate-700 hover:text-white"
    }`}>
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export default CustomerRegistration;
