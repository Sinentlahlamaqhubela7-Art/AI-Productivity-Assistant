import { useState, type ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles, AlertCircle, Copy, Check } from "lucide-react";
import { toast } from "sonner";

import { runAssistant } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Mode = "email" | "meeting" | "planner" | "research";

interface AssistantPanelProps {
  mode: Mode;
  title: string;
  description: string;
  icon: ReactNode;
  inputs: ReactNode;
  buildPrompt: () => string | null;
  submitLabel?: string;
}

export function AssistantPanel({
  mode,
  title,
  description,
  icon,
  inputs,
  buildPrompt,
  submitLabel = "Generate",
}: AssistantPanelProps) {
  const run = useServerFn(runAssistant);
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: async (prompt: string) =>
      run({ data: { mode, messages: [{ role: "user", content: prompt }] } }),
    onSuccess: (res) => {
      if (res.ok) {
        setResult(res.content);
      } else {
        toast.error(res.error);
      }
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const handleSubmit = () => {
    const prompt = buildPrompt();
    if (!prompt) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setResult("");
    mutation.mutate(prompt);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6 lg:p-10">
      <header className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="space-y-1">
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </header>

      <Card className="border-border/70 shadow-[var(--shadow-soft)]">
        <CardContent className="space-y-5 pt-6">
          {inputs}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={mutation.isPending}
              className="gap-2"
              size="lg"
            >
              {mutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {submitLabel}
            </Button>
          </div>
        </CardContent>
      </Card>

      {(mutation.isPending || result) && (
        <Card className="border-border/70 shadow-[var(--shadow-soft)]">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Result</h2>
              {result && (
                <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              )}
            </div>
            {mutation.isPending ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Drafting your response…
              </div>
            ) : (
              <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                {result}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex items-start gap-2 rounded-lg border border-border/70 bg-muted/40 p-3 text-xs text-muted-foreground">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <p>
          AI-generated content may be incomplete or inaccurate. Always review
          before sharing, sending, or acting on business-critical work.
        </p>
      </div>
    </div>
  );
}
