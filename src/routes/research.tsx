import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

import { AssistantPanel } from "@/components/assistant-panel";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Assistant — Worklift" },
      {
        name: "description",
        content:
          "Summarize articles, reports, and business topics into key insights and recommendations.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  return (
    <AssistantPanel
      mode="research"
      title="AI Research Assistant"
      description="Paste content or describe a topic — get a TL;DR, insights, and recommendations."
      icon={<BookOpen className="h-6 w-6" />}
      submitLabel="Summarize & analyze"
      buildPrompt={() => {
        if (!topic.trim() && !content.trim()) return null;
        return `Research request:

- Topic / question: ${topic || "(see content below)"}

Source content (may be empty if topic-only):
"""
${content || "(none — answer from general knowledge)"}
"""

Produce a TL;DR, key insights, recommendations, and items to verify. Simplify jargon for a non-technical reader.`;
      }}
      inputs={
        <div className="grid gap-4">
          <div className="space-y-1.5">
            <Label>Topic or question</Label>
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. What are the main risks of adopting agentic AI in customer support?"
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Source content (optional)</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste article text, report excerpts, or notes here…"
              rows={12}
            />
          </div>
        </div>
      }
    />
  );
}
