"use client";

import { Sparkles, Check, X } from "lucide-react";
import { useSidebar } from "@/lib/SidebarContext";
import { usePathname } from "next/navigation";
import { Portal } from "../common/Portal";

export default function TrialModal() {
  const { showTrialModal, setShowTrialModal } = useSidebar();
  const pathname = usePathname();

  // Only show on home page when enabled
  if (!showTrialModal || pathname !== "/home") return null;

  return (
    <Portal>
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowTrialModal(false);
          }
        }}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-in zoom-in-95 duration-200 border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={() => setShowTrialModal(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
            aria-label="Close trial modal"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="text-center mt-2">
            <div className="flex justify-center mb-4 text-[#7b52f6]">
              <Sparkles size={36} />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Congratulations,</h2>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">You are eligible for a 7 day trial</h2>
            
            <p className="text-gray-500 text-sm mb-8">
              Your account will be upgraded to the <span className="font-semibold text-gray-800">Business plan</span>
            </p>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-left mb-9 max-w-md mx-auto">
              <div className="flex items-center gap-2.5 text-[13px] text-gray-700">
                <Check size={16} className="text-[#7b52f6] shrink-0" strokeWidth={2.5} />
                <span>Unlimited AI summaries</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-700">
                <Check size={16} className="text-[#7b52f6] shrink-0" strokeWidth={2.5} />
                <span>Video recording</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-700">
                <Check size={16} className="text-[#7b52f6] shrink-0" strokeWidth={2.5} />
                <span>Unlimited Storage</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-700">
                <Check size={16} className="text-[#7b52f6] shrink-0" strokeWidth={2.5} />
                <span>Conversation Intelligence</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-700">
                <Check size={16} className="text-[#7b52f6] shrink-0" strokeWidth={2.5} />
                <span>Download transcript, audio & video</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-700">
                <Check size={16} className="text-[#7b52f6] shrink-0" strokeWidth={2.5} />
                <span>API access</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button 
                onClick={() => setShowTrialModal(false)}
                className="bg-[#6b21a8] hover:bg-[#581c87] text-white w-full max-w-sm py-3 rounded-xl font-semibold text-[14px] shadow-sm transition-colors cursor-pointer"
              >
                Start your 7-day free trial
              </button>
              <button 
                onClick={() => setShowTrialModal(false)}
                className="text-gray-400 text-[13px] hover:text-gray-600 font-medium py-1 transition-colors cursor-pointer"
              >
                No thanks
              </button>
            </div>

          </div>
        </div>
      </div>
    </Portal>
  );
}

