import type { Metadata } from 'next'
import PropertyDetailClient from './PropertyDetailClient'

// Import images for metadata
import DetailImage1 from "@assets/images/detail-image-1.png";

type Props = {
  params: { slug: string }
}

// Generate metadata for each property page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug
  
  // Fetch property data for metadata
  try {
    // This would typically be a direct database call or API call
    // For now, we'll create basic metadata and enhance it when the property loads
    const propertyTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    
    return {
      title: `${propertyTitle} | Homezy`,
      description: `Discover this amazing property: ${propertyTitle}. View details, schedule a tour, and find your dream home with Homezy.`,
      keywords: [`${propertyTitle}`, 'property for sale', 'real estate', 'homes', 'apartments'],
      openGraph: {
        title: `${propertyTitle} | Homezy`,
        description: `Discover this amazing property: ${propertyTitle}. View details, schedule a tour, and find your dream home with Homezy.`,
        url: `https://homezy-zidan.vercel.app/property/${slug}`,
        type: 'website',
        images: [
          {
            url: DetailImage1.src,
            width: 1200,
            height: 630,
            alt: propertyTitle,
          },
        ],
      },
      twitter: {
        title: `${propertyTitle} | Homezy`,
        description: `Discover this amazing property: ${propertyTitle}. View details, schedule a tour, and find your dream home with Homezy.`,
        images: [DetailImage1.src],
      },
      alternates: {
        canonical: `/property/${slug}`,
      },
    }
  } catch (error) {
    // Fallback metadata
    return {
      title: 'Property Details | Homezy',
      description: 'Discover amazing properties with Homezy. View details, schedule tours, and find your dream home.',
    }
  }
}

export default function PropertyDetailPage() {
  return <PropertyDetailClient />
}







