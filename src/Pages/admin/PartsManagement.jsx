import React, { useEffect, useMemo, useState } from "react";
import {
  Package,
  Plus,
  Search,
  Pencil,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

import api from "../../services/api";
import AdminSidebar from "../components/AdminSidebar";

function PartsManagement() {
  const [parts, setParts] = useState([]);
  const [formData, setFormData] = useState({
    partName: "",
    price: "",
    stockQuantity: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/parts");
      setParts(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load parts.");
    } finally {
      setLoading(false);
    }
  };

  const filteredParts = useMemo(() => {
    const keyword = searchTerm.toLowerCase();

    return parts.filter((part) => {
      return (
        String(part.id).includes(keyword) ||
        (part.partName || "").toLowerCase().includes(keyword)
      );
    });
  }, [parts, searchTerm]);

  const totalStock = useMemo(() => {
    return parts.reduce((sum, part) => sum + Number(part.stockQuantity || 0), 0);
  }, [parts]);

  const lowStockCount = useMemo(() => {
    return parts.filter((part) => Number(part.stockQuantity || 0) < 10).length;
  }, [parts]);

  const inventoryValue = useMemo(() => {
    return parts.reduce(
      (sum, part) =>
        sum + Number(part.price || 0) * Number(part.stockQuantity || 0),
      0
    );
  }, [parts]);

  const resetForm = () => {
    setFormData({
      partName: "",
      price: "",
      stockQuantity: "",
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.partName.trim()) {
      setError("Part name is required.");
      return false;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than zero.");
      return false;
    }

    if (Number(formData.stockQuantity) < 0) {
      setError("Stock quantity cannot be negative.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      partName: formData.partName.trim(),
      price: Number(formData.price),
      stockQuantity: Number(formData.stockQuantity),
    };

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingId) {
        const res = await api.put(`/parts/${editingId}`, payload);
        setSuccess(res.data?.message || "Part updated successfully.");
      } else {
        const res = await api.post("/parts", payload);
        setSuccess(res.data?.message || "Part created successfully.");
      }

      resetForm();
      await fetchParts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save part.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (part) => {
    setEditingId(part.id);
    setFormData({
      partName: part.partName || "",
      price: part.price ?? "",
      stockQuantity: part.stockQuantity ?? "",
    });
    setSuccess("");
    setError("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this part?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setSuccess("");

      const res = await api.delete(`/parts/${id}`);
      setSuccess(res.data?.message || "Part deleted successfully.");

      if (editingId === id) resetForm();

      await fetchParts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete part. This part may already be used in an invoice."
      );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <AdminSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Parts Inventory
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Add, edit, delete, and monitor vehicle parts stock.
            </p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {success && (
              <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <Check size={20} />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <SummaryCard title="Total Parts" value={parts.length} />
              <SummaryCard title="Total Stock" value={totalStock} />
              <SummaryCard
                title="Inventory Value"
                value={`Rs. ${inventoryValue.toFixed(2)}`}
              />
            </div>

            {lowStockCount > 0 && (
              <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <AlertCircle size={20} />
                <span>{lowStockCount} part(s) are below 10 units.</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
                    <Package className="text-indigo-500" size={20} />
                    {editingId ? "Edit Part" : "Add New Part"}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                      label="Part Name"
                      type="text"
                      name="partName"
                      value={formData.partName}
                      onChange={handleChange}
                      placeholder="e.g. Brake Pad"
                    />

                    <FormInput
                      label="Selling Price"
                      type="number"
                      step="0.01"
                      min="0"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. 1200"
                    />

                    <FormInput
                      label="Stock Quantity"
                      type="number"
                      min="0"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleChange}
                      placeholder="e.g. 25"
                    />

                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20 flex justify-center items-center gap-2 disabled:opacity-60"
                    >
                      {saving ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Plus size={18} />
                      )}
                      {saving
                        ? "Saving..."
                        : editingId
                        ? "Update Part"
                        : "Add Part"}
                    </button>

                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </form>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-lg font-bold text-slate-800">
                      Parts List
                    </h3>

                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={16}
                      />

                      <input
                        type="text"
                        placeholder="Search parts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {loading ? (
                    <div className="p-10 text-center text-slate-500">
                      <Loader2 size={32} className="animate-spin mx-auto mb-3" />
                      Loading parts...
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                          <tr>
                            <TableHead>ID</TableHead>
                            <TableHead>Part Name</TableHead>
                            <TableHead align="text-right">Price</TableHead>
                            <TableHead align="text-center">Stock</TableHead>
                            <TableHead align="text-center">Status</TableHead>
                            <TableHead align="text-right">Actions</TableHead>
                          </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-slate-100">
                          {filteredParts.map((part) => (
                            <tr key={part.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4 text-sm font-mono text-slate-500">
                                #{part.id}
                              </td>

                              <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                {part.partName}
                              </td>

                              <td className="px-6 py-4 text-sm text-right font-mono text-slate-700">
                                Rs. {Number(part.price || 0).toFixed(2)}
                              </td>

                              <td className="px-6 py-4 text-sm text-center font-bold text-slate-700">
                                {part.stockQuantity}
                              </td>

                              <td className="px-6 py-4 text-center">
                                {Number(part.stockQuantity || 0) < 10 ? (
                                  <span className="px-2.5 py-1 text-xs font-bold rounded-full border bg-amber-50 text-amber-700 border-amber-200">
                                    Low Stock
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-1 text-xs font-bold rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                                    Available
                                  </span>
                                )}
                              </td>

                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleEdit(part)}
                                    className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                                    title="Edit"
                                  >
                                    <Pencil size={16} />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleDelete(part.id)}
                                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                                    title="Delete"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}

                          {filteredParts.length === 0 && (
                            <tr>
                              <td
                                colSpan="6"
                                className="px-6 py-10 text-center text-slate-500"
                              >
                                No parts found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const FormInput = ({ label, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <input
      {...props}
      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
    />
  </div>
);

const TableHead = ({ children, align = "text-left" }) => (
  <th className={`px-6 py-3 ${align} text-xs font-bold text-slate-500 uppercase`}>
    {children}
  </th>
);

const SummaryCard = ({ title, value }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
    <p className="text-sm font-semibold text-slate-500">{title}</p>
    <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
  </div>
);

export default PartsManagement;