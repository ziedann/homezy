'use client'

import React from 'react'
import HeroSection from './HeroSection'
import FeaturedSection from './FeaturedSection'
import BenefitsSection from './BenefitsSection'
import CategorySection from './CategorySection'
import CitiesSection from './CitiesSection'
import AgentsSection from './AgentsSection'
import TestimonialSection from './TestimonialSection'
import CtaSection from './CtaSection'

export default function HomePage() {
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