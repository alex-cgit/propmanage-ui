'use client'

import { useState } from 'react'
import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react'

export interface Citation {
  number: number
  title: string
  snippet: string
  url: string
}

export interface MessageData {
  id: string
  role: 'user' | 'assistant'
  content: string
  time: string
  citations?: Citation[]
  suggestions?: string[]
}

interface MessageProps {
  message: MessageData
  onSuggestionClick?: (text: string) => void
}

export default function Message({ message, onSuggestionClick }: MessageProps) {
  const [hoveredCitation, setHoveredCitation] = useState<Citation | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 })

  const isUser = message.role === 'user'

  const handleCitationHover = (e: React.MouseEvent, citation: Citation) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setTooltipPos({
      top: rect.bottom + 8,
      left: Math.min(rect.left, window.innerWidth - 316),
    })
    setHoveredCitation(citation)
  }

  return (
    <div className="flex flex-col gap-2 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm shrink-0
            ${
              isUser
                ? 'bg-[var(--brand-primary)] text-white'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
        >
          {isUser ? 'U' : 'AI'}
        </div>
        <span className="font-semibold text-sm text-[var(--text-primary)]">
          {isUser ? 'You' : 'PropManage AI'}
        </span>
        <span className="text-xs text-[var(--text-tertiary)]">
          {message.time}
        </span>
      </div>

      {/* Content */}
      <div
        className="pl-10 text-[var(--text-primary)] leading-[1.7]
          [&_p]:mb-4 [&_p:last-child]:mb-0
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
          [&_li]:mb-1
          [&_strong]:font-semibold
          [&_pre]:bg-[var(--bg-tertiary)] [&_pre]:border [&_pre]:border-[var(--border-color)]
          [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre]:font-mono [&_pre]:text-sm
          [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:bg-[var(--bg-tertiary)] [&_code]:px-1.5 [&_code]:rounded-md
          [&_pre_code]:bg-transparent [&_pre_code]:p-0"
        dangerouslySetInnerHTML={{ __html: message.content }}
      />

      {/* Citations inline tooltips */}
      {hoveredCitation && (
        <div
          className="fixed max-w-[300px] bg-[var(--bg-primary)] border border-[var(--border-color)]
            rounded-xl p-4 shadow-lg z-[1070] pointer-events-none animate-fade-in"
          style={{ top: tooltipPos.top, left: tooltipPos.left }}
        >
          <div className="font-semibold text-[var(--brand-primary)] mb-1 text-sm">
            [{hoveredCitation.number}] {hoveredCitation.title}
          </div>
          <div className="text-sm text-[var(--text-secondary)] mb-2">
            {hoveredCitation.snippet}
          </div>
          <div className="text-xs text-[var(--text-tertiary)]">
            {hoveredCitation.url}
          </div>
        </div>
      )}

      {/* Assistant actions */}
      {!isUser && (
        <div className="pl-10 flex items-center gap-1 mt-1">
          <button
            className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            title="Copy"
          >
            <Copy size={15} />
          </button>
          <button
            className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            title="Good response"
          >
            <ThumbsUp size={15} />
          </button>
          <button
            className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            title="Bad response"
          >
            <ThumbsDown size={15} />
          </button>
          <button
            className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
            title="Regenerate"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      )}

      {/* Suggestion Chips - Perplexity style */}
      {message.suggestions && message.suggestions.length > 0 && (
        <div className="pl-10 flex flex-wrap gap-2 mt-3">
          {message.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onSuggestionClick?.(s)}
              className="suggestion-chip"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
