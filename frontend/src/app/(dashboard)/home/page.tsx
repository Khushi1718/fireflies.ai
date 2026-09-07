import TrialModal from "@/components/dashboard/TrialModal";
import { Sparkles, Rss, Calendar, ListTodo, Download, MonitorSmartphone, Settings, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function HomeDashboard() {
  return (
    <div className="min-h-full pb-12 relative bg-white">
      <TrialModal />

      {/* Top Gradient Background */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-r from-[#cce0fc] via-[#fde4e1] to-[#ffe5cf] opacity-50 z-0 pointer-events-none"></div>

      <div className="relative z-10 px-8 pt-10 max-w-5xl">
        
        <div className="flex items-center justify-between mb-8">
           <h1 className="text-[26px] font-medium text-gray-800">Good Afternoon, Khushi ☀️</h1>
           <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
             <MessageSquare size={16} /> Feedback
           </button>
        </div>

        {/* Personal Assistant Section */}
        <div className="mb-12">
           <h2 className="text-lg font-bold text-gray-800 mb-4">Personal Assistant</h2>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/ai-skills/daily-brief" className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer block">
                 <div className="w-10 h-10 bg-[#7ba0ff] rounded-xl flex items-center justify-center text-white mb-4 shadow-sm">
                    <Rss size={20} />
                 </div>
                 <h3 className="font-semibold text-gray-800 mb-1 text-[15px]">Daily Brief</h3>
                 <p className="text-[13px] text-gray-400">No brief yet</p>
              </Link>

              <Link href="/meeting-prep" className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer block">
                 <div className="w-10 h-10 bg-[#ffa4b6] rounded-xl flex items-center justify-center text-white mb-4 shadow-sm">
                    <Calendar size={20} />
                 </div>
                 <h3 className="font-semibold text-gray-800 mb-1 text-[15px]">Meeting Prep</h3>
                 <p className="text-[13px] text-gray-400">No upcoming meetings</p>
              </Link>

              <Link href="/tasks" className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer block">
                 <div className="w-10 h-10 bg-[#a1e825] rounded-xl flex items-center justify-center text-white mb-4 shadow-sm">
                    <ListTodo size={20} />
                 </div>
                 <h3 className="font-semibold text-gray-800 mb-1 text-[15px]">Tasks</h3>
                 <p className="text-[13px] text-gray-400">0 New tasks</p>
              </Link>
           </div>
        </div>

        {/* Meetings Tabs */}
        <div className="mb-16">
           <div className="flex items-center justify-between mb-4 border-b border-gray-200">
              <div className="flex gap-6">
                 <button className="text-[13px] font-bold text-gray-800 border-b-2 border-[#5e43c9] pb-2">Recent</button>
                 <button className="text-[13px] font-medium text-gray-500 hover:text-gray-800 pb-2">Upcoming</button>
                 <button className="text-[13px] font-medium text-gray-500 hover:text-gray-800 pb-2">AI Feed</button>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 pb-2">
                 <Settings size={14} /> Settings
              </button>
           </div>

           <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg group cursor-pointer -ml-3">
              <div className="w-9 h-9 bg-[#6b21a8] rounded flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm mt-1">
                 K
              </div>
              <div>
                 <h4 className="font-semibold text-[13px] text-gray-800">khushidemo1</h4>
                 <p className="text-[11px] text-gray-400 mt-0.5">Sep 07 • 1:42 PM</p>
              </div>
           </div>

           <div className="text-center mt-8 mb-4">
              <span className="bg-[#f3e8ff] text-[#5e43c9] text-[11px] font-bold px-2.5 py-0.5 rounded">All caught up!</span>
           </div>
        </div>

        {/* Try More Section */}
        <div>
           <h2 className="text-lg font-bold text-gray-800 mb-4">Try More</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#f9fafb] rounded-xl p-6 border border-gray-100">
                 <div className="text-blue-400 mb-4">
                    <MonitorSmartphone size={28} strokeWidth={1.5} />
                 </div>
                 <h3 className="font-bold text-gray-800 text-[15px] mb-2">Desktop App</h3>
                 <p className="text-[13px] text-gray-500 leading-relaxed mb-6">Capture conversations without any bot present in your meeting.</p>
                 <button className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-5 py-2 rounded-md text-[13px] font-medium transition-colors flex items-center gap-2">
                    <Download size={16} /> Download
                 </button>
              </div>

              <div className="bg-[#f9fafb] rounded-xl p-6 border border-gray-100">
                 <div className="text-[#ff7eb3] mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                 </div>
                 <h3 className="font-bold text-gray-800 text-[15px] mb-2">Mobile App</h3>
                 <p className="text-[13px] text-gray-500 leading-relaxed mb-6">Record in-person conversations and review meetings on the go.</p>
                 <div className="flex gap-2">
                    <button className="bg-white border border-gray-200 p-1.5 rounded hover:bg-gray-50 transition-colors shadow-sm text-[#007aff] font-bold">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    </button>
                    <button className="bg-white border border-gray-200 p-1.5 rounded hover:bg-gray-50 transition-colors shadow-sm text-green-500 font-bold">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 lg:right-96 xl:right-96 w-10 h-10 bg-[#4c319e] hover:bg-[#3d2780] rounded-full text-white flex items-center justify-center shadow-lg transition-colors z-50">
         <span className="font-bold">?</span>
      </button>

    </div>
  );
}
