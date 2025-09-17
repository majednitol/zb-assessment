'use client'
import React from 'react'

export default function ErrorBanner({ message }: { message: string }){
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
      <strong>❌</strong> {message}
    </div>
  )
}