import { AlignLeft, Download, Volume2, Hash, Users, MessageSquare } from "lucide-react";

export default function CapabilitiesSection() {
  return (
    <section className="bg-white pb-24 relative z-10 text-gray-900 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center text-gray-600 text-[15px] font-medium mb-16">
           ...and many more capabilities
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-12">
           
           <div>
              <div className="text-gray-900 mb-4">
                 <AlignLeft size={24} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-[17px] mb-2">Expand Summary Notes</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Expand specific summary bullet points for additional context and details.
              </p>
           </div>

           <div>
              <div className="text-gray-900 mb-4">
                 <Download size={24} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-[17px] mb-2">Download Meetings</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Easily download summary, transcript, meeting audio or video.
              </p>
           </div>

           <div>
              <div className="text-gray-900 mb-4">
                 <Volume2 size={24} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-[17px] mb-2">Soundbites</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Clip out important moments from calls into easily shareable audio snippets.
              </p>
           </div>

           <div>
              <div className="text-gray-900 mb-4">
                 <Hash size={24} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-[17px] mb-2">Channels</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Organize your team meetings into different channels.
              </p>
           </div>

           <div>
              <div className="text-gray-900 mb-4">
                 <Users size={24} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-[17px] mb-2">User Groups</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Create different user groups for different teams to easily share meetings.
              </p>
           </div>

           <div>
              <div className="text-gray-900 mb-4">
                 <MessageSquare size={24} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-[17px] mb-2">Comments & Bookmarks</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Leave time-stamped comments or bookmark action items, important moments, etc.
              </p>
           </div>

        </div>
      </div>
    </section>
  );
}
