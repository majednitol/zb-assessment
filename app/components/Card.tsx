'use client'
import React from 'react'

type CardProps = React.PropsWithChildren<{
  title?: string
  className?: string
}>

export default function Card({ title, children, className = '' }: CardProps){
  return (
    <div className={`card p-4 ${className}`}>
      {title && <div className="text-sm font-semibold mb-2">{title}</div>}
      <div>{children}</div>
    </div>
  )
}