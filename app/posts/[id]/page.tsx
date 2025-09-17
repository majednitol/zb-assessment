'use client'
import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import useFetch from '../../../hooks/useFetch'
import { POSTS } from '../../../lib/api'
import { motion } from 'framer-motion'
import Spinner from '../../components/Spinner'
import ErrorBanner from '../../components/ErrorBanner'

export default function PostPageClient() {
  const { id } = useParams()   // <-- dynamic param
  const router = useRouter()
  const { data, loading, error } = useFetch(`${POSTS}/${id}`)

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => router.back()} className="text-sm text-primary">← Back</button>
      </div>

      {loading && <Spinner />}
      {error && <ErrorBanner message={`Failed to load post. ${error}`} />}

      {data && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
          <div className="card p-6">
            <h1 className="text-xl font-bold mb-2">{data.title}</h1>
            <p className="text-gray-700">{data.body}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
