import { NextResponse } from 'next/server'
import Agent1 from '@/app/assets/images/agent-1.png'
import Agent2 from '@/app/assets/images/agent-2.png'
import Agent3 from '@/app/assets/images/agent-3.png'
import Agent4 from '@/app/assets/images/agent-4.png'
import Agent5 from '@/app/assets/images/agent-5.png'
import Agent6 from '@/app/assets/images/agent-6.png'

export async function GET() {
  const data = {
    title: "Meet Our Agents",
    browseText: "Browse All Agents",
    agents: [
      {
        id: 1,
        name: "Edwin Martins",
        role: "Property Agent",
        image: Agent1,
        socialLinks: {
          facebook: "#",
          twitter: "#",
          instagram: "#"
        }
      },
      {
        id: 2,
        name: "Robert Fox",
        role: "Property Agent",
        image: Agent2,
        socialLinks: {
          facebook: "#",
          twitter: "#",
          instagram: "#"
        }
      },
      {
        id: 3,
        name: "Jane Cooper",
        role: "Property Agent",
        image: Agent3,
        socialLinks: {
          facebook: "#",
          twitter: "#",
          instagram: "#"
        }
      },
      {
        id: 4,
        name: "Guy Hawkins",
        role: "Property Agent",
        image: Agent4,
        socialLinks: {
          facebook: "#",
          twitter: "#",
          instagram: "#"
        }
      },
      {
        id: 5,
        name: "Kathryn Murphy",
        role: "Property Agent",
        image: Agent5,
        socialLinks: {
          facebook: "#",
          twitter: "#",
          instagram: "#"
        }
      },
      {
        id: 6,
        name: "Albert Flores",
        role: "Property Agent",
        image: Agent6,
        socialLinks: {
          facebook: "#",
          twitter: "#",
          instagram: "#"
        }
      },
    ]
  }

  return NextResponse.json(data)
}