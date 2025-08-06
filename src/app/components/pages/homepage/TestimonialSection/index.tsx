import React from 'react'
import SectionContainer from '@/app/components/ui/SectionContainer'
import SectionHeader from '@/app/components/ui/SectionHeader'
import TestimonialCard from '@/app/components/ui/TestimonialCard'
import ArrowLeftLight from '@/app/assets/icons/arrow-left-light.svg'
import ArrowRightLight from '@/app/assets/icons/arrow-right-light.svg'
import TestimonialPerson1 from '@/app/assets/images/testimonial-person-1.png'
import TestimonialPerson2 from '@/app/assets/images/testimonial-person-2.png'

export default function TestimonialSection() {
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
                        <div className="relative">
                            {/* Testimonial Cards */}
                            <div className="flex flex-row">
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
                        <div className='flex items-center justify-center gap-[40px]'>
                            <div className='flex items-center justify-center p-[10px] bg-[#191A23] rounded-[15px]'>
                                <ArrowLeftLight />
                            </div>
                            <div className='flex items-center justify-center p-[10px] bg-[#191A23] rounded-[15px]'>
                                <ArrowRightLight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}