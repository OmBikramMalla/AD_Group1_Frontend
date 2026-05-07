import React, { useEffect, useState } from "react";
import {
  FileText,
  Loader2,
  Package,
  ShoppingCart,
  CalendarDays,
} from "lucide-react";
import api from "../../services/api";

function PurchaseHistory() {
  const [loading, setLoading] = useState(true);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const loadPurchaseHistory = async () => {
      try {
        const { data } = await api.get("/customers/my-history");
        setPurchaseHistory(data.purchaseHistory || []);
      } catch (error) {
        console.error("Failed to load purchase history:", error);
        setPurchaseHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadPurchaseHistory();
  }, []);

  return (
    <div className="p-6 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Purchase History
          </h1>
          <p className="text-slate-500 mt-1">
            View all your previous part purchases and invoices.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
          </div>
        ) : purchaseHistory.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-14 text-center shadow-sm">
            <Package size={52} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-xl font-bold text-slate-700">
              No Purchase History Found
            </h2>
            <p className="text-slate-500 mt-2">
              Your purchased parts and invoices will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {purchaseHistory.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                      <FileText size={24} />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-slate-800">
                        Invoice #{item.invoiceId || item.id || "N/A"}
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                        <CalendarDays size={15} />
                        <span>
                          {item.invoiceDate
                            ? new Date(item.invoiceDate).toLocaleDateString()
                            : "Date not available"}
                        </span>
                      </div>

                      {item.partName && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
                          <ShoppingCart size={15} />
                          <span>{item.partName}</span>
                        </div>
                      )}

                      {item.quantity && (
                        <p className="text-sm text-slate-500 mt-1">
                          Quantity: {item.quantity}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm text-slate-500">Total Amount</p>
                    <p className="text-2xl font-extrabold text-indigo-600">
                      Rs.{" "}
                      {Number(
                        item.totalAmount || item.total || item.amount || 0
                      ).toLocaleString()}
                    </p>

                    <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                      {item.status || "Completed"}
                    </span>
                  </div>
                </div>

                {item.items && item.items.length > 0 && (
                  <div className="mt-5 border-t pt-4">
                    <p className="text-sm font-bold text-slate-700 mb-3">
                      Purchased Items
                    </p>

                    <div className="space-y-2">
                      {item.items.map((part, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-sm bg-slate-50 rounded-lg px-4 py-2"
                        >
                          <span className="text-slate-700">
                            {part.partName || part.name || "Part"}
                          </span>
                          <span className="text-slate-500">
                            Qty: {part.quantity || 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseHistory;