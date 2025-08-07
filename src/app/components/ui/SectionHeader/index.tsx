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
    <div className={`flex lg:flex-row flex-col gap-[10px] lg:justify-between  ${className}`}>
      <h1 className='lg:text-[40px] text-[32px] lg:leading-[56px] leading-[40px] tracking-[-0.05em] font-bold font-syne'>
        {title}
      </h1>
      <div className='inline-flex items-center gap-[8px]'>
        <p className='text-[18px] leading-[22px] font-bold font-hanken'>
          {browseText}
        </p>
        {showArrowIcon && <ArrowRight className='w-[20px] h-[20px]' />}
      </div>
    </div>
  )
}