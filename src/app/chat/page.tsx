'use client'

import { useState, useRef, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import AppShell from '@/components/AppShell'
import ChatInput from '@/components/ChatInput'
import Message, { MessageData } from '@/components/Message'
import TypingIndicator from '@/components/TypingIndicator'

// Demo data
const demoMessages: MessageData[] = [
  {
    id: '1',
    role: 'user',
    content: 'What are the current occupancy rates across our portfolio?',
    time: '14:32',
  },
  {
    id: '2',
    role: 'assistant',
    content: `<p>Based on the latest property data, here's the occupancy overview across your portfolio:</p>

<p><strong>Overall Occupancy:</strong> 94.2% <a class="citation" href="#">[1]</a>, representing a 2.1% increase quarter-over-quarter <a class="citation" href="#">[2]</a>.</p>

<p><strong>By Property Type:</strong></p>
<ul>
  <li>Residential Multi-family: 96.8% (142/147 units)</li>
  <li>Commercial Office: 91.3% (84/92 suites)</li>
  <li>Retail Strip: 88.5% (23/26 spaces)</li>
</ul>

<p>The residential segment continues to outperform, driven by strong demand in the downtown corridor properties <a class="citation" href="#">[3]</a>. Two commercial vacancies at Parkview Tower are in active negotiation with expected lease signing by end of month.</p>`,
    time: '14:33',
    suggestions: [
      'Show revenue by property',
      'Lease expiration timeline',
      'Compare to market averages',
    ],
  },
]

function ChatContent() {
  const searchParams = useSearchParams()
  const initialMessage = searchParams.get('message')
  const [messages, setMessages] = useState<MessageData[]>(
    initialMessage ? [] : demoMessages
  )
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Handle initial message from URL
  useEffect(() => {
    if (initialMessage) {
      handleSend(decodeURIComponent(initialMessage))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatTime = () => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`
  }

  const handleSend = async (text: string) => {
    const userMsg: MessageData = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      time: formatTime(),
    }
    setMessages((prev) => [...prev, userMsg])
    setIsStreaming(true)

    // Simulate API response - replace with your actual API call
    setTimeout(() => {
      const assistantMsg: MessageData = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `<p>I'll look into that for you. This is a placeholder response for: "${text}"</p><p>In production, this would connect to your property management backend API for real-time data retrieval and analysis.</p>`,
        time: formatTime(),
        suggestions: ['Tell me more', 'Show details', 'Export report'],
      }
      setMessages((prev) => [...prev, assistantMsg])
      setIsStreaming(false)
    }, 1500)
  }

  const handleRegenerate = (messageId: string) => {
    const messageIndex = messages.findIndex(m => m.id === messageId)
    if (messageIndex > 0) {
      const userMessage = messages[messageIndex - 1]
      if (userMessage.role === 'user') {
        // Remove the current assistant message and regenerate
        setMessages(prev => prev.slice(0, messageIndex))
        handleSend(userMessage.content)
      }
    }
  }

  return (
    <AppShell>
      <div className="flex-1 flex flex-col max-w-chat mx-auto w-full px-4 md:px-6">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-8 flex flex-col gap-8">
          {messages.map((msg) => (
            <Message
              key={msg.id}
              message={msg}
              onSuggestionClick={handleSend}
              onRegenerate={handleRegenerate}
            />
          ))}
          {isStreaming && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="sticky bottom-0 bg-[var(--bg-primary)] py-4 md:py-6 border-t border-[var(--border-color)] mt-auto">
          <ChatInput
            onSend={handleSend}
            placeholder="Ask a follow-up question..."
            isStreaming={isStreaming}
            onStopGeneration={() => setIsStreaming(false)}
          />
        </div>
      </div>
    </AppShell>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div />}>
      <ChatContent />
    </Suspense>
  )
}
