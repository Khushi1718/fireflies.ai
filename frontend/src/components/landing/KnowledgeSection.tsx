"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Check, PieChart, User, BarChart2, Search, Users } from "lucide-react";

type TabType = "tasks" | "contacts" | "feed";

const TABS: { id: TabType; label: string }[] = [
  { id: "tasks", label: "Tasks" },
  { id: "contacts", label: "Contacts" },
  { id: "feed", label: "Feed" },
];

export default function KnowledgeSection() {
  const [activeTab, setActiveTab] = useState<TabType>("tasks");
  const [key, setKey] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance tabs every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => {
        if (prev === "tasks") return "contacts";
        if (prev === "contacts") return "feed";
        return "tasks";
      });
      setKey((prevKey) => prevKey + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [activeTab, isPaused]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <section className="bg-brand-darker py-24 relative z-10 text-white select-none">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Top Header Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-[48px] font-extrabold mb-4 tracking-tight leading-[1.12]">
              All Your <span className="text-[#a78bfa]">Tasks, Contacts</span>, &amp; <br />
              <span className="text-[#a78bfa]">Knowledge</span> In One Place
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Understand what&apos;s happening across the company and what your team needs to get done.
            </p>
          </div>
          
          <Link 
            href="/home"
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 shrink-0 shadow-lg shadow-purple-900/30"
          >
            Get Started <ArrowRight size={18} />
          </Link>
        </div>

        {/* Tab Pills with Animated Timer Bar */}
        <div className="flex justify-center gap-2 mb-10">
          <div className="bg-[#18142a] p-1.5 rounded-2xl flex items-center gap-1.5 border border-white/10 shadow-inner">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-white text-gray-900 shadow-md"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {/* Progress Fill at bottom inside active white button pill matching Screenshot 1 */}
                  {isActive && (
                    <div
                      key={key}
                      className={`absolute bottom-0 left-0 h-[7px] bg-[#7c3aed] animate-tabs-progress ${
                        isPaused ? "paused" : ""
                      }`}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Outer Purple Background Card — Tall Responsive Height matching actual Fireflies UI */}
        <div 
          className="bg-gradient-to-b from-[#2a1b54] to-brand-darker rounded-3xl pt-10 sm:pt-12 px-4 sm:px-12 md:px-20 flex justify-center relative overflow-hidden h-[620px] sm:h-[670px] md:h-[710px] border border-white/10 shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle starry background inside */}
          <div className="absolute inset-0 starry-bg opacity-30 pointer-events-none"></div>

          {/* Floating App Icons on Left & Right Margins */}
          <div className="absolute left-6 top-1/4 flex flex-col gap-6 text-white/40 pointer-events-none hidden sm:flex">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 text-xs font-bold shadow-md">As</div>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xs font-bold shadow-md">⚙</div>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold shadow-md">Sl</div>
          </div>
          <div className="absolute right-6 top-1/4 flex flex-col gap-6 text-white/40 pointer-events-none hidden sm:flex">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold shadow-md">M</div>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs font-bold shadow-md">T</div>
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 text-xs font-bold shadow-md">Tr</div>
          </div>

          {/* White Main Inner Card */}
          <div className="bg-white rounded-t-2xl shadow-2xl w-full max-w-4xl text-gray-900 p-6 md:p-8 flex flex-col relative z-20 h-full border-t border-x border-gray-200 overflow-hidden">
            
            {/* VIEW 1: TASKS TAB */}
            {activeTab === "tasks" && (
              <div className="flex flex-col h-full animate-fadeIn relative">
                {/* Header Switcher inside card */}
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-100 p-1 rounded-lg flex items-center gap-1 text-xs font-semibold text-gray-600">
                    <button className="bg-white text-gray-900 px-3 py-1 rounded-md shadow-sm">All Tasks</button>
                    <button className="px-3 py-1 hover:text-gray-900">My Tasks</button>
                  </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-6 overflow-y-auto pr-2 flex-1 scrollbar-thin">
                  {/* Task Group 1 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center">
                        D
                      </div>
                      <span className="font-bold text-xs text-gray-900">Demo / Janice &amp; Abhishek</span>
                      <span className="text-xs text-gray-400">Wed · 11:00 AM</span>
                    </div>

                    <div className="space-y-3 pl-7">
                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" readOnly className="rounded border-gray-300 text-purple-600 focus:ring-0" />
                          <span className="text-gray-800 font-medium">Ensure Accessibility and Inclusivity Compliance.</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                          <span>Janice</span>
                          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" alt="Janice" className="w-4 h-4 rounded-full object-cover" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" readOnly className="rounded border-gray-300 text-purple-600 focus:ring-0" />
                          <span className="text-gray-800 font-medium">Check with PMs about pipeline options for HubSpot.</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                          <span>Keith</span>
                          <span className="w-4 h-4 rounded-full bg-teal-300 text-teal-800 flex items-center justify-center font-bold text-[9px]">K</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked readOnly className="rounded border-gray-300 text-[#7c3aed] focus:ring-0 accent-[#7c3aed]" />
                          <span className="text-gray-400 line-through">Share documents around data processing agreement.</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                          <span>Keith</span>
                          <span className="w-4 h-4 rounded-full bg-teal-300 text-teal-800 flex items-center justify-center font-bold text-[9px]">K</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Task Group 2 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                        S
                      </div>
                      <span className="font-bold text-xs text-gray-900">Growth Sync</span>
                      <span className="text-xs text-gray-400">Wed · 11:00 AM</span>
                    </div>

                    <div className="space-y-3 pl-7">
                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" readOnly className="rounded border-gray-300 text-purple-600 focus:ring-0" />
                          <span className="text-gray-800 font-medium">Engage with Alice to understand SEO strategy requirements</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                          <span>Krish</span>
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Krish" className="w-4 h-4 rounded-full object-cover" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" readOnly className="rounded border-gray-300 text-purple-600 focus:ring-0" />
                          <span className="text-gray-800 font-medium">Review Q3 product launch roadmap with engineering leads</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                          <span>Sarah</span>
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Sarah" className="w-4 h-4 rounded-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Task Group 3 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                        P
                      </div>
                      <span className="font-bold text-xs text-gray-900">Product Review</span>
                      <span className="text-xs text-gray-400">Thu · 2:30 PM</span>
                    </div>

                    <div className="space-y-3 pl-7">
                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" readOnly className="rounded border-gray-300 text-purple-600 focus:ring-0" />
                          <span className="text-gray-800 font-medium">Finalize pricing tier auto-fill feature specs for v2.0 release</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                          <span>Maria</span>
                          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" alt="Maria" className="w-4 h-4 rounded-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Video Call Participant Badge (Top Right) */}
                <div className="absolute top-2 right-2 w-48 h-32 rounded-xl overflow-hidden shadow-2xl border-2 border-blue-400 z-30 hidden sm:block">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" 
                    alt="Michael Hines" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full text-[10px]">
                    <span className="w-1.5 h-1.5 bg-white rounded-full block animate-ping"></span>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] text-white font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Michael Hines
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: CONTACTS TAB */}
            {activeTab === "contacts" && (
              <div className="flex flex-col h-full animate-fadeIn relative">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-100">
                  <Users size={16} className="text-[#7c3aed]" /> Contacts
                </div>

                <div className="space-y-6 overflow-y-auto pr-2 flex-1 text-xs scrollbar-thin">
                  {/* This Week */}
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 mb-3">This Week</div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" alt="Maria" className="w-8 h-8 rounded-md object-cover" />
                        <div>
                          <div className="font-bold text-gray-900 text-xs">Maria Orlova</div>
                          <div className="text-gray-400 text-[11px]">maria.sales@acme.com</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-8 h-8 rounded-md bg-teal-300 text-teal-800 font-bold flex items-center justify-center text-xs">K</div>
                        <div>
                          <div className="font-bold text-gray-900 text-xs">Keith Watts</div>
                          <div className="text-gray-400 text-[11px]">keith@acme.com</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Last Week */}
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 mb-3">Last Week</div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Rohan" className="w-8 h-8 rounded-md object-cover" />
                          <div>
                            <div className="font-bold text-gray-900 text-xs">Rohan Singh</div>
                            <div className="text-gray-400 text-[11px]">keith@acme.com</div>
                          </div>
                        </div>
                        <span className="text-gray-400 text-[11px]">May 09</span>
                      </div>

                      <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-amber-200 text-amber-800 font-bold flex items-center justify-center text-xs">J</div>
                          <div>
                            <div className="font-bold text-gray-900 text-xs">Jammie Canon</div>
                            <div className="text-gray-400 text-[11px]">canon.learners@tutor.com</div>
                          </div>
                        </div>
                        <span className="text-gray-400 text-[11px]">May 08</span>
                      </div>

                      <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Cate" className="w-8 h-8 rounded-md object-cover" />
                          <div>
                            <div className="font-bold text-gray-900 text-xs">Cate Worthington</div>
                            <div className="text-gray-400 text-[11px]">cate.design@intuitive.com</div>
                          </div>
                        </div>
                        <span className="text-gray-400 text-[11px]">May 07</span>
                      </div>

                      <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-indigo-200 text-indigo-800 font-bold flex items-center justify-center text-xs">C</div>
                          <div>
                            <div className="font-bold text-gray-900 text-xs">Cate Worthington</div>
                            <div className="text-gray-400 text-[11px]">cate.design@intuitive.com</div>
                          </div>
                        </div>
                        <span className="text-gray-400 text-[11px]">May 07</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-400 font-medium pt-2">May 6 - May 12</div>
                </div>

                {/* Floating AI Bio Popover Badge (Matches Screenshot perfectly) */}
                <div className="absolute top-10 right-0 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-emerald-100/90 w-80 p-4.5 z-30 transition-all duration-300 hidden sm:block">
                  <div className="flex items-center gap-3 mb-3">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" alt="Maria" className="w-8 h-8 rounded-md object-cover" />
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-xs">Maria Orlova</div>
                      <div className="text-gray-400 text-[10px]">maria.sales@acme.com</div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-semibold bg-gray-100 px-2 py-0.5 rounded-full">14 Meetings</span>
                  </div>

                  <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 text-[11px] leading-relaxed text-gray-700 shadow-sm">
                    <div className="flex items-center gap-1 text-emerald-600 font-bold mb-1">
                      <Sparkles size={12} />
                      <span>AI Bio:</span>
                    </div>
                    The last few meetings were about implementing GPT 4, figuring out pricing for auto-fill feature, and A/B testing summaries.
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: FEED TAB */}
            {activeTab === "feed" && (
              <div className="flex flex-col h-full animate-fadeIn">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-100">
                  <Sparkles size={16} className="text-emerald-500" /> AI Feed
                </div>

                <div className="space-y-6 overflow-y-auto pr-2 flex-1 scrollbar-thin">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Today</div>

                  <div className="flex items-start gap-4 p-3 rounded-xl bg-gray-50/60 border border-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                      alt="Planning Roadmap" 
                      className="w-10 h-10 rounded-lg object-cover mt-0.5 shadow-sm" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900 text-sm">Planning Roadmap</h4>
                        <span className="text-xs text-gray-400">Wed · 11:00 AM</span>
                      </div>
                      
                      <div className="space-y-2.5 text-xs text-gray-700 mt-3">
                        <div className="flex items-start gap-2.5">
                          <span className="text-sm">🎨</span>
                          <p><strong className="text-gray-900 font-semibold">Compatibility:</strong> Works with various project management apps, including Notion.</p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-sm">🚨</span>
                          <p><strong className="text-gray-900 font-semibold">Free Trial:</strong> Stephen expressed interest in the 7-day trial of the Business plan.</p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-sm">📊</span>
                          <p><strong className="text-gray-900 font-semibold">Competitor Comparison:</strong> Stephen evaluating other AI budget management tools.</p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-sm">🔍</span>
                          <p><strong className="text-gray-900 font-semibold">Analytics:</strong> Mariana values tracking recurring client requests for product development.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-xl bg-gray-50/60 border border-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                      alt="Sales Demo" 
                      className="w-10 h-10 rounded-lg object-cover mt-0.5 shadow-sm" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900 text-sm">Sales Demo &amp; Technical Deep-Dive</h4>
                        <span className="text-xs text-gray-400">Wed · 3:30 PM</span>
                      </div>
                      
                      <div className="space-y-2 text-xs text-gray-700 mt-2">
                        <div className="flex items-start gap-2">
                          <span className="text-sm">⚡</span>
                          <p><strong className="text-gray-900 font-semibold">CRM Sync:</strong> Verified automated hubspot contacts sync capability.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
