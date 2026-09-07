"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full z-50 relative">
      <div className="flex items-center gap-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#ec4899] p-1 rounded text-white flex flex-wrap w-6 h-6 items-center justify-center relative overflow-hidden">
             <div className="w-2 h-2 bg-white rounded-tl-sm absolute top-1 left-1"></div>
             <div className="w-2 h-2 bg-white absolute top-1 right-1"></div>
             <div className="w-2 h-2 bg-white absolute bottom-1 left-1"></div>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">fireflies.ai</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/90">
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
            Product <ChevronDown size={14} className="opacity-70" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
            Solutions <ChevronDown size={14} className="opacity-70" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
            Integration <ChevronDown size={14} className="opacity-70" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
            Resources <ChevronDown size={14} className="opacity-70" />
          </div>
          <Link href="#" className="hover:text-white transition-colors">Enterprise</Link>
          <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:block bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors">
          Request Demo
        </button>
        <Link 
          href="/home" 
          className="bg-brand-purple text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-brand-purple-hover transition-colors"
        >
          Open App
        </Link>
      </div>
    </header>
  );
}
