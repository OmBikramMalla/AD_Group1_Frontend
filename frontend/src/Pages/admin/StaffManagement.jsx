import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Edit2,
  Trash2,
  Shield,
  Mail,
  Phone,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";

import api from "../../services/api";
import AdminSidebar from "../components/AdminSidebar";

function StaffManagement() {
  const [staffList, setStaffList] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "Staff",
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/admin/staff");
      setStaffList(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load staff members.");
    } finally {
      setLoading(false);
    }
  };

  const filteredStaff = useMemo(() => {
    const keyword = searchTerm.toLowerCase();

    return staffList.filter((staff) => {
      return (
        String(staff.id).includes(keyword) ||
        (staff.fullName || "").toLowerCase().includes(keyword) ||
        (staff.email || "").toLowerCase().includes(keyword) ||
        (staff.phoneNumber || "").toLowerCase().includes(keyword) ||
        (staff.role || "").toLowerCase().includes(keyword)
      );
    });
  }, [staffList, searchTerm]);

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role: "Staff",
    });
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setSuccess("");
    setError("");
    setShowModal(true);
  };

  const openEditModal = (staff) => {
    setEditingId(staff.id);
    setFormData({
      fullName: staff.fullName || "",
      email: staff.email || "",
      phone: staff.phoneNumber || "",
      password: "",
      role: "Staff",
    });
    setSuccess("");
    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required.");
      return false;
    }

    if (!formData.email.trim() && !editingId) {
      setError("Email is required.");
      return false;
    }

    if (!editingId && !formData.password.trim()) {
      setError("Password is required for new staff.");
      return false;
    }

    if (!editingId && formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingId) {
        const payload = {
          fullName: formData.fullName.trim(),
          phone: formData.phone,
          role: "Staff",
        };

        const res = await api.put(`/admin/staff/${editingId}`, payload);
        setSuccess(res.data?.message || "Staff member updated successfully.");
      } else {
        const payload = {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone,
          password: formData.password,
          role: "Staff",
        };

        const res = await api.post("/admin/staff", payload);
        setSuccess(res.data?.message || "Staff member registered successfully.");
      }

      closeModal();
      await fetchStaff();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save staff member.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff member?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setSuccess("");

      const res = await api.delete(`/admin/staff/${id}`);
      setSuccess(res.data?.message || "Staff member deleted successfully.");

      await fetchStaff();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete staff member.");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <AdminSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Staff Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Register, update, and manage staff accounts.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
          >
            <UserPlus size={18} /> Add New Staff
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {success && (
              <AlertBox type="success" icon={<Check size={20} />}>
                {success}
              </AlertBox>
            )}

            {error && (
              <AlertBox type="error" icon={<AlertCircle size={20} />}>
                {error}
              </AlertBox>
            )}

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Search staff by name, email, phone, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center text-slate-500">
                <Loader2 size={32} className="animate-spin mx-auto mb-3" />
                Loading staff members...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStaff.map((staff) => (
                  <StaffCard
                    key={staff.id}
                    staff={staff}
                    onEdit={() => openEditModal(staff)}
                    onDelete={() => handleDelete(staff.id)}
                  />
                ))}

                {filteredStaff.length === 0 && (
                  <div className="lg:col-span-3 bg-white rounded-2xl p-10 border border-slate-200 text-center text-slate-500">
                    No staff members found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <StaffModal
          editingId={editingId}
          formData={formData}
          saving={saving}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

const StaffCard = ({ staff, onEdit, onDelete }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:shadow-md transition-all">
    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={onEdit}
        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition"
      >
        <Edit2 size={16} />
      </button>

      <button
        onClick={onDelete}
        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"
      >
        <Trash2 size={16} />
      </button>
    </div>

    <div className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xl font-bold border border-indigo-200">
        {(staff.fullName || "S").charAt(0)}
      </div>

      <div>
        <h3 className="font-bold text-slate-900 text-lg">
          {staff.fullName}
        </h3>

        <p className="text-sm text-slate-500">
          ID: {staff.id}
        </p>
      </div>
    </div>

    <div className="space-y-3 mb-6">
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <Shield size={16} className="text-slate-400" />
        <span className="font-medium px-2.5 py-0.5 bg-slate-100 rounded-md">
          {staff.role || "Staff"}
        </span>
      </div>

      <div className="flex items-center gap-3 text-sm text-slate-600">
        <Mail size={16} className="text-slate-400" />
        {staff.email}
      </div>

      <div className="flex items-center gap-3 text-sm text-slate-600">
        <Phone size={16} className="text-slate-400" />
        {staff.phoneNumber || "N/A"}
      </div>
    </div>

    <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
      <span className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 bg-emerald-100 text-emerald-700">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        Active
      </span>
    </div>
  </div>
);

const StaffModal = ({
  editingId,
  formData,
  saving,
  onChange,
  onSubmit,
  onClose,
}) => (
  <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900">
          {editingId ? "Update Staff" : "Register New Staff"}
        </h3>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-4">
        <ModalInput
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
        />

        {!editingId && (
          <ModalInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
        )}

        <ModalInput
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
        />

        {!editingId && (
          <ModalInput
            label="Temporary Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
          />
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">
            Role
          </label>

          <input
            type="text"
            value="Staff"
            disabled
            className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500"
          />
        </div>

        <div className="pt-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {editingId ? "Update Staff" : "Register Staff"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

const ModalInput = ({ label, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-slate-700">
      {label}
    </label>

    <input
      {...props}
      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  </div>
);

const AlertBox = ({ type, icon, children }) => {
  const styles =
    type === "success"
      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
      : "bg-red-50 border-red-200 text-red-700";

  return (
    <div
      className={`border px-5 py-3 rounded-xl flex gap-3 items-center ${styles}`}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
};

export default StaffManagement;