import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  User, Mail, Phone, MapPin, Car, 
  Clock, FileText, CreditCard, Edit2, ShoppingCart,
  Search, LayoutDashboard, UserPlus, Settings, Calendar
} from "lucide-react";

function CustomerDetails() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('history'); // history, vehicles, credits

  // Mock data for a single customer
  const customer = {
    id: "CUS-1029",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Maple Street, Cityville",
    joinDate: "Jan 15, 2023",
    status: "Regular",
    totalSpent: 4250.00,
    pendingCredit: 350.00,
    vehicles: [
      { id: "V-1", make: "Honda", model: "Civic", year: 2019, plate: "ABC-123", vin: "1HGCV1F10KA011XXX" }
    ],
    history: [
      { id: "INV-8472", date: "Oct 12, 2023", type: "Service", description: "Full Synthetic Oil Change & Filter", amount: 120.00, status: "Paid" },
      { id: "INV-8105", date: "Aug 05, 2023", type: "Parts", description: "Premium Brake Pads (Front)", amount: 145.50, status: "Paid" },
      { id: "INV-7890", date: "Jun 20, 2023", type: "Service", description: "Tire Rotation & Alignment", amount: 350.00, status: "Unpaid" }
    ]
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Staff Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-800 text-slate-300 shadow-xl z-10">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white tracking-tight">AutoLogistics</h1>
          <p className="text-sm text-indigo-400 mt-1">Staff Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/staff/customers" icon={<Search size={20} />} label="Customer Search" active={location.pathname === '/staff/details'} />
          <NavItem to="/staff/register" icon={<UserPlus size={20} />} label="Register Customer" />
          <NavItem to="/staff/sales" icon={<ShoppingCart size={20} />} label="Point of Sale" />
          <NavItem to="/staff/reports" icon={<Settings size={20} />} label="Customer Reports" />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <Link to="/staff/customers" className="text-slate-400 hover:text-indigo-600 transition font-bold">
              &larr; Back
            </Link>
            <h2 className="text-2xl font-bold text-slate-800">Customer Details</h2>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition text-sm flex items-center gap-2">
              <Edit2 size={16} /> Edit Profile
            </button>
            <Link to="/staff/sales" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20 text-sm flex items-center gap-2">
              <ShoppingCart size={16} /> New Sale
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Top Profile Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
              <div className="p-8 md:w-1/3 bg-slate-900 text-white flex flex-col items-center text-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-slate-900 to-slate-900"></div>
                <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-indigo-400 mb-4 z-10">
                  {customer.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-bold z-10">{customer.name}</h3>
                <span className="mt-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30 z-10">
                  ID: {customer.id}
                </span>
                <span className="mt-4 px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-bold z-10">
                  {customer.status} Customer
                </span>
              </div>
              
              <div className="p-8 md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><Mail size={16} /></div>
                    <span className="font-medium">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><Phone size={16} /></div>
                    <span className="font-medium">{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><MapPin size={16} /></div>
                    <span className="font-medium">{customer.address}</span>
                  </div>
                </div>
                <div className="space-y-4 sm:pl-8 sm:border-l border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-slate-400">Total Lifetime Spend</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1 font-mono">${customer.totalSpent.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-400 flex items-center gap-1.5"><Clock size={14} /> Pending Credit Balance</p>
                    <p className="text-xl font-bold text-rose-500 mt-1 font-mono">${customer.pendingCredit.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
              <TabButton active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={<FileText size={18} />} label="Transaction History" />
              <TabButton active={activeTab === 'vehicles'} onClick={() => setActiveTab('vehicles')} icon={<Car size={18} />} label="Registered Vehicles" />
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-sm border border-slate-200 border-t-0 p-6">
              
              {activeTab === 'history' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice / Date</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {customer.history.map((record) => (
                        <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-mono text-sm font-bold text-indigo-600">{record.id}</div>
                            <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Calendar size={12}/> {record.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-700">
                              {record.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">{record.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-sm font-bold text-slate-900">
                            ${record.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-2.5 py-1 inline-flex text-xs font-bold rounded-full border ${
                              record.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}>
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'vehicles' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {customer.vehicles.map(v => (
                    <div key={v.id} className="border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 transition-colors bg-slate-50 flex gap-5">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm flex-shrink-0">
                        <Car size={32} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">{v.year} {v.make} {v.model}</h4>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm font-mono text-slate-600 bg-white border border-slate-200 inline-block px-2 py-0.5 rounded mr-2 uppercase">Plate: {v.plate}</p>
                          <p className="text-xs text-slate-500 block mt-2">VIN: {v.vin}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-colors h-full min-h-[140px]">
                    <Car size={24} className="mb-2" />
                    <span className="font-bold text-sm">Register New Vehicle</span>
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-4 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors ${
      active 
        ? "border-indigo-600 text-indigo-600 bg-white rounded-t-xl" 
        : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-t-xl"
    }`}
  >
    {icon} {label}
  </button>
);

const NavItem = ({ icon, label, active, to }) => (
  <Link to={to || "#"} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
    active 
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20" 
      : "text-slate-400 hover:bg-slate-700 hover:text-white"
  }`}>
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export default CustomerDetails;
