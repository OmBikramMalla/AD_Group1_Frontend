import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Mail, Send, FileText, CheckCircle, 
  DollarSign, User, LayoutDashboard, Search, Paperclip
} from "lucide-react";

function EmailInvoice() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    customerEmail: "",
    subject: "Invoice for Vehicle Service - AutoLogistics",
    invoiceNumber: "INV-2023-001",
    amount: "245.50",
    message: "Dear Customer,\n\nPlease find your invoice attached for the recent service on your vehicle. The total amount due is $245.50.\n\nThank you for choosing AutoLogistics!\n\nBest regards,\nAutoLogistics Service Team"
  });
  
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!formData.customerEmail) return;
    
    setIsSending(true);
    
    // Simulate API call to send email
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsSent(false);
        setFormData(prev => ({ ...prev, customerEmail: "" }));
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Staff Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-800 text-slate-300 shadow-xl z-10">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white tracking-tight">AutoLogistics</h1>
          <p className="text-sm text-indigo-400 mt-1">Staff Portal</p>
        </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/staff/customers" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/staff/customers" icon={<Search size={20} />} label="Customer Search" active={location.pathname === '/staff/customers'} />
          <NavItem to="/staff/invoice" icon={<Mail size={20} />} label="Email Invoice" active={location.pathname === '/staff/invoice'} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">Send Invoice via Email</h2>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-700">Staff Member</p>
              <p className="text-xs text-gray-500">Service Dept</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
              SM
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-3xl mx-auto">
            
            {isSent && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                <CheckCircle className="text-green-500" size={24} />
                <div>
                  <p className="font-bold">Invoice Sent Successfully!</p>
                  <p className="text-sm text-green-600 mt-0.5">The invoice has been emailed to {formData.customerEmail}</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Mail className="text-indigo-500" size={20} /> Compose Invoice Email
                </h3>
                <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
                  New Message
                </span>
              </div>
              
              <form onSubmit={handleSendEmail} className="p-6 sm:p-8 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* To Email */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User size={16} className="text-gray-400" /> Customer Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      placeholder="customer@example.com"
                      required
                      className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
                    />
                  </div>

                  {/* Invoice Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" /> Invoice Number
                    </label>
                    <input
                      type="text"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-600"
                    />
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <DollarSign size={16} className="text-gray-400" /> Amount Due ($)
                    </label>
                    <input
                      type="text"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-600 font-medium"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2 border-t border-gray-100 pt-6">
                  <label className="text-sm font-semibold text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm font-medium"
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Message Body</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="8"
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm resize-y text-gray-700 leading-relaxed"
                  ></textarea>
                </div>
                
                {/* Attachments Preview */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 border-dashed flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{formData.invoiceNumber}.pdf</p>
                      <p className="text-xs text-gray-500">124 KB • Auto-generated</p>
                    </div>
                  </div>
                  <button type="button" className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition">
                    View
                  </button>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                  <button type="button" className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium transition px-4 py-2 rounded-lg hover:bg-gray-50">
                    <Paperclip size={18} /> Add Attachment
                  </button>
                  <button
                    type="submit"
                    disabled={isSending || !formData.customerEmail}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition shadow-lg ${
                      isSending || !formData.customerEmail 
                        ? "bg-indigo-400 cursor-not-allowed shadow-none" 
                        : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 shadow-indigo-600/30"
                    }`}
                  >
                    {isSending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Invoice
                      </>
                    )}
                  </button>
                </div>
                
              </form>
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
      : "text-slate-400 hover:bg-slate-700 hover:text-white"
  }`}>
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  </Link>
);

export default EmailInvoice;
