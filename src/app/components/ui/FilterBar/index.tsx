'use client'

import React from 'react'
import FilterDropdown from '../FilterDropdown'
import LocationIcon from '@assets/icons/location.svg'
import DollarIcon from '@assets/icons/dollar-square.svg'
import HouseIcon from '@assets/icons/house.svg'

interface FilterBarProps {
  onFiltersChange: (filters: {
    location: { value: string; label: string }
    price: { value: string; label: string }
    type: { value: string; label: string }
  }) => void
  onBrowseClick: () => void
  initialFilters?: {
    location: { value: string; label: string }
    price: { value: string; label: string }
    type: { value: string; label: string }
  }
}

export default function FilterBar({ onFiltersChange, onBrowseClick, initialFilters }: FilterBarProps) {
  const [filters, setFilters] = React.useState(initialFilters || {
    location: { value: 'california', label: 'California, US' },
    price: { value: '500-1000', label: '$500-1000' },
    type: { value: 'apartment', label: 'Apartment' }
  })

  // Update filters when initialFilters change
  React.useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters)
    }
  }, [initialFilters])

  const locationOptions = [
    { value: 'all', label: 'All' },
    { value: 'california', label: 'California, US' },
    { value: 'london', label: 'London, UK' },
    { value: 'milan', label: 'Milan, Italia' },
    { value: 'barcelona', label: 'Barcelona, Spain' }
  ]

  const priceOptions = [
    { value: 'all', label: 'All' },
    { value: '500-1000', label: '$500-1000' },
    { value: '1000-1500', label: '$1000-1500' },
    { value: '1500-2500', label: '$1500-2500' },
    { value: '2500-4000', label: '$2500-4000' },
    { value: '4000-6000', label: '$4000-6000' },
    { value: '6000+', label: '$6000+' }
  ]

  const typeOptions = [
    { value: 'all', label: 'All' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'studio', label: 'Studio' },
    { value: 'loft', label: 'Loft' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'realty', label: 'Realty' }
  ]

  const handleLocationChange = (value: string, label: string) => {
    const newFilters = { ...filters, location: { value, label } }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handlePriceChange = (value: string, label: string) => {
    const newFilters = { ...filters, price: { value, label } }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleTypeChange = (value: string, label: string) => {
    const newFilters = { ...filters, type: { value, label } }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  return (
    <div className='relative z-30 w-full border border-[#191A23] rounded-[15px] p-[18px] bg-white flex-col lg:flex-row mt-[32px] md:mt-[40px] lg:shadow-sm shadow-none gap-[10px]'>
      <div className='flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:items-center gap-[32px] md:gap-[24px]'>
        <FilterDropdown
          icon={<LocationIcon />}
          label="Location"
          value={filters.location.value}
          options={locationOptions}
          onValueChange={handleLocationChange}
          className="md:col-span-1"
        />
        <FilterDropdown
          icon={<DollarIcon />}
          label="Price"
          value={filters.price.value}
          options={priceOptions}
          onValueChange={handlePriceChange}
          className="md:col-span-1"
        />
        <FilterDropdown
          icon={<HouseIcon />}
          label="Type of Property"
          value={filters.type.value}
          options={typeOptions}
          onValueChange={handleTypeChange}
          className="md:col-span-1"
        />
        <button 
          onClick={onBrowseClick}
          className="w-full md:w-auto lg:w-[120px] h-[60px] rounded-[15px] font-hanken text-[16px] font-semibold transition-colors flex items-center justify-center mt-4 md:mt-0 lg:mt-0 text-white bg-[#191A23] hover:bg-[#2A2B35] cursor-pointer"
        >
          Browse
        </button>
      </div>
    </div>
  )
}
