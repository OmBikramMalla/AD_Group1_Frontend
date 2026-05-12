import React, { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Check,
  Truck,
  Calendar,
  DollarSign,
  AlertCircle,
  Loader2,
  Trash2,
} from "lucide-react";

import api from "../../services/api";
import AdminSidebar from "../components/AdminSidebar";

function PurchaseInvoice() {
  const [vendors, setVendors] = useState([]);
  const [parts, setParts] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [formData, setFormData] = useState({
    invoiceNumber: `PINV-${Math.floor(1000 + Math.random() * 9000)}`,
    vendorId: "",
    purchaseDate: new Date().toISOString().split("T")[0],
  });

  const [items, setItems] = useState([
    { partId: "", quantity: "", unitPrice: "" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [vendorsRes, partsRes, invoicesRes] = await Promise.all([
        api.get("/vendors"),
        api.get("/parts"),
        api.get("/purchase-invoices"),
      ]);

      setVendors(vendorsRes.data || []);
      setParts(partsRes.data || []);
      setInvoices(invoicesRes.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load purchase invoice data."
      );
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + Number(item.quantity || 0) * Number(item.unitPrice || 0);
    }, 0);
  }, [items]);

  const filteredInvoices = invoices.filter((invoice) => {
    const keyword = searchTerm.toLowerCase();

    return (
      String(invoice.id).includes(keyword) ||
      (invoice.invoiceNumber || "").toLowerCase().includes(keyword) ||
      (invoice.vendorName || "").toLowerCase().includes(keyword)
    );
  });

  const handleMainChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addItemRow = () => {
    setItems((prev) => [...prev, { partId: "", quantity: "", unitPrice: "" }]);
  };

  const removeItemRow = (index) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      invoiceNumber: `PINV-${Math.floor(1000 + Math.random() * 9000)}`,
      vendorId: "",
      purchaseDate: new Date().toISOString().split("T")[0],
    });

    setItems([{ partId: "", quantity: "", unitPrice: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.vendorId) {
      setError("Please select vendor.");
      return;
    }

    const validItems = items.map((item) => ({
      partId: Number(item.partId),
      quantity: Number(item.quantity),
      unitCost: Number(item.unitPrice),
    }));

    if (
      validItems.some(
        (item) => !item.partId || item.quantity <= 0 || item.unitCost <= 0
      )
    ) {
      setError("Please enter valid part, quantity, and unit price.");
      return;
    }

    const payload = {
      invoiceNumber: formData.invoiceNumber,
      vendorId: Number(formData.vendorId),
      purchaseDate: new Date(formData.purchaseDate).toISOString(),
      items: validItems,
    };

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const res = await api.post("/purchase-invoices", payload);

      setSuccess(
        res.data.message ||
          "Purchase invoice created successfully. Stock updated."
      );

      resetForm();
      await fetchData();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create purchase invoice."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <AdminSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Purchase Invoices
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Record vendor supplies and update stock automatically.
            </p>
          </div>

          <div className="text-sm text-slate-500 font-medium px-4 py-2 bg-slate-100 rounded-lg">
            Record Stock Intake
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
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

            {loading ? (
              <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center text-slate-500">
                <Loader2 size={32} className="animate-spin mx-auto mb-3" />
                Loading purchase invoices...
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
                      <FileText className="text-indigo-500" size={20} />
                      New Purchase Invoice
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <InputField
                        label="Invoice Number"
                        icon={<FileText size={14} />}
                        type="text"
                        name="invoiceNumber"
                        value={formData.invoiceNumber}
                        onChange={handleMainChange}
                        classNameExtra="font-mono"
                      />

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                          <Truck size={14} /> Select Vendor
                        </label>

                        <select
                          name="vendorId"
                          value={formData.vendorId}
                          onChange={handleMainChange}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        >
                          <option value="">-- Choose Vendor --</option>
                          {vendors.map((vendor) => (
                            <option key={vendor.id} value={vendor.id}>
                              {vendor.vendorName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <InputField
                        label="Date Received"
                        icon={<Calendar size={14} />}
                        type="date"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleMainChange}
                      />

                      <div className="pt-4 border-t border-slate-100 mt-4 space-y-4">
                        {items.map((item, index) => (
                          <div
                            key={index}
                            className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-3"
                          >
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-bold text-slate-700">
                                Item #{index + 1}
                              </p>

                              {items.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeItemRow(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-sm font-semibold text-slate-700">
                                Select Part
                              </label>

                              <select
                                value={item.partId}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "partId",
                                    e.target.value
                                  )
                                }
                                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                              >
                                <option value="">-- Choose Part --</option>
                                {parts.map((part) => (
                                  <option key={part.id} value={part.id}>
                                    {part.partName} | Stock:{" "}
                                    {part.stockQuantity}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <InputField
                                label="Quantity"
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                                classNameExtra="font-mono bg-white"
                              />

                              <InputField
                                label="Unit Price"
                                icon={<DollarSign size={14} />}
                                type="number"
                                step="0.01"
                                min="0"
                                value={item.unitPrice}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "unitPrice",
                                    e.target.value
                                  )
                                }
                                classNameExtra="font-mono bg-white"
                              />
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={addItemRow}
                          className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition flex justify-center items-center gap-2"
                        >
                          <Plus size={16} /> Add Another Item
                        </button>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-6 flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-600">
                          Total Amount:
                        </span>

                        <span className="text-lg font-bold text-slate-900 font-mono">
                          Rs. {totalAmount.toFixed(2)}
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={saving}
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20 mt-4 flex justify-center items-center gap-2 disabled:opacity-60"
                      >
                        {saving ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Plus size={18} />
                        )}
                        {saving ? "Recording..." : "Record Purchase"}
                      </button>
                    </form>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-slate-800">
                        Purchase History
                      </h3>

                      <div className="relative">
                        <Search
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          size={16}
                        />

                        <input
                          type="text"
                          placeholder="Search invoices..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50 sticky top-0">
                          <tr>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead align="text-center">Qty</TableHead>
                            <TableHead align="text-right">
                              Total Amount
                            </TableHead>
                            <TableHead align="text-center">Status</TableHead>
                          </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-slate-100">
                          {filteredInvoices.map((inv) => (
                            <tr
                              key={inv.id}
                              className="hover:bg-slate-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-mono text-sm font-bold text-indigo-600">
                                  {inv.invoiceNumber}
                                </div>

                                <div className="text-xs text-slate-500 mt-0.5">
                                  {inv.purchaseDate
                                    ? new Date(
                                        inv.purchaseDate
                                      ).toLocaleDateString()
                                    : "-"}
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                {inv.vendorName}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-500">
                                {inv.itemCount}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-sm font-bold text-slate-900">
                                Rs. {Number(inv.totalAmount || 0).toFixed(2)}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className="px-2.5 py-1 inline-flex text-xs font-bold rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                                  Received
                                </span>
                              </td>
                            </tr>
                          ))}

                          {filteredInvoices.length === 0 && (
                            <tr>
                              <td
                                colSpan="5"
                                className="px-6 py-10 text-center text-slate-500"
                              >
                                No purchase invoices found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const AlertBox = ({ type, icon, children }) => {
  const styles =
    type === "success"
      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
      : "bg-red-50 border-red-200 text-red-700";

  return (
    <div className={`mb-5 border px-5 py-3 rounded-xl flex gap-3 items-center ${styles}`}>
      {icon}
      <span>{children}</span>
    </div>
  );
};

const InputField = ({ label, icon, classNameExtra = "", ...props }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
      {icon} {label}
    </label>

    <input
      {...props}
      className={`w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm ${classNameExtra}`}
    />
  </div>
);

const TableHead = ({ children, align = "text-left" }) => (
  <th className={`px-6 py-3 ${align} text-xs font-bold text-slate-500 uppercase`}>
    {children}
  </th>
);

export default PurchaseInvoice;