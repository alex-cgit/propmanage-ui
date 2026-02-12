'use client'

import { useTheme } from '@/components/ThemeProvider'
import {
  Menu,
  Sun,
  Moon,
  Globe,
  User,
  ChevronDown,
} from 'lucide-react'

interface HeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      className="h-[60px] bg-[var(--bg-primary)] border-b border-[var(--border-color)]
        px-4 md:px-8 flex items-center justify-between
        sticky top-0 z-[1020] transition-colors"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {!sidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Model / Module Selector */}
        <div className="relative">
          <select
            className="appearance-none bg-[var(--bg-tertiary)] text-[var(--text-primary)]
              border border-[var(--border-color)] rounded-xl px-3 py-1.5 pr-8
              text-sm font-semibold cursor-pointer
              hover:bg-[var(--bg-hover)] transition-colors focus:outline-none focus:border-[var(--brand-primary)]"
            defaultValue="assistant"
          >
            <option value="assistant">Property Assistant</option>
            <option value="maintenance">Maintenance AI</option>
            <option value="leasing">Leasing Agent</option>
            <option value="finance">Finance Analyst</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Knowledge Base Selector */}
        <div className="relative hidden md:block">
          <select
            className="appearance-none bg-[var(--bg-tertiary)] text-[var(--text-primary)]
              border border-[var(--border-color)] rounded-xl px-3 py-1.5 pr-8
              text-sm font-medium cursor-pointer
              hover:bg-[var(--bg-hover)] transition-colors focus:outline-none focus:border-[var(--brand-primary)]"
            defaultValue="none"
          >
            <option value="none">No Knowledge Base</option>
            <option value="leases">Lease Documents</option>
            <option value="maintenance">Maintenance Records</option>
            <option value="financials">Financial Reports</option>
            <option value="regulations">Local Regulations</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
          />
        </div>

        {/* Web Search Toggle */}
        <button
          className="p-2 rounded-xl text-[var(--text-secondary)]
            hover:bg-[var(--bg-hover)] transition-colors"
          title="Toggle web search"
          aria-label="Toggle web search"
        >
          <Globe size={20} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]
            text-[var(--text-primary)] flex items-center justify-center
            hover:bg-[var(--bg-hover)] hover:scale-105 transition-all cursor-pointer"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User Menu */}
        <button
          className="p-2 rounded-xl text-[var(--text-secondary)]
            hover:bg-[var(--bg-hover)] transition-colors"
          aria-label="User menu"
        >
          <User size={20} />
        </button>
      </div>
    </header>
  )
}
