'use client'

import React from 'react'
import HeroSection from '@/app/components/sections/HeroSection'
import FeaturedSection from '@/app/components/sections/FeaturedSection'
import BenefitsSection from '@/app/components/sections/BenefitsSection'
import CategorySection from '@/app/components/sections/CategorySection'
import CitiesSection from '@/app/components/sections/CitiesSection'
import AgentsSection from '@/app/components/sections/AgentsSection'
import TestimonialSection from '@/app/components/sections/TestimonialSection'
import CtaSection from '@/app/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedSection/>
      <BenefitsSection/>
      <CategorySection/>
      <CitiesSection/>
      <AgentsSection/>
      <TestimonialSection/>
      <CtaSection/>
    </>
  )
}
