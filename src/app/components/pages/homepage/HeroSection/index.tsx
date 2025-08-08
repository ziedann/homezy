'use client'

import React from 'react'
import Image from 'next/image'
import homeIcon1 from '@assets/icons/home-icon-1.webp'
import homeIcon2 from '@assets/icons/home-icon-2.webp'
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
    <div className='relative lg:min-h-[1100px] md:min-h-[900px] min-h-[800px] w-full overflow-hidden bg-[#F7F2FF]'>
      {/* Background Pattern and Image */}
      <div className='absolute w-full h-[1000px] lg:top-[230px] md:top-[180px] top-[180px]'>
        {/* Pattern Background */}
        <div className='absolute inset-0 z-0 lg:top-0 md:top-[300px] top-[400px]'>
          <PatternHero className='w-full h-full' />
        </div>

        {/* Hero Image */}
        <div className='absolute inset-0 lg:top-[260px] md:top-[460px] top-[600px] z-10'>
          <div className='w-full'>
            <Image
              src={HeroImage}
              alt='Modern house exterior'
              className='w-full lg:h-[620px] md:h-[400px] h-[300px] object-cover'
              width={1920}
              height={520}
              priority
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='relative z-20 mx-auto lg:max-w-[1160px] md:max-w-[720px] w-[90%] min-h-fit pb-[400px] lg:mt-[56px] md:mt-[48px] mt-[32px]'>
        {/* Hero Content */}
        <div className='flex flex-col lg:flex-row items-start justify-between'>
          {/* Mobile & Tablet Heading Layout (Absolute Positioning) */}
          <div className='relative lg:hidden w-full'>
            <div className='absolute left-0 top-0 w-full md:w-[600px]'>
              <HeadingLine
                text="We help people"
                className='justify-start'
              />
            </div>
            <div className='absolute left-0 top-[50px] flex items-center gap-[4px]'>
              <Image 
                src={homeIcon1}
                alt="Decorative home icon"
                className='w-[98px] h-[48px] md:w-[110px] md:h-[60px] lg:w-[122px] lg:h-[70px]'
                width={122}
                height={70}
              />
              <div className='w-full md:w-[600px]'>
                <HeadingLine
                  text="to realize"
                  className='justify-start'
                />
              </div>
            </div>
            <div className='absolute left-0 top-[100px] w-full md:w-[600px]'>
              <HeadingLine
                text="their dream"
                className='justify-start flex-row'
              />
            </div>
            <div className='absolute left-0 top-[148px] w-full md:w-[600px]'>
              <HeadingLine
                text="property"
                className='justify-start'
              />
            </div>
            <div className='absolute top-[150px] left-[160px] md:right-[120px]'>
              <Image 
                src={homeIcon2}
                alt="Decorative home icon"
                className='w-[98px] h-[48px] md:w-[110px] md:h-[60px]'
                width={110}
                height={60}
              />
            </div>
          </div>

          {/* Desktop Heading Layout */}
          <div className='hidden lg:flex lg:flex-col gap-2'>
            <HeadingLine
              text="We help people"
              className='flex-row justify-start'
              icon={
                <Image 
                  src={homeIcon1}
                  alt="Decorative home icon"
                  className='w-[122px] h-[70px]'
                  width={122}
                  height={70}
                />
              }
            />
            <HeadingLine text="to realize their dream" />
            <HeadingLine
              text="property"
              icon={
                <Image 
                  src={homeIcon2}
                  alt="Decorative home icon"
                  className='w-[122px] h-[70px] mt-2'
                  width={122}
                  height={70}
                />
              }
            />
          </div>

          <div className='max-w-[372px] md:max-w-[450px] self-start lg:self-center mt-[230px] md:mt-[260px] lg:mt-0'>
            <p className='font-hanken text-[20px] text-[#686A79] leading-[30px] font-light text-left lg:text-left'>
              We are creative people who provide the best way to you who want to have a new comfortable and suitable place to live
            </p>
          </div>
        </div>

        {/* Search Card */}
        <div className='relative z-30 w-full border border-[#191A23] rounded-[15px] p-[20px] bg-white flex-col lg:flex-row mt-[83px] md:mt-[100px] lg:shadow-sm shadow-none gap-[10px]'>
          <div className='flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-[32px] md:gap-[24px]'>
            <SearchInfo
              icon={<LocationIcon />}
              label="Location"
              value="California, US"
              className="md:col-span-1"
            />
            <SearchInfo
              icon={<DollarIcon />}
              label="Price"
              value="$1500-2500"
              className="md:col-span-1"
            />
            <SearchInfo
              icon={<HouseIcon />}
              label="Type of Property"
              value="Apartment"
              className="md:col-span-1"
            />
            <ButtonText
             variant="primary" 
             className='w-full md:col-span-1 lg:w-auto'>
              Browse Property
            </ButtonText>
          </div>
        </div>
      </div>
    </div>
  )
}