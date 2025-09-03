'use client'

import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'

interface OptimizedImageProps {
  src: string | StaticImageData
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    if (onLoad) onLoad()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    if (onError) onError()
  }

  // Generate a simple blur placeholder if none provided
  const generateBlurDataURL = () => {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZTVlN2ViIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+Cjwvc3ZnPg=='
  }

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    )
  }

  const imageProps = {
    src,
    alt,
    quality,
    onLoad: handleLoad,
    onError: handleError,
    className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    priority,
    placeholder: placeholder === 'blur' ? 'blur' as const : 'empty' as const,
    blurDataURL: blurDataURL || (placeholder === 'blur' ? generateBlurDataURL() : undefined),
    sizes,
    loading: priority ? 'eager' : loading,
    ...props
  }

  if (fill) {
    return (
      <div className="relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
        )}
        <Image
          {...imageProps}
          fill
        />
      </div>
    )
  }

  return (
    <div className="relative inline-block">
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded z-10"
          style={{ width, height }}
        />
      )}
      <Image
        {...imageProps}
        width={width}
        height={height}
      />
    </div>
  )
}
