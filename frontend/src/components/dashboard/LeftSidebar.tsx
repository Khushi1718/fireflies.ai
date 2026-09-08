"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Home, Video, Zap, BarChart2, 
  Settings, Mail, Puzzle, UserPlus, ChevronDown, PanelLeft, PanelLeftClose
} from "lucide-react";
import { useSidebar } from "@/lib/SidebarContext";

export default function LeftSidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed, toggleSidebar } = useSidebar();
  const [showInviteWidget, setShowInviteWidget] = useState(true);

  // Hidden on individual meeting details and live meeting pages
  if (pathname.startsWith("/meetings/") || pathname.startsWith("/live/")) {
    return null;
  }

  return (
    <aside 
      className={`bg-[#fafafb] border-r border-gray-200/90 flex flex-col h-full shrink-0 transition-all duration-200 z-30 select-none ${
        isCollapsed ? "w-[52px]" : "w-[240px]"
      }`}
    >
      
      {/* Top Section: Account Avatar & Sidebar Toggle */}
      <div className={`h-12 flex items-center border-b border-transparent shrink-0 px-2.5 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {isCollapsed ? (
          /* Collapsed Header: Avatar with hover expand overlay */
          <div className="relative group">
            <button
              onClick={toggleSidebar}
              className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-all focus:outline-none cursor-pointer"
              title="Expand sidebar"
            >
              {/* Default Avatar */}
              <div className="w-7 h-7 bg-[#6b21a8] rounded-md flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm group-hover:opacity-0 transition-opacity">
                K
              </div>
              {/* Hover Overlay Icon */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 bg-gray-200/80 rounded-lg transition-opacity">
                <PanelLeft size={16} />
              </div>
            </button>
            {/* Tooltip */}
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block z-50 bg-gray-900 text-white text-[11px] px-2 py-1 rounded whitespace-nowrap shadow-md pointer-events-none">
              Expand sidebar
            </div>
          </div>
        ) : (
          /* Expanded Header: Avatar + User name + Collapse Button */
          <>
            <div className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-100 p-1.5 rounded-lg transition-colors flex-1 min-w-0 mr-1">
              <div className="w-6 h-6 bg-[#6b21a8] rounded flex items-center justify-center text-white font-bold text-xs uppercase shrink-0">
                K
              </div>
              <span className="text-[13px] font-semibold text-gray-800 truncate">Khushi</span>
              <ChevronDown size={14} className="text-gray-400 shrink-0 ml-auto" />
            </div>
            <button 
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors shrink-0 cursor-pointer"
              title="Collapse sidebar"
            >
              <PanelLeftClose size={16} />
            </button>
          </>
        )}
      </div>

      {/* Navigation Links */}
      <nav className={`flex-1 py-1.5 overflow-y-auto overflow-x-hidden flex flex-col ${isCollapsed ? "items-center px-1.5 gap-1" : "px-2 gap-0.5"} [scrollbar-width:none]`}>
        
        {/* Home */}
        <SidebarItem 
          href="/home" 
          icon={<Home size={16} />} 
          label="Home" 
          active={pathname === "/home"} 
          collapsed={isCollapsed} 
        />

        {/* AskFred with cute purple robot face */}
        <SidebarItem 
          href="/askfred" 
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#7b52f6]">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v4" />
              <line x1="8" y1="16" x2="8" y2="16" />
              <line x1="16" y1="16" x2="16" y2="16" />
            </svg>
          } 
          label="AskFred" 
          active={pathname === "/askfred"} 
          collapsed={isCollapsed} 
        />

        {/* Meetings */}
        <SidebarItem 
          href="/meetings" 
          icon={<Video size={16} />} 
          label="Meetings" 
          active={pathname === "/meetings"} 
          collapsed={isCollapsed} 
        />

        {/* Tasks (Notepad/checklist with lines) */}
        <SidebarItem 
          href="/tasks" 
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6h11" />
              <path d="M9 12h11" />
              <path d="M9 18h11" />
              <path d="m3 6 1.5 1.5L6 6" />
              <path d="m3 12 1.5 1.5L6 12" />
              <path d="m3 18 1.5 1.5L6 18" />
            </svg>
          } 
          label="Tasks" 
          active={pathname === "/tasks"} 
          collapsed={isCollapsed} 
        />

        {/* AI Skills (4-point sparkle star) */}
        <SidebarItem 
          href="/ai-skills/daily-brief" 
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          } 
          label="AI Skills" 
          active={pathname.includes("/ai-skills")} 
          collapsed={isCollapsed} 
        />

        {/* Divider */}
        <div className={`my-1.5 border-t border-gray-200/80 ${isCollapsed ? "w-5 mx-auto" : "mx-2"}`}></div>

        {/* Analytics */}
        <SidebarItem 
          href="#" 
          icon={<BarChart2 size={16} />} 
          label="Analytics" 
          active={false} 
          collapsed={isCollapsed} 
        />

        {/* Voice Agents / Bot face */}
        <SidebarItem 
          href="#" 
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          } 
          label="Voice Agents" 
          active={false} 
          collapsed={isCollapsed} 
        />

        {/* Upgrade with green dot */}
        <div 
          className={`flex items-center rounded-lg text-[13px] text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors group ${
            isCollapsed ? "justify-center w-8 h-8 mx-auto my-0.5" : "px-2.5 py-1.5 gap-2.5"
          }`}
          title={isCollapsed ? "Upgrade (40% OFF)" : ""}
        >
          <div className="relative shrink-0 flex items-center justify-center">
            <Zap size={16} className="text-gray-500 group-hover:text-amber-500 transition-colors" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-white"></span>
          </div>
          {!isCollapsed && (
            <div className="flex items-center justify-between flex-1 min-w-0">
              <span className="font-medium text-gray-800">Upgrade</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded-full">
                40% OFF
              </span>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className={`border-t border-gray-200/80 shrink-0 ${isCollapsed ? "py-2 px-1.5 flex flex-col items-center gap-1" : "p-2 space-y-0.5"}`}>
        {!isCollapsed && (
          <SidebarItem 
            href="#" 
            icon={<Mail size={16} className="text-red-500" />} 
            label="Try Email Assistant" 
            active={false} 
            collapsed={false} 
          />
        )}
        
        {/* User Plus (Invite) */}
        <SidebarItem 
          href="#" 
          icon={<UserPlus size={16} />} 
          label="Invite Team" 
          active={false} 
          collapsed={isCollapsed} 
        />

        {/* Integrations */}
        <SidebarItem 
          href="#" 
          icon={<Puzzle size={16} />} 
          label="Integrations" 
          active={false} 
          collapsed={isCollapsed} 
        />

        {/* Settings */}
        <SidebarItem 
          href="#" 
          icon={<Settings size={16} />} 
          label="Settings" 
          active={false} 
          collapsed={isCollapsed} 
        />
      </div>

      {/* Invite Card Widget (Visible only when expanded) */}
      {!isCollapsed && showInviteWidget && (
        <div className="m-3 p-3.5 bg-[#f4effa] rounded-xl border border-purple-100/60 relative text-center shrink-0">
          <button 
            onClick={() => setShowInviteWidget(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
            title="Dismiss"
          >
            ✕
          </button>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-[#7b52f6]">
             <UserPlus size={15} />
          </div>
          <p className="text-xs font-semibold text-gray-900 mb-2 leading-snug">
            Invite coworkers to your Fireflies team
          </p>
          <button className="w-full bg-[#4c319e] hover:bg-[#3d2780] text-white py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm cursor-pointer">
            Create Team
          </button>
          <div className="flex justify-center gap-1 mt-2">
             <div className="w-1.5 h-1.5 bg-[#4c319e] rounded-full"></div>
             <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      )}

    </aside>
  );
}

function SidebarItem({ 
  href, 
  icon, 
  label, 
  active, 
  collapsed, 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  collapsed: boolean; 
}) {
  return (
    <Link 
      href={href}
      className={`flex items-center rounded-lg text-[13px] font-medium transition-all group relative ${
        active 
          ? "bg-[#ede8f7] text-[#4c319e] font-semibold" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      } ${
        collapsed 
          ? "justify-center w-8 h-8 mx-auto my-0.5" 
          : "px-2.5 py-1.5 gap-2.5"
      }`}
      title={collapsed ? label : ""}
    >
      <div className={`shrink-0 flex items-center justify-center transition-colors ${active ? "text-[#4c319e]" : "text-gray-500 group-hover:text-gray-800"}`}>
        {icon}
      </div>
      {!collapsed && <span className="truncate">{label}</span>}
      
      {/* Tooltip for collapsed mode */}
      {collapsed && (
        <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 hidden group-hover:block z-50 bg-gray-900 text-white text-[11px] font-medium px-2 py-1 rounded whitespace-nowrap shadow-md pointer-events-none">
          {label}
        </div>
      )}
    </Link>
  );
}
