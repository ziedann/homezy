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
    <div className='relative lg:min-h-[1100px] min-h-[10px] w-full overflow-hidden bg-[#F7F2FF]'>
      {/* Background Pattern and Image */}
      <div className='absolute w-full h-[1000px] top-[230px]'>
        {/* Pattern Background */}
        <div className='absolute inset-0 z-0 lg:top-0 top-[500px]'>
          <PatternHero className='w-full h-full' />
        </div>

        {/* Hero Image */}
        <div className='absolute inset-0 lg:top-[260px] top-[710px] z-10'>
          <div className='w-full'>
            <Image
              src={HeroImage}
              alt='Modern house exterior'
              className='lg:w-screen lg:h-[620px] h-[260px] object-cover'
              width={1920}
              height={520}
              priority
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='relative z-20 mx-auto lg:max-w-[1160px] max-w-[335px] min-h-fit pb-[400px] lg:mt-[56px] mt-[40px]'>
        {/* Hero Content */}
        <div className='flex flex-col lg:flex-row justify-between items-center'>
          {/* Mobile Heading Layout (Absolute Positioning) */}
          <div className='relative lg:hidden w-full'>
            <div className='absolute left-0 top-0 w-[335px]'>
              <HeadingLine
                text="We help people"
                className='justify-start'
              />
            </div>
            <div className='absolute left-0 top-[50px] flex items-center gap-[4px]'>
              <HomeIcon1 className='w-[98px] h-[48px] lg:w-[122px] lg:h-[70px]' />
              <div className='w-[335px]'>
                <HeadingLine
                  text="to realize"
                  className='justify-start'
                />
              </div>
            </div>
            <div className='absolute left-0 top-[100px] w-[335px]'>
              <HeadingLine
                text="their dream"
                className='justify-start flex-row'
              />
            </div>
            <div className='absolute left-0 top-[148px] w-[335px]'>
              <HeadingLine
                text="property"
                className='justify-start'
              />
            </div>
            <div className='absolute top-[150px] right-[76px]'>
              <HomeIcon2 className='w-[98px] h-[48px]' />
            </div>
          </div>

          {/* Desktop Heading Layout */}
          <div className='hidden lg:flex lg:flex-col gap-2'>
            <HeadingLine
              text="We help people"
              className='flex-row justify-start'
              icon={<HomeIcon1 className='w-[122px] h-[70px]' />}
            />
            <HeadingLine text="to realize their dream" />
            <HeadingLine
              text="property"
              icon={<HomeIcon2 className='w-[122px] h-[70px] mt-2' />}
            />
          </div>

          <div className='max-w-[372px] self-center mt-[230px] lg:mt-0'>
            <p className='font-hanken text-[20px] text-[#686A79] leading-[30px] font-light'>
              We are creative people who provide the best way to you who want to have a new comfortable and suitable place to live
            </p>
          </div>
        </div>

        {/* Search Card */}
        <div className='relative z-30 w-full border border-[#191A23] rounded-[15px] p-[20px] bg-white flex-col lg:flex-row justify-between mt-[83px] lg:shadow-sm shadow-none gap-[10px]'>
          <div className='flex flex-col lg:flex-row justify-between gap-[32px]'>
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
            <ButtonText
             variant="primary" 
             className='w-full lg:w-auto'>
              Browse Property
            </ButtonText>
          </div>
        </div>
      </div>
    </div>
  )
}