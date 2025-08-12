import { NextResponse } from 'next/server'
import TestimonialPerson1 from '@assets/images/testimonial-person-1.png'
import TestimonialPerson2 from '@assets/images/testimonial-person-2.png'

export async function GET() {
  const data = {
    title: "Kind Words From Our Customers",
    browseText: "",
    testimonials: [
      {
        id: 1,
        name: "Guy Hawkins",
        role: "Customer",
        image: TestimonialPerson1,
        rating: 3,
        comment: "I highly recommend this real estate company. They helped me find my dream home within my budget. The agents were professional, knowledgeable, and always available to answer my questions."
      },
      {
        id: 2,
        name: "Brooklyn Simmons",
        role: "Customer",
        image: TestimonialPerson2,
        rating: 5,
        comment: "Working with this team was a fantastic experience. They made the home buying process smooth and stress-free. Their expertise in the local market was invaluable."
      },
      {
        id: 3,
        name: "Guy Hawkins",
        role: "Customer",
        image: TestimonialPerson1,
        rating: 5,
        comment: "I highly recommend this real estate company. They helped me find my dream home within my budget. The agents were professional, knowledgeable, and always available to answer my questions."
      },
      {
        id: 4,
        name: "Brooklyn Simmons",
        role: "Customer",
        image: TestimonialPerson2,
        rating: 5,
        comment: "Working with this team was a fantastic experience. They made the home buying process smooth and stress-free. Their expertise in the local market was invaluable."
      }
    ]
  }

  return NextResponse.json(data)
}
