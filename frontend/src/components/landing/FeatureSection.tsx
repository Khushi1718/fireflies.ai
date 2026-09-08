
"use client";

import Link from "next/link";
import { ArrowRight, Search, ChevronDown } from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="bg-white py-24 md:py-32 relative z-10 text-gray-900 select-none">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="flex flex-col">
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-semibold text-gray-900 tracking-tight leading-[1.12] mb-8">
            High Quality Meeting <br />
            <span className="text-[#7b52f6] font-semibold">Transcription</span> &amp; <span className="text-[#7b52f6] font-semibold">Recording</span>
          </h2>

          <div className="mb-12">
            <Link 
              href="/home"
              className="inline-flex items-center gap-2.5 bg-[#7b52f6] hover:bg-[#6742d1] text-white px-7 py-3.5 rounded-xl text-base font-bold transition-all shadow-md shadow-purple-500/20 hover:scale-[1.02] cursor-pointer"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </div>

          {/* 2x2 Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {/* 1. 95% Accurate */}
            <div>
              <div className="w-7 h-7 flex items-center justify-center text-gray-900 mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <line x1="12" y1="1" x2="12" y2="4"/>
                  <line x1="12" y1="20" x2="12" y2="23"/>
                  <line x1="1" y1="12" x2="4" y2="12"/>
                  <line x1="20" y1="12" x2="23" y2="12"/>
                </svg>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-gray-900 mb-1.5">95% Accurate</h3>
              <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed max-w-[280px]">
                Fireflies is the industry leader in transcription accuracy.
              </p>
            </div>

            {/* 2. 100+ Languages */}
            <div>
              <div className="w-7 h-7 flex items-center justify-center text-gray-900 mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-gray-900 mb-1.5">100+ Languages</h3>
              <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed max-w-[280px]">
                Transcribe meetings in English, Spanish, French, &amp; several others.
              </p>
            </div>

            {/* 3. Speaker Recognition */}
            <div>
              <div className="w-7 h-7 flex items-center justify-center text-gray-900 mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-gray-900 mb-1.5">Speaker Recognition</h3>
              <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed max-w-[280px]">
                Fireflies identifies different speakers in meetings and audio files.
              </p>
            </div>

            {/* 4. Auto-Language Detection */}
            <div>
              <div className="w-7 h-7 flex items-center justify-center text-gray-900 mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-gray-900 mb-1.5">Auto-Language Detection</h3>
              <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed max-w-[280px]">
                Automatically switch languages from meeting to meeting with ease.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Transcript Card (Exact match to fireflies.ai Images 2 & 3) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] p-7 w-full max-w-[480px] lg:ml-auto overflow-hidden">
          {/* Card Header */}
          <h3 className="font-medium text-gray-700 text-[13px] mb-3">Transcript</h3>

          {/* Search Box */}
          <div className="relative mb-6">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              readOnly
              className="w-full bg-[#f8fafc] border border-gray-100 rounded-lg py-2.5 pl-9 pr-3 text-xs text-gray-500 placeholder-gray-400 focus:outline-none cursor-default"
            />
          </div>
          
          {/* Turns List */}
          <div className="space-y-6 overflow-hidden">
            {/* Turn 1: Cate */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded overflow-hidden shrink-0 mt-0.5">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" 
                  alt="Cate" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs mb-1">
                  <span className="font-semibold text-gray-900">Cate</span>
                  <ChevronDown size={11} className="text-gray-400" />
                  <span className="text-gray-300">·</span>
                  <span className="text-[#7b52f6] underline cursor-pointer font-mono text-[11px]">00:53</span>
                </div>
                <p className="text-[12px] text-gray-600 leading-relaxed">
                  There&apos;s some concern about onboarding. Clients feel it&apos;s not intuitive enough.
                </p>
                {/* Cyan Bookmark Ribbon Icon */}
                <div className="mt-2 text-[#06b6d4]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#06b6d4" stroke="#06b6d4" strokeWidth="1.5">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Turn 2: Rohan */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#ffedd5] text-[#ea580c] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                R
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs mb-1">
                  <span className="font-semibold text-gray-900">Rohan</span>
                  <ChevronDown size={11} className="text-gray-400" />
                  <span className="text-gray-300">·</span>
                  <span className="text-[#7b52f6] underline cursor-pointer font-mono text-[11px]">01:24</span>
                </div>
                <p className="text-[12px] text-gray-600 leading-relaxed">
                  Noted. We&apos;ll pass that to product. On the seating front, how are we doing with capacity?
                </p>
              </div>
            </div>

            {/* Turn 3: Tom */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-[#fce7f3] text-[#db2777] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                T
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs mb-1">
                  <span className="font-semibold text-gray-900">Tom</span>
                  <ChevronDown size={11} className="text-gray-400" />
                  <span className="text-gray-300">·</span>
                  <span className="text-[#7b52f6] underline cursor-pointer font-mono text-[11px]">01:47</span>
                </div>
                {/* Typing bar placeholder */}
                <div className="h-2 bg-gray-100 rounded-full w-40 mt-2"></div>
              </div>
            </div>

            {/* Turn 4: Cate (peeking) */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded overflow-hidden shrink-0 mt-0.5">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" 
                  alt="Cate" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs mb-1">
                  <span className="font-semibold text-gray-900">Cate</span>
                  <ChevronDown size={11} className="text-gray-400" />
                  <span className="text-gray-300">·</span>
                  <span className="text-[#7b52f6] underline cursor-pointer font-mono text-[11px]">02:19</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
