import React from 'react'
import ArrowDown from '@/app/assets/icons/arrow-down.svg'

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
    <div className={`flex flex-row justify-between items-center ${className}`}>
      <h1 className='text-[40px] leading-[56px] tracking-[4%] font-bold font-syne'>
        {title}
      </h1>
      <div className='inline-flex items-center gap-[16px]'>
        <p className='text-[18px] leading-[22px] font-bold font-hanken'>
          {browseText}
        </p>
        {showArrowIcon && <ArrowDown className='w-4 h-4' />}
      </div>
    </div>
  )
}