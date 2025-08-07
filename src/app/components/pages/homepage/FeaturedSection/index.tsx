import React from 'react'
import FeaturedImage1 from '@/app/assets/images/featured-listing-1.png'
import FeaturedImage2 from '@/app/assets/images/featured-listing-2.png'
import FeaturedImage3 from '@/app/assets/images/featured-listing-3.png'
import PropertyCard from '@/app/components/ui/PropertyCard'
import SectionContainer from '@/app/components/ui/SectionContainer'
import SectionHeader from '@/app/components/ui/SectionHeader'

export default function FeaturedSection() {
  return (
    <SectionContainer>
      <div className='flex flex-col gap-8'>
        <SectionHeader 
          title="Featured Properties"
          browseText="Browse All Featured"
        />
        
        {/* Property Cards */}
        <div className="flex lg:flex-row flex-col gap-[32px]">
          <PropertyCard 
            price="$15,000"
            title="Beach Pros Realty Inc."
            location="37 Ambleside Gardens, Ilford, IG4 5HH"
            beds={3}
            baths={2}
            area="5x7 m²"
            image={FeaturedImage1}
            isFeatured={true}
            isMonthly={false}
          />
          <PropertyCard 
            price="$ 4,299"
            title="Beacon Homes LLC"
            location="3 Leame Close, Hull, HU3 6ND"
            beds={3}
            baths={2}
            area="5x7 m²"
            image={FeaturedImage2}
            isFeatured={true}
            isMonthly={true}
          />
          <PropertyCard 
            price="$ 5,099"
            title="Herringbone Realty"
            location="28B Highgate Road, London, NW5 1NS"
            beds={3}
            baths={2}
            area="5x7 m²"
            image={FeaturedImage3}
            isFeatured={true}
            isMonthly={true}
          />
        </div>
      </div>
    </SectionContainer>
  )
}