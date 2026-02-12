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
        className="w-full min-h-[56px] max-h-[200px] resize-none
          px-6 py-4 pr-[120px]
          border-2 border-[var(--border-color)] rounded-3xl
          font-[family-name:var(--font-montserrat)] text-base
          text-[var(--text-primary)] bg-[var(--bg-primary)]
          placeholder:text-[var(--text-tertiary)]
          focus:outline-none focus:border-[var(--brand-primary)]
          focus:shadow-[0_0_0_3px_rgba(0,102,204,0.1)]
          transition-[border-color,box-shadow] overflow-y-auto"
      />

      <div className="absolute right-2 bottom-2 flex gap-1">
        {/* Attach file */}
        <button
          className="p-2 rounded-xl text-[var(--text-secondary)]
            hover:bg-[var(--bg-hover)] transition-colors"
          title="Attach file"
          aria-label="Attach file"
        >
          <Paperclip size={20} />
        </button>

        {/* Stop / Send */}
        {isStreaming ? (
          <button
            onClick={onStopGeneration}
            className="p-2 rounded-xl text-[var(--text-secondary)]
              hover:bg-[var(--bg-hover)] transition-colors"
            title="Stop generation"
            aria-label="Stop generation"
          >
            <Square size={20} />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!value.trim()}
            className="px-3 py-2 rounded-xl font-semibold text-sm
              bg-[var(--brand-primary)] text-white
              hover:bg-[var(--brand-primary-dark)]
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:enabled:-translate-y-0.5 hover:enabled:shadow-md
              transition-all inline-flex items-center gap-1"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
