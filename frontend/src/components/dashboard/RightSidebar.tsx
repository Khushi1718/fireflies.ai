"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Layers, MoreHorizontal, Plus, Sparkles, SquareStack } from "lucide-react";
import { usePathname } from "next/navigation";
import { AskFredPanel } from "../meeting/AskFredPanel";
import { MeetingDetail } from "../../lib/types";
import { meetingApi } from "../../services/meetingApi";

export default function RightSidebar() {
  const pathname = usePathname();
  const [meetings, setMeetings] = useState<MeetingDetail[]>([]);
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    meetingApi.getMeetings()
      .then((items) => {
        setMeetings(items);
        setSelectedMeetingId(items[0]?.id ?? null);
      })
      .catch(console.error);
  }, []);

  const hiddenRoutes = ["/askfred", "/meeting-prep", "/ai-skills/daily-brief", "/tasks"];
  if (hiddenRoutes.includes(pathname) || pathname.startsWith("/meetings/") || pathname.startsWith("/live/")) {
    return null;
  }

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed right-4 top-16 z-40 hidden items-center gap-1.5 rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-md transition-colors hover:text-gray-900 xl:flex"
        title="Open AskFred"
      >
        <Sparkles size={16} className="text-[#7b52f6]" />
        <span className="text-xs font-semibold text-gray-700">AskFred</span>
      </button>
    );
  }

  return (
    <aside className="z-20 hidden h-full w-[340px] select-none flex-col border-l border-gray-200/90 bg-white xl:flex">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200/90 bg-white px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#ede8f7] text-[#7b52f6]"><Sparkles size={15} /></div>
          <span className="text-[14px] font-bold text-gray-800">AskFred</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <button className="rounded p-1 hover:text-gray-600" title="Options"><MoreHorizontal size={16} /></button>
          <button onClick={() => setSelectedMeetingId(meetings[0]?.id ?? null)} className="rounded p-1 hover:text-gray-600" title="New chat"><Plus size={16} /></button>
          <button onClick={() => setIsCollapsed(true)} className="rounded p-1 hover:text-gray-600" title="Collapse panel"><SquareStack size={16} /></button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <Layers size={14} className="shrink-0 text-gray-400" />
        <select
          aria-label="AskFred meeting context"
          value={selectedMeetingId ?? ""}
          onChange={(event) => setSelectedMeetingId(Number(event.target.value))}
          className="min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700 outline-none focus:border-[#7b52f6]"
        >
          {meetings.length === 0 ? <option value="">No meetings available</option> : null}
          {meetings.map((meeting) => <option key={meeting.id} value={meeting.id}>{meeting.title}</option>)}
        </select>
        <ChevronDown size={14} className="-ml-6 pointer-events-none text-gray-400" />
      </div>

      {selectedMeetingId === null ? (
        <div className="flex flex-1 items-center justify-center p-5 text-center text-sm text-gray-500">No meetings available yet.</div>
      ) : (
        <div className="min-h-0 flex-1"><AskFredPanel meetingId={selectedMeetingId} /></div>
      )}
    </aside>
  );
}
