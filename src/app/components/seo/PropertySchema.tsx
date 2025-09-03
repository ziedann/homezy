'use client'

interface PropertyData {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  address: {
    street?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
  };
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  floorSize?: {
    value: number;
    unit: string;
  };
  images: string[];
  agent?: {
    name: string;
    email?: string;
    phone?: string;
  };
  url: string;
}

interface PropertySchemaProps {
  property: PropertyData;
}

export default function PropertySchema({ property }: PropertySchemaProps) {
  const propertySchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": property.url,
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": property.currency || "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString(),
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address.street,
      "addressLocality": property.address.city,
      "addressRegion": property.address.state,
      "addressCountry": property.address.country,
      "postalCode": property.address.postalCode,
    },
    "additionalType": property.propertyType,
    "numberOfRooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    ...(property.floorSize && {
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.floorSize.value,
        "unitText": property.floorSize.unit,
      }
    }),
    "image": property.images,
    ...(property.agent && {
      "provider": {
        "@type": "RealEstateAgent",
        "name": property.agent.name,
        "email": property.agent.email,
        "telephone": property.agent.phone,
      }
    }),
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(propertySchema),
      }}
    />
  );
}

// Utility function to generate property schema for API data
export function generatePropertySchema(apiData: any): PropertyData {
  return {
    id: apiData.id?.toString() || '',
    title: apiData.title || apiData.name || 'Property Listing',
    description: apiData.description || `Amazing property: ${apiData.title || apiData.name}`,
    price: apiData.price || 0,
    currency: 'USD',
    address: {
      street: apiData.address || '',
      city: apiData.city || apiData.location || 'City',
      state: apiData.state || 'State',
      country: 'United States',
      postalCode: apiData.zipCode || apiData.postalCode || '',
    },
    propertyType: apiData.type || apiData.propertyType || 'Residential',
    bedrooms: apiData.bedrooms || apiData.beds || undefined,
    bathrooms: apiData.bathrooms || apiData.baths || undefined,
    floorSize: apiData.floorSize ? {
      value: apiData.floorSize,
      unit: apiData.floorSizeUnit || 'sqft'
    } : undefined,
    images: apiData.images || apiData.image ? 
      (Array.isArray(apiData.images) ? apiData.images : [apiData.image]) : [],
    agent: apiData.agent ? {
      name: apiData.agent.name || 'Homezy Agent',
      email: apiData.agent.email,
      phone: apiData.agent.phone,
    } : undefined,
    url: `https://homezy-zidan.vercel.app/property/${apiData.slug || apiData.id}`,
  };
}
