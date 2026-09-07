import { ChevronDown, ChevronUp, Check } from "lucide-react";

export default function InsightsSection() {
  return (
    <section className="bg-white py-24 relative z-10 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
           
           {/* Left Column: Accordion */}
           <div>
              <h2 className="text-4xl md:text-[44px] font-bold mb-6 tracking-tight leading-tight text-gray-900">
                 Drive Insights With <br />
                 <span className="text-brand-purple">Conversation Intelligence</span>
              </h2>
              <p className="text-gray-600 text-lg mb-12 max-w-md">
                 Detailed analytics to help you uncover insights across every conversation.
              </p>

              <div className="space-y-0">
                 
                 <div className="border-b border-gray-100 py-6 text-gray-400 hover:text-gray-900 cursor-pointer flex justify-between items-center font-semibold">
                    <span>Speaker Talk-time</span>
                    <ChevronDown size={16} />
                 </div>

                 <div className="py-6 border-b-2 border-brand-purple">
                    <div className="flex justify-between items-center font-semibold text-gray-900 mb-4 cursor-pointer">
                       <span>AI Filters</span>
                       <ChevronUp size={16} />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed pr-8">
                       In one-click, filter our key questions, tasks, budget, metrics and more using LLM-powered AI filters
                    </p>
                 </div>

                 <div className="border-b border-gray-100 py-6 text-gray-400 hover:text-gray-900 cursor-pointer flex justify-between items-center font-semibold">
                    <span>Sentiment Analysis</span>
                    <ChevronDown size={16} />
                 </div>

                 <div className="border-b border-gray-100 py-6 text-gray-400 hover:text-gray-900 cursor-pointer flex justify-between items-center font-semibold">
                    <span>Topic Trackers</span>
                    <ChevronDown size={16} />
                 </div>

              </div>
           </div>

           {/* Right Column: UI Mockup */}
           <div className="relative pt-10 pl-10 h-[500px]">
              
              <div className="bg-white border border-gray-100 shadow-xl rounded-xl w-full h-full p-6 text-sm relative">
                 <div className="text-gray-500 font-medium mb-4 pb-4 border-b border-gray-50">Transcript</div>
                 
                 <div className="bg-gray-50 rounded-md p-2 text-gray-400 mb-6 flex items-center gap-2">
                    <SearchIcon /> Search
                 </div>

                 <div className="space-y-6 opacity-60">
                    <div className="flex gap-4">
                       <div className="w-6 h-6 rounded bg-teal-300 text-white flex items-center justify-center font-bold text-[10px]">T</div>
                       <div>
                          <div className="flex items-center gap-2 mb-1 font-semibold text-gray-900">Tom <span className="text-blue-500 font-normal">00:53</span></div>
                          <p className="text-gray-600 leading-relaxed">There's some concern about onboarding. Clients feel it's not intuitive enough.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-6 h-6 rounded bg-orange-300 text-white flex items-center justify-center font-bold text-[10px]">R</div>
                       <div>
                          <div className="flex items-center gap-2 mb-1 font-semibold text-gray-900">Rohan <span className="text-blue-500 font-normal">01:24</span></div>
                          <p className="text-gray-600 leading-relaxed">Noted. We'll pass that to product. On the seating front—how are we doing with capacity?</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Floating Dropdown Mockup */}
              <div className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 bg-white rounded-lg shadow-2xl border border-gray-100 w-56 py-2 z-20">
                 
                 <div className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between text-sm text-gray-600 cursor-pointer">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-300"></div> Questions</div>
                    <span className="text-gray-400 text-xs">8</span>
                 </div>

                 <div className="px-4 py-2 bg-emerald-50 border border-emerald-200/50 flex items-center justify-between text-sm text-gray-900 cursor-pointer m-1 rounded">
                    <div className="flex items-center gap-2"><Check size={12} className="text-emerald-500"/> Tasks</div>
                    <span className="text-gray-400 text-xs">8</span>
                 </div>

                 <div className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between text-sm text-gray-600 cursor-pointer">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-300"></div> Pricing</div>
                    <span className="text-gray-400 text-xs">2</span>
                 </div>

                 <div className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between text-sm text-gray-600 cursor-pointer">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div> Metrics</div>
                    <span className="text-gray-400 text-xs">3</span>
                 </div>

              </div>

           </div>

        </div>

      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}
