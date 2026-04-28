import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Bell, Mail, AlertCircle, CheckCircle, 
  LayoutDashboard, Calendar, History, User, Settings, Clock
} from "lucide-react";

function CustomerNotifications() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  
  // This simulates the customer's email inbox/notification center
  const notifications = [
    {
      id: "N-101",
      type: "reminder",
      title: "Action Required: Overdue Invoice",
      message: "This is an automated reminder that your invoice INV-7890 for $350.00 from Jun 20, 2023 is currently overdue by more than 1 month. Please settle this balance at your earliest convenience to continue enjoying our services.",
      date: "Today, 08:00 AM",
      isRead: false,
      priority: "high",
      icon: <AlertCircle className="text-rose-500" size={24} />,
      bg: "bg-rose-50 border-rose-200"
    },
    {
      id: "N-102",
      type: "appointment",
      title: "Appointment Confirmation",
      message: "Your appointment for General Maintenance on your Honda Civic (ABC-123) has been confirmed for Nov 15, 2023 at 10:00 AM.",
      date: "Yesterday, 02:30 PM",
      isRead: true,
      priority: "normal",
      icon: <CheckCircle className="text-emerald-500" size={24} />,
      bg: "bg-emerald-50 border-emerald-200"
    },
    {
      id: "N-103",
      type: "marketing",
      title: "Loyalty Member Update",
      message: "Great news! You are only $750 away from reaching VIP status. VIP members receive an automatic 10% discount on all purchases over $5,000.",
      date: "Oct 10, 2023",
      isRead: true,
      priority: "low",
      icon: <Bell className="text-indigo-500" size={24} />,
      bg: "bg-slate-50 border-slate-200"
    }
  ];

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === "unread") return !n.isRead;
    return true;
  });

  return (
    <>
        
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Inbox & Notifications</h2>
            <p className="text-sm text-slate-500 mt-1">Stay updated on your account and appointments</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
              
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveTab('all')}
                    className={`text-sm font-bold pb-1 border-b-2 transition ${activeTab === 'all' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                    All Messages
                  </button>
                  <button 
                    onClick={() => setActiveTab('unread')}
                    className={`text-sm font-bold pb-1 border-b-2 transition flex items-center gap-1.5 ${activeTab === 'unread' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                    Unread <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">1</span>
                  </button>
                </div>
                <button className="text-sm font-medium text-slate-500 flex items-center gap-2 hover:text-indigo-600 transition">
                  <Mail size={16} /> Mark all as read
                </button>
              </div>

              <div className="flex-1 p-6">
                {filteredNotifs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <Bell size={48} className="mb-4 text-slate-200" />
                    <p className="font-medium text-slate-500">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredNotifs.map(n => (
                      <div key={n.id} className={`p-5 rounded-2xl border transition-all ${n.isRead ? 'bg-white border-slate-200' : n.bg}`}>
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {n.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className={`text-base font-bold ${!n.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                                {n.title}
                              </h3>
                              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 ml-4 whitespace-nowrap">
                                <Clock size={12} /> {n.date}
                              </span>
                            </div>
                            <p className={`text-sm leading-relaxed ${!n.isRead ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                              {n.message}
                            </p>
                            
                            {n.type === 'reminder' && !n.isRead && (
                              <button className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold shadow-md shadow-rose-600/20 hover:bg-rose-700 transition">
                                Pay Balance Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
    </>
  );
}

const NavItem = ({ icon, label, active, to, badge }) => (
  <Link to={to || "#"} className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
    active 
      ? "bg-indigo-50 text-indigo-700 font-bold" 
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
  }`}>
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {badge && (
      <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>
    )}
  </Link>
);

export default CustomerNotifications;
