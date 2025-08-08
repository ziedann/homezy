'use client'

import React, { useRef, useEffect, useState } from 'react'
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

interface Agent {
    id: number
    name: string
    role: string
    image: string
    socialLinks: {
        facebook: string
        twitter: string
        instagram: string
    }
}

interface AgentsData {
    title: string
    browseText: string
    agents: Agent[]
}

export default function AgentsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [data, setData] = useState<AgentsData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/home/agents')
                const jsonData = await response.json()
                setData(jsonData)
            } catch (error) {
                console.error('Error fetching agents data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

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

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>No data available</div>
    }

    return (
        <SectionContainer>
            <div className="flex flex-col gap-[64px]">
                <SectionHeader
                    title={data.title}
                    browseText={data.browseText}
                />

                {/* Desktop Layout - Grid */}
                <div className="hidden lg:flex lg:flex-col gap-[32px]">
                    <div className="grid grid-cols-3 gap-[32px]">
                        {data.agents.map((agent) => (
                            <AgentCard
                                key={agent.id}
                                image={agent.image}
                                name={agent.name}
                                role={agent.role}
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
                                {data.agents.map((agent) => (
                                    <AgentCard
                                        key={agent.id}
                                        image={agent.image}
                                        name={agent.name}
                                        role={agent.role}
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