import React from 'react'

export default function SkeletonCityCard() {
  return (
    <div className="relative lg:w-[416px] w-[335px] animate-pulse">
      {/* Image Skeleton */}
      <div className="relative w-full lg:h-[400px] h-[335px] rounded-[10px] bg-[#E5E7EB]" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-[10px] lg:p-[24px] p-[16px]">
        <div className="flex flex-col lg:gap-[16px] gap-[12px]">
          {/* Title */}
          <div className="h-[28px] w-[180px] bg-[#E5E7EB] rounded-[4px]" />

          {/* Property Count */}
          <div className="flex items-center gap-[8px]">
            <div className="w-[20px] h-[20px] bg-[#E5E7EB] rounded-[4px]" />
            <div className="h-[20px] w-[120px] bg-[#E5E7EB] rounded-[4px]" />
          </div>

          {/* View Button */}
          <div className="flex items-center gap-2">
            <div className="h-[20px] w-[40px] bg-[#E5E7EB] rounded-[4px]" />
            <div className="w-[20px] h-[20px] bg-[#E5E7EB] rounded-[4px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
