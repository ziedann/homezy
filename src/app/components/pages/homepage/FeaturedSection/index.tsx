'use client'

import React, { useEffect, useState } from 'react'
import PropertyCard from '@/app/components/ui/PropertyCard'
import SectionContainer from '@/app/components/ui/SectionContainer'
import SectionHeader from '@/app/components/ui/SectionHeader'
import SkeletonPropertyCard from '@/app/components/ui/SkeletonPropertyCard'

interface Property {
  id: number
  price: string
  title: string
  location: string
  beds: number
  baths: number
  area: string
  image: string
  isFeatured: boolean
  isMonthly: boolean
}

interface FeaturedData {
  title: string
  browseText: string
  properties: Property[]
}

export default function FeaturedSection() {
  const [data, setData] = useState<FeaturedData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/home/featured')
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error('Error fetching featured data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading || !data) {
    return (
      <SectionContainer>
        <div className='flex flex-col lg:gap-8 md:gap-6 gap-5'>
          {/* Skeleton Header */}
          <div className="flex flex-col gap-3 animate-pulse">
            <div className="h-[38px] bg-[#E5E7EB] rounded-[4px] w-[280px]" />
            <div className="h-[22px] bg-[#E5E7EB] rounded-[4px] w-[180px]" />
          </div>

          {/* Skeleton Cards */}
          <div className="flex lg:flex-row flex-col lg:gap-[32px] md:gap-6 gap-5 overflow-x-auto lg:overflow-x-visible">
            {[...Array(3)].map((_, index) => (
              <SkeletonPropertyCard key={index} />
            ))}
          </div>
        </div>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer>
      <div className='flex flex-col lg:gap-8 md:gap-6 gap-5'>
        <SectionHeader 
          title={data.title}
          browseText={data.browseText}
        />
        
        {/* Property Cards */}
        <div className="flex lg:flex-row flex-col lg:gap-[32px] md:gap-6 gap-5 overflow-x-auto lg:overflow-x-visible">
          {data.properties.map((property) => (
            <PropertyCard 
              key={property.id}
              price={property.price}
              title={property.title}
              location={property.location}
              beds={property.beds}
              baths={property.baths}
              area={property.area}
              image={property.image}
              isFeatured={property.isFeatured}
              isMonthly={property.isMonthly}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}