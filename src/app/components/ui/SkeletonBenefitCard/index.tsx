import React from 'react'

export default function SkeletonBenefitCard() {
  return (
    <div className="flex flex-col lg:gap-[24px] gap-[16px] lg:p-[32px] p-[24px] bg-white rounded-[10px] lg:w-[416px] w-[335px] animate-pulse">
      {/* Icon Skeleton */}
      <div className="w-[56px] h-[56px] rounded-[10px] bg-[#E5E7EB]" />

      {/* Content */}
      <div className="flex flex-col lg:gap-[16px] gap-[12px]">
        {/* Title */}
        <div className="h-[28px] w-[200px] bg-[#E5E7EB] rounded-[4px]" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-[20px] w-full bg-[#E5E7EB] rounded-[4px]" />
          <div className="h-[20px] w-[90%] bg-[#E5E7EB] rounded-[4px]" />
          <div className="h-[20px] w-[80%] bg-[#E5E7EB] rounded-[4px]" />
        </div>
      </div>
    </div>
  )
}
