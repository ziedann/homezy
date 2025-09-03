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

  // Dynamic property pages - all 30 properties
  const propertyPages = Array.from({ length: 30 }, (_, i) => {
    const propertyTitles = [
      'beach-pros-realty',
      'beacon-homes-realty', 
      'downtown-apartment',
      'brooklyn-studio',
      'herringbone-realty',
      'greenwich-loft',
      'chelsea-apartment',
      'west-side-studio',
      'tribeca-penthouse',
      'cozy-east-village-studio',
      'modern-soho-loft',
      'luxury-murray-hill-apartment',
      'williamsburg-studio',
      'premium-financial-district-penthouse',
      'upper-east-side-condo',
      'brooklyn-heights-townhouse',
      'midtown-west-loft',
      'central-park-west-penthouse',
      'compact-east-harlem-studio',
      'budget-friendly-queens-studio',
      'trendy-dumbo-loft',
      'high-end-nomad-apartment',
      'luxury-times-square-penthouse',
      'charming-park-slope-apartment',
      'spacious-chelsea-condo',
      'renovated-lower-east-side-loft',
      'elite-gramercy-realty',
      'modern-flatiron-apartment',
      'exclusive-tribeca-penthouse',
      'vintage-east-village-apartment'
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
