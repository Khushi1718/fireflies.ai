"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, Rss, Calendar, ListTodo, Download, MonitorSmartphone, 
  Settings, MessageSquare, Info, ChevronRight, CalendarCheck, Zap
} from "lucide-react";
import Link from "next/link";
import { MeetingDetail } from "@/lib/types";
import { meetingApi } from "@/services/meetingApi";

export default function HomeDashboard() {
  const [greeting, setGreeting] = useState<{ text: string; emoji: string }>({
    text: "Good Morning, Khushi",
    emoji: "🌤️",
  });
  const [recentMeeting, setRecentMeeting] = useState<MeetingDetail | null>(null);
  const [activeTab, setActiveTab] = useState<"recent" | "upcoming" | "aifeed">("recent");

  // Dynamic greeting based on exact client local time
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting({ text: "Good Morning, Khushi", emoji: "🌤️" });
      } else if (hour >= 12 && hour < 17) {
        setGreeting({ text: "Good Afternoon, Khushi", emoji: "☀️" });
      } else if (hour >= 17 && hour < 22) {
        setGreeting({ text: "Good Evening, Khushi", emoji: "🌆" });
      } else {
        setGreeting({ text: "Good Night, Khushi", emoji: "🌙" });
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch real most recent meeting for the Recent tab
  useEffect(() => {
    meetingApi.getMeetings()
      .then((data: MeetingDetail[]) => {
        if (data && data.length > 0) {
          setRecentMeeting(data[0]);
        }
      })
      .catch((e) => console.error("Failed to load meetings for home", e));
  }, []);

  const formatMeetingDate = (dateString?: string | null) => {
    if (!dateString) return "Sep 07 · 1:42 PM";
    let str = dateString;
    if (!str.includes("Z") && !str.includes("+") && !/T.*\d{2}-\d{2}/.test(str)) {
      str = str + "Z";
    }
    const d = new Date(str);
    if (isNaN(d.getTime())) return "Sep 07 · 1:42 PM";
    const m = d.toLocaleString("default", { month: "short" });
    const day = d.getDate().toString().padStart(2, "0");
    let hours = d.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const mins = d.getMinutes().toString().padStart(2, "0");
    return `${m} ${day} · ${hours}:${mins} ${ampm}`;
  };

  return (
    <div className="w-full min-h-full pb-24 relative bg-white select-none">
      
      {/* Top Gradient Mesh Header (Exact match to app.fireflies.ai) */}
      <div className="absolute top-0 left-0 right-0 h-[280px] bg-gradient-to-r from-[#dbeafe]/70 via-[#f3e8ff]/50 to-[#ffedd5]/60 pointer-events-none z-0"></div>

      <div className="relative z-10 px-8 pt-7 max-w-5xl">
        
        {/* Top Greeting Row */}
        <div className="flex items-center justify-between mb-7">
           <h1 className="text-[26px] font-semibold text-gray-900 tracking-tight flex items-center gap-2">
             {greeting.text} <span>{greeting.emoji}</span>
           </h1>
           <button className="flex items-center gap-1.5 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
             <MessageSquare size={15} /> Feedback
           </button>
        </div>

        {/* Personal Assistant Section */}
        <div className="mb-9">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-1.5 text-[14px] font-semibold text-gray-800">
               <Sparkles size={16} className="text-[#7b52f6]" />
               <span>Personal Assistant</span>
               <Info size={14} className="text-gray-400 cursor-pointer ml-0.5 hover:text-gray-600" />
             </div>
             <button className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-800 font-medium transition-colors cursor-pointer">
               <Settings size={14} /> Manage
             </button>
           </div>

           {/* 3 Personal Assistant Cards */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Daily Brief */}
              <Link 
                href="/ai-skills/daily-brief" 
                className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all cursor-pointer group block"
              >
                 <div className="w-10 h-10 bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] rounded-xl flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <Rss size={20} />
                 </div>
                 <h3 className="font-semibold text-gray-900 mb-0.5 text-[15px]">Daily Brief</h3>
                 <p className="text-[13px] text-gray-400">No brief yet</p>
              </Link>

              {/* Meeting Prep */}
              <Link 
                href="/meeting-prep" 
                className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all cursor-pointer group block"
              >
                 <div className="w-10 h-10 bg-gradient-to-br from-[#f472b6] to-[#fb7185] rounded-xl flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <Calendar size={20} />
                 </div>
                 <h3 className="font-semibold text-gray-900 mb-0.5 text-[15px]">Meeting Prep</h3>
                 <p className="text-[13px] text-gray-400">No upcoming meetings</p>
              </Link>

              {/* Tasks */}
              <Link 
                href="/tasks" 
                className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all cursor-pointer group block"
              >
                 <div className="w-10 h-10 bg-gradient-to-br from-[#a3e635] to-[#84cc16] rounded-xl flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <ListTodo size={20} />
                 </div>
                 <h3 className="font-semibold text-gray-900 mb-0.5 text-[15px]">Tasks</h3>
                 <p className="text-[13px] text-gray-400">0 New tasks</p>
              </Link>
           </div>
        </div>

        {/* Meetings Tabs Section */}
        <div className="mb-12">
           <div className="flex items-center justify-between mb-4 border-b border-gray-100">
              <div className="flex gap-2">
                 <button 
                   onClick={() => setActiveTab("recent")}
                   className={`text-[13px] font-semibold pb-3 px-1 transition-colors relative cursor-pointer ${
                     activeTab === "recent" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                   }`}
                 >
                   Recent
                   {activeTab === "recent" && (
                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7b52f6] rounded-full"></div>
                   )}
                 </button>
                 <button 
                   onClick={() => setActiveTab("upcoming")}
                   className={`text-[13px] font-medium pb-3 px-3 transition-colors relative cursor-pointer ${
                     activeTab === "upcoming" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                   }`}
                 >
                   Upcoming
                   {activeTab === "upcoming" && (
                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7b52f6] rounded-full"></div>
                   )}
                 </button>
                 <button 
                   onClick={() => setActiveTab("aifeed")}
                   className={`text-[13px] font-medium pb-3 px-3 transition-colors relative cursor-pointer ${
                     activeTab === "aifeed" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                   }`}
                 >
                   AI Feed
                   {activeTab === "aifeed" && (
                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7b52f6] rounded-full"></div>
                   )}
                 </button>
              </div>

              <button className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-gray-800 pb-3 transition-colors cursor-pointer">
                 <Settings size={13} /> Settings
              </button>
           </div>

           {/* Tab Content */}
           {activeTab === "recent" && (
             <div>
               {recentMeeting ? (
                 <Link 
                   href={`/meetings/${recentMeeting.id}`}
                   className="flex items-center justify-between p-3.5 hover:bg-gray-50/80 rounded-xl transition-colors group cursor-pointer -mx-2 border border-transparent hover:border-gray-100"
                 >
                    <div className="flex items-center gap-3.5">
                       <div className="w-9 h-9 bg-[#6b21a8] rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm uppercase">
                          {recentMeeting.title.charAt(0)}
                       </div>
                       <div>
                          <h4 className="font-semibold text-[13px] text-gray-900 group-hover:text-[#7b52f6] transition-colors">
                            {recentMeeting.title}
                          </h4>
                          <p className="text-[12px] text-gray-400 mt-0.5">
                            {formatMeetingDate(recentMeeting.meeting_date)}
                          </p>
                       </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                 </Link>
               ) : (
                 <div className="flex items-center gap-3.5 p-3.5 -mx-2">
                    <div className="w-9 h-9 bg-[#6b21a8] rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                       K
                    </div>
                    <div>
                       <h4 className="font-semibold text-[13px] text-gray-900">khushidemo1</h4>
                       <p className="text-[12px] text-gray-400 mt-0.5">Sep 07 · 1:42 PM</p>
                    </div>
                 </div>
               )}

               {/* All caught up pill */}
               <div className="text-center mt-5 mb-2">
                  <span className="bg-[#f3e8ff] text-[#7b52f6] text-[11px] font-bold px-3 py-1 rounded-full">
                    All caught up!
                  </span>
               </div>
             </div>
           )}

           {activeTab === "upcoming" && (
             <div className="py-8 text-center bg-gray-50/60 rounded-xl border border-gray-100">
                <CalendarCheck size={28} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm font-semibold text-gray-700">No upcoming meetings scheduled</p>
                <p className="text-xs text-gray-400 mt-1">Connect your Google Calendar or Outlook to auto-sync meetings</p>
             </div>
           )}

           {activeTab === "aifeed" && (
             <div className="py-8 text-center bg-gray-50/60 rounded-xl border border-gray-100">
                <Zap size={28} className="mx-auto text-purple-400 mb-2" />
                <p className="text-sm font-semibold text-gray-700">No AI Feed updates yet</p>
                <p className="text-xs text-gray-400 mt-1">Key takeaways, decisions, and intelligence updates will appear here</p>
             </div>
           )}
        </div>

        {/* Try More Section */}
        <div>
           <h2 className="text-[16px] font-bold text-gray-900 mb-4">Try More</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Desktop App */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
                 <div>
                   <div className="text-blue-500 mb-4">
                      <MonitorSmartphone size={26} strokeWidth={1.8} />
                   </div>
                   <h3 className="font-bold text-gray-900 text-[15px] mb-1.5">Desktop App</h3>
                   <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                     Capture conversations without any bot present in your meeting.
                   </p>
                 </div>
                 <button className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-colors flex items-center gap-2 w-fit shadow-sm cursor-pointer">
                    <Download size={15} /> Download
                 </button>
              </div>

              {/* Mobile App */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
                 <div>
                   <div className="text-pink-500 mb-4">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                   </div>
                   <h3 className="font-bold text-gray-900 text-[15px] mb-1.5">Mobile App</h3>
                   <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                     Record in-person conversations and review meetings on the go.
                   </p>
                 </div>
                 <div className="flex items-center gap-2.5">
                    <button className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-gray-900 cursor-pointer" title="Apple App Store">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.86c.62-.75 1.04-1.8 0.93-2.86-.9.04-1.99.6-2.64 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.04-.5 2.66-1.25z"/></svg>
                    </button>
                    <button className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-gray-900 cursor-pointer" title="Google Play Store">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83.56-1.2 1.02-.69l9.31 9.31L4.02 21.19c-.46.51-1.02.14-1.02-.69zm11.75-8.38l2.67-2.67c.62-.62.62-1.63 0-2.25L14.75 4.53l-2.02 2.02 2.02 5.57zm0 0l-2.02 2.02 2.02 5.57 2.67-2.67c.62-.62.62-1.63 0-2.25l-2.67-2.67z"/></svg>
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>

    </div>
  );
}
