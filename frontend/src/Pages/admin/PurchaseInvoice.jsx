import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FileText, Plus, Search, Check, 
  LayoutDashboard, ShoppingCart, Truck, Calendar, DollarSign
, BarChart3, Package, Building2, Users, Bell, User, Shield} from "lucide-react";

function PurchaseInvoice() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    invoiceNo: `INV-P-${Math.floor(1000 + Math.random() * 9000)}`,
    vendor: "",
    date: new Date().toISOString().split('T')[0],
    partId: "",
    quantity: "",
    unitPrice: "",
  });

  const [invoices, setInvoices] = useState([
    { id: "INV-P-8472", vendor: "AutoParts Co.", date: "2023-10-24", amount: 1450.00, items: 45, status: "Received" },
    { id: "INV-P-8473", vendor: "EngineWorks", date: "2023-10-25", amount: 3200.50, items: 120, status: "Pending" },
  ]);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = parseInt(formData.quantity);
    const price = parseFloat(formData.unitPrice);
    
    if(!qty || !price || !formData.vendor || !formData.partId) return;

    const newInvoice = {
      id: formData.invoiceNo,
      vendor: formData.vendor,
      date: formData.date,
      amount: qty * price,
      items: qty,
      status: "Received"
    };

    setInvoices([newInvoice, ...invoices]);
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        invoiceNo: `INV-P-${Math.floor(1000 + Math.random() * 9000)}`,
        vendor: "",
        date: new Date().toISOString().split('T')[0],
        partId: "",
        quantity: "",
        unitPrice: "",
      });
    }, 3000);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Admin Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 shadow-xl z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white tracking-tight">AutoLogistics</h1>
          <p className="text-sm text-indigo-400 mt-1">Admin Portal</p>
        </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/admin/dashboard'} />
          <NavItem to="/admin/reports" icon={<BarChart3 size={20} />} label="Financial Reports" active={location.pathname === '/admin/reports'} />
          <NavItem to="/admin/parts" icon={<Package size={20} />} label="Parts Inventory" active={location.pathname === '/admin/parts'} />
          <NavItem to="/admin/purchase-invoice" icon={<ShoppingCart size={20} />} label="Purchase Invoices" active={location.pathname === '/admin/purchase-invoice'} />
          <NavItem to="/admin/vendors" icon={<Building2 size={20} />} label="Vendor Management" active={location.pathname === '/admin/vendors'} />
          <NavItem to="/admin/staff" icon={<Users size={20} />} label="Staff Management" active={location.pathname === '/admin/staff'} />
          <NavItem to="/admin/notifications" icon={<Bell size={20} />} label="Notifications" active={location.pathname === '/admin/notifications'} />
          
          <div className="pt-4 mt-4 border-t border-slate-800">
            <NavItem to="/admin/profile" icon={<User size={20} />} label="Profile" />
            <NavItem to="/admin/staff" icon={<Shield size={20} />} label="Role Management" />
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <h2 className="text-2xl font-bold text-slate-800">Purchase Invoices</h2>
          <div className="text-sm text-slate-500 font-medium px-4 py-2 bg-slate-100 rounded-lg">
            Record Stock Intake
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Create Invoice Form */}
            <div className="lg:col-span-1 space-y-6">
              
              {isSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-start gap-3 shadow-sm animate-in fade-in duration-300">
                  <Check className="text-emerald-500 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-sm">Stock Updated Successfully!</p>
                    <p className="text-xs text-emerald-600 mt-0.5">Inventory levels have been automatically adjusted.</p>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
                  <FileText className="text-indigo-500" size={20} /> New Purchase Invoice
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><FileText size={14}/> Invoice Number</label>
                    <input type="text" name="invoiceNo" value={formData.invoiceNo} readOnly className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg outline-none text-slate-500 font-mono text-sm" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Truck size={14}/> Select Vendor</label>
                    <select name="vendor" value={formData.vendor} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                      <option value="">-- Choose Vendor --</option>
                      <option value="AutoParts Co.">AutoParts Co.</option>
                      <option value="EngineWorks">EngineWorks</option>
                      <option value="SparkTech">SparkTech</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Calendar size={14}/> Date Received</label>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Part ID / Scan Barcode</label>
                      <input type="text" name="partId" value={formData.partId} onChange={handleInputChange} placeholder="e.g. PRT-001" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none uppercase font-mono text-sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">Quantity</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="0" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1"><DollarSign size={14}/> Unit Price</label>
                        <input type="number" step="0.01" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange} placeholder="0.00" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-6 flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-600">Total Amount:</span>
                    <span className="text-lg font-bold text-slate-900 font-mono">
                      ${(parseInt(formData.quantity || 0) * parseFloat(formData.unitPrice || 0)).toFixed(2)}
                    </span>
                  </div>

                  <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20 mt-4 flex justify-center items-center gap-2">
                    <Plus size={18} /> Record Purchase
                  </button>
                </form>
              </div>
            </div>

            {/* Invoices List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-800">Recent Purchase History</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Search invoices..." className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-500" />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Vendor</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Total Amount</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-mono text-sm font-bold text-indigo-600">{inv.id}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{inv.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{inv.vendor}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-500">{inv.items}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-sm font-bold text-slate-900">
                            ${inv.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-2.5 py-1 inline-flex text-xs font-bold rounded-full border ${
                              inv.status === 'Received' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              {inv.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>

    </div>
  );
}

const NavItem = ({ icon, label, active, to, badge }) => (
  <Link to={to || "#"} className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
    active 
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20" 
      : "text-slate-400 hover:bg-slate-800 hover:text-white"
  }`}>
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    {badge > 0 && (
      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${active ? 'bg-white text-indigo-600' : 'bg-rose-500 text-white'}`}>
        {badge}
      </span>
    )}
  </Link>
);

export default PurchaseInvoice;
