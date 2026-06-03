import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3-flash-preview";

const SYSTEM_PROMPTS: Record<string, string> = {
  email: `You are a professional email writer. Generate a clear, well-structured email matching the requested tone and audience.
Output format (markdown):
**Subject:** <clear subject line>

<email body with proper greeting and sign-off>

Keep it concise, professional, and free of fluff. Never invent confidential facts.`,

  meeting: `You are a meeting notes summarizer. Convert raw notes into a clean structured summary.
Output sections (markdown headings):
## Key Discussion Points
## Decisions Made
## Action Items
(table or list with: Task | Owner | Deadline)
## Risks & Open Questions

Be concise. Mark unclear items with "(verify)". End with: *Disclaimer: Please verify action items and deadlines with attendees.*`,

  planner: `You are an AI productivity planner. Build a prioritized schedule from the user's tasks and goals.
Output (markdown):
## Today's Priorities
(numbered list, P1/P2/P3 tags by urgency × importance)
## Time-Blocked Schedule
(table: Time | Task | Focus level)
## Weekly Outlook
## Productivity Tips
3 concrete tips for this workload.

Be realistic about time. Encourage breaks.`,

  research: `You are a research assistant. Summarize the supplied content or topic for a busy professional.
Output (markdown):
## TL;DR
2-3 sentences.
## Key Insights
Bulleted, with brief explanations.
## Recommendations
Actionable next steps.
## Things to Verify
Items that should be fact-checked.

Simplify jargon. Never fabricate citations. End with: *Disclaimer: AI-generated summary — verify before using in business-critical work.*`,

  chat: `You are a helpful workplace assistant for professionals. Provide clear, practical answers on productivity, communication, workflows, meetings, email etiquette, and general workplace challenges.
- Use short paragraphs and bullet points.
- Be concise and professional.
- Recommend human review for sensitive HR, legal, or financial decisions.
- Never produce biased, discriminatory, or harmful content.`,
};

export const runAssistant = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      mode: z.enum(["email", "meeting", "planner", "research", "chat"]),
      messages: z
        .array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string().min(1).max(20000),
          }),
        )
        .min(1)
        .max(40),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "LOVABLE_API_KEY is not configured." };
    }

    const res = await fetch(AI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[data.mode] },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) {
        return { ok: false as const, error: "Rate limit reached. Please try again in a moment." };
      }
      if (res.status === 402) {
        return { ok: false as const, error: "AI credits exhausted. Add credits in your Lovable workspace." };
      }
      const text = await res.text().catch(() => "");
      console.error("AI gateway error:", res.status, text);
      return { ok: false as const, error: "The AI service is currently unavailable." };
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    return { ok: true as const, content };
  });
