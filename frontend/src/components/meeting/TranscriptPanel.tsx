import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { TranscriptSegment } from '../../lib/types';

interface TranscriptPanelProps {
  segments: TranscriptSegment[];
  activeSegmentId: number | null;
  onSeek: (time: number) => void;
}

export function TranscriptPanel({ segments, activeSegmentId, onSeek }: TranscriptPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedSegments, setDisplayedSegments] = useState<TranscriptSegment[]>(segments);
  const activeRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active segment
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeSegmentId]);

  // Update displayed segments when segments prop changes or search clears
  useEffect(() => {
    if (!searchQuery.trim()) {
      setDisplayedSegments(segments);
    }
  }, [segments]);

  // Update displayed segments when search query changes (debounced)
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setDisplayedSegments(segments);
        return;
      }
      
      const query = searchQuery.trim().toLowerCase();
      // Fast client-side filter
      const filtered = segments.filter(
        s => s.text.toLowerCase().includes(query) || s.speaker_name.toLowerCase().includes(query)
      );
      setDisplayedSegments(filtered);
    }, 200);

    return () => clearTimeout(handler);
  }, [searchQuery, segments]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <mark key={i} className="bg-yellow-200 text-gray-900 rounded-sm px-0.5">{part}</mark> : part
    );
  };

  return (
    <div className="flex flex-col h-full bg-white min-h-0">
      
      {/* Header & Search */}
      <div className="p-4 border-b border-gray-100 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input 
            type="text" 
            placeholder="Search transcript..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f3f4f6] border border-transparent rounded-md py-1.5 pl-9 pr-3 text-[13px] text-gray-700 focus:outline-none focus:bg-white focus:border-[#7b52f6] focus:ring-1 focus:ring-[#7b52f6] transition-all"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2 px-0.5">
          <span>{displayedSegments.length} {displayedSegments.length === 1 ? 'turn' : 'turns'} recorded</span>
          <span>Click any line to jump audio</span>
        </div>
      </div>

      {/* Transcript List - Always Scrollable with visible scrollbar */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 pb-28 flex flex-col gap-3 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
        {displayedSegments.length === 0 ? (
          <div className="text-center text-gray-500 text-[13px] mt-10">No matching transcript found.</div>
        ) : (
          displayedSegments.map(segment => {
            const isActive = segment.id === activeSegmentId;
            return (
              <div 
                key={segment.id} 
                ref={isActive ? activeRef : null}
                onClick={() => onSeek(segment.start_time_seconds)}
                className={`group flex gap-3 p-2 -mx-2 rounded-lg cursor-pointer transition-colors ${
                  isActive ? 'bg-[#f3e8ff]' : 'hover:bg-gray-50'
                }`}
              >
                {/* Avatar & Time */}
                <div className="flex flex-col items-center gap-1 shrink-0 w-12 pt-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 text-white flex items-center justify-center text-[12px] font-bold shadow-sm">
                    {segment.speaker_name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`text-[10px] font-mono ${isActive ? 'text-[#7b52f6] font-semibold' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {formatTime(segment.start_time_seconds)}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="text-[13px] font-semibold text-gray-900 mb-0.5">
                    {segment.speaker_name}
                  </div>
                  <div className={`text-[14px] leading-relaxed ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                    {highlightText(segment.text)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
