import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";

import { AssistantPanel } from "@/components/assistant-panel";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Worklift" },
      {
        name: "description",
        content:
          "Generate prioritized daily and weekly schedules with productivity tips.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const [scope, setScope] = useState("Today");
  const [hours, setHours] = useState("8");
  const [tasks, setTasks] = useState("");
  const [goals, setGoals] = useState("");

  return (
    <AssistantPanel
      mode="planner"
      title="AI Task Planner"
      description="Turn a messy task list into a focused, prioritized plan."
      icon={<CalendarClock className="h-6 w-6" />}
      submitLabel="Build my plan"
      buildPrompt={() => {
        if (!tasks.trim()) return null;
        return `Build a productivity plan with these parameters.

- Scope: ${scope}
- Available working hours: ${hours}
- Goals / priorities: ${goals || "(unspecified)"}

Tasks (one per line, may include rough deadlines or notes):
"""
${tasks}
"""

Prioritize using urgency × importance (P1/P2/P3), produce a time-blocked schedule, and include 3 productivity tips.`;
      }}
      inputs={
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Planning scope</Label>
              <Select value={scope} onValueChange={setScope}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Today", "Tomorrow", "This week", "Next week"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Available focus hours</Label>
              <Select value={hours} onValueChange={setHours}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["3", "4", "5", "6", "7", "8", "10"].map((h) => (
                    <SelectItem key={h} value={h}>
                      {h} hours
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Top goals (optional)</Label>
            <Textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g. Ship the onboarding redesign, prep for Friday's review."
              rows={2}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Tasks *</Label>
            <Textarea
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              placeholder={`Review designer's mockups (urgent)\nReply to client follow-up\nDraft Q3 OKRs\n1:1 with Sam at 3pm`}
              rows={10}
            />
          </div>
        </div>
      }
    />
  );
}
