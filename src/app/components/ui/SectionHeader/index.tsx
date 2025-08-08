import React from 'react'
import ArrowRight from '@/app/assets/icons/arrow-right.svg'

interface SectionHeaderProps {
  title: string
  browseText: string
  className?: string
  showArrowIcon?: boolean
}

export default function SectionHeader({ 
  title, 
  browseText, 
  showArrowIcon = true,
  className
}: SectionHeaderProps) {
  return (
    <div className={`flex lg:flex-row flex-col gap-[10px] lg:justify-between items-start lg:items-center ${className}`}>
      <h1 className='lg:text-[40px] md:text-[36px] text-[32px] lg:leading-[56px] md:leading-[48px] leading-[40px] tracking-[-0.05em] font-bold font-syne'>
        {title}
      </h1>
      <div className='inline-flex items-center gap-[8px] lg:mt-0 md:mt-2 mt-1'>
        <p className='lg:text-[18px] text-[16px] lg:leading-[22px] leading-[20px] font-bold font-hanken'>
          {browseText}
        </p>
        {showArrowIcon && <ArrowRight className='lg:w-[20px] lg:h-[20px] w-[18px] h-[18px]' />}
      </div>
    </div>
  )
}