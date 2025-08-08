'use client'

import React, { useEffect, useState } from 'react'
import BuildingIcon1 from '@/app/assets/icons/buliding-benefits-1.svg'
import BuildingIcon2 from '@/app/assets/icons/buliding-benefits-2.svg'
import BuildingIcon3 from '@/app/assets/icons/buliding-benefits-3.svg'
import CategoryCard from '@/app/components/ui/CategoryCard'
import SkeletonCategoryCard from '@/app/components/ui/SkeletonCategoryCard'
import SectionContainer from '@/app/components/ui/SectionContainer'
import SectionHeader from '@/app/components/ui/SectionHeader'

interface Category {
  id: number
  title: string
  listingCount: string
  icon: string
}

interface CategoryData {
  title: string
  browseText: string
  categories: Category[]
}

export default function CategorySection() {
  const [data, setData] = useState<CategoryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/home/categories')
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error('Error fetching categories data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])
  if (isLoading || !data) {
    return (
      <SectionContainer>
        <div className='flex flex-col lg:gap-[64px] md:gap-[48px] gap-[32px]'>
          {/* Skeleton Header */}
          <div className="flex flex-col gap-3 animate-pulse">
            <div className="h-[38px] bg-[#E5E7EB] rounded-[4px] w-[280px]" />
            <div className="h-[22px] bg-[#E5E7EB] rounded-[4px] w-[180px]" />
          </div>
          
          {/* Skeleton Cards */}
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-[32px] gap-[24px] w-full'>
            {[...Array(6)].map((_, index) => (
              <SkeletonCategoryCard key={index} />
            ))}
          </div>
        </div>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer>
      <div className='flex flex-col lg:gap-[64px] md:gap-[48px] gap-[32px]'>
        <SectionHeader 
          title={data.title}
          browseText={data.browseText}
        />
        
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-[32px] gap-[24px] w-full'>
          {data.categories.map((category) => (
            <CategoryCard
              key={category.id}
              icon={
                category.icon === "building-1" ? <BuildingIcon1 className='w-[32px] h-[32px] text-primary' /> :
                category.icon === "building-2" ? <BuildingIcon2 className='w-[32px] h-[32px] text-primary' /> :
                <BuildingIcon3 className='w-[32px] h-[32px] text-primary' />
              }
              title={category.title}
              listingCount={category.listingCount}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}