# PropManage UI — Next.js

A Perplexity-style AI chat interface for property management SaaS, built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

**Ported from** the Nouryon ChatGPT ASP.NET Razor Pages UI — same design system (Montserrat, #0066CC brand, dark/light mode, Perplexity layout) converted to React/Next.js components.

---

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Montserrat font, ThemeProvider)
│   ├── globals.css         # CSS variables, dark mode, base styles
│   ├── page.tsx            # Home page (centered search + feature cards)
│   └── chat/
│       ├── page.tsx        # Chat page (message thread + input)
│       └── [id]/page.tsx   # Dynamic chat route
├── components/
│   ├── ThemeProvider.tsx    # Dark/light mode context + localStorage
│   ├── AppShell.tsx        # Sidebar + Header + content wrapper
│   ├── Sidebar.tsx         # Conversation history sidebar
│   ├── Header.tsx          # Top bar (model selector, KB, theme toggle)
│   ├── ChatInput.tsx       # Shared textarea + send/attach/stop buttons
│   ├── Message.tsx         # Message bubble (user/assistant, citations, suggestions)
│   └── TypingIndicator.tsx # Bouncing dots animation
```

## Design System (from Nouryon Theme)

| Token | Value |
|-------|-------|
| Primary | `#0066CC` |
| Primary Dark | `#004C99` |
| Teal Accent | `#00A3AD` |
| Orange Accent | `#FF6B35` |
| Green Accent | `#00A651` |
| Font | Montserrat 300–700 |
| Border Radius | 6/12/16/24px |
| Transitions | 150/200/300ms cubic-bezier |

All colors use CSS variables for instant dark/light switching.

## Backend Integration

Replace the `setTimeout` mock in `src/app/chat/page.tsx` with your actual API:

```typescript
const handleSend = async (text: string) => {
  // POST to your API
  const res = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message: text }),
  })

  // Streaming
  const reader = res.body?.getReader()
  // ... handle chunks
}
```

## Customization

- **Brand colors**: Edit CSS variables in `globals.css` and `tailwind.config.js`
- **Sidebar items**: Update `conversationGroups` in `Sidebar.tsx`
- **Module selector**: Edit options in `Header.tsx`
- **Feature cards**: Edit `features` array in `page.tsx`
- **Suggestion chips**: Edit `suggestions` array in `page.tsx`
