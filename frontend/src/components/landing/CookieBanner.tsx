"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('fireflies_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem('fireflies_cookie_consent', 'accepted');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#121212]/95 backdrop-blur-md border-t border-white/10 p-4 sm:p-5 z-50 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-white max-w-3xl">
        <h4 className="font-bold text-sm mb-1">Your privacy</h4>
        <p className="text-xs text-gray-400 leading-relaxed">
          Store cookies to enhance your experience, improve navigation, analyze site usage, and assist in delivering content that's more relevant to you.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={handleDismiss}
          className="bg-[#242424] text-white hover:bg-[#333] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-white/10 cursor-pointer"
        >
          Preference
        </button>
        <button 
          onClick={handleDismiss}
          className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm cursor-pointer"
        >
          Accept all cookies
        </button>
      </div>
    </div>
  );
}
