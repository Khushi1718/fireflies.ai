"use client";

import { useState } from 'react';
import { ChevronUp, Plus, Hash } from 'lucide-react';
import { TranscriptSegment } from '../../lib/types';

const SPEAKER_COLORS = [
  'bg-emerald-400', 'bg-blue-400', 'bg-purple-400', 'bg-orange-400', 'bg-pink-400', 'bg-indigo-400'
];

export function SmartSearchPanel({ segments, actionItemCount, topicCount }: {
  segments: TranscriptSegment[];
  actionItemCount: number;
  topicCount: number;
}) {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sentimentsOpen, setSentimentsOpen] = useState(true);
  const [talkTimeOpen, setTalkTimeOpen] = useState(true);
  const [topicTrackersOpen, setTopicTrackersOpen] = useState(true);

  // Speaker stats
  const speakerMap = segments.reduce<Record<string, { words: number; seconds: number; index: number }>>((stats, segment) => {
    const speaker = segment.speaker_name || "Speaker 1";
    if (!stats[speaker]) {
      stats[speaker] = { words: 0, seconds: 0, index: Object.keys(stats).length };
    }
    const words = segment.text.trim().split(/\s+/).filter(Boolean).length;
    const secs = Math.max(0, segment.end_time_seconds - segment.start_time_seconds);
    stats[speaker].words += words;
    stats[speaker].seconds += secs;
    return stats;
  }, {});

  const totalSeconds = Object.values(speakerMap).reduce((total, s) => total + s.seconds, 0) || 1;
  const totalWords = segments.reduce((sum, s) => sum + s.text.trim().split(/\s+/).filter(Boolean).length, 0);
  const questionCount = segments.filter(s => s.text.includes('?')).length;

  // Sentiment based on patterns or defaults
  const positiveWords = ['great', 'good', 'excellent', 'happy', 'love', 'perfect', 'agree', 'yes', 'thank', 'awesome'];
  const negativeWords = ['bad', 'issue', 'problem', 'difficult', 'wrong', 'concern', 'disagree', 'no', 'sorry'];
  let posCount = 0, negCount = 0, neuCount = 0;
  segments.forEach(s => {
    const lower = s.text.toLowerCase();
    const pos = positiveWords.some(w => lower.includes(w));
    const neg = negativeWords.some(w => lower.includes(w));
    if (pos && !neg) posCount++;
    else if (neg && !pos) negCount++;
    else neuCount++;
  });
  const total = posCount + negCount + neuCount || 1;
  const neutPct = Math.round((neuCount / total) * 100) || 77;
  const posPct = 100 - neutPct || 23;

  return (
    <div className="flex flex-col bg-white select-none">

      {/* Header */}
      <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <h2 className="text-[14px] font-semibold text-gray-900">Smart Search</h2>
      </div>

      <div className="p-4 flex flex-col gap-6">

        {/* AI Filters */}
        <div>
          <button
            className="flex items-center justify-between w-full mb-3 cursor-pointer"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">AI Filters</h3>
            <ChevronUp size={13} className={`text-gray-400 transition-transform ${filtersOpen ? '' : 'rotate-180'}`} />
          </button>
          {filtersOpen && (
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Date & Time', color: 'bg-[#10b981]', count: segments.length || 4 },
                { label: 'Metrics', color: 'bg-[#06b6d4]', count: totalWords > 0 ? Math.min(totalWords, 15) : 15 },
                { label: 'Questions', color: 'bg-[#ec4899]', count: questionCount || 5 },
                { label: 'Tasks', color: 'bg-[#f59e0b]', count: actionItemCount || 1 },
              ].map(({ label, color, count }) => (
                <button 
                  key={label} 
                  className="flex items-center justify-between px-2.5 py-2 bg-[#f9fafb] border border-gray-100 rounded-lg text-[11px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                    <span className="truncate">{label}</span>
                  </div>
                  <span className="text-gray-400 font-mono text-[10px] ml-1">{count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sentiments */}
        <div className="border-t border-gray-100 pt-5">
          <button
            className="flex items-center justify-between w-full mb-3 cursor-pointer"
            onClick={() => setSentimentsOpen(!sentimentsOpen)}
          >
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sentiments</h3>
            <ChevronUp size={13} className={`text-gray-400 transition-transform ${sentimentsOpen ? '' : 'rotate-180'}`} />
          </button>
          {sentimentsOpen && (
            <div className="flex flex-col gap-3">
              {/* Neutral */}
              <div>
                <div className="flex items-center justify-between text-[12px] mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="text-gray-600">Neutral</span>
                  </div>
                  <span className="text-gray-400 font-mono text-[11px]">{neutPct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full transition-all" style={{ width: `${neutPct}%` }} />
                </div>
              </div>

              {/* Positive */}
              <div>
                <div className="flex items-center justify-between text-[12px] mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-gray-600">Positive</span>
                  </div>
                  <span className="text-gray-400 font-mono text-[11px]">{posPct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${posPct}%` }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Speaker Talktime */}
        <div className="border-t border-gray-100 pt-5">
          <button
            className="flex items-center justify-between w-full mb-3 cursor-pointer"
            onClick={() => setTalkTimeOpen(!talkTimeOpen)}
          >
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Speaker Talktime</h3>
            <ChevronUp size={13} className={`text-gray-400 transition-transform ${talkTimeOpen ? '' : 'rotate-180'}`} />
          </button>
          {talkTimeOpen && (
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-gray-400 uppercase tracking-wide">
                  <th className="font-semibold text-left pb-2">Speakers</th>
                  <th className="font-semibold text-right pb-2 pr-3">WPM</th>
                  <th className="font-semibold text-right pb-2">Talktime</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(speakerMap).length > 0 ? (
                  Object.entries(speakerMap).map(([speaker, stats]) => {
                    const wpm = stats.seconds > 0 ? Math.round((stats.words / stats.seconds) * 60) : 75;
                    const pct = Math.round((stats.seconds / totalSeconds) * 100);
                    const colorClass = SPEAKER_COLORS[stats.index % SPEAKER_COLORS.length];
                    return (
                      <tr key={speaker}>
                        <td className="py-1.5">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-5 h-5 ${colorClass} rounded text-white flex items-center justify-center font-bold text-[10px]`}>
                              {speaker.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-gray-700 truncate max-w-[85px]">{speaker}</span>
                          </div>
                        </td>
                        <td className="py-1.5 text-right pr-3 text-gray-500 font-mono">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-1" />
                          {wpm || 75}
                        </td>
                        <td className="py-1.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 36 36" className="transform -rotate-90 shrink-0">
                              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7b52f6" strokeWidth="4" strokeDasharray={`${pct || 100}, 100`} />
                            </svg>
                            <span className="text-gray-600 font-mono">{pct || 100}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="py-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-emerald-400 rounded text-white flex items-center justify-center font-bold text-[10px]">
                          S
                        </div>
                        <span className="text-gray-700">Speaker 1</span>
                      </div>
                    </td>
                    <td className="py-1.5 text-right pr-3 text-gray-500 font-mono">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-1" />
                      75
                    </td>
                    <td className="py-1.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <svg width="18" height="18" viewBox="0 0 36 36" className="transform -rotate-90 shrink-0">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7b52f6" strokeWidth="4" strokeDasharray="100, 100" />
                        </svg>
                        <span className="text-gray-600 font-mono">100%</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Topic Trackers */}
        <div className="border-t border-gray-100 pt-5 pb-8">
          <button
            className="flex items-center justify-between w-full mb-3 cursor-pointer"
            onClick={() => setTopicTrackersOpen(!topicTrackersOpen)}
          >
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Topic Trackers</h3>
            <div className="flex gap-2 items-center">
              <Plus size={13} className="text-gray-400 hover:text-gray-600" />
              <ChevronUp size={13} className={`text-gray-400 transition-transform ${topicTrackersOpen ? '' : 'rotate-180'}`} />
            </div>
          </button>
          {topicTrackersOpen && (
            <div className="flex flex-col items-center pt-2">
              <div className="w-10 h-10 border border-gray-200/90 rounded-xl flex items-center justify-center text-[#f97316] bg-white shadow-sm cursor-pointer hover:border-orange-300 transition-colors">
                <Hash size={18} strokeWidth={2.5} />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
