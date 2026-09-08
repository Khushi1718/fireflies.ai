"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface NavbarProps {
  isScrolled?: boolean;
}

export default function Navbar({ isScrolled = false }: NavbarProps) {
  return (
    <header className="flex items-center justify-between px-6 py-3.5 max-w-7xl mx-auto w-full z-50 relative select-none">
      <div className="flex items-center gap-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="bg-[#ec4899] p-1 rounded-md text-white flex flex-wrap w-6 h-6 items-center justify-center relative overflow-hidden shrink-0 shadow-sm">
             <div className="w-2 h-2 bg-white rounded-tl-sm absolute top-1 left-1"></div>
             <div className="w-2 h-2 bg-white absolute top-1 right-1"></div>
             <div className="w-2 h-2 bg-white absolute bottom-1 left-1"></div>
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}>
            fireflies.ai
          </span>
        </Link>

        {/* Nav Links */}
        <nav className={`hidden lg:flex items-center gap-7 text-sm font-medium transition-colors ${isScrolled ? "text-gray-600" : "text-white/90"}`}>
          <div className={`flex items-center gap-1 cursor-pointer transition-colors ${isScrolled ? "hover:text-gray-900" : "hover:text-white"}`}>
            Product <ChevronDown size={14} className={isScrolled ? "text-gray-400" : "opacity-70"} />
          </div>
          <div className={`flex items-center gap-1 cursor-pointer transition-colors ${isScrolled ? "hover:text-gray-900" : "hover:text-white"}`}>
            Solutions <ChevronDown size={14} className={isScrolled ? "text-gray-400" : "opacity-70"} />
          </div>
          <div className={`flex items-center gap-1 cursor-pointer transition-colors ${isScrolled ? "hover:text-gray-900" : "hover:text-white"}`}>
            Integration <ChevronDown size={14} className={isScrolled ? "text-gray-400" : "opacity-70"} />
          </div>
          <div className={`flex items-center gap-1 cursor-pointer transition-colors ${isScrolled ? "hover:text-gray-900" : "hover:text-white"}`}>
            Resources <ChevronDown size={14} className={isScrolled ? "text-gray-400" : "opacity-70"} />
          </div>
          <Link href="#enterprise" className={`transition-colors ${isScrolled ? "hover:text-gray-900" : "hover:text-white"}`}>Enterprise</Link>
          <Link href="#pricing" className={`transition-colors ${isScrolled ? "hover:text-gray-900" : "hover:text-white"}`}>Pricing</Link>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button className={`hidden sm:block px-4 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer ${
          isScrolled 
            ? "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 shadow-sm" 
            : "bg-white text-gray-900 hover:bg-white/90 shadow-sm"
        }`}>
          Request Demo
        </button>

        <Link 
          href="/home" 
          className="bg-[#6d28d9] hover:bg-[#5b21b6] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm cursor-pointer"
        >
          Open App
        </Link>
      </div>
    </header>
  );
}
