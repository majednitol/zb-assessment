'use client'
import React, { useState, useRef, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { POSTS } from '../../lib/api'
import type { Post } from '../../types'
import Card from '../components/Card'
import Spinner from '../components/Spinner'
import ErrorBanner from '../components/ErrorBanner'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PostsPage() {
  const { data, loading, error } = useFetch<Post[]>(POSTS)
  const [visibleCount, setVisibleCount] = useState(12)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const loaderRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!loaderRef.current || !data) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && visibleCount < data.length && !isLoadingMore) {
            setIsLoadingMore(true)
            setTimeout(() => {
              setVisibleCount(prev => Math.min(prev + 12, data.length))
              setIsLoadingMore(false)
            }, 500)
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    )

    observer.observe(loaderRef.current)
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [data, visibleCount, isLoadingMore])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-primary text-white rounded-md"
            onClick={() => setVisibleCount(12)}
          >
            Reload
          </button>
        </div>
      </div>

      {loading && <Spinner />}
      {error && <ErrorBanner message={`Failed to load posts. ${error}`} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data && (
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
                    <p className="text-sm text-gray-600">{post.body.slice(0, 120)}...</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Loader trigger */}
      <div ref={loaderRef} className="h-6" />

      {/* Loader for smooth delay */}
      {isLoadingMore && <div className="text-center py-4"><Spinner /></div>}
    </div>
  )
}
