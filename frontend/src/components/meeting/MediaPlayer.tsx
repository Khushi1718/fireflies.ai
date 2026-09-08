"use client";

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Download, Star, ThumbsDown, ThumbsUp, ChevronDown } from 'lucide-react';

interface MediaPlayerProps {
  audioUrl: string | null;
  meetingId?: number;
  duration: number;
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  seekTime?: number | null;
}

export function MediaPlayer({ audioUrl, meetingId, duration, currentTime, onTimeUpdate, seekTime }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isStarred, setIsStarred] = useState(false);
  const [thumbState, setThumbState] = useState<'up' | 'down' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Build the audio URL correctly
  const apiBase = '/backend';
  const isRecallAudio = Boolean(audioUrl?.includes('recallai') || audioUrl?.includes('recall.ai'));
  const resolvedUrl = isRecallAudio && meetingId
    ? `${apiBase}/meetings/${meetingId}/audio`
    : audioUrl
      ? (audioUrl.startsWith('http') ? audioUrl : `${apiBase}${audioUrl}`)
    : null;

  useEffect(() => {
    if (!resolvedUrl) return;

    const audio = new Audio(resolvedUrl);
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      onTimeUpdate(audio.currentTime);
    });
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedUrl]);

  // Handle seek
  useEffect(() => {
    if (seekTime === null || seekTime === undefined) return;
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = seekTime;
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
    onTimeUpdate(seekTime);
  }, [seekTime]);

  // Sync playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (error) {
        console.error('Unable to play meeting recording', error);
        setIsPlaying(false);
      }
    }
  };

  const handleSkip = (seconds: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime + seconds);
    } else {
      onTimeUpdate(Math.max(0, currentTime + seconds));
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const totalDuration = duration > 0 ? duration : 969; // 16:09 default demo
    const newTime = ratio * totalDuration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    onTimeUpdate(newTime);
  };

  const toggleRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const next = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(next);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalDuration = duration > 0 ? duration : 969; // 16:09
  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="bg-white border-t border-gray-200 shrink-0 relative z-20 select-none">
      
      {/* Waveform Scrubber Bar */}
      <div
        className="h-1.5 bg-gray-100 hover:h-2 cursor-pointer relative group transition-all"
        onClick={handleScrub}
      >
        <div
          className="h-full bg-[#7b52f6] relative transition-all"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#7b52f6] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Controls Row (Matches Screenshot 2) */}
      <div className="h-12 flex items-center justify-between px-6">

        {/* Left: Time Display (e.g. 00:00 / 16:09 ⌵) */}
        <div className="flex items-center gap-1 text-[13px] font-medium text-gray-600 w-1/3">
          <span className="font-semibold text-gray-900">{formatTime(currentTime)}</span>
          <span className="text-gray-400 mx-0.5">/</span>
          <span className="text-gray-600">{formatTime(totalDuration)}</span>
          <ChevronDown size={14} className="ml-1 cursor-pointer text-gray-400 hover:text-gray-600" />
        </div>

        {/* Center: Playback Controls (1x, Skip 10s back, Play, Skip 10s fwd, Download) */}
        <div className="flex items-center justify-center gap-4 text-gray-700 w-1/3">
          <button
            onClick={toggleRate}
            className="text-[12px] font-bold text-gray-600 hover:text-gray-900 transition-colors w-7 text-center cursor-pointer"
            title="Playback speed"
          >
            {playbackRate}x
          </button>

          {/* Skip Back 10s */}
          <button 
            onClick={() => handleSkip(-10)} 
            className="hover:text-gray-900 transition-colors cursor-pointer p-1 text-gray-600" 
            title="Rewind 10s"
          >
            <RotateCcw size={16} />
          </button>

          {/* Purple Play/Pause Button */}
          <button
            onClick={togglePlay}
            disabled={!resolvedUrl}
            className="w-9 h-9 rounded-full bg-[#7b52f6] hover:bg-[#6742d1] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" className="ml-0.5" />}
          </button>

          {/* Skip Forward 10s */}
          <button 
            onClick={() => handleSkip(10)} 
            className="hover:text-gray-900 transition-colors cursor-pointer p-1 text-gray-600" 
            title="Forward 10s"
          >
            <RotateCw size={16} />
          </button>

          {/* Download Audio */}
          <a
            href={resolvedUrl || '#'}
            download={resolvedUrl ? 'meeting_audio.mp3' : undefined}
            onClick={(e) => {
              if (!resolvedUrl) {
                e.preventDefault();
                alert("Audio recording file is downloading or generating.");
              }
            }}
            className="hover:text-gray-900 transition-colors p-1 text-gray-600 cursor-pointer"
            title="Download recording"
          >
            <Download size={16} />
          </a>
        </div>

        {/* Right: Feedback Controls (Star, Thumbs Up, Thumbs Down) */}
        <div className="flex items-center justify-end gap-3.5 text-gray-400 w-1/3">
          <button 
            onClick={() => setIsStarred(!isStarred)}
            className={`transition-colors cursor-pointer p-1 ${isStarred ? 'text-amber-400' : 'hover:text-amber-400'}`} 
            title="Favorite"
          >
            <Star size={16} fill={isStarred ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => setThumbState(thumbState === 'up' ? null : 'up')}
            className={`transition-colors cursor-pointer p-1 ${thumbState === 'up' ? 'text-[#7b52f6]' : 'hover:text-[#7b52f6]'}`} 
            title="Good summary"
          >
            <ThumbsUp size={16} fill={thumbState === 'up' ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => setThumbState(thumbState === 'down' ? null : 'down')}
            className={`transition-colors cursor-pointer p-1 ${thumbState === 'down' ? 'text-red-500' : 'hover:text-red-500'}`} 
            title="Poor summary"
          >
            <ThumbsDown size={16} fill={thumbState === 'down' ? "currentColor" : "none"} />
          </button>
        </div>

      </div>
    </div>
  );
}
