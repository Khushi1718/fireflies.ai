import { Search, Sparkles, ArrowUp } from "lucide-react";

export default function SearchSection() {
  return (
    <section className="bg-white py-24 relative z-10 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 inline-block">
              <span className="bg-blue-100 text-brand-purple px-2 py-1 rounded">Remember</span> Every Conversation <br />
              With <span className="bg-blue-100 text-brand-purple px-2 py-1 rounded">AI Powered Search</span>
           </h2>
           <p className="text-gray-600 text-lg">
              <span className="bg-blue-50 px-2 py-1">Fireflies gives you perfect memory after every conversation.</span>
           </p>
        </div>

        {/* 2 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
           {/* Left Card: Meeting Search */}
           <div className="bg-[#fcf5ff] rounded-2xl p-8 overflow-hidden relative flex flex-col h-[500px]">
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 w-full mb-8 relative z-10 text-left overflow-hidden">
                 <div className="p-4 border-b border-gray-100 flex items-center gap-3 text-gray-400">
                    <Search size={18} />
                    <span className="text-sm font-medium text-gray-800">Design</span>
                 </div>
                 
                 <div className="p-6 pb-2">
                    <div className="flex items-start gap-4 mb-6">
                       <div className="w-8 h-8 rounded bg-teal-300 flex items-center justify-center text-white font-bold text-xs shrink-0">M</div>
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                             <h4 className="font-semibold text-sm text-gray-900">Design Team Sync</h4>
                             <span className="text-xs text-gray-400">14 matches</span>
                          </div>
                          <div className="text-[10px] text-gray-400 mb-2">Matt • May 15</div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                             "..So you look for this <span className="bg-blue-100 px-1">design</span> sync meeting in this particular..."<br/>
                             "...for let's say <span className="bg-blue-100 px-1">design</span> team and their tasks.."
                          </p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded shrink-0" />
                       <div className="w-full">
                          <h4 className="font-semibold text-sm text-gray-900 mb-1">Roadmap Planning</h4>
                          <div className="text-[10px] text-gray-400 mb-3">Matt • May 15</div>
                          <div className="flex gap-2">
                             <div className="h-2 bg-gray-100 rounded w-16"></div>
                             <div className="h-2 bg-purple-100 rounded w-12"></div>
                             <div className="h-2 bg-gray-100 rounded w-24"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-auto">
                 <h3 className="font-bold text-xl mb-2 text-gray-900">Meeting Search</h3>
                 <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                    Remember what was discussed on calls several months ago down to the specific sentence and timestamp.
                 </p>
              </div>
           </div>

           {/* Right Card: AskFred */}
           <div className="bg-[#f0fdfa] rounded-2xl p-8 overflow-hidden relative flex flex-col h-[500px]">
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 w-full mb-8 relative z-10 text-left flex flex-col h-[320px]">
                 <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center text-brand-purple text-[10px]"><Sparkles size={12}/></div>
                       <span className="text-sm font-semibold text-gray-800">AskFred</span>
                    </div>
                    <span className="text-xs text-gray-400">GPT-4o ▾</span>
                 </div>
                 
                 <div className="p-6 flex-1 overflow-hidden flex flex-col gap-6">
                    <div>
                       <div className="flex items-center gap-2 mb-2">
                          <img src="https://i.pravatar.cc/150?img=47" className="w-5 h-5 rounded" />
                          <span className="text-xs font-semibold text-gray-700">You</span>
                       </div>
                       <p className="text-sm text-gray-700 leading-relaxed pl-7">
                          What did Sam say about the updated pricing for Facebook ads?
                       </p>
                    </div>

                    <div>
                       <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center text-brand-purple"><Sparkles size={10}/></div>
                          <span className="text-xs font-semibold text-gray-700">AskFred</span>
                       </div>
                       <p className="text-sm text-gray-700 leading-relaxed pl-7">
                          Sam said, new Facebook ad pricing is more competitive, but CPC has slightly increased.
                       </p>
                    </div>
                 </div>

                 <div className="p-3 border-t border-gray-50 bg-white m-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2">
                    <Sparkles size={14} className="text-emerald-400" />
                    <span className="text-sm text-gray-300 flex-1">Ask anything...</span>
                    <button className="w-6 h-6 bg-brand-purple rounded flex items-center justify-center text-white"><ArrowUp size={14} /></button>
                 </div>
              </div>

              <div className="mt-auto">
                 <h3 className="font-bold text-xl mb-2 text-gray-900">AskFred</h3>
                 <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                    Let Fred review your meetings and come back with answers to any question you have.
                 </p>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
}
