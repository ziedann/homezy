import type { Metadata } from 'next'
import SearchPropertyClient from './SearchPropertyClient'

export const metadata: Metadata = {
  title: 'Search Properties',
  description: 'Search and discover amazing properties for sale and rent. Filter by location, price, bedrooms, and more to find your perfect home.',
  keywords: [
    'property search',
    'real estate search',
    'homes for sale',
    'apartments for rent',
    'property listings',
    'real estate filter',
    'find property'
  ],
  openGraph: {
    title: 'Search Properties | Homezy',
    description: 'Search and discover amazing properties for sale and rent. Filter by location, price, bedrooms, and more to find your perfect home.',
    url: 'https://homezy-zidan.vercel.app/search-property',
    type: 'website',
  },
  twitter: {
    title: 'Search Properties | Homezy',
    description: 'Search and discover amazing properties for sale and rent. Filter by location, price, bedrooms, and more to find your perfect home.',
  },
  alternates: {
    canonical: '/search-property',
  },
}

export default function SearchPropertyPage() {
  return <SearchPropertyClient />
}