import React from 'react'
import SendIcon from '@/app/assets/icons/send.svg'

interface CategoryCardProps {
  icon: React.ReactNode
  title: string
  listingCount: string
}

export default function CategoryCard({ icon, title, listingCount }: CategoryCardProps) {
  return (
    <div className='flex flex-row justify-between bg-white rounded-[15px] p-[24px] border border-[#E7DCFF] w-[365px]'>
      <div className='flex flex-row gap-[16px]'>
        <div className='p-[14px] bg-[#E7DCFF] rounded-[15px] flex items-center justify-center'>
          {icon}
        </div>
        <div className='flex flex-col gap-[2px]'>
          <h3 className='text-[24px] leading-[32px] tracking-[-0.04em] font-semibold font-syne'>
            {title}
          </h3>
          <p className='text-[18px] leading-[26px] font-light font-hanken text-[#686A79]'>
            {listingCount} listings
          </p>
        </div>
      </div>

      <div className='flex flex-row items-center gap-[8px]'>
        <p className='text-[16px] leading-[30px] font-bold font-hanken text-[#191A23]'>
          View
        </p>
        <SendIcon className='w-[20px] h-[20px]' />
      </div>
    </div>
  )
}