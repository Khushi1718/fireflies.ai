"use client";

import { Search, Radio, MessageSquare, Bookmark, Smile } from 'lucide-react';

export function SkinnySidebar() {
  return (
    <div className="w-11 border-r border-gray-200/90 bg-[#fafafa] flex flex-col items-center py-3.5 shrink-0 h-full select-none">
      
      {/* Top Search Purple Circle */}
      <div className="w-7 h-7 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#7b52f6] cursor-pointer shadow-sm border border-purple-100 mb-5 hover:scale-105 transition-transform" title="Search in meeting">
        <Search size={14} />
      </div>

      {/* Nav Icons */}
      <div className="flex flex-col gap-5 text-gray-400">
        <button className="hover:text-gray-700 transition-colors p-1 cursor-pointer" title="Live audio">
          <Radio size={16} />
        </button>
        <button className="hover:text-gray-700 transition-colors p-1 cursor-pointer" title="Comments & Notes">
          <MessageSquare size={16} />
        </button>
        <button className="hover:text-gray-700 transition-colors p-1 cursor-pointer" title="Bookmarks">
          <Bookmark size={16} />
        </button>
      </div>

      {/* Spacer to push reaction smiley to the bottom */}
      <div className="flex-1" />

      {/* Bottom Smiley Face */}
      <button className="text-gray-400 hover:text-gray-700 transition-colors p-1 cursor-pointer mb-2" title="Add reaction">
        <Smile size={16} />
      </button>

    </div>
  );
}
