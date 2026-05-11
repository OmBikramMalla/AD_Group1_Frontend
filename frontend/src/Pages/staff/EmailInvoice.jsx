import React, { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Send,
  FileText,
  CheckCircle,
  AlertCircle,
  Search,
  RefreshCw,
} from "lucide-react";
import StaffSidebar from "../components/StaffSideBar";
import api from "../../services/api";

function EmailInvoice() {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError("");

      // Better endpoint: GET /api/sales-invoices
      // If you have not added it yet, temporarily change this to "/sales-invoices/recent"
      const res = await api.get("/sales-invoices");

      setInvoices(res.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load invoices. Check GET /api/sales-invoices endpoint."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const keyword = searchTerm.toLowerCase();

      return (
        String(invoice.id).includes(keyword) ||
        (invoice.customerName || "").toLowerCase().includes(keyword) ||
        (invoice.customerEmail || "").toLowerCase().includes(keyword) ||
        (invoice.status || "").toLowerCase().includes(keyword)
      );
    });
  }, [invoices, searchTerm]);

  const handleSendEmail = async (invoiceId) => {
    try {
      setSendingId(invoiceId);
      setError("");
      setSuccess("");

      await api.post(`/sales-invoices/${invoiceId}/send-email`);

      setSuccess(`Invoice #${invoiceId} email sent successfully.`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send invoice email.");
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <StaffSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Email Invoices
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              View created sales invoices and send them to customer emails.
            </p>
          </div>

          <button
            onClick={fetchInvoices}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
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

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Mail className="text-indigo-500" size={20} />
                    Invoice Email List
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Send invoice email from already-created invoices.
                  </p>
                </div>

                <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-3 w-full md:w-80">
                  <Search className="text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search invoice/customer/status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm text-slate-700"
                  />
                </div>
              </div>

              {loading ? (
                <div className="p-8 text-center text-slate-500">
                  Loading invoices...
                </div>
              ) : filteredInvoices.length === 0 ? (
                <div className="p-10 text-center text-slate-500">
                  <FileText size={42} className="mx-auto mb-3 text-slate-300" />
                  No invoices found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Invoice
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Customer
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Date
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Total
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Paid
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Due
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                          Status
                        </th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase text-right">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredInvoices.map((invoice) => {
                        const dueAmount =
                          invoice.dueAmount ??
                          Number(invoice.totalAmount || 0) -
                            Number(invoice.paidAmount || 0);

                        return (
                          <tr key={invoice.id} className="hover:bg-slate-50">
                            <td className="px-5 py-4">
                              <p className="font-bold text-slate-800">
                                #{invoice.id}
                              </p>
                            </td>

                            <td className="px-5 py-4">
                              <p className="font-semibold text-slate-800">
                                {invoice.customerName || "Unknown"}
                              </p>
                              <p className="text-xs text-slate-500">
                                {invoice.customerEmail || "No email"}
                              </p>
                            </td>

                            <td className="px-5 py-4 text-sm text-slate-600">
                              {invoice.invoiceDate
                                ? new Date(invoice.invoiceDate).toLocaleString()
                                : "-"}
                            </td>

                            <td className="px-5 py-4 font-mono font-bold text-slate-800">
                              Rs. {Number(invoice.totalAmount || 0).toFixed(2)}
                            </td>

                            <td className="px-5 py-4 font-mono font-bold text-emerald-600">
                              Rs. {Number(invoice.paidAmount || 0).toFixed(2)}
                            </td>

                            <td className="px-5 py-4 font-mono font-bold text-amber-600">
                              Rs. {Number(dueAmount || 0).toFixed(2)}
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className={`text-xs font-bold px-3 py-1 rounded-full ${
                                  dueAmount > 0
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                }`}
                              >
                                {dueAmount > 0 ? "Unpaid" : "Completed"}
                              </span>
                            </td>

                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() => handleSendEmail(invoice.id)}
                                disabled={
                                  sendingId === invoice.id ||
                                  !invoice.customerEmail
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Send size={16} />
                                {sendingId === invoice.id
                                  ? "Sending..."
                                  : "Send Email"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmailInvoice;