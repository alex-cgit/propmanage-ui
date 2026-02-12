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
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] text-center mb-3 animate-fade-in">
          What can I help you with today?
        </h1>
        <p className="text-lg text-[var(--text-secondary)] text-center mb-12 max-w-[600px] animate-fade-in">
          Manage properties, analyze data, and streamline operations with AI
        </p>

        {/* Search Input */}
        <div className="w-full animate-fade-in-up">
          <ChatInput onSend={handleSend} />
        </div>

        {/* Suggestion Chips */}
        <div
          className="flex flex-wrap justify-center gap-2 mt-6 animate-fade-in-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          {suggestions.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => handleSend(label)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium
                bg-[var(--bg-secondary)] border border-[var(--border-color)]
                text-[var(--text-primary)] whitespace-nowrap
                hover:bg-[var(--brand-primary-light)] hover:text-white hover:border-[var(--brand-primary-light)]
                hover:-translate-y-0.5 hover:shadow-sm transition-all"
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Feature Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto mt-12 animate-fade-in-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          {features.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl
                transition-all hover:-translate-y-1 hover:shadow-lg hover:border-[var(--brand-primary)]"
              style={{
                animationDelay: `${0.2 + i * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              <div className="w-12 h-12 bg-[var(--brand-primary)] text-white rounded-xl flex items-center justify-center mb-4">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
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
