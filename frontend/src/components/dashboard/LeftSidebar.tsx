"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Sparkles, Video, ListTodo, Zap, BarChart2, Headphones, 
  Settings, Mail, Puzzle, UserPlus, ChevronDown, PanelLeft
} from "lucide-react";

export default function LeftSidebar() {
  const pathname = usePathname();
  const isCollapsed = pathname !== "/home"; 

  return (
    <aside className={`bg-[#fafafb] border-r border-gray-200 flex flex-col h-screen transition-all duration-300 z-40 shrink-0 ${isCollapsed ? "w-[68px]" : "w-64"}`}>
      
      {/* Workspace / User Dropdown */}
      <div className={`h-14 flex items-center px-4 shrink-0 ${isCollapsed ? "justify-center px-0" : "justify-between"}`}>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-[#6b21a8] rounded flex items-center justify-center text-white font-bold text-xs shrink-0">K</div>
          {!isCollapsed && (
            <div className="flex items-center gap-1 ml-3 text-sm font-medium text-gray-800 cursor-pointer">
              Khushi <ChevronDown size={14} className="text-gray-400" />
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button className="text-gray-400 hover:text-gray-600">
            <PanelLeft size={18} />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto flex flex-col gap-1 px-3">
        <NavItem href="/home" icon={<Home size={18} />} label="Home" active={pathname === "/home" || pathname === "/meeting-prep"} collapsed={isCollapsed} />
        <NavItem href="/askfred" icon={<Sparkles size={18} />} label="AskFred" active={pathname === "/askfred"} collapsed={isCollapsed} iconColor="text-[#5e43c9]" />
        <NavItem href="/meetings" icon={<Video size={18} />} label="Meetings" active={pathname === "/meetings"} collapsed={isCollapsed} />
        <NavItem href="/tasks" icon={<ListTodo size={18} />} label="Tasks" active={pathname === "/tasks"} collapsed={isCollapsed} />
        <NavItem href="/ai-skills/daily-brief" icon={<Zap size={18} />} label="AI Skills" active={pathname.includes("/ai-skills")} collapsed={isCollapsed} />
        
        <div className="my-2 border-t border-gray-200"></div>

        <NavItem href="#" icon={<BarChart2 size={18} />} label="Analytics" active={false} collapsed={isCollapsed} />
        <NavItem href="#" icon={<Headphones size={18} />} label="Voice Agents" active={false} collapsed={isCollapsed} />
        
        <div className="mt-2 flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer transition-colors group">
           <Zap size={18} className="shrink-0" />
           {!isCollapsed && (
             <>
               <span className="flex-1">Upgrade</span>
               <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">40% OFF</span>
             </>
           )}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-gray-200 space-y-1">
        <NavItem href="#" icon={<Mail size={18} />} label="Try Email Assistant" active={false} collapsed={isCollapsed} iconColor="text-red-500" />
        <NavItem href="#" icon={<Puzzle size={18} />} label="Integrations" active={false} collapsed={isCollapsed} />
        <NavItem href="#" icon={<Settings size={18} />} label="Settings" active={false} collapsed={isCollapsed} />
      </div>

      {/* Invite Widget (Only when expanded) */}
      {!isCollapsed && (
        <div className="m-4 p-4 bg-[#f3f0f7] rounded-xl border border-purple-100 relative text-center">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-brand-purple">
             <UserPlus size={18} />
          </div>
          <p className="text-xs font-medium text-gray-800 mb-3 leading-relaxed">Invite coworkers to your Fireflies team</p>
          <button className="w-full bg-[#4c319e] hover:bg-[#3d2780] text-white py-1.5 rounded text-xs font-semibold transition-colors">
            Create Team
          </button>
          <div className="flex justify-center gap-1 mt-3">
             <div className="w-1 h-1 bg-brand-purple rounded-full"></div>
             <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      )}

    </aside>
  );
}

function NavItem({ href, icon, label, active, collapsed, iconColor = "text-gray-500" }: { href: string, icon: React.ReactNode, label: string, active: boolean, collapsed: boolean, iconColor?: string }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-colors ${
        active ? "bg-[#f1f1f4] text-gray-900 font-medium" : `text-gray-600 hover:bg-[#f1f1f4] hover:text-gray-900`
      } ${collapsed ? "justify-center px-0 py-3 mx-2" : ""}`}
      title={collapsed ? label : ""}
    >
      <div className={`${active ? "text-[#5e43c9]" : iconColor}`}>{icon}</div>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
