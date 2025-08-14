import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Sparkles from '@assets/icons/sparkles.svg'
import Bed from '@assets/icons/bed.svg'
import Bath from '@assets/icons/bath.svg'
import Area from '@assets/icons/surface-area.svg'

interface PropertyCardProps {
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  image: string | StaticImageData;
  isFeatured?: boolean;
  isMonthly?: boolean;
  layoutMode?: 'grid' | 'list';
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  price,
  title,
  location,
  beds,
  baths,
  area,
  image,
  isFeatured = false,
  isMonthly = false,
  layoutMode = 'grid',
}) => {
  if (layoutMode === 'list') {
    // Row/List Layout
    return (
      <div className="relative w-full rounded-[15px] overflow-hidden bg-white border border-[#E7DCFF]">
        <div className="flex items-center p-4 lg:p-6 gap-4 lg:gap-6">
          {/* Image Section - Square */}
          <div className="relative w-[120px] h-[120px] lg:w-[160px] lg:h-[160px] flex-shrink-0 rounded-[12px] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 120px, 160px"
            />
            {isFeatured && (
              <div className="absolute top-2 right-2 lg:top-3 lg:right-3 flex flex-row items-center gap-[2px] bg-[#191A23] rounded-[6px] lg:rounded-[8px] px-2 py-1 lg:px-3 lg:py-2">
                <Sparkles className="w-[12px] h-[12px] lg:w-[16px] lg:h-[16px]" />
                <p className='text-[10px] leading-[14px] lg:text-[14px] lg:leading-[20px] font-light font-hanken text-white'>
                  FEATURED
                </p>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col gap-3 lg:gap-4">
            {/* Price Bar */}
            <div className="flex items-center px-3 lg:px-0">
              <div className="flex items-end gap-[4px]">
                <span className="text-[18px] leading-[24px] lg:text-[28px] lg:leading-[36px] tracking-[-0.02em] font-semibold font-syne text-[#191A23]">
                  {price}
                </span>
                {isMonthly && (
                  <span className="text-[14px] leading-[20px] lg:text-[18px] lg:leading-[24px] font-regular font-hanken text-[#686A79]">
                    /month
                  </span>
                )}
              </div>
            </div>

            {/* Title Bar */}
            <div className="flex items-center px-3 lg:px-0">
              <h3 className="text-[16px] leading-[20px] lg:text-[24px] lg:leading-[32px] tracking-[-0.02em] font-semibold font-syne text-[#191A23] truncate">
                {title}
              </h3>
            </div>

            {/* Location Bar */}
            <div className="flex items-center px-3 lg:px-0">
              <p className="text-[14px] leading-[18px] lg:text-[16px] lg:leading-[24px] font-regular font-hanken text-[#686A79] truncate">
                {location}
              </p>
            </div>

            {/* Property Details Bar */}
            <div className="flex items-center px-3 lg:px-0">
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="flex items-center gap-[4px] lg:gap-[6px]">
                  <Bed className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className='font-medium font-hanken text-[12px] leading-[16px] lg:text-[14px] lg:leading-[20px] text-[#686A79]'>
                    {beds} Beds
                  </span>
                </div>
                <div className="flex items-center gap-[4px] lg:gap-[6px]">
                  <Bath className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className='font-medium font-hanken text-[12px] leading-[16px] lg:text-[14px] lg:leading-[20px] text-[#686A79]'>
                    {baths} Baths
                  </span>
                </div>
                <div className="flex items-center gap-[4px] lg:gap-[6px]">
                  <Area className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className='font-medium font-hanken text-[12px] leading-[16px] lg:text-[14px] lg:leading-[20px] text-[#686A79]'>
                    {area}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid Layout (Original)
  return (
    <div className="relative lg:w-[368px] w-full rounded-[15px] overflow-hidden">
      <div className="relative w-full">
        <div className="aspect-[368/280] w-full relative rounded-[15px] border border-[#E7DCFF] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 368px) 100vw, 368px"
          />
        </div>

        <div className="relative bg-white rounded-[24px] -mt-6 mx-4">
          {isFeatured && (
            <div className="absolute -top-[10px] right-[30px] flex flex-row items-center gap-[4px] bg-[#191A23] rounded-[8px] w-[113px] h-[32px] justify-center">
              <Sparkles className="w-[16px] h-[16px]" />
              <p className='text-[14px] leading-[24px] font-light font-hanken text-white'>
                FEATURED
              </p>
            </div>
          )}

          {/* Property Info */}
          <div className="p-[24px] flex flex-col gap-4 border border-[#E7DCFF] rounded-[15px] bg-white mt-[-70px]">
            <div className='flex flex-col gap-[4px]'>
              <div className="flex items-end gap-[4px]">
                <h2 className="lg:text-[32px] text-[24px] lg:leading-[40px] leading-[32px] tracking-[-0.04em] font-semibold font-syne">
                  {price}
                </h2>
                {isMonthly && (
                  <span className="text-[18px] leading-[180%] font-regular font-hanken text-[#686A79]">
                    /month
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="lg:text-[24px] text-[20px] lg:leading-[32px] leading-[28px] tracking-[-0.04em] font-semibold font-syne">
                {title}
              </h3>
            </div>

            {/* Location */}
            <p className="text-[16px] leading-[26px] font-regular font-hanken text-[#686A79]">
              {location}
            </p>

            <div className='w-full h-[1px] bg-[#F7F2FF]'></div>

            {/* Property Details */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <Bed className="w-5 h-5" />
                <p className='font-medium font-hanken text-[14px] leading-[20px] text-[#686A79]'>
                  {beds} Beds
                </p>
              </div>
              <div className="flex items-center gap-[6px]">
                <Bath className="w-5 h-5" />
                <p className='font-medium font-hanken text-[14px] leading-[20px] text-[#686A79]'>
                  {baths} Baths
                </p>
              </div>
              <div className="flex items-center gap-[6px]">
                <Area className="w-5 h-5" />
                <p className='font-medium font-hanken text-[14px] leading-[20px] text-[#686A79]'>
                  {area}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
