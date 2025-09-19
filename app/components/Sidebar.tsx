'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  LayoutDashboard,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
} from 'lucide-react'

const menu = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/posts', label: 'Posts', icon: FileText },
  { href: '/users', label: 'Users', icon: Users },
]

export default function Sidebar() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)       // open for mobile (overlay)
  const [collapsed, setCollapsed] = useState(false) // collapsed for desktop
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    setOpen(!isMobile) // open by default on desktop, closed on mobile
    setInitialized(true)
  }, [isMobile])

  const toggleSidebar = () => setOpen(v => !v)
  const toggleCollapse = () => setCollapsed(v => !v)

  if (!initialized) return null

  return (
    <>
      {/* Mobile overlay */}
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
            className={`fixed z-40 top-0 left-0 h-full bg-white border-r border-gray-100 flex flex-col ${
              isMobile ? 'w-64 shadow-lg' : collapsed ? 'w-16' : 'w-64'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-3 border-b border-gray-100">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-9 h-9 rounded-md bg-primary text-white flex items-center justify-center font-bold">
                    Z
                  </div>
                  <div className="font-semibold">Zettabyte</div>
                </motion.div>
              )}

              {isMobile ? (
                <button aria-label="Close sidebar" onClick={toggleSidebar}>
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              ) : (
                <button
                  aria-label="Collapse sidebar"
                  onClick={toggleCollapse}
                  className="text-gray-500 hover:text-black"
                >
                  {collapsed ? (
                    <ChevronRight className="w-5 h-5" />
                  ) : (
                    <ChevronLeft className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>

            {/* Menu */}
            {!collapsed && (
              <nav className="px-2 py-4 flex-1 space-y-1 overflow-y-auto">
                {menu.map(item => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        if (isMobile) toggleSidebar()
                      }}
                    >
                      <motion.div
                        whileHover={{ x: 6 }}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <Icon className="w-5 h-5 text-gray-500" />
                        <span className="truncate">{item.label}</span>
                      </motion.div>
                    </Link>
                  )
                })}
              </nav>
            )}

            {/* Footer */}
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 text-xs text-gray-500"
              >
                © Zettabyte
              </motion.div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile toggle button */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-primary text-white w-10 h-10 rounded-md flex items-center justify-center shadow-lg"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </>
  )
}
