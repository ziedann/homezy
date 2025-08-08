import React from 'react'

export default function SkeletonCityCard() {
  return (
    <div className="relative w-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative w-full lg:h-[280px] h-[220px] rounded-[10px] bg-[#E5E7EB]" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-[10px] lg:p-[20px] p-[16px]">
        <div className="flex flex-col lg:gap-[12px] gap-[8px]">
          {/* Title */}
          <div className="h-[24px] w-[140px] bg-[#E5E7EB] rounded-[4px]" />

          {/* Property Count */}
          <div className="flex items-center gap-[8px]">
            <div className="w-[16px] h-[16px] bg-[#E5E7EB] rounded-[4px]" />
            <div className="h-[20px] w-[100px] bg-[#E5E7EB] rounded-[4px]" />
          </div>

          {/* View Button */}
          <div className="flex items-center gap-2">
            <div className="h-[20px] w-[40px] bg-[#E5E7EB] rounded-[4px]" />
            <div className="w-[16px] h-[16px] bg-[#E5E7EB] rounded-[4px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
