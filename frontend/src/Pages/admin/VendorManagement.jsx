import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Building2, Plus, Search, Edit2, Trash2, 
  Phone, Mail, MapPin, LayoutDashboard, Star
, BarChart3, Package, ShoppingCart, Users, Bell, User, Shield} from "lucide-react";

function VendorManagement() {
  const location = useLocation();
  const [vendors, setVendors] = useState([
    { id: "VND-001", name: "AutoParts Co.", contactPerson: "John Doe", email: "john@autopartsco.com", phone: "+1 555-0201", address: "100 Industrial Way", rating: 4.8 },
    { id: "VND-002", name: "EngineWorks", contactPerson: "Jane Smith", email: "sales@engineworks.com", phone: "+1 555-0202", address: "250 Motor Blvd", rating: 4.5 },
    { id: "VND-003", name: "SparkTech", contactPerson: "Mike Johnson", email: "mike@sparktech.com", phone: "+1 555-0203", address: "88 Electric Ave", rating: 4.9 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", contactPerson: "", email: "", phone: "", address: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddVendor = (e) => {
    e.preventDefault();
    const newVendor = {
      id: `VND-00${vendors.length + 1}`,
      ...formData,
      rating: 5.0
    };
    setVendors([...vendors, newVendor]);
    setShowModal(false);
    setFormData({ name: "", contactPerson: "", email: "", phone: "", address: "" });
  };

  const handleDelete = (id) => {
    setVendors(vendors.filter(v => v.id !== id));
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
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
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Vendor Management</h2>
            <p className="text-sm text-slate-500 mt-1">Manage suppliers and contact details</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
          >
            <Plus size={18} /> Add New Vendor
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search vendors by company name or contact person..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:border-indigo-200 transition-all flex flex-col sm:flex-row gap-6">
                  
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(vendor.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"><Trash2 size={16} /></button>
                  </div>

                  <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-500">
                    <Building2 size={28} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{vendor.name}</h3>
                        <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mt-1 inline-block">{vendor.id}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-md text-sm font-bold">
                        <Star size={14} className="fill-amber-500" /> {vendor.rating}
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-6 flex justify-center text-slate-400"><LayoutDashboard size={14} /></div>
                        <span className="font-medium">Contact:</span> {vendor.contactPerson}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-6 flex justify-center text-slate-400"><Mail size={14} /></div>
                        <a href={`mailto:${vendor.email}`} className="hover:text-indigo-600">{vendor.email}</a>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-6 flex justify-center text-slate-400"><Phone size={14} /></div>
                        {vendor.phone}
                      </div>
                      <div className="flex items-start gap-3 text-sm text-slate-600">
                        <div className="w-6 flex justify-center text-slate-400 mt-0.5"><MapPin size={14} /></div>
                        {vendor.address}
                      </div>
                    </div>
                    
                    <div className="mt-5 pt-4 border-t border-slate-100 flex gap-3">
                      <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">View Purchase History</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </main>

      {/* Add Vendor Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="text-indigo-600" size={20} /> Add New Vendor
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <form onSubmit={handleAddVendor} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Company Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Contact Person Name</label>
                <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Physical Address</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} required rows="2" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
              </div>

              <div className="pt-4 flex gap-3 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">Save Vendor Details</button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default VendorManagement;
