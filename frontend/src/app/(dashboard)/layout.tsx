import LeftSidebar from "@/components/dashboard/LeftSidebar";
import RightSidebar from "@/components/dashboard/RightSidebar";
import TopNav from "@/components/dashboard/TopNav";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-white font-sans text-gray-900 overflow-hidden">
      
      {/* Top Banner (Full Width) */}
      <div className="bg-[#f8f6fc] border-b border-purple-100 py-1.5 px-4 text-center flex items-center justify-center gap-2 text-[13px] text-gray-700 shrink-0 relative">
        You are eligible for 7 days business plan free trial. 
        <Link href="#" className="text-brand-purple font-medium hover:underline flex items-center gap-1">
          Start free trial <span className="text-sm leading-none">→</span>
        </Link>
        <button className="absolute right-4 text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-10 bg-white">
          <TopNav />
          <main className="flex-1 overflow-y-auto relative">
            {children}
          </main>
        </div>

        {/* Right Sidebar (AskFred) */}
        <RightSidebar />
      </div>
    </div>
  );
}
