import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, MessagesSquare, Send, AlertCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { runAssistant } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Workplace Chat — Worklift" },
      {
        name: "description",
        content:
          "Ask the workplace assistant for productivity advice, communication tips, and professional guidance.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How do I politely decline a meeting request?",
  "Tips for running an effective stand-up?",
  "Help me handle a missed deadline with my manager.",
  "What's a good framework for prioritizing my week?",
];

function ChatPage() {
  const run = useServerFn(runAssistant);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: async (history: Msg[]) =>
      run({ data: { mode: "chat", messages: history } }),
    onSuccess: (res) => {
      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: res.content }]);
      } else {
        toast.error(res.error);
      }
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, mutation.isPending]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || mutation.isPending) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    mutation.mutate(next);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] w-full max-w-4xl flex-col p-4 lg:p-6">
      <header className="flex items-start gap-4 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <MessagesSquare className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Workplace Chat
          </h1>
          <p className="text-muted-foreground">
            Productivity advice, communication coaching, and professional guidance.
          </p>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-border/70 bg-card p-4 shadow-[var(--shadow-soft)]"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-xl font-semibold">
                How can I help at work today?
              </h2>
              <p className="text-sm text-muted-foreground">
                Pick a starter or ask anything.
              </p>
            </div>
            <div className="grid w-full max-w-xl gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-xl border border-border/70 bg-background p-3 text-left text-sm text-foreground transition hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-[var(--shadow-soft)] ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/70 bg-background text-foreground"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {mutation.isPending && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-3 flex items-end gap-2"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Ask anything about work…"
          rows={1}
          className="min-h-[48px] resize-none"
        />
        <Button type="submit" size="lg" disabled={mutation.isPending || !input.trim()} className="gap-1.5">
          <Send className="h-4 w-4" />
          Send
        </Button>
      </form>

      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <AlertCircle className="h-3 w-3" />
        AI may be inaccurate. Verify before acting on important decisions.
      </div>
    </div>
  );
}
