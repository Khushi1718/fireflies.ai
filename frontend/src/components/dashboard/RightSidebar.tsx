"use client";
import { Sparkles, MoreHorizontal, Plus, SquareStack, Check, Mic, ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

export default function RightSidebar() {
  const pathname = usePathname();
  const hiddenRoutes = ["/askfred", "/meeting-prep", "/ai-skills/daily-brief", "/tasks"];
  if (hiddenRoutes.includes(pathname)) return null;

  return (
    <aside className="w-80 bg-white border-l border-gray-200 h-screen sticky top-0 right-0 flex flex-col z-20 hidden xl:flex">
      
      {/* Header */}
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center text-brand-purple">
            <Sparkles size={12} />
          </div>
          <span className="text-sm font-semibold text-brand-purple">AskFred</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <button className="hover:text-gray-600"><MoreHorizontal size={16} /></button>
          <button className="hover:text-gray-600"><Plus size={16} /></button>
          <button className="hover:text-gray-600"><SquareStack size={16} /></button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col">
        
        {/* Meetings Specific Popup */}
        {pathname === "/meetings" && (
          <div className="bg-white border border-gray-100 rounded-xl p-3 mb-6 shadow-sm relative">
             <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
             <div className="flex items-start gap-2 mb-3">
                <div className="flex -space-x-2">
                   <div className="w-6 h-6 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm z-10"><span className="text-[10px] font-bold text-red-500">M</span></div>
                   <div className="w-6 h-6 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm"><span className="text-[10px] font-bold text-blue-500">S</span></div>
                </div>
                <div className="flex-1">
                   <p className="text-[12px] text-gray-800 leading-snug pr-4">
                      <span className="font-bold">Connect Slack and Gmail</span> — get answers with full context.
                   </p>
                </div>
             </div>
             <div className="flex justify-end">
                <button className="text-[#5e43c9] text-[13px] font-medium hover:underline">Connect</button>
             </div>
          </div>
        )}

        <div className="text-[#3fd5a3] mb-4 mt-2">
           <Sparkles size={24} fill="currentColor" />
        </div>

        <h3 className="text-[17px] font-semibold text-gray-900 mb-1">Hi Khushi!</h3>
        <p className="text-[17px] font-semibold text-gray-800 mb-8">Get ready for your meeting</p>

        {/* Dynamic Suggestions based on route */}
        {pathname === "/meetings" ? (
           <div className="space-y-4">
              <button className="w-auto max-w-full text-left bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors rounded-xl px-4 py-2 flex items-center gap-3 text-[13px] text-gray-700">
                 <div className="bg-[#10a37f] text-white rounded-[4px] p-0.5 shrink-0"><Check size={12} strokeWidth={4} /></div>
                 My action items
              </button>
              <button className="w-auto max-w-full text-left bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors rounded-xl px-4 py-2.5 flex items-center gap-3 text-[13px] text-gray-700">
                 <span className="text-red-500 text-lg leading-none">🎯</span> Key decisions
              </button>
              <button className="w-auto max-w-full text-left bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors rounded-xl px-4 py-2.5 flex items-center gap-3 text-[13px] text-gray-700">
                 <span className="text-red-500 text-lg leading-none">📌</span> Key initiatives
              </button>
           </div>
        ) : (
           <div className="space-y-4">
              <button className="w-auto max-w-full text-left bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors rounded-xl px-4 py-2.5 flex items-center gap-3 text-[13px] text-gray-700">
                 <Sparkles size={16} className="text-yellow-400" fill="currentColor" /> What's my day looking like?
              </button>
              <button className="w-auto max-w-full text-left bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors rounded-xl px-4 py-2.5 flex items-center gap-3 text-[13px] text-gray-700">
                 <span className="text-red-500 font-bold text-lg leading-none">?</span> Pending tasks across all meetings
              </button>
              <button className="w-auto max-w-full text-left bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors rounded-xl px-4 py-2.5 flex items-start gap-3 text-[13px] text-gray-700">
                 <div className="bg-[#10a37f] text-white rounded-[4px] p-0.5 shrink-0 mt-0.5"><Check size={12} strokeWidth={4} /></div>
                 <span className="leading-tight">List out my action items from the past week</span>
              </button>
           </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white relative z-10 border-t-0">
        {pathname === "/meetings" && (
           <div className="mb-2 ml-1">
              <span className="bg-gray-100 text-gray-600 text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                 # My Meetings
              </span>
           </div>
        )}
        <div className="relative border border-gray-200 rounded-xl overflow-hidden focus-within:border-brand-purple focus-within:ring-1 focus-within:ring-brand-purple transition-all shadow-sm">
           <textarea 
             placeholder={pathname === "/meetings" ? "Ask anything. Type / to run AI skills." : "Type @ to mention"} 
             className="w-full h-24 p-3 text-[13px] resize-none focus:outline-none text-gray-800 placeholder-gray-400"
           ></textarea>
           <div className="absolute bottom-2 left-3 flex items-center gap-3 text-gray-400">
              <button className="hover:text-gray-600"><Plus size={16} /></button>
              <button className="hover:text-gray-600"><SquareStack size={16} /></button>
           </div>
           <div className="absolute bottom-2 right-2 flex items-center gap-3">
              <button className="text-gray-400 hover:text-gray-600"><Mic size={16} /></button>
              <button className="w-7 h-7 bg-[#e9d5ff] text-[#9333ea] rounded flex items-center justify-center transition-colors">
                 <ArrowUp size={16} />
              </button>
           </div>
        </div>
      </div>
    </aside>
  );
}
