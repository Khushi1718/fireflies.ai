"use client";
import { useState, useEffect } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/90 text-gray-900" 
          : "bg-transparent text-white"
      }`}
    >
      {/* Only show announcement bar at the very top */}
      <div className={`transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'}`}>
        <AnnouncementBar />
      </div>
      <Navbar isScrolled={isScrolled} />
    </div>
  );
}
