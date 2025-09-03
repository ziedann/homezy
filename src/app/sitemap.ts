import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://homezy-zidan.vercel.app'
  const currentDate = new Date()
  
  // Static pages with enhanced priorities and frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search-property`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Category pages for better SEO structure
  const categoryPages = [
    'houses', 'apartments', 'commercial', 'luxury-homes', 'condos'
  ].map(category => ({
    url: `${baseUrl}/search-property?category=${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Location-based pages for local SEO
  const locationPages = [
    'new-york', 'los-angeles', 'chicago', 'houston', 'miami', 
    'san-francisco', 'boston', 'seattle', 'denver', 'atlanta'
  ].map(city => ({
    url: `${baseUrl}/search-property?location=${city}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Dynamic property pages - enhanced with better SEO URLs
  const propertyPages = Array.from({ length: 9 }, (_, i) => {
    const propertyTitles = [
      'luxury-beach-front-house-malibu',
      'modern-downtown-apartment-manhattan', 
      'spacious-family-home-brooklyn',
      'contemporary-studio-chelsea',
      'elegant-townhouse-upper-east-side',
      'waterfront-loft-greenwich',
      'penthouse-suite-tribeca',
      'charming-brownstone-west-village',
      'luxury-condo-soho'
    ]
    
    return {
      url: `${baseUrl}/property/${propertyTitles[i]}`,
      lastModified: new Date(currentDate.getTime() - (i * 24 * 60 * 60 * 1000)), // Stagger dates
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })

  // Price range pages for long-tail SEO
  const priceRangePages = [
    { range: 'under-500k', priority: 0.5 },
    { range: '500k-1m', priority: 0.6 },
    { range: '1m-2m', priority: 0.5 },
    { range: 'luxury-above-2m', priority: 0.4 }
  ].map(({ range, priority }) => ({
    url: `${baseUrl}/search-property?price=${range}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority,
  }))

  return [
    ...staticPages, 
    ...categoryPages, 
    ...locationPages, 
    ...propertyPages, 
    ...priceRangePages
  ]
}
