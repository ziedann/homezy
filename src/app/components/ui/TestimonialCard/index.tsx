import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Star from '@/app/assets/icons/star.svg'
import CompanyLogo from '@/app/assets/icons/company-logo.svg'

interface TestimonialCardProps {
  image: StaticImageData | string
  review: string
  name: string
  role: string
  rating: number
  showCompanyLogo?: boolean
}

export default function TestimonialCard({ 
  image, 
  review, 
  name, 
  role,
  rating,
  showCompanyLogo = true 
}: TestimonialCardProps) {
  return (
    <div className="flex lg:flex-row flex-col bg-[#F7F2FF] border border-[#E7DCFF] lg:w-full w-[335px]">
      {/* Image */}
      <div className="lg:w-[300px] w-full lg:h-[380px] h-[260px] overflow-hidden bg-[#FFE1F2]">
        <Image 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          width={300}
          height={380}
          priority
        />
      </div>

            {/* Content */}
      <div className="flex justify-between flex-col lg:min-h-[380px] min-h-[300px] lg:w-[450px] w-full lg:p-[32px] p-[24px]">
                 {/* Stars */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <Star 
                key={index} 
                className={`lg:w-6 w-5 h-auto ${index < rating ? 'text-[#FF7A00]' : 'text-[#D9D9D9]'}`}
              />
            ))}
          </div>

          {/* Review */}
          <div className="flex-grow mt-[10px]">
            <p className="lg:text-[18px] text-[16px] lg:leading-[26px] leading-[24px] font-light font-hanken text-[#686A79]">
              "{review}"
            </p>
          </div>

          {/* Author */}
          <div className="flex flex-row justify-between items-center mt-auto">
            <div className="flex flex-col gap-[2px]">
              <h3 className="lg:text-[24px] text-[22px] lg:leading-[32px] leading-[24px] lg:tracking-[-0.04em] tracking-[-0.05em] font-semibold font-syne text-secondary-dark-100">
                {name}
              </h3>
              <p className="text-[16px] leading-[26px] font-light font-hanken text-[#686A79]">
                {role}
              </p>
            </div>
            {showCompanyLogo && <CompanyLogo className="lg:w-[40px] w-[32px] lg:h-[40px] h-[32px]" />}
          </div>
      </div>
    </div>
  )
}