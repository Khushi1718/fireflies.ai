"use client";

import { useState } from "react";
import { X, Link as LinkIcon, ChevronDown, Info } from "lucide-react";
import { meetingApi } from "../../services/meetingApi";
import { Portal } from "../common/Portal";

export default function CaptureModal({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: (meetingId: number) => void }) {
  const [meetingName, setMeetingName] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleCapture = async () => {
    if (!meetingLink) return;
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      const data = await meetingApi.createMeeting(meetingName, meetingLink);
      await meetingApi.startMeeting(data.id);
      onSuccess(data.id);
    } catch (error: unknown) {
      console.error("Failed to capture meeting:", error);
      setErrorMsg(error instanceof Error ? error.message : "Failed to capture meeting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Portal>
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div 
          className="bg-white rounded-xl shadow-2xl w-[520px] max-w-[90vw] flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Header */}
          <div className="flex flex-col px-5 py-4 border-b border-gray-100 gap-1 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-gray-900">Add to live meeting</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors" aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
            {/* Prominent Subheading informing user to admit fireflies.ai bot */}
            <div className="mt-1 flex items-start gap-2 bg-purple-50 border border-purple-200/80 rounded-lg p-2.5 text-[12.5px] text-[#5b21b6]">
              <Info size={16} className="text-[#7c3aed] shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-[#6d28d9]">Important:</strong> After clicking <strong>Start Capturing</strong>, you need to admit the <strong>fireflies.ai</strong> bot when it requests to join your meeting.
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col gap-5">
            
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-[13px] border border-red-100">
                {errorMsg}
              </div>
            )}
            
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Name your meeting <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input 
                type="text" 
                placeholder="E.g. Product team sync" 
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-[14px] focus:outline-none focus:border-[#7b52f6]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Meeting link
              </label>
              <p className="text-[12px] text-gray-500 mb-2">Capture meetings from GMeet, Zoom, MS teams, and <a href="#" className="underline">more.</a></p>
              <div className="flex items-center border border-gray-200 rounded-md bg-white focus-within:border-[#7b52f6] overflow-hidden">
                <div className="pl-3 pr-2 py-2 text-gray-400 border-r border-gray-100 bg-gray-50">
                  <LinkIcon size={16} />
                </div>
                <input 
                  type="text" 
                  placeholder="https://zoom.us/j/123456789" 
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className="w-full px-3 py-2 text-[14px] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Meeting language
              </label>
              <div className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2 text-[14px] cursor-pointer hover:bg-gray-50">
                <span className="text-gray-700">English (Global)</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-5 py-4 flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50">
            <button onClick={onClose} className="px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors">
              Cancel
            </button>
            <button 
              onClick={handleCapture}
              disabled={!meetingLink || isSubmitting}
              className={`px-4 py-2 text-[13px] font-medium text-white rounded-md transition-colors ${!meetingLink ? 'bg-[#e9e3ff] text-[#9375ff] cursor-not-allowed' : 'bg-[#7b52f6] hover:bg-[#6742d1]'}`}
            >
              {isSubmitting ? "Capturing..." : "Start Capturing"}
            </button>
          </div>

        </div>
      </div>
    </Portal>
  );
}

