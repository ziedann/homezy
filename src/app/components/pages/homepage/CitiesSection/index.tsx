'use client'

import React, { useRef, useEffect, useState } from 'react'
import SectionContainer from "@/app/components/ui/SectionContainer"
import SectionHeader from "@/app/components/ui/SectionHeader"
import CityCard from "@/app/components/ui/CityCard"
import SkeletonCityCard from '@/app/components/ui/SkeletonCityCard'
import NavigationButton from '@/app/components/ui/NavigationButton'
import ArrowLeftLight from '@/app/assets/icons/arrow-left-light.svg'
import ArrowRightLight from '@/app/assets/icons/arrow-right-light.svg'
import ImageCity1 from '@/app/assets/images/image-cities-1.png'
import ImageCity2 from '@/app/assets/images/image-cities-2.png'
import ImageCity3 from '@/app/assets/images/image-cities-3.png'

interface City {
    id: number
    title: string
    listingCount: string
    image: string
}

interface CitiesData {
    title: string
    browseText: string
    cities: City[]
}

export default function CitiesSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [data, setData] = useState<CitiesData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home/cities`)
                const jsonData = await response.json()
                setData(jsonData)
            } catch (error) {
                console.error('Error fetching cities data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 340
            const currentScroll = scrollContainerRef.current.scrollLeft

            scrollContainerRef.current.scrollTo({
                left: direction === 'left' 
                    ? currentScroll - scrollAmount 
                    : currentScroll + scrollAmount,
                behavior: 'smooth'
            })
        }
    }

      if (isLoading || !data) {
    return (
      <SectionContainer>
        <div className='flex flex-col lg:gap-[64px] md:gap-[48px] gap-[32px]'>
          {/* Skeleton Header */}
          <div className="flex flex-col gap-3 animate-pulse">
            <div className="h-[38px] bg-[#E5E7EB] rounded-[4px] w-[280px]" />
            <div className="h-[22px] bg-[#E5E7EB] rounded-[4px] w-[180px]" />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-[32px]">
            {[...Array(3)].map((_, index) => (
              <SkeletonCityCard key={`desktop-${index}`} />
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col gap-[32px]">
            <div className="relative">
              <div className="flex flex-row overflow-x-auto scrollbar-hide scroll-smooth px-5">
                <div className="flex flex-row gap-[16px]">
                  {[...Array(3)].map((_, index) => (
                    <SkeletonCityCard key={`mobile-${index}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className='flex items-center justify-center gap-[40px]'>
              <div className="w-[56px] h-[56px] rounded-full bg-[#E5E7EB] animate-pulse" />
              <div className="w-[56px] h-[56px] rounded-full bg-[#E5E7EB] animate-pulse" />
            </div>
          </div>
        </div>
      </SectionContainer>
    )
  }

    return (
        <SectionContainer>
            <div className='flex flex-col gap-[64px]'>
                <SectionHeader
                    title={data.title}
                    browseText={data.browseText}
                />

                {/* Desktop Layout - Grid */}
                <div className="hidden lg:flex lg:flex-col gap-[32px] lg:w-full w-[330px]">
                    <div className="grid grid-cols-3 gap-[32px]">
                        {data.cities.map((city) => (
                            <CityCard
                                key={city.id}
                                image={city.image}
                                name={city.title}
                                listingCount={city.listingCount}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile Layout - Horizontal Scroll */}
                <div className='lg:hidden flex flex-col gap-[40px]'>
                    <div className='relative'>
                        <div 
                            ref={scrollContainerRef}
                            className="flex flex-row overflow-x-auto scrollbar-hide scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div className="flex flex-row gap-[16px] min-w-max px-[2px]">
                                {data.cities.map((city) => (
                                    <CityCard
                                        key={city.id}
                                        image={city.image}
                                        name={city.title}
                                        listingCount={city.listingCount}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons for Mobile */}
                    <div className='flex items-center justify-center gap-[40px]'>
                        <NavigationButton
                            icon={<ArrowLeftLight />}
                            onClick={() => handleScroll('left')}
                        />
                        <NavigationButton
                            icon={<ArrowRightLight />}
                            onClick={() => handleScroll('right')}
                        />
                    </div>
                </div>
            </div>
        </SectionContainer>
    )
}