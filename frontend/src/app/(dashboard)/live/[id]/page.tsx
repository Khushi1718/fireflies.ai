"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { meetingApi } from "../../../../services/meetingApi";
import { MeetingDetail } from "../../../../lib/types";
import { Play, Pause, Square, Loader2, Video, StopCircle, Download, MessageSquare, Clock, FileText, CheckSquare, Zap, Globe, Link as LinkIcon, Maximize, Sparkles, RefreshCw, Search } from "lucide-react";
import { AskFredPanel } from "../../../../components/meeting/AskFredPanel";

interface LiveTranscriptSegment {
  speaker: string;
  text: string;
  is_final?: boolean;
  start_time_seconds: number;
  end_time_seconds: number;
}

interface LiveNotes {
  summary?: string;
  key_points?: Array<{ sectionTitle?: string; items?: Array<{ text?: string; time?: number; subItems?: string[] }> }>;
  topics?: Array<{ title?: string; start_time_seconds?: number | null; end_time_seconds?: number | null }>;
  action_items?: Array<{ title?: string; description?: string; assignee?: string; text?: string }>;
}

export default function LiveMeetingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [generatingNotes, setGeneratingNotes] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00");
  const [activeTab, setActiveTab] = useState<'transcript' | 'notes' | 'assist'>('transcript');
  const [liveTranscript, setLiveTranscript] = useState<LiveTranscriptSegment[]>([]);
  const [liveNotes, setLiveNotes] = useState<LiveNotes | null>(null);
  const [transcriptSearch, setTranscriptSearch] = useState("");
  
  const transcriptBottomRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);

  const fetchMeeting = async (silent = false) => {
    let lastError: unknown = null;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      try {
        const data = await meetingApi.getMeeting(Number(id));
        setMeeting(data);
      
        // Update transcripts
        if (data.transcript_segments && data.transcript_segments.length > 0) {
          setLiveTranscript(data.transcript_segments.map((segment) => ({
            speaker: segment.speaker_name,
            text: segment.text,
            is_final: segment.is_final,
            start_time_seconds: segment.start_time_seconds,
            end_time_seconds: segment.end_time_seconds,
          })));
        }
      
        // Update notes if available
        if (data.summary) {
          let parsedKP = [];
          try {
            if (data.summary.key_points_json) {
              parsedKP = JSON.parse(data.summary.key_points_json);
            }
          } catch (e) {
            // ignore
          }
          setLiveNotes({
            summary: data.summary.overview,
            key_points: parsedKP,
            topics: data.topics,
            action_items: data.action_items,
          });
        }
      
        if (data.status === "completed") {
          router.push(`/meetings/${data.id}`);
        }
        if (!silent) setLoading(false);
        return;
      } catch (err) {
        lastError = err;
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, 750));
        }
      }
    }
    if (!silent) {
      setError(lastError instanceof Error ? lastError.message : "Failed to load meeting details");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchMeeting();
  }, [id]);

  // Periodic polling fallback to guarantee no dropped segments
  useEffect(() => {
    if (!meeting?.id) return;
    if (meeting.status === "completed" || meeting.status === "failed") return;

    const interval = setInterval(() => {
      fetchMeeting(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [meeting?.id, meeting?.status]);

  // SSE streaming for real-time instant updates
  useEffect(() => {
    if (!meeting?.id) return;
    if (meeting.status === "completed" || meeting.status === "failed") return;

    let sse: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout;

    const connectSSE = () => {
      const apiBase = "/backend";
      sse = new EventSource(
        `${apiBase}/meetings/${meeting.id}/stream?ngrok-skip-browser-warning=true`
      );

      sse.onmessage = (event) => {
        try {
          if (!event.data || event.data === "ping" || event.data === "connected") return;
          const data = JSON.parse(event.data);
          
          if (data.type === "status_update") {
            setMeeting((prev) => prev ? { ...prev, status: data.payload.status } : null);
            if (data.payload.status === "completed") {
              router.push(`/meetings/${meeting.id}`);
            }
          } else if (data.type === "transcript_update") {
            setLiveTranscript((prev) => {
              const newSegments = [...prev];
              if (
                newSegments.length > 0 &&
                newSegments[newSegments.length - 1].speaker === data.payload.speaker &&
                !newSegments[newSegments.length - 1].is_final
              ) {
                newSegments[newSegments.length - 1] = data.payload;
              } else {
                newSegments.push(data.payload);
              }
              return newSegments;
            });
          } else if (data.type === "notes_update") {
            setLiveNotes(data.payload);
          } else if (data.type === "media_update") {
            setMeeting((prev) => prev ? { ...prev, media_url: data.payload.media_url } : null);
          }
        } catch (e) {
          console.error("Error parsing SSE data", e);
        }
      };

      sse.onerror = () => {
        if (sse) sse.close();
        // Reconnect after 3s
        reconnectTimeout = setTimeout(connectSSE, 3000);
      };
    };

    connectSSE();

    return () => {
      if (sse) sse.close();
      clearTimeout(reconnectTimeout);
    };
  }, [meeting?.id]);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    if (activeTab === 'transcript') {
      transcriptBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [liveTranscript.length, activeTab]);

  // Elapsed time calculation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const isLive = meeting?.status?.toLowerCase() === 'live' || meeting?.status?.toLowerCase() === 'joining';
    
    if (isLive) {
      if (!startTimeRef.current) {
        const parsed = meeting?.start_time || meeting?.meeting_date || meeting?.created_at;
        if (parsed) {
          let str = parsed;
          if (!str.includes('Z') && !str.includes('+') && !/T.*\d{2}-\d{2}/.test(str)) {
            str = str + 'Z';
          }
          startTimeRef.current = new Date(str).getTime();
        } else {
          startTimeRef.current = Date.now();
        }
      }

      interval = setInterval(() => {
        const start = startTimeRef.current || Date.now();
        const now = Date.now();
        const diff = Math.max(0, Math.floor((now - start) / 1000));
        const mins = Math.floor(diff / 60).toString().padStart(2, '0');
        const secs = (diff % 60).toString().padStart(2, '0');
        setElapsedTime(`${mins}:${secs}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meeting?.status, meeting?.start_time]);

  const handleAction = async (action: 'start' | 'pause' | 'resume' | 'stop') => {
    if (!meeting) return;
    setActionLoading(true);
    setError(null);
    try {
      if (action === 'start') {
        const updated = await meetingApi.startMeeting(meeting.id);
        setMeeting(updated as MeetingDetail);
      } else if (action === 'pause') {
        const updated = await meetingApi.pauseMeeting(meeting.id);
        setMeeting(updated as MeetingDetail);
      } else if (action === 'resume') {
        const updated = await meetingApi.resumeMeeting(meeting.id);
        setMeeting(updated as MeetingDetail);
      } else if (action === 'stop') {
        // Backend stopMeeting stops Recall bot, generates Gemini notes, and marks completed
        await meetingApi.stopMeeting(meeting.id);
        router.push(`/meetings/${meeting.id}`);
        return;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleManualGenerateNotes = async () => {
    if (!meeting?.id) return;
    setGeneratingNotes(true);
    try {
      const data = await meetingApi.generateNotes(meeting.id);
      setLiveNotes({
        summary: data.summary,
        key_points: data.key_points as LiveNotes['key_points'],
        topics: data.topics,
        action_items: data.action_items
      });
      setActiveTab('notes');
    } catch (e) {
      console.error("Failed to generate notes:", e);
    } finally {
      setGeneratingNotes(false);
    }
  };

  const filteredSegments = liveTranscript.filter((seg) => {
    if (!transcriptSearch.trim()) return true;
    const q = transcriptSearch.toLowerCase();
    return seg.text.toLowerCase().includes(q) || seg.speaker.toLowerCase().includes(q);
  });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#7b52f6]" size={32} />
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-white text-gray-600">
        <p>{error || "Unable to load this meeting."}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchMeeting();
          }}
          className="rounded-md bg-[#7b52f6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6742d1]"
        >
          Retry
        </button>
      </div>
    );
  }

  const isLiveState =
    meeting.status?.toLowerCase() === 'live' ||
    meeting.status?.toLowerCase() === 'paused' ||
    meeting.status?.toLowerCase() === 'joining';

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      
      {/* Left Area - Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#fafafa]">
        
        {/* Top Header */}
        <div className="h-14 border-b border-gray-200 px-6 flex items-center justify-between bg-white shrink-0 z-10">
          <div className="flex items-center gap-3">
             <div className="w-7 h-7 bg-[#6b21a8] rounded flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
               {meeting.title.charAt(0)}
             </div>
             <div className="flex items-center gap-4">
               <h1 className="font-bold text-gray-900 text-[15px] truncate max-w-sm">{meeting.title}</h1>
               <div className="flex items-center gap-2">
                 <span className="text-gray-500 font-mono text-[13px]">{elapsedTime}</span>
                 {meeting.status?.toLowerCase() === 'live' ? (
                   <span className="flex items-center gap-1.5 text-[11px] font-bold text-red-500 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                     <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                     REC
                   </span>
                 ) : (
                   <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-full">
                     <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                     {meeting.status}
                   </span>
                 )}
               </div>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             {isLiveState && (
               <button
                 onClick={() => handleAction('stop')}
                 disabled={actionLoading}
                 className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-[13px] font-semibold transition-colors shadow-sm disabled:opacity-50"
               >
                 {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <StopCircle size={14} />}
                 End & Create Notes
               </button>
             )}
             
             <div className="flex items-center gap-2 text-gray-400 pl-2 border-l border-gray-200">
                <button className="p-1 hover:text-gray-600 rounded transition-colors"><Globe size={17} /></button>
                <button className="p-1 hover:text-gray-600 rounded transition-colors"><LinkIcon size={17} /></button>
                <button className="p-1 hover:text-gray-600 rounded transition-colors"><Maximize size={17} /></button>
             </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 w-full max-w-3xl mx-auto text-center">
              {error}
            </div>
          )}

          {meeting.status === 'CREATED' && (
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden my-auto w-full">
              <div className="border-b border-gray-100 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-center text-[#7b52f6]">
                     <Video size={20} />
                   </div>
                   <div>
                     <h2 className="text-lg font-bold text-gray-900">{meeting.title}</h2>
                     <p className="text-[12px] text-gray-500 uppercase tracking-wider font-semibold">Status: <span className="text-[#7b52f6]">{meeting.status}</span></p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Meeting Link</p>
                   <a href={meeting.media_url || "#"} target="_blank" rel="noreferrer" className="text-[13px] text-blue-500 hover:underline max-w-[220px] truncate block">
                     {meeting.media_url || "No link provided"}
                   </a>
                </div>
              </div>
              <div className="p-12 flex flex-col items-center justify-center min-h-[320px]">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-6 border border-gray-100 shadow-sm">
                  <Video size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Capture</h3>
                <p className="text-gray-500 text-[14px] text-center max-w-sm mb-4">
                  Fireflies Notetaker is ready to join. Click start to begin capturing real-time audio and transcripts.
                </p>
                <div className="mb-6 p-3 bg-purple-50 border border-purple-200/80 rounded-xl text-[13px] text-[#5b21b6] max-w-md text-center font-medium">
                  <strong>Important:</strong> After clicking <strong>Start Capturing</strong>, please remember to admit the <strong>fireflies.ai bot</strong> when it requests to join your meeting.
                </div>
                <button 
                  onClick={() => handleAction('start')}
                  disabled={actionLoading}
                  className="flex items-center gap-2 bg-[#7b52f6] hover:bg-[#6742d1] text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
                  Start Capturing
                </button>

              </div>
            </div>
          )}

          {isLiveState && (
            <div className="max-w-5xl mx-auto w-full space-y-5">
              
              {/* Desktop App Banner */}
              <div className="bg-[#111827] rounded-xl p-3 flex items-center justify-between shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#D92D87]/30 to-purple-500/0"></div>
                <div className="flex items-center gap-3 relative z-10 pl-2">
                   <div className="w-6 h-6 bg-[#D92D87] rounded flex items-center justify-center">
                     <span className="text-white font-bold text-[10px]">FF</span>
                   </div>
                   <p className="text-white text-[13px] font-medium">
                     <span className="font-bold text-gray-100">Fireflies Live Notetaker</span> — Capturing real-time speaker audio & generating live intelligence.
                   </p>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                   <button 
                     onClick={handleManualGenerateNotes}
                     disabled={generatingNotes}
                     className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md text-[12px] font-medium flex items-center gap-1.5 transition-colors"
                   >
                     {generatingNotes ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                     Generate AI Notes
                   </button>
                </div>
              </div>

              {/* Tabs Card */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[550px]">
                 <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-[#fafafa]">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                       <button 
                         onClick={() => setActiveTab('transcript')} 
                         className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-colors flex items-center gap-1.5 ${
                           activeTab === 'transcript' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                         }`}
                       >
                         Transcript 
                         {liveTranscript.length > 0 && (
                           <span className="bg-purple-100 text-[#7b52f6] text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                             {liveTranscript.length}
                           </span>
                         )}
                       </button>
                       <button 
                         onClick={() => setActiveTab('notes')} 
                         className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-colors flex items-center gap-1.5 ${
                           activeTab === 'notes' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                         }`}
                       >
                         <Sparkles size={13} className={activeTab === 'notes' ? 'text-[#7b52f6]' : 'text-gray-400'} />
                         AI Notes
                       </button>
                       <button 
                         onClick={() => setActiveTab('assist')} 
                         className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${
                           activeTab === 'assist' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                         }`}
                       >
                         Prep
                       </button>
                    </div>

                    {activeTab === 'transcript' && (
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-gray-400">
                          {liveTranscript.length} {liveTranscript.length === 1 ? 'speaker turn' : 'speaker turns'}
                        </span>
                      </div>
                    )}
                 </div>

                 {/* Tab Content */}
                 {activeTab === 'transcript' && (
                    <div className="flex-1 flex flex-col p-6 min-h-0">
                       <div className="mb-4 relative shrink-0">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="text" 
                            placeholder="Search live transcript..." 
                            value={transcriptSearch}
                            onChange={(e) => setTranscriptSearch(e.target.value)}
                            className="w-full bg-[#f9fafb] border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-[13px] outline-none focus:bg-white focus:border-[#7b52f6] focus:ring-1 focus:ring-[#7b52f6] transition-all" 
                          />
                       </div>
                       
                       {/* Scrollable Live Transcript Container */}
                       <div className="flex-1 max-h-[500px] overflow-y-auto space-y-4 pr-3 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                         {filteredSegments.length === 0 ? (
                           <div className="flex flex-col items-center justify-center py-20 text-center">
                             <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-[#7b52f6] mb-3">
                               <Loader2 size={24} className="animate-spin" />
                             </div>
                             <p className="font-medium text-gray-700 text-[14px]">Waiting for meeting audio...</p>
                             <p className="text-gray-400 text-[12px] mt-1 max-w-xs">
                               As participants speak in the meeting, words will stream here in real-time.
                             </p>
                           </div>
                         ) : (
                           filteredSegments.map((seg, idx) => (
                              <div key={idx} className="flex gap-3.5 p-2 rounded-lg hover:bg-gray-50/80 transition-colors">
                                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-[12px] shrink-0 shadow-sm mt-0.5">
                                    {seg.speaker.charAt(0).toUpperCase()}
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                       <span className="font-semibold text-gray-900 text-[13px]">{seg.speaker}</span>
                                       <span className="text-gray-300 text-[10px]">•</span>
                                       <span className="text-[#3b82f6] text-[11px] font-mono">
                                          {new Date(seg.start_time_seconds * 1000).toISOString().substr(14, 5)}
                                       </span>
                                       {!seg.is_final && (
                                         <span className="text-[10px] text-amber-500 font-medium bg-amber-50 px-1.5 rounded">
                                           transcribing...
                                         </span>
                                       )}
                                    </div>
                                    <p className="text-gray-800 text-[14px] leading-relaxed">{seg.text}</p>
                                 </div>
                              </div>
                           ))
                         )}
                         <div ref={transcriptBottomRef} />
                       </div>
                    </div>
                 )}

                 {activeTab === 'notes' && (
                    <div className="p-8 flex-1 overflow-y-auto">
                       {liveNotes?.summary ? (
                         <div className="space-y-6 text-left max-w-3xl">
                           <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                             <div className="flex items-center gap-2 text-[#7b52f6] font-semibold text-[14px]">
                               <Sparkles size={16} /> Live AI Notes & Summary
                             </div>
                             <button
                               onClick={handleManualGenerateNotes}
                               disabled={generatingNotes}
                               className="flex items-center gap-1.5 text-[12px] font-medium text-gray-600 hover:text-gray-900 bg-gray-50 border border-gray-200 px-3 py-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
                             >
                               {generatingNotes ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                               Refresh Notes
                             </button>
                           </div>

                           <div>
                             <h3 className="text-[14px] font-bold text-gray-900 mb-1.5 uppercase tracking-wider">Summary</h3>
                             <p className="text-[14px] text-gray-700 leading-relaxed bg-purple-50/50 p-4 rounded-xl border border-purple-100/50">{liveNotes.summary}</p>
                           </div>

                           {liveNotes.key_points && liveNotes.key_points.length > 0 && (
                             <div>
                               <h3 className="text-[14px] font-bold text-gray-900 mb-2 uppercase tracking-wider">Key Discussion Points</h3>
                               <div className="space-y-4 text-[14px] text-gray-700">
                                 {liveNotes.key_points.map((section, index) => (
                                   <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                     {section.sectionTitle && <p className="font-semibold text-gray-900 mb-2">{section.sectionTitle}</p>}
                                     <ul className="space-y-2 pl-2">
                                       {section.items?.map((item, itemIndex) => (
                                         <li key={itemIndex} className="flex items-start gap-2">
                                           <span className="text-[#7b52f6] mt-1 font-bold">•</span>
                                           <span>{item.text}</span>
                                         </li>
                                       ))}
                                     </ul>
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )}

                           {liveNotes.topics && liveNotes.topics.length > 0 && (
                             <div>
                               <h3 className="text-[14px] font-bold text-gray-900 mb-2 uppercase tracking-wider">Topics</h3>
                               <div className="flex flex-wrap gap-2">
                                 {liveNotes.topics.map((topic, index) => (
                                   <span key={index} className="rounded-full bg-white border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-700 shadow-sm">
                                     {topic.title}
                                   </span>
                                 ))}
                               </div>
                             </div>
                           )}

                           {liveNotes.action_items && liveNotes.action_items.length > 0 && (
                             <div>
                               <h3 className="text-[14px] font-bold text-gray-900 mb-2 uppercase tracking-wider">Action Items</h3>
                               <ul className="space-y-2 text-[14px] text-gray-700">
                                 {liveNotes.action_items.map((item, index) => (
                                   <li key={index} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
                                     <CheckSquare size={16} className="text-emerald-600 shrink-0" />
                                     <span>{item.title || item.text}</span>
                                     {item.assignee && (
                                       <span className="text-[11px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600 ml-auto">
                                         @{item.assignee}
                                       </span>
                                     )}
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           )}
                         </div>
                       ) : (
                         <div className="flex flex-col items-center justify-center text-center py-16">
                           <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white mb-5 shadow-md shadow-purple-200">
                              <FileText size={28} />
                           </div>
                           <h3 className="text-[16px] font-semibold text-gray-800 mb-2">Fireflies is ready to generate notes</h3>
                           <p className="text-[13px] text-gray-500 max-w-[320px] mb-6">
                             Important points, chapters, and action items will appear here automatically, or you can generate them on demand.
                           </p>
                           <button
                             onClick={handleManualGenerateNotes}
                             disabled={generatingNotes || liveTranscript.length === 0}
                             className="flex items-center gap-2 bg-[#7b52f6] hover:bg-[#6742d1] text-white px-5 py-2.5 rounded-lg text-[13px] font-medium shadow-sm transition-colors disabled:opacity-50"
                           >
                             {generatingNotes ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
                             Generate Notes Now
                           </button>
                         </div>
                       )}
                    </div>
                 )}

                 {activeTab === 'assist' && (
                    <div className="p-12 flex flex-col items-center justify-center text-center py-20">
                       <p className="text-[14px] text-gray-500">No prep materials scheduled for this meeting.</p>
                    </div>
                 )}
              </div>
            </div>
          )}

          {meeting.status === 'generating' && (
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[400px] my-auto">
              <Loader2 size={48} className="animate-spin text-[#7b52f6] mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Finalizing AI Summary & Notes...</h2>
              <p className="text-gray-500 text-[15px] text-center max-w-md">
                Gemini AI is analyzing the full meeting transcript and extracting action items. You will be redirected to the notes shortly.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Right Area - AskFred Panel */}
      <div className="w-[380px] border-l border-gray-200 bg-white flex flex-col shrink-0 h-full">
        <AskFredPanel meetingId={meeting.id} />
      </div>

    </div>
  );
}
