"use client";

import { Check, Video, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { Portal } from "../common/Portal";

export default function CaptureSuccessModal({ isOpen, meetingId, onClose }: { isOpen: boolean, meetingId: number | null, onClose: () => void }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleOpenMeeting = () => {
    if (meetingId) {
      router.push(`/live/${meetingId}`);
    }
    onClose();
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-2xl w-[500px] max-w-[90vw] flex flex-col items-center p-8 animate-in zoom-in-95 duration-200 border border-gray-100">
          
          <div className="w-16 h-16 bg-[#00a67e] rounded-full flex items-center justify-center text-white mb-5 shadow-md">
            <Check size={32} strokeWidth={3} />
          </div>

          <h2 className="text-xl font-bold text-gray-800 text-center mb-3">
            Fireflies assistant has been invited to the meeting
          </h2>
          
          {/* Subheading notification */}
          <div className="bg-purple-50 border border-purple-200/80 rounded-xl p-3 text-[13px] text-[#5b21b6] text-center mb-6 max-w-sm font-medium">
            <strong>Action Required:</strong> Please admit the <strong>fireflies.ai bot</strong> into your meeting when it requests to join so it can record and transcribe.
          </div>

          <button 
            onClick={handleOpenMeeting}
            className="border border-gray-200 hover:border-[#7b52f6] shadow-sm rounded-xl px-6 py-2.5 flex items-center gap-2 mb-6 transition-colors group cursor-pointer"
          >
            <div className="flex -space-x-1">
               <div className="w-6 h-6 rounded flex items-center justify-center"><Video size={16} className="text-blue-500" /></div>
               <div className="w-6 h-6 rounded bg-[#7b52f6] flex items-center justify-center relative -ml-1 border border-white z-10"><span className="text-[8px] text-white font-bold">FF</span></div>
            </div>
            <span className="text-[14px] font-semibold text-[#5e43c9] group-hover:text-[#4b33a8]">Open meeting</span>
          </button>

          <div className="flex gap-3 bg-gray-50 p-4 rounded-xl text-[12px] text-gray-500 w-full text-left border border-gray-100">
             <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
             <p>Fireflies needs to stay inside the meeting for at least 3 minutes to process the meeting transcript. <br/><br/>
             <a href="https://fireflies.ai/privacy-policy" target="_blank" rel="noreferrer" className="text-[#5e43c9] hover:underline cursor-pointer">View Realtime Notes & Privacy Policy</a></p>
          </div>

        </div>
      </div>
    </Portal>
  );
}

