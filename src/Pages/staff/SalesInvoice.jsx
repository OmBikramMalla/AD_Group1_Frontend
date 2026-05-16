import React, { useEffect, useMemo, useState } from "react";
import {
  ShoppingCart,
  Search,
  Plus,
  Trash2,
  CreditCard,
  Tag,
  CheckCircle,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import StaffSidebar from "../components/StaffSideBar";
import api from "../../services/api";

function SalesInvoice() {
  const [parts, setParts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cart, setCart] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError("");

      const [partsRes, customersRes] = await Promise.all([
        api.get("/parts"),
        api.get("/staff/customers"),
      ]);

      setParts(partsRes.data || []);
      setCustomers(customersRes.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const isLoyaltyEligible = subtotal > 5000;
  const discountAmount = isLoyaltyEligible ? subtotal * 0.1 : 0;
  const finalTotal = subtotal - discountAmount;
  const dueAmount = finalTotal - Number(paidAmount || 0);

  const filteredParts = parts.filter((part) => {
    const name = part.partName || "";
    const id = String(part.id || "");

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm)
    );
  });

  const addToCart = (part) => {
    const existing = cart.find((item) => item.id === part.id);

    if (existing) {
      if (existing.quantity >= part.stockQuantity) {
        setError("Not enough stock available.");
        return;
      }

      setCart(
        cart.map((item) =>
          item.id === part.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      if (part.stockQuantity <= 0) {
        setError("This part is out of stock.");
        return;
      }

      setCart([
        ...cart,
        {
          id: part.id,
          partName: part.partName,
          price: Number(part.price),
          stockQuantity: part.stockQuantity,
          quantity: 1,
        },
      ]);
    }

    setError("");
    setSuccess("");
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;

    const part = parts.find((p) => p.id === id);
    if (!part) return;

    if (newQty > part.stockQuantity) {
      setError("Quantity cannot be greater than available stock.");
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();

    if (!customerId) {
      setError("Please select a customer.");
      return;
    }

    if (cart.length === 0) {
      setError("Please add at least one part.");
      return;
    }

    if (Number(paidAmount || 0) < 0) {
      setError("Paid amount cannot be negative.");
      return;
    }

    if (Number(paidAmount || 0) > finalTotal) {
      setError("Paid amount cannot be greater than total amount.");
      return;
    }

    const payload = {
      customerId: Number(customerId),
      paidAmount: Number(paidAmount || 0),
      items: cart.map((item) => ({
        partId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      await api.post("/sales-invoices", payload);

      setSuccess("Sales invoice created successfully. Stock updated.");
      setCart([]);
      setCustomerId("");
      setPaidAmount("");

      await fetchInitialData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create invoice.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <StaffSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5">
          <h2 className="text-2xl font-bold text-slate-800">Sales Invoice</h2>
          <p className="text-sm text-slate-500 mt-1">
            Sell vehicle parts, create invoice, and update stock.
          </p>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <CheckCircle size={20} />
                <span>{success}</span>
              </div>
            )}

            {loading ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-500">
                Loading sales invoice data...
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
                    <Search className="text-slate-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search part by name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredParts.map((part) => (
                      <div
                        key={part.id}
                        className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-all"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                            ID: {part.id}
                          </span>
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-md ${
                              part.stockQuantity > 10
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-rose-50 text-rose-600"
                            }`}
                          >
                            {part.stockQuantity} in stock
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-800 text-lg">
                          {part.partName}
                        </h3>

                        <p className="font-mono text-xl text-slate-900 mt-2 font-bold">
                          Rs. {Number(part.price).toFixed(2)}
                        </p>

                        <button
                          onClick={() => addToCart(part)}
                          disabled={part.stockQuantity === 0}
                          className="mt-5 w-full py-2.5 bg-slate-50 text-indigo-600 font-bold rounded-xl border border-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus size={18} /> Add to Invoice
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={handleCreateInvoice}
                  className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col"
                >
                  <div className="p-6 border-b border-slate-100 bg-slate-50 rounded-t-2xl">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                      <UserPlus size={18} className="text-indigo-600" />
                      Customer
                    </h3>

                    <select
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm font-medium"
                    >
                      <option value="">Select customer</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.fullName} - {customer.phone}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[280px]">
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <ShoppingCart size={48} className="mb-4 text-slate-200" />
                        <p className="font-medium text-slate-500">
                          Invoice is empty
                        </p>
                        <p className="text-sm">Search parts and add to invoice</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-100"
                        >
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-800 text-sm">
                              {item.partName}
                            </h4>
                            <div className="font-mono text-indigo-600 text-sm font-bold mt-1">
                              Rs. {Number(item.price).toFixed(2)}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 bg-slate-50 hover:bg-slate-100 rounded font-bold"
                            >
                              -
                            </button>

                            <span className="w-6 text-center font-bold text-sm">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 bg-slate-50 hover:bg-slate-100 rounded font-bold"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-6 bg-slate-900 rounded-b-2xl text-slate-300">
                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span className="font-mono font-bold text-white">
                          Rs. {subtotal.toFixed(2)}
                        </span>
                      </div>

                      {isLoyaltyEligible && (
                        <div className="flex justify-between text-sm items-center bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                          <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                            <Tag size={14} /> Loyalty Discount 10%
                          </span>
                          <span className="font-mono font-bold text-emerald-400">
                            - Rs. {discountAmount.toFixed(2)}
                          </span>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-700 flex justify-between items-end">
                        <span className="text-sm font-medium">Final Total</span>
                        <span className="font-mono text-3xl font-bold text-white">
                          Rs. {finalTotal.toFixed(2)}
                        </span>
                      </div>

                      <div>
                        <label className="text-sm font-semibold block mb-2">
                          Paid Amount
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={paidAmount}
                          onChange={(e) => setPaidAmount(e.target.value)}
                          placeholder="Enter paid amount"
                          className="w-full p-3 rounded-xl bg-white text-slate-900 outline-none"
                        />
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Due Amount</span>
                        <span
                          className={`font-mono font-bold ${
                            dueAmount > 0 ? "text-amber-300" : "text-emerald-300"
                          }`}
                        >
                          Rs. {Math.max(dueAmount, 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting || cart.length === 0 || !customerId}
                      className="w-full py-4 bg-indigo-500 text-white font-bold text-lg rounded-xl flex justify-center items-center gap-2 hover:bg-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CreditCard size={22} />
                      {submitting ? "Creating..." : "Create Invoice"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SalesInvoice;