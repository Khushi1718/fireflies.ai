"use client";
import { useState } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#171717] border-t border-white/10 p-6 z-50 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-white max-w-3xl">
        <h4 className="font-bold mb-1">Your privacy</h4>
        <p className="text-sm text-gray-400">
          Store cookies to enhance your experience, improve navigation, analyze site usage, and assist in delivering content that's more relevant to you.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={() => setIsVisible(false)}
          className="bg-[#2a2a2a] text-white hover:bg-[#333] px-4 py-2 rounded-md text-sm font-semibold transition-colors border border-white/10"
        >
          Preference
        </button>
        <button 
          onClick={() => setIsVisible(false)}
          className="bg-brand-purple text-white hover:bg-brand-purple-hover px-4 py-2 rounded-md text-sm font-semibold transition-colors"
        >
          Accept all cookies
        </button>
      </div>
    </div>
  );
}
