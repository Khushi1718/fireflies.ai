import { Calendar, Plus, Video, ListTodo, FileText } from "lucide-react";

export default function MeetingPrepPage() {
  return (
    <div className="flex h-full min-h-screen bg-white">
      
      {/* Secondary Sidebar */}
      <div className="w-[260px] bg-[#fcfaff] border-r border-gray-200 shrink-0 flex flex-col hidden md:flex">
        <div className="p-5">
           <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-[#ff969c] rounded-lg flex items-center justify-center text-white shadow-sm">
                 <Calendar size={16} />
              </div>
              <div className="w-9 h-5 bg-[#7b52f6] rounded-full relative flex items-center px-0.5 cursor-pointer">
                 <div className="w-4 h-4 bg-white rounded-full absolute right-0.5"></div>
              </div>
           </div>
           <h2 className="font-semibold text-gray-800 text-[15px] mb-1.5">Meeting Prep</h2>
           <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
              Prepare for upcoming meetings with past context, open items and...
           </p>

           <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 bg-blue-50 rounded flex items-center justify-center border border-gray-100">
                    <span className="text-blue-500 text-[10px] font-bold">31</span>
                 </div>
                 <h3 className="font-semibold text-gray-800 text-[13px] leading-tight">Upcoming<br />Meetings</h3>
              </div>
              <div className="flex items-center gap-3">
                 <button className="text-[12px] text-gray-400 font-medium flex items-center gap-1 hover:text-[#7b52f6]">
                    ✓ Join All
                 </button>
                 <button className="text-[#7b52f6] hover:bg-purple-50 rounded p-1 transition-colors">
                    <Plus size={16} />
                 </button>
              </div>
           </div>

           <div className="text-center px-4 mt-8">
              <h4 className="font-medium text-gray-800 text-[14px] mb-2">No meetings in the next week.</h4>
              <p className="text-[13px] text-gray-500 mb-8 leading-relaxed">
                 Schedule a meeting on your calendar or transcribe a live meeting.
              </p>
              <button className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-5 py-2 rounded-md text-[13px] font-medium transition-colors flex items-center justify-center gap-2 w-32 mx-auto">
                 <Plus size={14} /> Capture
              </button>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-0 bg-white">
        <div className="text-center max-w-sm px-6">
           <div className="w-12 h-12 bg-[#f3e8ff] rounded-xl flex items-center justify-center text-[#9333ea] mx-auto mb-6">
              <FileText size={24} />
           </div>
           
           <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No upcoming meetings to prepare for
           </h2>
           <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
              Review key takeaways from past meetings and get insights on participants.
           </p>
           
           <button className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-6 py-2.5 rounded-md text-[14px] font-medium transition-colors flex items-center justify-center gap-2 mx-auto">
              <Plus size={16} /> Capture
           </button>
        </div>
      </div>

    </div>
  );
}
