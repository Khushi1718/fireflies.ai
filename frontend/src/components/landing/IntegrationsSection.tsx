import { Calendar, List, CheckSquare } from "lucide-react";

export default function IntegrationsSection() {
  return (
    <section className="bg-black py-24 relative z-10 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
          <span className="text-[#c1b5fd]">Integrate</span> Fireflies With Your Favorite <br />
          <span className="text-[#c1b5fd]">Work Tools</span>
        </h2>
        
        <p className="text-white/70 text-lg mb-20 max-w-2xl mx-auto">
          Integrate Fireflies with your favorite Work Tools
        </p>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-20">
          <div>
             <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-[10px] font-bold">SF</div>
                <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center text-[10px] font-bold">HS</div>
                <span className="text-xs text-white/50">5+</span>
             </div>
             <h4 className="font-bold text-[15px] mb-2">CRM</h4>
             <p className="text-white/60 text-sm leading-relaxed">Auto-fill out your CRM with notes and call logs.</p>
          </div>
          <div>
             <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-rose-500 rounded-md flex items-center justify-center text-[10px] font-bold">AS</div>
                <div className="w-6 h-6 bg-blue-400 rounded-md flex items-center justify-center text-[10px] font-bold">TR</div>
                <span className="text-xs text-white/50">9+</span>
             </div>
             <h4 className="font-bold text-[15px] mb-2">Project Management</h4>
             <p className="text-white/60 text-sm leading-relaxed">Create tasks automatically after every meeting.</p>
          </div>
          <div>
             <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center text-[10px] font-bold">GH</div>
                <div className="w-6 h-6 bg-green-400 rounded-md flex items-center justify-center text-[10px] font-bold">BB</div>
                <span className="text-xs text-white/50">1+</span>
             </div>
             <h4 className="font-bold text-[15px] mb-2">ATS</h4>
             <p className="text-white/60 text-sm leading-relaxed">Send meeting notes and transcripts to Greenhouse, Lever and others.</p>
          </div>
          <div>
             <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center text-[10px] font-bold">SL</div>
             </div>
             <h4 className="font-bold text-[15px] mb-2">Slack</h4>
             <p className="text-white/60 text-sm leading-relaxed">Get notes and alerts in the channels where you work.</p>
          </div>
        </div>

        {/* Large UI Mockup Area */}
        <div className="bg-brand-dark rounded-t-3xl border-t border-x border-white/10 pt-16 px-4 md:px-16 flex justify-center relative overflow-hidden h-[500px]">
           {/* Floating app icons background (simulated) */}
           <div className="absolute inset-0 opacity-20 pointer-events-none starry-bg"></div>
           
           {/* The Center Note Card */}
           <div className="bg-white rounded-t-xl shadow-2xl w-full max-w-2xl text-gray-900 flex flex-col relative z-20 h-full border-t border-x border-gray-200">
              
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                 <Calendar className="text-brand-purple" size={20} />
                 <h3 className="font-semibold text-lg">Design Session</h3>
              </div>

              <div className="p-6 space-y-6 text-left flex-1 bg-white">
                 <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Summary</h4>
                    <p className="text-sm text-gray-800 mb-3">Focused on enhancing the Notepad and customization...</p>
                    <div className="h-2 bg-gradient-to-r from-emerald-100 to-transparent rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gradient-to-r from-emerald-100 to-transparent rounded w-1/2"></div>
                 </div>

                 <div>
                    <div className="flex items-center gap-2 mb-4">
                       <List className="text-gray-400" size={16} />
                       <h4 className="text-sm font-semibold text-gray-600">Notes</h4>
                    </div>
                    <ul className="list-disc pl-6 space-y-3 text-sm text-gray-800">
                       <li><span className="text-pink-600 bg-pink-50 px-1 rounded">UX Optimization:</span> Focus on viewing and sharing notes.</li>
                       <li><span className="text-teal-600 bg-teal-50 px-1 rounded">UI Simplification:</span> Change template selection to a simple dropdown.</li>
                    </ul>
                 </div>
              </div>

              {/* Floating Action Items Overlapping Bottom */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[110%] max-w-lg space-y-2 z-30 shadow-2xl">
                 <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                       <div className="w-4 h-4 rounded bg-[#10b981] flex items-center justify-center text-white">
                          <CheckSquare size={12} strokeWidth={3} />
                       </div>
                       <span className="text-sm font-medium">Add copy button</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-gray-500">Janice</span>
                       <img src="https://i.pravatar.cc/150?img=47" className="w-5 h-5 rounded-full" />
                    </div>
                 </div>
                 
                 <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between shadow-lg opacity-90">
                    <div className="flex items-center gap-3 w-full">
                       <div className="w-4 h-4 rounded border-2 border-gray-200"></div>
                       <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                       <span className="text-xs text-gray-500">Kevin</span>
                       <div className="w-5 h-5 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center text-[10px] font-bold">K</div>
                    </div>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </section>
  );
}
