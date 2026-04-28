import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingCart, Search, Plus, Trash2, CreditCard, 
  Tag, Package, FileText, CheckCircle, LayoutDashboard, UserPlus, Settings
} from "lucide-react";

// Mock Inventory Data
const INVENTORY = [
  { id: "PRT-001", name: "Premium Brake Pads", price: 120.00, stock: 45 },
  { id: "PRT-002", name: "V8 Engine Oil (5L)", price: 85.50, stock: 12 },
  { id: "PRT-003", name: "High-Performance Tires", price: 1250.00, stock: 24 },
  { id: "PRT-004", name: "Transmission Fluid", price: 45.00, stock: 8 },
  { id: "PRT-005", name: "Custom Exhaust System", price: 3400.00, stock: 3 },
];

function SalesInvoice() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Computed Totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // LOGIC: Loyalty Program - 10% discount if total > 5000
  const isLoyaltyEligible = subtotal > 5000;
  const discountAmount = isLoyaltyEligible ? subtotal * 0.10 : 0;
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const finalTotal = subtotal - discountAmount + tax;

  const addToCart = (part) => {
    const existingItem = cart.find(item => item.id === part.id);
    if (existingItem) {
      if (existingItem.quantity < part.stock) {
        setCart(cart.map(item => 
          item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      }
    } else {
      setCart([...cart, { ...part, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const part = INVENTORY.find(p => p.id === id);
    if (newQty > part.stock) return;
    
    setCart(cart.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0 || !customerInfo.name) return;

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setCart([]);
      setCustomerInfo({ name: "", phone: "" });
    }, 3000);
  };

  const filteredInventory = INVENTORY.filter(part => 
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    part.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Staff Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-800 text-slate-300 shadow-xl z-10">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white tracking-tight">AutoLogistics</h1>
          <p className="text-sm text-indigo-400 mt-1">Staff Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem to="/staff/customers" icon={<Search size={20} />} label="Customer Search" />
          <NavItem to="/staff/register" icon={<UserPlus size={20} />} label="Register Customer" />
          <NavItem to="/staff/sales" icon={<ShoppingCart size={20} />} label="Point of Sale" active={location.pathname === '/staff/sales'} />
          <NavItem to="/staff/reports" icon={<Settings size={20} />} label="Customer Reports" />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Point of Sale</h2>
            <p className="text-sm text-slate-500 mt-1">Create sales invoices and apply discounts</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {isSuccess && (
            <div className="max-w-7xl mx-auto mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm animate-in slide-in-from-top-4 duration-300">
              <CheckCircle className="text-emerald-500" size={28} />
              <div>
                <p className="font-bold text-lg">Transaction Completed!</p>
                <p className="text-sm text-emerald-600 mt-0.5">Invoice has been generated and stock updated.</p>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            
            {/* Left Side: Product Search & List */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
                <Search className="text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Scan barcode or search by part name/ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pr-2 pb-20 lg:pb-0">
                {filteredInventory.map(part => (
                  <div key={part.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{part.id}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${part.stock > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                          {part.stock} in stock
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg">{part.name}</h3>
                      <p className="font-mono text-xl text-slate-900 mt-2 font-bold">${part.price.toFixed(2)}</p>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(part)}
                      disabled={part.stock === 0}
                      className="mt-5 w-full py-2.5 bg-slate-50 text-indigo-600 font-bold rounded-xl border border-slate-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={18} /> Add to Invoice
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Cart & Checkout */}
            <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[calc(100vh-8rem)] lg:sticky top-0">
              
              <div className="p-6 border-b border-slate-100 bg-slate-50 rounded-t-2xl">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                  <UserPlus size={18} className="text-indigo-600" /> Customer Details
                </h3>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Customer Name" 
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm font-medium"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number (Optional)" 
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <ShoppingCart size={48} className="mb-4 text-slate-200" />
                    <p className="font-medium text-slate-500">Invoice is empty</p>
                    <p className="text-sm">Scan or search parts to add</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                        <div className="font-mono text-indigo-600 text-sm font-bold mt-1">${item.price.toFixed(2)}</div>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded text-slate-600 font-bold">-</button>
                        <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded text-slate-600 font-bold">+</button>
                      </div>
                      
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Totals & Checkout */}
              <div className="p-6 bg-slate-900 rounded-b-2xl text-slate-300">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {isLoyaltyEligible && (
                    <div className="flex justify-between text-sm items-center bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                      <span className="text-emerald-400 flex items-center gap-1.5 font-bold"><Tag size={14}/> Loyalty Discount (10%)</span>
                      <span className="font-mono font-bold text-emerald-400">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Tax (8%)</span>
                    <span className="font-mono font-bold text-white">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-700 flex justify-between items-end">
                    <span className="text-sm font-medium">Total Amount</span>
                    <span className="font-mono text-3xl font-bold text-white tracking-tight">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || !customerInfo.name}
                  className="w-full py-4 bg-indigo-500 text-white font-bold text-lg rounded-xl flex justify-center items-center gap-2 hover:bg-indigo-400 transition shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <CreditCard size={22} /> Process Payment
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

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

export default SalesInvoice;
