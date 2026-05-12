import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  DollarSign,
  TrendingUp,
  Activity,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

import api from "../../services/api";
import AdminSidebar from "../components/AdminSidebar";

function FinancialReports() {
  const [reportPeriod, setReportPeriod] = useState("monthly");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReports();
  }, [reportPeriod]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(`/admin/financial-reports?type=${reportPeriod}`);
      setReports(res.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load financial reports."
      );
    } finally {
      setLoading(false);
    }
  };

  const money = (value) => `Rs. ${Number(value || 0).toFixed(2)}`;

  const totals = useMemo(() => {
    return reports.reduce(
      (acc, row) => {
        acc.totalSales += Number(row.totalSales || 0);
        acc.totalPurchases += Number(row.totalPurchases || 0);
        acc.netProfit += Number(row.netProfit || 0);
        acc.salesInvoiceCount += Number(row.salesInvoiceCount || 0);
        acc.purchaseInvoiceCount += Number(row.purchaseInvoiceCount || 0);
        return acc;
      },
      {
        totalSales: 0,
        totalPurchases: 0,
        netProfit: 0,
        salesInvoiceCount: 0,
        purchaseInvoiceCount: 0,
      }
    );
  }, [reports]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <AdminSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Financial Reports
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Daily, monthly, and yearly sales, purchases, and profit summary.
            </p>
          </div>

          <div className="text-sm text-slate-500 font-medium px-4 py-2 bg-slate-100 rounded-lg">
            Feature 1: Admin Reports
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl flex gap-3 items-center">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard
                title="Total Sales"
                value={money(totals.totalSales)}
                icon={<DollarSign size={24} className="text-emerald-500" />}
                color="bg-emerald-50"
              />

              <KpiCard
                title="Total Purchases"
                value={money(totals.totalPurchases)}
                icon={<Activity size={24} className="text-rose-500" />}
                color="bg-rose-50"
              />

              <KpiCard
                title="Net Profit"
                value={money(totals.netProfit)}
                icon={<TrendingUp size={24} className="text-indigo-500" />}
                color="bg-indigo-50"
              />

              <KpiCard
                title="Invoices"
                value={`${totals.salesInvoiceCount} Sales / ${totals.purchaseInvoiceCount} Purchase`}
                icon={<BarChart3 size={24} className="text-amber-500" />}
                color="bg-amber-50"
              />
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                {["daily", "monthly", "yearly"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setReportPeriod(period)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                      reportPeriod === period
                        ? "bg-white text-indigo-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Sales vs Purchases vs Net Profit
              </h3>

              {loading ? (
                <div className="h-80 flex flex-col items-center justify-center text-slate-500">
                  <Loader2 size={32} className="animate-spin mb-3" />
                  Loading chart...
                </div>
              ) : reports.length === 0 ? (
                <div className="h-80 flex items-center justify-center text-slate-500">
                  No chart data found.
                </div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reports}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip formatter={(value) => money(value)} />
                      <Legend />
                      <Bar dataKey="totalSales" name="Sales" />
                      <Bar dataKey="totalPurchases" name="Purchases" />
                      <Bar dataKey="netProfit" name="Net Profit" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">
                  {reportPeriod.charAt(0).toUpperCase() +
                    reportPeriod.slice(1)}{" "}
                  Financial Summary
                </h3>
              </div>

              {loading ? (
                <div className="p-10 text-center text-slate-500">
                  <Loader2 size={32} className="animate-spin mx-auto mb-3" />
                  Loading financial reports...
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">
                          Period
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">
                          Sales
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">
                          Purchases
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">
                          Net Profit
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase">
                          Sales Invoices
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase">
                          Purchase Invoices
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-slate-100">
                      {reports.map((row, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="px-6 py-4 text-sm font-bold text-slate-900">
                            {row.label}
                          </td>

                          <td className="px-6 py-4 text-sm text-right font-mono text-emerald-700">
                            {money(row.totalSales)}
                          </td>

                          <td className="px-6 py-4 text-sm text-right font-mono text-rose-700">
                            {money(row.totalPurchases)}
                          </td>

                          <td
                            className={`px-6 py-4 text-sm text-right font-mono font-bold ${
                              Number(row.netProfit || 0) >= 0
                                ? "text-indigo-700"
                                : "text-red-700"
                            }`}
                          >
                            {money(row.netProfit)}
                          </td>

                          <td className="px-6 py-4 text-sm text-center text-slate-700">
                            {row.salesInvoiceCount}
                          </td>

                          <td className="px-6 py-4 text-sm text-center text-slate-700">
                            {row.purchaseInvoiceCount}
                          </td>
                        </tr>
                      ))}

                      {reports.length === 0 && (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-6 py-10 text-center text-slate-500"
                          >
                            No financial data found.
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
      </main>
    </div>
  );
}

const KpiCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
    </div>

    <h3 className="text-slate-500 text-sm font-medium mb-1">
      {title}
    </h3>

    <p className="text-2xl font-bold text-slate-800 tracking-tight">
      {value}
    </p>
  </div>
);

export default FinancialReports;