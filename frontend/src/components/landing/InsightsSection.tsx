"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Check, Search } from "lucide-react";

interface TabItem {
  id: string;
  title: string;
  description: string;
}

const TABS: TabItem[] = [
  {
    id: "talktime",
    title: "Speaker Talk-time",
    description: "Automatically track each participant's speaking time and easily monitor participation in meetings.",
  },
  {
    id: "filters",
    title: "AI Filters",
    description: "In one-click, filter our key questions, tasks, budget, metrics and more using LLM-powered AI filters",
  },
  {
    id: "sentiment",
    title: "Sentiment Analysis",
    description: "Visualize positive, negative, and neutral sentiment across your team's conversations.",
  },
  {
    id: "trackers",
    title: "Topic Trackers",
    description: "Automatically identify key topics and track relevant keywords discussed in your meetings.",
  },
];

export default function InsightsSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [key, setKey] = useState<number>(0); // key to trigger CSS progress bar restart
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance tabs every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % TABS.length);
      setKey((prevKey) => prevKey + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <section className="bg-white py-24 relative z-10 text-gray-900 select-none">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Interactive Accordion with Progress Bar */}
          <div>
            <h2 className="text-4xl md:text-[48px] font-extrabold mb-6 tracking-tight leading-[1.12] text-gray-900">
              Drive Insights With <br />
              <span className="text-[#7b52f6]">Conversation Intelligence</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-10 max-w-md">
              Detailed analytics to help you uncover insights across every conversation.
            </p>

            <div className="border-t border-gray-100 divide-y divide-gray-100">
              {TABS.map((tab, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div key={tab.id} className="relative overflow-hidden">
                    <button
                      onClick={() => handleTabClick(idx)}
                      className={`w-full py-5 text-left flex justify-between items-center font-bold text-base md:text-lg transition-colors cursor-pointer ${
                        isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      <span>{tab.title}</span>
                      {isActive ? (
                        <ChevronUp size={18} className="text-gray-700 shrink-0" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-400 shrink-0" />
                      )}
                    </button>

                    {/* Expanded Tab Description */}
                    {isActive && (
                      <div className="pb-6 pr-6 animate-fadeIn">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {tab.description}
                        </p>
                      </div>
                    )}

                    {/* Animated Timer Progress Bar */}
                    <div className="w-full bg-purple-100/70 h-[3px] relative overflow-hidden rounded-full">
                      {isActive && (
                        <div
                          key={key}
                          className={`h-full bg-[#7b52f6] animate-tabs-progress ${
                            isPaused ? "paused" : ""
                          }`}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Interactive UI Mockup */}
          <div 
            className="relative pt-6 lg:pt-10 h-[580px] md:h-[630px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            
            {/* Base Transcript Card Background */}
            <div className="bg-white border border-gray-100 shadow-[0_15px_50px_rgba(0,0,0,0.06)] rounded-2xl w-full h-full p-6 text-sm relative flex flex-col overflow-hidden">
              <div className="text-gray-600 font-semibold text-xs mb-3 pb-3 border-b border-gray-100">
                Transcript
              </div>
              
              <div className="bg-[#f8fafc] border border-gray-100 rounded-lg p-2.5 text-gray-400 mb-6 flex items-center gap-2 text-xs">
                <Search size={14} className="text-gray-400" />
                <span>Search</span>
              </div>

              {/* Transcript Messages List */}
              <div className="space-y-6 opacity-60 flex-1">
                {/* Message 1 */}
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded bg-[#2dd4bf] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    T
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs mb-1">
                      <span className="font-semibold text-gray-900">Tom</span>
                      <ChevronDown size={11} className="text-gray-400" />
                      <span className="text-gray-300">·</span>
                      <span className="text-[#7b52f6] underline font-mono text-[11px]">00:53</span>
                    </div>
                    <p className="text-[12px] text-gray-600 leading-relaxed">
                      There&apos;s some concern about onboarding. Clients feel it&apos;s not intuitive enough.
                    </p>
                  </div>
                </div>

                {/* Message 2 */}
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded bg-[#ffedd5] text-[#ea580c] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    R
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs mb-1">
                      <span className="font-semibold text-gray-900">Rohan</span>
                      <ChevronDown size={11} className="text-gray-400" />
                      <span className="text-gray-300">·</span>
                      <span className="text-[#7b52f6] underline font-mono text-[11px]">01:24</span>
                    </div>
                    <p className="text-[12px] text-gray-600 leading-relaxed">
                      Noted. We&apos;ll pass that to product. On the seating front—how are we doing with capacity?
                    </p>
                  </div>
                </div>

                {/* Message 3 */}
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded bg-[#fce7f3] text-[#db2777] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    T
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs mb-1">
                      <span className="font-semibold text-gray-900">Tom</span>
                      <ChevronDown size={11} className="text-gray-400" />
                      <span className="text-gray-300">·</span>
                      <span className="text-[#7b52f6] underline font-mono text-[11px]">01:47</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING GRAPHIC OVERLAY — Changes based on activeIndex */}
            
            {/* Tab 0: Speaker Talk-Time Popover */}
            {activeIndex === 0 && (
              <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 w-60 p-4 z-20 space-y-3.5 transition-all duration-300 animate-fadeIn">
                {/* Speaker 1: Cate */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" 
                      alt="Cate" 
                      className="w-6 h-6 rounded-full object-cover" 
                    />
                    <span className="text-xs font-semibold text-gray-800">Cate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-[#7b52f6] border-t-transparent animate-spin"></div>
                    <span className="text-xs font-mono text-gray-500 font-medium">64%</span>
                  </div>
                </div>

                {/* Speaker 2: Rohan */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#ffedd5] text-[#ea580c] flex items-center justify-center font-bold text-[10px]">
                      R
                    </div>
                    <span className="text-xs font-semibold text-gray-800">Rohan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-orange-400 border-t-transparent animate-spin"></div>
                    <span className="text-xs font-mono text-gray-500 font-medium">24%</span>
                  </div>
                </div>

                {/* Speaker 3: Tom */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#fce7f3] text-[#db2777] flex items-center justify-center font-bold text-[10px]">
                      T
                    </div>
                    <span className="text-xs font-semibold text-gray-800">Tom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-pink-400 border-t-transparent animate-spin"></div>
                    <span className="text-xs font-mono text-gray-500 font-medium">8%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 1: AI Filters Popover */}
            {activeIndex === 1 && (
              <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 w-56 py-2.5 z-20 transition-all duration-300 animate-fadeIn">
                <div className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between text-xs text-gray-600 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    <span>Questions</span>
                  </div>
                  <span className="text-gray-400 font-medium">8</span>
                </div>

                <div className="px-4 py-2 bg-emerald-50/90 border border-emerald-200/60 flex items-center justify-between text-xs text-gray-900 cursor-pointer my-1 mx-1.5 rounded-md font-medium">
                  <div className="flex items-center gap-2">
                    <Check size={13} className="text-emerald-500 stroke-[3]"/>
                    <span>Tasks</span>
                  </div>
                  <span className="text-gray-500 font-semibold">8</span>
                </div>

                <div className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between text-xs text-gray-600 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                    <span>Pricing</span>
                  </div>
                  <span className="text-gray-400 font-medium">2</span>
                </div>

                <div className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between text-xs text-gray-600 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <span>Metrics</span>
                  </div>
                  <span className="text-gray-400 font-medium">3</span>
                </div>
              </div>
            )}

            {/* Tab 2: Sentiment Analysis Popover */}
            {activeIndex === 2 && (
              <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 w-60 p-4 z-20 space-y-3 transition-all duration-300 animate-fadeIn">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-emerald-600">Positive</span>
                    <span className="text-gray-600">72%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[72%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600">Neutral</span>
                    <span className="text-gray-600">20%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-gray-400 h-full w-[20%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-rose-500">Negative</span>
                    <span className="text-gray-600">8%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[8%] rounded-full"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Topic Trackers Popover */}
            {activeIndex === 3 && (
              <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 w-56 py-2 z-20 transition-all duration-300 animate-fadeIn">
                <div className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between text-xs text-gray-600 cursor-pointer">
                  <span className="text-gray-700"># Seats</span>
                  <span className="text-gray-400 font-medium">2</span>
                </div>

                <div className="px-4 py-2 bg-purple-50/90 border border-purple-200/80 flex items-center justify-between text-xs text-purple-900 cursor-pointer my-1 mx-1.5 rounded-md font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Check size={13} className="text-[#7b52f6] stroke-[3]"/>
                    <span># Feedback</span>
                  </div>
                  <span className="text-[#7b52f6]">4</span>
                </div>

                <div className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between text-xs text-gray-600 cursor-pointer">
                  <span className="text-gray-700"># Timeline</span>
                  <span className="text-gray-400 font-medium">6</span>
                </div>

                <div className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between text-xs text-gray-600 cursor-pointer">
                  <span className="text-gray-700"># Pricing</span>
                  <span className="text-gray-400 font-medium">3</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
