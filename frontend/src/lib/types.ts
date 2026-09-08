export interface Participant {
  id: number;
  name: string;
  email: string | null;
  created_at: string;
}

export interface TranscriptSegment {
  id: number;
  meeting_id?: number;
  speaker_name: string;
  speaker_participant_id: number | null;
  start_time_seconds: number;
  end_time_seconds: number;
  sequence: number;
  text: string;
  is_final?: boolean;
}

export interface Summary {
  id: number;
  overview: string;
  key_points_json: string;
}

export interface Topic {
  id: number;
  title: string;
  start_time_seconds: number | null;
  end_time_seconds: number | null;
  sequence: number;
}

export interface ActionItem {
  id: number;
  text: string;
  assignee_name: string | null;
  status: string;
  source_segment_id: number | null;
}

export interface MeetingDetail {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  meeting_date: string;
  duration_seconds: number;
  media_url: string | null;
  status: string;
  start_time: string | null;
  created_at: string;
  participants: Participant[];
  transcript_segments: TranscriptSegment[];
  summary: Summary | null;
  topics: Topic[];
  action_items: ActionItem[];
}
