import React from 'react'

export default function SkeletonTestimonialCard() {
  return (
    <div className="flex lg:flex-row flex-col bg-[#F7F2FF] border border-[#E7DCFF] lg:w-full w-[335px] animate-pulse">
      {/* Image */}
      <div className="lg:w-[300px] w-full lg:h-[380px] h-[260px] bg-[#E5E7EB]" />

      {/* Content */}
      <div className="flex justify-between flex-col lg:gap-[32px] gap-[24px] lg:w-[450px] w-full lg:p-[32px] p-[24px]">
        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-[20px] h-[20px] bg-[#E5E7EB] rounded-[4px]" />
          ))}
        </div>

        {/* Review Text */}
        <div className="flex-grow space-y-3">
          <div className="h-[20px] bg-[#E5E7EB] rounded-[4px] w-full" />
          <div className="h-[20px] bg-[#E5E7EB] rounded-[4px] w-[95%]" />
          <div className="h-[20px] bg-[#E5E7EB] rounded-[4px] w-[90%]" />
          <div className="h-[20px] bg-[#E5E7EB] rounded-[4px] w-[85%]" />
        </div>

        {/* Author Info */}
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-[8px]">
            <div className="h-[24px] w-[160px] bg-[#E5E7EB] rounded-[4px]" />
            <div className="h-[20px] w-[140px] bg-[#E5E7EB] rounded-[4px]" />
          </div>
          <div className="lg:w-[40px] w-[32px] lg:h-[40px] h-[32px] bg-[#E5E7EB] rounded-full" />
        </div>
      </div>
    </div>
  )
}
