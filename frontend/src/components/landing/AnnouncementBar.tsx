export default function AnnouncementBar() {
  return (
    <div className="bg-[#10b981] md:bg-brand-purple text-white text-sm font-medium py-2 px-4 flex items-center justify-center gap-2 relative">
      <span className="bg-[#10b981] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider hidden md:inline-block">NEW</span>
      <p className="text-center">
        Meet Email Assistant: Your inbox triaged and replies auto-drafted.{' '}
        <a href="#" className="underline hover:text-white/80 transition-colors">See Now</a>
      </p>
      <button className="absolute right-4 text-white/70 hover:text-white">
        ✕
      </button>
    </div>
  );
}
