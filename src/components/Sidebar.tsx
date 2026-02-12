'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  MessageSquare,
  Menu,
  Plus,
  Building2,
  Search,
} from 'lucide-react'

interface Conversation {
  id: string
  title: string
  date: string
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

// Demo data - replace with real data
const conversationGroups: { label: string; items: Conversation[] }[] = [
  {
    label: 'Today',
    items: [
      { id: '1', title: 'Tenant lease renewal Q2', date: 'today' },
      { id: '2', title: 'Maintenance request #4521', date: 'today' },
    ],
  },
  {
    label: 'Previous 7 Days',
    items: [
      { id: '3', title: 'Rent collection summary', date: '3d' },
      { id: '4', title: 'Property inspection schedule', date: '5d' },
      { id: '5', title: 'Vendor contract analysis', date: '6d' },
    ],
  },
]

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[1029] md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-screen z-[1030]
          w-[280px] flex flex-col
          bg-[var(--bg-secondary)] border-r border-[var(--border-color)]
          transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-[var(--brand-primary)] no-underline"
          >
            <Building2 size={22} />
            <span>PropManage</span>
          </Link>
          <button
            onClick={onToggle}
            className="p-2 rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Link
            href="/"
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl
              bg-[var(--brand-primary)] text-white font-semibold text-sm
              hover:bg-[var(--brand-primary-dark)] transition-all
              hover:-translate-y-0.5 hover:shadow-md no-underline"
          >
            <Plus size={18} />
            New Conversation
          </Link>
        </div>

        {/* Search */}
        <div className="px-3 mb-2">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm
                bg-[var(--bg-tertiary)] border border-[var(--border-color)]
                text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
                focus:outline-none focus:border-[var(--brand-primary)]
                transition-colors"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          {conversationGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <div className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1.5 px-2">
                {group.label}
              </div>
              {group.items
                .filter((item) =>
                  item.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => {
                  const isActive = pathname === `/chat/${item.id}`
                  return (
                    <Link
                      key={item.id}
                      href={`/chat/${item.id}`}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-xl mb-0.5 text-sm font-medium
                        transition-colors no-underline truncate
                        ${
                          isActive
                            ? 'bg-[var(--brand-primary)] text-white'
                            : 'text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                        }
                      `}
                    >
                      <MessageSquare size={16} className="shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  )
                })}
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
