import Link from "next/link";
import { ArrowRight, Share2, Plus, Volume2 } from "lucide-react";

export default function SummariesSection() {
  return (
    <section className="bg-brand-darker py-24 relative z-10 text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
           <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                 Comprehensive <span className="text-[#a78bfa]">AI Summaries</span>
              </h2>
              <p className="text-gray-400 text-lg">
                 Get detailed notes, action items, and customized summaries instantly after every meeting.
              </p>
           </div>
           <Link 
             href="/home"
             className="bg-brand-purple text-white px-6 py-3 rounded font-medium hover:bg-brand-purple-hover transition-colors flex items-center gap-2 shrink-0"
           >
             Get Started <ArrowRight size={18} />
           </Link>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center md:justify-center gap-2 mb-10">
           <button className="px-5 py-2 rounded-md text-sm font-medium bg-[#1e1b30] text-gray-300 hover:text-white transition-colors">
              Overview
           </button>
           <button className="px-5 py-2 rounded-md text-sm font-medium bg-[#1e1b30] text-gray-300 hover:text-white transition-colors">
              Bullet Points
           </button>
           <button className="px-5 py-2 rounded-md text-sm font-medium bg-[#1e1b30] text-gray-300 hover:text-white transition-colors">
              Action Items
           </button>
           <button className="px-5 py-2 rounded-md text-sm font-medium bg-white text-gray-900 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100 to-transparent opacity-50"></div>
              <span className="relative z-10">Custom Notes</span>
           </button>
        </div>

        {/* UI Mockup Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 max-w-5xl mx-auto text-gray-900">
           {/* Top Bar */}
           <div className="border-b border-gray-100 p-4 flex flex-wrap items-center justify-between gap-4 bg-white">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                 <div className="w-4 h-[2px] bg-gray-400 rounded-full shadow-[0_4px_0_0_#9ca3af,0_-4px_0_0_#9ca3af]"></div>
                 <span># Sales / Kickoff Call - Fireflies.ai x Acme</span>
                 <span className="bg-[#4ade80] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">REC</span>
              </div>
              <div className="flex items-center gap-3">
                 <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900">
                    <Volume2 size={16} /> Soundbite
                 </button>
                 <button className="flex items-center gap-1.5 bg-brand-purple text-white px-3 py-1.5 rounded text-sm font-medium">
                    <Share2 size={14} /> Share
                 </button>
                 <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-500 hover:bg-gray-50">
                    <Plus size={16} />
                 </button>
                 <img src="https://i.pravatar.cc/150?img=47" className="w-8 h-8 rounded-full border border-gray-200" />
              </div>
           </div>

           {/* Editor Content */}
           <div className="p-8 md:p-12 bg-white max-h-[500px] overflow-y-auto">
              <div className="max-w-3xl space-y-6 text-[15px] leading-relaxed text-gray-700">
                 
                 <div className="flex gap-3">
                    <span className="text-gray-400 mt-1.5">•</span>
                    <p>Provide a final list of <span className="font-semibold text-gray-900">50 users</span> for initial training by Thursday. <span className="text-blue-500 text-sm">24:42</span></p>
                 </div>

                 <p className="font-semibold text-gray-800 pt-2">Sarah</p>
                 
                 <div className="flex gap-3">
                    <span className="text-gray-400 mt-1.5">•</span>
                    <p>Schedule training sessions for the team, with weekly feedback calls. <span className="text-blue-500 text-sm">02:19</span></p>
                 </div>

                 <p className="font-semibold text-gray-800 pt-4">Meeting Outcome</p>

                 <div className="flex gap-3">
                    <span className="text-gray-400 mt-1.5">•</span>
                    <p>The meeting successfully outlined best practices for implementing the Fireflies note-taking tool.</p>
                 </div>

                 <div className="flex gap-3">
                    <span className="text-gray-400 mt-1.5">•</span>
                    <p>Participants gained clarity on guidelines for using <span className="font-semibold text-gray-900">Fireflies</span> in both internal and client meetings.</p>
                 </div>

                 <div className="flex gap-3">
                    <span className="text-gray-400 mt-1.5">•</span>
                    <p>Key features such as <span className="font-semibold text-gray-900">Chrome</span> and <span className="font-semibold text-gray-900">Zoom</span> integration, AI customization, and transcript management were discussed.</p>
                 </div>

                 <p className="font-semibold text-gray-800 pt-4">USP Advantage Tracker</p>
                 <p className="text-gray-800">Efficiency Gains</p>

              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
