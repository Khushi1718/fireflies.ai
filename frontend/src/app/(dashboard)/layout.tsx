"use client";

import LeftSidebar from "@/components/dashboard/LeftSidebar";
import RightSidebar from "@/components/dashboard/RightSidebar";
import TopNav from "@/components/dashboard/TopNav";
import TrialModal from "@/components/dashboard/TrialModal";
import Link from "next/link";
import { SidebarProvider, useSidebar } from "@/lib/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </SidebarProvider>
  );
}

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { showTrialBanner, setShowTrialBanner, setShowTrialModal } = useSidebar();

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-gray-900 overflow-hidden relative">

      {/* Global Full-Screen Trial Modal (blurs everything including sidebars and AskFred) */}
      <TrialModal />

      {/* Top Banner (Full Width) */}
      {showTrialBanner && (
        <div className="bg-[#f8f6fc] border-b border-purple-100 py-1.5 px-4 text-center flex items-center justify-center gap-2 text-[13px] text-gray-700 shrink-0 relative z-20">
          <span>You are eligible for 7 days business plan free trial.</span>{" "}
          <button 
            onClick={() => setShowTrialModal(true)}
            className="text-[#7b52f6] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            Start free trial <span className="text-sm leading-none">→</span>
          </button>
          <button 
            onClick={() => setShowTrialBanner(false)}
            className="absolute right-4 text-gray-400 hover:text-gray-600 p-1 transition-colors cursor-pointer"
            title="Dismiss banner"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Workspace (Left Sidebar, Main Content, Right Sidebar) */}
      <div className="flex flex-1 overflow-hidden min-h-0 relative">
        {/* Left Sidebar (collapsible) */}
        <LeftSidebar />

        {/* Center Main Area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative bg-white">
          <TopNav />
          <main className="flex-1 overflow-y-auto min-h-0 relative [scrollbar-width:thin]">
            {children}
          </main>
        </div>

        {/* Right Sidebar (AskFred panel - hidden on meeting detail/live pages) */}
        <RightSidebar />
      </div>

    </div>
  );
}
