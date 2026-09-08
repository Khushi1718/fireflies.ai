import { useState, useEffect, RefObject } from 'react';
import { TranscriptSegment } from '../types';

export function useTranscriptSync(
  videoRef: RefObject<HTMLMediaElement | null>,
  segments: TranscriptSegment[]
) {
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSegmentId, setActiveSegmentId] = useState<number | null>(null);

  // Sync player time to state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [videoRef]);

  // Sync state to active segment using binary search (or linear for small arrays)
  useEffect(() => {
    if (!segments.length) return;
    
    // Simple linear scan for MVP
    const active = segments.find(
      (s) => currentTime >= s.start_time_seconds && currentTime < s.end_time_seconds
    );
    
    if (active) {
      setActiveSegmentId(active.id);
    } else {
      // If no segment is strictly active, you might want to clear it or keep the last one.
      // Keeping it clear if the user seeks outside segments:
      setActiveSegmentId(null);
    }
  }, [currentTime, segments]);

  const seekTo = (timeSeconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeSeconds;
      videoRef.current.play().catch(e => console.log('Playback prevented', e));
    }
  };

  return { currentTime, activeSegmentId, seekTo };
}
