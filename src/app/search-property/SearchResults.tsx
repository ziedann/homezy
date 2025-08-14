'use client'

import React, { useState, useEffect } from 'react'
import PropertyCard from '../components/ui/PropertyCard'
import GridIcon from '@assets/icons/grid.svg'
import RowVerticalIcon from '@assets/icons/row-vertical.svg'
import { FilterCriteria } from '../components/ui/FilterModal'

interface Property {
  id: number
  price: string
  title: string
  location: string
  beds: number
  baths: number
  area: string
  image: any
  coordinates: [number, number]
  isMonthly?: boolean
  isFeatured?: boolean
  type?: 'sale' | 'rent'
  category?: string
  yearBuilt?: number
  priceValue?: number
}

interface SearchResultsProps {
  className?: string
  filterCriteria?: FilterCriteria | null
}

export default function SearchResults({ className = '', filterCriteria }: SearchResultsProps) {
  const [originalProperties, setOriginalProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/properties')
        if (!response.ok) {
          throw new Error('Failed to fetch properties')
        }
        const data = await response.json()
        
        // Enhance properties with additional filter data based on actual API data
        const enhancedProperties = data.properties.map((property: Property, index: number) => {
          // Extract category from title
          let category = 'apartment' // default
          if (property.title.toLowerCase().includes('studio')) {
            category = 'studio'
          } else if (property.title.toLowerCase().includes('loft')) {
            category = 'loft'
          } else if (property.title.toLowerCase().includes('penthouse')) {
            category = 'penthouse'
          } else if (property.title.toLowerCase().includes('realty')) {
            category = 'realty'
          }
          
          return {
            ...property,
            isFeatured: index === 0 || index === 2, // Make first and third property featured
            type: index % 2 === 0 ? 'sale' : 'rent' as 'sale' | 'rent',
            category: category,
            yearBuilt: 2020 + (index % 5),
            priceValue: parseInt(property.price.replace(/[^0-9]/g, '')) || 0
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
      // Type filter (sale/rent)
      if (filterCriteria.type && property.type !== filterCriteria.type) {
        return false
      }

      // Category filter
      if (filterCriteria.category && property.category !== filterCriteria.category) {
        return false
      }

      // Bedrooms filter
      if (filterCriteria.bedrooms && property.beds.toString() !== filterCriteria.bedrooms) {
        return false
      }

      // Bathrooms filter
      if (filterCriteria.bathrooms && property.baths.toString() !== filterCriteria.bathrooms) {
        return false
      }

      // Floor area filter (based on actual area format from API)
      if (filterCriteria.floorArea && property.area !== filterCriteria.floorArea) {
        return false
      }

      // Price range filter
      if (filterCriteria.minPrice && property.priceValue && property.priceValue < parseInt(filterCriteria.minPrice)) {
        return false
      }
      if (filterCriteria.maxPrice && property.priceValue && property.priceValue > parseInt(filterCriteria.maxPrice)) {
        return false
      }

      // Year built filter
      if (filterCriteria.minYear && property.yearBuilt && property.yearBuilt < parseInt(filterCriteria.minYear)) {
        return false
      }
      if (filterCriteria.maxYear && property.yearBuilt && property.yearBuilt > parseInt(filterCriteria.maxYear)) {
        return false
      }

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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[368/280] bg-gray-200 rounded-[15px] mb-4"></div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
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
        <div className="flex items-center gap-2 bg-[#F8FAFC] p-1 rounded-[12px]">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center justify-center w-12 h-12 rounded-[8px] transition-all duration-200 ${
              viewMode === 'grid' 
                ? 'bg-white border border-[#191A23] shadow-sm' 
                : 'hover:bg-white/50'
            }`}
          >
            <GridIcon className={`w-5 h-5 ${viewMode === 'grid' ? 'text-[#191A23]' : 'text-[#9CA3AF]'}`} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center justify-center w-12 h-12 rounded-[8px] transition-all duration-200 ${
              viewMode === 'list' 
                ? 'bg-white border border-[#191A23] shadow-sm' 
                : 'hover:bg-white/50'
            }`}
          >
            <RowVerticalIcon className={`w-5 h-5 ${viewMode === 'list' ? 'text-[#191A23]' : 'text-[#9CA3AF]'}`} />
          </button>
        </div>
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
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-[#191A23] text-white rounded-[16px] hover:bg-[#2A2B3D] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Pagination - Only show if more than 1 page */}
      {totalPages > 1 && (          
        <div className="flex justify-center items-center gap-2 mt-12">
          {/* Previous Button */}
          <button 
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg border transition-colors ${
              currentPage === 1 
                ? 'border-[#E7DCFF] text-[#9CA3AF] cursor-not-allowed' 
                : 'border-[#E7DCFF] hover:bg-[#F7F2FF] text-[#686A79]'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Page Numbers */}
          {(() => {
            const pages = []
            const showPages = 5 // Maximum pages to show
            let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
            let endPage = Math.min(totalPages, startPage + showPages - 1)
            
            // Adjust start if we're near the end
            if (endPage - startPage + 1 < showPages) {
              startPage = Math.max(1, endPage - showPages + 1)
            }
            
            // Show first page if not included
            if (startPage > 1) {
              pages.push(
                <button
                  key={1}
                  onClick={() => goToPage(1)}
                  className="w-10 h-10 rounded-lg border border-[#E7DCFF] hover:bg-[#F7F2FF] transition-colors font-medium text-[#686A79]"
                >
                  1
                </button>
              )
              if (startPage > 2) {
                pages.push(<span key="dots1" className="px-2 text-[#686A79]">...</span>)
              }
            }
            
            // Show page range
            for (let i = startPage; i <= endPage; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === i
                      ? 'bg-[#191A23] text-white'
                      : 'border border-[#E7DCFF] hover:bg-[#F7F2FF] text-[#686A79]'
                  }`}
                >
                  {i}
                </button>
              )
            }
            
            // Show last page if not included
            if (endPage < totalPages) {
              if (endPage < totalPages - 1) {
                pages.push(<span key="dots2" className="px-2 text-[#686A79]">...</span>)
              }
              pages.push(
                <button
                  key={totalPages}
                  onClick={() => goToPage(totalPages)}
                  className="w-10 h-10 rounded-lg border border-[#E7DCFF] hover:bg-[#F7F2FF] transition-colors font-medium text-[#686A79]"
                >
                  {totalPages}
                </button>
              )
            }
            
            return pages
          })()}
          
          {/* Next Button */}
          <button 
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg border transition-colors ${
              currentPage === totalPages 
                ? 'border-[#E7DCFF] text-[#9CA3AF] cursor-not-allowed' 
                : 'border-[#E7DCFF] hover:bg-[#F7F2FF] text-[#686A79]'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
