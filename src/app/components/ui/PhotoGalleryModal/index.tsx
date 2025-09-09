'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// Import property images
import DetailImage1 from '@assets/images/detail-image-1.png'
import DetailImage2 from '@assets/images/detail-image-2.png'
import DetailImage3 from '@assets/images/detail-image-3.png'
import FeaturedListing1 from '@assets/images/featured-listing-1.png'
import FeaturedListing2 from '@assets/images/featured-listing-2.png'
import FeaturedListing3 from '@assets/images/featured-listing-3.png'

interface PhotoGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  propertyTitle: string
  propertyAddress: string
  propertyPrice: string
  initialImageIndex?: number
}

const propertyImages = [
  {
    src: DetailImage1,
    alt: 'Exterior view',
    description: 'View from Outside'
  },
  {
    src: DetailImage2,
    alt: 'Interior view',
    description: 'Living Room'
  },
  {
    src: DetailImage3,
    alt: 'Kitchen view',
    description: 'Modern Kitchen'
  },
  {
    src: FeaturedListing1,
    alt: 'Bedroom view',
    description: 'Master Bedroom'
  },
  {
    src: FeaturedListing2,
    alt: 'Bathroom view',
    description: 'Master Bathroom'
  },
  {
    src: FeaturedListing3,
    alt: 'Garden view',
    description: 'Backyard Garden'
  }
]

export default function PhotoGalleryModal({
  isOpen,
  onClose,
  propertyTitle,
  propertyAddress,
  propertyPrice,
  initialImageIndex = 0
}: PhotoGalleryModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex)

  // Reset to initial index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(initialImageIndex)
    }
  }, [isOpen, initialImageIndex])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          event.preventDefault()
          goToPreviousImage()
          break
        case 'ArrowRight':
          event.preventDefault()
          goToNextImage()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentImageIndex])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? propertyImages.length - 1 : prev - 1
    )
  }

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === propertyImages.length - 1 ? 0 : prev + 1
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  if (!isOpen) return null

  const currentImage = propertyImages[currentImageIndex]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full h-full max-w-[98vw] sm:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw] max-h-[95vh] sm:max-h-[90vh] mx-auto my-auto p-1 sm:p-4 flex flex-col">
        {/* Header - Minimal, just close button */}
        <div className="flex justify-end mb-1 sm:mb-2">
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Main Content Area: Image + Navigation Buttons */}
        <div className="flex-1 flex items-center justify-center gap-6 sm:gap-8 lg:gap-12">
          {/* Left Navigation Button - Desktop only */}
          <button
            onClick={goToPreviousImage}
            className="hidden sm:flex p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full transition-colors shadow-lg flex-shrink-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Image Container - Responsive sizing */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden h-full w-full sm:flex-1">
            {/* Main Image */}
            <div className="relative w-full h-full">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-cover"
                priority
              />
              
              {/* Image Description Overlay - Full Width Bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-3">
                <p className="text-white text-sm sm:text-base font-medium">
                  {currentImage.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Navigation Button - Desktop only */}
          <button
            onClick={goToNextImage}
            className="hidden sm:flex p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full transition-colors shadow-lg flex-shrink-0"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Gallery - Centered */}
        <div className="mt-6 pt-6 sm:mt-8 lg:pt-6 flex justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 px-2 sm:px-0">
          {propertyImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                index === currentImageIndex 
                  ? 'ring-2 ring-white scale-105 shadow-lg' 
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
