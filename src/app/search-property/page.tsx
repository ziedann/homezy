'use client'

import React from 'react'
import SearchForm from '../components/ui/SearchForm'
import SectionContainer from '../components/ui/SectionContainer'
import SectionHeader from '../components/ui/SectionHeader'
import CandleIcon from '@assets/icons/candle.svg'

export default function SearchPropertyPage() {
  return (
    <main className="min-h-screen bg-[#FBFAFF]">
      <SectionContainer>
        {/* Header Section */}
        <SectionHeader
          title="Search Properties"
          browseText=""
          showArrowIcon={false}
          className=""
        />
        
        {/* Search Form */}
        <div className="flex lg:flex-row flex-col gap-[16px] lg:gap-[24px]">
          <div className="flex-1">
            <SearchForm buttonText="Browse" />
          </div>
          <button type="button" className="md:flex lg:mt-[40px] lg:h-[96px] h-[58px]  lg:flex-col flex justify-center lg:px-[32px] lg:py:20px bg-[#E7DCFF] rounded-[15px] items-center gap-[12px] border border-[#191A23]">
            <CandleIcon className="w-5 h-5" />
            <span className='text-[16px] leading-[20px] font-semibold font-hanken'>More Filter</span>
          </button>
        </div>
        
        {/* Results Section */}
        <div className="mt-8">
          <h2 className="text-[24px] font-semibold leading-[32px] mb-6">
            Search Results
          </h2>
          <div className="text-gray-600">
            <p>Search results will appear here.</p>
          </div>
        </div>
      </SectionContainer>
    </main>
  )
}