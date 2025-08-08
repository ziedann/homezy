import React from 'react'
import BuildingIcon1 from '@/app/assets/icons/buliding-benefits-1.svg'
import BuildingIcon2 from '@/app/assets/icons/buliding-benefits-2.svg'
import BuildingIcon3 from '@/app/assets/icons/buliding-benefits-3.svg'
import CategoryCard from '@/app/components/ui/CategoryCard'
import SectionContainer from '@/app/components/ui/SectionContainer'
import SectionHeader from '@/app/components/ui/SectionHeader'

export default function CategorySection() {
  return (
    <SectionContainer>
      <div className='flex flex-col lg:gap-[64px] md:gap-[48px] gap-[32px]'>
        <SectionHeader 
          title="Featured Categories"
          browseText="Browse All Categories"
        />
        
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-[32px] gap-[24px] w-full'>
          <CategoryCard 
            icon={<BuildingIcon1 className='w-[32px] h-[32px] text-primary' />}
            title="Studio"
            listingCount="100+"
          />
          <CategoryCard 
            icon={<BuildingIcon2 className='w-[32px] h-[32px] text-primary' />}
            title="Apartment"
            listingCount="100+"
          />
          <CategoryCard 
            icon={<BuildingIcon3 className='w-[32px] h-[32px] text-primary' />}
            title="Office"
            listingCount="100+"
          />
        </div>
      </div>
    </SectionContainer>
  )
}