import React from 'react'

export default function SkeletonSearchPropertyCard() {
  return (
    <div className="bg-white rounded-[15px] border border-gray-200 overflow-hidden animate-pulse">              
      {/* Image Skeleton */}
      <div className="aspect-[368/280] bg-[#E5E7EB] rounded-[15px]" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Price */}
        <div className="h-6 bg-[#E5E7EB] rounded-[4px] w-1/3" />
        
        {/* Title */}
        <div className="h-5 bg-[#E5E7EB] rounded-[4px] w-3/4" />
        
        {/* Location */}
        <div className="h-4 bg-[#E5E7EB] rounded-[4px] w-full" />
        
        {/* Property Details */}
        <div className="flex items-center gap-4 mt-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#E5E7EB] rounded-[4px]" />
              <div className="h-4 bg-[#E5E7EB] rounded-[4px] w-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
