"use client";

import { useState, useRef, useEffect } from "react";
import { 
  MoreHorizontal, Share2, Link as LinkIcon, Download, FolderInput, 
  Edit2, Trash2, Globe, X, Check, ArrowRight, User
} from "lucide-react";
import { MeetingDetail } from "../../lib/types";
import { useRouter } from "next/navigation";
import { API_BASE } from "../../services/meetingApi";
import { Portal } from "../common/Portal";

interface MeetingRowProps {
  meeting: MeetingDetail;
  onDelete: (id: number) => void;
  onRename?: (id: number, newTitle: string) => void;
}

export function MeetingRow({ meeting, onDelete, onRename }: MeetingRowProps) {
  const router = useRouter();
  const [currentTitle, setCurrentTitle] = useState(meeting.title);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameValue, setRenameValue] = useState(meeting.title);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("# My Meetings");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentTitle(meeting.title);
    setRenameValue(meeting.title);
  }, [meeting.title]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowMetadataModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const formatDuration = (secs?: number) => {
    if (!secs || secs <= 0) return "< 1 min";
    const mins = Math.round(secs / 60);
    return mins <= 0 ? "< 1 min" : `${mins} min`;
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Sep 7 · 5:31 PM";
    let str = dateString;
    if (!str.includes("Z") && !str.includes("+") && !/T.*\d{2}-\d{2}/.test(str)) {
      str = str + "Z";
    }
    const d = new Date(str);
    if (isNaN(d.getTime())) return "Sep 7 · 5:31 PM";

    const m = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    let hours = d.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const mins = d.getMinutes().toString().padStart(2, "0");
    return `${m} ${day} · ${hours}:${mins} ${ampm}`;
  };

  // Click on card -> Opens the full details page
  const handleCardClick = () => {
    router.push(`/meetings/${meeting.id}`);
  };

  // Click on Details button -> Shows small details popup
  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    setShowMetadataModal(true);
  };

  // Copy meeting link
  const handleCopyLink = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowDropdown(false);
    const url = `${window.location.origin}/meetings/${meeting.id}`;
    navigator.clipboard.writeText(url);
    triggerToast("Meeting link copied to clipboard!");
  };

  // Download meeting transcript as text file
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    try {
      let text = `Meeting: ${currentTitle}\nDate: ${meeting.meeting_date || "N/A"}\nDuration: ${formatDuration(meeting.duration_seconds)}\nHost: Khushi\n\n`;
      
      // Fetch full details if needed
      const res = await fetch(`${API_BASE}/meetings/${meeting.id}`);
      if (res.ok) {
        const full = await res.json();
        if (full.summary) text += `--- SUMMARY ---\n${full.summary}\n\n`;
        if (full.transcript_segments && full.transcript_segments.length > 0) {
          text += `--- TRANSCRIPT ---\n`;
          full.transcript_segments.forEach((seg: { speaker_name?: string; text: string }) => {
            text += `[${seg.speaker_name || "Speaker"}]: ${seg.text}\n`;
          });
        }
      }

      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentTitle.replace(/[^a-zA-Z0-9_-]/g, "_")}_transcript.txt`;
      a.click();
      URL.revokeObjectURL(url);
      triggerToast("Transcript download started!");
    } catch (err) {
      triggerToast("Failed to download transcript");
    }
  };

  // Rename meeting
  const handleRenameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renameValue.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/meetings/${meeting.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: renameValue.trim() }),
      });
      if (res.ok) {
        setCurrentTitle(renameValue.trim());
        if (onRename) onRename(meeting.id, renameValue.trim());
        setShowRenameModal(false);
        triggerToast("Meeting title updated!");
      }
    } catch (err) {
      triggerToast("Failed to rename meeting");
    }
  };

  // Delete meeting
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    if (!confirm(`Are you sure you want to delete "${currentTitle}"?`)) return;
    try {
      const res = await fetch(`${API_BASE}/meetings/${meeting.id}`, { method: "DELETE" });
      if (res.ok) {
        onDelete(meeting.id);
        triggerToast("Meeting deleted successfully");
      }
    } catch (err) {
      triggerToast("Failed to delete meeting");
    }
  };

  return (
    <div className="relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <Portal>
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-[13px] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Check size={16} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </Portal>
      )}

      {/* Main Card */}
      <div 
        onClick={handleCardClick}
        className="group bg-white border border-gray-100/90 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-center justify-between cursor-pointer relative"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Avatar Square */}
          <div className="w-10 h-10 bg-[#6b21a8] rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm uppercase">
             {currentTitle.charAt(0)}
          </div>

          {/* Title and Metadata */}
          <div className="min-w-0">
             <h4 className="font-semibold text-[14px] text-gray-900 flex items-center gap-1.5 group-hover:text-[#7b52f6] transition-colors">
               <span className="truncate">{currentTitle}</span>
               <span className="text-gray-400 text-xs font-normal shrink-0">&gt;</span>
             </h4>
             <p className="text-[13px] text-gray-400 mt-0.5 truncate">
               {formatDate(meeting.meeting_date)} · {formatDuration(meeting.duration_seconds)} · Khushi
             </p>
          </div>
        </div>

        {/* Hover Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 shrink-0 ml-4">
          {/* 3 Dots Menu Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 bg-white transition-colors cursor-pointer"
            title="More actions"
          >
            <MoreHorizontal size={16} />
          </button>
          
          {/* Details Button */}
          <button 
            onClick={handleDetailsClick}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            title="View meeting details"
          >
            <span>Details</span>
            <span className="text-gray-400 text-[10px]">&gt;</span>
          </button>
        </div>

        {/* 3 Dots Dropdown Menu */}
        {showDropdown && (
          <div 
            ref={dropdownRef} 
            onClick={(e) => e.stopPropagation()}
            className="absolute right-12 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150"
          >
            <button 
              onClick={() => { setShowDropdown(false); setShowShareModal(true); }}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-[13px] text-gray-700 hover:bg-purple-50 hover:text-[#7b52f6] text-left transition-colors cursor-pointer"
            >
              <Share2 size={15} className="text-gray-400" /> Share
            </button>
            <button 
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-[13px] text-gray-700 hover:bg-purple-50 hover:text-[#7b52f6] text-left transition-colors cursor-pointer"
            >
              <LinkIcon size={15} className="text-gray-400" /> Copy Link
            </button>
            <button 
              onClick={handleDownload}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-[13px] text-gray-700 hover:bg-purple-50 hover:text-[#7b52f6] text-left transition-colors cursor-pointer"
            >
              <Download size={15} className="text-gray-400" /> Download
            </button>
            <button 
              onClick={() => { setShowDropdown(false); setShowChannelModal(true); }}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-[13px] text-gray-700 hover:bg-purple-50 hover:text-[#7b52f6] text-left transition-colors cursor-pointer"
            >
              <FolderInput size={15} className="text-gray-400" /> Move to channel
            </button>
            <button 
              onClick={() => { setShowDropdown(false); setShowRenameModal(true); }}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-[13px] text-gray-700 hover:bg-purple-50 hover:text-[#7b52f6] text-left transition-colors cursor-pointer"
            >
              <Edit2 size={15} className="text-gray-400" /> Rename
            </button>
            <div className="h-px bg-gray-100 my-1"></div>
            <button 
              onClick={handleDelete}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-[13px] text-red-600 hover:bg-red-50 text-left font-medium transition-colors cursor-pointer"
            >
              <Trash2 size={15} className="text-red-500" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Small Details Modal Popover */}
      {showMetadataModal && (
        <Portal>
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowMetadataModal(false);
            }}
          >
            <div 
              ref={modalRef} 
              className="w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-5 flex items-start justify-between border-b border-gray-100">
                 <div className="flex gap-3.5">
                    <div className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center text-[#7b52f6] shrink-0 font-bold">
                       {currentTitle.charAt(0).toUpperCase()}
                    </div>
                    <div>
                       <h3 className="font-bold text-[16px] text-gray-900 leading-snug">{currentTitle}</h3>
                       <p className="text-[12px] text-gray-400 mt-1">
                         Khushi Nain · {formatDate(meeting.meeting_date)} · English (Global)
                       </p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setShowMetadataModal(false)}
                   className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                 >
                    <X size={16} />
                 </button>
              </div>

              {/* Details Body */}
              <div className="p-5 flex flex-col gap-4 text-[13px]">
                 {/* Privacy */}
                 <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-500">Privacy</span>
                    <div className="flex-1 flex items-center gap-1.5 text-[#7b52f6] font-medium cursor-pointer hover:underline">
                       <Globe size={14} /> Teammates & Anyone with Link
                    </div>
                 </div>

                 {/* Channels */}
                 <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-500">Channels</span>
                    <div className="flex-1 flex items-center justify-between">
                       <span className="text-gray-700 font-medium">{selectedChannel}</span>
                       <button 
                         onClick={() => { setShowMetadataModal(false); setShowChannelModal(true); }}
                         className="border border-gray-200 rounded-lg px-2.5 py-1 text-[12px] font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors cursor-pointer"
                       >
                          Move
                       </button>
                    </div>
                 </div>

                 {/* Invited */}
                 <div className="flex items-start">
                    <span className="w-24 font-medium text-gray-500 mt-1">Invited</span>
                    <div className="flex-1">
                       <div className="flex items-center gap-2.5 p-2 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="w-7 h-7 bg-[#6b21a8] rounded-lg flex items-center justify-center text-white font-bold text-xs uppercase shrink-0">
                            K
                          </div>
                          <div className="flex flex-col">
                             <span className="font-semibold text-gray-900 text-[12px]">Khushi Nain</span>
                             <span className="text-[11px] text-gray-400">khushinain78@gmail.com · Host</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Attended */}
                 <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-500">Attended</span>
                    <div className="flex-1 flex items-center gap-2 text-gray-700">
                       <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                       <span className="font-medium text-[12px]">1 participant attended</span>
                    </div>
                 </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <button 
                   onClick={handleCopyLink}
                   className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5 cursor-pointer"
                 >
                   <LinkIcon size={14} /> Copy Link
                 </button>

                 <button 
                   onClick={() => router.push(`/meetings/${meeting.id}`)}
                   className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                 >
                   <span>Open Full Details</span>
                   <ArrowRight size={14} />
                 </button>
              </div>
            </div>
          </div>
        </Portal>
      )}

      {/* Rename Modal */}
      {showRenameModal && (
        <Portal>
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowRenameModal(false);
            }}
          >
            <div 
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-[16px] text-gray-900">Rename Meeting</h3>
                 <button onClick={() => setShowRenameModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                   <X size={18} />
                 </button>
               </div>
               <form onSubmit={handleRenameSubmit}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Meeting Title</label>
                  <input 
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-[14px] text-gray-800 focus:outline-none focus:border-[#7b52f6] focus:ring-1 focus:ring-[#7b52f6] mb-5"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2.5">
                     <button 
                       type="button" 
                       onClick={() => setShowRenameModal(false)}
                       className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                     >
                       Cancel
                     </button>
                     <button 
                       type="submit"
                       disabled={!renameValue.trim()}
                       className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                     >
                       Save Changes
                     </button>
                  </div>
               </form>
            </div>
          </div>
        </Portal>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <Portal>
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowShareModal(false);
            }}
          >
            <div 
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-[16px] text-gray-900">Share Meeting</h3>
                 <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                   <X size={18} />
                 </button>
               </div>
               
               <p className="text-xs text-gray-500 mb-4">
                 Anyone with the link can view the transcript, summary, and recording notes.
               </p>

               <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-1.5 mb-4 bg-gray-50">
                  <input 
                    type="text" 
                    readOnly 
                    value={`${typeof window !== 'undefined' ? window.location.origin : ''}/meetings/${meeting.id}`}
                    className="bg-transparent text-xs text-gray-600 flex-1 px-2 focus:outline-none truncate"
                  />
                  <button 
                    onClick={() => handleCopyLink()}
                    className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                  >
                    Copy
                  </button>
               </div>

               <div className="border-t border-gray-100 pt-3 flex justify-end">
                  <button 
                    onClick={() => setShowShareModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
               </div>
            </div>
          </div>
        </Portal>
      )}

      {/* Channel Move Modal */}
      {showChannelModal && (
        <Portal>
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowChannelModal(false);
            }}
          >
            <div 
              className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="flex items-center justify-between mb-3">
                 <h3 className="font-bold text-[15px] text-gray-900">Move to Channel</h3>
                 <button onClick={() => setShowChannelModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                   <X size={18} />
                 </button>
               </div>

               <p className="text-xs text-gray-500 mb-3">Select the channel for this conversation:</p>

               <div className="space-y-1.5 mb-5">
                  {["# My Meetings", "# All Meetings", "# Sales", "# Engineering", "# Product"].map((ch) => (
                    <button
                      key={ch}
                      onClick={() => {
                        setSelectedChannel(ch);
                        setShowChannelModal(false);
                        triggerToast(`Moved meeting to ${ch}`);
                      }}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        selectedChannel === ch ? "bg-purple-50 text-[#7b52f6] font-semibold" : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span>{ch}</span>
                      {selectedChannel === ch && <Check size={14} />}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </Portal>
      )}

    </div>
  );
}

