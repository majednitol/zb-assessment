import './globals.css'
import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Zettabyte Dashboard',
  description: 'A clean Next.js dashboard example',
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-6 overflow-auto">
              <div className="mx-auto container-max">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}