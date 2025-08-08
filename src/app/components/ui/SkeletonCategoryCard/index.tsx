import React from 'react'

export default function SkeletonCategoryCard() {
  return (
    <div className="flex flex-col lg:gap-[16px] gap-[12px] lg:p-[24px] p-[16px] bg-white rounded-[10px] w-full animate-pulse">
      {/* Icon Skeleton */}
      <div className="w-[32px] h-[32px] rounded-[4px] bg-[#E5E7EB]" />

      {/* Content */}
      <div className="flex flex-col lg:gap-[12px] gap-[8px]">
        {/* Title */}
        <div className="h-[24px] w-[140px] bg-[#E5E7EB] rounded-[4px]" />

        {/* Property Count */}
        <div className="flex items-center gap-[8px]">
          <div className="h-[20px] w-[80px] bg-[#E5E7EB] rounded-[4px]" />
        </div>

        {/* View Button */}
        <div className="flex items-center gap-2">
          <div className="h-[20px] w-[40px] bg-[#E5E7EB] rounded-[4px]" />
          <div className="w-[16px] h-[16px] bg-[#E5E7EB] rounded-[4px]" />
        </div>
      </div>
    </div>
  )
}
