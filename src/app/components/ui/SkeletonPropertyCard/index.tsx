import React from 'react'

export default function SkeletonPropertyCard() {
  return (
    <div className="relative lg:w-[416px] w-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative w-full lg:h-[400px] h-[335px] rounded-[10px] bg-[#E5E7EB]" />

      {/* Featured Tag Skeleton */}
      <div className="absolute top-[24px] left-[24px] h-[26px] w-[80px] bg-[#E5E7EB] rounded-[100px]" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-[10px] lg:p-[24px] p-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col lg:gap-[24px] gap-[16px]">
          {/* Price and Type */}
          <div className="flex items-center justify-between">
            <div className="h-[26px] w-[140px] bg-[#E5E7EB] rounded-[4px]" />
            <div className="h-[22px] w-[90px] bg-[#E5E7EB] rounded-[4px]" />
          </div>

          {/* Title */}
          <div className="h-[28px] w-[280px] bg-[#E5E7EB] rounded-[4px]" />

          {/* Location */}
          <div className="h-[22px] w-[200px] bg-[#E5E7EB] rounded-[4px]" />

          {/* Specs */}
          <div className="flex items-center justify-between">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-[8px]">
                <div className="w-[20px] h-[20px] bg-[#E5E7EB] rounded-[4px]" />
                <div className="h-[22px] w-[60px] bg-[#E5E7EB] rounded-[4px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
