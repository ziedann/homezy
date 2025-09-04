'use client'

import React from 'react'
import { Metadata } from 'next'
import HeroSection from '@/app/components/sections/HeroSection'
import FeaturedSection from '@/app/components/sections/FeaturedSection'
import BenefitsSection from '@/app/components/sections/BenefitsSection'
import CategorySection from '@/app/components/sections/CategorySection'
import CitiesSection from '@/app/components/sections/CitiesSection'
import AgentsSection from '@/app/components/sections/AgentsSection'
import TestimonialSection from '@/app/components/sections/TestimonialSection'
import CtaSection from '@/app/components/sections/CtaSection'

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Homezy",
    "url": "https://homezy-zidan.vercel.app",
    "description": "Professional real estate platform helping people find their dream properties",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://homezy-zidan.vercel.app/search-property?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Real Estate Property Search",
    "provider": {
      "@type": "Organization",
      "name": "Homezy"
    },
    "serviceType": "Real Estate",
    "description": "Professional real estate search service helping clients find houses, apartments, and commercial properties",
    "areaServed": "United States"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
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
