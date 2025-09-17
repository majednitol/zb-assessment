'use client'
import React from 'react'

export default function Navbar(){
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center bg-primary text-white font-bold">ZB</div>
          <div>
            <div className="text-lg font-semibold text-secondary">Zettabyte</div>
            <div className="text-xs text-gray-500">Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 hidden md:block">Howdy, Admin</div>
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">👤</div>
        </div>
      </div>
    </header>
  )
}