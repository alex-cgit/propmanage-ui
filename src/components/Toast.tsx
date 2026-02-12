'use client'

import { useEffect } from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastProps {
  id: string
  message: string
  type: ToastType
  onClose: (id: string) => void
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const colorMap = {
  success: 'text-[var(--brand-success)]',
  error: 'text-[var(--brand-accent)]',
  info: 'text-[var(--brand-primary)]',
}

export default function Toast({ id, message, type, onClose }: ToastProps) {
  const Icon = iconMap[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, 3000)

    return () => clearTimeout(timer)
  }, [id, onClose])

  return (
    <div
      className="toast flex items-center gap-3 min-w-[300px] max-w-[400px]
        bg-[var(--bg-secondary)] border border-[var(--border-color)]
        rounded-lg px-4 py-3 shadow-lg
        animate-slide-in-up"
    >
      <Icon size={20} className={`shrink-0 ${colorMap[type]}`} />
      <span className="flex-1 text-sm text-[var(--text-primary)]">
        {message}
      </span>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 p-1 rounded-md text-[var(--text-tertiary)]
          hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]
          transition-colors"
        aria-label="Close toast"
      >
        <X size={16} />
      </button>
    </div>
  )
}
