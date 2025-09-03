'use client'

import React from 'react'

interface SkeletonLoaderProps {
  className?: string
  variant?: 'text' | 'image' | 'card' | 'avatar'
  lines?: number
  width?: string | number
  height?: string | number
}

export default function SkeletonLoader({
  className = '',
  variant = 'text',
  lines = 1,
  width = '100%',
  height = '1rem'
}: SkeletonLoaderProps) {
  const baseClasses = 'bg-gray-200 animate-pulse rounded'
  
  const variants = {
    text: `${baseClasses} h-4`,
    image: `${baseClasses} aspect-video`,
    card: `${baseClasses} h-48`,
    avatar: `${baseClasses} rounded-full w-12 h-12`
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${variants.text} ${index === lines - 1 ? 'w-3/4' : 'w-full'} ${
              index > 0 ? 'mt-2' : ''
            }`}
            style={{ width: typeof width === 'number' ? `${width}px` : width }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${variants[variant]} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
    />
  )
}
