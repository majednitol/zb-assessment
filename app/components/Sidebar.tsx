'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/use-mobile'

const menu = [
  { href: '/', label: 'Dashboard' },
  { href: '/posts', label: 'Posts' },
  { href: '/users', label: 'Users' },
]

export default function Sidebar() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    setOpen(!isMobile) // open by default on desktop, closed on mobile
    setInitialized(true)
  }, [isMobile])

  const toggleSidebar = () => setOpen(v => !v)

  if (!initialized) return null

  return (
    <>
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={toggleSidebar}
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: isMobile ? -300 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? -300 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed z-40 top-0 left-0 h-full w-64 bg-white border-r border-gray-100 flex flex-col ${
              isMobile ? 'shadow-lg' : 'relative'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-md bg-primary text-white flex items-center justify-center font-bold">
                  Z
                </div>
                <div className="font-semibold">Zettabyte</div>
              </div>
              {isMobile && (
                <button aria-label="Close sidebar" onClick={toggleSidebar}>
                  ✕
                </button>
              )}
            </div>

            {/* Menu */}
            <nav className="px-2 py-4 flex-1 space-y-1 overflow-y-auto">
              {menu.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (isMobile) toggleSidebar()
                  }}
                >
                  <motion.div
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="truncate">{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 text-xs text-gray-500">
              <div>© Zettabyte</div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile toggle button */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-primary text-white w-10 h-10 rounded-md flex items-center justify-center shadow-lg"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      )}
    </>
  )
}
