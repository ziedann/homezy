import React from 'react'
import FooterLinks from './FooterLinks'

const pagesLinks = [
  { href: '/', text: 'Home' },
  { href: '/search-property', text: 'Search Properties' },
  { href: '#', text: 'Property Details' },
  { href: '#', text: 'Agent List' },
]

const agentLinks = [
  { href: '#', text: 'Agent Details' },
  { href: '#', text: 'About Us' },
  { href: '#', text: 'Contact Us' },
  { href: '#', text: 'FAQ' },
]

const utilityLinks = [
  { href: '/sign-in', text: 'Sign In' },
  { href: '/sign-up', text: 'Sign Up' },
  { href: '/404', text: '404 Error Page' },
  { href: '#', text: 'Style Guides' },
  { href: '#', text: 'Licenses' },
  { href: '#', text: 'Change Log' },
]

export default function FooterNavigation() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-[64px] md:gap-[64px]">
      <FooterLinks title="Pages" links={pagesLinks} />
      <FooterLinks title="Agent Details" links={agentLinks} />
      <FooterLinks title="Utility Pages" links={utilityLinks} />
    </div>
  )
}
