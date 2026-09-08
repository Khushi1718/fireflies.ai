"use client";

import { useState } from 'react';
import { Copy, Sparkles, ChevronDown, Video, MoreHorizontal, Maximize, Edit2, Loader2, RefreshCw, CheckCircle, Wand2 } from 'lucide-react';
import { Summary, ActionItem } from '../../lib/types';
import { meetingApi } from '../../services/meetingApi';

interface NotesPanelProps {
  summary: Summary | null;
  actionItems?: ActionItem[];
  title: string;
  meetingDate?: string | null;
  meetingId?: number;
  topics?: Array<{ title: string; start_time_seconds: number | null; end_time_seconds: number | null }>;
  onTopicClick: (time: number) => void;
  onActionItemToggle?: (id: number, newStatus: string) => void;
  onNotesGenerated?: (data: any) => void;
}

export function NotesPanel({
  summary,
  actionItems,
  title,
  meetingDate,
  meetingId,
  topics,
  onTopicClick,
  onActionItemToggle,
  onNotesGenerated,
}: NotesPanelProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'aiskills'>('notes');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [generateSuccess, setGenerateSuccess] = useState(false);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  let parsedOutline: Array<{
    sectionTitle: string;
    items: Array<{ text: string; time?: number; subItems?: string[] }>;
  }> = [];

  try {
    if (summary?.key_points_json) {
      parsedOutline = JSON.parse(summary.key_points_json);
    }
  } catch (e) {
    console.error("Failed to parse outline", e);
  }

  const handleGenerate = async (refine = false) => {
    if (!meetingId) return;
    setGenerating(true);
    setGenerateError(null);
    setGenerateSuccess(false);
    try {
      const data = await meetingApi.generateNotes(meetingId);
      setGenerateSuccess(true);
      onNotesGenerated?.(data);
      setTimeout(() => setGenerateSuccess(false), 3000);
    } catch (e: unknown) {
      setGenerateError(e instanceof Error ? e.message : 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyNotes = () => {
    const overview = summary?.overview ? `Summary\n${summary.overview}\n\n` : '';
    const outline = parsedOutline.map(section => {
      const items = section.items.map(item =>
        `• ${item.text}${item.subItems?.length ? '\n' + item.subItems.map((s: string) => `  ◦ ${s}`).join('\n') : ''}`
      ).join('\n');
      return `${section.sectionTitle}\n${items}`;
    }).join('\n\n');
    const actions = actionItems?.length
      ? `\nAction Items\n${actionItems.map(a => `• ${a.text}${a.assignee_name ? ` (@${a.assignee_name})` : ''}`).join('\n')}`
      : '';
    navigator.clipboard.writeText(overview + outline + actions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = (() => {
    if (!meetingDate) return 'Sep 07 2026, 5:31 PM';
    let str = meetingDate;
    if (!str.includes('Z') && !str.includes('+') && !/T.*\d{2}-\d{2}/.test(str)) {
      str = str + 'Z';
    }
    const d = new Date(str);
    if (isNaN(d.getTime())) return 'Sep 07 2026, 5:31 PM';
    return d.toLocaleString('en-US', {
      month: 'short', day: '2-digit', year: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true,
    });
  })();

  return (
    <div className="flex flex-col relative bg-white select-none">

      {/* Top Tabs (Exact match to Screenshot 2: Notes | AI Skills · 0 + Maximize) */}
      <div className="sticky top-0 z-10 w-full flex items-center justify-center py-2 bg-white border-b border-gray-100">
        <div className="flex bg-[#f3f4f6] rounded-lg p-0.5 border border-gray-200/50">
          <button
            onClick={() => setActiveTab('notes')}
            className={`text-[12px] font-semibold px-4 py-1 rounded-md transition-all cursor-pointer ${
              activeTab === 'notes' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab('aiskills')}
            className={`text-[12px] font-medium px-4 py-1 rounded-md transition-all cursor-pointer ${
              activeTab === 'aiskills' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            AI Skills · {actionItems?.length || 0}
          </button>
        </div>
        <button 
          className="absolute right-5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          title="Full screen"
        >
          <Maximize size={15} />
        </button>
      </div>

      {activeTab === 'notes' && (
        <div className="p-8 max-w-4xl mx-auto w-full">

          {/* Title Row with Video button (Matches Screenshot 2) */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[24px] font-bold text-gray-900 tracking-tight">{title}</h1>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 text-xs font-medium transition-colors cursor-pointer shadow-sm">
              <Video size={14} /> Video
            </button>
          </div>

          {/* Metadata Subtitle Row */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <div className="w-5 h-5 bg-[#6b21a8] rounded flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              K
            </div>
            <span className="text-gray-800 font-semibold cursor-pointer hover:underline">Khushi Nain</span>
            <span className="text-gray-400">{formattedDate}</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-gray-700 text-gray-400">
              English (Global) <ChevronDown size={12} />
            </span>
          </div>

          {/* Action Row: General Summary ⌵ | Refine Summary | Copy | Edit */}
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-4 text-xs font-semibold">
              {/* General Summary */}
              <button
                onClick={() => handleGenerate(false)}
                disabled={generating}
                className="flex items-center gap-1.5 text-[#7b52f6] hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>General Summary</span>
                <ChevronDown size={13} />
              </button>

              {/* Refine Summary */}
              <button
                onClick={() => handleGenerate(true)}
                disabled={generating}
                className="flex items-center gap-1.5 text-[#7b52f6] hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                <Wand2 size={13} />
                <span>Refine Summary</span>
              </button>

              {/* Copy Icon */}
              <button 
                onClick={handleCopyNotes}
                className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                title="Copy notes"
              >
                <Copy size={14} />
              </button>

              {generateSuccess && (
                <span className="flex items-center gap-1 text-emerald-500 text-[11px] font-medium">
                  <CheckCircle size={13} /> Updated!
                </span>
              )}
            </div>

            {/* Edit button on right */}
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">
              <Edit2 size={13} /> Edit
            </button>
          </div>

          {/* Notes Header Row (Matches Screenshot 2) */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[17px] font-bold text-gray-900">Notes</h2>
            <div className="flex items-center gap-3.5 text-gray-400 text-xs">
              <button className="hover:text-gray-700 transition-colors cursor-pointer">
                Edit
              </button>
              <div className="flex items-center gap-0.5 cursor-pointer hover:text-gray-700">
                <Copy size={13} />
                <ChevronDown size={11} />
              </div>
              <button className="hover:text-gray-700 transition-colors cursor-pointer">
                <MoreHorizontal size={15} />
              </button>
            </div>
          </div>

          {/* Generating Animation */}
          {generating && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7b52f6] to-[#D92D87] rounded-xl flex items-center justify-center mb-3 shadow-md">
                <Sparkles size={22} className="text-white animate-pulse" />
              </div>
              <h3 className="text-[14px] font-bold text-gray-800 mb-1">Generating AI Notes...</h3>
              <p className="text-xs text-gray-400 max-w-xs">Extracting key points, chapters, and action items with timestamps.</p>
            </div>
          )}

          {!generating && generateError && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {generateError.includes('429') || generateError.toLowerCase().includes('quota')
                ? 'Gemini note generation is unavailable because the configured API quota is exhausted.'
                : generateError}
            </div>
          )}

          {/* Outline Sections */}
          {!generating && parsedOutline.length > 0 && (
            <div className="flex flex-col gap-6">
              {parsedOutline.map((section, i) => (
                <div key={i}>
                  <h3 className="font-bold text-gray-900 text-[15px] mb-3">
                    {section.sectionTitle}
                  </h3>
                  <ul className="space-y-2.5 text-[13px] text-gray-700">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-1.5 flex-wrap leading-relaxed">
                          <span className="text-gray-400 font-bold">•</span>
                          <span className="text-gray-800 font-medium">{item.text}</span>
                          {item.time != null && (
                            <button
                              onClick={() => onTopicClick(item.time!)}
                              className="text-[#7b52f6] font-mono text-xs hover:underline cursor-pointer ml-1"
                              title={`Jump to ${formatTime(item.time)}`}
                            >
                              ({formatTime(item.time)})
                            </button>
                          )}
                        </div>
                        {item.subItems && item.subItems.length > 0 && (
                          <ul className="pl-6 space-y-1 text-gray-500 text-[13px]">
                            {item.subItems.map((sub: string, k: number) => (
                              <li key={k} className="flex items-start gap-2">
                                <span className="text-gray-400 text-xs">◦</span>
                                <span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Overview fallback */}
          {!generating && parsedOutline.length === 0 && summary?.overview && (
            <div className="prose prose-sm max-w-none text-gray-700 text-[14px] leading-relaxed">
              <p>{summary.overview}</p>
            </div>
          )}

          {!generating && !generateError && parsedOutline.length === 0 && !summary?.overview && (
            <p className="text-sm text-gray-500">AI notes will appear here after the meeting is processed.</p>
          )}

          {/* Topics Section */}
          {!generating && topics && topics.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="text-[15px] font-bold text-gray-900 mb-3.5">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => topic.start_time_seconds !== null && onTopicClick(topic.start_time_seconds!)}
                    className="rounded-full bg-gray-100/80 hover:bg-purple-50 hover:text-[#7b52f6] px-3.5 py-1.5 text-xs text-gray-700 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{topic.title}</span>
                    {topic.start_time_seconds != null && (
                      <span className="text-gray-400 font-mono text-[11px]">{formatTime(topic.start_time_seconds)}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Items Section */}
          {!generating && actionItems && actionItems.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-900">Action Items</h3>
                <span className="text-xs text-gray-400 font-medium">
                  {actionItems.filter(a => a.status !== 'completed').length} open
                </span>
              </div>
              <div className="space-y-2">
                {actionItems.map(item => (
                  <div 
                    key={item.id} 
                    className="flex items-start gap-3 p-3.5 border border-gray-100 rounded-xl hover:bg-gray-50/80 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={item.status === 'completed'}
                      onChange={() => onActionItemToggle?.(item.id, item.status === 'completed' ? 'open' : 'completed')}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#7b52f6] focus:ring-[#7b52f6] cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className={`text-[13px] leading-relaxed ${item.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {item.text}
                      </p>
                      {item.assignee_name && (
                        <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-purple-50 text-[#7b52f6] text-[11px] font-semibold rounded-md">
                          @ {item.assignee_name}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="h-24" />
        </div>
      )}

      {/* AI Skills Tab Content */}
      {activeTab === 'aiskills' && (
        <div className="p-8 max-w-4xl mx-auto w-full text-center py-16">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto mb-3 text-[#7b52f6]">
            <Sparkles size={22} />
          </div>
          <h3 className="text-[16px] font-bold text-gray-900 mb-1.5">AI Skills Library</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
            Run automated prompts, extract key metrics, or push notes to Notion, Asana, and Slack.
          </p>
          <button className="bg-[#7b52f6] hover:bg-[#6742d1] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer">
            Browse AI Skills
          </button>
        </div>
      )}

    </div>
  );
}
