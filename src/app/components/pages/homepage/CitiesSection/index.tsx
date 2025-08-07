'use client'

import React, { useRef } from 'react'
import SectionContainer from "@/app/components/ui/SectionContainer"
import SectionHeader from "@/app/components/ui/SectionHeader"
import CityCard from "@/app/components/ui/CityCard"
import NavigationButton from '@/app/components/ui/NavigationButton'
import ArrowLeftLight from '@/app/assets/icons/arrow-left-light.svg'
import ArrowRightLight from '@/app/assets/icons/arrow-right-light.svg'
import ImageCity1 from '@/app/assets/images/image-cities-1.png'
import ImageCity2 from '@/app/assets/images/image-cities-2.png'
import ImageCity3 from '@/app/assets/images/image-cities-3.png'

export default function CitiesSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

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

    return (
        <SectionContainer>
            <div className='flex flex-col gap-[64px]'>
                <SectionHeader
                    title="Explore Cities"
                    browseText="Browse All Cities"
                />

                {/* Desktop Layout - Grid */}
                <div className="hidden lg:flex lg:flex-col gap-[32px] lg:w-full w-[330px]">
                    <div className="flex flex-row justify-between">
                        <CityCard
                            image={ImageCity1}
                            name="Pasadena, Oklah..."
                            listingCount="100+"
                        />
                        <CityCard
                            image={ImageCity2}
                            name="Lafayette, California"
                            listingCount="150+"
                        />
                        <CityCard
                            image={ImageCity3}
                            name="Stockton, New Ha..."
                            listingCount="200+"
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <CityCard
                            image={ImageCity1}
                            name="Pasadena, Oklah..."
                            listingCount="100+"
                        />
                        <CityCard
                            image={ImageCity2}
                            name="Lafayette, California"
                            listingCount="150+"
                        />
                        <CityCard
                            image={ImageCity3}
                            name="Stockton, New Ha..."
                            listingCount="200+"
                        />
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
                                <CityCard
                                    image={ImageCity1}
                                    name="Pasadena, Oklah..."
                                    listingCount="100+"
                                />
                                <CityCard
                                    image={ImageCity2}
                                    name="Lafayette, California"
                                    listingCount="150+"
                                />
                                <CityCard
                                    image={ImageCity3}
                                    name="Stockton, New Ha..."
                                    listingCount="200+"
                                />
                                <CityCard
                                    image={ImageCity1}
                                    name="Pasadena, Oklah..."
                                    listingCount="100+"
                                />
                                <CityCard
                                    image={ImageCity2}
                                    name="Lafayette, California"
                                    listingCount="150+"
                                />
                                <CityCard
                                    image={ImageCity3}
                                    name="Stockton, New Ha..."
                                    listingCount="200+"
                                />
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