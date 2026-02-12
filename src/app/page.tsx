'use client'

import { useRouter } from 'next/navigation'
import AppShell from '@/components/AppShell'
import ChatInput from '@/components/ChatInput'
import {
  ClipboardCheck,
  FileText,
  Clock,
  BarChart3,
  Building,
  Wrench,
  Users,
} from 'lucide-react'

const suggestions = [
  { icon: ClipboardCheck, label: 'Analyze lease expirations' },
  { icon: FileText, label: 'Summarize maintenance requests' },
  { icon: Clock, label: 'Generate rent roll report' },
  { icon: BarChart3, label: 'Compare occupancy rates' },
]

const features = [
  {
    icon: Building,
    title: 'Portfolio Analytics',
    description: 'Analyze occupancy, revenue, and performance across all properties',
  },
  {
    icon: Wrench,
    title: 'Maintenance Intelligence',
    description: 'Track work orders, predict failures, and optimize vendor costs',
  },
  {
    icon: Users,
    title: 'Tenant Management',
    description: 'Lease renewals, communication history, and satisfaction insights',
  },
]

export default function HomePage() {
  const router = useRouter()

  const handleSend = (message: string) => {
    router.push(`/chat?message=${encodeURIComponent(message)}`)
  }

  return (
    <AppShell>
      <div className="flex-1 flex flex-col items-center justify-center max-w-chat mx-auto w-full px-4 md:px-6 py-12">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] text-center mb-3">
          What can I help you with today?
        </h1>
        <p className="text-base text-[var(--text-secondary)] text-center mb-12 max-w-[600px]">
          Manage properties, analyze data, and streamline operations with AI
        </p>

        {/* Search Input */}
        <div className="w-full">
          <ChatInput onSend={handleSend} />
        </div>

        {/* Suggestion Chips - Perplexity style */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {suggestions.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => handleSend(label)}
              className="suggestion-chip flex items-center gap-1.5"
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Feature Cards - Minimal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[900px] mx-auto mt-16">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl
                transition-all hover:border-[var(--brand-primary)]"
            >
              <div className="w-10 h-10 bg-[var(--brand-primary)] text-white rounded-lg flex items-center justify-center mb-3">
                <Icon size={20} />
              </div>
              <h3 className="text-base font-medium text-[var(--text-primary)] mb-1.5">
                {title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
