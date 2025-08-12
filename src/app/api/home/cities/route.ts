import { NextResponse } from 'next/server'
import ImageCity1 from '@/app/assets/images/image-cities-1.png'
import ImageCity2 from '@/app/assets/images/image-cities-2.png'
import ImageCity3 from '@/app/assets/images/image-cities-3.png'

export async function GET() {
  const data = {
    title: "Explore Cities",
    browseText: "Browse All Cities",
    cities: [
      {
        id: 1,
        title: "Pasadena, Oklah..",
        listingCount: "100+",
        image: ImageCity1
      },
      {
        id: 2,
        title: "Laffayette, California",
        listingCount: "100+",
        image: ImageCity2
      },
      {
        id: 3,
        title: "Stockton, New Ha..",
        listingCount: "100+",
        image: ImageCity3
      },
      {
        id: 4,
        title: "Pasadena, Oklah..",
        listingCount: "100+",
        image: ImageCity1
      },
      {
        id: 5,
        title: "Laffayette, California",
        listingCount: "100+",
        image: ImageCity1
      },
      {
        id: 6,
        title: "Stockton, New Ha..",
        listingCount: "100+",
        image: ImageCity1
      }
    ]
  }

  return NextResponse.json(data)
}