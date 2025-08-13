'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import LocationIcon from '@assets/icons/location.svg'
import DollarIcon from '@assets/icons/dollar-square.svg'
import HouseIcon from '@assets/icons/house.svg'
import SearchInfo from '@/app/components/ui/SearchInfo'
import ButtonText from '@/app/components/ui/ButtonText'

export default function SearchForm() {
  const router = useRouter()

  const handleBrowseProperty = () => {
    router.push('/search-property')
  }

  return (
    <div className='relative z-30 w-full border border-[#191A23] rounded-[15px] p-[20px] bg-white flex-col lg:flex-row mt-[40px] md:mt-[100px] lg:shadow-sm shadow-none gap-[10px]'>
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
          className='w-full md:col-span-1 lg:w-auto'
          onClick={handleBrowseProperty}>
          Browse Property
        </ButtonText>
      </div>
    </div>
  )
}
