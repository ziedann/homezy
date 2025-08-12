'use client'

import React, { useRef, useEffect, useState } from 'react'
import SectionContainer from '@/app/components/ui/SectionContainer'
import { delay } from '@/app/utils/delay'
import SectionHeader from '@/app/components/ui/SectionHeader'
import TestimonialCard from '@/app/components/ui/TestimonialCard'
import SkeletonTestimonialCard from '@/app/components/ui/SkeletonTestimonialCard'
import NavigationButton from '@/app/components/ui/NavigationButton'
import ArrowLeftLight from '@assets/icons/arrow-left-light.svg'
import ArrowRightLight from '@assets/icons/arrow-right-light.svg'
import TestimonialPerson1 from '@assets/images/testimonial-person-1.png'
import TestimonialPerson2 from '@assets/images/testimonial-person-2.png'

interface Testimonial {
    id: number
    name: string
    role: string
    image: string
    rating: number
    comment: string
}

interface TestimonialData {
    title: string
    browseText: string
    testimonials: Testimonial[]
}

export default function TestimonialSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [data, setData] = useState<TestimonialData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home/testimonials`)
                const jsonData = await response.json()
                await delay(2000)
                setData(jsonData)
            } catch (error) {
                console.error('Error fetching testimonials data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth >= 1024 ? 800 : 351 // Card width (335) + gap (16)
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
            <div className='w-full'>
                <SectionContainer>
                    {/* Skeleton Header */}
                    <div className="flex flex-col items-center lg:gap-[0px] gap-[40px] w-full">
                        <div className="text-center max-w-[700px] w-full space-y-4 animate-pulse">
                            <div className="h-[38px] bg-[#E5E7EB] rounded-[4px] w-[400px] mx-auto" />
                            <div className="h-[22px] bg-[#E5E7EB] rounded-[4px] w-[280px] mx-auto" />
                        </div>
                    </div>
                </SectionContainer>

                <div className='lg:mt-[64px] mt-[40px]'>
                    <div className='flex flex-col lg:gap-[40px] gap-[32px]'>
                        {/* Desktop Layout */}
                        <div className="hidden lg:flex lg:flex-row gap-[32px]">
                            {[...Array(2)].map((_, index) => (
                                <SkeletonTestimonialCard key={`desktop-${index}`} />
                            ))}
                        </div>

                        {/* Mobile Layout */}
                        <div className="lg:hidden relative">
                            <div className="flex flex-row overflow-x-auto scrollbar-hide scroll-smooth px-5">
                                <div className="flex flex-row gap-[18px]">
                                    {[...Array(2)].map((_, index) => (
                                        <SkeletonTestimonialCard key={`mobile-${index}`} />
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
            </div>
        )
    }

    return (
        <div className='w-full'>
            <SectionContainer>
                <div className="flex flex-col items-center lg:gap-[0px] gap-[40px] w-full">
                    <SectionHeader
                        title={data.title}
                        browseText={data.browseText}
                        className="text-center max-w-[1000px]"
                        showArrowIcon={false}
                    />
                </div>
            </SectionContainer>

            <div className='lg:mt-[64px] mt-[40px]'>
                <div className='flex flex-col lg:gap-[40px] gap-[32px]'>
                    {/* Testimonial Cards Container */}
                    <div className="relative">
                        <div 
                            ref={scrollContainerRef}
                            className="flex flex-row overflow-x-auto scrollbar-hide scroll-smooth px-5 lg:px-0"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <div className="flex flex-row lg:w-full lg:gap-[0px] gap-[18px]">
                                {data.testimonials.map((testimonial) => (
                                    <TestimonialCard
                                        key={testimonial.id}
                                        image={testimonial.image}
                                        review={testimonial.comment}
                                        name={testimonial.name}
                                        role={testimonial.role}
                                        rating={testimonial.rating}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className='flex items-center justify-center lg:gap-[40px] gap-[24px]'>
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
        </div>
    )
}

