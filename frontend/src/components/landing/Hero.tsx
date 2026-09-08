import Link from "next/link";
import { ArrowRight, Star, Lock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-4 px-6 text-center z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Headline — Matches original: bold 64px crisp white */}
        <h1 className="text-[42px] sm:text-[56px] md:text-[64px] font-extrabold text-white tracking-tight leading-[1.12] mb-4">
          The #1 AI Assistant For <br className="hidden sm:block" /> Your Meetings
        </h1>

        {/* Subtext — Matches original: clean, slightly muted white */}
        <p className="text-[15px] sm:text-[17px] text-white/75 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
          Transcribe, summarize, search, and analyze all your team conversations.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-8">
          <Link 
            href="/home"
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2.5 rounded-lg font-semibold text-[14px] transition-all duration-200 flex items-center gap-2 shadow-lg shadow-purple-900/30"
          >
            Get Started <ArrowRight size={16} />
          </Link>
          <button className="bg-[#1f1b34] hover:bg-[#282344] text-white px-6 py-2.5 rounded-lg font-semibold text-[14px] transition-all duration-200 border border-white/10">
            Request Demo
          </button>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-3 bg-[#161226]/90 border border-white/10 rounded-md px-3.5 py-1.5 text-[12px] text-white/85 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#f97316] font-bold text-[13px]">G</span>
            <span>Rated 4.8 / 5</span>
            <div className="flex items-center gap-0.5 text-[#f97316]">
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
            </div>
          </div>
          <div className="w-px h-3.5 bg-white/20"></div>
          <div className="flex items-center gap-1.5">
            <Lock size={12} className="text-[#10b981]" />
            <span>GDPR, SOC2, More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
