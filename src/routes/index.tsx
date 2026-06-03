import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  CalendarClock,
  BookOpen,
  MessagesSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Worklift" },
      {
        name: "description",
        content:
          "Your AI productivity workspace. Draft emails, summarize meetings, plan tasks, and research faster.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    title: "Smart Email Generator",
    description:
      "Draft professional emails in any tone — formal, friendly, persuasive — with clear subject lines.",
    href: "/email",
    icon: Mail,
  },
  {
    title: "Meeting Summarizer",
    description:
      "Turn long meeting notes into key points, decisions, action items, owners, and deadlines.",
    href: "/meetings",
    icon: FileText,
  },
  {
    title: "AI Task Planner",
    description:
      "Build prioritized daily and weekly schedules with time blocks and productivity tips.",
    href: "/planner",
    icon: CalendarClock,
  },
  {
    title: "Research Assistant",
    description:
      "Summarize articles and reports into TL;DRs, insights, and recommendations.",
    href: "/research",
    icon: BookOpen,
  },
  {
    title: "Workplace Chat",
    description:
      "Ask anything about productivity, communication, or workplace challenges.",
    href: "/chat",
    icon: MessagesSquare,
  },
] as const;

const principles = [
  {
    icon: Zap,
    title: "Save hours every week",
    body: "Automate routine writing, planning, and summarizing tasks.",
  },
  {
    icon: Clock,
    title: "Stay focused",
    body: "Prioritized plans and clean summaries cut through the noise.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible by default",
    body: "Disclaimers, no fabricated facts, human review encouraged.",
  },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 p-6 lg:p-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-[image:var(--gradient-hero)] p-8 lg:p-12 shadow-[var(--shadow-soft)]">
        <div className="relative max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            AI productivity suite
          </span>
          <h1 className="font-display text-4xl font-semibold tracking-tight lg:text-5xl">
            Work smarter, communicate clearer, ship faster.
          </h1>
          <p className="text-base text-muted-foreground lg:text-lg">
            Worklift gives you five focused AI tools that handle the routine
            workplace tasks slowing your team down — so you can spend time on
            the work that matters.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/email"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
            >
              Draft an email <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-4 py-2.5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-accent"
            >
              Ask the assistant
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {principles.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-soft)]"
          >
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-display text-base font-semibold">
              {title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Your tools
          </h2>
          <p className="text-sm text-muted-foreground">
            Pick a tool to get started
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} to={tool.href} className="group">
              <Card className="h-full border-border/70 transition hover:border-primary/40 hover:shadow-[var(--shadow-glow)]">
                <CardContent className="space-y-3 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {tool.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
