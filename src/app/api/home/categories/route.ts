import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    title: "Featured Categories",
    browseText: "Browse All Categories",
    categories: [
      {
        id: 1,
        title: "Studio",
        listingCount: "100+",
        icon: "building-1"
      },
      {
        id: 2,
        title: "Apartment",
        listingCount: "100+",
        icon: "building-2"
      },
      {
        id: 3,
        title: "Office",
        listingCount: "100+",
        icon: "building-3"
      }
    ]
  }

  return NextResponse.json(data)
}
