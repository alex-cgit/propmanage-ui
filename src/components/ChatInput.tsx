'use client'

import { useState, useRef, useCallback, KeyboardEvent } from 'react'
import { Send, Paperclip, Square } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  placeholder?: string
  isStreaming?: boolean
  onStopGeneration?: () => void
}

export default function ChatInput({
  onSend,
  placeholder = 'Ask anything... (Press / to focus)',
  isStreaming = false,
  onStopGeneration,
}: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const autoResize = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 200) + 'px'
  }, [])

  const handleSend = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || isStreaming) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [value, isStreaming, onSend])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="relative max-w-chat mx-auto w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          autoResize()
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        className="w-full min-h-[52px] max-h-[200px] resize-none
          px-5 py-3 pr-[110px]
          border border-[var(--border-color)] rounded-2xl
          text-[15px]
          text-[var(--text-primary)] bg-[var(--bg-primary)]
          placeholder:text-[var(--text-tertiary)]
          focus:outline-none focus:border-[var(--brand-primary)]
          focus:ring-1 focus:ring-[var(--brand-primary)]
          transition-all overflow-y-auto"
      />

      <div className="absolute right-2 bottom-2 flex gap-0.5">
        {/* Attach file */}
        <button
          className="p-2 rounded-lg text-[var(--text-secondary)]
            hover:bg-[var(--bg-hover)] transition-colors"
          title="Attach file"
          aria-label="Attach file"
        >
          <Paperclip size={18} />
        </button>

        {/* Stop / Send */}
        {isStreaming ? (
          <button
            onClick={onStopGeneration}
            className="p-2 rounded-lg text-[var(--text-secondary)]
              hover:bg-[var(--bg-hover)] transition-colors"
            title="Stop generation"
            aria-label="Stop generation"
          >
            <Square size={18} />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!value.trim()}
            className="px-3 py-2 rounded-lg font-medium text-sm
              bg-[var(--brand-primary)] text-white
              hover:bg-[var(--brand-primary-dark)]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors inline-flex items-center gap-1"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
