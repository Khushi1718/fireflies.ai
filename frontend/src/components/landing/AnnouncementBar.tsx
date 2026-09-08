"use client";

import { useState } from "react";

export default function AnnouncementBar() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="bg-[#7b52f6] text-white text-[13px] font-medium py-2 px-4 flex items-center justify-center gap-2 relative z-50">
      <span className="bg-[#10b981] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block">NEW</span>
      <p className="text-center text-white/95">
        Meet Email Assistant: Your inbox triaged and replies auto-drafted.{' '}
        <a href="https://fireflies.ai/email-assistant" className="underline hover:text-white font-semibold transition-colors ml-1">See Now</a>
      </p>
      <button 
        onClick={() => setClosed(true)} 
        className="absolute right-4 text-white/70 hover:text-white p-1 transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}
