import { MeetingDetail } from "../lib/types";

export const API_BASE = "/backend";

export interface AskFredMessage {
  role: "user" | "assistant";
  content: string;
}

export const meetingApi = {
  
  async createMeeting(title: string, mediaUrl: string): Promise<MeetingDetail> {
    const res = await fetch(`${API_BASE}/meetings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title || "Live Meeting",
        media_url: mediaUrl,
        status: "CREATED"
      })
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.detail || `Failed to create meeting (${res.status})`);
    }
    return res.json();
  },

  async getMeetings(): Promise<MeetingDetail[]> {
    const res = await fetch(`${API_BASE}/meetings`);
    if (!res.ok) throw new Error("Failed to fetch meetings");
    return res.json();
  },

  async getMeeting(id: number): Promise<MeetingDetail> {
    let lastError = "Failed to fetch meeting";
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const res = await fetch(`${API_BASE}/meetings/${id}`, {
          cache: "no-store",
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        const contentType = res.headers.get("content-type") || "";
        if (!res.ok || !contentType.includes("application/json")) {
          const body = await res.text();
          lastError = body.includes("ngrok")
            ? "The public backend tunnel is reconnecting. Please retry."
            : `Failed to fetch meeting (${res.status})`;
          throw new Error(lastError);
        }
        return await res.json();
      } catch (error) {
        lastError = error instanceof Error ? error.message : lastError;
        if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    throw new Error(lastError);
  },

  async deleteMeeting(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/meetings/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete meeting");
  },

  async startMeeting(id: number): Promise<MeetingDetail> {
    const res = await fetch(`${API_BASE}/meetings/${id}/start`, { method: "POST" });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.detail || `Failed to start meeting (${res.status})`);
    }
    return res.json();
  },

  async pauseMeeting(id: number): Promise<MeetingDetail> {
    const res = await fetch(`${API_BASE}/meetings/${id}/pause`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to pause meeting");
    return res.json();
  },

  async resumeMeeting(id: number): Promise<MeetingDetail> {
    const res = await fetch(`${API_BASE}/meetings/${id}/resume`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to resume meeting");
    return res.json();
  },

  async stopMeeting(id: number): Promise<MeetingDetail> {
    const res = await fetch(`${API_BASE}/meetings/${id}/stop`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to stop meeting");
    return res.json();
  },

  async generateTranscript(id: number): Promise<MeetingDetail> {
    const res = await fetch(`${API_BASE}/meetings/${id}/transcript/generate`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to generate transcript");
    return res.json();
  },

  async generateNotes(id: number): Promise<{
    summary: string;
    key_points: unknown[];
    topics: MeetingDetail["topics"];
    action_items: MeetingDetail["action_items"];
  }> {
    const res = await fetch(`${API_BASE}/meetings/${id}/generate`, { method: "POST" });
    const body = await res.json().catch(() => null);
    if (!res.ok) throw new Error(body?.detail || "Failed to generate notes");
    return body;
  },

  async askFred(id: number, question: string, history: AskFredMessage[] = []): Promise<string> {
    const res = await fetch(`${API_BASE}/meetings/${id}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, history }),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) throw new Error(body?.detail || `AskFred failed (${res.status})`);
    return body.answer;
  }
};
