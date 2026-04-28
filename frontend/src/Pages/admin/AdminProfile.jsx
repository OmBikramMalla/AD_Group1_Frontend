import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { 
  User, Mail, Phone, MapPin, Key, Bell, Shield, 
  Camera, Check, Save, Activity, LayoutDashboard, 
  Package, ShoppingCart, Users, BarChart3, LogOut, FileText, Building2
} from "lucide-react";

function AdminProfile() {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "admin@autologistics.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    role: "Super Admin",
    bio: "Lead administrator for AutoLogistics managing overall platform operations."
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here we would typically make an API call to save the data
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 shadow-xl z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="bg-indigo-600 p-1.5 rounded-lg">
              <Package size={20} className="text-white" />
            </span>
            AutoLogistics
          </h1>
          <p className="text-sm text-slate-500 mt-1 ml-10">Admin Portal</p>
        </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <NavItem to="/admin/reports" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/admin/reports" icon={<BarChart3 size={20} />} label="Financial Reports" active={location.pathname === '/admin/reports'} />
          <NavItem to="/admin/parts" icon={<Package size={20} />} label="Parts Inventory" active={location.pathname === '/admin/parts'} />
          <NavItem to="/admin/purchase-invoice" icon={<ShoppingCart size={20} />} label="Purchase Invoices" active={location.pathname === '/admin/purchase-invoice'} />
          <NavItem to="/admin/vendors" icon={<Building2 size={20} />} label="Vendor Management" active={location.pathname === '/admin/vendors'} />
          <NavItem to="/admin/staff" icon={<Users size={20} />} label="Staff Management" active={location.pathname === '/admin/staff'} />
          <NavItem to="/admin/notifications" icon={<Bell size={20} />} label="Notifications" active={location.pathname === '/admin/notifications'} badge={typeof unreadCount !== 'undefined' ? unreadCount : 0} />
          
          <div className="pt-4 mt-4 border-t border-slate-800">
            <NavItem to="/admin/profile" icon={<User size={20} />} label="Profile" active={location.pathname === '/admin/profile'} />
            <NavItem to="/admin/staff" icon={<Shield size={20} />} label="Role Management" />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full p-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-700">{profileData.firstName} {profileData.lastName}</p>
                <p className="text-xs text-gray-500">{profileData.role}</p>
              </div>
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Admin Avatar"
                className="w-10 h-10 rounded-full border-2 border-indigo-100 object-cover"
              />
            </div>
          </div>
        </header>

        {/* Profile Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Header / Cover Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group">
              <div className="h-32 sm:h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 relative">
                <button className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-2 opacity-0 group-hover:opacity-100">
                  <Camera size={16} /> Edit Cover
                </button>
              </div>
              
              <div className="px-6 sm:px-10 pb-8 flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:-mt-16 relative z-10">
                <div className="relative group/avatar">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden relative">
                    <img 
                      src="https://i.pravatar.cc/150?img=11" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 hidden group-hover/avatar:flex items-center justify-center cursor-pointer transition-all">
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                
                <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0 pt-16 sm:pt-0">
                  <h1 className="text-3xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h1>
                  <p className="text-indigo-600 font-medium mt-1 flex items-center justify-center sm:justify-start gap-1">
                    <Shield size={16} /> {profileData.role}
                  </p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex gap-3">
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition shadow-sm flex items-center gap-2"
                    >
                      <User size={18} /> Edit Profile
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition shadow-sm"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition shadow-sm shadow-indigo-200 flex items-center gap-2"
                      >
                        <Save size={18} /> Save Changes
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column - Personal Info */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Personal Information Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="text-indigo-500" size={20} /> Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-500">First Name</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="firstName"
                          value={profileData.firstName} 
                          onChange={handleInputChange}
                          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        />
                      ) : (
                        <p className="font-medium text-gray-800 p-2.5">{profileData.firstName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-500">Last Name</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="lastName"
                          value={profileData.lastName} 
                          onChange={handleInputChange}
                          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        />
                      ) : (
                        <p className="font-medium text-gray-800 p-2.5">{profileData.lastName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-500">Email Address</label>
                      <div className="flex items-center gap-2">
                        {!isEditing && <Mail className="text-gray-400" size={18} />}
                        {isEditing ? (
                          <input 
                            type="email" 
                            name="email"
                            value={profileData.email} 
                            onChange={handleInputChange}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pl-10 relative"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='20' height='16' x='2' y='4' rx='2'/%3E%3Cpath d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }}
                          />
                        ) : (
                          <p className="font-medium text-gray-800">{profileData.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-500">Phone Number</label>
                      <div className="flex items-center gap-2">
                        {!isEditing && <Phone className="text-gray-400" size={18} />}
                        {isEditing ? (
                          <input 
                            type="tel" 
                            name="phone"
                            value={profileData.phone} 
                            onChange={handleInputChange}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pl-10 relative"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }}
                          />
                        ) : (
                          <p className="font-medium text-gray-800">{profileData.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-500">Location</label>
                      <div className="flex items-center gap-2">
                        {!isEditing && <MapPin className="text-gray-400" size={18} />}
                        {isEditing ? (
                          <input 
                            type="text" 
                            name="location"
                            value={profileData.location} 
                            onChange={handleInputChange}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pl-10 relative"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }}
                          />
                        ) : (
                          <p className="font-medium text-gray-800">{profileData.location}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-500">Bio</label>
                      {isEditing ? (
                        <textarea 
                          name="bio"
                          value={profileData.bio} 
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
                        ></textarea>
                      ) : (
                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">{profileData.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Security Settings Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Key className="text-indigo-500" size={20} /> Security Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <h4 className="font-medium text-gray-800">Password</h4>
                        <p className="text-sm text-gray-500 mt-0.5">Last changed 3 months ago</p>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm">
                        Change Password
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500 mt-0.5">Add an extra layer of security</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Right Column - Side cards */}
              <div className="space-y-6">
                
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <Activity className="text-indigo-500" size={20} /> Recent Activity
                  </h3>
                  
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent hidden"></div>
                  
                  <div className="space-y-5">
                    <ActivityItem 
                      title="Logged in from new IP" 
                      time="Today, 10:23 AM" 
                      color="bg-blue-100 text-blue-600"
                    />
                    <ActivityItem 
                      title="Updated system settings" 
                      time="Yesterday, 03:45 PM" 
                      color="bg-purple-100 text-purple-600"
                    />
                    <ActivityItem 
                      title="Added 5 new vendors" 
                      time="Oct 24, 11:30 AM" 
                      color="bg-green-100 text-green-600"
                    />
                    <ActivityItem 
                      title="Changed profile picture" 
                      time="Oct 20, 09:15 AM" 
                      color="bg-orange-100 text-orange-600"
                    />
                  </div>
                  
                  <button className="w-full mt-6 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
                    View All Activity
                  </button>
                </div>
                
                {/* Notification Preferences */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <Bell className="text-indigo-500" size={20} /> Notifications
                  </h3>
                  
                  <div className="space-y-4">
                    <ToggleItem label="Email Alerts" description="Receive alerts via email" checked={true} />
                    <ToggleItem label="Push Notifications" description="In-app browser alerts" checked={true} />
                    <ToggleItem label="Weekly Reports" description="Summary of weekly stats" checked={false} />
                  </div>
                </div>

              </div>
              
            </div>
          </div>
          
          {/* Footer inside scroll area */}
          <footer className="max-w-5xl mx-auto mt-12 mb-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AutoLogistics Admin Portal. All rights reserved.
          </footer>
          
        </div>

      </main>
    </div>
  );
}

// Subcomponents for cleaner code
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

const ActivityItem = ({ title, time, color }) => (
  <div className="flex gap-4 relative">
    <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${color}`}>
      <Check size={14} />
    </div>
    <div>
      <h4 className="text-sm font-medium text-gray-800">{title}</h4>
      <p className="text-xs text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);

const ToggleItem = ({ label, description, checked }) => (
  <div className="flex items-center justify-between">
    <div>
      <h4 className="text-sm font-medium text-gray-800">{label}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    <div className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
    </div>
  </div>
);

export default AdminProfile;