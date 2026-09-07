import { Sparkles, LayoutGrid, Compass, Search, Lock, Clock, Plus, ArrowRight, Calendar } from "lucide-react";

export default function DailyBriefPage() {
  return (
    <div className="flex h-full min-h-screen bg-white">
      
      {/* Secondary Sidebar */}
      <div className="w-[260px] bg-[#fcfaff] border-r border-gray-200 shrink-0 flex flex-col hidden md:flex">
        
        <nav className="p-3 space-y-1 mt-2">
           <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-[13px] font-medium transition-colors">
              <Sparkles size={16} /> Feed
           </button>
           <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-[13px] font-medium transition-colors">
              <LayoutGrid size={16} /> Manage Skills
           </button>
           <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-[13px] font-medium transition-colors">
              <Compass size={16} /> Discover
           </button>
        </nav>

        <div className="p-3 border-y border-gray-100 my-2 relative">
           <Search size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
           <input type="text" placeholder="Search Skills" className="w-full bg-transparent pl-8 text-[13px] placeholder-gray-400 focus:outline-none text-gray-800" />
        </div>

        <div className="px-3 pt-2">
           <div className="flex items-center justify-between px-3 mb-2">
              <h4 className="text-[12px] font-medium text-gray-400">Recent (1)</h4>
              <button className="text-gray-400 hover:text-gray-600">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"></path></svg>
              </button>
           </div>
           
           <button className="w-full flex items-center gap-3 px-3 py-2 bg-white shadow-sm border border-gray-100 rounded-md text-[13px] font-medium text-gray-800 transition-colors">
              <Sparkles size={16} className="text-[#ff7eb3] fill-[#ff7eb3]" /> Daily Brief
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        
        {/* Header */}
        <div className="h-24 bg-[#f8f5ff] w-full border-b border-gray-100"></div>
        
        <div className="px-10 -mt-6">
           <div className="w-12 h-12 bg-[#c4b5fd] rounded-xl flex items-center justify-center text-white mb-4 border-2 border-white shadow-sm">
              <Sparkles size={24} fill="currentColor" />
           </div>

           <div className="flex items-center gap-3 mb-3">
              <h1 className="text-[22px] font-medium text-gray-900">Daily Brief</h1>
              <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">PRODUCTIVITY</span>
           </div>

           <div className="flex items-center gap-4 text-[13px] text-gray-500 mb-8">
              <div className="flex items-center gap-1.5">
                 <div className="w-5 h-5 bg-[#6b21a8] rounded flex items-center justify-center text-white font-bold text-[10px]">K</div>
                 Khushi Nain
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                 <Lock size={14} /> Only me
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                 <Clock size={14} /> Daily
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                 <Lock size={14} /> Only me
              </div>
           </div>

           {/* Connect Banner */}
           <div className="bg-[#fcfaff] border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm max-w-3xl mb-8">
              <div className="flex items-center gap-4">
                 <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm z-10"><span className="text-[12px] font-bold text-red-500">M</span></div>
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm"><span className="text-[12px] font-bold text-blue-500">S</span></div>
                 </div>
                 <p className="text-[13px] text-gray-800">
                    <span className="font-bold">Connect Slack and Gmail</span> — include context from your Slack & inbox.
                 </p>
              </div>
              <button className="text-[#5e43c9] text-[13px] font-semibold flex items-center gap-1 hover:underline">
                 Connect <ArrowRight size={14} />
              </button>
           </div>

           {/* Dropdown */}
           <button className="flex items-center gap-2 text-[13px] text-[#5e43c9] font-medium">
              <Calendar size={16} /> This Month <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"></path></svg>
           </button>
        </div>

      </div>

    </div>
  );
}
