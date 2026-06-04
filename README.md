# Worklift — AI-Powered Workplace Productivity Assistant

## Project Overview

**Worklift** is an AI-powered productivity suite designed to help employees, managers, freelancers, and business professionals save time, improve communication, and increase workplace efficiency. It bundles five specialized AI tools behind a single clean interface so routine business tasks — writing emails, summarizing meetings, planning work, researching topics, and getting quick answers — can be completed in seconds instead of hours.

The project was developed as part of the **CAPACITI AI Skills Acceleration Programme** to demonstrate practical AI implementation, prompt engineering, and responsible AI practices in a real workplace context.

---

## Features

### 1. Smart Email Generator
- Generates professional emails from short instructions
- Tone options: **Formal, Informal, Persuasive, Friendly**
- Adapts content for clients, managers, or team members

### 2. Meeting Notes Summarizer
- Converts long meeting notes into concise summaries
- Extracts key discussion points, decisions, action items, and deadlines

### 3. AI Task Planner
- Builds daily and weekly schedules
- Prioritizes tasks by urgency and importance
- Provides productivity recommendations

### 4. AI Research Assistant
- Summarizes articles, reports, and business topics
- Highlights key insights and recommendations
- Simplifies complex information for quick decisions

### 5. AI Chatbot Interface
- Interactive workplace assistant for productivity questions
- Multi-turn conversation with context

---

## Tools Used

| Tool | Purpose |
|------|---------|
| **TanStack Start + React 19** | Full-stack framework (SSR + server functions) |
| **Vite 7** | Build tool and dev server |
| **Tailwind CSS v4 + shadcn/ui** | Styling and accessible UI components |
| **Lovable AI Gateway** | LLM access (Google Gemini family) |
| **Lovable Cloud** | Backend runtime and secret management |
| **TypeScript** | Type-safe application code |
| **GitHub** | Version control and project hosting |

---

## Setup Instructions

### Prerequisites
- Node.js 20+ and **Bun** (or npm)
- A modern web browser

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/worklift.git
cd worklift

# 2. Install dependencies
bun install

# 3. Start the dev server
bun run dev

# 4. Open the app
# http://localhost:8080
```

### Environment

The app uses the **Lovable AI Gateway** via the `LOVABLE_API_KEY` environment variable, which is automatically provisioned when Lovable Cloud is enabled. No manual key setup is required when running inside Lovable.

---

## Responsible AI Considerations

- AI-generated outputs should be reviewed before being sent or acted on
- The system may occasionally produce inaccurate or outdated information
- Always verify business-critical communications and decisions
- Designed to minimize bias and promote ethical AI usage

---

## Presentation

A 5-slide project overview deck is included at **`docs/worklift-overview.pptx`**.

---

## Future Improvements

- Calendar integration
- Voice assistant support
- Multi-language functionality
- Team collaboration features
