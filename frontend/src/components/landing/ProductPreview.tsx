import { Menu, Search, Sparkles, Mic, MessageSquare, Bookmark, Share2, Plus, Bell } from "lucide-react";

export default function ProductPreview() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 z-20 mt-8 mb-20">
      {/* Outer Card with subtle glow/shadow */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-white/10 flex flex-col h-[600px] text-gray-800">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 bg-white">
          <div className="flex items-center gap-4">
            <Menu size={20} className="text-gray-500 cursor-pointer" />
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span># Sales</span>
              <span>/</span>
              <span className="font-medium text-gray-800">Kickoff Call - Fireflies.ai x Acme</span>
              <span className="bg-[#10b981] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">REC</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Slack integration icon placeholder */}
            <div className="w-5 h-5 rounded flex items-center justify-center relative bg-gray-100">
              <span className="text-xs">💬</span>
            </div>
            <button className="bg-brand-purple text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5">
              <Share2 size={16} /> Share
            </button>
            <div className="w-px h-6 bg-gray-200"></div>
            <Plus size={20} className="text-gray-500 cursor-pointer" />
            <div className="relative">
              <Bell size={20} className="text-gray-500 cursor-pointer" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
              <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden bg-white">
          
          {/* Left Vertical Nav */}
          <div className="w-14 border-r border-gray-200 flex flex-col items-center py-6 gap-6 bg-gray-50">
            <Search size={20} className="text-gray-500" />
            <Sparkles size={20} className="text-gray-500" />
            <Mic size={20} className="text-gray-500" />
            <MessageSquare size={20} className="text-gray-500" />
            <Bookmark size={20} className="text-gray-500" />
          </div>

          {/* Center Content (Notes) */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Kickoff Call – Fireflies.ai x Acme</h2>
              <button className="border border-gray-200 text-gray-600 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2">
                <span className="w-4 h-3 bg-gray-300 rounded-sm"></span> Video
              </button>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/150?img=47" className="w-6 h-6 rounded-full border-2 border-white" />
                <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] text-gray-600">+3</div>
              </div>
              <span>Sarah Watts, +3</span>
              <span>•</span>
              <span>Mar 15 • 11:30 AM</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-6">
              <div className="flex items-center gap-2 text-brand-purple font-medium text-sm cursor-pointer">
                <Sparkles size={16} /> Sales Notes <span className="text-gray-400">▼</span>
              </div>
              <span className="text-sm text-gray-500 cursor-pointer">+ AI Apps</span>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Overview</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The kickoff call served as an introduction between Fireflies.ai and Acme Inc. They aim to use Fireflies.ai primarily to streamline internal communications, automate sales call follow-ups, and improve meeting workflows.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Notes</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-2">
                      <div className="w-3 h-3 bg-gray-600 rounded-sm"></div>
                      Use Case & Requirements: 00:00 - 10:12
                    </div>
                    <ul className="list-disc pl-8 text-sm text-gray-600 space-y-1.5">
                      <li>Acme wants their sales team more present during calls</li>
                      <li>They want to automate data entry in <span className="font-semibold text-gray-800">HubSpot</span> CRM</li>
                      <li>Team managers want to use Fireflies to provide call coaching</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-2">
                      <div className="w-3 h-3 bg-gray-600 rounded-sm"></div>
                      Metrics & Goals: 10:15 - 20:43
                    </div>
                    <ul className="list-disc pl-8 text-sm text-gray-600 space-y-1.5">
                      <li>Acme is looking to buy Fireflies for <span className="font-semibold text-gray-800">50 seats</span></li>
                      <li>Timeline for implementation is <span className="font-semibold text-gray-800">1 week</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content (Transcript) */}
          <div className="w-[350px] border-l border-gray-200 flex flex-col bg-gray-50">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Transcript</h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full bg-gray-100 border-none rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-purple"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Transcript Item 1 */}
              <div className="flex gap-3">
                <img src="https://i.pravatar.cc/150?img=47" className="w-6 h-6 rounded-full mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 text-xs mb-1">
                    <span className="font-semibold text-gray-900">Sarah</span>
                    <span className="text-brand-purple">00:53</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We're aiming for a seamless onboarding experience, especially around the integrations with Slack and HubSpot.
                  </p>
                </div>
              </div>

              {/* Transcript Item 2 */}
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-xs font-semibold mt-0.5">J</div>
                <div>
                  <div className="flex items-center gap-2 text-xs mb-1">
                    <span className="font-semibold text-gray-900">Janice</span>
                    <span className="text-brand-purple">01:24</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Absolutely, our team will work closely with your tech lead to ensure a smooth integration process.
                  </p>
                </div>
              </div>

              {/* Transcript Item 3 */}
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center text-xs font-semibold mt-0.5">C</div>
                <div>
                  <div className="flex items-center gap-2 text-xs mb-1">
                    <span className="font-semibold text-gray-900">Chris</span>
                    <span className="text-brand-purple">01:47</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    I'll prepare the API credentials and reach out by EOD so we can start meeting the timeline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating AI Notetaker Widget */}
        <div className="absolute bottom-6 right-8 w-64 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 p-4 flex flex-col items-center justify-center z-30">
          <div className="absolute top-2 right-2 bg-slate-800 rounded px-1.5 py-0.5 flex items-center gap-1">
             <span className="w-1 h-3 bg-brand-purple rounded-full animate-pulse"></span>
             <span className="w-1 h-2 bg-brand-purple rounded-full animate-pulse delay-75"></span>
             <span className="w-1 h-3 bg-brand-purple rounded-full animate-pulse delay-150"></span>
          </div>
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 via-brand-purple to-pink-500 p-1 animate-spin-slow mb-3">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
               <div className="text-brand-purple font-bold text-xl">f</div>
            </div>
          </div>
          <p className="text-white text-sm font-medium text-center">Sarah's Fireflies AI Notetaker</p>
        </div>
      </div>
    </div>
  );
}
