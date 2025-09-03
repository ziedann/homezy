'use client'

interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items || items.length === 0) return null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item) => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `https://homezy-zidan.vercel.app${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  );
}

// Utility functions to generate breadcrumb items
export const generatePropertyBreadcrumb = (propertyTitle: string, propertySlug: string): BreadcrumbItem[] => [
  { name: 'Home', url: '/', position: 1 },
  { name: 'Properties', url: '/search-property', position: 2 },
  { name: propertyTitle, url: `/property/${propertySlug}`, position: 3 }
];

export const generateSearchBreadcrumb = (searchParams?: any): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    { name: 'Home', url: '/', position: 1 },
    { name: 'Search Properties', url: '/search-property', position: 2 }
  ];

  if (searchParams?.location) {
    items.push({
      name: `Properties in ${searchParams.location}`,
      url: `/search-property?location=${searchParams.location}`,
      position: 3
    });
  }

  if (searchParams?.type) {
    items.push({
      name: searchParams.type.charAt(0).toUpperCase() + searchParams.type.slice(1),
      url: `/search-property?type=${searchParams.type}`,
      position: items.length + 1
    });
  }

  return items;
};
