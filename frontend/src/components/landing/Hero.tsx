import Link from "next/link";
import { ArrowRight, Star, Lock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 px-6 text-center z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
          The #1 AI Assistant For <br className="hidden md:block" /> Your Meetings
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl">
          Transcribe, summarize, search, and analyze all your team conversations.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Link 
            href="/home"
            className="bg-brand-purple text-white px-8 py-3 rounded font-medium text-[15px] hover:bg-brand-purple-hover transition-colors flex items-center gap-2"
          >
            Get Started <ArrowRight size={18} />
          </Link>
          <button className="bg-[#242136] text-white px-8 py-3 rounded font-medium text-[15px] hover:bg-[#2f2c45] transition-colors border border-white/5">
            Request Demo
          </button>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-3 bg-[#1e1a31] border border-white/10 rounded-md px-4 py-2 text-[13px] text-white/90">
          <div className="flex items-center gap-2">
            <span className="text-[#f97316] font-bold">G</span>
            <span>Rated 4.8 / 5</span>
            <div className="flex items-center gap-0.5 text-[#f97316]">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
            </div>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-1.5">
            <Lock size={14} className="text-[#10b981]" />
            <span>GDPR, SOC2, More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
