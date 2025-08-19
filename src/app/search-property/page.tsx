'use client'

import React, { useState } from 'react'
import SearchForm from '../components/ui/SearchForm'
import SectionContainer from '../components/ui/SectionContainer'
import SectionHeader from '../components/ui/SectionHeader'
import FilterModal from '../components/ui/FilterModal'
import MoreFilterButton from '../components/ui/MoreFilterButton'
import { FilterCriteria } from '../types/search-property'
import dynamic from 'next/dynamic'

const SearchMap = dynamic(() => import('../components/ui/search-property/SearchMap'), { ssr: false })
const SearchResults = dynamic(() => import('../components/ui/search-property/SearchResults'), { ssr: false })

export default function SearchPropertyPage() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [currentFilter, setCurrentFilter] = useState<FilterCriteria | null>(null)

  const handleApplyFilter = (criteria: FilterCriteria) => {
    setCurrentFilter(criteria)
  }

  return (
    <main className="min-h-screen bg-gray-50">
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
            <MoreFilterButton onClick={() => setIsFilterModalOpen(true)} />
            
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