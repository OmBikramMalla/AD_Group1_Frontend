import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, Clock, Wrench, Search, 
  LayoutDashboard, User, History, Settings, CheckCircle, Car
} from "lucide-react";

function AppointmentBooking() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("appointment"); // appointment or parts
  const [isSuccess, setIsSuccess] = useState(false);

  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    vehicle: "Honda Civic 2019 (ABC-123)",
    serviceType: "Maintenance",
    notes: ""
  });

  const [partsData, setPartsData] = useState({
    partName: "",
    vehicleMake: "",
    description: ""
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setBookingData({ ...bookingData, date: "", time: "", notes: "" });
    }, 3000);
  };

  const handlePartsSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setPartsData({ partName: "", vehicleMake: "", description: "" });
    }, 3000);
  };

  return (
    <>
        
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Booking & Requests</h2>
            <p className="text-sm text-slate-500 mt-1">Schedule services or request unavailable parts</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            
            {isSuccess && (
              <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm animate-in slide-in-from-top-4 duration-300">
                <CheckCircle className="text-emerald-500" size={28} />
                <div>
                  <p className="font-bold text-lg">Request Submitted Successfully!</p>
                  <p className="text-sm text-emerald-600 mt-0.5">Our team will get back to you shortly to confirm your request.</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              
              <div className="flex border-b border-slate-200">
                <button 
                  onClick={() => setActiveTab('appointment')}
                  className={`flex-1 py-4 font-bold text-sm sm:text-base flex justify-center items-center gap-2 transition-colors ${
                    activeTab === 'appointment' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Calendar size={18} /> Book Appointment
                </button>
                <button 
                  onClick={() => setActiveTab('parts')}
                  className={`flex-1 py-4 font-bold text-sm sm:text-base flex justify-center items-center gap-2 transition-colors ${
                    activeTab === 'parts' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Search size={18} /> Request Specific Part
                </button>
              </div>

              <div className="p-6 sm:p-10">
                {activeTab === 'appointment' ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-6 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Car size={16} className="text-indigo-500"/> Select Vehicle</label>
                        <select 
                          value={bookingData.vehicle}
                          onChange={(e) => setBookingData({...bookingData, vehicle: e.target.value})}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                          <option value="Honda Civic 2019 (ABC-123)">Honda Civic 2019 (ABC-123)</option>
                          <option value="Register New Vehicle">+ Register New Vehicle...</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Wrench size={16} className="text-indigo-500"/> Service Type</label>
                        <select 
                          value={bookingData.serviceType}
                          onChange={(e) => setBookingData({...bookingData, serviceType: e.target.value})}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                          <option value="Maintenance">General Maintenance</option>
                          <option value="Repair">Mechanical Repair</option>
                          <option value="Inspection">Vehicle Inspection</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Calendar size={16} className="text-indigo-500"/> Preferred Date</label>
                        <input 
                          type="date" 
                          required
                          value={bookingData.date}
                          onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Clock size={16} className="text-indigo-500"/> Preferred Time</label>
                        <input 
                          type="time" 
                          required
                          value={bookingData.time}
                          onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-slate-700">Additional Notes / Symptoms</label>
                        <textarea 
                          rows="4" 
                          placeholder="Please describe any issues or specific requests..."
                          value={bookingData.notes}
                          onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        ></textarea>
                      </div>

                    </div>
                    
                    <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20">
                      Confirm Appointment Request
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handlePartsSubmit} className="space-y-6 animate-in fade-in duration-300">
                    
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6">
                      <p className="text-sm text-amber-800 font-medium">
                        Can't find a part in our standard inventory? Fill out this form and our sourcing team will locate it for you.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Part Name or Number</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. V8 Alternator 2019"
                          value={partsData.partName}
                          onChange={(e) => setPartsData({...partsData, partName: e.target.value})}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Vehicle Make / Model</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Ford Mustang"
                          value={partsData.vehicleMake}
                          onChange={(e) => setPartsData({...partsData, vehicleMake: e.target.value})}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-slate-700">Detailed Description</label>
                        <textarea 
                          rows="4" 
                          required
                          placeholder="Please provide any relevant details, engine type, or specific requirements..."
                          value={partsData.description}
                          onChange={(e) => setPartsData({...partsData, description: e.target.value})}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        ></textarea>
                      </div>
                    </div>
                    
                    <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20">
                      Submit Part Request
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
    </>
  );
}



export default AppointmentBooking;
