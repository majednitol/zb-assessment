'use client'
import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import { motion } from 'framer-motion'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import useFetch from '../hooks/useFetch'
import { POSTS, USERS } from '../lib/api'
import type { Post, User } from '../types'
import { useIsMobile } from '@/hooks/use-mobile'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DashboardPage() {
  const { data: posts } = useFetch<Post[]>(POSTS)
  const { data: users } = useFetch<User[]>(USERS)
  const isMobile = useIsMobile()

  const [chartColors, setChartColors] = useState<string[]>([])

  // Get CSS variables after component mounts
  useEffect(() => {
    const getCssVar = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    setChartColors([getCssVar('--primary'), getCssVar('--secondary')])
  }, [])

  if (chartColors.length === 0) return null

  const data = {
    labels: ['Posts', 'Users'],
    datasets: [
      {
        data: [posts?.length ?? 0, users?.length ?? 0],
        backgroundColor: chartColors,
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 10,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: !isMobile, // smaller aspect ratio on mobile
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: chartColors[1],
          font: { size: isMobile ? 12 : 14 },
        },
      },
    },
  }

  return (
    <div className="space-y-6 px-4 md:px-0">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
        <div>
          <h1 className="text-2xl font-bold">Welcome to Zettabyte Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Analytics and management</p>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${isMobile ? 'sm:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-4`}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        >
          <Card title="Posts">
            <div className="flex flex-col items-center justify-center h-full py-4">
              <div className="text-3xl font-bold">{posts?.length ?? 0}</div>
              <div className="text-xs text-gray-500 mt-1">Total posts</div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          <Card title="Users">
            <div className="flex flex-col items-center justify-center h-full py-4">
              <div className="text-3xl font-bold">{users?.length ?? 0}</div>
              <div className="text-xs text-gray-500 mt-1">Active users</div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="mt-4">
        <Card title="Activity">
          <div className={`h-48 flex items-center justify-center ${isMobile ? 'p-2' : ''}`}>
            <Doughnut data={data} options={options} />
          </div>
        </Card>
      </div>
    </div>
  )
}
