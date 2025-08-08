import React from 'react'

export default function SkeletonAgentCard() {
  return (
    <div className="flex flex-col lg:gap-[16px] gap-[12px] lg:p-[24px] p-[16px] bg-white rounded-[10px] w-full animate-pulse">
      {/* Image */}
      <div className="w-[80px] h-[80px] rounded-full bg-[#E5E7EB]" />

      {/* Content */}
      <div className="flex flex-col lg:gap-[12px] gap-[8px]">
        {/* Name */}
        <div className="h-[24px] w-[140px] bg-[#E5E7EB] rounded-[4px]" />

        {/* Role */}
        <div className="h-[20px] w-[120px] bg-[#E5E7EB] rounded-[4px]" />

        {/* Social Icons */}
        <div className="flex items-center gap-[16px] mt-[8px]">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-[24px] h-[24px] bg-[#E5E7EB] rounded-[4px]" />
          ))}
        </div>
      </div>
    </div>
  )
}
