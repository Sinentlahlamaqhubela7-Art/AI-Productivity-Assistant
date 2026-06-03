import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";

import { AssistantPanel } from "@/components/assistant-panel";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Summarizer — Worklift" },
      {
        name: "description",
        content:
          "Turn raw meeting notes into clean summaries: discussion points, decisions, action items, owners and deadlines.",
      },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [title, setTitle] = useState("");
  const [attendees, setAttendees] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <AssistantPanel
      mode="meeting"
      title="Meeting Notes Summarizer"
      description="Paste raw notes — get a structured summary with action items and owners."
      icon={<FileText className="h-6 w-6" />}
      submitLabel="Summarize meeting"
      buildPrompt={() => {
        if (!notes.trim()) return null;
        return `Summarize the following meeting.

- Meeting: ${title || "(untitled)"}
- Attendees: ${attendees || "(unspecified)"}

Raw notes:
"""
${notes}
"""`;
      }}
      inputs={
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Meeting title (optional)</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Q3 product planning"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Attendees (optional)</Label>
              <Input
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                placeholder="e.g. Sarah, Jamal, Priya"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Raw notes or transcript *</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste everything from the meeting — bullet notes, transcript, scratch ideas…"
              rows={14}
            />
          </div>
        </div>
      }
    />
  );
}
