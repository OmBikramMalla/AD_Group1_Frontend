import React, { useState, useEffect } from "react";
import {
  User, Mail, Phone, Edit3, Car, Plus,
  Shield, Check, Loader2
} from "lucide-react";
import api from "../../services/api";

function CustomerProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveMsg, setSaveMsg] = useState(null);

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [vehicles, setVehicles] = useState([]);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    vehicleNumber: "",
    vehicleModel: "",
    vehicleBrand: "",
  });
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.get("/customer-profile/me");

      setProfileData({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
      });

      setEditData({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
      });

      setVehicles(data.vehicles || []);
    } catch {
      setError("Failed to load profile. Please login again or refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveMsg(null);

    try {
      const { data } = await api.put("/customer-profile/me", editData);

      const updated = data.profile;

      setProfileData({
        fullName: updated.fullName,
        email: updated.email,
        phone: updated.phone,
      });

      setEditData({
        fullName: updated.fullName,
        email: updated.email,
        phone: updated.phone,
      });

      setIsEditing(false);
      setSaveMsg("Profile updated successfully.");
    } catch {
      setSaveMsg("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setIsAddingVehicle(true);

    try {
      const { data } = await api.post("/customer-profile/vehicles", newVehicle);

      setVehicles((prev) => [...prev, data.vehicle]);

      setNewVehicle({
        vehicleNumber: "",
        vehicleModel: "",
        vehicleBrand: "",
      });

      setShowAddVehicleModal(false);
    } catch {
      alert("Failed to add vehicle.");
    } finally {
      setIsAddingVehicle(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <Loader2 size={40} className="animate-spin text-slate-700" />
          <p className="font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="bg-white rounded-2xl shadow p-10 text-center max-w-md">
          <p className="text-red-500 font-semibold text-lg mb-4">{error}</p>
          <button
            onClick={fetchProfile}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{profileData.fullName}</p>
            <p className="text-xs text-gray-500">{profileData.email}</p>
          </div>

          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-800 font-bold text-lg">
            {profileData.fullName?.charAt(0) || "?"}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          {saveMsg && (
            <div
              className={`mb-6 px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                saveMsg.includes("success")
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              <Check size={16} /> {saveMsg}
            </div>
          )}

          <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-xl mb-8 w-max">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === "profile"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Personal Details
            </button>

            <button
              onClick={() => setActiveTab("vehicles")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === "vehicles"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              My Vehicles
              <span className="bg-slate-200 text-slate-800 py-0.5 px-2 rounded-full text-xs">
                {vehicles.length}
              </span>
            </button>
          </div>

          {activeTab === "profile" && (
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <User className="text-slate-700" size={24} />
                    Account Information
                  </h3>

                  {!isEditing ? (
                    <button
                      onClick={() => {
                        setEditData({ ...profileData });
                        setIsEditing(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-800 rounded-lg font-medium hover:bg-slate-200 transition"
                    >
                      <Edit3 size={16} /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
                      >
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                        {isSaving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Field
                      label="Full Name"
                      icon={<User size={18} className="text-gray-400" />}
                      editing={isEditing}
                      value={editData.fullName}
                      onChange={(v) => setEditData((p) => ({ ...p, fullName: v }))}
                      display={profileData.fullName}
                    />

                    <Field
                      label="Email Address"
                      icon={<Mail size={18} className="text-gray-400" />}
                      editing={isEditing}
                      value={editData.email}
                      type="email"
                      onChange={(v) => setEditData((p) => ({ ...p, email: v }))}
                      display={profileData.email}
                    />
                  </div>

                  <div className="space-y-6">
                    <Field
                      label="Phone Number"
                      icon={<Phone size={18} className="text-gray-400" />}
                      editing={isEditing}
                      value={editData.phone}
                      type="tel"
                      onChange={(v) => setEditData((p) => ({ ...p, phone: v }))}
                      display={profileData.phone}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="text-slate-700" size={20} />
                  Security
                </h3>
                <p className="text-sm text-gray-500">
                  Your account is protected using JWT-based authentication and role-based access.
                </p>
              </div>
            </div>
          )}

          {activeTab === "vehicles" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Registered Vehicles</h3>

                <button
                  onClick={() => setShowAddVehicleModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
                >
                  <Plus size={18} /> Add Vehicle
                </button>
              </div>

              {vehicles.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-dashed border-gray-300 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Car size={40} className="text-gray-300" />
                  </div>

                  <h4 className="text-xl font-bold text-gray-800">No Vehicles Yet</h4>
                  <p className="text-gray-500 mt-2 mb-6 max-w-md">
                    Add your vehicles to book services and track maintenance history.
                  </p>

                  <button
                    onClick={() => setShowAddVehicleModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
                  >
                    <Plus size={18} /> Register Your First Vehicle
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-700">
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

      {showAddVehicleModal && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Car className="text-slate-700" size={20} /> Add New Vehicle
              </h3>

              <button
                onClick={() => setShowAddVehicleModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Brand</label>
                <input
                  type="text"
                  value={newVehicle.vehicleBrand}
                  onChange={(e) =>
                    setNewVehicle((p) => ({ ...p, vehicleBrand: e.target.value }))
                  }
                  placeholder="e.g. Toyota"
                  required
                  className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Model</label>
                <input
                  type="text"
                  value={newVehicle.vehicleModel}
                  onChange={(e) =>
                    setNewVehicle((p) => ({ ...p, vehicleModel: e.target.value }))
                  }
                  placeholder="e.g. Corolla"
                  required
                  className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Vehicle Number</label>
                <input
                  type="text"
                  value={newVehicle.vehicleNumber}
                  onChange={(e) =>
                    setNewVehicle((p) => ({
                      ...p,
                      vehicleNumber: e.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="BA-20-PA-1234"
                  required
                  className="w-full mt-1 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-700 outline-none uppercase"
                />
              </div>

              <div className="pt-4 flex gap-3 justify-end border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isAddingVehicle}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition disabled:opacity-50"
                >
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

const Field = ({ label, icon, editing, value, onChange, display, type = "text" }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>

    <div className="flex items-center gap-3 mt-1">
      {icon}

      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-700 outline-none"
        />
      ) : (
        <p className="font-medium text-gray-800">
          {display || <span className="text-gray-400 italic">Not provided</span>}
        </p>
      )}
    </div>
  </div>
);

export default CustomerProfile;