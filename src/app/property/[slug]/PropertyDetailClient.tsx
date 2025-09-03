"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Property } from "@/app/types/search-property";
import SectionContainer from "@/app/components/ui/SectionContainer";
import PropertyCard from "@/app/components/ui/PropertyCard";
import Bed from "@assets/icons/bed.svg";
import Bath from "@assets/icons/bath.svg";
import Area from "@assets/icons/surface-area.svg";
import Repair from "@assets/icons/repair.svg";
import Location from "@assets/icons/location.svg";
import Agent1 from "@assets/images/agent-1.png";
import Play from "@assets/icons/play.svg";
import ArrowLeft from "@assets/icons/arrow-left.svg";
import Sparkles from "@assets/icons/sparkles.svg";
import Gallery from "@assets/icons/gallery.svg";
import Share from "@assets/icons/share.svg";
import Phone from "@assets/icons/phone.svg";
import Call from "@assets/icons/call.svg";
import CalendarPurple from "@assets/icons/calendar-purple.svg";
import ClockPurple from "@assets/icons/clock-purple.svg";
import MessageText from "@assets/icons/message-text.svg";

// Import high-quality images
import DetailImage1 from "@assets/images/detail-image-1.png";
import DetailImage2 from "@assets/images/detail-image-2.png";
import DetailImage3 from "@assets/images/detail-image-3.png";
import FeaturedListing1 from "@assets/images/featured-listing-1.png";
import FeaturedListing2 from "@assets/images/featured-listing-2.png";
import FeaturedListing3 from "@assets/images/featured-listing-3.png";

export default function PropertyDetailClient() {
  const params = useParams();
  const slug = params.slug as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Accordion state management
  const [accordionState, setAccordionState] = useState({
    interiorDetails: true,  // Default open
    propertySize: false,
    landArea: false,
    yearBuild: false
  });

  const [similarProperties, setSimilarProperties] = useState<any[]>([]);

  // Toggle accordion function
  const toggleAccordion = (section: keyof typeof accordionState) => {
    setAccordionState(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Generate company name based on property title
  const getCompanyName = (title: string) => {
    const companies = [
      'Beach Pros Realty Inc.',
      'Beacon Homes LLC',
      'Herringbone Realty',
      'Manhattan Properties',
      'Urban Living Co.',
      'Prime Real Estate'
    ];
    
    // Use title hash to consistently assign company
    const hash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return companies[Math.abs(hash) % companies.length];
  };

  useEffect(() => {
    const fetchPropertyDetail = async () => {
      try {
        setLoading(true);

        // First fetch all properties
        const response = await fetch("/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();

        // Generate slug for each property and find the matching one
        const enhancedProperties = data.properties.map(
          (property: Property, index: number) => {
            // Extract category from title
            let category = "apartment";
            if (property.title.toLowerCase().includes("studio")) {
              category = "studio";
            } else if (property.title.toLowerCase().includes("loft")) {
              category = "loft";
            } else if (property.title.toLowerCase().includes("penthouse")) {
              category = "penthouse";
            } else if (property.title.toLowerCase().includes("realty")) {
              category = "realty";
            }

            // Generate slug from title
            const generatedSlug = property.title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
              .trim();

            return {
              ...property,
              isFeatured: index === 0 || index === 2,
              type: index % 2 === 0 ? "sale" : ("rent" as "sale" | "rent"),
              category: category,
              yearBuilt: 2020 + (index % 5),
              priceValue: parseInt(property.price.replace(/[^0-9]/g, "")) || 0,
              slug: generatedSlug,
            };
          }
        );

        // Find the property with matching slug
        const foundProperty = enhancedProperties.find(
          (prop: any) => prop.slug === slug
        );

        if (!foundProperty) {
          throw new Error("Property not found");
        }

        setProperty(foundProperty);
        
        // Get similar properties (exclude current property and take first 3)
        const similarProps = enhancedProperties
          .filter((p: any) => p.id !== foundProperty.id)
          .slice(0, 3)
          .map((p: any) => ({
            ...p,
            company: getCompanyName(p.title),
          }));
        setSimilarProperties(similarProps);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPropertyDetail();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back button skeleton */}
          <div className="mb-6">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Image skeleton */}
          <div className="aspect-[16/9] bg-gray-200 rounded-[24px] animate-pulse mb-8"></div>

          {/* Content skeleton */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
            <div className="bg-white rounded-[24px] p-6 h-fit">
              <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse mb-4"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Head>
          <title>Property Not Found | Homezy</title>
          <meta name="description" content="The property you are looking for does not exist or has been removed." />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="text-2xl font-bold text-[#191A23] mb-2">
            Property Not Found
          </h1>
          <p className="text-[#6B7280] mb-6">
            {error || "The property you are looking for does not exist."}
          </p>
          <Link
            href="/search-property"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#191A23] text-white rounded-[16px] hover:bg-[#2A2B3D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  // Generate structured data for property
  const propertySchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": `${property.beds} bedroom, ${property.baths} bathroom property located in ${property.location}. Price: ${property.price}`,
    "url": `https://homezy-zidan.vercel.app/property/${slug}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.location,
      "addressCountry": "US"
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.area,
      "unitCode": "MTK"
    },
    "numberOfRooms": property.beds,
    "numberOfBathroomsTotal": property.baths,
    "yearBuilt": property.yearBuilt || 2022,
    "offers": {
      "@type": "Offer",
      "price": property.price.replace(/[^0-9]/g, ''),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": "Edwin Martins",
        "jobTitle": "Property Advisor"
      }
    },
    "image": [
      "https://homezy-zidan.vercel.app" + DetailImage1.src,
      "https://homezy-zidan.vercel.app" + DetailImage2.src,
      "https://homezy-zidan.vercel.app" + DetailImage3.src
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://homezy-zidan.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Search Properties",
        "item": "https://homezy-zidan.vercel.app/search-property"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": property.title,
        "item": `https://homezy-zidan.vercel.app/property/${slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{property.title} | Homezy</title>
        <meta name="description" content={`${property.beds} bedroom, ${property.baths} bathroom property in ${property.location}. Price: ${property.price}. Contact us to schedule a viewing.`} />
        <meta name="keywords" content={`${property.title}, property for sale, ${property.location}, ${property.beds} bedroom, real estate`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${property.title} | Homezy`} />
        <meta property="og:description" content={`${property.beds} bedroom, ${property.baths} bathroom property in ${property.location}. Price: ${property.price}.`} />
        <meta property="og:url" content={`https://homezy-zidan.vercel.app/property/${slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://homezy-zidan.vercel.app${DetailImage1.src}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={property.title} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${property.title} | Homezy`} />
        <meta name="twitter:description" content={`${property.beds} bedroom, ${property.baths} bathroom property in ${property.location}. Price: ${property.price}.`} />
        <meta name="twitter:image" content={`https://homezy-zidan.vercel.app${DetailImage1.src}`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://homezy-zidan.vercel.app/property/${slug}`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(propertySchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>
      <SectionContainer>
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/search-property"
            className="inline-flex items-center gap-2 text-[#191A23] hover:text-[#2A2B3D] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[18px] font-semibold">Back To Search</span>
          </Link>
        </div>

        {/* Property Images Gallery */}
        <div className="mb-8">
          {/* Desktop Layout */}
          <div className="hidden md:flex gap-[32px] h-[500px] w-full max-w-[1160px] mx-auto">
            {/* Main Large Image - Left Side */}
            <div className="relative w-[763px] h-full rounded-[15px] overflow-hidden">
              <Image
                src={DetailImage1}
                alt={property.title}
                width={763}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Right Side Images Column */}
            <div className="w-[365px] h-full flex flex-col gap-[32px]">
              {/* Top Right Image */}
              <div className="relative h-[234px] rounded-[15px] overflow-hidden">
                <Image
                  src={DetailImage2}
                  alt="Interior view"
                  width={365}
                  height={234}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Right Image with Show All Photos overlay */}
              <div className="relative h-[234px] rounded-[15px] overflow-hidden">
                <Image
                  src={DetailImage3}
                  alt="Kitchen view"
                  width={365}
                  height={234}
                  className="w-full h-full object-cover"
                />
                {/* Show All Photos Button Overlay */}
                <div className="absolute inset-0 ">
                  <div className="absolute bottom-[16px] right-[16px]">
                    <button className="flex items-center gap-[8px] px-[20px] py-[16px] bg-white border border-[#191A23] rounded-[15px]">
                      <Gallery className="w-4 h-4 text-[#191A23]" />
                      <span className="text-[16px] leading-[20px] font-bold font-hanken text-[#191A23]">
                        Show All Photos
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex gap-[8px] h-[169px] mb-[16px]">
              {/* Main Large Image - Left Side */}
              <div className="relative flex-[2] rounded-[10px] overflow-hidden">
                <Image
                  src={DetailImage1}
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Right Side Images Column */}
              <div className="flex-1 flex flex-col gap-[8px]">
                {/* Top Right Image */}
                <div className="relative flex-1 rounded-[10px] overflow-hidden">
                  <Image
                    src={DetailImage2}
                    alt="Interior view"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Bottom Right Image */}
                <div className="relative flex-1 rounded-[10px] overflow-hidden">
                  <Image
                    src={DetailImage3}
                    alt="Kitchen view"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Full Width Show All Photos Button */}
            <button className="w-full flex items-center justify-center gap-[6px] px-[16px] py-[12px] bg-white border border-[#191A23] rounded-[15px] hover:bg-gray-50 transition-colors">
              <Gallery className="w-4 h-4 text-[#191A23]" />
              <span className="text-[14px] leading-[18px] font-bold font-hanken text-[#191A23]">
                Show All Photos
              </span>
            </button>
          </div>
        </div>

        {/* Property Info Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Property Information */}
          <div className="lg:col-span-2">
            {/* Header with Share Button */}
            <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-[24px] mb-[32px]">
              <div className="flex flex-col gap-[8px]">
              <h1 className="text-[28px] lg:text-[40px] leading-[36px] lg:leading-[48px] font-bold font-syne text-[#191A23]">
                {property.title}
              </h1>
              {/* Location */}
              <div className="text-[20px] leading-[30px] text-[#686A79] font-light font-hanken">
                {property.location}
              </div>
              </div>
              <button className="flex items-center gap-[8px] lg:px-[32px] lg:py-[16px] px-[24px] py-[10px] border border-[#191A23] text-[#191A23] rounded-[15px] hover:bg-gray-50 transition-colors">
                <Share className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>

            {/* Property Features */}
            <div className="bg-[#F7F2FF] border border-[#E7DCFF] rounded-[15px] lg:py-[20px] lg:px-[40px] py-[24px] px-[32px] mb-[56px]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-[14px] font-light text-[#686A79] font-hanken mb-[8px]">
                    {property.beds} Bedrooms
                  </div>
                  <div className="flex items-center justify-start gap-[8px]">
                    <Bed className="w-5 h-5 text-[#191A23]" />
                    <span className="text-[16px] leading-[20px] font-bold text-[#191A23] font-hanken">
                      {property.beds}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-light text-[#686A79] font-hanken mb-[8px]">
                    Bathrooms
                  </div>
                  <div className="flex items-center justify-start gap-[8px]">
                    <Bath className="w-5 h-5 text-[#191A23]" />
                    <span className="text-[16px] leading-[20px] font-bold text-[#191A23] font-hanken">
                      {property.baths}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-light text-[#686A79] font-hanken mb-[8px]">
                    Square Area
                  </div>
                  <div className="flex items-center justify-start gap-[8px]">
                    <Area className="w-5 h-5 text-[#191A23]" />
                    <span className="text-[16px] leading-[20px] font-bold text-[#191A23] font-hanken">
                      6x8 m²
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-light text-[#686A79] font-hanken mb-[8px]">
                    Square Area
                  </div>
                  <div className="flex items-center justify-start gap-[8px]">
                    <Repair className="w-5 h-5 text-[#191A23]" />
                    <span className="text-[16px] leading-[20px] font-bold text-[#191A23] font-hanken">
                      Modern Loft
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-[24px]">
              <h3 className="text-[20px] leading-[28px] lg:text-[24px] lg:leading-[32px] font-semibold font-syne text-[#191A23]">
                Description
              </h3>
              <div className="text-[#686A79] font-hanken text-[16px] font-light leading-[26px]">
                <p>
                  First time on market in 40 years. Detached two unit Victorian
                  - vacant - with excellent bones on rear of huge (4552 sq ft)
                  flat sunny lot on fabulous quiet block accessible to GG Park
                  and neighborhood amenities. This property is tucked away
                  behind a wood fence, and has a curb cut which provides for
                  ample parking. Development opportunity? Income property with
                  huge play space or garden? ADU? The possibilities on this
                  special parcel are virtually endless. Large storage and
                  laundry under rear of building. Quiet block between Arguello &
                  Willard North. Two blocks to Rossi Park to the north, and two
                  blocks to GG Park and the Conservatory of Flowers to the
                  south. Close to multiple markets, cafes, restaurants,
                  transportation.
                </p>
              </div>

              <button className="inline-flex items-center gap-[8px] text-[#111827] font-semibold text-[16px] hover:underline">
                <Play className="w-4 h-4" />
                <p className="text-[16px] leading-[20px] font-bold">View Video Tour</p>
              </button>
            </div>
            <div className="hidden lg:block w-full h-[1px] bg-[#CCD0D8] my-[56px]"></div>

          </div>
          

                     {/* Right Column - Price & Tour Request */}
           <div>
             <div className="bg-[#F3F2FF] rounded-[20px] p-[24px] sticky top-4 border border-[#E5E4FF]">
               {/* Price */}
               <div className="mb-[24px]">
                 <div className="text-[14px] text-[#8B8B8B] font-medium mb-[8px]">Price</div>
                 <div className="text-[28px] font-bold text-[#1F1F1F]">
                   {property.price}
                 </div>
               </div>

               <hr className="border-[#E5E4FF] mb-[24px]" />

               {/* Request a home tour */}
               <div>
                 <h3 className="text-[18px] font-bold text-[#1F1F1F] mb-[16px]">
                   Request a home tour
                 </h3>

                 {/* Tour Type Tabs */}
                 <div className="flex mb-[20px] border-b border-[#E8E8E8]">
                   <button className="flex items-center gap-2 px-0 py-3 text-[#1F1F1F] text-[14px] font-medium relative border-b-2 border-[#1F1F1F] mr-6">
                     <CalendarPurple className="w-4 h-4" style={{filter: 'brightness(0) saturate(0)'}} />
                     <span>Schedule a Tour</span>
                   </button>
                   <button className="flex items-center gap-2 px-0 py-3 text-[#BEBEBE] text-[14px] font-medium hover:text-[#1F1F1F] transition-colors">
                     <MessageText className="w-4 h-4 text-[#BEBEBE]" />
                     <span>Request Quote</span>
                   </button>
                 </div>

                 {/* Form */}
                 <form className="space-y-4">
                   {/* Phone Number */}
                   <div className="relative">
                     <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                       <Call className="w-4 h-4 text-[#B592FF]" />
                       <span className="text-[14px] text-[#B592FF] font-medium">Phone Number</span>
                     </div>
                     <select className="w-full pl-[130px] pr-10 py-4 border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#B592FF] transition-colors text-[14px] text-[#BEBEBE] bg-white appearance-none">
                       <option></option>
                     </select>
                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                       <svg className="w-4 h-4 text-[#BEBEBE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                     </div>
                   </div>

                   {/* Select Date */}
                   <div className="relative">
                     <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                       <CalendarPurple className="w-4 h-4" />
                       <span className="text-[14px] text-[#B592FF] font-medium">Select Date</span>
                     </div>
                     <select className="w-full pl-[115px] pr-10 py-4 border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#B592FF] transition-colors text-[14px] text-[#BEBEBE] bg-white appearance-none">
                       <option></option>
                     </select>
                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                       <svg className="w-4 h-4 text-[#BEBEBE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                     </div>
                   </div>

                   {/* Time */}
                   <div className="relative">
                     <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                       <ClockPurple className="w-4 h-4" />
                       <span className="text-[14px] text-[#B592FF] font-medium">11:00 AM</span>
                     </div>
                     <select className="w-full pl-[95px] pr-10 py-4 border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#B592FF] transition-colors text-[14px] text-[#BEBEBE] bg-white appearance-none">
                       <option></option>
                     </select>
                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                       <svg className="w-4 h-4 text-[#BEBEBE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                     </div>
                   </div>

                   {/* Phone Input */}
                   <div className="relative">
                     <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                       <MessageText className="w-4 h-4 text-[#B592FF]" />
                     </div>
                     <input
                       type="tel"
                       placeholder="+ 1 234 567 890"
                       className="w-full pl-12 pr-4 py-4 border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#B592FF] transition-colors text-[14px] bg-white text-[#1F1F1F] placeholder-[#BEBEBE]"
                     />
                   </div>

                   <button
                     type="submit"
                     className="w-full bg-[#1F1F1F] text-white py-4 rounded-[12px] font-bold hover:bg-[#2F2F2F] transition-colors text-[14px] mt-6"
                   >
                     Schedule a Tour
                   </button>
                 </form>
               </div>
             </div>
           </div>
        </div>

        {/* Separator Line - Desktop: Full width, Mobile: Below price card */}
        <div className="lg:hidden w-full h-[1px] bg-[#CCD0D8] mb-8"></div>

        {/* Property Details Section - Same width as left column */}
        <div className="lg:w-2/3 w-full mb-8">
          <h2 className="text-[24px] lg:text-[28px] font-bold font-syne text-[#191A23] mb-6">
            Property Details
          </h2>
          
          <div className="space-y-[32px]">
            {/* Interior Details Accordion */}
            <div className="border border-[#E5E7EB] rounded-[15px] overflow-hidden bg-white">
              {/* Header - Colored Background */}
              <button 
                onClick={() => toggleAccordion('interiorDetails')}
                className="w-full flex items-center justify-between p-[16px] bg-[#F7F2FF] hover:bg-[#F0E9FF] transition-colors"
              >
                <p className="text-[18px] leading-[22px] font-bold text-[#191A23]">Interior Details</p>
                <svg 
                  className={`w-5 h-5 text-[#191A23] transform transition-transform duration-200 ${
                    accordionState.interiorDetails ? 'rotate-180' : 'rotate-0'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Interior Details Content - White Background */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
                  accordionState.interiorDetails 
                    ? 'max-h-[500px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-[16px] py-[16px]">
                <div className="space-y-[16px]">
                  <div>
                    <h4 className="text-[16px] leading-[26px] font-light text-[#9CA3AF] mb-[16px]">Interior Details</h4>
                    <div className="flex flex-col lg:flex-row lg:gap-[8px] gap-[8px]">
                      <div className="flex items-center lg:w-[274px]">
                        <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                        <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Basement: Partial,Storage Space</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                        <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Number of Rooms: 10</p>
                      </div>
                    </div>
                  </div>

                  {/* Separator Line */}
                  <div className="w-full h-[1px] bg-[#D6D7E0]"></div>

                  <div>
                    <h4 className="text-[16px] leading-[26px] font-light text-[#9CA3AF] mb-[16px]">Beds & Baths</h4>
                    <div className="flex flex-col lg:flex-row lg:gap-[8px] gap-[8px]">
                      <div className="flex items-center lg:w-[274px]">
                        <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                        <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Bedrooms: 5</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                        <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Bathrooms: 5</p>
                      </div>
                    </div>
                  </div>

                  {/* Separator Line */}
                  <div className="w-full h-[1px] bg-[#D6D7E0]"></div>

                  <div>
                    <h4 className="text-[16px] leading-[26px] font-light text-[#9CA3AF] mb-[16px]">Dimensions and Layout</h4>
                    <div className="flex items-center">
                      <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                      <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Living Area: 2500 Square Feet</p>
                    </div>
                  </div>

                  {/* Separator Line */}
                  <div className="w-full h-[1px] bg-[#D6D7E0]"></div>

                  <div>
                    <h4 className="text-[16px] leading-[26px] font-light text-[#9CA3AF] mb-[16px]">Heating & Cooling</h4>
                    <div className="flex flex-col lg:flex-row lg:gap-[8px] gap-[8px]">
                      <div className="flex items-center lg:w-[274px]">
                        <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                        <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Heating: Central</p>
                      </div>
                      <div className="flex items-center lg:w-[218px]">
                        <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                        <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Has Heating</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                        <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Heating Fuel: Central</p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Property Size Accordion */}
            <div className="border border-[#E5E7EB] rounded-[16px] overflow-hidden bg-white">
              <button 
                onClick={() => toggleAccordion('propertySize')}
                className="w-full flex items-center justify-between p-[16px] bg-[#F7F2FF] hover:bg-[#F0E9FF] transition-colors"
              >
                <p className="text-[18px] leading-[22px] font-bold text-[#191A23]">Property Size</p>
                <svg 
                  className={`w-5 h-5 text-[#191A23] transform transition-transform duration-200 ${
                    accordionState.propertySize ? 'rotate-180' : 'rotate-0'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Property Size Content */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
                  accordionState.propertySize 
                    ? 'max-h-[200px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-[16px] py-[16px]">
                  <div className="space-y-[8px]">
                    <div>
                      <h4 className="text-[16px] leading-[26px] font-light text-[#9CA3AF] mb-[8px]">Property Size Details</h4>
                      <div className="flex gap-[8px]">
                        <div className="flex items-center w-[274px]">
                          <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                          <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Total Area: 3200 sq ft</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                          <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Floor Count: 2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Land Area Accordion */}
            <div className="border border-[#E5E7EB] rounded-[16px] overflow-hidden bg-white">
              <button 
                onClick={() => toggleAccordion('landArea')}
                className="w-full flex items-center justify-between p-[16px] bg-[#F7F2FF] hover:bg-[#F0E9FF] transition-colors"
              >
                <p className="text-[18px] leading-[22px] font-bold text-[#191A23]">Land Area</p>
                <svg 
                  className={`w-5 h-5 text-[#191A23] transform transition-transform duration-200 ${
                    accordionState.landArea ? 'rotate-180' : 'rotate-0'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Land Area Content */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
                  accordionState.landArea 
                    ? 'max-h-[200px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-[16px] py-[16px]">
                  <div className="space-y-[8px]">
                    <div>
                      <h4 className="text-[16px] leading-[26px] font-light text-[#9CA3AF] mb-[8px]">Land Area Details</h4>
                      <div className="flex gap-[8px]">
                        <div className="flex items-center w-[274px]">
                          <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                          <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Lot Size: 0.25 acres</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                          <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Land Type: Residential</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Year Build Accordion */}
            <div className="border border-[#E5E7EB] rounded-[16px] overflow-hidden bg-white">
              <button 
                onClick={() => toggleAccordion('yearBuild')}
                className="w-full flex items-center justify-between p-[16px] bg-[#F7F2FF] hover:bg-[#F0E9FF] transition-colors"
              >
                <p className="text-[18px] leading-[22px] font-bold text-[#191A23]">Year Build</p>
                <svg 
                  className={`w-5 h-5 text-[#191A23] transform transition-transform duration-200 ${
                    accordionState.yearBuild ? 'rotate-180' : 'rotate-0'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Year Build Content */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
                  accordionState.yearBuild 
                    ? 'max-h-[200px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-[16px] py-[16px]">
                  <div className="space-y-[8px]">
                    <div>
                      <h4 className="text-[16px] leading-[26px] font-light text-[#9CA3AF] mb-[8px]">Construction Details</h4>
                      <div className="flex gap-[8px]">
                        <div className="flex items-center w-[274px]">
                          <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                          <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Year Built: {property?.yearBuilt || 2022}</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-[6px] h-[6px] bg-[#191A23] rounded-full mr-[8px]"></div>
                          <p className="text-[16px] leading-[20px] text-[#191A23] font-bold">Age: {new Date().getFullYear() - (property?.yearBuilt || 2022)} years</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="w-full h-[1px] bg-[#CCD0D8] my-[56px]"></div>

        </div>
                {/* Separator Line */}
        
                  {/* Listing by Agent Section */}
          <div className="lg:w-2/3 w-full mb-[24px]">
            <h2 className="text-[24px] lg:text-[28px] font-bold font-syne text-[#191A23] mb-6">
              Listing by Agent
            </h2>
            
            <div className="bg-[#F7F2FF] border border-[#E7DCFF] rounded-[15px] p-[24px]">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[24px] lg:gap-[16px]">
                {/* Agent Info */}
                <div className="flex items-center gap-[16px]">
                  {/* Agent Avatar */}
                  <div className="w-[64px] h-[64px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={Agent1} 
                      alt="Edwin Martins"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Agent Details */}
                  <div>
                    <h3 className="text-[20px] leading-[24px] font-bold font-syne text-[#191A23] mb-[4px]">
                      Edwin Martins
                    </h3>
                    <p className="text-[16px] leading-[20px] font-light text-[#667389] font-hanken">
                      Property Advisor
                    </p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col lg:flex-row gap-[12px] lg:gap-[16px] w-full lg:w-auto">
                  <button className="w-full lg:w-auto px-[24px] py-[16px] border border-[#191A23] text-[#191A23] rounded-[15px] hover:bg-[#F0E9FF] transition-colors">
                    <span className="text-[16px] leading-[20px] font-bold">Ask Question</span>
                  </button>
                  <button className="w-full lg:w-auto px-[24px] py-[16px] border border-[#191A23] text-[#191A23] rounded-[15px] hover:bg-[#F0E9FF] transition-colors">
                    <span className="text-[16px] leading-[20px] font-bold">Contact Agent</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Map View Section */}
          <div className="lg:w-2/3 w-full mb-[24px]">
            <h2 className="text-[24px] lg:text-[28px] font-bold font-syne text-[#191A23] mb-6">
              Map View
            </h2>
            
            <div className="w-full h-[300px] lg:h-[400px] rounded-[15px] overflow-hidden border border-[#E5E7EB]">
              <MapContainer
                center={[40.7589, -73.9851]} // New York coordinates
                zoom={12}
                scrollWheelZoom={false}
                className="w-full h-full"
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>
          </div>

          {/* Similar Listings Section */}
          <div className="w-full mb-[24px]">
            <h2 className="text-[24px] lg:text-[28px] font-bold font-syne text-[#191A23] mb-6">
              Similar Listings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((property, index) => (
                <PropertyCard
                  key={index}
                  price={property.price}
                  title={property.title}
                  location={property.location}
                  beds={property.beds}
                  baths={property.baths}
                  area={property.area}
                  image={property.image}
                  isFeatured={property.isFeatured}
                  isMonthly={property.isMonthly}
                  slug={property.slug}
                  layoutMode="grid"
                />
              ))}
            </div>
          </div>
      </SectionContainer>
    </div>
  );
}

