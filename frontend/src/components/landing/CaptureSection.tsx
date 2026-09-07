import { Video, MonitorPlay, Phone, Upload, Apple, Play, Volume2 } from "lucide-react";

export default function CaptureSection() {
  return (
    <section className="bg-white py-24 relative z-10 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight text-center">
          <span className="text-brand-purple">Capture</span> Meetings <span className="text-brand-purple">Anywhere</span> & Anytime
        </h2>

        {/* 2 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
           
           {/* Left Card */}
           <div className="bg-[#f5f3ff] rounded-2xl p-8 pb-0 overflow-hidden relative flex flex-col">
              <div className="mb-8">
                 <h3 className="font-bold text-xl mb-2">AI Note Taker Bot</h3>
                 <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                    Invite fred@fireflies.ai to a live meeting or have it autojoin your calendar meetings to record, transcribe, and summarize.
                 </p>
              </div>
              
              <div className="relative mt-auto w-full h-[240px] bg-black rounded-t-xl overflow-hidden shadow-2xl border border-gray-200">
                 {/* Simulated Video Feed Image */}
                 <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Video Call" />
                 
                 {/* Overlays */}
                 <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg flex items-center gap-4 w-64 backdrop-blur-md bg-white/95">
                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">31</div>
                    <div>
                       <div className="font-semibold text-sm">Sales Demo</div>
                       <div className="text-xs text-gray-500">Janice, +2</div>
                    </div>
                    <div className="ml-auto w-8 h-4 bg-brand-purple rounded-full relative">
                       <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                 </div>

                 <div className="absolute bottom-4 left-4 flex gap-2">
                    <div className="w-8 h-8 bg-black/50 backdrop-blur rounded flex items-center justify-center text-green-400"><Video size={16} /></div>
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white"><Video size={16} /></div>
                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white"><Video size={16} /></div>
                 </div>

                 <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-xl rounded-lg p-4 border border-white/30 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-6 h-6 rounded bg-brand-purple flex items-center justify-center text-white text-[10px] font-bold">f</div>
                       <span className="text-xs font-medium">Janice's Fireflies.ai Notetaker</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Card */}
           <div className="bg-[#fffbeb] rounded-2xl p-8 pb-0 overflow-hidden relative flex flex-col">
              <div className="mb-8">
                 <h3 className="font-bold text-xl mb-2">Chrome Extension</h3>
                 <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                    Automatically record your Google Meet calls and <span className="underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-brand-purple">get real-time transcripts</span>.
                 </p>
              </div>

              <div className="relative mt-auto w-full h-[240px] bg-[#3c4043] rounded-t-xl overflow-hidden shadow-2xl p-4 pt-6">
                 {/* Video Box */}
                 <div className="w-[80%] h-32 bg-black rounded-lg border-2 border-blue-500 overflow-hidden relative mb-4">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Google Meet" />
                    <div className="absolute bottom-2 left-2 text-white text-xs font-medium bg-black/40 px-2 py-0.5 rounded">Michael Hines</div>
                    <div className="absolute top-2 right-2 w-5 h-5 bg-black/40 rounded flex items-center justify-center text-white"><Volume2 size={12} /></div>
                 </div>
                 
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-medium">M</div>
                 </div>

                 {/* Recording Widget Overlay */}
                 <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-xl w-64 border border-gray-100 p-1">
                    <div className="absolute -top-6 right-0 bg-[#4ade80] text-white text-[10px] font-bold px-2 py-0.5 rounded-t">
                       <img src="https://www.google.com/chrome/static/images/chrome-logo.svg" className="w-3 h-3 inline mr-1" /> TRANSCRIBING
                    </div>
                    <div className="bg-white p-3 rounded-md flex items-center gap-3">
                       <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center text-blue-500 font-bold text-[10px] border border-blue-100">31</div>
                       <div>
                          <div className="font-semibold text-xs text-gray-900 flex items-center gap-1">Sales Demo <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span></div>
                          <div className="text-[10px] text-gray-500">02:14</div>
                       </div>
                       <button className="ml-auto w-6 h-6 rounded-md bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors border border-red-100">
                          <div className="w-2.5 h-2.5 bg-red-500 rounded-sm"></div>
                       </button>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* 3 Columns Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white"><Apple size={14} fill="currentColor" /></div>
                 <div className="w-6 h-6 bg-gradient-to-tr from-green-400 to-blue-500 rounded flex items-center justify-center text-white"><Play size={12} fill="currentColor" /></div>
              </div>
              <h4 className="font-bold mb-2">Mobile App</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Transcribe and summarize in-person conversation with the <span className="underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-brand-purple">Fireflies mobile app.</span>
              </p>
           </div>
           
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-6 h-6 bg-brand-purple rounded flex items-center justify-center text-white font-bold text-xs">f</div>
              </div>
              <h4 className="font-bold mb-2">Desktop App</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                 Transcribe and summarize your calls with the <span className="underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-brand-purple">Fireflies desktop app.</span>
              </p>

              <div className="flex items-center gap-2 mb-4">
                 <Upload size={20} className="text-gray-700" />
              </div>
              <h4 className="font-bold mb-2">Audio & Video Files</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Transcribe audio and video files with AI meeting summaries. (MP3, MP4, WAV, M4A)
              </p>
           </div>

           <div>
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center text-white"><Phone size={12} fill="currentColor" /></div>
                 <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-[10px]">R</div>
              </div>
              <h4 className="font-bold mb-2">Dialers & API</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                 Transcribe calls from Aircall, Ringcentral and other dialers or use our <span className="underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-brand-purple">API</span> to process audio files.
              </p>
           </div>
        </div>

      </div>
    </section>
  );
}
