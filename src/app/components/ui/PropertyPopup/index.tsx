'use client'

import React from 'react'
import Image from 'next/image'
import { Property, PopupPosition } from '@/app/types/search-property'
import Bed from '@assets/icons/bed.svg'
import Bath from '@assets/icons/bath.svg'
import Area from '@assets/icons/surface-area.svg'

interface PropertyPopupProps {
  property: Property
  popupPosition: PopupPosition | null
  onClose: () => void
}

export default function PropertyPopup({ property, popupPosition, onClose }: PropertyPopupProps) {
  return (
    <div 
      className="absolute z-[45] pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={popupPosition ? {
        left: popupPosition.x,
        top: popupPosition.y,
        transform: 'translate(-50%, 0)'
      } : {}}
    >
      <div className="relative w-[280px] md:w-[320px] bg-white rounded-[16px] shadow-lg border border-[#E7DCFF] overflow-hidden">
        <button
          aria-label="Close"
          onClick={onClose}
          className="pointer-events-auto absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#191A23] bg-white text-[14px] font-hanken hover:bg-gray-50"
        >
          ×
        </button>
        <div className="w-full h-[150px] bg-[#F2F2F2] flex items-center justify-center text-secondary-dark-80 overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            width={320}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="text-[14px] text-secondary-dark-80">
            {property.price}{property.isMonthly ? '/month' : ''}
          </div>
          <div className="text-[16px] font-semibold">{property.title}</div>
          <div className="text-[12px] text-secondary-dark-60 mt-1">{property.location}</div>
          <div className="flex items-center gap-3 mt-3 text-[12px] text-secondary-dark-80">
            <span className='flex items-center gap-[6px]'><Bed className="w-4 h-4"/> {property.beds} Beds</span>
            <span className='flex items-center gap-[6px]'><Bath className="w-4 h-4"/> {property.baths} Baths</span>
            <span className='flex items-center gap-[6px]'><Area className="w-4 h-4"/> {property.area}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
