export interface Property {
  id: number
  price: string
  title: string
  location: string
  beds: number
  baths: number
  area: string
  image: any
  coordinates: [number, number]
  isMonthly?: boolean
  isFeatured?: boolean
  type?: 'sale' | 'rent'
  category?: string
  yearBuilt?: number
  priceValue?: number
  slug?: string
}

export interface FilterCriteria {
  type: 'sale' | 'rent'
  category: string
  bedrooms: string
  bathrooms: string
  floorArea: string
  minYear: string
  maxYear: string
  minPrice: string
  maxPrice: string
}

export interface SearchResultsProps {
  className?: string
  filterCriteria?: FilterCriteria | null
}

export interface SearchMapProps {
  center?: [number, number]
  zoom?: number
  hideZoomControls?: boolean
}

export interface PopupPosition {
  x: number
  y: number
}
