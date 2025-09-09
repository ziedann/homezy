'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import LocationIcon from '@assets/icons/location.svg'
import DollarIcon from '@assets/icons/dollar-square.svg'
import HouseIcon from '@assets/icons/house.svg'
import FilterDropdown from '@/app/components/ui/FilterDropdown'
import ButtonText from '@/app/components/ui/ButtonText'

interface SearchFormProps {
  buttonText?: string
  onSearch?: () => void
}

interface FilterState {
  location: { value: string; label: string }
  price: { value: string; label: string }
  type: { value: string; label: string }
}

export default function SearchForm({ buttonText = 'Browse Property', onSearch }: SearchFormProps) {
  const router = useRouter()
  
  const [filters, setFilters] = useState<FilterState>({
    location: { value: 'california', label: 'California, US' },
    price: { value: '1500-2500', label: '$1500-2500' },
    type: { value: 'apartment', label: 'Apartment' }
  })

  // Filter options
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

  const handleFilterChange = (filterType: keyof FilterState, value: string, label: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: { value, label }
    }))
  }

  const handleBrowseProperty = () => {
    if (onSearch) {
      onSearch()
    } else {
      // Build query parameters
      const params = new URLSearchParams()
      
      if (filters.location.value !== 'all') {
        params.set('location', filters.location.label)
      }
      if (filters.price.value !== 'all') {
        params.set('price', filters.price.value)
      }
      if (filters.type.value !== 'all') {
        params.set('type', filters.type.value)
      }
      
      const queryString = params.toString()
      const url = queryString ? `/search-property?${queryString}` : '/search-property'
      router.push(url)
    }
  }

  return (
    <div className='relative z-30 w-full border border-[#191A23] rounded-[15px] p-[20px] bg-white flex-col lg:flex-row mt-[32px] md:mt-[40px] lg:shadow-sm shadow-none gap-[10px]'>
      <div className='flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-[32px] md:gap-[24px]'>
        <FilterDropdown
          icon={<LocationIcon />}
          label="Location"
          value={filters.location.value}
          options={locationOptions}
          onValueChange={(value, label) => handleFilterChange('location', value, label)}
          className="md:col-span-1"
        />
        <FilterDropdown
          icon={<DollarIcon />}
          label="Price"
          value={filters.price.value}
          options={priceOptions}
          onValueChange={(value, label) => handleFilterChange('price', value, label)}
          className="md:col-span-1"
        />
        <FilterDropdown
          icon={<HouseIcon />}
          label="Type of Property"
          value={filters.type.value}
          options={typeOptions}
          onValueChange={(value, label) => handleFilterChange('type', value, label)}
          className="md:col-span-1"
        />
        <ButtonText
          variant="primary"
          className='w-full md:col-span-1 lg:w-auto'
          onClick={handleBrowseProperty}>
          {buttonText}
        </ButtonText>
      </div>
    </div>
  )
}
