import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Bell, AlertTriangle, LayoutDashboard, Package, 
  Clock, CheckCircle, Info, X
, BarChart3, ShoppingCart, Building2, Users, User, Shield} from "lucide-react";

function AdminNotifications() {
  const location = useLocation();
  const [notifications, setNotifications] = useState([
    {
      id: "NOTIF-001",
      type: "low_stock",
      title: "Low Stock Alert: Oil Filter v8",
      message: "Stock for 'Oil Filter v8' (PRT-002) has fallen below the threshold (8 left). Please reorder soon.",
      time: "2 hours ago",
      isRead: false,
      priority: "high"
    },
    {
      id: "NOTIF-002",
      type: "low_stock",
      title: "Low Stock Alert: Air Filter",
      message: "Stock for 'Air Filter' (PRT-004) has fallen below the threshold (5 left). Please reorder soon.",
      time: "5 hours ago",
      isRead: false,
      priority: "high"
    },
    {
      id: "NOTIF-003",
      type: "system",
      title: "Automated Reminders Sent",
      message: "System successfully sent 12 email reminders to customers with unpaid credits older than 1 month.",
      time: "Yesterday, 08:00 AM",
      isRead: true,
      priority: "medium"
    },
    {
      id: "NOTIF-004",
      type: "invoice",
      title: "Purchase Invoice Processed",
      message: "Invoice INV-P-8472 from AutoParts Co. has been received and stock updated.",
      time: "Oct 24, 2023",
      isRead: true,
      priority: "low"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIconForType = (type, priority) => {
    if (type === 'low_stock') return <AlertTriangle className="text-rose-500" size={24} />;
    if (type === 'system') return <Info className="text-blue-500" size={24} />;
    if (type === 'invoice') return <CheckCircle className="text-emerald-500" size={24} />;
    return <Bell className="text-indigo-500" size={24} />;
  };

  const getBgForType = (type, isRead) => {
    if (isRead) return "bg-white border-slate-200";
    if (type === 'low_stock') return "bg-rose-50/50 border-rose-200";
    return "bg-indigo-50/50 border-indigo-200";
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
          <NavItem to="/admin/notifications" icon={<Bell size={20} />} label="Notifications" active={location.pathname === '/admin/notifications'} badge={typeof unreadCount !== 'undefined' ? unreadCount : 0} />
          
          <div className="pt-4 mt-4 border-t border-slate-800">
            <NavItem to="/admin/profile" icon={<User size={20} />} label="Profile" />
            <NavItem to="/admin/staff" icon={<Shield size={20} />} label="Role Management" />
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-800">System Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold border border-rose-200">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={`text-sm font-medium transition ${unreadCount > 0 ? 'text-indigo-600 hover:text-indigo-800' : 'text-slate-400 cursor-not-allowed'}`}
          >
            Mark all as read
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            
            {notifications.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <Bell size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">All Caught Up!</h3>
                <p className="text-slate-500 mt-2">You have no new notifications right now.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`relative p-5 rounded-2xl border shadow-sm transition-all flex gap-4 group ${getBgForType(notif.type, notif.isRead)}`}
                  >
                    {!notif.isRead && (
                      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-12 bg-indigo-500 rounded-r-full"></div>
                    )}
                    
                    <div className="flex-shrink-0 mt-1">
                      {getIconForType(notif.type, notif.priority)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`text-base font-bold ${notif.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                          {notif.title}
                        </h3>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 whitespace-nowrap ml-4">
                          <Clock size={12} /> {notif.time}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${notif.isRead ? 'text-slate-500' : 'text-slate-700 font-medium'}`}>
                        {notif.message}
                      </p>
                      
                      {/* Action buttons appear on hover or if unread */}
                      <div className={`mt-3 flex gap-3 ${notif.isRead ? 'opacity-0 group-hover:opacity-100 transition-opacity' : ''}`}>
                        {!notif.isRead && (
                          <button 
                            onClick={() => markAsRead(notif.id)}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                          >
                            Mark as Read
                          </button>
                        )}
                        {notif.type === 'low_stock' && (
                          <button className="text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 px-3 py-1.5 rounded-lg transition">
                            Create Purchase Invoice
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => deleteNotification(notif.id)}
                      className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
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

export default AdminNotifications;
