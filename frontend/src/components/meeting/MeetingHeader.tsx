"use client";

import { useState } from 'react';
import { Eye, Share2, Plus, Bell, MoreHorizontal, Menu, Check, ChevronDown, Link as LinkIcon, Trash2, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { API_BASE } from '../../services/meetingApi';
import { Portal } from '../common/Portal';

interface MeetingHeaderProps {
  meetingId: number;
  title: string;
}

export function MeetingHeader({ meetingId, title }: MeetingHeaderProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 shrink-0 bg-white z-20 relative select-none">

      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-3 text-gray-700">
        <button 
          onClick={() => router.push('/meetings')}
          className="hover:bg-gray-100 p-1.5 rounded-lg transition-colors text-gray-500 cursor-pointer"
          title="Back to meetings"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-2 text-[13px] font-medium">
          <button
            onClick={() => router.push('/meetings')}
            className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            #My Meetings
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">{title}</span>

          {/* 3 Dots with Green Status Dot */}
          <div className="relative flex items-center gap-1.5 ml-1">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              title="Meeting options"
            >
              <MoreHorizontal size={15} />
            </button>
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100 shrink-0"></span>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 shadow-xl rounded-xl w-44 overflow-hidden z-50 py-1 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={async () => {
                      setShowMenu(false);
                      const newTitle = window.prompt("Enter new meeting title:", title);
                      if (newTitle && newTitle !== title) {
                        try {
                          const res = await fetch(`${API_BASE}/meetings/${meetingId}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ title: newTitle })
                          });
                          if (res.ok) window.location.reload();
                        } catch (e) {
                          console.error(e);
                        }
                      }
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 hover:bg-gray-50 text-gray-700 text-[13px] text-left cursor-pointer"
                  >
                    <Edit2 size={14} className="text-gray-400" /> Rename
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      handleCopyLink();
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 hover:bg-gray-50 text-gray-700 text-[13px] text-left cursor-pointer"
                  >
                    <LinkIcon size={14} className="text-gray-400" /> Copy Link
                  </button>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button
                    onClick={async () => {
                      setShowMenu(false);
                      if (window.confirm("Delete this meeting? This cannot be undone.")) {
                        try {
                          const res = await fetch(`${API_BASE}/meetings/${meetingId}`, {
                            method: 'DELETE'
                          });
                          if (res.ok) router.push('/meetings');
                        } catch (e) {
                          console.error(e);
                        }
                      }
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 hover:bg-red-50 text-red-600 text-[13px] text-left font-medium cursor-pointer"
                  >
                    <Trash2 size={14} className="text-red-500" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 text-gray-600">
        {/* Upgrade Button */}
        <button className="px-3 py-1 bg-[#ebfbf5] text-[#059669] border border-[#a7f3d0] hover:bg-[#d1fae5] rounded-md text-[13px] font-semibold transition-colors cursor-pointer">
          Upgrade
        </button>

        <div className="w-px h-4 bg-gray-200" />

        {/* Authentic Slack Integration Icon with Chevron */}
        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors" title="Slack integration">
          <svg width="17" height="17" viewBox="0 0 122.8 122.8">
            <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#E01E5A"/>
            <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36C5F0"/>
            <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C77.6 5.8 83.4 0 90.5 0s12.9 5.8 12.9 12.9v32.3z" fill="#2EB67D"/>
            <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ECB22E"/>
          </svg>
          <ChevronDown size={12} className="text-gray-400" />
        </div>

        <div className="w-px h-4 bg-gray-200" />

        {/* Views */}
        <button className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">
          <Eye size={15} /> 1 View
        </button>

        {/* Share Button */}
        <button 
          onClick={() => setShowShareModal(true)}
          className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold shadow-sm transition-colors cursor-pointer ml-1"
        >
          <Share2 size={13} />
          <span>Share</span>
          <span className="text-[10px] text-purple-200 ml-0.5">🔗</span>
        </button>

        <div className="w-px h-4 bg-gray-200" />

        {/* Plus Button in border square */}
        <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <Plus size={14} className="text-gray-600" />
        </button>

        {/* Bell with red dot */}
        <button className="hover:bg-gray-50 p-1.5 rounded-lg transition-colors text-gray-400 relative cursor-pointer">
          <Bell size={17} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Purple K avatar */}
        <div className="w-7 h-7 bg-[#6b21a8] rounded-md flex items-center justify-center text-white font-bold text-xs uppercase shrink-0 shadow-sm cursor-pointer">
          K
        </div>
      </div>

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
              <h3 className="font-bold text-[16px] text-gray-900 mb-2">Share Meeting</h3>
              <p className="text-xs text-gray-500 mb-4">
                Anyone with this link can view the summary, transcript, and audio notes.
              </p>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-1.5 mb-4 bg-gray-50">
                <input 
                  type="text" 
                  readOnly 
                  value={typeof window !== 'undefined' ? window.location.href : ''}
                  className="bg-transparent text-xs text-gray-600 flex-1 px-2 focus:outline-none truncate"
                />
                <button 
                  onClick={handleCopyLink}
                  className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                >
                  {copied ? <Check size={12} /> : null}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <div className="flex justify-end">
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

    </div>
  );
}

