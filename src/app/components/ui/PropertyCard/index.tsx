import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Sparkles from '@/app/assets/icons/sparkles.svg'
import Bed from '@/app/assets/icons/bed.svg'
import Bath from '@/app/assets/icons/bath.svg'
import Area from '@/app/assets/icons/surface-area.svg'

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
}) => {
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
              <p className='text-[14px] leading-[24px] font-medium font-hanken text-white'>
                FEATURED
              </p>
            </div>
          )}

          {/* Property Info */}
          <div className="p-6 flex flex-col gap-4 border border-[#E7DCFF] rounded-[15px] bg-white mt-[-70px]">
            <div className='flex flex-col gap-[4px]'>
              <div className="flex items-end gap-[4px]">
                <h2 className="lg:text-[32px] text-[24px] lg:leading-[40px] leading-[32px] tracking-[-0.03em] font-semibold font-hanken">
                  {price}
                </h2>
                {isMonthly && (
                  <span className="text-[18px] leading-[180%] font-regular font-hanken text-[#686A79]">
                    /month
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="lg:text-[24px] text-[20px] lg:leading-[32px] leading-[28px] tracking-[-0.03em] font-semibold font-syne">
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