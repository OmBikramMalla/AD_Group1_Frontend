import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  History, ShoppingBag, Wrench, Download, 
  LayoutDashboard, Calendar, User, Settings, Filter
} from "lucide-react";

function CustomerHistoryLogs() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');

  const historyData = [
    { id: "INV-8472", date: "Oct 12, 2023", type: "Service", description: "Full Synthetic Oil Change & Filter", amount: 120.00, vehicle: "Honda Civic 2019", status: "Paid" },
    { id: "INV-8105", date: "Aug 05, 2023", type: "Parts", description: "Premium Brake Pads (Front)", amount: 145.50, vehicle: "Carry-out", status: "Paid" },
    { id: "INV-7890", date: "Jun 20, 2023", type: "Service", description: "Tire Rotation & Alignment", amount: 350.00, vehicle: "Honda Civic 2019", status: "Unpaid" },
    { id: "INV-7211", date: "Jan 15, 2023", type: "Parts", description: "Air Filter Replacement Kit", amount: 45.00, vehicle: "Carry-out", status: "Paid" },
  ];

  const filteredHistory = historyData.filter(item => {
    if (activeTab === 'all') return true;
    return item.type.toLowerCase() === activeTab;
  });

  return (
    <>
        
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">History Logs</h2>
            <p className="text-sm text-slate-500 mt-1">Review past services and parts purchases</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
            <Filter size={16} /> Filter
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Tabs */}
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition ${activeTab === 'all' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
              >
                All Records
              </button>
              <button 
                onClick={() => setActiveTab('service')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition ${activeTab === 'service' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
              >
                <Wrench size={16} /> Service Logs
              </button>
              <button 
                onClick={() => setActiveTab('parts')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition ${activeTab === 'parts' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
              >
                <ShoppingBag size={16} /> Parts Purchases
              </button>
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredHistory.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-200 transition-colors flex flex-col md:flex-row justify-between items-center gap-6">
                  
                  <div className="flex items-start gap-4 w-full md:w-auto">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.type === 'Service' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {item.type === 'Service' ? <Wrench size={24} /> : <ShoppingBag size={24} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{item.description}</h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
                        <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-bold">{item.id}</span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                        <span className="text-slate-400">•</span>
                        <span>{item.vehicle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto gap-8 pt-4 md:pt-0 border-t md:border-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <p className="text-sm font-semibold text-slate-400">Total Amount</p>
                      <p className="text-xl font-bold text-slate-900 font-mono">${item.amount.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${item.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        {item.status}
                      </span>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-bold flex items-center gap-1 transition">
                        <Download size={14} /> Invoice
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
    </>
  );
}



export default CustomerHistoryLogs;
