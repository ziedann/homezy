import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    title: "Subscribe For Latest Newsletter",
    description: "Stay updated with our latest news and properties",
    buttonText: "Subscribe",
    placeholderText: "Enter your email address"
  }

  return NextResponse.json(data)
}
