'use client'

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Restore sidebar state
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved === 'true') setSidebarOpen(false)

    // Mobile: start collapsed
    if (window.innerWidth <= 768) setSidebarOpen(false)
  }, [])

  const toggleSidebar = () => {
    const next = !sidebarOpen
    setSidebarOpen(next)
    localStorage.setItem('sidebar-collapsed', String(!next))
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <main
        className={`flex-1 flex flex-col min-h-screen transition-[margin-left] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]`}
        style={{ marginLeft: sidebarOpen ? 280 : 0 }}
      >
        <Header sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
        {children}
      </main>
    </div>
  )
}
