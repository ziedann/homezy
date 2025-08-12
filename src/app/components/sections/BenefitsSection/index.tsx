'use client'

import React, { useRef, useEffect, useState } from 'react'
import PatternBenefits from '@assets/images/pattern-benefits.svg'
import { delay } from '@/app/utils/delay'
import CloudIcon from '@assets/images/cloud-line.svg'
import BenefitCard from '@/app/components/ui/BenefitCard'
import SkeletonBenefitCard from '@/app/components/ui/SkeletonBenefitCard'
import BackgroundPattern from '@/app/components/ui/BackgroundPattern'
import BenefitsContent from '@/app/components/ui/BenefitsContent'
import NavigationButton from '@/app/components/ui/NavigationButton'
import CoinIcon from '@assets/icons/coin.svg'
import LikeIcon from '@assets/icons/like-shapes.svg'
import PeopleIcon from '@assets/icons/people.svg'
import ArrowLeftLight from '@assets/icons/arrow-left-light.svg'
import ArrowRightLight from '@assets/icons/arrow-right-light.svg'
import SectionContainer from '@/app/components/ui/SectionContainer'

interface Benefit {
    id: number
    title: string
    description: string
    icon: string
}

interface BenefitsData {
    title: string
    description: string
    benefits: Benefit[]
}

export default function BenefitsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [data, setData] = useState<BenefitsData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home/benefits`)
                const jsonData = await response.json()
                await delay(2000)
                setData(jsonData)
            } catch (error) {
                console.error('Error fetching benefits data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 345 // Adjust based on card width + gap
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
            <div className='relative overflow-hidden'>
                {/* Background Pattern */}
                <BackgroundPattern className='lg:block hidden'>
                    <PatternBenefits className="absolute right-0 top-[80px] w-[873px] h-[529px] opacity-30"/>
                    <CloudIcon className='absolute left-0 top-[300px] w-[190px] h-[70px] opacity-30' />
                </BackgroundPattern>

                <SectionContainer>
                    <div className='flex lg:flex-row flex-col gap-[32px] justify-between'>
                        {/* Left Content Skeleton */}
                        <div className='lg:w-[416px] w-full animate-pulse'>
                            {/* Title */}
                            <div className="h-[38px] bg-[#E5E7EB] rounded-[4px] w-[280px] mb-4" />
                            {/* Description */}
                            <div className="space-y-2">
                                <div className="h-[20px] w-full bg-[#E5E7EB] rounded-[4px]" />
                                <div className="h-[20px] w-[90%] bg-[#E5E7EB] rounded-[4px]" />
                                <div className="h-[20px] w-[80%] bg-[#E5E7EB] rounded-[4px]" />
                            </div>
                        </div>

                        {/* Right Content - Benefits Cards Skeleton */}
                        <div className='flex flex-col gap-[24px]'>
                            {/* Desktop Layout - Vertical Stack */}
                            <div className='hidden lg:flex lg:flex-col gap-[24px]'>
                                {[...Array(3)].map((_, index) => (
                                    <SkeletonBenefitCard key={index} />
                                ))}
                            </div>

                            {/* Mobile Layout - Horizontal Scroll */}
                            <div className='lg:hidden flex flex-col gap-[32px]'>
                                <div className='relative'>
                                    <div className="flex flex-row overflow-x-auto scrollbar-hide scroll-smooth gap-[16px] px-[2px]">
                                        <div className="flex flex-row gap-[16px] min-w-max">
                                            {[...Array(3)].map((_, index) => (
                                                <SkeletonBenefitCard key={index} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Buttons Skeleton */}
                                <div className='flex items-center justify-center gap-[40px]'>
                                    <div className="w-[56px] h-[56px] rounded-full bg-[#E5E7EB] animate-pulse" />
                                    <div className="w-[56px] h-[56px] rounded-full bg-[#E5E7EB] animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionContainer>
            </div>
        )
    }

    return (
        <div className='relative overflow-hidden'>
            {/* Background Pattern */}
            <BackgroundPattern className='lg:block hidden'>
                <PatternBenefits className="absolute right-0 top-[80px] w-[873px] h-[529px]"/>
                <CloudIcon className='absolute left-0 top-[300px] w-[190px] h-[70px]' />
            </BackgroundPattern>

            <SectionContainer>
                <div className='flex lg:flex-row flex-col gap-[32px] justify-between'>
                    {/* Left Content */}
                    <BenefitsContent 
                        title={data.title}
                        description={data.description}
                    />

                    {/* Right Content - Benefits Cards */}
                    <div className='flex flex-col gap-[24px]'>
                        {/* Desktop Layout - Vertical Stack */}
                        <div className='hidden lg:flex lg:flex-col gap-[24px]'>
                            {data.benefits.map((benefit) => (
                                <BenefitCard
                                    key={benefit.id}
                                    icon={
                                        benefit.icon === "coin" ? <CoinIcon className='w-[48px] h-[48px]' /> :
                                        benefit.icon === "like-shapes" ? <LikeIcon className='w-[48px] h-[48px]' /> :
                                        <PeopleIcon className='w-[48px] h-[48px]' />
                                    }
                                    title={benefit.title}
                                    description={benefit.description}
                                />
                            ))}
                        </div>

                        {/* Mobile Layout - Horizontal Scroll */}
                        <div className='lg:hidden flex flex-col gap-[32px]'>
                            <div className='relative'>
                                <div 
                                    ref={scrollContainerRef}
                                    className="flex flex-row overflow-x-auto scrollbar-hide scroll-smooth gap-[16px]"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    <div className="flex flex-row gap-[16px] min-w-max px-[2px] w-full">
                                        {data.benefits.map((benefit) => (
                                            <BenefitCard
                                                key={benefit.id}
                                                icon={
                                        benefit.icon === "coin" ? <CoinIcon className='w-[48px] h-[48px]' /> :
                                        benefit.icon === "like-shapes" ? <LikeIcon className='w-[48px] h-[48px]' /> :
                                        <PeopleIcon className='w-[48px] h-[48px]' />
                                    }
                                                title={benefit.title}
                                                description={benefit.description}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Buttons for Mobile */}
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
            </SectionContainer>
        </div>
    )
}

