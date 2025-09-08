'use client'

import React from 'react'
import CandleIcon from '@assets/icons/candle.svg'

interface MoreFilterButtonProps {
  onClick: () => void
  filterCount?: number
}

export default function MoreFilterButton({ onClick, filterCount = 0 }: MoreFilterButtonProps) {
  return (
    <div className="relative w-full lg:w-auto">
      <button 
        type="button" 
        onClick={onClick}
        className="w-full lg:w-auto md:flex lg:mt-[40px] lg:h-[96px] h-[58px] lg:flex-col flex justify-center lg:px-[32px] px-[24px] lg:py:20px py-[16px] bg-[#E7DCFF] rounded-[15px] items-center gap-[12px] border border-[#191A23] hover:bg-[#DCC9FF] transition-colors"
      >
        <CandleIcon className="w-5 h-5" />
        <span className='text-[16px] leading-[20px] font-semibold font-hanken'>More Filter</span>
      </button>
      {filterCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-[#EF4444] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] shadow-lg border-2 border-white z-10">
          {filterCount > 99 ? '99+' : filterCount}
        </div>
      )}
    </div>
  )
}
