'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import FilterBar from '../components/ui/FilterBar'
import SectionContainer from '../components/ui/SectionContainer'
import SectionHeader from '../components/ui/SectionHeader'
import FilterModal from '../components/ui/FilterModal'
import MoreFilterButton from '../components/ui/MoreFilterButton'
import SkeletonMap from '../components/ui/SkeletonMap'
import { FilterCriteria } from '../types/search-property'

// Dynamic imports for better performance
const SearchMap = dynamic(() => import('../components/ui/search-property/SearchMap'), { ssr: false })
const SearchResults = dynamic(() => import('../components/ui/search-property/SearchResults'), { ssr: false })

export default function SearchPropertyClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialized = useRef(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [savedFilters, setSavedFilters] = useState<FilterCriteria | null>(null)
  const [activeFilters, setActiveFilters] = useState<FilterCriteria | null>(null)
  const [hasSearched, setHasSearched] = useState(true) // Show all data by default
  const [isLoading, setIsLoading] = useState(false)
  const [saleRentType, setSaleRentType] = useState<'sale' | 'rent' | null>('rent')
  const [quickFilters, setQuickFilters] = useState<{
    location: { value: string; label: string }
    price: { value: string; label: string }
    type: { value: string; label: string }
  }>({
    location: { value: 'all', label: 'All' },
    price: { value: 'all', label: 'All' },
    type: { value: 'all', label: 'All' }
  })

  // Pending filters that haven't been applied yet
  const [pendingFilters, setPendingFilters] = useState<{
    location: { value: string; label: string }
    price: { value: string; label: string }
    type: { value: string; label: string }
  }>({
    location: { value: 'all', label: 'All' },
    price: { value: 'all', label: 'All' },
    type: { value: 'all', label: 'All' }
  })

  // Parse query params on component mount
  useEffect(() => {
    if (isInitialized.current) return
    
    const location = searchParams.get('location')
    const price = searchParams.get('price')
    const type = searchParams.get('type')
    const saleRent = searchParams.get('saleRent') // For Sale/Rent toggle
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const bedrooms = searchParams.get('bedrooms')
    const bathrooms = searchParams.get('bathrooms')
    const floorArea = searchParams.get('floorArea')
    const minYear = searchParams.get('minYear')
    const maxYear = searchParams.get('maxYear')

    // Map location labels to values
    const locationMap: Record<string, { value: string; label: string }> = {
      'California, US': { value: 'california', label: 'California, US' },
      'London, UK': { value: 'london', label: 'London, UK' },
      'Milan, Italia': { value: 'milan', label: 'Milan, Italia' },
      'Barcelona, Spain': { value: 'barcelona', label: 'Barcelona, Spain' }
    }
    
    // Map price values to labels
    const priceMap: Record<string, { value: string; label: string }> = {
      '500-1000': { value: '500-1000', label: '$500-1000' },
      '1000-1500': { value: '1000-1500', label: '$1000-1500' },
      '1500-2500': { value: '1500-2500', label: '$1500-2500' },
      '2500-4000': { value: '2500-4000', label: '$2500-4000' },
      '4000-6000': { value: '4000-6000', label: '$4000-6000' },
      '6000+': { value: '6000+', label: '$6000+' }
    }
    
    // Map type values to labels
    const typeMap: Record<string, { value: string; label: string }> = {
      'apartment': { value: 'apartment', label: 'Apartment' },
      'studio': { value: 'studio', label: 'Studio' },
      'loft': { value: 'loft', label: 'Loft' },
      'penthouse': { value: 'penthouse', label: 'Penthouse' },
      'realty': { value: 'realty', label: 'Realty' }
    }
    
    // Update quick filters from query params or use "All" as default
    const newQuickFilters = {
      location: location ? (locationMap[location] || { value: 'all', label: 'All' }) : { value: 'all', label: 'All' },
      price: price ? (priceMap[price] || { value: 'all', label: 'All' }) : { value: 'all', label: 'All' },
      type: type ? (typeMap[type.toLowerCase()] || { value: 'all', label: 'All' }) : { value: 'all', label: 'All' }
    }
    setQuickFilters(newQuickFilters)
    setPendingFilters(newQuickFilters)

    // Set sale/rent type from query params
    if (saleRent === 'sale' || saleRent === 'rent') {
      setSaleRentType(saleRent)
    }

    // Create FilterCriteria from query params
    if (location || price || type || saleRent || minPrice || maxPrice || bedrooms || bathrooms || floorArea || minYear || maxYear) {
      const filterCriteria: FilterCriteria = {
        type: saleRent === 'sale' || saleRent === 'rent' ? saleRent : 'rent', // Use saleRent param or default to rent
        category: type || '',
        bedrooms: bedrooms || '',
        bathrooms: bathrooms || '',
        floorArea: floorArea || '',
        minYear: minYear || '',
        maxYear: maxYear || '',
        location: location || '',
        minPrice: minPrice || '',
        maxPrice: maxPrice || ''
      }
      setActiveFilters(filterCriteria)
      setHasSearched(true)
    }
    
    isInitialized.current = true
  }, [searchParams])

  // Function to update URL query params
  const updateQueryParams = (filters: {
    location?: { value: string; label: string } | undefined
    price?: { value: string; label: string } | undefined
    type?: { value: string; label: string } | undefined
  }, additionalParams?: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (filters.location) {
      params.set('location', filters.location.label)
    } else {
      params.delete('location')
    }
    if (filters.price) {
      params.set('price', filters.price.value)
    } else {
      params.delete('price')
    }
    if (filters.type) {
      params.set('type', filters.type.value)
    } else {
      params.delete('type')
    }
    
    // Add additional params if provided
    if (additionalParams) {
      Object.entries(additionalParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })
    }
    
    // If saleRentType is null, ensure saleRent parameter is removed
    if (saleRentType === null) {
      params.delete('saleRent')
    }
    
    router.push(`/search-property?${params.toString()}`, { scroll: false })
  }

  // Function to clear specific params from URL
  const clearSpecificParams = (paramKeys: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    
    paramKeys.forEach(key => {
      params.delete(key)
    })
    
    // If clearing saleRent related fields, also clear saleRent parameter
    if (paramKeys.includes('saleRent') || paramKeys.includes('type')) {
      params.delete('saleRent')
    }
    
    // If no params left, go to clean URL
    if (params.toString() === '') {
      router.replace('/search-property', { scroll: false })
    } else {
      router.push(`/search-property?${params.toString()}`, { scroll: false })
    }
  }

  const handleApplyFilter = (criteria: FilterCriteria) => {
    // Only save filters to state, don't update URL yet
    setSavedFilters(criteria)
    
    // Handle saleRentType based on criteria.type
    if (criteria.type === null || criteria.type === undefined) {
      // Clear state - will be handled when Browse is clicked
      setSaleRentType(null)
    } else {
      // Set the selected type
      setSaleRentType(criteria.type as 'sale' | 'rent')
    }
    
    // Note: URL will be updated when user clicks "Browse" button
  }

  const handleQuickFiltersChange = (filters: {
    location: { value: string; label: string }
    price: { value: string; label: string }
    type: { value: string; label: string }
  }) => {
    // Only update pending filters, don't apply search yet
    setPendingFilters(filters)
  }

  const handleBrowseClick = async () => {
    // Show loading state
    setIsLoading(true)
    
    try {
      // Apply pending filters when Browse button is clicked
      setQuickFilters(pendingFilters)
      
      // Update URL query params (only if not "All")
      const urlFilters = {
        location: pendingFilters.location.value !== 'all' ? pendingFilters.location : undefined,
        price: pendingFilters.price.value !== 'all' ? pendingFilters.price : undefined,
        type: pendingFilters.type.value !== 'all' ? pendingFilters.type : undefined
      }
      
      // Add saleRent and saved filters to additional params
      const additionalParams: Record<string, string> = {}
      if (saleRentType) additionalParams.saleRent = saleRentType
      if (savedFilters?.minPrice) additionalParams.minPrice = savedFilters.minPrice
      if (savedFilters?.maxPrice) additionalParams.maxPrice = savedFilters.maxPrice
      if (savedFilters?.bedrooms) additionalParams.bedrooms = savedFilters.bedrooms
      if (savedFilters?.bathrooms) additionalParams.bathrooms = savedFilters.bathrooms
      if (savedFilters?.floorArea) additionalParams.floorArea = savedFilters.floorArea
      if (savedFilters?.minYear) additionalParams.minYear = savedFilters.minYear
      if (savedFilters?.maxYear) additionalParams.maxYear = savedFilters.maxYear
      
      updateQueryParams(urlFilters, additionalParams)
      
      // Convert pending filters to FilterCriteria format
      const priceRange = pendingFilters.price.value !== 'all' ? pendingFilters.price.value.split('-') : ['', '']
      const filterCriteria: FilterCriteria = {
        type: saleRentType || 'rent', // Use current sale/rent type or default to rent
        category: pendingFilters.type.value !== 'all' ? pendingFilters.type.value : '',
        bedrooms: savedFilters?.bedrooms || '',
        bathrooms: savedFilters?.bathrooms || '',
        floorArea: savedFilters?.floorArea || '',
        minYear: savedFilters?.minYear || '',
        maxYear: savedFilters?.maxYear || '',
        location: pendingFilters.location.value !== 'all' ? pendingFilters.location.label : '',
        minPrice: priceRange[0] || '',
        maxPrice: pendingFilters.price.value.includes('+') ? '999999' : (priceRange[1] || '')
      }
      
      setActiveFilters(filterCriteria)
      setHasSearched(true)
      
      // Simulate API call delay (remove this in production)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } finally {
      // Hide loading state
      setIsLoading(false)
    }
  }

  // Location coordinates mapping
  const locationCoordinates = {
    'california': { center: [34.0522, -118.2437] as [number, number], zoom: 10 }, // Los Angeles
    'london': { center: [51.5074, -0.1278] as [number, number], zoom: 10 }, // London
    'milan': { center: [45.4642, 9.1900] as [number, number], zoom: 10 }, // Milan
    'barcelona': { center: [41.3851, 2.1734] as [number, number], zoom: 10 }, // Barcelona
    'all': { center: [40.742, -73.98] as [number, number], zoom: 3 } // Default with zoom out
  }

  // Get map center and zoom based on current filter
  const getMapView = () => {
    const location = quickFilters.location.value
    return locationCoordinates[location as keyof typeof locationCoordinates] || locationCoordinates.all
  }

  // Function to count active filters (only for modal filters, not quick filters)
  const getActiveFilterCount = () => {
    let count = 0
    
    // Only count saved filters from modal (not quick filters from FilterDropdown)
    if (savedFilters) {
      if (savedFilters.bedrooms) count++
      if (savedFilters.bathrooms) count++
      if (savedFilters.floorArea) count++
      if (savedFilters.minYear) count++
      if (savedFilters.maxYear) count++
      if (savedFilters.minPrice) count++
      if (savedFilters.maxPrice) count++
    }
    
    // Count sale/rent type if it's set (this is also from modal)
    if (saleRentType) count++
    
    return count
  }

  const clearAllFilters = async () => {
    // Show loading state
    setIsLoading(true)
    
    try {
      // Reset all filters to "All"
      const allFilters = {
        location: { value: 'all', label: 'All' },
        price: { value: 'all', label: 'All' },
        type: { value: 'all', label: 'All' }
      }
      
      // Update both quick and pending filters
      setQuickFilters(allFilters)
      setPendingFilters(allFilters)
      
      // Reset sale/rent type to clear state
      setSaleRentType(null)
      setSavedFilters(null)
      
      // Clear active filters (show all data)
      setActiveFilters(null)
      setHasSearched(true)
      
      // Clear URL params - use replace to avoid back button issues
      router.replace('/search-property', { scroll: false })
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } finally {
      // Hide loading state
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <SectionContainer>
        {/* Header Section */}
        <SectionHeader
          title="Search Properties"
          browseText=""
          showArrowIcon={false}
        />
        
        {/* Filter Bar */}
        <div className="flex lg:flex-row flex-col gap-[16px] lg:gap-[24px]">
          <div className="flex-1">
            <FilterBar 
              onFiltersChange={handleQuickFiltersChange} 
              onBrowseClick={handleBrowseClick}
              initialFilters={pendingFilters}
            />
          </div>
          <div className="relative w-full lg:w-auto">
            <MoreFilterButton 
              onClick={() => setIsFilterModalOpen(true)} 
              filterCount={getActiveFilterCount()}
            />
            <FilterModal 
              isOpen={isFilterModalOpen} 
              onClose={() => setIsFilterModalOpen(false)}
              onApplyFilter={handleApplyFilter}
              onClearFilters={(clearedFields) => {
                setSavedFilters(null)
                setSaleRentType(null) // Set to null for clear state
                
                // Clear specific params from URL based on cleared fields
                if (clearedFields && clearedFields.length > 0) {
                  clearSpecificParams(clearedFields)
                }
              }}
              currentSaleRent={saleRentType}
            />
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-8">
          {isLoading ? (
            <SkeletonMap />
          ) : (
            <SearchMap 
              hideZoomControls={isFilterModalOpen}
              center={getMapView().center}
              zoom={getMapView().zoom}
            />
          )}
        </div>

        {/* Search Results Section */}
        <div className="mt-12">
          <SearchResults 
            filterCriteria={activeFilters} 
            hasSearched={hasSearched} 
            isLoading={isLoading}
            onClearFilters={clearAllFilters}
          />
        </div>
      </SectionContainer>
    </main>
  )
}
