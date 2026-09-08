"use client";

import { useEffect, useState } from "react";
import { Loader2, Layers, Plus, Search } from "lucide-react";
import { AskFredPanel } from "../../../components/meeting/AskFredPanel";
import { MeetingDetail } from "../../../lib/types";
import { meetingApi } from "../../../services/meetingApi";

export default function AskFredPage() {
  const [meetings, setMeetings] = useState<MeetingDetail[]>([]);
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    meetingApi.getMeetings()
      .then((items) => {
        setMeetings(items);
        setSelectedMeetingId(items[0]?.id ?? null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex h-full min-h-screen">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="flex h-14 items-center border-b border-gray-100 p-4">
          <h2 className="text-[15px] font-semibold text-gray-800">AskFred</h2>
        </div>
        <nav className="space-y-1 p-3">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50">
            <Plus size={16} className="text-gray-500" /> New Chat
          </button>
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50">
            <Search size={16} className="text-gray-500" /> Search
          </button>
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50">
            <Layers size={16} className="text-gray-500" /> Connectors
          </button>
        </nav>
        <div className="mt-12 px-6 text-center">
          <h4 className="mb-1 text-[13px] font-semibold text-gray-800">Meeting context</h4>
          <p className="text-xs text-gray-500">Answers use the selected meeting&apos;s transcript and AI notes.</p>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col bg-white">
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="animate-spin text-[#7b52f6]" />
          </div>
        ) : selectedMeetingId === null ? (
          <div className="flex flex-1 items-center justify-center text-sm text-gray-500">
            No meetings are available yet.
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-3">
              <label className="text-xs font-semibold text-gray-500" htmlFor="askfred-meeting">Meeting context</label>
              <select
                id="askfred-meeting"
                value={selectedMeetingId}
                onChange={(event) => setSelectedMeetingId(Number(event.target.value))}
                className="max-w-[22rem] rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-[#7b52f6]"
              >
                {meetings.map((meeting) => (
                  <option key={meeting.id} value={meeting.id}>{meeting.title}</option>
                ))}
              </select>
            </div>
            <div className="min-h-0 flex-1">
              <AskFredPanel meetingId={selectedMeetingId} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
