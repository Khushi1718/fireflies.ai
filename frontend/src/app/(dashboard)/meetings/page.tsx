"use client";

import { useEffect, useState, useMemo } from "react";
import { 
  Search, Filter, MessageSquare, Plus, Upload, Check, X, 
  Calendar, Clock, UserCheck, Tag, RotateCcw
} from "lucide-react";
import { MeetingRow } from "../../../components/library/MeetingRow";
import { MeetingDetail } from "../../../lib/types";
import { API_BASE } from "../../../services/meetingApi";
import { Portal } from "../../../components/common/Portal";

export default function MeetingsDashboard() {
  const [meetings, setMeetings] = useState<MeetingDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [channelSearch, setChannelSearch] = useState("");
  const [activeChannel, setActiveChannel] = useState<string>("my-meetings");
  const [customChannels, setCustomChannels] = useState<string[]>(["General", "Product"]);
  const [showNewChannelModal, setShowNewChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  
  // Filter tabs: Hosted by me vs Shared with me
  const [hostFilter, setHostFilter] = useState<"hosted" | "shared">("hosted");

  // Advanced Filters Dropdown
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const [filterParticipation, setFilterParticipation] = useState<"all" | "hosted" | "invited">("all");
  const [filterDateRange, setFilterDateRange] = useState<"all" | "today" | "7days" | "30days">("all");
  const [filterDuration, setFilterDuration] = useState<"all" | "short" | "medium" | "long">("all");

  const [selectAll, setSelectAll] = useState(false);

  // Fetch real meetings
  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const url = searchQuery.trim() 
        ? `${API_BASE}/meetings?q=${encodeURIComponent(searchQuery)}`
        : `${API_BASE}/meetings`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setMeetings(data);
      }
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchMeetings();
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Compute active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filterParticipation !== "all") count++;
    if (filterDateRange !== "all") count++;
    if (filterDuration !== "all") count++;
    return count;
  }, [filterParticipation, filterDateRange, filterDuration]);

  // Reset filters
  const resetFilters = () => {
    setFilterParticipation("all");
    setFilterDateRange("all");
    setFilterDuration("all");
  };

  // Filter meetings in memory
  const filteredMeetings = useMemo(() => {
    return meetings.filter((m) => {
      // Host tab filter
      if (hostFilter === "shared") {
        // Mock shared check
        if (m.user_id === 1) return false;
      }

      // Participation filter
      if (filterParticipation === "hosted" && m.user_id !== 1) return false;
      if (filterParticipation === "invited" && m.user_id === 1) return false;

      // Channel filter
      if (activeChannel === "voice") return false; // No voice meetings recorded yet
      if (activeChannel === "uploads") return false; // No manual uploads yet

      // Date Range filter
      if (filterDateRange !== "all" && m.meeting_date) {
        const meetingDate = new Date(m.meeting_date).getTime();
        const now = Date.now();
        const dayMs = 24 * 60 * 60 * 1000;
        if (filterDateRange === "today" && now - meetingDate > dayMs) return false;
        if (filterDateRange === "7days" && now - meetingDate > 7 * dayMs) return false;
        if (filterDateRange === "30days" && now - meetingDate > 30 * dayMs) return false;
      }

      // Duration filter
      if (filterDuration !== "all") {
        const dur = m.duration_seconds || 0;
        if (filterDuration === "short" && dur > 300) return false; // > 5 min
        if (filterDuration === "medium" && (dur < 300 || dur > 1800)) return false; // 5-30 min
        if (filterDuration === "long" && dur < 1800) return false; // > 30 min
      }

      return true;
    });
  }, [meetings, hostFilter, filterParticipation, activeChannel, filterDateRange, filterDuration]);

  // Format header date from the first meeting
  const headerDateString = useMemo(() => {
    if (filteredMeetings.length > 0 && filteredMeetings[0].meeting_date) {
      const d = new Date(filteredMeetings[0].meeting_date);
      const weekday = d.toLocaleString("en-US", { weekday: "short" });
      const month = d.toLocaleString("en-US", { month: "short" });
      const day = d.getDate();
      return `${weekday}, ${month} ${day}`;
    }
    return "Mon, Sep 7";
  }, [filteredMeetings]);

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannelName.trim()) return;
    const clean = newChannelName.trim().replace(/^#\s*/, "");
    setCustomChannels((prev) => [...prev, clean]);
    setNewChannelName("");
    setShowNewChannelModal(false);
  };

  return (
    <div className="flex h-full bg-white overflow-hidden select-none">
      
      {/* Secondary Sidebar */}
      <div className="w-[240px] bg-[#fcfaff] border-r border-gray-200/90 shrink-0 flex flex-col hidden md:flex overflow-y-auto [scrollbar-width:none]">
        
        {/* Search Channels Input */}
        <div className="p-3.5 flex items-center">
           <div className="relative w-full">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search channels" 
                value={channelSearch}
                onChange={(e) => setChannelSearch(e.target.value)}
                className="bg-white border border-gray-200/80 rounded-lg py-1.5 pl-8 pr-3 text-[13px] w-full focus:outline-none focus:border-[#7b52f6] focus:ring-1 focus:ring-[#7b52f6] transition-all placeholder-gray-400 shadow-sm" 
              />
           </div>
        </div>

        {/* Primary Channel Navigation */}
        <nav className="px-2.5 space-y-0.5">
           <button 
             onClick={() => setActiveChannel("my-meetings")}
             className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors cursor-pointer ${
               activeChannel === "my-meetings" 
                 ? "bg-[#ede8f7] text-[#5e43c9] font-semibold" 
                 : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
             }`}
           >
              <span className="font-bold text-[15px]">#</span> 
              <span>My Meetings</span>
           </button>

           <button 
             onClick={() => setActiveChannel("all")}
             className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors cursor-pointer ${
               activeChannel === "all" 
                 ? "bg-[#ede8f7] text-[#5e43c9] font-semibold" 
                 : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
             }`}
           >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg> 
              <span>All Meetings</span>
           </button>

           <button 
             onClick={() => setActiveChannel("voice")}
             className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors cursor-pointer ${
               activeChannel === "voice" 
                 ? "bg-[#ede8f7] text-[#5e43c9] font-semibold" 
                 : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
             }`}
           >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <path d="M9 9h6v6H9z"></path>
              </svg>
              <span>Voice Agent Meetings</span>
           </button>

           <button 
             onClick={() => setActiveChannel("uploads")}
             className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors cursor-pointer ${
               activeChannel === "uploads" 
                 ? "bg-[#ede8f7] text-[#5e43c9] font-semibold" 
                 : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
             }`}
           >
              <div className="flex items-center gap-2.5">
                 <Upload size={16} /> 
                 <span>Uploads</span>
              </div>
              <span className="text-[10px] font-bold text-[#10a37f] bg-[#ebfbf5] border border-emerald-100 px-1.5 py-0.2 rounded">
                NEW
              </span>
           </button>
        </nav>

        {/* All channels section */}
        <div className="mt-7 px-5">
           <h4 className="font-semibold text-gray-700 text-[13px] mb-3.5">All channels</h4>
           
           {customChannels.length > 0 && (
             <div className="space-y-1 mb-4">
                {customChannels
                  .filter((ch) => ch.toLowerCase().includes(channelSearch.toLowerCase()))
                  .map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setActiveChannel(ch)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                        activeChannel === ch ? "bg-purple-50 text-[#7b52f6] font-semibold" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-gray-400 font-bold">#</span>
                      <span className="truncate">{ch}</span>
                    </button>
                  ))}
             </div>
           )}

           <div className="text-center pt-2">
              <div className="text-[#ffb7e6] text-3xl font-light mb-1.5">#</div>
              <p className="text-[12px] text-gray-500 mb-3 px-1 leading-snug">
                Create channels to organize your conversations
              </p>
              
              <button 
                onClick={() => setShowNewChannelModal(true)}
                className="flex items-center justify-center gap-1.5 w-full py-1.5 border border-gray-200 bg-white rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
              >
                 <Plus size={14} /> Channel
              </button>
           </div>
        </div>
      </div>

      {/* Main Meetings Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white overflow-y-auto [scrollbar-width:thin]">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0 sticky top-0 bg-white z-20">
           <div className="flex items-center gap-3">
              <div className="flex rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-white">
                 <button 
                   onClick={() => setHostFilter("hosted")}
                   className={`px-3.5 py-1.5 text-[13px] font-medium transition-colors cursor-pointer ${
                     hostFilter === "hosted" 
                       ? "bg-white text-gray-900 font-semibold shadow-sm" 
                       : "text-gray-500 hover:text-gray-800 bg-gray-50/50"
                   }`}
                 >
                   Hosted by me
                 </button>
                 <button 
                   onClick={() => setHostFilter("shared")}
                   className={`px-3.5 py-1.5 text-[13px] font-medium border-l border-gray-200 transition-colors cursor-pointer ${
                     hostFilter === "shared" 
                       ? "bg-white text-gray-900 font-semibold shadow-sm" 
                       : "text-gray-500 hover:text-gray-800 bg-gray-50/50"
                   }`}
                 >
                   Shared with me
                 </button>
              </div>

              {/* Filters Button */}
              <div className="relative">
                <button 
                  onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
                  className={`px-3.5 py-1.5 border rounded-lg text-[13px] font-medium flex items-center gap-2 shadow-sm transition-colors cursor-pointer ${
                    activeFiltersCount > 0 
                      ? "border-[#7b52f6] text-[#7b52f6] bg-purple-50/50" 
                      : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                  }`}
                >
                   <Filter size={14} /> 
                   <span>Filters</span>
                   {activeFiltersCount > 0 && (
                     <span className="w-5 h-5 rounded-full bg-[#7b52f6] text-white text-[10px] font-bold flex items-center justify-center">
                       {activeFiltersCount}
                     </span>
                   )}
                </button>

                {/* Filters Dropdown Menu */}
                {showFiltersDropdown && (
                  <div className="absolute left-0 top-11 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-40 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                       <span className="font-bold text-sm text-gray-800">Filter Meetings</span>
                       {activeFiltersCount > 0 && (
                         <button 
                           onClick={resetFilters}
                           className="text-xs text-[#7b52f6] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                         >
                           <RotateCcw size={11} /> Reset
                         </button>
                       )}
                    </div>

                    <div className="mb-3.5">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                         Host & Attendance
                       </label>
                       <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
                          {(["all", "hosted", "invited"] as const).map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setFilterParticipation(opt)}
                              className={`py-1 rounded-lg text-[11px] font-medium capitalize transition-colors cursor-pointer ${
                                filterParticipation === opt 
                                  ? "bg-white text-[#7b52f6] shadow-sm font-semibold" 
                                  : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              {opt === "all" ? "All" : opt === "hosted" ? "Hosted" : "Invited"}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="mb-3.5">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                         Date Range
                       </label>
                       <div className="grid grid-cols-2 gap-1.5">
                          {[
                            { id: "all", label: "All Time" },
                            { id: "today", label: "Today" },
                            { id: "7days", label: "Last 7 Days" },
                            { id: "30days", label: "Last 30 Days" },
                          ].map((d) => (
                            <button
                              key={d.id}
                              onClick={() => setFilterDateRange(d.id as any)}
                              className={`px-2.5 py-1.5 rounded-lg text-[11px] border text-left transition-colors cursor-pointer ${
                                filterDateRange === d.id 
                                  ? "border-[#7b52f6] bg-purple-50 text-[#7b52f6] font-semibold" 
                                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              {d.label}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="mb-4">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                         Duration
                       </label>
                       <div className="grid grid-cols-2 gap-1.5">
                          {[
                            { id: "all", label: "Any Duration" },
                            { id: "short", label: "< 5 mins" },
                            { id: "medium", label: "5 - 30 mins" },
                            { id: "long", label: "> 30 mins" },
                          ].map((dur) => (
                            <button
                              key={dur.id}
                              onClick={() => setFilterDuration(dur.id as any)}
                              className={`px-2.5 py-1.5 rounded-lg text-[11px] border text-left transition-colors cursor-pointer ${
                                filterDuration === dur.id 
                                  ? "border-[#7b52f6] bg-purple-50 text-[#7b52f6] font-semibold" 
                                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              {dur.label}
                            </button>
                          ))}
                       </div>
                    </div>

                    <button 
                      onClick={() => setShowFiltersDropdown(false)}
                      className="w-full bg-[#7b52f6] hover:bg-[#6742d1] text-white py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Apply Filters
                    </button>
                  </div>
                )}
              </div>
           </div>
           
           <div className="relative">
              <div className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                 <Search size={14} />
              </div>
           </div>
        </div>

        {/* Meeting List Section */}
        <div className="p-6 flex-1 max-w-5xl">
           
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                 <input 
                   type="checkbox" 
                   checked={selectAll}
                   onChange={(e) => setSelectAll(e.target.checked)}
                   className="w-4 h-4 rounded border-gray-300 text-[#7b52f6] focus:ring-[#7b52f6] cursor-pointer" 
                 />
                 <span className="text-[13px] text-gray-700 font-semibold">
                   {headerDateString}
                 </span>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                 <MessageSquare size={13} /> Feedback
              </button>
           </div>

           {/* Meeting Rows */}
           {loading ? (
             <div className="py-16 text-center text-gray-400 text-sm">
               Loading conversations...
             </div>
           ) : filteredMeetings.length === 0 ? (
             <div className="py-16 text-center bg-gray-50/60 rounded-2xl border border-gray-100 p-8 my-4">
               <p className="font-semibold text-gray-700 text-[14px]">No meetings found</p>
               <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                 {hostFilter === "shared" 
                   ? "No meetings have been shared with you yet." 
                   : "Try adjusting your filters or search keywords to find your conversations."}
               </p>
               {activeFiltersCount > 0 && (
                 <button 
                   onClick={resetFilters}
                   className="mt-3 text-xs text-[#7b52f6] font-semibold hover:underline cursor-pointer"
                 >
                   Clear all filters
                 </button>
               )}
             </div>
           ) : (
             <div className="flex flex-col gap-2.5 mb-8">
               {filteredMeetings.map((meeting) => (
                 <MeetingRow 
                   key={meeting.id} 
                   meeting={meeting} 
                   onDelete={(id) => setMeetings((prev) => prev.filter((m) => m.id !== id))}
                   onRename={(id, newTitle) => {
                     setMeetings((prev) => prev.map((m) => m.id === id ? { ...m, title: newTitle } : m));
                   }}
                 />
               ))}
             </div>
           )}

           <div className="text-center text-[13px] text-gray-400 py-10">
              You've reached the end of your meetings.
           </div>
        </div>

      </div>

      {/* Create New Channel Modal */}
      {showNewChannelModal && (
        <Portal>
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowNewChannelModal(false);
            }}
          >
            <div 
              className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="flex items-center justify-between mb-3">
                 <h3 className="font-bold text-[15px] text-gray-900">Create Channel</h3>
                 <button onClick={() => setShowNewChannelModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                   <X size={18} />
                 </button>
               </div>
               <form onSubmit={handleCreateChannel}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Channel Name</label>
                  <div className="relative mb-4">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">#</span>
                    <input 
                      type="text"
                      value={newChannelName}
                      onChange={(e) => setNewChannelName(e.target.value)}
                      placeholder="e.g. Sales, Team-Huddle"
                      className="w-full border border-gray-200 rounded-xl py-2 pl-7 pr-3 text-[13px] text-gray-800 focus:outline-none focus:border-[#7b52f6] focus:ring-1 focus:ring-[#7b52f6]"
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                     <button 
                       type="button" 
                       onClick={() => setShowNewChannelModal(false)}
                       className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                     >
                       Cancel
                     </button>
                     <button 
                       type="submit"
                       disabled={!newChannelName.trim()}
                       className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                     >
                       Create Channel
                     </button>
                  </div>
               </form>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}


