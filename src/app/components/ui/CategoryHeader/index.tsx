import React from 'react'
import ArrowDown from '@assets/icons/arrow-down.svg'

interface CategoryHeaderProps {
  title: string
  browseText: string
}

export default function CategoryHeader({ title, browseText }: CategoryHeaderProps) {
  return (
    <div className='flex flex-row justify-between items-center'>
      <h1 className='text-[40px] leading-[56px] tracking-[4%] font-bold font-syne'>
        {title}
      </h1>
      <div className='inline-flex items-center gap-[16px]'>
        <p className='text-[18px] leading-[22px] font-bold font-hanken'>
          {browseText}
        </p>
        <ArrowDown className='w-4 h-4' />
      </div>
    </div>
  )
}
