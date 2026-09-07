import { MessageSquare, Plus } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Top Controls */}
      <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100 max-w-5xl mx-auto w-full">
         <div className="flex bg-gray-50 p-1 rounded-md">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded border border-gray-200 text-[13px] font-medium text-gray-800">My Tasks</button>
            <button className="px-4 py-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-700">All Tasks</button>
         </div>
         <button className="flex items-center gap-2 text-[13px] text-gray-400 hover:text-gray-600 font-medium">
            <MessageSquare size={16} /> Share Feedback
         </button>
      </div>

      <div className="flex-1 flex flex-col items-center pt-8 px-6 max-w-5xl mx-auto w-full">
         
         {/* Connect Banner */}
         <div className="w-full bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm mb-24">
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded border border-gray-100 shadow-sm">
                  <div className="w-4 h-4 bg-red-400 rounded-sm"></div>
                  <div className="w-4 h-4 bg-orange-400 rounded-sm"></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                  <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
               </div>
               <p className="text-[14px] text-gray-700">
                  Automatically send all your tasks to your work apps.
               </p>
            </div>
            <button className="text-[#5e43c9] text-[13px] font-medium hover:underline px-4">
               Connect
            </button>
         </div>

         {/* Empty State */}
         <div className="text-center max-w-sm mt-8">
            <div className="flex flex-col items-center justify-center mb-6 text-[#d8b4fe]">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="6" rx="1"></rect><rect x="4" y="14" width="16" height="6" rx="1"></rect></svg>
            </div>
            
            <h2 className="text-[17px] font-medium text-gray-800 mb-2">
               All your meeting tasks in one place
            </h2>
            <p className="text-[14px] text-gray-500 mb-8">
               Manage, assign and update all your meeting tasks here.
            </p>
            
            <button className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-6 py-2 rounded-md text-[14px] font-medium transition-colors flex items-center justify-center gap-2 mx-auto shadow-sm">
               <Plus size={16} /> New
            </button>
         </div>

      </div>

    </div>
  );
}
