import React from "react";
import HeroSection from "./components/pages/homepage/HeroSection";
import FeaturedSection from "./components/pages/homepage/FeaturedSection";
import BenefitsSection from "./components/pages/homepage/BenefitsSection";
import CategorySection from "./components/pages/homepage/CategorySection";
import CitiesSection from "./components/pages/homepage/CitiesSection";
import AgentsSection from "./components/pages/homepage/AgentsSection";
import TestimonialSection from "./components/pages/homepage/TestimonialSection";
import CtaSection from "./components/pages/homepage/CtaSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedSection />
      <BenefitsSection />
      <CategorySection />
      <CitiesSection />
      <AgentsSection />
      <TestimonialSection />
      <CtaSection />
    </main>
  );
}
