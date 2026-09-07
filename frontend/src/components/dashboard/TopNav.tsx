"use client";
import Link from "next/link";
import { Search, Bell, Video, ChevronDown, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
     if (pathname === "/home") return "Home";
     if (pathname === "/meeting-prep") return "← Home / Meeting Prep";
     if (pathname === "/ai-skills/daily-brief") return "← Home / AI Skills / Daily Brief";
     if (pathname === "/tasks") return "Tasks";
     if (pathname === "/askfred") return "AskFred";
     if (pathname === "/meetings") return "Meetings";
     return "";
  };

  const breadcrumbs = getBreadcrumbs();
  
  return (
    <div className="flex flex-col w-full z-30 shrink-0">
      {/* Main Nav Bar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        
        {/* Left: Search */}
        <div className="flex items-center gap-4 flex-1">
          {breadcrumbs && (
             <div className="font-medium text-gray-700 text-[13px] w-auto pr-3 border-r border-gray-200 hidden md:block whitespace-nowrap">
                {breadcrumbs}
             </div>
          )}

          <div className="relative max-w-[280px] w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Search by title or keyword" 
              className="w-full bg-[#f3f4f6] border border-transparent rounded-md py-1.5 pl-9 pr-12 text-[13px] text-gray-700 focus:outline-none focus:bg-white focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all placeholder-gray-400"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400 text-[11px] font-medium tracking-widest">
              <span className="font-sans">⌘</span>K
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-5 h-5 bg-emerald-100 rounded flex items-center justify-center text-emerald-600 font-bold text-[10px]">2</div>
            <span className="text-[13px] text-gray-500 font-medium">Free meetings</span>
          </div>

          <button className="hidden sm:block px-3 py-1 bg-[#ebfbf5] text-emerald-600 border border-emerald-100 hover:bg-emerald-100 rounded text-[13px] font-semibold transition-colors">
            Upgrade
          </button>

          <button className="text-gray-400 hover:text-gray-600 relative">
            <Bell size={18} />
          </button>

          <button className="bg-brand-purple text-white px-3 py-1.5 rounded-md text-[13px] font-medium flex items-center gap-2 hover:bg-brand-purple-hover transition-colors">
            <Video size={14} /> Capture <ChevronDown size={14} />
          </button>
        </div>
      </header>
    </div>
  );
}
