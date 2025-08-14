import { NextResponse } from 'next/server'
import FeaturedImage1 from '@assets/images/featured-listing-1.png'
import FeaturedImage2 from '@assets/images/featured-listing-2.png'
import FeaturedImage3 from '@assets/images/featured-listing-3.png'

export async function GET() {
  const data = {
    properties: [
      {
        id: 1,
        price: "$2,199",
        title: "Beach Pros Realty", 
        location: "37 Ambleside Gardens, Ilford, IG4 5HH",
        beds: 3,
        baths: 2,
        area: "5x7 m²",
        image: FeaturedImage1,
        coordinates: [40.719, -74.110], 
        isMonthly: true
      },
      {
        id: 2,
        price: "$3,599",
        title: "Beacon Homes Realty", 
        location: "3 Leame Close, Hull, HU3 6ND",
        beds: 3,
        baths: 2,
        area: "5x7 m²",
        image: FeaturedImage2,
        coordinates: [40.740, -73.986], 
        isMonthly: true
      },
      {
        id: 3,
        price: "$4,299",
        title: "Downtown Apartment", 
        location: "5th Avenue, Manhattan, NY",
        beds: 2,
        baths: 2,
        area: "4x6 m²",
        image: FeaturedImage3,
        coordinates: [40.760, -73.880],
        isMonthly: true
      },
      {
        id: 4,
        price: "$4,299",
        title: "Brooklyn Studio", 
        location: "Brooklyn Heights, NY",
        beds: 1,
        baths: 1,
        area: "3x4 m²",
        image: FeaturedImage1,
        coordinates: [40.773, -73.950], 
        isMonthly: true
      },
      {
        id: 5,
        price: "$5,099",
        title: "Herringbone Realty", 
        location: "28B Highgate Road, London, NW5 1NS",
        beds: 3,
        baths: 2,
        area: "5x7 m²",
        image: FeaturedImage2,
        coordinates: [40.758, -74.072], 
        isMonthly: true
      },
      {
        id: 6,
        price: "$1,299",
        title: "Greenwich Loft", 
        location: "Greenwich Village, NY",
        beds: 2,
        baths: 1,
        area: "4x5 m²",
        image: FeaturedImage3,
        coordinates: [40.743, -73.928], 
        isMonthly: true
      },
      {
        id: 7,
        price: "$3,899",
        title: "Chelsea Apartment", 
        location: "Chelsea, Manhattan, NY",
        beds: 2,
        baths: 2,
        area: "4x6 m²",
        image: FeaturedImage1,
        coordinates: [40.747, -74.002], 
        isMonthly: true
      },
      {
        id: 8,
        price: "$2,599",
        title: "West Side Studio", 
        location: "Upper West Side, NY",
        beds: 1,
        baths: 1,
        area: "3x5 m²",
        image: FeaturedImage2,
        coordinates: [40.785, -73.978], 
        isMonthly: true
      },
      {
        id: 9,
        price: "$4,799",
        title: "Tribeca Penthouse", 
        location: "Tribeca, Manhattan, NY",
        beds: 3,
        baths: 3,
        area: "6x8 m²",
        image: FeaturedImage3,
        coordinates: [40.719, -74.009], 
        isMonthly: true
      }
    ]
  }

  return NextResponse.json(data)
}
