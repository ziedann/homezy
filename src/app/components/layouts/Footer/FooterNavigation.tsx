import React from 'react'
import FooterLinks from './FooterLinks'

const pagesLinks = [
  { href: '/', text: 'Home V1' },
  { href: '/', text: 'Home V2' },
  { href: '/', text: 'Search Properties V1' },
  { href: '/', text: 'Search Properties V2' },
  { href: '/', text: 'Property Details V1' },
  { href: '/', text: 'Property Details V2' },
  { href: '/', text: 'Agent List V1' },
  { href: '/', text: 'Agent List V2' },
]

const agentLinks = [
  { href: '/', text: 'Agent Details V1' },
  { href: '/', text: 'Agent Details V2' },
  { href: '/', text: 'About Us V1' },
  { href: '/', text: 'About Us V2' },
  { href: '/', text: 'Contact Us V1' },
  { href: '/', text: 'Contact Us V2' },
  { href: '/', text: 'FAQ' },
]

const utilityLinks = [
  { href: '/', text: 'Sign In' },
  { href: '/', text: 'Sign Up' },
  { href: '/', text: 'Forgot Password' },
  { href: '/', text: 'Reset Password' },
  { href: '/', text: '404 Error Page' },
  { href: '/', text: 'Style Guides' },
  { href: '/', text: 'Licenses' },
  { href: '/', text: 'Change Log' },
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
