"use client";

import { useState, useRef } from "react";
import { Activity, Sparkles, Network, VolumeX, Volume2 } from "lucide-react";

export default function McpSection() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="bg-[#f4f5fa] py-24 relative z-10 text-gray-900 select-none">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div>
          <div className="flex items-center gap-3.5 mb-8">
            <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-gray-700 border border-gray-200/80">
              <Activity size={20} />
            </div>
            <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-orange-500 border border-gray-200/80">
              <Sparkles size={20} />
            </div>
            <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-cyan-500 border border-gray-200/80">
              <Network size={20} />
            </div>
            <div className="bg-[#10b981] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider ml-1">
              New
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight text-gray-900">
            Meeting Intelligence With <br />
            <span className="text-[#7b52f6]">Fireflies MCP</span>
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md">
            Fireflies MCP Server lets you bring meeting insights into your AI tools like Claude, Devin, and ChatGPT in one click.
          </p>
        </div>

        {/* Right Side: Real Video Demonstration */}
        <div className="bg-[#0b0620] rounded-2xl shadow-2xl h-[380px] md:h-[420px] relative overflow-hidden border border-gray-800 flex items-center justify-center group">
          
          {/* HTML5 Auto-playing Looping Video */}
          <video
            ref={videoRef}
            src="/images/mcp.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover rounded-2xl block"
          />

          {/* Audio Mute/Unmute Control Button */}
          <button
            onClick={toggleMute}
            type="button"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all z-20 border border-white/10 cursor-pointer shadow-lg"
            title={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

      </div>
    </section>
  );
}
