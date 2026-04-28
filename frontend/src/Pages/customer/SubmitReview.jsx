import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Star, MessageSquare, LayoutDashboard, Calendar, History, 
  User, Settings, CheckCircle, ThumbsUp
} from "lucide-react";

function SubmitReview() {
  const location = useLocation();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return; // Basic validation
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setRating(0);
      setFeedback("");
    }, 4000);
  };

  return (
    <>
        
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Feedback & Reviews</h2>
            <p className="text-sm text-slate-500 mt-1">Tell us how we did on your last visit</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50 flex items-center justify-center">
          <div className="max-w-xl w-full">
            
            {isSuccess ? (
              <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-10 text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ThumbsUp size={40} className="text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Thank you for your feedback!</h3>
                <p className="text-slate-500">Your review has been submitted successfully. We appreciate you taking the time to help us improve our services.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition"
                >
                  Submit Another Review
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10"></div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Recent Service: Oil Change</h3>
                    <p className="text-sm text-slate-500">Service Date: Oct 12, 2023</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Star Rating System */}
                  <div className="text-center space-y-4 py-4">
                    <p className="text-lg font-bold text-slate-700">How would you rate your overall experience?</p>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-2 transition-transform hover:scale-110 focus:outline-none"
                        >
                          <Star 
                            size={40} 
                            className={`transition-colors ${
                              (hoverRating || rating) >= star 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'fill-transparent text-slate-200'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-amber-600 font-bold text-sm animate-in fade-in">
                        {rating === 1 && "Poor"}
                        {rating === 2 && "Fair"}
                        {rating === 3 && "Good"}
                        {rating === 4 && "Very Good"}
                        {rating === 5 && "Excellent!"}
                      </p>
                    )}
                  </div>

                  {/* Written Feedback */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">Additional Comments (Optional)</label>
                    <textarea 
                      rows="5"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="What did we do well? What could we improve?"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={rating === 0}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
    </>
  );
}



export default SubmitReview;
