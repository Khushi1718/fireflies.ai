import Link from "next/link";
import { ArrowRight, Star, Lock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 sm:pt-16 pb-6 px-6 text-center z-10 select-none">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Headline — Matches original: sleek, thin/semibold crisp white 76px */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold text-white tracking-tight leading-[1.08] mb-6">
          The #1 AI Assistant For <br className="hidden sm:block" /> Your Meetings
        </h1>

        {/* Subtext — Matches original: clean, thin/regular white */}
        <p className="text-base sm:text-xl md:text-[22px] text-white/80 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Transcribe, summarize, search, and analyze all your team conversations.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <Link 
            href="/home"
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-7 py-3.5 rounded-xl font-bold text-base md:text-lg transition-all duration-200 flex items-center gap-2.5 shadow-xl shadow-purple-900/40 hover:scale-[1.02]"
          >
            Get Started <ArrowRight size={18} />
          </Link>
          <button className="bg-[#1a1533] hover:bg-[#251f47] text-white px-7 py-3.5 rounded-xl font-bold text-base md:text-lg transition-all duration-200 border border-white/15 hover:border-white/30 cursor-pointer">
            Request Demo
          </button>
        </div>

        {/* Rating Badge Pill */}
        <div className="flex items-center gap-3.5 bg-[#141026]/90 backdrop-blur-md border border-white/12 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold text-white/90 shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-[#FF4015] font-black text-sm">G2</span>
            <span>Rated 4.8 / 5</span>
            <div className="flex items-center gap-0.5 text-[#FF4015]">
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
            </div>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-1.5 text-white/80">
            <Lock size={13} className="text-[#10b981]" />
            <span>GDPR, SOC2, More</span>
          </div>
        </div>
      </div>
    </section>
  );
}

