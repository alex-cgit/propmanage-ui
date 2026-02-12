'use client'

import { Suspense } from 'react'
import ChatPage from '../page'

// Re-use the same chat page for /chat/[id] routes
export default function ChatByIdPage() {
  return (
    <Suspense fallback={<div />}>
      <ChatPage />
    </Suspense>
  )
}
