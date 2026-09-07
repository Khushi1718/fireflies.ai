import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LiveAssistSection() {
  return (
    <section className="bg-black py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="rounded-3xl overflow-hidden relative h-[600px] flex items-center justify-center text-center">
           {/* Background Image Mockup */}
           <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/40 to-[#0f172a] mix-blend-overlay z-10 pointer-events-none"></div>
           <img src="https://images.unsplash.com/photo-1682687982501-1e5898cb8f4b?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 filter brightness-75" alt="Landscape background" />
           
           <div className="relative z-20 flex flex-col items-center max-w-3xl px-6">
              
              {/* App Icons Row */}
              <div className="flex bg-black/60 backdrop-blur-md rounded-full p-2 gap-2 mb-10 border border-white/10">
                 <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">zm</div>
                 <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[8px] font-bold text-blue-500">M</div>
                 <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-[8px] font-bold text-white">T</div>
                 <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-[8px] font-bold text-white">S</div>
                 <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">F</div>
                 <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">W</div>
                 <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">D</div>
                 <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-[8px] font-bold text-white">V</div>
                 <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-[8px] font-bold text-white">C</div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                 Get Real-Time Suggestions, <br />
                 Coaching, <br />
                 And Answers During Meetings.
              </h2>
              
              <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
                 Meet the new Live Assist that can provide real-time suggestions, coaching, and answers during your meetings.
              </p>

              <Link 
                 href="/home"
                 className="bg-brand-purple text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-purple-hover transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(123,82,246,0.5)]"
              >
                 Explore Live Assist <ArrowRight size={18} />
              </Link>

           </div>
        </div>

      </div>
    </section>
  );
}
