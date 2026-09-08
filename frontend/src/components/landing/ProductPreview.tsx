"use client";

import { Menu, Search, Bookmark, Plus, Bell, ChevronDown, Copy, Radio, MessageSquare, Video } from "lucide-react";

export default function ProductPreview() {
  return (
    <div className="relative max-w-[1220px] w-full mx-auto px-2 sm:px-4 z-20 mt-6 select-none">
      {/* Product Frame — Matches official fireflies.ai screenshot */}
      <div className="bg-white rounded-t-xl sm:rounded-t-2xl shadow-[0_30px_90px_-15px_rgba(0,0,0,0.7)] border-t border-x border-white/20 flex flex-col h-[700px] md:h-[760px] text-gray-800 relative overflow-hidden">
        
        {/* 1. Top Header */}
        <div className="h-14 border-b border-gray-200 flex items-center justify-between px-5 bg-white shrink-0">
          {/* Left Breadcrumb */}
          <div className="flex items-center gap-3.5">
            <Menu size={18} className="text-gray-500 hover:text-gray-800 cursor-pointer transition-colors" />
            <div className="flex items-center gap-2 text-[13px]">
              <span className="text-gray-400 font-medium"># Sales</span>
              <span className="text-gray-300">/</span>
              <span className="font-semibold text-gray-900">Kickoff Call - Fireflies.ai x Acme</span>
              <span className="bg-[#2dd4bf] text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ml-1 shadow-xs">
                REC
              </span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3.5">
            {/* Authentic 4-color Slack Icon with Chevron */}
            <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors" title="Slack integration">
              <svg width="17" height="17" viewBox="0 0 122.8 122.8">
                <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#E01E5A"/>
                <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36C5F0"/>
                <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C77.6 5.8 83.4 0 90.5 0s12.9 5.8 12.9 12.9v32.3z" fill="#2EB67D"/>
                <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ECB22E"/>
              </svg>
              <ChevronDown size={12} className="text-gray-400" />
            </div>

            <div className="w-px h-4 bg-gray-200" />

            {/* Share 🔗 Button (Matches Screenshot) */}
            <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold shadow-xs transition-colors cursor-pointer">
              <span>Share</span>
              <span className="text-[10px]">🔗</span>
            </button>

            <div className="w-px h-4 bg-gray-200" />

            {/* Plus Button in border square */}
            <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <Plus size={14} className="text-gray-600" />
            </button>

            {/* Bell with red dot */}
            <button className="hover:bg-gray-50 p-1.5 rounded-lg transition-colors text-gray-400 relative cursor-pointer">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Profile Avatar */}
            <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-gray-200 shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Sarah Watts" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

        {/* 2. Main Body (Skinny Left Nav, Center Notes, Right Transcript) */}
        <div className="flex flex-1 min-h-0 overflow-hidden bg-white">
          
          {/* Left Skinny Sidebar */}
          <div className="w-11 border-r border-gray-100 flex flex-col items-center py-4 gap-5 bg-white shrink-0">
            <button className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer" title="Search">
              <Search size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer" title="AI Skills">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/>
              </svg>
            </button>
            <button className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer" title="Live audio">
              <Radio size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer" title="Comments">
              <MessageSquare size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer" title="Bookmarks">
              <Bookmark size={16} />
            </button>
          </div>

          {/* Center Meeting Notes View */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin">
            
            {/* Title & Meta Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Kickoff Call – Fireflies.ai x Acme
                </h1>
                <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                  <Video size={14} className="text-gray-600" />
                  <span>Video</span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                    alt="Sarah Watts" 
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="font-semibold text-gray-800">Sarah Watts, +3</span>
                </div>
                <span>·</span>
                <span>Mar 15 · 11:30 AM</span>
              </div>
            </div>

            {/* Sales Notes Pill & AI Apps */}
            <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-2 text-[#7b52f6] font-bold cursor-pointer hover:text-[#6742d1]">
                <span className="text-sm">✨</span>
                <span>Sales Notes</span>
                <ChevronDown size={14} />
                <button className="text-gray-400 hover:text-gray-600 ml-1">
                  <Copy size={13} />
                </button>
              </div>
              <div className="text-gray-400 font-semibold cursor-pointer hover:text-gray-600 flex items-center gap-1">
                <span>+ AI Apps</span>
              </div>
            </div>

            {/* Overview Block */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Overview</h2>
              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                The kickoff call served as an introduction between Fireflies.ai and Acme Inc. They aim to use Fireflies.ai primarily to streamline internal communications, automate sales call follow-ups, and improve meeting workflows.
              </p>
            </div>

            {/* Notes Section */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Notes</h2>

              {/* Bullet Group 1 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <span className="w-2.5 h-2.5 bg-[#475569] rounded-xs shrink-0"></span>
                  <span>Use Case &amp; Requirements: 00:00 - 10:12</span>
                </div>
                <ul className="pl-6 space-y-1.5 text-xs text-gray-600 list-disc">
                  <li>Acme wants their sales team more present during calls</li>
                  <li>They want to automate data entry in <strong className="text-gray-900 font-semibold">HubSpot</strong> CRM</li>
                  <li>Team managers want to use Fireflies to provide call coaching</li>
                </ul>
              </div>

              {/* Bullet Group 2 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <span className="w-2.5 h-2.5 bg-[#475569] rounded-xs shrink-0"></span>
                  <span>Metrics &amp; Goals: 10:15 - 20:43</span>
                </div>
                <ul className="pl-6 space-y-1.5 text-xs text-gray-600 list-disc">
                  <li>Acme is looking to buy Fireflies for <strong className="text-gray-900 font-semibold">50 seats</strong></li>
                  <li>Timeline for implementation is <strong className="text-gray-900 font-semibold">1 week</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Transcript Panel matching User Screenshot */}
          <div className="w-[320px] border-l border-gray-100 flex flex-col bg-white shrink-0">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-700 mb-2">Transcript</h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full pl-8 pr-3 py-1.5 bg-gray-50 rounded-md text-xs text-gray-700 placeholder-gray-400 border border-gray-100 focus:outline-none"
                  readOnly
                />
              </div>
            </div>

            {/* Transcript Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {/* Message 1 */}
              <div className="flex items-start gap-2.5">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="Sarah" 
                  className="w-6 h-6 rounded-full object-cover mt-0.5"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] mb-0.5">
                    <span className="font-semibold text-gray-900">Sarah</span>
                    <ChevronDown size={11} className="text-gray-400" />
                    <span className="text-gray-300">·</span>
                    <span className="text-[#7b52f6] underline cursor-pointer font-mono text-[11px]">00:53</span>
                  </div>
                  <p className="text-[12px] text-gray-600 leading-relaxed">
                    We&apos;re aiming for a seamless onboarding experience, especially around the integrations with Slack and HubSpot.
                  </p>
                </div>
              </div>

              {/* Message 2 */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#fde68a] text-[#b45309] font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  J
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] mb-0.5">
                    <span className="font-semibold text-gray-900">Janice</span>
                    <ChevronDown size={11} className="text-gray-400" />
                    <span className="text-gray-300">·</span>
                    <span className="text-[#7b52f6] underline cursor-pointer font-mono text-[11px]">01:24</span>
                  </div>
                  <p className="text-[12px] text-gray-600 leading-relaxed">
                    Absolutely, our team will work closely with your tech lead to ensure a smooth integration process.
                  </p>
                </div>
              </div>

              {/* Message 3 */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#fbcfe8] text-[#be185d] font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  C
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] mb-0.5">
                    <span className="font-semibold text-gray-900">Chris</span>
                    <ChevronDown size={11} className="text-gray-400" />
                    <span className="text-gray-300">·</span>
                    <span className="text-[#7b52f6] underline cursor-pointer font-mono text-[11px]">01:47</span>
                  </div>
                  <p className="text-[12px] text-gray-600 leading-relaxed">
                    I&apos;ll prepare the DPA and security documents for your review and reach out by EOD so we can start meeting the timeline.
                  </p>
                </div>
              </div>

              {/* Message 4 */}
              <div className="flex items-start gap-2.5">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="Sarah" 
                  className="w-6 h-6 rounded-full object-cover mt-0.5"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] mb-0.5">
                    <span className="font-semibold text-gray-900">Sarah</span>
                    <ChevronDown size={11} className="text-gray-400" />
                    <span className="text-gray-300">·</span>
                    <span className="text-[#7b52f6] underline cursor-pointer font-mono text-[11px]">02:19</span>
                  </div>
                  <p className="text-[12px] text-gray-600 leading-relaxed">
                    Sounds like a solid plan. Let&apos;s touch base again on Thursday.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Floating Glowing AI Orb Assistant Widget — Matches User Screenshot */}
        <div className="absolute bottom-6 right-6 w-[220px] sm:w-[240px] h-[150px] bg-[#070417]/95 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-purple-500/30 p-4 flex flex-col items-center justify-center z-30 select-none backdrop-blur-xl">
          {/* Blue Soundwave Pill in Top Right */}
          <div className="absolute top-3.5 right-3.5 bg-[#1e293b]/90 rounded-full px-2 py-0.5 flex items-center gap-0.5 text-[#38bdf8]">
            <span className="w-0.5 h-2 bg-[#38bdf8] rounded-full animate-pulse"></span>
            <span className="w-0.5 h-3.5 bg-[#38bdf8] rounded-full animate-pulse delay-75"></span>
            <span className="w-0.5 h-2 bg-[#38bdf8] rounded-full animate-pulse delay-150"></span>
          </div>

          {/* Glowing Vibrant Neon Ring with Fireflies Logo Icon */}
          <div className="relative w-16 h-16 flex items-center justify-center my-1">
            {/* Glowing aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#38bdf8] via-[#a855f7] to-[#ec4899] blur-md opacity-80 animate-pulse"></div>
            
            {/* Outer Ring */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#38bdf8] via-[#a855f7] to-[#ec4899] p-[3px]">
              <div className="w-full h-full bg-[#070417] rounded-full flex items-center justify-center">
                {/* Fireflies Logo Mark inside */}
                <div className="bg-[#ec4899] p-1.5 rounded text-white flex flex-col items-center justify-center relative w-6 h-6 overflow-hidden shadow-inner">
                  <div className="w-2 h-2 bg-white rounded-tl-sm absolute top-1 left-1"></div>
                  <div className="w-2 h-2 bg-white absolute top-1 right-1"></div>
                  <div className="w-2 h-2 bg-white absolute bottom-1 left-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Label */}
          <p className="text-white text-[12px] font-bold tracking-wide text-center mt-1.5">
            Sarah&apos;s Fireflies AI Notetaker
          </p>
        </div>

      </div>
    </div>
  );
}
