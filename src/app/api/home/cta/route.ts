import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    title: "Subscribe To Our Newsletter",
    description: "Join our newsletter to stay up to date on features and releases.",
    buttonText: "Subscribe",
    placeholderText: "Enter Your Email Address"
  }

  return NextResponse.json(data)
}
