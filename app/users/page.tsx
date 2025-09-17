'use client'
import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { USERS } from '../../lib/api'
import type { User } from '../../types'
import Spinner from '../components/Spinner'
import ErrorBanner from '../components/ErrorBanner'
import Modal from '../components/Modal'
import { motion } from 'framer-motion'

export default function UsersPage(){
  const { data, loading, error } = useFetch<User[]>(USERS)
  const [selected, setSelected] = useState<User | null>(null)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>

      {loading && <Spinner />}
      {error && <ErrorBanner message={`Failed to load users. ${error}`} />}

      {data && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white card">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Company</th>
              </tr>
            </thead>
            <tbody>
              {data.map(user => (
                <tr key={user.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelected(user)}>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.company?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
            <div className="space-y-2">
              <div><strong>Email:</strong> {selected.email}</div>
              <div><strong>Phone:</strong> {selected.phone}</div>
              <div><strong>Website:</strong> {selected.website}</div>
              <div><strong>Company:</strong> {selected.company?.name}</div>
              <div><strong>Address:</strong> {selected.address?.street}, {selected.address?.city}</div>
            </div>
          </motion.div>
        )}
      </Modal>
    </div>
  )
}