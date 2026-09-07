import { Search, Filter, MessageSquare, Hash, Upload, Plus } from "lucide-react";

export default function MeetingsDashboard() {
  return (
    <div className="flex h-full min-h-screen bg-white">
      
      {/* Secondary Sidebar (Meetings Navigation) */}
      <div className="w-[240px] bg-[#fcfaff] border-r border-gray-200 shrink-0 flex flex-col hidden md:flex">
        <div className="p-4 flex items-center">
           <div className="relative w-full">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search channels" className="bg-white border border-transparent rounded py-1.5 pl-9 pr-3 text-[13px] w-full focus:outline-none focus:border-purple-300 focus:ring-1 focus:ring-purple-300 transition-all placeholder-gray-400 shadow-sm" />
           </div>
        </div>

        <nav className="px-3 space-y-0.5">
           <a href="#" className="flex items-center gap-3 px-3 py-2 bg-[#f4f0fa] text-[#5e43c9] rounded-md text-[13px] font-medium transition-colors">
              <span className="font-bold text-[15px]">#</span> My Meetings
           </a>
           <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-[13px] font-medium transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> 
              All Meetings
           </a>
           <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-[13px] font-medium transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><path d="M9 9h6v6H9z"></path></svg>
              Voice Agent Meetings
           </a>
           <a href="#" className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-[13px] font-medium transition-colors">
              <div className="flex items-center gap-3">
                 <Upload size={16} /> Uploads
              </div>
              <span className="text-[10px] font-bold text-[#10a37f] bg-[#ebfbf5] px-1.5 py-0.5 rounded">NEW</span>
           </a>
        </nav>

        <div className="mt-8 px-6">
           <h4 className="font-medium text-gray-700 text-[13px] mb-4">All channels</h4>
           
           <div className="text-center">
              <div className="text-[#ffb7e6] text-3xl font-light mb-2">#</div>
              <p className="text-[13px] text-gray-500 mb-4 px-2 leading-tight">Create channels to organize your conversations</p>
              
              <button className="flex items-center justify-center gap-1.5 w-full py-1.5 border border-gray-200 bg-white rounded-md text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                 <Plus size={14} /> Channel
              </button>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        
        {/* Meetings Toolbar */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
           <div className="flex gap-2">
              <div className="flex rounded-md shadow-sm">
                 <button className="px-4 py-1.5 border border-gray-200 rounded-l-md text-[13px] font-medium text-gray-700 bg-white z-10">Hosted by me</button>
                 <button className="px-4 py-1.5 border-t border-b border-r border-gray-200 rounded-r-md text-[13px] font-medium text-gray-500 bg-white hover:bg-gray-50 -ml-[1px]">Shared with me</button>
              </div>
              <button className="px-4 py-1.5 border border-gray-200 rounded-md text-[13px] font-medium text-gray-600 bg-white hover:bg-gray-50 flex items-center gap-2 shadow-sm">
                 <Filter size={14} /> Filters
              </button>
           </div>
           
           <div className="hidden md:block">
              <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                 <Search size={14} />
              </button>
           </div>
        </div>

        {/* Meeting List */}
        <div className="p-6">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                 <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-purple focus:ring-brand-purple" />
                 <span className="text-[13px] text-gray-600">Today</span>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600">
                 <MessageSquare size={14} /> Feedback
              </button>
           </div>

           <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 mb-24 cursor-pointer">
              <div className="mt-2.5">
                 <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-purple focus:ring-brand-purple" />
              </div>
              <div className="w-10 h-10 bg-[#6b21a8] rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm mt-0.5">
                 K
              </div>
              <div>
                 <h4 className="font-semibold text-[13px] text-gray-900 flex items-center gap-2">khushidemo1 <span className="text-gray-400 text-[10px]">&gt;</span></h4>
                 <p className="text-[13px] text-gray-500 mt-1">Sep 7 • 1:42 PM • 12 min • Khushi</p>
              </div>
           </div>

           <div className="text-center text-[13px] text-gray-500">
              You've reached the end of your meetings.
           </div>
        </div>

      </div>

    </div>
  );
}
