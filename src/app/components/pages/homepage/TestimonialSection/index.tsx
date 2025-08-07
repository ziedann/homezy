'use client'

import React, { useRef } from 'react'
import SectionContainer from '@/app/components/ui/SectionContainer'
import SectionHeader from '@/app/components/ui/SectionHeader'
import TestimonialCard from '@/app/components/ui/TestimonialCard'
import NavigationButton from '@/app/components/ui/NavigationButton'
import ArrowLeftLight from '@/app/assets/icons/arrow-left-light.svg'
import ArrowRightLight from '@/app/assets/icons/arrow-right-light.svg'
import TestimonialPerson1 from '@/app/assets/images/testimonial-person-1.png'
import TestimonialPerson2 from '@/app/assets/images/testimonial-person-2.png'

export default function TestimonialSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 600 // Adjust this value based on your card width + gap
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
        <div className='w-full min-h-full mt-[120px]'>
            <div>
                <div className="flex flex-col gap-[64px]">
                    <SectionHeader
                        title="Kind Words From Our Customers"
                        browseText=""
                        className="flex flex-col items-center"
                        showArrowIcon={false}
                    />
                    <div className='flex flex-col gap-[40px]'>
                        {/* Testimonial Cards Container */}
                        <div className="relative">
                            <div 
                                ref={scrollContainerRef}
                                className="flex flex-row overflow-x-auto scrollbar-hide scroll-smooth"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <div className="flex flex-row px-[2px] min-w-max">
                                    <TestimonialCard
                                        image={TestimonialPerson1}
                                        review="Your company is truly upstanding and is behind its product 100%. It's the perfect solution for our business. It has really helped our business."
                                        name="Brooklyn Simmons"
                                        role="CEO of Asana"
                                    />
                                    <TestimonialCard
                                        image={TestimonialPerson2}
                                        review="Your company is truly upstanding and is behind its product 100%. It's the perfect solution for our business. It has really helped our business."
                                        name="Brooklyn Simmons"
                                        role="CEO of Asana"
                                    />
                                    <TestimonialCard
                                        image={TestimonialPerson1}
                                        review="Your company is truly upstanding and is behind its product 100%. It's the perfect solution for our business. It has really helped our business."
                                        name="Brooklyn Simmons"
                                        role="CEO of Asana"
                                    />
                                    <TestimonialCard
                                        image={TestimonialPerson2}
                                        review="Your company is truly upstanding and is behind its product 100%. It's the perfect solution for our business. It has really helped our business."
                                        name="Brooklyn Simmons"
                                        role="CEO of Asana"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
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
            </div>
        </div>
    )
}