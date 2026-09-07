import { Activity, Sparkles, Network, VolumeX } from "lucide-react";

export default function McpSection() {
  return (
    <section className="bg-[#f4f5fa] py-24 relative z-10 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div>
          <div className="flex items-center gap-4 mb-8">
             <div className="w-10 h-10 bg-white shadow-sm rounded-md flex items-center justify-center text-gray-600 border border-gray-100">
               <Activity size={20} />
             </div>
             <div className="w-10 h-10 bg-white shadow-sm rounded-md flex items-center justify-center text-orange-500 border border-gray-100">
               <Sparkles size={20} />
             </div>
             <div className="w-10 h-10 bg-white shadow-sm rounded-md flex items-center justify-center text-cyan-500 border border-gray-100">
               <Network size={20} />
             </div>
             <div className="bg-[#10b981] text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
               New
             </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight text-gray-800">
            Meeting Intelligence With <br />
            <span className="text-brand-purple">Fireflies MCP</span>
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed max-w-md">
            Fireflies MCP Server lets you bring meeting insights into your AI tools like Claude, Devin, and ChatGPT in one click.
          </p>
        </div>

        {/* Right Side: UI Mockup */}
        <div className="bg-[#0b0620] rounded-xl shadow-2xl h-[400px] flex items-center justify-center relative overflow-hidden">
           <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors">
              <VolumeX size={16} />
           </button>
           
           <div className="relative flex items-center justify-center">
              {/* Starburst icon simulation */}
              <div className="absolute inset-0 bg-brand-purple blur-[50px] opacity-40 rounded-full w-40 h-40"></div>
              <Sparkles className="text-brand-purple w-40 h-40 opacity-90 animate-pulse" />
           </div>
        </div>

      </div>
    </section>
  );
}
