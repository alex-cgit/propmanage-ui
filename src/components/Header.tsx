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
      className="h-14 bg-[var(--bg-primary)] border-b border-[var(--border-color)]
        px-4 md:px-6 flex items-center justify-between
        sticky top-0 z-[1020] transition-colors"
    >
      {/* Left */}
      <div className="flex items-center gap-2">
        {!sidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
        )}

        {/* Model / Module Selector */}
        <div className="relative">
          <select
            className="appearance-none bg-transparent text-[var(--text-primary)]
              border-0 px-2 py-1 pr-6 text-sm font-medium cursor-pointer
              hover:text-[var(--brand-primary)] transition-colors focus:outline-none"
            defaultValue="assistant"
          >
            <option value="assistant">Property Assistant</option>
            <option value="maintenance">Maintenance AI</option>
            <option value="leasing">Leasing Agent</option>
            <option value="finance">Finance Analyst</option>
          </select>
          <ChevronDown
            size={12}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Knowledge Base Selector */}
        <div className="relative hidden md:block">
          <select
            className="appearance-none bg-transparent text-[var(--text-secondary)]
              border-0 px-2 py-1 pr-6 text-sm cursor-pointer
              hover:text-[var(--brand-primary)] transition-colors focus:outline-none"
            defaultValue="none"
          >
            <option value="none">No Knowledge Base</option>
            <option value="leases">Lease Documents</option>
            <option value="maintenance">Maintenance Records</option>
            <option value="financials">Financial Reports</option>
            <option value="regulations">Local Regulations</option>
          </select>
          <ChevronDown
            size={12}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
          />
        </div>

        {/* Web Search Toggle */}
        <button
          className="p-2 rounded-lg text-[var(--text-secondary)]
            hover:bg-[var(--bg-hover)] transition-colors"
          title="Toggle web search"
          aria-label="Toggle web search"
        >
          <Globe size={18} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-[var(--text-secondary)]
            hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Menu */}
        <button
          className="p-2 rounded-lg text-[var(--text-secondary)]
            hover:bg-[var(--bg-hover)] transition-colors"
          aria-label="User menu"
        >
          <User size={18} />
        </button>
      </div>
    </header>
  )
}
