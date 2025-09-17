'use client'
import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { POSTS } from '../../lib/api'
import type { Post } from '../../types'
import Card from '../components/Card'
import Spinner from '../components/Spinner'
import ErrorBanner from '../components/ErrorBanner'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

export default function PostsPage() {
  const [forceError, setForceError] = useState(false)

  const endpoint = forceError ? '/invalid-posts' : POSTS
  const { data, loading, error } = useFetch<Post[]>(endpoint)

  const isMobile = useIsMobile()
  const POSTS_BATCH = isMobile ? 6 : 12

  const [visibleCount, setVisibleCount] = useState(POSTS_BATCH)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-primary text-white rounded-md"
            onClick={() => setVisibleCount(POSTS_BATCH)}
          >
            Reload
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md"
            onClick={() => setForceError(true)}
          >
            Simulate Error
          </button>
        </div>
      </div>

      {loading && <Spinner />}
      {error && <ErrorBanner message={`Failed to load posts. ${error}`} />}

      {!error && data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="contents"
          >
            {data.slice(0, visibleCount).map(post => (
              <motion.div key={post.id} className="contents" whileHover={{ y: -4 }}>
                <Link href={`/posts/${post.id}`}>
                  <Card className="cursor-pointer h-full" title={post.title}>
                    <p className="text-sm text-gray-600">
                      {post.body.slice(0, 120)}...
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}
