import { Plus, Search, Layers, Mic, ArrowUp, ChevronDown, Check, Sparkles, Wand2, Calendar } from "lucide-react";

export default function AskFredPage() {
  return (
    <div className="flex h-full min-h-screen">
      
      {/* Secondary Sidebar (AskFred Navigation) */}
      <div className="w-56 bg-white border-r border-gray-200 shrink-0 flex flex-col">
        <div className="h-14 p-4 border-b border-gray-100 flex items-center">
           <h2 className="font-semibold text-[15px] text-gray-800">AskFred</h2>
        </div>

        <nav className="p-3 space-y-1">
           <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md text-[13px] transition-colors">
              <Plus size={16} className="text-gray-500" /> New Chat
           </button>
           <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md text-[13px] transition-colors">
              <Search size={16} className="text-gray-500" /> Search
           </button>
           <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md text-[13px] transition-colors">
              <Layers size={16} className="text-gray-500" /> Connectors
           </button>
        </nav>

        <div className="mt-12 px-6 flex flex-col items-center text-center">
           {/* Abstract empty state blocks */}
           <div className="w-24 h-3 bg-gradient-to-r from-yellow-50 via-green-50 to-cyan-50 rounded-full mb-2 opacity-80 self-end mr-4"></div>
           <div className="w-32 h-8 bg-gray-50 rounded-md mb-6"></div>
           
           <h4 className="font-semibold text-gray-800 text-[13px] mb-1">No chats yet</h4>
           <p className="text-xs text-gray-500">Your chats will appear here once you start one.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white items-center pt-24 relative">
        
        <div className="w-full max-w-2xl px-6">
           <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
             Hi Khushi, how can I help today?
           </h1>

           {/* Input Box */}
           <div className="relative border border-[#a855f7] rounded-xl overflow-hidden shadow-sm bg-white mb-3">
              <textarea 
                placeholder="Ask anything, @ for context and / for skills" 
                className="w-full h-28 p-4 text-[15px] resize-none focus:outline-none text-gray-800 placeholder-gray-400"
              ></textarea>
              
              <div className="absolute bottom-3 left-4 flex items-center gap-3 text-gray-500">
                 <button className="hover:text-gray-700"><Plus size={18} strokeWidth={1.5} /></button>
                 <button className="hover:text-gray-700"><Layers size={18} strokeWidth={1.5} /></button>
              </div>
              
              <div className="absolute bottom-3 right-3 flex items-center gap-3">
                 <button className="text-[13px] font-medium text-gray-600 flex items-center gap-1 hover:text-gray-800">
                    Auto <ChevronDown size={14} />
                 </button>
                 <button className="text-gray-500 hover:text-gray-700"><Mic size={18} strokeWidth={1.5} /></button>
                 <button className="w-8 h-8 bg-[#e9d5ff] text-[#9333ea] rounded-full flex items-center justify-center transition-colors">
                    <ArrowUp size={16} strokeWidth={2.5} />
                 </button>
              </div>
           </div>

           {/* MCP Banner */}
           <div className="flex justify-center mb-10">
              <div className="bg-[#fcfcfd] border border-gray-100 rounded-full px-4 py-1.5 flex items-center gap-3 shadow-sm">
                 <div className="flex -space-x-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full border border-white"></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full border border-white"></div>
                 </div>
                 <span className="text-[13px] text-gray-700 font-medium">Bring context from 100+ apps with custom MCP</span>
                 <button className="text-[#9333ea] text-[13px] font-medium flex items-center gap-1 ml-2">
                    <Plus size={12} /> Add
                 </button>
              </div>
           </div>

           {/* Suggested Prompts */}
           <div className="space-y-1">
              <button className="w-full text-left px-4 py-2.5 flex items-center gap-4 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors rounded-lg group">
                 <Check size={16} className="text-gray-400 group-hover:text-gray-600" strokeWidth={1.5} />
                 List my action items & todos for this week
              </button>
              <button className="w-full text-left px-4 py-2.5 flex items-center gap-4 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors rounded-lg group">
                 <Sparkles size={16} className="text-gray-400 group-hover:text-gray-600" strokeWidth={1.5} />
                 Summarize my last meeting
              </button>
              <button className="w-full text-left px-4 py-2.5 flex items-center gap-4 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors rounded-lg group">
                 <Wand2 size={16} className="text-gray-400 group-hover:text-gray-600" strokeWidth={1.5} />
                 Prepare me for the upcoming meeting
              </button>
              <button className="w-full text-left px-4 py-2.5 flex items-center gap-4 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors rounded-lg group">
                 <Layers size={16} className="text-gray-400 group-hover:text-gray-600" strokeWidth={1.5} />
                 Connect Gmail, Notion, and 30+ sources for richer insights.
              </button>
              <button className="w-full text-left px-4 py-2.5 flex items-center gap-4 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors rounded-lg group">
                 <Calendar size={16} className="text-gray-400 group-hover:text-gray-600" strokeWidth={1.5} />
                 Prepare weekly digest, based on my meetings
              </button>
           </div>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-8 text-[11px] text-gray-400">
           Consumes AI credits
        </div>

      </div>

    </div>
  );
}
