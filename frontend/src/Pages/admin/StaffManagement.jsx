import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, UserPlus, Search, Edit2, Trash2, 
  Shield, Mail, Phone, LayoutDashboard, Settings,
  BarChart3, Package, ShoppingCart, Building2, Bell, User
} from "lucide-react";

function StaffManagement() {
  const location = useLocation();
  const [staffList, setStaffList] = useState([
    { id: "EMP-001", name: "David Wilson", email: "david.w@autologistics.com", phone: "+1 555-0101", role: "Service Manager", status: "Active" },
    { id: "EMP-002", name: "Emma Thompson", email: "emma.t@autologistics.com", phone: "+1 555-0102", role: "Parts Specialist", status: "Active" },
    { id: "EMP-003", name: "James Rodriguez", email: "james.r@autologistics.com", phone: "+1 555-0103", role: "Mechanic", status: "On Leave" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "Mechanic" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    const newStaff = {
      id: `EMP-00${staffList.length + 1}`,
      ...formData,
      status: "Active"
    };
    setStaffList([...staffList, newStaff]);
    setShowModal(false);
    setFormData({ name: "", email: "", phone: "", role: "Mechanic" });
  };

  const handleDelete = (id) => {
    setStaffList(staffList.filter(s => s.id !== id));
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
          <h2 className="text-2xl font-bold text-slate-800">Staff Management</h2>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
          >
            <UserPlus size={18} /> Add New Staff
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search staff by name, email, or role..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium">
                Filter Roles
              </button>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staffList.map((staff) => (
                <div key={staff.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:shadow-md transition-all">
                  
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(staff.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"><Trash2 size={16} /></button>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xl font-bold border border-indigo-200">
                      {staff.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{staff.name}</h3>
                      <p className="text-sm text-slate-500">{staff.id}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Shield size={16} className="text-slate-400" />
                      <span className="font-medium px-2.5 py-0.5 bg-slate-100 rounded-md">{staff.role}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Mail size={16} className="text-slate-400" /> {staff.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Phone size={16} className="text-slate-400" /> {staff.phone}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      staff.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${staff.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {staff.status}
                    </span>
                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">View Profile &rarr;</button>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </main>

      {/* Add Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Register New Staff</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <form onSubmit={handleAddStaff} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Role</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="Service Manager">Service Manager</option>
                  <option value="Parts Specialist">Parts Specialist</option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Receptionist">Receptionist</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">Register Staff</button>
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

export default StaffManagement;
