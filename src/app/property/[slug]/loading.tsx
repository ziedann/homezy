import React from 'react'
import SectionContainer from '@/app/components/ui/SectionContainer'
import SkeletonLoader from '@/app/components/ui/SkeletonLoader'

export default function PropertyDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SectionContainer>
        {/* Breadcrumb skeleton */}
        <div className="mb-6">
          <SkeletonLoader width={200} height={20} />
        </div>

        {/* Image gallery skeleton */}
        <div className="mb-8">
          <div className="hidden md:flex gap-[32px] h-[500px] w-full max-w-[1160px] mx-auto">
            {/* Main image */}
            <SkeletonLoader variant="image" className="w-[763px] h-full rounded-[15px]" />
            {/* Side images */}
            <div className="w-[365px] h-full flex flex-col gap-[32px]">
              <SkeletonLoader variant="image" className="h-[234px] rounded-[15px]" />
              <SkeletonLoader variant="image" className="h-[234px] rounded-[15px]" />
            </div>
          </div>
          
          {/* Mobile layout */}
          <div className="md:hidden">
            <div className="flex gap-[8px] h-[169px] mb-[16px]">
              <SkeletonLoader variant="image" className="flex-[2] rounded-[10px]" />
              <div className="flex-1 flex flex-col gap-[8px]">
                <SkeletonLoader variant="image" className="flex-1 rounded-[10px]" />
                <SkeletonLoader variant="image" className="flex-1 rounded-[10px]" />
              </div>
            </div>
            <SkeletonLoader width="100%" height={48} className="rounded-[15px]" />
          </div>
        </div>

        {/* Property info skeleton */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            {/* Title and location */}
            <div className="mb-8">
              <SkeletonLoader variant="text" lines={2} className="mb-4" />
              <SkeletonLoader width="60%" height={20} />
            </div>

            {/* Features */}
            <div className="bg-[#F7F2FF] border border-[#E7DCFF] rounded-[15px] p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <SkeletonLoader width="80%" height={14} />
                    <SkeletonLoader width="60%" height={20} />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <SkeletonLoader width="40%" height={24} />
              <SkeletonLoader variant="text" lines={6} />
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-[#F3F2FF] rounded-[20px] p-6 border border-[#E5E4FF]">
              <SkeletonLoader width="30%" height={16} className="mb-2" />
              <SkeletonLoader width="60%" height={32} className="mb-6" />
              
              <div className="space-y-4">
                <SkeletonLoader width="70%" height={20} />
                <SkeletonLoader height={48} />
                <SkeletonLoader height={48} />
                <SkeletonLoader height={48} />
                <SkeletonLoader height={48} />
                <SkeletonLoader height={48} />
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
