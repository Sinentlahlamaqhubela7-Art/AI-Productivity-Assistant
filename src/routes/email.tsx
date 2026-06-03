import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { AssistantPanel } from "@/components/assistant-panel";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Email Generator — Worklift" },
      {
        name: "description",
        content:
          "Draft professional emails in any tone for any audience, with clear subject lines.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [tone, setTone] = useState("Formal");
  const [audience, setAudience] = useState("Client");
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [context, setContext] = useState("");

  return (
    <AssistantPanel
      mode="email"
      title="Smart Email Generator"
      description="Generate clear, professional emails tailored to your audience and tone."
      icon={<Mail className="h-6 w-6" />}
      submitLabel="Draft email"
      buildPrompt={() => {
        if (!purpose.trim()) return null;
        return `Write an email with the following details.

- Tone: ${tone}
- Audience: ${audience}
- Recipient: ${recipient || "(unspecified)"}
- Purpose: ${purpose}
- Additional context: ${context || "(none)"}

Include a clear subject line and a complete email body.`;
      }}
      inputs={
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Formal", "Informal", "Friendly", "Persuasive"].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Client", "Manager", "Colleague", "Stakeholder", "Vendor"].map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Recipient name (optional)</Label>
            <Input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Sarah at Acme"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Purpose *</Label>
            <Textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Follow up on the proposal sent last week and request a meeting next Tuesday."
              rows={3}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Additional context (optional)</Label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Background info, key points to include, things to avoid…"
              rows={3}
            />
          </div>
        </div>
      }
    />
  );
}
