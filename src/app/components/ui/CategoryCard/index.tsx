import React from 'react'
import SendIcon from '@/app/assets/icons/send.svg'

interface CategoryCardProps {
  icon: React.ReactNode
  title: string
  listingCount: string
}

export default function CategoryCard({ icon, title, listingCount }: CategoryCardProps) {
  return (
    <div className='flex flex-row justify-between items-center bg-white rounded-[15px] lg:p-[24px] md:p-[20px] p-[16px] border border-[#E7DCFF] w-full'>
      <div className='flex flex-row gap-[16px] items-center'>
        <div className='w-[60px] h-[60px] bg-[#E7DCFF] rounded-[15px] flex items-center justify-center'>
          <div className='w-[32px] h-[32px] flex items-center justify-center'>
            {icon}
          </div>
        </div>
        <div className='flex flex-col lg:gap-[2px] gap-[1px]'>
          <h3 className='lg:text-[24px] md:text-[22px] text-[20px] lg:leading-[32px] md:leading-[30px] leading-[28px] tracking-[-0.04em] font-semibold font-syne'>
            {title}
          </h3>
          <p className='text-[18px] leading-[28px] font-light font-hanken text-[#686A79]'>
            {listingCount} listings
          </p>
        </div>
      </div>

      <div className='flex flex-row items-center gap-[8px]'>
        <p className='lg:text-[16px] text-[14px] lg:leading-[30px] leading-[24px] font-bold font-hanken text-[#191A23]'>
          View
        </p>
        <SendIcon className='lg:w-[20px] lg:h-[20px] w-[18px] h-[18px]' />
      </div>
    </div>
  )
}