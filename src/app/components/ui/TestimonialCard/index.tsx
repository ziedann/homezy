import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Star from '@/app/assets/icons/star.svg'
import CompanyLogo from '@/app/assets/icons/company-logo.svg'

interface TestimonialCardProps {
  image: StaticImageData
  review: string
  name: string
  role: string
  showCompanyLogo?: boolean
}

export default function TestimonialCard({ 
  image, 
  review, 
  name, 
  role,
  showCompanyLogo = true 
}: TestimonialCardProps) {
  return (
    <div className="flex flex-row items-center bg-[#F7F2FF] border border-[#E7DCFF]">
      {/* Image */}
      <div className="w-[300px] h-[380px] overflow-hidden bg-[#FFE1F2]">
        <Image 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[32px] max-w-[368px] m-[32px]">
        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="text-[#FF7A00]" />
          ))}
        </div>

        {/* Review */}
        <p className="text-[18px] h-[168px] leading-[26px] font-light font-hanken text-[#686A79]">
          "{review}"
        </p>

        {/* Author */}
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-[2px]">
            <h3 className="text-[24px] leading-[32px] tracking-[-0.04em] font-semibold font-syne">
              {name}
            </h3>
            <p className="text-[16px] leading-[26px] font-light font-hanken text-[#686A79]">
              {role}
            </p>
          </div>
          {showCompanyLogo && <CompanyLogo className="w-[40px] h-[40px]" />}
        </div>
      </div>
    </div>
  )
}