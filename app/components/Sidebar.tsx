'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const menu = [
  { href: '/', label: 'Dashboard' },
  { href: '/posts', label: 'Posts' },
  { href: '/users', label: 'Users' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(true)

  return (
    <aside className="bg-white border-r border-gray-100">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-primary text-white flex items-center justify-center font-bold">
              Z
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="font-semibold">Zettabyte</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            aria-label="Toggle sidebar"
            onClick={() => setOpen(v => !v)}
            className="p-1"
          >
            <motion.div
              animate={{ rotate: open ? 0 : 180 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-sm"
            >
              ⇋
            </motion.div>
          </button>
        </div>

        {/* Menu */}
        <nav className="px-2 py-4 flex-1">
          {menu.map(item => (
            <Link key={item.href} href={item.href} className="block">
              <motion.div
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary hover:bg-gray-50"
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
      </div>
    </aside>
  )
}
