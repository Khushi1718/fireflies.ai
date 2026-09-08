export default function LogosSection() {
  return (
    <section className="py-20 md:py-24 bg-brand-darker border-t border-white/5 relative z-10 select-none">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-white/60 text-[12px] md:text-[13px] font-semibold tracking-[0.2em] uppercase mb-12">
          Used across <span className="text-white font-extrabold">1 million+</span> companies
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 lg:gap-28 opacity-90 transition-all duration-300">
          {/* AssemblyAI */}
          <div className="flex items-center gap-3 text-white hover:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M12 2L2 22H7.5L12 12.5L16.5 22H22L12 2Z" fill="currentColor"/>
              <path d="M12 7L8 16H16L12 7Z" fill="#0b0914"/>
            </svg>
            <span className="text-[19px] font-bold tracking-tight">AssemblyAI</span>
          </div>

          {/* EMAAR MISR */}
          <div className="flex items-baseline gap-1 text-white hover:opacity-100 transition-opacity">
            <span className="text-[22px] font-serif font-bold tracking-[0.15em]">EMAAR</span>
            <span className="text-[11px] font-sans font-medium tracking-[0.1em] text-white/60 ml-0.5">MISR</span>
          </div>

          {/* Leonardo.Ai */}
          <div className="flex items-center gap-2.5 text-white hover:opacity-100 transition-opacity">
            <div className="w-5.5 h-5.5 rounded-full border border-white/80 flex items-center justify-center p-0.5">
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400"></div>
            </div>
            <span className="text-[18px] font-bold tracking-tight">Leonardo.Ai</span>
          </div>

          {/* Penn (University of Pennsylvania) */}
          <div className="flex items-center gap-2.5 text-white hover:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-white">
              <path d="M12 2L4 5V11C4 16.5 7.5 21.5 12 23C16.5 21.5 20 16.5 20 11V5L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M7 8H17M7 12H17M7 16H13" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[20px] font-serif font-bold tracking-tight text-white">Penn</span>
              <span className="text-[8px] font-sans uppercase tracking-[0.08em] text-white/60 -mt-0.5">University of Pennsylvania</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
