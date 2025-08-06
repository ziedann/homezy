import React from 'react'
import Logo from '@/app/assets/icons/logo.svg'
import Phone from '@/app/assets/icons/phone.svg'
import Instagram from '@/app/assets/icons/instagram.svg'
import Facebook from '@/app/assets/icons/facebook.svg'
import Twitter from '@/app/assets/icons/twitter.svg'

export default function Footer() {
  return (
    <footer className="pt-[64px] pb-8">
      <div className="max-w-[1160px] mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-[64px]">
          {/* Logo and Description */}
          <div className="max-w-[360px]">
            <Logo className="h-8 w-auto mb-6" />
            <p className="text-dark-60 text-sm font-regular">
              We are creative people who provide the best way to you who want to have a new comfortable and suitable place to live
            </p>
            <div className="flex gap-4 mt-6">
              <Phone className="h-6 w-auto" />
              <a href="#" className="text-dark-100 hover:text-dark-60">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-dark-100 hover:text-dark-60">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-dark-100 hover:text-dark-60">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-[64px]">
            {/* Pages Column */}
            <div>
              <h3 className="text-dark-100 text-base font-bold mb-6">Pages</h3>
              <ul className="space-y-4">
                <li><a href="/home-v1" className="text-dark-60 text-sm hover:text-dark-100">Home V1</a></li>
                <li><a href="/home-v2" className="text-dark-60 text-sm hover:text-dark-100">Home V2</a></li>
                <li><a href="/search-properties-v1" className="text-dark-60 text-sm hover:text-dark-100">Search Properties V1</a></li>
                <li><a href="/search-properties-v2" className="text-dark-60 text-sm hover:text-dark-100">Search Properties V2</a></li>
                <li><a href="/property-details-v1" className="text-dark-60 text-sm hover:text-dark-100">Property Details V1</a></li>
                <li><a href="/property-details-v2" className="text-dark-60 text-sm hover:text-dark-100">Property Details V2</a></li>
                <li><a href="/agent-list-v1" className="text-dark-60 text-sm hover:text-dark-100">Agent List V1</a></li>
                <li><a href="/agent-list-v2" className="text-dark-60 text-sm hover:text-dark-100">Agent List V2</a></li>
              </ul>
            </div>

            {/* Agent Details Column */}
            <div>
              <h3 className="text-dark-100 text-base font-bold mb-6">Agent Details</h3>
              <ul className="space-y-4">
                <li><a href="/agent-details-v1" className="text-dark-60 text-sm hover:text-dark-100">Agent Details V1</a></li>
                <li><a href="/agent-details-v2" className="text-dark-60 text-sm hover:text-dark-100">Agent Details V2</a></li>
                <li><a href="/about-us-v1" className="text-dark-60 text-sm hover:text-dark-100">About Us V1</a></li>
                <li><a href="/about-us-v2" className="text-dark-60 text-sm hover:text-dark-100">About Us V2</a></li>
                <li><a href="/contact-us-v1" className="text-dark-60 text-sm hover:text-dark-100">Contact Us V1</a></li>
                <li><a href="/contact-us-v2" className="text-dark-60 text-sm hover:text-dark-100">Contact Us V2</a></li>
                <li><a href="/faq" className="text-dark-60 text-sm hover:text-dark-100">FAQ</a></li>
              </ul>
            </div>

            {/* Utility Pages Column */}
            <div>
              <h3 className="text-dark-100 text-base font-bold mb-6">Utility Pages</h3>
              <ul className="space-y-4">
                <li><a href="/sign-in" className="text-dark-60 text-sm hover:text-dark-100">Sign In</a></li>
                <li><a href="/sign-up" className="text-dark-60 text-sm hover:text-dark-100">Sign Up</a></li>
                <li><a href="/forgot-password" className="text-dark-60 text-sm hover:text-dark-100">Forgot Password</a></li>
                <li><a href="/reset-password" className="text-dark-60 text-sm hover:text-dark-100">Reset Password</a></li>
                <li><a href="/404" className="text-dark-60 text-sm hover:text-dark-100">404 Error Page</a></li>
                <li><a href="/style-guides" className="text-dark-60 text-sm hover:text-dark-100">Style Guides</a></li>
                <li><a href="/licenses" className="text-dark-60 text-sm hover:text-dark-100">Licenses</a></li>
                <li><a href="/changelog" className="text-dark-60 text-sm hover:text-dark-100">Change Log</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-8 border-t border-[#E8E8E8]">
          <p className="text-center text-dark-60 text-sm">
            ©2023 Homezy. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}