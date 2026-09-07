export default function LogosSection() {
  return (
    <section className="py-16 bg-brand-darker border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-10">
          Used across 1 million+ companies
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="text-2xl">A</span> AssemblyAI
          </div>
          <div className="flex items-center gap-2 text-xl font-serif font-bold text-white tracking-widest">
            EMAAR <span className="text-sm font-sans font-normal tracking-normal text-white/70 mt-1">MISR</span>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-white">
             <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">L</div>
             Leonardo.Ai
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-white">
             <div className="w-8 h-8 rounded bg-red-900 flex items-center justify-center border border-red-800 text-white text-xs">Penn</div>
          </div>
        </div>
      </div>
    </section>
  );
}
