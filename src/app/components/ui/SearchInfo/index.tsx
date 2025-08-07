import React from 'react'

interface SearchInfoProps {
  icon: React.ReactNode
  label: string
  value: string
  className?: string
}

export default function SearchInfo({ icon, label, value, className = '' }: SearchInfoProps) {
  return (
    <div className={`flex flex-row gap-[12px] items-center ${className}`}>
      <div className='flex items-center justify-center w-[40px] h-[40px] rounded-[15px] bg-[#E7DCFF]'>
        {icon}
      </div>
      <div>
        <p className='font-hanken text-[14px] text-[#686A79] font-light leading-[24px]'>
          {label}
        </p>
        <p className='font-hanken text-[16px] leading-[20px] font-semibold'>
          {value}
        </p>
      </div>
    </div>
  )
}