import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    title: "Comfort Is Our Top Priority For You",
    description: "We guarantee that the products we sell will make our customers happy because we are very concerned about our consumer satisfaction",
    benefits: [
      {
        id: 1,
        title: "Affordable Price",
        description: "We provide the best for you. The price we offer accordance with the quality we provide",
        icon: "coin"
      },
      {
        id: 2,
        title: "Clear Legality",
        description: "Put your trust in us. We are a legal entity with official legality in the relevant government",
        icon: "like-shapes"
      },
      {
        id: 3,
        title: "Experienced Agent",
        description: "We always work with agents in their fields so that we can provide the best quality",
        icon: "people"
      }
    ]
  }

  return NextResponse.json(data)
}
