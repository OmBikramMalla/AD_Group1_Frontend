import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  User, Mail, Phone, MapPin, Edit3,
  Car, Plus, Settings, History, Calendar, LayoutDashboard,
  Shield, Check, Trash2, Camera, Loader2
} from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function CustomerProfile() {
  const location = useLocation();
  const { user, getEmail } = useAuth();                   // decoded JWT
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveMsg, setSaveMsg] = useState(null);

  const [customerId, setCustomerId] = useState(null);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [editData, setEditData] = useState({ ...profileData });

  const [vehicles, setVehicles] = useState([]);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ vehicleNumber: "", vehicleModel: "", vehicleBrand: "" });
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);

  // ── Fetch customer data from API ──────────────────────────────────────────
  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const email = getEmail();

        if (!email) { setError("Unable to identify user."); return; }

        const { data: customer } = await api.get(`/customers/by-email?email=${encodeURIComponent(email)}`);
        setCustomerId(customer.id);
        setProfileData({ fullName: customer.fullName, email: customer.email, phone: customer.phone });
        setEditData({ fullName: customer.fullName, email: customer.email, phone: customer.phone });

        const { data: vehicleList } = await api.get(`/customers/${customer.id}/vehicles`);
        setVehicles(vehicleList);
      } catch (err) {
        setError("Failed to load profile. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomer();
  }, [user]);

  // ── Profile Save ──────────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveMsg(null);
    try {
      const { data } = await api.put(`/customers/${customerId}`, editData);
      setProfileData({ fullName: data.fullName, email: data.email, phone: data.phone });
      setIsEditing(false);
      setSaveMsg("Profile updated successfully!");
      setTimeout(() => setSaveMsg(null), 3000);
    } catch {
      setSaveMsg("Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Add Vehicle ───────────────────────────────────────────────────────────
  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setIsAddingVehicle(true);
    try {
      const { data } = await api.post(`/customers/${customerId}/vehicles`, newVehicle);
      setVehicles(prev => [...prev, data]);
      setShowAddVehicleModal(false);
      setNewVehicle({ vehicleNumber: "", vehicleModel: "", vehicleBrand: "" });
    } catch {
      alert("Failed to add vehicle.");
    } finally {
      setIsAddingVehicle(false);
    }
  };

  // ── Delete Vehicle ────────────────────────────────────────────────────────
  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm("Remove this vehicle?")) return;
    try {
      await api.delete(`/customers/vehicles/${vehicleId}`);
      setVehicles(prev => prev.filter(v => v.id !== vehicleId));
    } catch {
      alert("Failed to remove vehicle.");
    }
  };

  // ── Loading State ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 font-sans">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <Loader2 size={40} className="animate-spin text-indigo-500" />
          <p className="font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 font-sans">
        <div className="bg-white rounded-2xl shadow p-10 text-center max-w-md">
          <p className="text-red-500 font-semibold text-lg mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>

        <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{profileData.fullName}</p>
              <p className="text-xs text-gray-500">{profileData.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
              {profileData.fullName?.charAt(0) || "?"}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
          <div className="max-w-5xl mx-auto">

            {/* Save Message */}
            {saveMsg && (
              <div className={`mb-6 px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${saveMsg.includes("success") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                <Check size={16} /> {saveMsg}
              </div>
            )}

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-xl mb-8 w-max">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "profile" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                Personal Details
              </button>
              <button
                onClick={() => setActiveTab("vehicles")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === "vehicles" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                My Vehicles
                <span className="bg-indigo-100 text-indigo-700 py-0.5 px-2 rounded-full text-xs">{vehicles.length}</span>
              </button>
            </div>

            {/* ── Profile Tab ── */}
            {activeTab === "profile" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <User className="text-indigo-500" size={24} /> Account Information
                    </h3>
                    {!isEditing ? (
                      <button onClick={() => { setEditData({ ...profileData }); setIsEditing(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition">
                        <Edit3 size={16} /> Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <button onClick={() => setIsEditing(false)} disabled={isSaving}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50">
                          Cancel
                        </button>
                        <button onClick={handleSaveProfile} disabled={isSaving}
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50">
                          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                          {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <Field label="Full Name" icon={<User size={18} className="text-gray-400" />}
                        editing={isEditing} value={editData.fullName}
                        onChange={v => setEditData(p => ({ ...p, fullName: v }))}
                        display={profileData.fullName} />
                      <Field label="Email Address" icon={<Mail size={18} className="text-gray-400" />}
                        editing={isEditing} value={editData.email} type="email"
                        onChange={v => setEditData(p => ({ ...p, email: v }))}
                        display={profileData.email} />
                    </div>
                    <div className="space-y-6">
                      <Field label="Phone Number" icon={<Phone size={18} className="text-gray-400" />}
                        editing={isEditing} value={editData.phone} type="tel"
                        onChange={v => setEditData(p => ({ ...p, phone: v }))}
                        display={profileData.phone} />
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Shield className="text-indigo-500" size={20} /> Security & Privacy
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition">
                      Change Password
                    </button>
                    <button className="flex-1 px-4 py-3 border border-red-100 text-red-600 rounded-xl font-medium hover:bg-red-50 transition">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Vehicles Tab ── */}
            {activeTab === "vehicles" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Registered Vehicles</h3>
                  <button
                    onClick={() => setShowAddVehicleModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/30">
                    <Plus size={18} /> Add Vehicle
                  </button>
                </div>

                {vehicles.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 border border-dashed border-gray-300 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Car size={40} className="text-gray-300" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">No Vehicles Yet</h4>
                    <p className="text-gray-500 mt-2 mb-6 max-w-md">Add your vehicles to easily book services and track maintenance history.</p>
                    <button onClick={() => setShowAddVehicleModal(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-md">
                      <Plus size={18} /> Register Your First Vehicle
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {vehicles.map(vehicle => (
                      <div key={vehicle.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative group hover:border-indigo-200 transition-all">
                        <button
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                          title="Remove Vehicle">
                          <Trash2 size={18} />
                        </button>

                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-indigo-600">
                            <Car size={32} />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">
                              {vehicle.vehicleBrand} {vehicle.vehicleModel}
                            </h4>
                            <span className="mt-2 inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-md tracking-wider border border-gray-200">
                              {vehicle.vehicleNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>


      {/* Add Vehicle Modal */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Car className="text-indigo-500" size={20} /> Add New Vehicle
              </h3>
              <button onClick={() => setShowAddVehicleModal(false)} className="text-gray-400 hover:text-gray-600 p-1">✕</button>
            </div>

            <form onSubmit={handleAddVehicle} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Brand / Make</label>
                <input type="text" value={newVehicle.vehicleBrand}
                  onChange={e => setNewVehicle(p => ({ ...p, vehicleBrand: e.target.value }))}
                  placeholder="e.g. Toyota" required
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Model</label>
                <input type="text" value={newVehicle.vehicleModel}
                  onChange={e => setNewVehicle(p => ({ ...p, vehicleModel: e.target.value }))}
                  placeholder="e.g. Camry" required
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">License Plate <span className="text-red-500">*</span></label>
                <input type="text" value={newVehicle.vehicleNumber}
                  onChange={e => setNewVehicle(p => ({ ...p, vehicleNumber: e.target.value.toUpperCase() }))}
                  placeholder="ABC-1234" required
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none uppercase font-mono tracking-wider" />
              </div>

              <div className="pt-4 flex gap-3 justify-end border-t border-gray-100">
                <button type="button" onClick={() => setShowAddVehicleModal(false)}
                  className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={isAddingVehicle}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20 disabled:opacity-50">
                  {isAddingVehicle ? "Adding..." : "Save Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}

// Reusable profile field
const Field = ({ label, icon, editing, value, onChange, display, type = "text" }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <div className="flex items-center gap-3">
      {icon}
      {editing ? (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
      ) : (
        <p className="font-medium text-gray-800">{display || <span className="text-gray-400 italic">Not provided</span>}</p>
      )}
    </div>
  </div>
);



export default CustomerProfile;
