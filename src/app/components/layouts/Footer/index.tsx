import React from 'react'
import FooterLogo from './FooterLogo'
import FooterNavigation from './FooterNavigation'

export default function Footer() {
  return (
    <footer className="pt-[64px] pb-8">
      <div className="max-w-[1160px] mx-auto px-5 lg:px-0">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-[64px] pb-[64px]">
          <FooterLogo />
          <FooterNavigation />
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-8 border-t border-[#E8E8E8]">
          <p className="text-center text-dark-60 text-sm font-light font-hanken">
            ©2023 Homezy. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}