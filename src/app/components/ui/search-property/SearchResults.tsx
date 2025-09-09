'use client'

import { useState, useEffect } from 'react'
import { Property, SearchResultsProps } from '@/app/types/search-property'
import PropertyCard from '../PropertyCard'
import ViewToggle from '../ViewToggle'
import Pagination from '../Pagination'
import SkeletonSearchPropertyCard from '../SkeletonSearchPropertyCard'

export default function SearchResults({ className = '', filterCriteria, hasSearched = false, isLoading = false, onClearFilters }: SearchResultsProps) {
  const [originalProperties, setOriginalProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/properties')
        if (!response.ok) {
          throw new Error('Failed to fetch properties')
        }
        const data = await response.json()
        
        // Properties already have all required fields from the API
        const enhancedProperties = data.properties.map((property: Property, index: number) => {
          return {
            ...property,
            // Set featured status for some properties for visual variety
            isFeatured: property.isFeatured || index === 0 || index === 2 || index === 5
          }
        })
        
        setOriginalProperties(enhancedProperties)
        setFilteredProperties(enhancedProperties)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Filter properties based on criteria
  useEffect(() => {
    if (!filterCriteria) {
      setFilteredProperties(originalProperties)
      return
    }

    const filtered = originalProperties.filter((property) => {
      // Type filter (sale/rent) - Check both type and isMonthly property
      if (filterCriteria.type) {
        if (filterCriteria.type === 'rent' && !property.isMonthly) return false
        if (filterCriteria.type === 'sale' && property.isMonthly) return false
      }

      // Category filter
      if (filterCriteria.category && property.category !== filterCriteria.category) return false

      // Bedrooms filter
      if (filterCriteria.bedrooms && property.beds.toString() !== filterCriteria.bedrooms) return false

      // Bathrooms filter
      if (filterCriteria.bathrooms && property.baths.toString() !== filterCriteria.bathrooms) return false

      // Floor area filter
      if (filterCriteria.floorArea && property.area !== filterCriteria.floorArea) return false

      // Price range filter
      if (filterCriteria.minPrice && property.priceValue) {
        const minPrice = parseInt(filterCriteria.minPrice)
        if (property.priceValue < minPrice) return false
      }
      if (filterCriteria.maxPrice && property.priceValue) {
        const maxPrice = parseInt(filterCriteria.maxPrice)
        if (property.priceValue > maxPrice) return false
      }

      // Year built filter
      if (filterCriteria.minYear && property.yearBuilt && property.yearBuilt < parseInt(filterCriteria.minYear)) return false
      if (filterCriteria.maxYear && property.yearBuilt && property.yearBuilt > parseInt(filterCriteria.maxYear)) return false

      // Location filter
      if (filterCriteria.location && property.location !== filterCriteria.location) return false

      return true
    })

    setFilteredProperties(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [filterCriteria, originalProperties])

  // Calculate pagination
  const totalItems = filteredProperties.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page)
    // Removed automatic scroll to top for better UX
  }

  const goToPrevious = () => currentPage > 1 && goToPage(currentPage - 1)
  const goToNext = () => currentPage < totalPages && goToPage(currentPage + 1)


  if (loading || isLoading) {
    return (
      <div className={`w-full ${className}`}>
        {/* Results Header Skeleton */}
        <div className="flex items-center justify-between mb-6 animate-pulse">
          <div className="h-8 bg-[#E5E7EB] rounded-[4px] w-32" />
          <div className="h-8 bg-[#E5E7EB] rounded-[4px] w-24" />
        </div>
        
        {/* Property Cards Skeleton */}
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonSearchPropertyCard key={index} />
          ))}
        </div>
        
        {/* Loading Message */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#191A23] border-t-transparent rounded-full animate-spin" />
              <span className="text-[#191A23] font-medium">Searching properties...</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (error) {
    return (
      <div className={`w-full ${className}`}>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[#191A23] text-white rounded-lg hover:bg-[#2A2B3D] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="lg:text-[32px] lg:leading-[40px] text-[24px] leading-[32px] font-semibold font-syne tracking-[-0.04em] text-[#191A23]">
            {totalItems} Results
          </h2>
          {totalPages > 1 && (
            <p className="text-[14px] text-[#6B7280] mt-1">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} properties
            </p>
          )}
        </div>
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {/* Properties Container */}
      {currentProperties.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6" 
          : "flex flex-col gap-4"
        }>
          {currentProperties.map((property) => (
            <PropertyCard
              key={property.id}
              price={property.price}
              title={property.title}
              location={property.location}
              beds={property.beds}
              baths={property.baths}
              area={property.area}
              image={property.image}
              isMonthly={property.isMonthly}
              isFeatured={property.isFeatured}
              layoutMode={viewMode}
              slug={property.slug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-[#191A23] mb-2">No Properties Found</h3>
            <p className="text-[#6B7280] mb-6">
              No properties match your current filter criteria. Try adjusting your filters to see more results.
            </p>
            <button 
              onClick={onClearFilters} 
              className="px-6 py-3 bg-[#191A23] text-white rounded-[16px] hover:bg-[#2A2B3D] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={goToPage}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  )
}
