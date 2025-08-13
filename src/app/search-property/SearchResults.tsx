'use client'

import React, { useState, useEffect } from 'react'
import PropertyCard from '../components/ui/PropertyCard'
import GridIcon from '@assets/icons/grid.svg'
import RowVerticalIcon from '@assets/icons/row-vertical.svg'

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
}

interface SearchResultsProps {
  className?: string
}

export default function SearchResults({ className = '' }: SearchResultsProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/properties')
        if (!response.ok) {
          throw new Error('Failed to fetch properties')
        }
        const data = await response.json()
        
        // Add featured status to some properties for variety and limit to 3 properties (1 row)
        const propertiesWithFeatured = data.properties.slice(0, 3).map((property: Property, index: number) => ({
          ...property,
          isFeatured: index === 0 || index === 2 // Make first and third property featured
        }))
        
        setProperties(propertiesWithFeatured)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

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
        <h2 className="lg:text-[32px] lg:leading-[40px] text-[24px] leading-[32px] font-semibold font-syne tracking-[-0.04em] text-[#191A23]">
          {properties.length} Results
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center justify-center w-12 h-12 rounded-[8px] transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white border-2 border-[#191A23]' 
                : ''
            }`}
          >
            <GridIcon className={`w-5 h-5 ${viewMode === 'grid' ? 'text-[#191A23]' : 'text-[#9CA3AF]'}`} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center justify-center w-12 h-12 rounded-[8px] transition-colors ${
              viewMode === 'list' 
                ? 'bg-white border-2 border-[#191A23]' 
                : ''
            }`}
          >
            <RowVerticalIcon className={`w-5 h-5 ${viewMode === 'list' ? 'text-[#191A23]' : 'text-[#9CA3AF]'}`} />
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
        {properties.map((property) => (
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
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12">
        <button className="p-2 rounded-lg border border-[#E7DCFF] hover:bg-[#F7F2FF] transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#686A79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button className="w-10 h-10 rounded-lg bg-[#191A23] text-white font-medium">1</button>
        <button className="w-10 h-10 rounded-lg border border-[#E7DCFF] hover:bg-[#F7F2FF] transition-colors font-medium text-[#686A79]">2</button>
        <button className="w-10 h-10 rounded-lg border border-[#E7DCFF] hover:bg-[#F7F2FF] transition-colors font-medium text-[#686A79]">3</button>
        <span className="px-2 text-[#686A79]">...</span>
        <button className="w-10 h-10 rounded-lg border border-[#E7DCFF] hover:bg-[#F7F2FF] transition-colors font-medium text-[#686A79]">15</button>
        
        <button className="p-2 rounded-lg border border-[#E7DCFF] hover:bg-[#F7F2FF] transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#686A79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
