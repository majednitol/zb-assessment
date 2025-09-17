'use client'
import { useEffect, useState } from 'react'
export default function useFetch<T = any>(url: string | null){
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return
    let aborted = false
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetch(url, { signal: controller.signal })
      .then(async res => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        const json = await res.json()
        if (!aborted) setData(json)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        if (!aborted) setError(err.message || 'Failed to fetch')
      })
      .finally(() => { if (!aborted) setLoading(false) })

    return () => { aborted = true; controller.abort() }
  }, [url])

  return { data, loading, error }
}