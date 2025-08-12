import React from 'react'
import Image from 'next/image'
import { StaticImageData } from 'next/image'
import HouseCitiesIcon from '@/app/assets/icons/house-cities.svg'

interface CityCardProps {
  image: StaticImageData | string
  name: string
  listingCount: string
}

export default function CityCard({ image, name, listingCount }: CityCardProps) {
  return (
    <div className="flex flex-row gap-[16px] bg-white rounded-[15px] lg:p-[24px] p-[16px] border border-[#E7DCFF] lg:w-[365px] w-[325px]">
      <div className="w-[68px] h-[68px] rounded-[15px] overflow-hidden">
        <Image 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          width={68}
          height={68}
        />
      </div>
      <div className="flex flex-col gap-[6px]">
        <h3 className="text-[20px] leading-[32px] tracking-[-0.04em] font-semibold font-syne">
          {name}
        </h3>
        <div className="flex flex-row gap-[8px]">
          <HouseCitiesIcon />
          <p className="text-[18px] leading-[28px] font-light font-hanken text-[#686A79]">
            {listingCount} listings
          </p>
        </div>
      </div>
    </div>
  )
}