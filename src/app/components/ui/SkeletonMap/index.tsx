import React from 'react'

export default function SkeletonMap() {
  return (
    <div className="relative w-full h-[400px] rounded-[16px] overflow-hidden border border-[#191A23] bg-white animate-pulse">
      {/* Map Background */}
      <div className="w-full h-full bg-[#E5E7EB] flex items-center justify-center">
        <div className="text-center">
          {/* Map Icon */}
          <div className="w-16 h-16 bg-[#D1D5DB] rounded-full mx-auto mb-4" />
          
          {/* Map Text */}
          <div className="h-4 bg-[#D1D5DB] rounded-[4px] w-40 mx-auto" />
          
          {/* Map Grid Lines */}
          <div className="mt-6 space-y-2">
            <div className="h-1 bg-[#D1D5DB] rounded-[4px] w-full" />
            <div className="h-1 bg-[#D1D5DB] rounded-[4px] w-3/4 mx-auto" />
            <div className="h-1 bg-[#D1D5DB] rounded-[4px] w-1/2 mx-auto" />
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#191A23] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#191A23] font-medium text-sm">Updating map...</span>
        </div>
      </div>
    </div>
  )
}
