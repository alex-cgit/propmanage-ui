'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'

// Disable static generation for this page to avoid theme context issues during build
export const dynamic = 'force-dynamic'
import {
  Building,
  Users,
  Wrench,
  BarChart3,
  Bell,
  Settings,
  Search,
  Plus,
} from 'lucide-react'

export default function TestPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/test-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      const data = await response.json()
      setMessage(`✅ Success! Saved to database with ID: ${data.id}`)
      setName('')
      setEmail('')
    } catch (error) {
      setMessage('❌ Error: Failed to save to database')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
              PropManage Design Test
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Testing the Perplexity-style interface with various UI components
            </p>
          </div>

          {/* Navigation Bar Test */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
              Navigation Bar
            </h2>
            <nav className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--brand-primary)] text-white font-semibold hover:bg-[var(--brand-primary-dark)] transition-colors">
                    <Building size={18} />
                    Dashboard
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">
                    <Users size={18} />
                    Tenants
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">
                    <Wrench size={18} />
                    Maintenance
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">
                    <BarChart3 size={18} />
                    Analytics
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
                    <Bell size={20} />
                  </button>
                  <button className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
                    <Settings size={20} />
                  </button>
                </div>
              </div>
            </nav>
          </div>

          {/* Button Styles Test */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
              Button Styles
            </h2>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6">
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-xl bg-[var(--brand-primary)] text-white font-semibold hover:bg-[var(--brand-primary-dark)] hover:-translate-y-0.5 hover:shadow-lg transition-all">
                  Primary Button
                </button>
                <button className="px-6 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 hover:shadow-sm transition-all">
                  Secondary Button
                </button>
                <button className="px-6 py-3 rounded-xl border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] font-semibold hover:bg-[var(--brand-primary)] hover:text-white hover:-translate-y-0.5 transition-all">
                  Outline Button
                </button>
                <button className="px-6 py-3 rounded-full bg-[var(--teal-accent)] text-white font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Rounded Button
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--green-accent)] text-white font-semibold hover:opacity-90 transition-all">
                  <Plus size={20} />
                  Icon Button
                </button>
              </div>
            </div>
          </div>

          {/* Text Input / Form Test */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
              Form Inputs & Database Test
            </h2>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6">
              <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Search Example
                  </label>
                  <div className="relative">
                    <Search
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                    />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Text Area Example
                  </label>
                  <textarea
                    placeholder="Enter a message or description..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-xl bg-[var(--brand-primary)] text-white font-semibold hover:bg-[var(--brand-primary-dark)] hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Test Supabase Connection'}
                </button>

                {message && (
                  <div
                    className={`mt-4 p-4 rounded-xl ${
                      message.includes('✅')
                        ? 'bg-[var(--green-accent)]/10 border border-[var(--green-accent)]/30 text-[var(--green-accent)]'
                        : 'bg-[var(--orange-accent)]/10 border border-[var(--orange-accent)]/30 text-[var(--orange-accent)]'
                    }`}
                  >
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
              Feature Cards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:border-[var(--brand-primary)]">
                <div className="w-12 h-12 bg-[var(--brand-primary)] text-white rounded-xl flex items-center justify-center mb-4">
                  <Building size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  Portfolio Management
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Manage all your properties from a single, unified dashboard
                </p>
              </div>

              <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:border-[var(--brand-primary)]">
                <div className="w-12 h-12 bg-[var(--teal-accent)] text-white rounded-xl flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  Tenant Portal
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Give tenants 24/7 access to payment and maintenance requests
                </p>
              </div>

              <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:border-[var(--brand-primary)]">
                <div className="w-12 h-12 bg-[var(--green-accent)] text-white rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  Analytics & Reports
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Get insights into occupancy, revenue, and performance metrics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
