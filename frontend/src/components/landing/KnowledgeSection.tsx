import Link from "next/link";
import { ArrowRight, Sparkles, PieChart, User, BarChart2, Search } from "lucide-react";

export default function KnowledgeSection() {
  return (
    <section className="bg-brand-darker py-24 relative z-10 text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Top Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
           <div className="max-w-xl">
              <h2 className="text-4xl md:text-[44px] font-bold mb-4 tracking-tight leading-tight">
                 All Your <span className="text-[#a78bfa]">Tasks, Contacts</span>, & <br />
                 <span className="text-[#a78bfa]">Knowledge</span> In One Place
              </h2>
              <p className="text-gray-400 text-lg">
                 Understand what's happening across the company and what your team needs to get done.
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
        <div className="flex justify-center gap-2 mb-10">
           <button className="px-5 py-2 rounded-md text-sm font-medium bg-[#1e1b30] text-gray-300 hover:text-white transition-colors">
              Tasks
           </button>
           <button className="px-5 py-2 rounded-md text-sm font-medium bg-[#1e1b30] text-gray-300 hover:text-white transition-colors">
              Contacts
           </button>
           <button className="px-5 py-2 rounded-md text-sm font-medium bg-white text-gray-900 shadow-sm">
              Feed
           </button>
        </div>

        {/* Big UI Mockup */}
        <div className="bg-gradient-to-b from-[#2e1f5e] to-brand-darker rounded-t-3xl pt-16 px-4 md:px-24 flex justify-center relative overflow-hidden h-[500px]">
           {/* Stars */}
           <div className="absolute inset-0 starry-bg opacity-30 pointer-events-none"></div>

           <div className="bg-white rounded-t-xl shadow-2xl w-full max-w-4xl text-gray-900 p-8 flex flex-col relative z-20 h-full border-t border-x border-gray-200">
              
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-8 pb-4 border-b border-gray-100">
                 <Sparkles size={16} className="text-emerald-400" /> AI Feed
              </div>

              <div className="space-y-6 overflow-y-auto pr-4">
                 <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Today</div>

                 <div className="flex items-start gap-4">
                    <img src="https://i.pravatar.cc/150?img=47" className="w-10 h-10 rounded-md" />
                    <div className="flex-1">
                       <h4 className="font-semibold text-gray-900">Planning Roadmap</h4>
                       <div className="text-xs text-gray-500 mb-4">Wed • 11:00 AM</div>
                       
                       <div className="space-y-4 text-[13px]">
                          <div className="flex items-start gap-3">
                             <div className="mt-0.5"><PieChart size={14} className="text-orange-500" /></div>
                             <p><span className="font-semibold text-gray-800">Compatibility:</span> Works with various project management apps, including Notion.</p>
                          </div>
                          <div className="flex items-start gap-3">
                             <div className="mt-0.5"><User size={14} className="text-gray-700" /></div>
                             <p><span className="font-semibold text-gray-800">Free Trial:</span> Stephen expressed interest in the 7-day trial of the Business plan.</p>
                          </div>
                          <div className="flex items-start gap-3">
                             <div className="mt-0.5"><BarChart2 size={14} className="text-emerald-600" /></div>
                             <p><span className="font-semibold text-gray-800">Competitor Comparison:</span> Stephen evaluating other AI budget management tools.</p>
                          </div>
                          <div className="flex items-start gap-3">
                             <div className="mt-0.5"><Search size={14} className="text-gray-500" /></div>
                             <p><span className="font-semibold text-gray-800">Analytics:</span> Mariana values tracking recurring client requests for product development.</p>
                          </div>
                       </div>
                    </div>
                 </div>

              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
