'use client'

import React, { useState } from 'react'
import SearchForm from '../components/ui/SearchForm'
import SectionContainer from '../components/ui/SectionContainer'
import SectionHeader from '../components/ui/SectionHeader'
import FilterModal, { FilterCriteria } from '../components/ui/FilterModal'
import CandleIcon from '@assets/icons/candle.svg'
import dynamic from 'next/dynamic'

const SearchMap = dynamic(() => import('./SearchMap'), { ssr: false })
const SearchResults = dynamic(() => import('./SearchResults'), { ssr: false })

export default function SearchPropertyPage() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [currentFilter, setCurrentFilter] = useState<FilterCriteria | null>(null)

  const handleApplyFilter = (criteria: FilterCriteria) => {
    setCurrentFilter(criteria)
  }

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
          <div className="relative w-full lg:w-auto">
            <button 
              type="button" 
              onClick={() => setIsFilterModalOpen(true)}
              className="w-full lg:w-auto md:flex lg:mt-[40px] lg:h-[96px] h-[58px] lg:flex-col flex justify-center lg:px-[32px] px-[24px] lg:py:20px py-[16px] bg-[#E7DCFF] rounded-[15px] items-center gap-[12px] border border-[#191A23] hover:bg-[#DCC9FF] transition-colors"
            >
              <CandleIcon className="w-5 h-5" />
              <span className='text-[16px] leading-[20px] font-semibold font-hanken'>More Filter</span>
            </button>
            
            {/* Filter Modal positioned relative to button */}
            <FilterModal 
              isOpen={isFilterModalOpen} 
              onClose={() => setIsFilterModalOpen(false)}
              onApplyFilter={handleApplyFilter}
            />
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-8">
          <SearchMap hideZoomControls={isFilterModalOpen} />
        </div>

        {/* Search Results Section */}
        <div className="mt-12">
          <SearchResults filterCriteria={currentFilter} />
        </div>
      </SectionContainer>
    </main>
  )
}