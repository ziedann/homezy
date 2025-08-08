import React from 'react'

export default function SkeletonCtaCard() {
  return (
    <div className="relative w-full bg-[#F7F2FF] rounded-[10px] lg:p-[64px] p-[24px] animate-pulse">
      {/* Pattern Background - Using lighter color */}
      <div className="absolute right-0 top-0 w-[40%] h-full bg-[#E7DCFF] opacity-30 rounded-r-[10px]" />

      <div className="relative flex lg:flex-row flex-col lg:items-center items-start lg:justify-between gap-[32px]">
        {/* Left Content */}
        <div className="flex flex-col lg:gap-[24px] gap-[16px] lg:max-w-[60%]">
          {/* Title */}
          <div className="space-y-3">
            <div className="h-[38px] bg-[#E5E7EB] rounded-[4px] w-[80%]" />
            <div className="h-[38px] bg-[#E5E7EB] rounded-[4px] w-[60%]" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-[20px] bg-[#E5E7EB] rounded-[4px] w-full" />
            <div className="h-[20px] bg-[#E5E7EB] rounded-[4px] w-[90%]" />
          </div>
        </div>

        {/* Right Content - Email Form */}
        <div className="lg:w-[384px] w-full">
          <div className="flex gap-[16px]">
            <div className="flex-grow h-[48px] bg-[#E5E7EB] rounded-[4px]" />
            <div className="w-[120px] h-[48px] bg-[#E5E7EB] rounded-[4px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
