"use client";

import { Search, Bell, Video, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CaptureModal from "./CaptureModal";
import CaptureSuccessModal from "./CaptureSuccessModal";

export default function TopNav() {
  const pathname = usePathname();
  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [capturedMeetingId, setCapturedMeetingId] = useState<number | null>(null);

  // Hide TopNav on individual meeting detail pages
  if (pathname.startsWith("/meetings/")) return null;

  const getBreadcrumbs = () => {
    if (pathname === "/home") return "Home";
    if (pathname === "/meeting-prep") return "← Home / Meeting Prep";
    if (pathname === "/ai-skills/daily-brief") return "← Home / AI Skills / Daily Brief";
    if (pathname === "/tasks") return "Tasks";
    if (pathname === "/askfred") return "AskFred";
    if (pathname === "/meetings") return "Meetings";
    return "Home";
  };

  const breadcrumbs = getBreadcrumbs();
  
  const handleCaptureSuccess = (meetingId: number) => {
    setIsCaptureModalOpen(false);
    setCapturedMeetingId(meetingId);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full z-20 shrink-0 select-none">
      {/* Main Nav Bar */}
      <header className="h-14 bg-white border-b border-gray-200/90 flex items-center justify-between px-4">
        
        {/* Left: Title + Search */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {breadcrumbs && (
            <div className="font-semibold text-gray-800 text-[14px] shrink-0 pl-1">
              {breadcrumbs}
            </div>
          )}

          <div className="relative max-w-[340px] w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Search by title or keyword" 
              className="w-full bg-[#f4f5f7] border border-transparent rounded-lg py-1.5 pl-9 pr-10 text-[13px] text-gray-700 focus:outline-none focus:bg-white focus:border-[#7b52f6] focus:ring-1 focus:ring-[#7b52f6] transition-all placeholder-gray-400"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center text-gray-400 text-[11px] font-sans font-medium">
              ⌘K
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Free Meetings Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-gray-50 border border-gray-200/80 px-2.5 py-1 rounded-full text-[12px] text-gray-600 font-medium">
            <span className="w-4 h-4 bg-[#10a37f] text-white rounded-full flex items-center justify-center text-[9px] font-bold">2</span>
            <span>Free meetings</span>
          </div>

          {/* Upgrade Button */}
          <button className="hidden sm:block px-3 py-1 bg-[#ebfbf5] text-[#059669] border border-[#a7f3d0] hover:bg-[#d1fae5] rounded-md text-[13px] font-semibold transition-colors cursor-pointer">
            Upgrade
          </button>

          {/* Bell Notification with Red Dot */}
          <button className="text-gray-400 hover:text-gray-600 relative p-1.5 transition-colors cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {/* Purple Capture Button */}
          <button 
            onClick={() => setIsCaptureModalOpen(true)}
            className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-3.5 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Video size={15} /> Capture <ChevronDown size={14} />
          </button>
        </div>
      </header>

      {/* Capture Meeting Modal */}
      <CaptureModal 
        isOpen={isCaptureModalOpen} 
        onClose={() => setIsCaptureModalOpen(false)} 
        onSuccess={handleCaptureSuccess} 
      />
      
      {/* Capture Success Modal */}
      <CaptureSuccessModal 
        isOpen={isSuccessModalOpen} 
        meetingId={capturedMeetingId}
        onClose={() => setIsSuccessModalOpen(false)} 
      />
    </div>
  );
}
