'use client'

import React, { useRef } from 'react'
import SectionContainer from "@/app/components/ui/SectionContainer"
import SectionHeader from "@/app/components/ui/SectionHeader"
import AgentCard from "@/app/components/ui/AgentCard"
import NavigationButton from '@/app/components/ui/NavigationButton'
import ArrowLeftLight from '@/app/assets/icons/arrow-left-light.svg'
import ArrowRightLight from '@/app/assets/icons/arrow-right-light.svg'
import Agent1 from "@/app/assets/images/agent-1.png"
import Agent2 from "@/app/assets/images/agent-2.png"
import Agent3 from "@/app/assets/images/agent-3.png"
import Agent4 from "@/app/assets/images/agent-4.png"
import Agent5 from "@/app/assets/images/agent-5.png"
import Agent6 from "@/app/assets/images/agent-6.png"

export default function AgentsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 345
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
            <div className="flex flex-col gap-[64px]">
                <SectionHeader
                    title="Meet Our Agents"
                    browseText="Browse All Agents"
                />

                {/* Desktop Layout - Grid */}
                <div className="hidden lg:flex lg:flex-col gap-[32px]">
                    <div className="flex flex-row justify-between">
                        <AgentCard
                            image={Agent1}
                            name="Edwin Martins"
                            role="Property Advisor"
                        />
                        <AgentCard
                            image={Agent2}
                            name="Robert Fox"
                            role="Property Advisor"
                        />
                        <AgentCard
                            image={Agent3}
                            name="Jane Cooper"
                            role="Property Advisor"
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <AgentCard
                            image={Agent4}
                            name="Guy Hawkins"
                            role="Property Advisor"
                        />
                        <AgentCard
                            image={Agent5}
                            name="Kathryn Murphy"
                            role="Property Advisor"
                        />
                        <AgentCard
                            image={Agent6}
                            name="Albert Flores"
                            role="Property Advisor"
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
                                <AgentCard
                                    image={Agent1}
                                    name="Edwin Martins"
                                    role="Property Advisor"
                                />
                                <AgentCard
                                    image={Agent2}
                                    name="Robert Fox"
                                    role="Property Advisor"
                                />
                                <AgentCard
                                    image={Agent3}
                                    name="Jane Cooper"
                                    role="Property Advisor"
                                />
                                <AgentCard
                                    image={Agent4}
                                    name="Guy Hawkins"
                                    role="Property Advisor"
                                />
                                <AgentCard
                                    image={Agent5}
                                    name="Kathryn Murphy"
                                    role="Property Advisor"
                                />
                                <AgentCard
                                    image={Agent6}
                                    name="Albert Flores"
                                    role="Property Advisor"
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