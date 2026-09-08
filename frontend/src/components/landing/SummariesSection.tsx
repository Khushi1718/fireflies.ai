"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TABS = [
  {
    id: "overview",
    title: "Overview",
    imagePosition: "0px 0px",
  },
  {
    id: "bullet_points",
    title: "Bullet Points",
    imagePosition: "0px -250px",
  },
  {
    id: "action_items",
    title: "Action Items",
    imagePosition: "0px -630px",
  },
  {
    id: "custom_notes",
    title: "Custom Notes",
    imagePosition: "0px -880px",
  },
];

export default function SummariesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance timer (3000ms per tab)
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % TABS.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeIndex, isPaused]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(false);
  };

  return (
    <section className="bg-[#100730] py-14 md:py-18 relative z-10 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-tight">
              Comprehensive <span className="text-[#8e74fe]">AI Summaries</span>
            </h2>
            <p className="text-[#9ca3af] text-base md:text-lg max-w-[580px] leading-relaxed">
              Get detailed notes, action items, and customized summaries instantly after every meeting.
            </p>
          </div>
          <Link 
            href="/home"
            className="bg-[#7a5af8] hover:bg-[#6846f3] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shrink-0 transition-colors shadow-sm"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>

        {/* Interactive Tabs with Progress Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 md:mb-10">
          {TABS.map((tab, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(idx)}
                type="button"
                className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer overflow-hidden select-none ${
                  isActive
                    ? "bg-white text-[#101828] shadow-md"
                    : "bg-white/[0.08] hover:bg-white/[0.14] text-white/80 hover:text-white border border-transparent"
                }`}
              >
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#7a5af8]/20 overflow-hidden rounded-b-lg">
                    <div
                      key={`tab-progress-${activeIndex}`}
                      className={`h-full bg-[#7a5af8] pointer-events-none animate-tabs-progress ${
                        isPaused ? "paused" : ""
                      }`}
                    />
                  </div>
                )}
                <span className="relative z-10">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* UI Mockup Card with Exact Sliding Canvas */}
        <div 
          className="w-full overflow-hidden flex justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="w-[1200px] flex-none flex flex-col items-center relative rounded-t-xl overflow-hidden shadow-2xl border border-[#2b254d]/40 bg-white">
            {/* Top Bar (Exact Header Image) */}
            <img 
              src="/images/ai-summary-navbar.png" 
              alt="Notepad Navbar" 
              className="w-[1200px] h-auto max-w-none block border-b border-gray-100/80"
              loading="eager"
            />

            {/* Document Content Viewport */}
            <div className="relative w-[1200px] h-[540px] md:h-[640px] overflow-hidden bg-white">
              <img 
                src="/images/ai-summary-canvas.webp" 
                alt="Notepad Content" 
                className="w-[1200px] h-[540px] md:h-[640px] max-w-none object-cover transition-all ease-in-out duration-500"
                style={{ objectPosition: TABS[activeIndex].imagePosition }}
                loading="eager"
              />

              {/* Bottom Fade Gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
