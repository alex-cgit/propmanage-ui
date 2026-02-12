'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { Search } from 'lucide-react'

// Disable static generation for this page to avoid theme context issues during build
export const dynamic = 'force-dynamic'

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
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-3">
              PropManage Test
            </h1>
            <p className="text-[var(--text-secondary)]">
              Testing the database connection and UI components
            </p>
          </div>

          {/* Database Test Form */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-8 mb-8">
            <h2 className="text-lg font-medium text-[var(--text-primary)] mb-6">
              Database Connection Test
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-5 py-2.5 rounded-lg bg-[var(--brand-primary)] text-white font-medium hover:bg-[var(--brand-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Testing connection...' : 'Test Supabase Connection'}
              </button>

              {message && (
                <div
                  className={`p-4 rounded-lg text-sm ${
                    message.includes('✅')
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>

          {/* UI Components Demo */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium text-[var(--text-primary)] mb-4">
                UI Components
              </h2>

              {/* Buttons */}
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6 mb-6">
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4">Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 rounded-lg bg-[var(--brand-primary)] text-white text-sm font-medium hover:bg-[var(--brand-primary-dark)] transition-colors">
                    Primary
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-hover)] transition-colors">
                    Secondary
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors">
                    Outline
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4">Input Fields</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Text input"
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all"
                  />

                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all"
                    />
                  </div>

                  <textarea
                    placeholder="Textarea"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
