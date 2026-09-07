import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section className="relative py-32 text-center z-10 overflow-hidden starry-bg">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-10">
          Unlock The Knowledge Buried <br />
          Inside Your Conversations
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="/home"
            className="bg-brand-purple text-white px-8 py-3.5 rounded font-semibold text-[15px] hover:bg-brand-purple-hover transition-colors flex items-center gap-2"
          >
            Try Fireflies For Free <ArrowRight size={18} />
          </Link>
          <button className="bg-[#2a2640] text-white px-8 py-3.5 rounded font-semibold text-[15px] hover:bg-[#363152] transition-colors border border-white/5">
            Request Demo
          </button>
        </div>
      </div>
    </section>
  );
}
