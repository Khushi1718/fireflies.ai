"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MeetingHeader } from "../../../../components/meeting/MeetingHeader";
import { SkinnySidebar } from "../../../../components/meeting/SkinnySidebar";
import { SmartSearchPanel } from "../../../../components/meeting/SmartSearchPanel";
import { NotesPanel } from "../../../../components/meeting/NotesPanel";
import { AskFredPanel } from "../../../../components/meeting/AskFredPanel";
import { TranscriptPanel } from "../../../../components/meeting/TranscriptPanel";
import { MediaPlayer } from "../../../../components/meeting/MediaPlayer";
import { MeetingDetail } from "../../../../lib/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/lib/SidebarContext";
import { API_BASE } from "@/services/meetingApi";

export default function MeetingDetailPage() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState<MeetingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState<number | null>(null);
  const [rightTab, setRightTab] = useState<'askfred' | 'transcript'>('askfred');
  const { showTrialBanner, setShowTrialBanner, setShowTrialModal } = useSidebar();

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await fetch(`${API_BASE}/meetings/${id}`);
        if (res.ok) {
          const data = await res.json();
          setMeeting(data);
        }
      } catch (error) {
        console.error("Failed to fetch meeting detail", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMeeting();
  }, [id]);

  const getActiveSegmentId = () => {
    if (!meeting?.transcript_segments) return null;
    const segment = meeting.transcript_segments.find(
      s => currentTime >= s.start_time_seconds && currentTime <= s.end_time_seconds
    );
    return segment ? segment.id : null;
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#7b52f6]" size={32} />
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="flex h-full items-center justify-center bg-white text-gray-500">
        Meeting not found
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] font-sans overflow-hidden select-none">

      {/* Top Header */}
      <MeetingHeader meetingId={meeting.id} title={meeting.title} />

      {/* Main 4-Column Layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* 1. Skinny icon sidebar */}
        <SkinnySidebar />

        {/* 2. Smart Search Panel */}
        <div className="w-[260px] shrink-0 min-h-0 overflow-y-auto border-r border-gray-200/90 bg-white [scrollbar-width:thin]">
          <SmartSearchPanel
            segments={meeting.transcript_segments || []}
            actionItemCount={meeting.action_items?.length || 1}
            topicCount={meeting.topics?.length || 4}
          />
        </div>

        {/* 3. Center Notes Panel */}
        <div className="flex-1 min-w-0 min-h-0 overflow-y-auto bg-white [scrollbar-width:thin]">
          <NotesPanel
            summary={meeting.summary}
            actionItems={meeting.action_items}
            title={meeting.title}
            meetingDate={meeting.meeting_date}
            meetingId={meeting.id}
            topics={meeting.topics}
            onTopicClick={(time) => setSeekTime(time)}
            onNotesGenerated={(data) => {
              fetch(`${API_BASE}/meetings/${meeting.id}`)
                .then(res => res.json())
                .then(updated => setMeeting(updated))
                .catch(console.error);
            }}
            onActionItemToggle={async (actionId, newStatus) => {
              try {
                const res = await fetch(`${API_BASE}/action-items/${actionId}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ status: newStatus })
                });
                if (res.ok) {
                  setMeeting(prev => {
                    if (!prev) return prev;
                    return {
                      ...prev,
                      action_items: prev.action_items.map(ai =>
                        ai.id === actionId ? { ...ai, status: newStatus } : ai
                      )
                    };
                  });
                }
              } catch (error) {
                console.error("Failed to update action item", error);
              }
            }}
            onActionItemCreated={(item) => {
              setMeeting(prev => prev ? { ...prev, action_items: [...prev.action_items, item] } : prev);
            }}
          />
        </div>

        {/* 4. Right Panel: AskFred | Transcript tabs (Matches Screenshot 2) */}
        <div className="w-[360px] shrink-0 min-h-0 flex flex-col bg-white border-l border-gray-200/90">

          {/* Underline Tabs Header */}
          <div className="h-12 border-b border-gray-200/90 flex items-center px-4 gap-6 bg-white shrink-0">
            <button
              onClick={() => setRightTab('askfred')}
              className={`h-full flex items-center gap-1.5 text-[13px] transition-colors border-b-2 cursor-pointer ${
                rightTab === 'askfred'
                  ? 'border-[#7b52f6] text-[#7b52f6] font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-900 font-medium'
              }`}
            >
              <div className="w-4 h-4 bg-[#ede8f7] rounded flex items-center justify-center text-[#7b52f6]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4" />
                </svg>
              </div>
              <span>AskFred</span>
            </button>

            <button
              onClick={() => setRightTab('transcript')}
              className={`h-full flex items-center text-[13px] transition-colors border-b-2 cursor-pointer ${
                rightTab === 'transcript'
                  ? 'border-[#7b52f6] text-[#7b52f6] font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-900 font-medium'
              }`}
            >
              <span>Transcript</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-h-0 overflow-hidden">
            {rightTab === 'askfred' ? (
              <AskFredPanel meetingId={meeting.id} />
            ) : (
              <TranscriptPanel
                segments={meeting.transcript_segments || []}
                activeSegmentId={getActiveSegmentId()}
                onSeek={(time) => {
                  setSeekTime(time);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Media Player */}
      <MediaPlayer
        audioUrl={meeting.media_url}
        meetingId={meeting.id}
        duration={meeting.duration_seconds || 969}
        currentTime={currentTime}
        onTimeUpdate={setCurrentTime}
        seekTime={seekTime}
      />

    </div>
  );
}
