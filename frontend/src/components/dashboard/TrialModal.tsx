"use client";
import { useState, useEffect } from "react";
import { Sparkles, Check, X } from "lucide-react";

export default function TrialModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Open modal shortly after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="text-center mt-4">
          <div className="flex justify-center mb-4 text-brand-purple">
            <Sparkles size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Congratulations,</h2>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">You are eligible for a 7 day trial</h2>
          
          <p className="text-gray-500 text-sm mb-8">
            Your account will be upgraded to the <span className="font-semibold text-gray-700">Business plan</span>
          </p>

          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-left mb-10 max-w-sm mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Check size={16} className="text-brand-purple shrink-0" />
              <span>Unlimited AI summaries</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Check size={16} className="text-brand-purple shrink-0" />
              <span>Video recording</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Check size={16} className="text-brand-purple shrink-0" />
              <span>Unlimited Storage</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Check size={16} className="text-brand-purple shrink-0" />
              <span>Conversation Intelligence</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Check size={16} className="text-brand-purple shrink-0" />
              <span>Download transcript, audio & video</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Check size={16} className="text-brand-purple shrink-0" />
              <span>API access</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => setIsOpen(false)}
              className="bg-brand-purple hover:bg-brand-purple-hover text-white w-full max-w-sm py-3 rounded-lg font-medium transition-colors"
            >
              Start your 7-day free trial
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 text-sm hover:text-gray-600 font-medium"
            >
              No thanks
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
