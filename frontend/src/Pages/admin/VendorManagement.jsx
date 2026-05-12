import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  Plus,
  Search,
  Edit2,
  Trash2,
  Phone,
  Mail,
  MapPin,
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Bell,
  User,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import api from "../../services/api";
import AdminSidebar from "../components/AdminSidebar";

const emptyForm = {
  vendorName: "",
  contactPerson: "",
  email: "",
  phone: "",
  address: "",
};

function VendorManagement() {
  const location = useLocation();

  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/vendors");
      setVendors(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load vendors.");
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = useMemo(() => {
    const keyword = searchTerm.toLowerCase();

    return vendors.filter((v) => {
      return (
        String(v.id).includes(keyword) ||
        (v.vendorName || "").toLowerCase().includes(keyword) ||
        (v.contactPerson || "").toLowerCase().includes(keyword) ||
        (v.email || "").toLowerCase().includes(keyword) ||
        (v.phone || "").toLowerCase().includes(keyword)
      );
    });
  }, [vendors, searchTerm]);

  const openAddModal = () => {
    setEditingVendor(null);
    setFormData(emptyForm);
    setShowModal(true);
    setSuccess("");
    setError("");
  };

  const openEditModal = (vendor) => {
    setEditingVendor(vendor);
    setFormData({
      vendorName: vendor.vendorName || "",
      contactPerson: vendor.contactPerson || "",
      email: vendor.email || "",
      phone: vendor.phone || "",
      address: vendor.address || "",
    });
    setShowModal(true);
    setSuccess("");
    setError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingVendor(null);
    setFormData(emptyForm);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingVendor) {
        const res = await api.put(`/vendors/${editingVendor.id}`, formData);

        setVendors((prev) =>
          prev.map((v) => (v.id === editingVendor.id ? res.data.vendor : v))
        );

        setSuccess("Vendor updated successfully.");
      } else {
        const res = await api.post("/vendors", formData);
        setVendors((prev) => [...prev, res.data.vendor]);
        setSuccess("Vendor created successfully.");
      }

      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save vendor.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setSuccess("");

      await api.delete(`/vendors/${id}`);

      setVendors((prev) => prev.filter((v) => v.id !== id));
      setSuccess("Vendor deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete vendor.");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <AdminSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Vendor Management
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage suppliers and contact details
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
          >
            <Plus size={18} /> Add New Vendor
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <CheckCircle size={20} />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search vendors by company, contact, email, phone, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={fetchVendors}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="bg-white rounded-2xl p-10 text-center text-slate-500 border border-slate-200">
                <Loader2 className="animate-spin mx-auto mb-3" size={32} />
                Loading vendors...
              </div>
            ) : filteredVendors.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center text-slate-500 border border-slate-200">
                <Building2 size={42} className="mx-auto mb-3 text-slate-300" />
                No vendors found.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:border-indigo-200 transition-all flex flex-col sm:flex-row gap-6"
                  >
                    <div className="absolute top-4 right-4 flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(vendor)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(vendor.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-500">
                      <Building2 size={28} />
                    </div>

                    <div className="flex-1">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 pr-16">
                          {vendor.vendorName}
                        </h3>
                        <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mt-1 inline-block">
                          VND-{vendor.id}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2">
                        <InfoRow
                          icon={<User size={14} />}
                          label="Contact"
                          value={vendor.contactPerson}
                        />

                        <InfoRow
                          icon={<Mail size={14} />}
                          label="Email"
                          value={
                            <a
                              href={`mailto:${vendor.email}`}
                              className="hover:text-indigo-600"
                            >
                              {vendor.email}
                            </a>
                          }
                        />

                        <InfoRow
                          icon={<Phone size={14} />}
                          label="Phone"
                          value={vendor.phone}
                        />

                        <InfoRow
                          icon={<MapPin size={14} />}
                          label="Address"
                          value={vendor.address}
                          alignTop
                        />
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 text-sm text-slate-500">
                        Used when creating purchase invoices and stock updates.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="text-indigo-600" size={20} />
                {editingVendor ? "Edit Vendor" : "Add New Vendor"}
              </h3>

              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input
                label="Vendor / Company Name"
                name="vendorName"
                value={formData.vendorName}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="2"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex gap-3 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 size={18} className="animate-spin" />}
                  {saving
                    ? "Saving..."
                    : editingVendor
                    ? "Update Vendor"
                    : "Save Vendor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
}

function InfoRow({ icon, label, value, alignTop = false }) {
  return (
    <div
      className={`flex ${
        alignTop ? "items-start" : "items-center"
      } gap-3 text-sm text-slate-600`}
    >
      <div className="w-6 flex justify-center text-slate-400 mt-0.5">
        {icon}
      </div>
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

const NavItem = ({ icon, label, active, to }) => (
  <Link
    to={to || "#"}
    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
      active
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  </Link>
);

export default VendorManagement;