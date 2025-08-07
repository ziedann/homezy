import React from 'react'
import FooterLinks from './FooterLinks'

const pagesLinks = [
  { href: '/home-v1', text: 'Home V1' },
  { href: '/home-v2', text: 'Home V2' },
  { href: '/search-properties-v1', text: 'Search Properties V1' },
  { href: '/search-properties-v2', text: 'Search Properties V2' },
  { href: '/property-details-v1', text: 'Property Details V1' },
  { href: '/property-details-v2', text: 'Property Details V2' },
  { href: '/agent-list-v1', text: 'Agent List V1' },
  { href: '/agent-list-v2', text: 'Agent List V2' },
]

const agentLinks = [
  { href: '/agent-details-v1', text: 'Agent Details V1' },
  { href: '/agent-details-v2', text: 'Agent Details V2' },
  { href: '/about-us-v1', text: 'About Us V1' },
  { href: '/about-us-v2', text: 'About Us V2' },
  { href: '/contact-us-v1', text: 'Contact Us V1' },
  { href: '/contact-us-v2', text: 'Contact Us V2' },
  { href: '/faq', text: 'FAQ' },
]

const utilityLinks = [
  { href: '/sign-in', text: 'Sign In' },
  { href: '/sign-up', text: 'Sign Up' },
  { href: '/forgot-password', text: 'Forgot Password' },
  { href: '/reset-password', text: 'Reset Password' },
  { href: '/404', text: '404 Error Page' },
  { href: '/style-guides', text: 'Style Guides' },
  { href: '/licenses', text: 'Licenses' },
  { href: '/changelog', text: 'Change Log' },
]

export default function FooterNavigation() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-[64px]">
      <FooterLinks title="Pages" links={pagesLinks} />
      <FooterLinks title="Agent Details" links={agentLinks} />
      <FooterLinks title="Utility Pages" links={utilityLinks} />
    </div>
  )
}
