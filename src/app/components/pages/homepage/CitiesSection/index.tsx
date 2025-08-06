import React from 'react'
import SectionContainer from "@/app/components/ui/SectionContainer"
import SectionHeader from "@/app/components/ui/SectionHeader"
import CityCard from "@/app/components/ui/CityCard"
import ImageCity1 from '@/app/assets/images/image-cities-1.png'
import ImageCity2 from '@/app/assets/images/image-cities-2.png'
import ImageCity3 from '@/app/assets/images/image-cities-3.png'

export default function CitiesSection() {
    return (
        <SectionContainer>
            <div className='flex flex-col gap-[64px]'>
                <SectionHeader
                    title="Explore Cities"
                    browseText="Browse All Cities"
                />

                <div className="flex flex-col gap-[32px]">
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
            </div>
        </SectionContainer>
    )
}