'use client'

import React from 'react'
import Image from 'next/image'
import HomeIcon1 from '@assets/icons/home-icon-1.svg'
import HomeIcon2 from '@assets/icons/home-icon-2.svg'
import LocationIcon from '@assets/icons/location.svg'
import DollarIcon from '@assets/icons/dollar-square.svg'
import HouseIcon from '@assets/icons/house.svg'
import HeroImage from '@assets/images/hero-image.png'
import PatternHero from '@assets/images/pattern-hero.svg'
import HeadingLine from '@/app/components/ui/HeadingLine'
import SearchInfo from '@/app/components/ui/SearchInfo'
import ButtonText from '@/app/components/ui/ButtonText/index'

export default function HeroSection() {
  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-[#F7F2FF]'>
      {/* Background Pattern and Image */}
      <div className='absolute w-full h-[800px] top-[230px]'>
        {/* Pattern Background */}
        <div className='absolute inset-0 z-0'>
          <PatternHero className='w-full h-full opacity-40' />
        </div>
        
        {/* Hero Image */}
        <div className='absolute inset-0 top-[280px] z-10'>
          <div className='w-full'>
            <Image
              src={HeroImage}
              alt='Modern house exterior'
              className='w-screen h-[620px] object-cover'
              width={1920}
              height={420}
              priority
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='relative z-20 mx-auto max-w-[1160px] min-h-fit pb-[400px] lg:mt-[56px]'>
        {/* Hero Content */}
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col gap-2'>
            <HeadingLine 
              text="We help people" 
              icon={<HomeIcon1 className='w-[122px] h-[70px] mt-2' />} 
            />
            <HeadingLine text="to realize their dream" />
            <HeadingLine 
              text="property" 
              icon={<HomeIcon2 className='w-[122px] h-[70px] mt-2' />} 
            />
          </div>

          <div className='max-w-[372px] self-center'>
            <p className='font-hanken text-[20px] text-[#686A79] leading-[30px] font-light'>
              We are creative people who provide the best way to you who want to have a new comfortable and suitable place to live
            </p>
          </div>
        </div>

        {/* Search Card */}
        <div className='relative z-30 w-full border border-[#191A23] rounded-[15px] p-[20px] bg-white flex justify-between mt-[83px] shadow-lg'>
          <SearchInfo
            icon={<LocationIcon />}
            label="Location"
            value="California, US"
          />
          <SearchInfo
            icon={<DollarIcon />}
            label="Price"
            value="$1500-2500"
          />
          <SearchInfo
            icon={<HouseIcon />}
            label="Type of Property"
            value="Apartment"
          />
          <ButtonText variant="primary">
            Browse Property
          </ButtonText>
        </div>
      </div>
    </div>
  )
}